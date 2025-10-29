import Link from "next/link";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col bg-deepblue">
      <Hero />

      {/* CASES */}
      <section className="px-6 md:px-16 py-24 bg-transparent text-center">
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
              className="bg-[#071026] p-8 rounded-2xl border border-white/6 hover:border-white/30 transition text-left glass-card"
            >
              <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
              <p className="text-[--muted]">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
