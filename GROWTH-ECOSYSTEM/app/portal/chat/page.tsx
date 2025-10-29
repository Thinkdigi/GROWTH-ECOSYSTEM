"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { vectorSearch, keywordSearch } from "@/lib/search";
import { cheapEmbed } from "@/lib/localEmbed";
import { QUICK_PROMPTS } from "@/data/quick_prompts";

type Msg = {
  role: "user" | "assistant";
  text: string;
  sources?: { id: string; score: number }[];
};

export default function InvestorChat() {
  const [session, setSession] = useState<any>(null);
  const [mode, setMode] = useState<"vector" | "keyword">("vector");
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    if (!supabase) return; // supabase may be null during static builds
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const ask = async () => {
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    try {
      let hits: any[] = [];
      if (mode === "vector") {
        const emb = cheapEmbed(q);
        hits = await vectorSearch(emb, 6);
      } else {
        hits = await keywordSearch(q, 6);
      }
      const answer = synthesize(hits);
      setMsgs((m) => [...m, { role: "assistant", text: answer.text, sources: answer.sources }]);
    } catch (e: any) {
      setMsgs((m) => [...m, { role: "assistant", text: `Error: ${e.message || "search failed"}` }]);
    } finally {
      setQ("");
    }
  };

  const signOut = () => supabase?.auth?.signOut?.();

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold">Investor Chat</h2>
        <p className="text-sm text-neutral-700 mt-2">
          Sign in at /portal to access the chat.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Investor Chat (Demo)</h2>
        <button onClick={signOut} className="text-sm underline">
          Sign out
        </button>
      </div>
      <div className="mt-2 text-sm text-neutral-600">
        Mode:&nbsp;
        <select
          className="border rounded px-2 py-1"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
        >
          <option value="vector">Vector RAG (pgvector)</option>
          <option value="keyword">Keyword RAG (fallback)</option>
        </select>
        <span className="ml-3 text-xs">
          Vector uses embeddings; Keyword uses full‑text search.
        </span>
      </div>
      <div className="border rounded p-3 h-[520px] overflow-auto bg-white mt-4">
        {msgs.length === 0 && (
          <div className="text-neutral-500 text-sm">
            Ask about: Pay&amp;Earn, funding rounds, risks, roadmap and more.
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`my-2 ${m.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block px-3 py-2 rounded ${
                m.role === "user" ? "bg-cyan text-white" : "bg-neutral-100"
              }`}
            >
              {m.text}
            </div>
            {m.sources && m.sources.length > 0 && (
              <div className="text-xs text-neutral-500 mt-1">
                Sources:&nbsp;
                {m.sources.map((s) => (
                  <span key={s.id} className="mr-2">
                    {s.id.slice(0, 8)} ({s.score.toFixed(2)})
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Prompts */}
      <div className="mt-4">
        <div className="text-xs text-neutral-600 mb-2">Quick prompts</div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((qp, i) => (
            <button
              key={i}
              onClick={async () => {
                setQ(qp.prompt);
                await new Promise((resolve) => setTimeout(resolve, 0));
                await ask();
              }}
              className="px-2 py-1 rounded border text-xs hover:bg-neutral-50"
              title={qp.prompt}
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder="Type your question…"
        />
        <button onClick={ask} className="px-4 py-2 bg-cyan text-white rounded">
          Ask
        </button>
      </div>
      <p className="text-xs text-neutral-500 mt-2">
        Demo answers from curated investor docs. Not financial advice.
      </p>
    </div>
  );
}

function synthesize(hits: any[]): { text: string; sources: { id: string; score: number }[] } {
  if (!hits || hits.length === 0) {
    return { text: "No relevant information found.", sources: [] };
  }
  const mapped = hits.map((h: any) => ({
    id: h.id || "chunk",
    score: h.similarity ?? h.rank ?? 0,
    content: h.content as string,
  }));
  const top = mapped.sort((a, b) => b.score - a.score).slice(0, 4);
  const answer =
    "Here’s what our investor materials say:\n\n" +
    top.map((t) => "- " + t.content).join("\n\n") +
    "\n\n— Summary generated from internal docs. Sources listed above.";
  return {
    text: answer,
    sources: top.map(({ id, score }) => ({ id, score })),
  };
}
