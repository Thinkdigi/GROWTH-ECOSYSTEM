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
  );
}
