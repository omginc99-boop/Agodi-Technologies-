/* Agodi Technologies — Infrastructure for the Next Billion People */

const NAV = [
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#vision", label: "Vision" },
  { href: "#investors", label: "Investors" },
];

const STACK = [
  { n: "01", name: "AfriID", layer: "Identity Infrastructure", tag: "Verify Once. Trusted Everywhere.", body: "Digital identity verification for governments, enterprises, platforms, and people.", href: "#ecosystem" },
  { n: "02", name: "IDVero", layer: "Verification Infrastructure", tag: "Verify with Confidence.", body: "Identity verification APIs — KYC, KYB, onboarding, compliance, and business verification.", href: "https://idvero.vercel.app" },
  { n: "03", name: "AfriMail", layer: "Trust Infrastructure", tag: "Trust Every Email.", body: "AI-powered email trust, phishing protection, cloned-email detection, and sender verification.", href: "https://afriemail.com" },
  { n: "04", name: "Helpers", layer: "Workforce Infrastructure", tag: "Work. Hire. Empower.", body: "A trusted marketplace connecting skilled workers and service providers with opportunity.", href: "https://helpers.africa" },
  { n: "05", name: "Marketplace Lagos", layer: "Commerce Infrastructure", tag: "Buy Local. Grow Local.", body: "Trusted digital commerce infrastructure for retailers, wholesalers, and entrepreneurs.", href: "https://marketplacelagos.com" },
  { n: "06", name: "PlayOlu", layer: "Entertainment Infrastructure", tag: "Play With Purpose.", body: "Africa's digital entertainment ecosystem for children and families.", href: "https://playolu.com" },
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
  { k: "Commerce", v: "$180B", d: "Africa's internet economy by 2025." },
  { k: "Education", v: "1.4B", d: "people — the fastest-growing population on Earth." },
];

const FLYWHEEL = [
  "More identities create more trust.",
  "More trust creates more commerce.",
  "More commerce creates more work.",
  "More work creates more opportunity.",
];

const GOLD = "#e8b04b";
const BLUE = "#2f6bff";

function Mark({ size = 34 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-lg font-display font-bold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, #f6d79a, ${GOLD} 55%, #c79633)`,
        color: "#06070a",
        fontSize: size * 0.55,
      }}
    >
      A
    </span>
  );
}

function NetworkBg() {
  // Subtle connected-node infrastructure motif behind the hero.
  const nodes = [
    [70, 18], [88, 34], [62, 46], [82, 62], [54, 70], [92, 78], [72, 88],
  ];
  return (
    <svg className="absolute right-0 top-0 h-full w-[60%] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="glow" cx="78%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(47,107,255,0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#glow)" />
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => {
          const d = Math.hypot(x - x2, y - y2);
          if (d > 30) return null;
          return <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(232,176,75,0.18)" strokeWidth="0.18" />;
        }),
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 0.9 : 0.55} fill={i % 3 === 0 ? GOLD : "#7fb0ff"} className="net-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
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
      <section id="top" className="relative px-6 lg:px-10 pt-24 pb-28 min-h-[88vh] flex items-center" style={{ background: "radial-gradient(120% 90% at 80% -10%, rgba(47,107,255,0.18), transparent 55%), radial-gradient(80% 70% at 100% 30%, rgba(232,176,75,0.10), transparent 60%)" }}>
        <NetworkBg />
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
              <a key={s.name} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="group rounded-2xl p-6 glass-navy transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-white/35">{s.n}</span>
                  <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: BLUE }}>{s.layer}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-2xl">{s.name}</h3>
                <div className="mt-1.5 text-[14px] font-semibold gold-text inline-block">{s.tag}</div>
                <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed">{s.body}</p>
                <div className="mt-5 text-[13px] font-medium text-white/45 group-hover:text-white transition-colors">Learn more →</div>
              </a>
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
              <div className="grid place-items-center rounded-2xl h-20 w-20 font-display font-bold text-lg z-10" style={{ background: `linear-gradient(135deg,#f6d79a,${GOLD})`, color: "#06070a" }}>Agodi</div>
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>Founder Vision</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">Founded by Builders.</h2>
          <p className="mt-7 text-[16px] lg:text-lg text-white/65 leading-relaxed">
            Agodi Technologies was founded by <span className="text-white font-medium">Oluwami Stephen Olaitan Oladeji</span> with a simple belief:
          </p>
          <p className="mt-5 font-display text-2xl lg:text-3xl leading-snug gold-text inline-block">
            Africa should not only consume technology. Africa should build the infrastructure that powers the future.
          </p>
          <p className="mt-7 text-[15px] text-white/55 leading-relaxed max-w-2xl mx-auto">
            What began as a vision has evolved into a portfolio of platforms designed to solve identity, trust, workforce, commerce, and entertainment challenges at scale.
          </p>
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
            <div className="absolute inset-[14%] rounded-full" style={{ border: "1px dashed rgba(232,176,75,0.35)", animation: "spin-very-slow 40s linear infinite" }} />
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
