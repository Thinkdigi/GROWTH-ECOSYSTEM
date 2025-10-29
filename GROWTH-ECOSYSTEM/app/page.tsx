import Link from "next/link";

const ModelCard = ({ title, desc, cta }: { title: string; desc: string; cta: string }) => (
  <div className="rounded-2xl border p-6 bg-white shadow-sm">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-neutral-700 mb-4">{desc}</p>
    <Link href="/how-it-works" className="text-cyan underline">
      {cta}
    </Link>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-white flex flex-col">
      <section className="bg-hero-grad">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Redefining how eCommerce grows — <span className="text-cyan">Pay&amp;Earn</span> financing for Shopify brands.
          </h1>
          <p className="mt-4 text-neutral-700 max-w-2xl">
            Funding, tools and expertise in one ecosystem. Grow your store while you build wealth via DeFi yield.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/contact" className="px-4 py-2 bg-cyan text-white rounded-lg">
              Join Waitlist
            </Link>
            <Link href="/how-it-works" className="px-4 py-2 border rounded-lg">
              How it works
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-16">
            <ModelCard title="Model 0 – Easy Start" desc="Invoice financing for instant liquidity." cta="Learn more" />
            <ModelCard title="Model 1 – Launch" desc="Store setup + light financing bundle." cta="Learn more" />
            <ModelCard title="Model 2 – Growth Partner" desc="Revenue‑based + Pay&Earn DeFi." cta="Learn more" />
            <ModelCard title="Model 3 – Scale & Global" desc="Hybrid financing + grants + expansion." cta="Learn more" />
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="px-6 md:px-16 py-24 bg-[#0a0a0a] text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Asiakastarinoita</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Vorssa Ink",
              desc: "Kasvoi muutamassa vuodessa Suomen tunnetuimmaksi korumerkiksi – miljoonaluokan liikevaihto.",
              link: "/tuotteet/vorssa-ink",
            },
            {
              title: "Tritanium Store",
              desc: "Rakensimme suorituskykyisen verkkokaupan ja automaattisen B2B-tilausjärjestelmän.",
              link: "/tuotteet/tritanium",
            },
            {
              title: "Lumi Club",
              desc: "Premium-brändi, jossa yhdistyy digitaalinen yhteisö ja fyysiset tuotteet.",
              link: "/tuotteet/lumi-club",
            },
          ].map((c, i) => (
            <Link
              key={i}
              href={c.link}
              className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-white/30 transition text-left"
            >
              <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
              <p className="text-gray-400">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
