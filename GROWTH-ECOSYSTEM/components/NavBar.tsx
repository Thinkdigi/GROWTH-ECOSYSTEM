"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16 text-white">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Thinkdigi
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <div
            className="relative"
            onMouseEnter={() => setOpen("palvelut")}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1 hover:text-gray-300">
              Palvelut <ChevronDown size={14} />
            </button>
            {open === "palvelut" && (
              <div className="absolute left-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-lg p-4 w-64">
                <Link href="/palvelut/shopify" className="block py-1.5 hover:text-gray-200">Shopify-verkkokaupat</Link>
                <Link href="/palvelut/markkinointi" className="block py-1.5 hover:text-gray-200">Kasvuhakkerointi</Link>
                <Link href="/palvelut/tekoaly" className="block py-1.5 hover:text-gray-200">Tekoälyratkaisut</Link>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpen("tuotteet")}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1 hover:text-gray-300">
              Tuotteet <ChevronDown size={14} />
            </button>
            {open === "tuotteet" && (
              <div className="absolute left-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-lg p-4 w-64">
                <Link href="/tuotteet/vorssa-ink" className="block py-1.5 hover:text-gray-200">Vorssa Ink</Link>
                <Link href="/tuotteet/tritanium" className="block py-1.5 hover:text-gray-200">Tritanium</Link>
                <Link href="/tuotteet/lumi-club" className="block py-1.5 hover:text-gray-200">Lumi Club</Link>
              </div>
            )}
          </div>

          <Link href="/cases" className="hover:text-gray-300">Referenssit</Link>
          <Link href="/contact" className="hover:text-gray-300">Yhteystiedot</Link>
        </div>
      </div>
    </nav>
  )
}