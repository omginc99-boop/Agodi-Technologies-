// THE single Paystack webhook URL for the whole Agodi portfolio.
//
// Register this exact URL in Paystack's dashboard (Settings -> API Keys &
// Webhooks) as both the Test and Live webhook URL:
//
//     https://agoditechnologies.com/api/paystack/webhook
//
// It is the only URL that should ever be registered there. See
// lib/paystack-relay.ts for why this exists and how routing works.
import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackSignature, relayEvent } from "@/lib/paystack-relay";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const valid = await verifyPaystackSignature(rawBody, signature);
  if (!valid) {
    console.warn("[paystack-relay] rejected: invalid or missing signature");
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  const { matched, results } = await relayEvent(rawBody, signature!);

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(
      "[paystack-relay] delivery failed for:",
      failed.map((f) => `${f.product} (${f.status ?? f.error})`).join(", "),
    );
  }
  console.log(
    `[paystack-relay] routed as "${matched}" -> ${results.map((r) => `${r.product}:${r.ok ? "ok" : "FAIL"}`).join(", ")}`,
  );

  // Always acknowledge Paystack with 200 once the signature is valid and we
  // attempted delivery, even if a downstream product failed -- Paystack
  // retries a non-200 response, and a retry storm from one slow product
  // would re-deliver to every OTHER product too under the broadcast path.
  // Downstream failures are logged above for follow-up, not silently lost.
  return NextResponse.json({ ok: true, routedTo: matched });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Agodi Paystack webhook relay. POST only.",
  });
}
