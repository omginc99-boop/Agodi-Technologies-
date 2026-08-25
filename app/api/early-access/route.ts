import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const PRODUCT_SLUGS = [
  "afristream",
  "computer-village",
  "alaba-international",
  "folad-fish",
  "afriesim",
  "africa-5d-map",
  "talent-and-skills",
  "gentlemens-club",
  "citizen-connect",
  "not-sure-yet",
] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Early access signups aren't configured yet." },
      { status: 503 },
    );
  }

  let body: { fullName?: string; email?: string; productInterest?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim().toLowerCase();
  const productInterest = body.productInterest?.trim();

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "Enter your full name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (!productInterest || !PRODUCT_SLUGS.includes(productInterest as (typeof PRODUCT_SLUGS)[number])) {
    return NextResponse.json({ ok: false, error: "Choose a product." }, { status: 400 });
  }

  const supabase = createClient(url, serviceKey);
  const { error } = await supabase
    .from("early_access_signups")
    .insert({ full_name: fullName, email, product_interest: productInterest });

  if (error) {
    return NextResponse.json({ ok: false, error: "Couldn't save that — try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
