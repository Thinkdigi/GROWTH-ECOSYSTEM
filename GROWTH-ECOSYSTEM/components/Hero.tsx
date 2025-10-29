"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ModelCard = ({ title, desc, cta }: { title: string; desc: string; cta: string }) => (
  <motion.div whileHover={{ y: -6 }} className="rounded-2xl p-6 glass-card shadow-md">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-[--muted] mb-4">{desc}</p>
    <Link href="/how-it-works" className="text-[--accent-2] underline">
      {cta}
    </Link>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative blobs */}
      <motion.div
        className="absolute -left-36 -top-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-electric to-orchid opacity-40 accent-blob"
        animate={{ translateY: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="absolute -right-48 top-8 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[rgba(0,198,255,0.15)] to-[rgba(155,92,246,0.06)] opacity-60 accent-blob"
        animate={{ translateY: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Redefining how eCommerce grows — <span className="text-[--accent]">Pay&amp;Earn</span>
            <br /> financing for Shopify brands.
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-[--muted] max-w-2xl">
            Funding, tools and expertise in one ecosystem. Grow your store while you build wealth via DeFi yield.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex gap-3">
            <Link href="/contact" className="px-5 py-3 bg-[--accent] text-black rounded-lg font-semibold">
              Join Waitlist
            </Link>
            <Link href="/how-it-works" className="px-5 py-3 border border-white/10 rounded-lg">
              How it works
            </Link>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12" initial="hidden" animate="show">
            <ModelCard title="Model 0 – Easy Start" desc="Invoice financing for instant liquidity." cta="Learn more" />
            <ModelCard title="Model 1 – Launch" desc="Store setup + light financing bundle." cta="Learn more" />
            <ModelCard title="Model 2 – Growth Partner" desc="Revenue‑based + Pay&Earn DeFi." cta="Learn more" />
            <ModelCard title="Model 3 – Scale & Global" desc="Hybrid financing + grants + expansion." cta="Learn more" />
          </motion.div>
        </div>

        {/* right mockup / card */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <motion.div
            initial={{ rotate: -6, y: 8, scale: 0.98 }}
            animate={{ rotate: [-6, 4, -6], y: [8, -10, 8] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[320px] md:w-[420px] rounded-3xl p-6 glass-card shadow-glow"
          >
            <div className="h-56 rounded-xl bg-hero-tilt flex items-center justify-center text-black font-semibold">UI Mockup</div>
            <div className="mt-4 flex gap-3">
              <div className="flex-1 h-3 rounded bg-white/20" />
              <div className="w-24 h-3 rounded bg-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
