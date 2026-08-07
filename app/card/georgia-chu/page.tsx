import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Georgia Chu — Executive Sales Director, Asia · Agodi Technologies",
  description:
    "Digital business card for Georgia Chu, Executive Sales Director for Asia at Agodi Technologies — building Africa's digital infrastructure.",
};

const EMERALD = "#34e0a4";
const PURPLE = "#4B1FAF";
const ORANGE = "#FF8C00";

const PHONE = "17205925025";
const EMAIL = "georgiachu28@gmail.com";
const LEADERSHIP = "https://agoditechnologies.com/#leadership";

function Action({
  href,
  label,
  icon,
  accent,
  external,
}: {
  href: string;
  label: string;
  icon: string;
  accent: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-transform hover:-translate-y-0.5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-full text-[15px]"
        style={{ background: accent, color: "#06070a" }}
      >
        {icon}
      </span>
      <span className="text-[11px] text-white/70">{label}</span>
    </a>
  );
}

export default function GeorgiaCardPage() {
  return (
    <main
      className="min-h-screen w-full px-5 py-10 text-white"
      style={{
        fontFamily: "var(--font-body), Inter, sans-serif",
        background:
          "radial-gradient(120% 80% at 15% -10%, rgba(75,31,175,0.45), transparent 55%), radial-gradient(120% 80% at 100% 0%, rgba(255,140,0,0.18), transparent 50%), #06070a",
      }}
    >
      <div className="mx-auto w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg font-bold"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})`, color: "#06070a", fontFamily: "var(--font-display)" }}
          >
            A
          </span>
          <div className="text-[12px] uppercase tracking-[0.22em] text-white/60">
            Agodi Technologies
          </div>
        </div>

        {/* Identity */}
        <div className="mt-8 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/team-sales-asia.jpg"
            alt="Georgia Chu"
            width={76}
            height={76}
            className="h-[76px] w-[76px] flex-none rounded-full object-cover"
            style={{ border: `2px solid ${ORANGE}`, objectPosition: "center 30%" }}
          />
          <div>
            <h1
              className="font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(22px, 6vw, 30px)" }}
            >
              Georgia Chu
            </h1>
            <div
              className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium"
              style={{ background: "rgba(255,140,0,0.12)", color: ORANGE, border: `1px solid rgba(255,140,0,0.3)` }}
            >
              Executive Sales Director, Asia
            </div>
          </div>
        </div>

        {/* Pitch */}
        <p className="mt-6 text-[14.5px] leading-relaxed text-white/75">
          Driving <span className="text-white">sales, partnerships &amp; market expansion across Asia</span> for Agodi Technologies — the holding company building globally scalable African digital ecosystems.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11.5px]">
          {["Sales & partnerships", "Asia expansion", "Global Vision · African Impact"].map((s) => (
            <span key={s} className="rounded-full px-2.5 py-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {s}
            </span>
          ))}
        </div>

        {/* Contact actions */}
        <div className="mt-7 grid grid-cols-4 gap-2.5">
          <Action href="/georgia-chu.vcf" label="Save" icon="↓" accent={EMERALD} />
          <Action href={`tel:${PHONE}`} label="Call" icon="✆" accent="#ffffff" />
          <Action href={`mailto:${EMAIL}`} label="Email" icon="✉" accent={ORANGE} />
          <Action href="https://agoditechnologies.com" label="Web" icon="◎" accent={PURPLE} external />
        </div>

        {/* Leadership CTA */}
        <a
          href={LEADERSHIP}
          className="mt-7 flex items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})`, color: "#ffffff" }}
        >
          Meet the leadership team →
        </a>
        <a
          href="/"
          className="mt-3 flex items-center justify-center rounded-2xl py-3 text-[13.5px] font-medium text-white/80"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Explore Agodi&apos;s full portfolio →
        </a>

        {/* Contact details */}
        <div className="mt-8 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="grid gap-2 text-[13px]">
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-white/80">
              <span className="text-white/40">Phone</span>
              <span className="ml-auto" style={{ color: EMERALD }}>17205925025</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/80">
              <span className="text-white/40">Email</span>
              <span className="ml-auto" style={{ color: EMERALD }}>{EMAIL}</span>
            </a>
            <a href="https://agoditechnologies.com" className="flex items-center gap-3 text-white/80">
              <span className="text-white/40">Web</span>
              <span className="ml-auto" style={{ color: EMERALD }}>agoditechnologies.com</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-[10.5px] text-white/30">
          agoditechnologies.com/card/georgia-chu
        </div>
      </div>
    </main>
  );
}
