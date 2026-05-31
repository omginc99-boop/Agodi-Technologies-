import { NextResponse } from "next/server";

// Server proxy → AfriID biometric verification. Keeps the shared AFRIID_API_SECRET
// off the browser. Forwards the captured selfie + ID images to AfriID's Smile-ID
// Document Verification endpoint and returns the result.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.AFRIID_API_SECRET;
  const url = process.env.AFRIID_VERIFY_DOC_URL || "https://afriid.africa/api/verify-document";

  if (!secret) {
    return NextResponse.json({ ok: false, configured: false, error: "AfriID verification not configured" }, { status: 503 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const { selfieImage, idImage, country, idType } = body;
  if (!selfieImage || !idImage) {
    return NextResponse.json({ ok: false, error: "selfieImage and idImage are required" }, { status: 400 });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-afriid-key": secret },
      body: JSON.stringify({ selfieImage, idImage, country: country || "ZA", idType: idType || "NATIONAL_ID" }),
    });
    const data = await r.json();
    return NextResponse.json(data, { status: r.ok ? 200 : 502 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Verification failed" }, { status: 500 });
  }
}
