"use client";

import { useState, type FormEvent } from "react";

const GOLD = "#FFA02E";

export type EarlyAccessProduct = { slug: string; name: string };

export default function EarlyAccessForm({ products }: { products: EarlyAccessProduct[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const productInterest = (form.elements.namedItem("productInterest") as HTMLSelectElement).value;

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullName, email, productInterest }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong — try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Something went wrong — try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl p-8 glass-navy text-center" role="status">
        <div
          className="mx-auto grid place-items-center rounded-full h-12 w-12"
          style={{ background: "rgba(255,160,46,0.14)", border: "1px solid rgba(255,160,46,0.35)" }}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: GOLD }}>
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-5 font-display font-semibold text-xl">You&rsquo;re on the list.</p>
        <p className="mt-2 text-[14.5px] text-white/60 leading-relaxed">
          We&rsquo;ll be in touch as soon as this product launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 glass-navy">
      <div className="grid gap-4">
        <label className="block">
          <span className="text-[12px] uppercase tracking-[0.14em] text-white/50">Full name</span>
          <input
            name="fullName"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Ada Okoye"
            className="mt-2 w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </label>

        <label className="block">
          <span className="text-[12px] uppercase tracking-[0.14em] text-white/50">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@example.com"
            className="mt-2 w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </label>

        <label className="block">
          <span className="text-[12px] uppercase tracking-[0.14em] text-white/50">Which product are you most interested in?</span>
          <select
            name="productInterest"
            required
            defaultValue=""
            className="mt-2 w-full rounded-xl px-4 py-3 text-[15px] text-white outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <option value="" disabled style={{ background: "#0A0F2E" }}>Choose one</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug} style={{ background: "#0A0F2E" }}>{p.name}</option>
            ))}
            <option value="not-sure-yet" style={{ background: "#0A0F2E" }}>Not sure yet — surprise me</option>
          </select>
        </label>

        {error && <p className="text-[13.5px] text-[#ff8a80]">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: GOLD, color: "#06070a" }}
        >
          {status === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </div>
    </form>
  );
}
