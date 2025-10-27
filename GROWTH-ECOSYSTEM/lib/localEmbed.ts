// WARNING: This is a tiny, deterministic hash-based vectorizer for FREE demo only.
// Replace with real embeddings via offline_embedding.py for production vector search.

export function cheapEmbed(text: string, dim = 384): number[] {
  const arr = new Array(dim).fill(0);
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  for (const t of norm(text)) {
    let h = 0;
    for (let i = 0; i < t.length; i++) {
      h = (h * 31 + t.charCodeAt(i)) >>> 0;
    }
    arr[h % dim] += 1;
  }
  const mag = Math.sqrt(arr.reduce((s, x) => s + x * x, 0)) || 1;
  return arr.map((x) => x / mag);
}
