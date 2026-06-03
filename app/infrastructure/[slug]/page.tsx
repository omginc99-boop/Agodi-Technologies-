import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, productBySlug } from "@/lib/products";

const GOLD = "#FFA02E";
const BLUE = "#2f6bff";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return { title: "Not found — Agodi Technologies" };
  return {
    title: `${p.name} — ${p.layer} | Agodi Technologies`,
    description: p.summary,
  };
}

function Mark({ size = 32 }: { size?: number }) {
  return (
    <span className="grid place-items-center rounded-lg font-display font-bold" style={{ width: size, height: size, background: `linear-gradient(135deg, #FFD49A, ${GOLD} 55%, #FF7A1A)`, color: "#06070a", fontSize: size * 0.55 }}>A</span>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const others = PRODUCTS.filter((x) => x.slug !== slug);

  return (
    <main className="relative min-h-screen" style={{ background: "#060b18", color: "#f5f7fb" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(6,11,24,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <nav className="max-w-5xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Mark />
            <span className="font-display font-bold tracking-tight text-[15px]">Agodi <span className="text-white/45">Technologies</span></span>
          </Link>
          <Link href="/#infrastructure" className="text-[13px] text-white/60 hover:text-white transition-colors">← All infrastructure</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="px-6 pt-20 pb-16" style={{ background: "radial-gradient(90% 80% at 80% -10%, rgba(47,107,255,0.16), transparent 55%), radial-gradient(70% 60% at 100% 20%, rgba(255,160,46,0.10), transparent 60%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em]">
            <span className="font-mono text-white/35">{p.n}</span>
            <span style={{ color: BLUE }}>{p.layer}</span>
          </div>
          <h1 className="mt-5 font-display font-bold text-5xl lg:text-7xl tracking-[-0.03em]">{p.name}</h1>
          <div className="mt-3 text-xl lg:text-2xl font-display font-semibold gold-text inline-block">{p.tagline}</div>
          <p className="mt-6 text-[16px] lg:text-lg text-white/65 leading-relaxed max-w-2xl">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full px-6 py-3 text-[14px] font-semibold" style={{ background: GOLD, color: "#06070a" }}>Visit {p.name} →</a>
            )}
            <a href="mailto:info@agoditechnologies.com" className="inline-flex items-center rounded-full px-6 py-3 text-[14px] font-semibold text-white hairline hover:bg-white/5 transition-colors">Partner With Us</a>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-6 py-16" style={{ background: "#070d1d" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-[12px] uppercase tracking-[0.22em] mb-6" style={{ color: GOLD }}>What it does</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.capabilities.map((c) => (
              <div key={c} className="rounded-xl p-5 glass-navy flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                <span className="text-[14.5px] text-white/85">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER LAYERS */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-[12px] uppercase tracking-[0.22em] mb-6" style={{ color: BLUE }}>Explore the stack</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/infrastructure/${o.slug}`} className="rounded-xl p-5 glass-navy transition-all hover:-translate-y-1">
                <div className="text-[11px] uppercase tracking-[0.14em]" style={{ color: BLUE }}>{o.layer}</div>
                <div className="mt-2 font-display font-bold text-lg">{o.name}</div>
                <div className="mt-1 text-[12.5px] text-white/50">{o.tagline}</div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/" className="text-[13px] text-white/60 hover:text-white transition-colors">← Back to Agodi Technologies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
