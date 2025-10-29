"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6 pt-28 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-6"
      >
        Ota yhteyttä
      </motion.h1>
      <p className="text-gray-400 max-w-lg text-center mb-12">
        Kerro projektistasi, ideastasi tai tavoitteistasi — aloitetaan kasvu yhdessä.
      </p>

      <form className="max-w-lg w-full grid gap-4">
        <input
          type="text"
          placeholder="Nimi"
          className="p-3 rounded-lg bg-[#111] border border-white/10 focus:border-white/30 outline-none"
        />
        <input
          type="email"
          placeholder="Sähköposti"
          className="p-3 rounded-lg bg-[#111] border border-white/10 focus:border-white/30 outline-none"
        />
        <textarea
          placeholder="Viesti"
          rows={5}
          className="p-3 rounded-lg bg-[#111] border border-white/10 focus:border-white/30 outline-none"
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Lähetä viesti
        </button>
      </form>
    </main>
  )
}
