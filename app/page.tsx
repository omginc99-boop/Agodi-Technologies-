/* Agodi Technologies — Infrastructure for the Next Billion People */
import Link from "next/link";

const NAV = [
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#vision", label: "Vision" },
  { href: "#investors", label: "Investors" },
];

const STACK = [
  { n: "01", slug: "afriid", name: "AfriID", layer: "Identity Infrastructure", tag: "Verify Once. Trusted Everywhere.", body: "Digital identity verification for governments, enterprises, platforms, and people." },
  { n: "02", slug: "idvero", name: "IDVero", layer: "Verification Infrastructure", tag: "Verify with Confidence.", body: "Identity verification APIs — KYC, KYB, onboarding, compliance, and business verification." },
  { n: "03", slug: "afrimail", name: "AfriMail", layer: "Trust Infrastructure", tag: "Trust Every Email.", body: "AI-powered email trust, phishing protection, cloned-email detection, and sender verification." },
  { n: "04", slug: "helpers", name: "Helpers", layer: "Workforce Infrastructure", tag: "Work. Hire. Empower.", body: "A trusted marketplace connecting skilled workers and service providers with opportunity." },
  { n: "05", slug: "marketplace-lagos", name: "Marketplace Lagos", layer: "Commerce Infrastructure", tag: "Buy Local. Grow Local.", body: "Trusted digital commerce infrastructure for retailers, wholesalers, and entrepreneurs." },
  { n: "06", slug: "playolu", name: "PlayOlu", layer: "Entertainment Infrastructure", tag: "Play With Purpose.", body: "Africa's digital entertainment ecosystem for children and families." },
];

const ECOSYSTEM = [
  ["AfriID", "verifies identities."],
  ["IDVero", "verifies organisations."],
  ["AfriMail", "protects communication."],
  ["Helpers", "creates employment."],
  ["Marketplace Lagos", "powers commerce."],
  ["PlayOlu", "inspires the next generation."],
];

const STATS = [
  { k: "Identity", v: "500M+", d: "people across Africa lack a verifiable digital identity." },
  { k: "Trust", v: "90%", d: "of cyberattacks begin with a single email." },
  { k: "Employment", v: "60%", d: "of Africa is under 25 — the world's youngest workforce." },
  { k: "Commerce", v: "$712B", d: "Africa's projected internet economy by 2050." },
  { k: "Education", v: "1.4B", d: "people — the fastest-growing population on Earth." },
];

const FLYWHEEL = [
  "More identities create more trust.",
  "More trust creates more commerce.",
  "More commerce creates more work.",
  "More work creates more opportunity.",
];

const GOLD = "#FFA02E"; // Agodi brand orange
const BLUE = "#2f6bff";

function Mark({ size = 34 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-lg font-display font-bold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, #FFD49A, ${GOLD} 55%, #FF7A1A)`,
        color: "#06070a",
        fontSize: size * 0.55,
      }}
    >
      A
    </span>
  );
}

