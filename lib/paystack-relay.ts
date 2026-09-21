// Shared Paystack webhook relay for the whole Agodi portfolio.
//
// WHY THIS EXISTS: a Paystack account has exactly one webhook URL slot per
// environment (Test, Live) in Settings -> API Keys & Webhooks. It is an
// account-level field, not a per-product one. With one Paystack account
// serving many Agodi products, only one product's webhook URL can occupy
// that slot at a time -- setting a second one silently un-sets the first,
// and that product stops receiving payment confirmations with no error
// anywhere. This relay is the fix: it is the ONE url registered with
// Paystack, and it forwards each event to the product it actually belongs
// to. Every downstream product keeps its own webhook route and its own
// business logic completely unchanged -- this file only decides where an
// event goes, never what it means.
//
// ROUTING: a product is identified by `data.metadata.product` on the
// transaction, which each product sets when it calls Initialize Transaction
// (see PRODUCTS below for the exact key each one should use). If metadata
// is missing or the key is unrecognised -- an older integration that hasn't
// added the tag yet, or a webhook type that doesn't carry metadata -- the
// event is broadcast to every registered product instead of being dropped.
// Money-safety over precision: a payment confirmation must never silently
// vanish just because a tag was missing. Each downstream handler already
// verifies the signature itself and only acts on metadata shapes it
// recognises, so receiving an irrelevant event is a harmless no-op.
//
// ADDING A PRODUCT: give it its own /api/paystack/webhook route as usual
// (copy an existing one -- helper's or afrimail's are good templates), set
// the SAME PAYSTACK_SECRET_KEY value in its Vercel env as every other
// product, add one line to PRODUCTS below, and tag `metadata.product` at
// its Initialize Transaction call site. No change to Paystack's dashboard
// is ever needed again.

export type ProductKey = keyof typeof PRODUCTS;

export const PRODUCTS = {
  helper: "https://helpers.africa/api/paystack/webhook",
  afrimail: "https://afriemail.com/api/paystack/webhook",
  marketplacelagos: "https://marketplacelagos.com/api/paystack/webhook",
  idvero: "https://getidvero.com/api/paystack/webhook",
} as const;

export function resolveProduct(rawBody: string): ProductKey | null {
  try {
    const parsed = JSON.parse(rawBody) as {
      data?: { metadata?: unknown };
    };
    const metadata = parsed.data?.metadata;
    const product =
      metadata && typeof metadata === "object" && "product" in metadata
        ? String((metadata as Record<string, unknown>).product)
        : null;
    return product && product in PRODUCTS ? (product as ProductKey) : null;
  } catch {
    return null;
  }
}

/** HMAC-SHA512 over the raw body, matching Paystack's signing scheme. Every
 * downstream product's own webhook route re-verifies this independently --
 * the relay checking it first only means we don't waste outbound calls
 * forwarding garbage, not that downstream trusts the relay. */
export async function verifyPaystackSignature(
  rawBody: string,
  signature: string | null,
): Promise<boolean> {
  if (!signature) return false;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const computed = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison.
  if (computed.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}

export type ForwardResult = { product: ProductKey; ok: boolean; status?: number; error?: string };

async function forwardTo(product: ProductKey, rawBody: string, signature: string): Promise<ForwardResult> {
  try {
    const res = await fetch(PRODUCTS[product], {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-paystack-signature": signature,
      },
      body: rawBody,
      // Paystack itself times out around 10-15s; stay well under that so we
      // can still answer Paystack promptly even if one product is slow.
      signal: AbortSignal.timeout(8000),
    });
    return { product, ok: res.ok, status: res.status };
  } catch (err) {
    return { product, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Forward to exactly one product (metadata matched), or broadcast to all
 * registered products (metadata missing/unrecognised) so nothing is lost. */
export async function relayEvent(rawBody: string, signature: string): Promise<{
  matched: ProductKey | "broadcast";
  results: ForwardResult[];
}> {
  const matched = resolveProduct(rawBody);
  const targets: ProductKey[] = matched ? [matched] : (Object.keys(PRODUCTS) as ProductKey[]);
  const results = await Promise.all(targets.map((p) => forwardTo(p, rawBody, signature)));
  return { matched: matched ?? "broadcast", results };
}
