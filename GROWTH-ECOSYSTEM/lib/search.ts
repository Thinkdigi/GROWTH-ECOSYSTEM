export async function vectorSearch(embedding: number[], limit = 5) {
  const res = await fetch("/api/match", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ embedding, limit }),
  });
  if (!res.ok) {
    throw new Error("Vector search failed");
  }
  return res.json();
}

export async function keywordSearch(query: string, limit = 5) {
  const res = await fetch("/api/keyword", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, limit }),
  });
  if (!res.ok) {
    throw new Error("Keyword search failed");
  }
  return res.json();
}
