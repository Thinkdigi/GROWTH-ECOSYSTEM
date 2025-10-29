// ts-node scripts/upload_chunks.ts .tmp/chunks.json
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !key) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

async function fetchDocId(sb: any, title: string) {
  const { data } = await sb
    .from("documents")
    .select("id")
    .eq("title", title)
    .limit(1)
    .maybeSingle();
  return data?.id;
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: ts-node scripts/upload_chunks.ts <chunks.json>");
    process.exit(1);
  }
  const raw: any[] = JSON.parse(fs.readFileSync(file, "utf-8"));
  const sb = createClient(url, key);
  const titles: string[] = [...new Set(raw.map((r: any) => r.document_title as string))];
  const docMap: Record<string, string> = {};
  for (const t of titles) {
    const { data, error } = await sb
      .from("documents")
      .insert({ title: t, visibility: "investor" })
      .select()
      .single();
    if (error && !String(error.message).includes("duplicate")) console.error(error);
    docMap[t] = data?.id || (await fetchDocId(sb, t));
  }
  for (let i = 0; i < raw.length; i += 500) {
    const batch = raw.slice(i, i + 500).map((r: any) => ({
      id: r.id,
      document_id: docMap[r.document_title],
      content: r.content,
      embedding: r.embedding,
    }));
    const { error } = await sb.from("doc_chunks").insert(batch);
    if (error) console.error(error);
  }
  console.log("Upload complete");
}

main().catch((err) => {
  console.error(err);
});
