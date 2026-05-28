import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import AgodiLogo from "@/components/AgodiLogo";
import CinematicBackground from "@/components/CinematicBackground";
import CountUp from "@/components/CountUp";
import AnimatedHands from "@/components/AnimatedHands";

// Check at build time whether the founder portrait has been provided.
// Drop a `founder.jpg` (or `.png`) into /public/ to auto-replace the
// designed placeholder.
// Founder portrait detection. PNG comes first so the transparent cutout wins
// over the original JPG (both can co-exist; .png takes priority).
const FOUNDER_PORTRAIT = (() => {
  const dir = join(process.cwd(), "public");
  for (const name of ["founder.png", "founder.webp", "founder.jpg", "founder.jpeg"]) {
    if (existsSync(join(dir, name))) return `/${name}`;
  }
  return null;
})();
const FOUNDER_HAS_TRANSPARENT_BG = FOUNDER_PORTRAIT?.endsWith(".png") || FOUNDER_PORTRAIT?.endsWith(".webp");

// Chief Engineer & MD portrait
const CHIEF_ENG_PORTRAIT = (() => {
  const dir = join(process.cwd(), "public");
  for (const name of ["chief-engineer.png", "chief-engineer.webp", "chief-engineer.jpg", "chief-engineer.jpeg"]) {
    if (existsSync(join(dir, name))) return `/${name}`;
  }
  return null;
})();

// Chief Finance Officer portrait
const CFO_PORTRAIT = (() => {
  const dir = join(process.cwd(), "public");
  for (const name of ["cfo.png", "cfo.webp", "cfo.jpg", "cfo.jpeg", "finance.png", "finance.jpg"]) {
    if (existsSync(join(dir, name))) return `/${name}`;
  }
  return null;
})();

// Hero-top image (above-the-fold). Looks for hero.* first — a brand cinematic
// like the African man + AI dashboard shot. Falls back to hands.* if absent.
const HERO_TOP_IMAGE = (() => {
  const dir = join(process.cwd(), "public");
  for (const name of ["hero.png", "hero.webp", "hero.jpg", "hero.jpeg", "hands.png", "hands.jpg"]) {
    if (existsSync(join(dir, name))) return `/${name}`;
  }
  return null;
})();

// AI × Humanity image — the hands cutout. Used in the dedicated section below.
const HERO_IMAGE = (() => {
  const dir = join(process.cwd(), "public");
  for (const name of ["hands.png", "hands.webp", "hands.jpg", "hands.jpeg"]) {
    if (existsSync(join(dir, name))) return `/${name}`;
  }
  return null;
})();
const HERO_IS_CUTOUT = HERO_IMAGE?.endsWith(".png") || HERO_IMAGE?.endsWith(".webp");

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#what-we-build", label: "Capabilities" },
  { href: "#ai-humanity", label: "AI × Humanity" },
  { href: "#ventures", label: "Ventures" },
  { href: "#founder", label: "Founder" },
  { href: "#investors", label: "Investors" },
];

const VENTURES_WE_BUILD = [
  { icon: "🧠", title: "Artificial Intelligence", body: "AI-native products that move at the speed of insight." },
  { icon: "🎮", title: "Gaming Ecosystems", body: "Original African-rooted game worlds for kids and families." },
  { icon: "📚", title: "Educational Technology", body: "Learning platforms designed for the next generation of African learners." },
  { icon: "🎬", title: "Animation & Storytelling", body: "Original IP that travels — built for screens, sound, and culture." },
  { icon: "👶", title: "Children's Digital Entertainment", body: "Safe, ad-free worlds for children — newborn to twelve." },
  { icon: "📱", title: "Scalable Mobile Platforms", body: "Native and web-first products engineered for emerging-market velocity." },
  { icon: "🛰️", title: "Digital Media Infrastructure", body: "The pipes, players, and platforms that carry our stories." },
  { icon: "🚀", title: "Future Technology Ecosystems", body: "Long-horizon bets where Africa will lead — voice, agents, robotics." },
];

