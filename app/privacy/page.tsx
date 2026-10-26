import type { Metadata } from "next";
import Link from "next/link";

const GOLD = "#FFA02E";
const BLUE = "#2f6bff";

export const metadata: Metadata = {
  title: "Privacy Notice — Agodi Technologies",
  description:
    "How Agodi Technologies (Pty) Ltd collects, uses, and protects information on agoditechnologies.com.",
};

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display font-bold text-xl text-white">{title}</h2>
      <div className="mt-3 text-[14.5px] text-white/65 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="relative overflow-hidden" style={{ background: "#060b18" }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(6,11,24,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <nav className="max-w-5xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Mark />
            <span className="font-display font-bold tracking-tight text-[15px]">
              Agodi <span className="text-white/45">Technologies</span>
            </span>
          </Link>
          <Link href="/" className="text-[13.5px] text-white/65 hover:text-white transition-colors">← Back home</Link>
        </nav>
      </header>

      <section className="relative px-6 lg:px-10 pt-20 pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-[12px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>Legal</div>
          <h1 className="font-display font-bold text-3xl lg:text-5xl tracking-[-0.02em]">Privacy Notice</h1>
          <p className="mt-4 text-[13px] text-white/40">Last updated 26 October 2026</p>

          <Section title="Who we are">
            <p>
              This notice covers <strong className="text-white">agoditechnologies.com</strong>, operated by
              Agodi Technologies (Pty) Ltd (CIPC registration 2026/674916/07), 55 Aston Rd, Sandton,
              Johannesburg, South Africa.
            </p>
            <p>
              The individual products listed in our portfolio (AfriID, IDVero, Helpers, Legal Buddy, Sisi Nurse,
              and others) are separate live platforms with their own privacy notices. This page covers only
              what happens on agoditechnologies.com itself.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              The only information this site collects directly is through the{" "}
              <strong className="text-white">Early Access</strong>{" "}
              form: your full name, email address, and which product you&apos;re interested in. We store this
              to notify you when that product launches or opens access — nothing else.
            </p>
            <p>
              We don&apos;t run analytics, advertising pixels, or tracking cookies on this site, and we don&apos;t
              sell or share your information with third parties.
            </p>
          </Section>

          <Section title="How we use it">
            <p>
              Early access signups are used solely to email you about the product you selected. We don&apos;t
              use this information for any other marketing without your separate consent.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us to access, correct, or delete your information at any time by emailing{" "}
              <a href="mailto:info@agoditechnologies.com" className="underline hover:text-white" style={{ color: GOLD }}>
                info@agoditechnologies.com
              </a>
              . We&apos;ll action deletion requests within a reasonable time.
            </p>
          </Section>

          <Section title="Legal basis">
            <p>
              We process this information in accordance with South Africa&apos;s Protection of Personal
              Information Act (POPIA). Providing your details for early access is voluntary, and you consent to
              it by submitting the form.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this notice: <strong className="text-white">info@agoditechnologies.com</strong>.
            </p>
          </Section>
        </div>
      </section>

      <section className="relative px-6 lg:px-10 py-10" style={{ background: "#070d1d" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5"><Mark size={22} /> Agodi Technologies (Pty) Ltd · Reg. 2026/674916/07</div>
          <div>info@agoditechnologies.com</div>
          <div>© 2026 Agodi Technologies</div>
        </div>
      </section>
    </main>
  );
}
