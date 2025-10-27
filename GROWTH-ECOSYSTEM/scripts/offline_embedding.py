#!/usr/bin/env python3
# offline_embedding.py
# Usage:
# 1) Install dependencies: pip install sentence-transformers supabase
# 2) Run: python offline_embedding.py <input_dir_or_file> <output_json>
#    This will produce a JSON file containing chunked text and embeddings.
# 3) Optionally set environment variables NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and UPLOAD_TO_SUPABASE=1
#    to automatically upload the documents and chunks to your Supabase database.

import os
import sys
import json
import uuid
import re
from pathlib import Path

try:
    from sentence_transformers import SentenceTransformer
except ImportError:
    SentenceTransformer = None  # type: ignore

def chunk_text(text: str, max_chars: int = 1200):
    """
    Splits long text into chunks of approximately max_chars characters by whitespace.
    """
    text = re.sub(r"\s+", " ", text).strip()
    out, cur = [], []
    for word in text.split(" "):
        cur.append(word)
        if sum(len(x) + 1 for x in cur) > max_chars:
            out.append(" ".join(cur))
            cur = []
    if cur:
        out.append(" ".join(cur))
    return out


def main():
    if len(sys.argv) < 3:
        print("Usage: python offline_embedding.py <input_dir_or_file> <output_json>")
        sys.exit(1)
    input_path = Path(sys.argv[1])
    output_json = Path(sys.argv[2])

    files = []
    if input_path.is_dir():
        files = list(input_path.glob("**/*.md")) + list(input_path.glob("**/*.txt"))
    else:
        files = [input_path]

    if SentenceTransformer is None:
        print("sentence-transformers not installed. Please install it via pip.")
        sys.exit(1)

    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

    chunks_all = []
    for f in files:
        try:
            txt = f.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            print(f"Could not read {f}: {e}")
            continue
        chunks = chunk_text(txt)
        embs = model.encode(chunks, normalize_embeddings=True)
        for content, emb in zip(chunks, embs):
            chunks_all.append({
                "id": str(uuid.uuid4()),
                "document_title": f.name,
                "content": content,
                "embedding": emb.tolist(),
            })

    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(chunks_all, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(chunks_all)} chunks → {output_json}")

    # Optionally upload to Supabase
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if url and key and os.getenv("UPLOAD_TO_SUPABASE") == "1":
        try:
            from supabase import create_client  # type: ignore
        except ImportError:
            print("supabase-py not installed; skipping upload.")
            return
        sb = create_client(url, key)
        # Insert documents
        titles = sorted(set(c["document_title"] for c in chunks_all))
        docmap = {}
        for t in titles:
            resp = sb.table("documents").insert({"title": t, "visibility": "investor"}).execute()
            docmap[t] = resp.data[0]["id"] if resp.data else None
        # Insert chunks in batches of 500
        rows = []
        for c in chunks_all:
            rows.append({
                "id": c["id"],
                "document_id": docmap.get(c["document_title"]),
                "content": c["content"],
                "embedding": c["embedding"],
            })
        for i in range(0, len(rows), 500):
            sb.table("doc_chunks").insert(rows[i:i+500]).execute()
        print("Uploaded chunks to Supabase.")


if __name__ == "__main__":
    main()