const INVESTOR_PILLARS = [
  { num: "01", title: "Africa's fast-growing digital economy", body: "1.5 billion people. Mobile-first. Youngest median age on the planet. We build for it from inside it." },
  { num: "02", title: "Global scalability by design", body: "Every product ships worldwide from day one. We build globally — we just start locally." },
  { num: "03", title: "Exportable intellectual property", body: "Our characters, stories, and platforms are owned brands — licensable, durable, expandable." },
  { num: "04", title: "AI + entertainment converging", body: "We sit at the intersection of generative AI, premium content, and consumer behavior — the most valuable real estate in tech." },
  { num: "05", title: "Long-term technology infrastructure", body: "We're not chasing trends. We're building the rails for African-born tech to compete globally for a decade." },
  { num: "06", title: "Social impact + commercial growth", body: "Every product we ship moves the continent forward. Every dollar we earn proves African tech is investable." },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/70 border-b border-purple-soft/10">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <AgodiLogo size={40} />
            <span className="font-display font-bold tracking-tight text-xl hidden sm:inline">
              <span className="text-cream">Agodi</span>
              <span className="text-stone group-hover:text-purple-soft transition-colors"> Technologies</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-mist/80">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-cream transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple to-orange text-cream hover:shadow-lg hover:shadow-purple/30 transition-all"
          >
            Contact Founder
            <span aria-hidden>→</span>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-24 pb-32 px-6 lg:px-10 min-h-screen flex items-center">
        <CinematicBackground />
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center">
            {/* LEFT: Headline + copy + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-[0.2em] text-purple-soft mb-10 fade-up">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                African Technology · Worldwide Ambition
              </div>
              <h1 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl fade-up" style={{ animationDelay: "0.05s" }}>
                <span className="gradient-text">Agodi</span><br />
                <span className="gradient-text-orange">Technologies</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-mist/85 font-display font-light leading-snug fade-up" style={{ animationDelay: "0.1s" }}>
                Engineering Africa&apos;s Digital Future.
              </p>
              <p className="mt-8 text-base lg:text-lg text-mist/70 leading-relaxed font-light fade-up max-w-2xl" style={{ animationDelay: "0.2s" }}>
                A next-generation African technology company building globally scalable platforms across{" "}
                <span className="text-cream font-medium">artificial intelligence</span>,{" "}
                <span className="text-cream font-medium">entertainment</span>,{" "}
                <span className="text-cream font-medium">education</span>,{" "}
                <span className="text-cream font-medium">gaming</span>, and{" "}
                <span className="text-cream font-medium">digital infrastructure</span>.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 fade-up" style={{ animationDelay: "0.25s" }}>
                <a
                  href="#what-we-build"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-cream overflow-hidden transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #4B1FAF 0%, #FF8C00 100%)",
                    boxShadow: "0 10px 40px rgba(75,31,175,0.5)",
                  }}
                >
                  <span className="relative z-10">Explore The Vision</span>
                  <span className="relative z-10" aria-hidden>→</span>
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF8C00 0%, #4B1FAF 100%)",
                    }}
                    aria-hidden
                  />
                </a>
                <a
                  href="https://playolu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold border border-purple-soft/40 hover:border-purple-soft hover:bg-purple-soft/10 transition-all text-cream backdrop-blur-sm"
                >
                  View PlayOlu™
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            {/* RIGHT: AI × Africa visual — premium hero composition, cutout floats on page */}
            <div className="relative aspect-[4/3] lg:aspect-[4/3] fade-up" style={{ animationDelay: "0.2s" }}>
              {/* Outer ambient halo — wide cinematic glow */}
              <div
                className="absolute -inset-12 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,122,26,0.18) 0%, rgba(105,54,209,0.15) 30%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                aria-hidden
              />
              {/* Inner contact-point bloom — bright bloom at the point of touch */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,171,102,0.40) 0%, rgba(159,123,255,0.20) 30%, transparent 60%)",
                }}
                aria-hidden
              />
              <div className="relative h-full w-full">
                {HERO_TOP_IMAGE ? (
                  <>
                    {/* Hero cinematic — full image, only the very corners soften into the page */}
                    <Image
                      src={HERO_TOP_IMAGE}
                      alt="An African technologist interacting with a futuristic AI dashboard — Agodi Technologies engineering Africa's digital future"
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 600px"
                      style={{
                        filter:
                          "saturate(1.05) contrast(1.05) brightness(1.02) drop-shadow(0 30px 60px rgba(75,31,175,0.45))",
                        // Very gentle mask — full image visible, edges just soften
                        WebkitMaskImage:
                          "radial-gradient(ellipse 100% 100% at 50% 50%, black 80%, transparent 100%)",
                        maskImage:
                          "radial-gradient(ellipse 100% 100% at 50% 50%, black 80%, transparent 100%)",
                      }}
                    />
                    {/* Subtle brand soft-light tint — keeps the image on-brand without recolouring */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                      style={{
                        background:
                          "linear-gradient(135deg, #4B1FAF 0%, transparent 50%, #FF8C00 100%)",
                      }}
                      aria-hidden
                    />
                  </>
                ) : (
                  // Placeholder until hands.jpg is dropped into /public
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-plum via-purple to-orange/60" />
                    <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,171,102,0.4) 0%, transparent 60%)" }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-cream px-8 text-center">
                      <div className="text-6xl mb-4 opacity-70">🤖 🤝 👶🏿</div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3 font-semibold">— AI × Africa</div>
                      <div className="font-display font-bold text-xl text-cream/90 leading-snug mb-6">
                        The next generation of Africa<br />meets the technology of tomorrow.
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-auto">
                        Drop hands.jpg in /public to swap in
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Aggregate marquee — animated counters, full-width below the grid */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-purple-soft/15 rounded-2xl overflow-hidden glass fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="p-8 bg-ink/60">
              <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text-orange tracking-tight">
                <CountUp to={3} duration={1.8} />
              </div>
              <div className="mt-3 text-xs text-stone uppercase tracking-[0.2em] font-mono">Live Products</div>
            </div>
            <div className="p-8 bg-ink/60">
              <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text-orange tracking-tight">
                <CountUp to={30} duration={2} /> days
              </div>
              <div className="mt-3 text-xs text-stone uppercase tracking-[0.2em] font-mono">Zero → Three Launches</div>
            </div>
            <div className="p-8 bg-ink/60">
              <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text-orange tracking-tight">
                <CountUp to={120} duration={2.4} />M+
              </div>
              <div className="mt-3 text-xs text-stone uppercase tracking-[0.2em] font-mono">Audience Reach</div>
            </div>
            <div className="p-8 bg-ink/60">
              <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text-orange tracking-tight">
                <CountUp to={35} duration={2} />+
              </div>
              <div className="mt-3 text-xs text-stone uppercase tracking-[0.2em] font-mono">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Who We Are</div>
          <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05] mb-10">
            World-class digital products,{" "}
            <span className="gradient-text">originating from Africa</span>,{" "}
            <span className="text-stone">designed for global markets.</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-10 mt-14 text-lg leading-relaxed text-mist/85">
            <p>
              Agodi Technologies is the parent company behind a portfolio of next-generation
              consumer platforms — engineered for African audiences first, built for the world second.
            </p>
            <p>
              We operate as an AI-native studio. Our teams ship at startup velocity with studio-level
              craft, owning every layer — product, content, intellectual property, and infrastructure.
            </p>
            <p>
              The next globally recognised technology and entertainment ecosystems will
              emerge from Africa. We&apos;re building them.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="what-we-build" className="relative py-32 px-6 lg:px-10 bg-night/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Capabilities</div>
              <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05]">
                What We <span className="gradient-text">Build.</span>
              </h2>
            </div>
            <p className="text-mist/70 max-w-lg text-lg">
              Eight verticals. One thesis. Each capability compounds across our portfolio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENTURES_WE_BUILD.map((v) => (
              <div
                key={v.title}
                className="glass rounded-2xl p-7 hover:glass-strong hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-5 transition-transform group-hover:scale-110">{v.icon}</div>
                <h3 className="font-display font-bold text-xl mb-3 text-cream group-hover:text-purple-soft transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-mist/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI × HUMANITY — flagship narrative section */}
      <section id="ai-humanity" className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full opacity-30 -z-10"
          style={{ background: "radial-gradient(circle, rgba(255,122,26,0.30) 0%, transparent 65%)" }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— AI × Humanity</div>
          <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05] mb-20 max-w-5xl">
            Engineering the connection between{" "}
            <span className="gradient-text-orange">Africa&apos;s next generation</span>{" "}
            and the <span className="gradient-text">technology of tomorrow.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image — two hands animate toward each other on scroll into view */}
            <div className="relative aspect-[5/4]">
              <AnimatedHands />
            </div>

            {/* Quote + supporting copy */}
            <div className="space-y-10">
              <div className="font-display text-7xl gradient-text-orange leading-none">&ldquo;</div>
              <blockquote className="font-display font-medium text-2xl lg:text-3xl leading-[1.3] text-cream">
                We don&apos;t build AI <span className="text-orange italic">for</span> Africa.
                We build it <span className="text-orange italic">with</span> Africa &mdash; starting
                with the children we&apos;ll hand it to.
              </blockquote>
              <div className="pt-6 border-t border-purple-soft/20">
                <div className="text-stone text-[11px] uppercase tracking-[0.3em] mb-2 font-semibold">Our position</div>
                <p className="text-mist/80 text-lg leading-relaxed">
                  Africa has the youngest population on the planet — and the most to gain from AI done right.
                  We build technology that belongs to the people who use it: African creators, African children, and the
                  global audiences who will love what they make.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Human-centered AI", "African-first design", "Globally scalable", "Ethically sourced data"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-xs font-semibold glass text-mist/90 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VENTURE: PLAYOLU */}
      <section id="ventures" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Featured Venture</div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05] mb-8">
                PlayOlu<sup className="text-3xl text-orange align-super">™</sup>
                <span className="block text-2xl lg:text-3xl mt-4 text-stone font-medium">
                  The Future of Children&apos;s Digital Entertainment
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-mist/80 leading-relaxed mb-10">
                PlayOlu is a next-generation children&apos;s entertainment and educational technology
                ecosystem combining storytelling, gaming, emotional intelligence, AI-powered
                experiences, and African-inspired creativity — built for kids from newborn to twelve.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["Stories", "Games", "AI Voice", "African Folklore", "COPPA-Safe", "Lifetime Family Pass"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-xs font-semibold glass text-mist/90 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://playolu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold bg-gradient-to-r from-purple to-orange text-cream hover:shadow-xl hover:shadow-orange/30 transition-all"
              >
                View PlayOlu
                <span aria-hidden>↗</span>
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-to-br from-purple/30 to-orange/30 blur-2xl" aria-hidden />
              <div className="relative glass-strong rounded-3xl p-10">
                <div className="flex items-start justify-between mb-8">
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-orange/20 text-orange uppercase tracking-[0.2em]">
                    Live · playolu.com
                  </span>
                  <span className="text-stone text-sm">Shipped 2026-05-08</span>
                </div>
                <div className="text-7xl mb-6">🌙</div>
                <div className="font-display font-black text-3xl mb-2 text-cream">Olu the Play Hero</div>
                <div className="text-mist/70 mb-8">
                  An original African-rooted character universe — gaming, learning, bedtime stories, lullabies,
                  speech practice, all in a child&apos;s home language.
                </div>
                <dl className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-soft/20">
                  <div>
                    <dt className="text-stone text-xs uppercase tracking-wider mb-1">Audience</dt>
                    <dd className="font-display font-bold text-xl text-cream">0–12</dd>
                  </div>
                  <div>
                    <dt className="text-stone text-xs uppercase tracking-wider mb-1">Languages</dt>
                    <dd className="font-display font-bold text-xl text-cream">15+</dd>
                  </div>
                  <div>
                    <dt className="text-stone text-xs uppercase tracking-wider mb-1">Model</dt>
                    <dd className="font-display font-bold text-xl text-cream">Lifetime</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Other ventures strip */}
          <div className="mt-24 pt-16 border-t border-purple-soft/15">
            <h3 className="font-display font-bold text-2xl text-stone mb-10">More from the portfolio</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="https://legal-assist-nine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 hover:glass-strong hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange">Legal Tech</span>
                  <span className="text-xs text-stone">Live</span>
                </div>
                <h4 className="font-display font-bold text-2xl text-cream mb-3 group-hover:text-purple-soft transition-colors">
                  Legal Buddy
                </h4>
                <p className="text-mist/70 mb-6">
                  A two-sided legal marketplace with AI triage — matching clients to vetted lawyers, worldwide.
                </p>
                <span className="text-sm text-purple-soft inline-flex items-center gap-2">
                  Visit Legal Buddy <span aria-hidden>↗</span>
                </span>
              </a>
              <a
                href="https://care-buddy-ten.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 hover:glass-strong hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange">HealthTech</span>
                  <span className="text-xs text-stone">Live</span>
                </div>
                <h4 className="font-display font-bold text-2xl text-cream mb-3 group-hover:text-purple-soft transition-colors">
                  Oshun Health
                </h4>
                <p className="text-mist/70 mb-6">
                  Named for the orisha of healing waters — connecting patients with the right doctor or nurse, fast.
                </p>
                <span className="text-sm text-purple-soft inline-flex items-center gap-2">
                  Visit Oshun Health <span aria-hidden>↗</span>
                </span>
              </a>
              <a
                href="https://the100rand.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 hover:glass-strong hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange">Commerce</span>
                  <span className="text-xs text-stone">Live · 2026-05-22</span>
                </div>
                <h4 className="font-display font-bold text-2xl text-cream mb-3 group-hover:text-purple-soft transition-colors">
                  The 100 Rand Shop
                </h4>
                <p className="text-mist/70 mb-6">
                  South Africa&apos;s most addictive R100 shop — almost for mahala. Flat-price commerce for the mass market.
                </p>
                <span className="text-sm text-purple-soft inline-flex items-center gap-2">
                  Visit the shop <span aria-hidden>↗</span>
                </span>
              </a>
              <a
                href="https://afriid.africa"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 hover:glass-strong hover:-translate-y-1 transition-all group relative overflow-hidden"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(16,201,137,0.18)",
                }}
              >
                <div
                  className="absolute inset-0 -z-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(500px 200px at 100% 0%, rgba(16,201,137,0.16), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#34e0a4" }}>
                    Identity Network
                  </span>
                  <span className="text-xs text-stone">Live · 2026-05-28</span>
                </div>
                <h4 className="font-display font-bold text-2xl text-cream mb-3 group-hover:text-purple-soft transition-colors">
                  AfriID<sup className="text-sm text-stone align-super ml-0.5">™</sup>
                </h4>
                <p className="text-mist/70 mb-6">
                  Africa&apos;s consumer identity network. One verified identity. Everywhere — powered by IDVero™ infrastructure.
                </p>
                <span className="text-sm inline-flex items-center gap-2" style={{ color: "#34e0a4" }}>
                  Visit AfriID <span aria-hidden>↗</span>
                </span>
              </a>
            </div>

            {/* Identity-protected portfolio strip */}
            <div
              className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,201,137,0.10), rgba(77,212,255,0.06))",
                border: "1px solid rgba(16,201,137,0.25)",
              }}
            >
              <div className="flex items-center gap-3 text-left">
                <span style={{ fontSize: 26 }} aria-hidden>🛡️</span>
                <div>
                  <div className="font-display font-bold text-cream text-lg leading-tight">
                    Identity-protected across the portfolio
                  </div>
                  <div className="text-mist/70 text-sm">
                    Every Agodi product verifies real humans using AfriID™ + IDVero™.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {["Legal Buddy", "Sisi Nurse", "PlayOlu", "Helper", "100 Rand Shop"].map(
                  (n) => (
                    <span
                      key={n}
                      className="px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: "rgba(16,201,137,0.14)",
                        color: "#a3f0cb",
                        border: "1px solid rgba(16,201,137,0.3)",
                      }}
                    >
                      {n}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="founder" className="relative py-32 px-6 lg:px-10 bg-night/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Leadership</div>
          <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05] mb-16">
            Built by builders.<br />
            <span className="gradient-text">Backed by conviction.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
            {[
              {
                key: "founder",
                image: "/mgmt-founder.png",
                name: "Oluwami Stephen Olaitan Oladeji",
                role: "Founder & CEO",
                email: "info@agoditechnologies.com",
                subject: "Agodi Technologies — Founder Intro",
                alt: "Oluwami Stephen Olaitan Oladeji — Founder & CEO of Agodi Technologies",
              },
              {
                key: "chief",
                image: "/mgmt-engineer.png",
                name: "Olayemi Samuel Oladeji",
                role: "Chief Engineer & Managing Director",
                email: "olayemi.samuel@agoditechnologies.com",
                subject: "Agodi Technologies — Chief Engineer Inquiry",
                alt: "Olayemi Samuel Oladeji — Chief Engineer & Managing Director of Agodi Technologies",
              },
              {
                key: "cfo",
                image: "/mgmt-cfo.png",
                name: "Oluwasegun Shomade Gbemileke",
                role: "Chief Financial Officer",
                email: "gbemileke@agoditechnologies.com",
                subject: "Agodi Technologies — CFO Inquiry",
                alt: "Oluwasegun Shomade Gbemileke — Chief Financial Officer of Agodi Technologies",
              },
            ].map((leader) => (
              <div key={leader.key} className="relative group">
                {/* Soft brand glow behind the card */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple/40 via-purple-soft/10 to-orange/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" aria-hidden />
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-purple-soft/20 group-hover:ring-purple-soft/40 transition-all bg-ink/95">
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    width={1200}
                    height={1800}
                    className="w-full h-auto block"
                    priority={leader.key === "founder"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="px-5 py-5 border-t border-purple-soft/15">
                    <div className="font-display font-bold text-cream text-lg lg:text-xl leading-tight mb-1">
                      {leader.name}
                    </div>
                    <div className="text-orange text-xs lg:text-sm font-semibold uppercase tracking-wider mb-3">
                      {leader.role}
                    </div>
                    <a
                      href={`mailto:${leader.email}?subject=${encodeURIComponent(leader.subject)}`}
                      className="text-mist/80 text-sm hover:text-cream hover:underline transition-colors break-all"
                    >
                      {leader.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vision quote + connect */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl lg:text-3xl text-cream font-display font-medium leading-snug">
              &ldquo;The next globally recognised technology and entertainment ecosystems will emerge from Africa.
              We&apos;re not waiting for permission to build them.&rdquo;
            </p>
            <p className="mt-8 text-mist/75 text-lg leading-relaxed">
              Agodi Technologies is led by a team of builders engineering globally scalable African-born
              intellectual property and digital technology platforms — across product, brand,
              and infrastructure.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold border border-purple-soft/40 hover:border-purple-soft hover:bg-purple-soft/10 transition-all text-cream"
              >
                Connect with leadership
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR CONFIDENCE */}
      <section id="investors" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Investor Confidence</div>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end mb-16">
            <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05]">
              Why <span className="gradient-text-orange">Agodi Technologies</span> matters.
            </h2>
            <p className="text-mist/70 text-lg leading-relaxed">
              We are positioned at the intersection of the fastest-growing user base on earth and the
              most powerful technology shift of our lifetime. Six reasons capital should pay attention.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVESTOR_PILLARS.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-8 hover:glass-strong transition-all">
                <div className="font-mono font-bold text-base gradient-text-orange tracking-[0.2em] mb-5">
                  {p.num}
                </div>
                <h3 className="font-display font-bold text-xl text-cream mb-4 leading-snug">{p.title}</h3>
                <p className="text-sm text-mist/75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION QUOTE */}
      <section className="relative py-32 px-6 lg:px-10 bg-night/50 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(255,122,26,0.25) 0%, transparent 60%)" }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="font-display text-7xl mb-8 gradient-text-orange leading-none">&ldquo;</div>
          <blockquote className="font-display font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.1] mb-10 text-cream">
            We believe the next globally recognised{" "}
            <span className="gradient-text">technology and entertainment</span>{" "}
            ecosystems will emerge from <span className="gradient-text-orange">Africa</span>.
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <AgodiLogo size={36} />
            <div className="text-left">
              <div className="font-semibold text-cream">Agodi Technologies</div>
              <div className="text-stone text-sm">Engineering Africa&apos;s Digital Future</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange mb-6">— Get In Touch</div>
          <h2 className="font-display font-black tracking-tight text-4xl lg:text-6xl leading-[1.05] mb-10">
            Partner with us.<br />
            <span className="gradient-text">Build with us.</span>
          </h2>
          <p className="text-xl text-mist/80 mb-12 max-w-3xl leading-relaxed">
            We&apos;re always open to investors, partners, and collaborators who share our conviction
            that African-born technology will define the next decade.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:info@agoditechnologies.com?subject=Agodi%20Technologies%20—%20Inquiry"
              className="glass-strong rounded-2xl p-10 hover:scale-[1.02] transition-all group"
            >
              <div className="text-stone uppercase tracking-[0.2em] text-xs mb-4">Investor &amp; Partner Inbox</div>
              <div className="font-display font-bold text-2xl lg:text-3xl text-cream mb-4 group-hover:gradient-text transition-all">
                info@agoditechnologies.com
              </div>
              <div className="text-sm text-mist/70">Tap to send an introduction — we read every email.</div>
            </a>
            <div className="glass-strong rounded-2xl p-10">
              <div className="text-stone uppercase tracking-[0.2em] text-xs mb-4">Founder</div>
              <div className="font-mono font-bold text-sm lg:text-base text-cream mb-2 whitespace-nowrap tracking-tight">
                Oluwami Stephen Olaitan Oladeji
              </div>
              <div className="text-orange font-medium mb-6">Founder &amp; Visionary Lead</div>
              <a
                href="mailto:info@agoditechnologies.com?subject=Agodi%20Technologies%20—%20Founder%20Intro"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-purple to-orange text-cream hover:shadow-lg hover:shadow-purple/30 transition-all"
              >
                Contact the founder
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-purple-soft/15 py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <AgodiLogo size={44} />
                <span className="font-display font-bold text-2xl">
                  <span className="text-cream">Agodi</span>
                  <span className="text-stone"> Technologies</span>
                </span>
              </div>
              <p className="text-mist/60 max-w-md leading-relaxed mb-6">
                Engineering Africa&apos;s Digital Future. A next-generation African technology company
                building globally scalable platforms.
              </p>
            </div>
            <div>
              <div className="text-stone uppercase tracking-[0.2em] text-xs mb-4 font-semibold">Ventures</div>
              <ul className="space-y-2 text-mist/70">
                <li><a href="https://playolu.com" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">PlayOlu ↗</a></li>
                <li><a href="https://legal-assist-nine.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Legal Buddy ↗</a></li>
                <li><a href="https://care-buddy-ten.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Oshun Health ↗</a></li>
                <li><a href="https://the100rand.shop" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">The 100 Rand Shop ↗</a></li>
              </ul>
            </div>
            <div>
              <div className="text-stone uppercase tracking-[0.2em] text-xs mb-4 font-semibold">Company</div>
              <ul className="space-y-2 text-mist/70">
                <li><a href="#about" className="hover:text-cream transition-colors">About</a></li>
                <li><a href="#what-we-build" className="hover:text-cream transition-colors">What We Build</a></li>
                <li><a href="#founder" className="hover:text-cream transition-colors">Founder</a></li>
                <li><a href="#investors" className="hover:text-cream transition-colors">Investors</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-purple-soft/10 flex flex-col sm:flex-row gap-3 justify-between text-sm text-stone">
            <span>© {new Date().getFullYear()} Agodi Technologies. All rights reserved.</span>
            <span>Engineering Africa&apos;s Digital Future.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
