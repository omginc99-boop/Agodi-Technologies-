import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oluwami Oladeji — Founder & CEO, Agodi Technologies",
  description:
    "Digital business card for Oluwami Oladeji Stephen Olaitan, Founder & CEO of Agodi Technologies — a holding company building Africa's digital ecosystems.",
};

const EMERALD = "#34e0a4";
const PURPLE = "#4B1FAF";
const ORANGE = "#FF8C00";

const PHONE = "+27787772313";
const WHATSAPP = "+27713928456";
const EMAIL = "info@agoditechnologies.com";

const PRODUCTS: { name: string; tag: string; href?: string }[] = [
  { name: "IDVero", tag: "Identity & KYB", href: "https://idvero.vercel.app" },
  { name: "The 100 Rand Shop", tag: "Flat-price commerce", href: "https://the100rand.shop" },
  { name: "Helper", tag: "Social + jobs", href: "https://helpers.africa" },
  { name: "PlayOlu", tag: "Kids learning games", href: "https://playolu.com" },
  { name: "Legal Buddy", tag: "AI legal marketplace", href: "https://legal-buddy.co.za" },
  { name: "AfriMail", tag: "Email trust gateway", href: "https://afriemail.com" },
  { name: "Marketplace Lagos", tag: "Trust-first marketplace", href: "https://marketplacelagos.com" },
  { name: "Sisi Nurse", tag: "A nurse on your phone", href: "https://oshun.africa" },
];

function Action({
  href,
  label,
  icon,
  accent,
}: {
  href: string;
  label: string;
  icon: string;
  accent: string;
}) {
  return (
    <a
      href={href}
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

export default function CardPage() {
  return (
    <main
      className="min-h-screen w-full px-5 py-10 text-white"
      style={{
        fontFamily: "var(--font-body), Inter, sans-serif",
        background:
          "radial-gradient(120% 80% at 15% -10%, rgba(75,31,175,0.45), transparent 55%), radial-gradient(120% 80% at 100% 0%, rgba(52,224,164,0.22), transparent 50%), #06070a",
      }}
    >
      <div className="mx-auto w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg font-bold"
            style={{ background: `linear-gradient(135deg, ${EMERALD}, ${PURPLE})`, color: "#06070a", fontFamily: "var(--font-display)" }}
          >
            A
          </span>
          <div className="text-[12px] uppercase tracking-[0.22em] text-white/60">
            Agodi Technologies
          </div>
        </div>

        {/* Identity */}
        <div className="mt-8">
          <h1
            className="whitespace-nowrap font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(15px, 5vw, 22px)" }}
          >
            Oluwami Oladeji Stephen Olaitan
          </h1>
          <div className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-[12.5px] font-medium"
            style={{ background: "rgba(52,224,164,0.12)", color: EMERALD, border: `1px solid rgba(52,224,164,0.3)` }}>
            Founder &amp; CEO
          </div>
        </div>

        {/* Pitch */}
        <p className="mt-6 text-[14.5px] leading-relaxed text-white/75">
          A holding company building <span className="text-white">globally scalable African digital ecosystems</span> — across identity, fintech, commerce, social, education &amp; AI.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11.5px]">
          {["10+ products live", "SA · Nigeria · pan-African", "Real revenue products"].map((s) => (
            <span key={s} className="rounded-full px-2.5 py-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {s}
            </span>
          ))}
        </div>

        {/* Contact actions */}
        <div className="mt-7 grid grid-cols-4 gap-2.5">
          <Action href="/oluwami-oladeji.vcf" label="Save" icon="↓" accent={EMERALD} />
          <Action href={`tel:${PHONE}`} label="Call" icon="✆" accent="#ffffff" />
          <Action href={`https://wa.me/${WHATSAPP.replace("+", "")}`} label="WhatsApp" icon="◍" accent="#25D366" />
          <Action href={`mailto:${EMAIL}`} label="Email" icon="✉" accent={ORANGE} />
        </div>

        {/* Portfolio */}
        <div className="mt-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">The portfolio</div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {PRODUCTS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-3.5 py-3 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-[13.5px] font-semibold text-white">{p.name}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{p.tag}</div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="/"
          className="mt-6 flex items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold"
          style={{ background: `linear-gradient(135deg, ${EMERALD}, ${PURPLE})`, color: "#06070a" }}
        >
          View full portfolio &amp; pitch →
        </a>

        {/* QR + address */}
        <div className="mt-8 flex items-center gap-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/card-qr.png" alt="Scan to open this card" width={92} height={92} className="rounded-lg bg-white p-1.5" />
          <div className="text-[12px] leading-relaxed text-white/60">
            <div className="text-white/80 font-medium">Scan to share this card</div>
            <div className="mt-1">55 Aston Rd, Sandton</div>
            <div>Johannesburg, South Africa 2191</div>
            <div className="mt-1" style={{ color: EMERALD }}>{EMAIL}</div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10.5px] text-white/30">
          agoditechnologies.com/card
        </div>
      </div>
    </main>
  );
}
