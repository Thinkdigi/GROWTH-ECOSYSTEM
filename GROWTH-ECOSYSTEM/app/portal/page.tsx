"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockRoi = [
  { month: "M1", yield: 1200, repay: 1000 },
  { month: "M2", yield: 1300, repay: 1000 },
  { month: "M3", yield: 1400, repay: 1000 },
  { month: "M4", yield: 1550, repay: 1000 },
];

export default function Portal() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    if (!email) return;
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/portal" },
    });
    alert("Magic link sent. Check your email.");
  };

  const signOut = () => supabase.auth.signOut();

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold">Investor Portal</h2>
        <p className="text-sm text-neutral-700 mt-2">
          Login with email (magic link). Demo uses Supabase Free tier.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={signIn} className="px-4 py-2 bg-cyan text-white rounded">
            Login
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-3">
          Request access via <Link href="/contact" className="underline">contact</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">ThinkFi Dashboard (Demo)</h2>
        <button onClick={signOut} className="text-sm underline">
          Sign out
        </button>
      </div>
      <p className="text-neutral-700 mt-2">Private: projections, rounds, documents (mock).</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border p-4">
          <h3 className="font-semibold mb-2">Pay&amp;Earn Yield vs Repay (Mock)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRoi}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="yield" />
                <Line type="monotone" dataKey="repay" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <h3 className="font-semibold mb-2">Rounds (Mock)</h3>
          <ul className="text-sm list-disc pl-5">
            <li>Seed: €150k–€250k @ €1.5M pre</li>
            <li>Series A: €1.2M–€2.0M @ €6–8M pre</li>
            <li>Series B: €5–8M @ €25–35M pre</li>
          </ul>
          <p className="text-xs text-neutral-500 mt-2">Detailed docs available upon NDA (upload later).</p>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/portal/chat" className="text-cyan underline">
          Open Investor Chat
        </Link>
      </div>
    </div>
  );
}