function Globe() {
  // Rotating dotted globe with African hotspots + tilted orbit rings.
  const hotspots = [[47, 44], [51, 52], [45, 58], [53, 61], [49, 67]];
  return (
    <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 hidden md:block pointer-events-none" style={{ width: "min(48vw, 640px)", aspectRatio: "1" }} aria-hidden>
      <div className="absolute inset-[5%] rounded-full overflow-hidden" style={{ boxShadow: "inset -26px -30px 80px rgba(0,0,0,0.72), inset 16px 16px 50px rgba(47,107,255,0.12), 0 0 80px rgba(47,107,255,0.20)" }}>
        <div className="absolute inset-[-25%]" style={{ backgroundImage: "radial-gradient(circle, rgba(127,176,255,0.55) 1px, transparent 1.7px)", backgroundSize: "20px 20px", animation: "globe-rotate 28s linear infinite", WebkitMaskImage: "radial-gradient(circle at 44% 42%, #000 54%, transparent 75%)", maskImage: "radial-gradient(circle at 44% 42%, #000 54%, transparent 75%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 38% 33%, rgba(47,107,255,0.16), transparent 45%), radial-gradient(circle at 64% 70%, rgba(6,11,24,0.6), transparent 60%)" }} />
        {hotspots.map(([x, y], i) => (
          <span key={i} className="absolute rounded-full net-pulse" style={{ left: `${x}%`, top: `${y}%`, width: 6, height: 6, background: "#FFA02E", boxShadow: "0 0 12px #FFA02E", animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 rounded-full" style={{ width: "120%", height: "120%", transform: "translate(-50%,-50%) rotate(-16deg) scaleY(0.34)", border: "1px solid rgba(255,160,46,0.22)" }} />
      <div className="absolute left-1/2 top-1/2 rounded-full" style={{ width: "142%", height: "142%", transform: "translate(-50%,-50%) rotate(18deg) scaleY(0.26)", border: "1px solid rgba(47,107,255,0.18)" }} />
    </div>
  );
}

function Skyline({ className = "" }: { className?: string }) {
  // Deterministic navy city silhouette with sparse orange-lit windows.
  const heights = [60, 100, 74, 130, 86, 150, 70, 116, 92, 140, 80, 108, 165, 84, 124, 72, 134, 96, 175, 78, 112, 90, 146, 66, 120, 100, 138];
  const n = heights.length;
  const bw = 1440 / n;
  return (
    <svg className={className} viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden>
      {heights.map((h, i) => {
        const x = i * bw;
        const top = 200 - h;
        const wins = [];
        for (let r = 0; r * 18 < h - 16; r++) {
          for (let c = 0; c < 3; c++) {
            const lit = (i * 5 + r * 2 + c) % 7 === 0;
            wins.push(<rect key={`${r}-${c}`} x={x + 8 + c * 12} y={top + 12 + r * 18} width="5" height="7" fill={lit ? "#FFA02E" : "rgba(255,255,255,0.05)"} />);
          }
        }
        return (
          <g key={i}>
            <rect x={x} y={top} width={bw - 5} height={h} fill="#0a1426" />
            {wins}
          </g>
        );
      })}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden" style={{ background: "#060b18" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(6,11,24,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Mark />
            <span className="font-display font-bold tracking-tight text-[15px]">
              Agodi <span className="text-white/45">Technologies</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13.5px] text-white/65">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <a href="#partner" className="hidden sm:inline-flex items-center rounded-full px-5 py-2 text-[13px] font-semibold" style={{ background: GOLD, color: "#06070a" }}>
            Partner With Us
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 lg:px-10 pt-24 pb-28 min-h-[88vh] flex items-center" style={{ background: "radial-gradient(120% 90% at 80% -10%, rgba(47,107,255,0.18), transparent 55%), radial-gradient(80% 70% at 100% 30%, rgba(255,160,46,0.10), transparent 60%)" }}>
        <Globe />
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] mb-9 hairline fade-up" style={{ color: GOLD }}>
            <span className="h-1.5 w-1.5 rounded-full net-pulse" style={{ background: GOLD }} /> Digital Infrastructure · Africa & Beyond
          </div>
          <h1 className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[40px] sm:text-6xl lg:text-7xl max-w-4xl fade-up" style={{ animationDelay: "0.05s" }}>
            Building the <span className="gold-text">Digital Infrastructure</span> for the Next Billion People.
          </h1>
          <p className="mt-7 text-xl lg:text-2xl font-display font-medium text-white/90 fade-up" style={{ animationDelay: "0.12s" }}>
            Identity. Trust. Work. Commerce. Entertainment.
          </p>
          <p className="mt-4 text-[15.5px] lg:text-lg text-white/60 leading-relaxed max-w-2xl fade-up" style={{ animationDelay: "0.18s" }}>
            Agodi Technologies develops foundational technology platforms that power secure digital experiences across Africa and the world.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5 fade-up" style={{ animationDelay: "0.24s" }}>
            <a href="#infrastructure" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5" style={{ background: GOLD, color: "#06070a" }}>
              Explore Our Infrastructure →
            </a>
            <a href="#partner" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold text-white hairline hover:bg-white/5 transition-colors">
              Partner With Us
            </a>
          </div>
          <div className="mt-14 flex items-center gap-6 text-[12px] text-white/40 fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="uppercase tracking-[0.2em]" style={{ color: GOLD }}>Africa Founded · Globally Trusted</span>
            <span className="hidden sm:flex items-center gap-4">
              {["AfriID", "IDVero", "AfriMail", "Helpers", "PlayOlu"].map((p) => (
                <span key={p} className="text-white/45 font-display font-medium">{p}</span>
              ))}
            </span>
          </div>
        </div>
        {/* City skyline silhouette — like the reference composite */}
        <div className="absolute bottom-0 left-0 w-full h-[180px] pointer-events-none z-0" style={{ WebkitMaskImage: "linear-gradient(to top, #000 58%, transparent)", maskImage: "linear-gradient(to top, #000 58%, transparent)" }}>
          <Skyline className="absolute bottom-0 left-0 w-full h-full" />
        </div>
      </section>

      {/* FAMILY — next generation */}
      <section className="relative px-6 lg:px-10 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: GOLD }}>For the Next Generation</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em] leading-tight">
              Built for African families.<br /><span className="gold-text">Designed for the world.</span>
            </h2>
            <p className="mt-5 text-white/60 text-[15px] leading-relaxed max-w-lg">
              Behind every platform is a person, a family, a community. Agodi&apos;s infrastructure puts secure identity, trusted commerce, and real opportunity into the hands of the next billion people.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/family-duo.jpg" alt="An African family exploring Africa's digital future" className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 90px rgba(6,11,24,0.55)" }} />
          </div>
        </div>
      </section>

      {/* AI × HUMANITY */}
      <section id="ai-humanity" className="relative px-6 lg:px-10 py-24" style={{ background: "#070d1d" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "radial-gradient(circle at 50% 55%, rgba(255,160,46,0.2), transparent 65%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hands.png" alt="A robotic hand and a child's hand reaching toward each other" className="w-full object-contain" />
          </div>
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>AI × Humanity</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em] leading-tight">
              Where intelligence meets <span className="gold-text">humanity.</span>
            </h2>
            <p className="mt-5 text-white/60 text-[15px] leading-relaxed max-w-lg">
              We build AI-native infrastructure that reaches the next generation — not to replace people, but to extend what they can do. Technology in one hand. A child&apos;s future in the other.
            </p>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE STACK */}
      <section id="infrastructure" className="relative px-6 lg:px-10 py-28" style={{ background: "#070d1d" }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>The Agodi Infrastructure Stack</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">Six layers. One foundation.</h2>
            <p className="mt-4 text-white/55 text-[15px] leading-relaxed">Each layer is a standalone platform — and a building block of a connected infrastructure for the next billion people.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STACK.map((s) => (
              <Link key={s.name} href={`/infrastructure/${s.slug}`}
                className="group rounded-2xl p-6 glass-navy transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-white/35">{s.n}</span>
                  <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: BLUE }}>{s.layer}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-2xl">{s.name}</h3>
                <div className="mt-1.5 text-[14px] font-semibold gold-text inline-block">{s.tag}</div>
                <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed">{s.body}</p>
                <div className="mt-5 text-[13px] font-medium text-white/45 group-hover:text-white transition-colors">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section id="ecosystem" className="relative px-6 lg:px-10 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: GOLD }}>One Vision. Multiple Platforms.</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em] leading-tight">Every platform strengthens the others.</h2>
            <p className="mt-5 text-white/55 text-[15px] leading-relaxed max-w-lg">Agodi isn't a collection of apps. It's a connected ecosystem where identity feeds trust, trust feeds commerce, and commerce feeds opportunity.</p>
            <ul className="mt-8 space-y-3">
              {ECOSYSTEM.map(([name, rest]) => (
                <li key={name} className="flex items-baseline gap-3 text-[15px]">
                  <span className="h-1.5 w-1.5 rounded-full mt-2 shrink-0" style={{ background: BLUE }} />
                  <span><span className="font-semibold text-white">{name}</span> <span className="text-white/55">{rest}</span></span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[15px] font-display font-medium gold-text inline-block">Together they form a connected ecosystem.</p>
          </div>
          {/* Connected diagram */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid place-items-center rounded-2xl h-20 w-20 font-display font-bold text-lg z-10" style={{ background: `linear-gradient(135deg,#FFD49A,${GOLD})`, color: "#06070a" }}>Agodi</div>
            </div>
            {STACK.map((s, i) => {
              const angle = (i / STACK.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              return (
                <div key={s.name} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-[11.5px] font-medium glass-navy" style={{ left: `${x}%`, top: `${y}%` }}>{s.name}</div>
              );
            })}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" aria-hidden>
              {STACK.map((_, i) => {
                const a = (i / STACK.length) * Math.PI * 2 - Math.PI / 2;
                return <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(a)} y2={50 + 40 * Math.sin(a)} stroke="rgba(47,107,255,0.25)" strokeWidth="0.3" />;
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="relative px-6 lg:px-10 py-28" style={{ background: "#070d1d" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>Founder Vision</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">Founded by Builders.</h2>
            <div className="mt-6 font-display font-bold text-xl lg:text-2xl">Oluwami Stephen Olaitan Oladeji</div>
            <div className="mt-1.5 text-[13px] uppercase tracking-[0.16em]" style={{ color: GOLD }}>Founder &amp; Chief Executive Officer</div>
            <p className="mt-6 font-display text-2xl lg:text-3xl leading-snug gold-text inline-block">
              Africa should not only consume technology. Africa should build the infrastructure that powers the future.
            </p>
            <p className="mt-7 text-[15px] text-white/60 leading-relaxed max-w-2xl">
              Agodi Technologies was founded on a simple belief. What began as a vision has evolved into a portfolio of platforms designed to solve identity, trust, workforce, commerce, and entertainment challenges at scale.
            </p>
            <p className="mt-6 font-display text-[16px] text-white/80 italic">&ldquo;I don&rsquo;t just build businesses. I build legacies.&rdquo;</p>
          </div>
          <div className="rounded-3xl overflow-hidden glass-navy shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/founder.jpg" alt="Oluwami Stephen Olaitan Oladeji — Founder & CEO" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="relative px-6 lg:px-10 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>Leadership</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">The team building it.</h2>
            <p className="mt-4 text-white/55 text-[15px] leading-relaxed">Founder-led engineering with dedicated technology and finance leadership.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              { img: "/team-ceo-desk.jpg", name: "Oluwami Stephen Olaitan Oladeji", role: "Founder & Chief Executive Officer", tagline: "Dreamer. Builder. Leader." },
              { img: "/team-cto.jpg", name: "Olayemi Samuel Oladeji", role: "Chief Technology Officer", tagline: "Engineering Solutions. Powering the Future." },
              { img: "/team-cfo.jpg", name: "Oluwami Segun Gbemileke Shomade", role: "Chief Financial Officer", tagline: "Finance. Strategy. Growth." },
              { img: "/team-sales-asia.jpg", name: "Georgia Chu", role: "Executive Sales Director, Asia", tagline: "Sales. Partnerships. Expansion.", zoom: "scale(1.55)" },
            ].map((m: { img: string; name: string; role: string; tagline: string; zoom?: string }) => (
              <div key={m.name} className="rounded-2xl overflow-hidden glass-navy shadow-2xl transition-colors duration-300 hover:border-[#2f6bff]/60">
                <div className="h-80 overflow-hidden" style={{ background: "#070d1d" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" style={{ objectPosition: "center top", transform: m.zoom, transformOrigin: "50% 6%" }} />
                </div>
                <div className="p-6 border-t-2" style={{ borderColor: GOLD }}>
                  <div className="font-display font-bold text-[17px] leading-snug text-white">{m.name}</div>
                  <div className="mt-1.5 text-[13px] font-semibold" style={{ color: GOLD }}>{m.role}</div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.14em]" style={{ color: "rgba(47,107,255,0.85)" }}>{m.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="relative px-6 lg:px-10 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: GOLD }}>Why It Matters</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">The opportunity is foundational.</h2>
            <p className="mt-4 text-white/55 text-[15px] leading-relaxed">Africa is building its digital economy from the ground up. Agodi builds the layers everything else depends on.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.k} className="rounded-2xl p-6 glass-navy">
                <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: BLUE }}>{s.k}</div>
                <div className="mt-3 font-display font-bold text-4xl gold-text inline-block">{s.v}</div>
                <p className="mt-2 text-[13px] text-white/55 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section id="vision" className="relative px-6 lg:px-10 py-28 text-center" style={{ background: "radial-gradient(90% 80% at 50% 0%, rgba(47,107,255,0.12), transparent 60%), #070d1d" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl lg:text-6xl tracking-[-0.02em]">From Africa. <span className="gold-text">For the World.</span></h2>
          <p className="mt-6 text-[16px] lg:text-lg text-white/65 leading-relaxed">
            Agodi Technologies builds products designed for global adoption while solving uniquely African challenges. The long-term vision: to become a trusted infrastructure layer for governments, enterprises, developers, and communities around the world.
          </p>
        </div>
      </section>

      {/* INVESTORS — flywheel */}
      <section id="investors" className="relative px-6 lg:px-10 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: GOLD }}>For Investors</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em] leading-tight">Infrastructure creates <span className="blue-text">compounding value.</span></h2>
            <p className="mt-5 text-white/55 text-[15px] leading-relaxed max-w-lg">Each platform strengthens the network. The more the ecosystem grows, the stronger — and more defensible — every layer becomes.</p>
            <ul className="mt-8 space-y-3">
              {FLYWHEEL.map((f) => (
                <li key={f} className="flex items-baseline gap-3 text-[15px]">
                  <span className="font-mono text-[12px]" style={{ color: GOLD }}>→</span>
                  <span className="text-white/75">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[15px] font-display font-medium gold-text inline-block">A flywheel across the entire ecosystem.</p>
            <a href="#partner" className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-[14px] font-semibold" style={{ background: GOLD, color: "#06070a" }}>Partner With Us →</a>
          </div>
          {/* Flywheel ring */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-[14%] rounded-full" style={{ border: "1px dashed rgba(255,160,46,0.35)", animation: "spin-very-slow 40s linear infinite" }} />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-display font-bold text-lg gold-text">Flywheel</div>
                <div className="text-[11px] text-white/40 mt-1">compounding network</div>
              </div>
            </div>
            {["Identity", "Trust", "Commerce", "Work", "Opportunity"].map((n, i) => {
              const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 42 * Math.cos(a);
              const y = 50 + 42 * Math.sin(a);
              return (
                <div key={n} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold glass-navy" style={{ left: `${x}%`, top: `${y}%`, color: i % 2 ? "#7fb0ff" : GOLD }}>{n}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL / FOOTER */}
      <section id="partner" className="relative px-6 lg:px-10 pt-28 pb-16 text-center" style={{ background: "linear-gradient(180deg, #070d1d, #04070f)" }}>
        <div className="max-w-3xl mx-auto">
          <Mark size={48} />
          <h2 className="mt-8 font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em] leading-tight">
            Building the Digital Infrastructure for the <span className="gold-text">Next Billion People.</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[15px] font-display font-medium">
            <span style={{ color: GOLD }}>Africa Founded.</span>
            <span className="text-white">Globally Trusted.</span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <a href="mailto:info@agoditechnologies.com" className="inline-flex items-center rounded-full px-7 py-3.5 text-[14px] font-semibold" style={{ background: GOLD, color: "#06070a" }}>Partner With Us</a>
            <a href="/card" className="inline-flex items-center rounded-full px-7 py-3.5 text-[14px] font-semibold text-white hairline hover:bg-white/5 transition-colors">Founder's Card</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5"><Mark size={24} /> Agodi Technologies (Pty) Ltd</div>
          <div>info@agoditechnologies.com · 55 Aston Rd, Sandton, Johannesburg</div>
          <div>© 2026 Agodi Technologies</div>
        </div>
      </section>
    </main>
  );
}
