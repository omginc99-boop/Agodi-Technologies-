import type { Metadata } from "next";
import Link from "next/link";
import EarlyAccessForm from "@/components/EarlyAccessForm";

const GOLD = "#FFA02E";
const BLUE = "#2f6bff";

export const metadata: Metadata = {
  title: "Early Access — Agodi Technologies",
  description:
    "Get early access to new products from Agodi Technologies, from streaming to fintech to gov tech.",
  openGraph: {
    title: "Early Access — Agodi Technologies",
    description: "Be the first to know when the next Agodi product launches.",
    type: "website",
  },
};

const ROSTER = [
  { slug: "afristream", name: "AfriStream", cat: "Entertainment", url: "https://afristream.africa", body: "Africa's AI-native entertainment platform.", status: "live" as const },
  { slug: "computer-village", name: "Computer Village", cat: "Tech Marketplace", url: "https://computer-village.africa", body: "Africa's digital technology marketplace — buy, sell, repair, connect.", status: "live" as const },
  { slug: "alaba-international", name: "Alaba International", cat: "Commerce", url: "https://alabainternational.africa", body: "West Africa's electronics marketplace, online.", status: "live" as const },
  { slug: "folad-fish", name: "Folad Sisters Fresh Fish", cat: "Food Commerce", url: "https://foladfish.vercel.app", body: "Fresh seafood, straight from the fishermen to your door.", status: "live" as const },
  { slug: "afriesim", name: "AfrieSIM", cat: "Travel", url: "https://afri-esim.com", body: "One eSIM. Every border. AI-powered travel connectivity.", status: "live" as const },
  { slug: "africa-5d-map", name: "Africa 5D Map", cat: "AI Maps", url: "https://africa-5d-map.vercel.app", body: "A voice-first digital map of Africa — see the continent beyond the map.", status: "live" as const },
  { slug: "talent-and-skills", name: "Talent & Skills", cat: "Creators", url: "https://talentandskills.agoditechnologies.com", body: "Get discovered. Get booked. Get paid.", status: "live" as const },
  { slug: "gentlemens-club", name: "The Gentlemen's Club", cat: "Lifestyle", url: "https://gentlemans-society.vercel.app", body: "A private members' club for nightlife, dining, and concierge.", status: "live" as const },
  { slug: "citizen-connect", name: "Citizen Connect", cat: "GovTech", url: "https://citizen-services-lake.vercel.app", body: "Identity, payments, and public services in one secure system.", status: "early" as const },
];

function Mark({ size = 34 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-lg font-display font-bold"
      style={{ width: size, height: size, background: `linear-gradient(135deg, #FFD49A, ${GOLD} 55%, #FF7A1A)`, color: "#06070a", fontSize: size * 0.55 }}
    >
      A
    </span>
  );
}

function StatusPill({ status }: { status: "live" | "early" }) {
  const live = status === "live";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em]"
      style={{
        background: live ? "rgba(122,214,158,0.12)" : "rgba(47,107,255,0.12)",
        color: live ? "#7ad69e" : "#7fb0ff",
        border: `1px solid ${live ? "rgba(122,214,158,0.3)" : "rgba(47,107,255,0.3)"}`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full net-pulse" style={{ background: live ? "#7ad69e" : "#7fb0ff" }} />
      {live ? "Live now" : "Early access"}
    </span>
  );
}

export default function EarlyAccessPage() {
  return (
    <main className="relative overflow-hidden" style={{ background: "#060b18" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(6,11,24,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <nav className="max-w-5xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Mark />
            <span className="font-display font-bold tracking-tight text-[15px]">
              Agodi <span className="text-white/45">Technologies</span>
            </span>
          </Link>
          <Link href="/#portfolio" className="text-[13px] text-white/60 hover:text-white transition-colors">
            ← Full portfolio
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section
        className="relative px-6 lg:px-10 pt-20 pb-16 text-center"
        style={{ background: "radial-gradient(90% 80% at 50% -10%, rgba(255,160,46,0.14), transparent 55%), radial-gradient(70% 60% at 20% 20%, rgba(47,107,255,0.10), transparent 60%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] mb-7 hairline fade-up" style={{ color: GOLD }}>
            <span className="h-1.5 w-1.5 rounded-full net-pulse" style={{ background: GOLD }} /> What&rsquo;s next from Agodi
          </div>
          <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[38px] sm:text-6xl fade-up" style={{ animationDelay: "0.05s" }}>
            Be the first <span className="gold-text">to know.</span>
          </h1>
          <p className="mt-6 text-[16px] lg:text-lg text-white/60 leading-relaxed max-w-xl mx-auto fade-up" style={{ animationDelay: "0.12s" }}>
            Get early access to new products from Agodi Technologies, from streaming to fintech to gov tech.
          </p>
        </div>
      </section>

      {/* ROSTER */}
      <section className="relative px-6 lg:px-10 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROSTER.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl p-5 glass-navy transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: BLUE }}>{p.cat}</span>
                  <StatusPill status={p.status} />
                </div>
                <h3 className="mt-3 font-display font-bold text-[17px] leading-snug">{p.name}</h3>
                <p className="mt-2 text-[13px] text-white/55 leading-relaxed flex-1">{p.body}</p>
                <div className="mt-4 text-[12px] font-medium text-white/40 group-hover:text-white transition-colors">
                  {p.url.replace("https://", "")} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section className="relative px-6 lg:px-10 pb-28" style={{ background: "#070d1d" }}>
        <div className="max-w-6xl mx-auto py-20 grid lg:grid-cols-[1fr_1.05fr] gap-14 items-start">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: GOLD }}>Get Notified</div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-[-0.02em] leading-tight">
              Tell us which one you&rsquo;re waiting for.
            </h2>
            <p className="mt-5 text-white/55 text-[15px] leading-relaxed max-w-md">
              We&rsquo;ll email you the moment your pick launches — or reaches full access if it&rsquo;s already live in early access.
            </p>

            <div className="mt-10 rounded-2xl p-6 glass-navy">
              <div className="font-display font-bold text-3xl gold-text inline-block">24</div>
              <p className="mt-2 text-[13.5px] text-white/55 leading-relaxed">
                products across identity, trust, commerce, work, and entertainment — a global tech group, proven first in Africa. Live today across South Africa and Nigeria, expanding across the continent.
              </p>
            </div>
          </div>

          <EarlyAccessForm products={ROSTER.map((p) => ({ slug: p.slug, name: p.name }))} />
        </div>
      </section>

      {/* FOOTER */}
      <section className="relative px-6 lg:px-10 py-10" style={{ background: "#070d1d" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5"><Mark size={22} /> Agodi Technologies (Pty) Ltd</div>
          <div>info@agoditechnologies.com</div>
          <div>© 2026 Agodi Technologies</div>
        </div>
      </section>
    </main>
  );
}
