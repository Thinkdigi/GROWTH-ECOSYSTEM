"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          ThinkFi by Thinkdigi
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/about">About</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/portal" className="px-3 py-1 rounded bg-cyan text-white">
            Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
