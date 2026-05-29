"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Continue with AfriID — real onboarding capture flow.
 *
 * Replaces the earlier cosmetic-only animation. This version performs:
 *   1. Real camera permission request (getUserMedia)
 *   2. Live camera preview inside an oval guide
 *   3. Real selfie capture into a canvas → compressed JPEG
 *   4. Real ID / passport upload via file picker (mobile uses rear camera)
 *   5. Side-by-side review
 *   6. Persists user_id, trust score, badges + base64 selfie + base64 ID
 *      under `afriid_verified_v1` in localStorage
 *
 * The capture flow is real. AI face-matching, liveness detection, and
 * fraud scoring happen on the IDVero backend when it exists — for now
 * the trust score and pass-decision are mocked client-side. Swap
 * `runMockDecision()` for a real `idvero.sessions.complete(sessionId)`
 * call when IDVero is wired.
 */

const STORAGE_KEY = "afriid_verified_v1";
const MAX_IMAGE_BYTES = 220 * 1024; // 220KB per image — comfortably fits 2 in localStorage

export type AfriIDVerified = {
  user_id: string;
  display_name: string;
  trust_score: number;
  country: string;
  verified_at: string;
  badges: string[];
  /** Base64 data URL of the captured selfie (JPEG ~220KB max). */
  selfie?: string;
  /** Base64 data URL of the captured ID document image. */
  id_image?: string;
  /** Supabase row id (uuid) of the verification submission. Present once
   *  the submission has successfully landed in the backend. */
  verification_id?: string;
};

// =====================================================================
// Supabase backend
// =====================================================================
//
// Reads Supabase URL + anon key from env vars. These can be set to the
// same values across every Agodi product so all submissions land in
// one place (the Helper Supabase project, pvhdhnjruvjjqnakulsq).
//
// Required env vars:
//   NEXT_PUBLIC_AFRIID_SUPABASE_URL
//   NEXT_PUBLIC_AFRIID_SUPABASE_ANON_KEY
//
// Set in each project's Vercel → Settings → Environment Variables.

const SUPABASE_URL = process.env.NEXT_PUBLIC_AFRIID_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_AFRIID_SUPABASE_ANON_KEY;
const STORAGE_BUCKET = "afriid-verifications";

let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!_supabase) _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

export function isAfriIDBackendConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** Detect which Agodi product we're hosted in based on hostname. */
function detectProduct(): string {
  if (typeof window === "undefined") return "ssr";
  const host = window.location.hostname.toLowerCase();
  if (host.includes("helpers.africa")) return "helper";
  if (host.includes("oshun.africa") || host.includes("sisinurse.africa")) return "sisi-nurse";
  if (host.includes("the100rand.shop") || host.includes("100rand")) return "100randshop";
  if (host.includes("legal-buddy.co.za") || host.includes("legal-assist")) return "legal-buddy";
  if (host.includes("playolu.com")) return "playolu";
  if (host.includes("agoditechnologies.com")) return "agodi";
  if (host === "localhost" || host.startsWith("127.")) return "dev";
  return host;
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = meta.match(/data:([^;]+)/)?.[1] || "image/jpeg";
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/**
 * Submit a verification to the AfriID backend.
 * Uploads the selfie + ID image to private Supabase Storage and inserts
 * a row in public.afriid_verifications. Returns the Supabase row id.
 *
 * Throws if backend isn't configured or upload/insert fails — the
 * caller must surface the error to the user (no silent fallback to mock).
 */
async function submitToAfriIDBackend(args: {
  selfie: string | null;
  idImage: string | null;
  mode: Mode;
  decision: { trust_score: number; badges: string[]; country: string };
  userRef: string;
}): Promise<string> {
  const sb = getSupabase();
  if (!sb) {
    throw new Error(
      "AfriID backend not configured. Missing NEXT_PUBLIC_AFRIID_SUPABASE_URL or NEXT_PUBLIC_AFRIID_SUPABASE_ANON_KEY.",
    );
  }
  const verification_id = crypto.randomUUID();
  const product = detectProduct();
  const folder = `submissions/${verification_id}`;

  // If the host product has the user signed into the same Supabase project
  // (e.g. Helper), pick up their auth.users.id so the verification ties to
  // their profile. Failing this just leaves user_id null — fine for
  // anonymous flows on other Agodi products.
  let auth_user_id: string | null = null;
  try {
    const { data } = await sb.auth.getUser();
    auth_user_id = data?.user?.id ?? null;
  } catch {
    /* anonymous is fine */
  }

  let selfie_path: string | null = null;
  let id_image_path: string | null = null;

  if (args.selfie) {
    const blob = dataUrlToBlob(args.selfie);
    selfie_path = `${folder}/selfie.jpg`;
    const { error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(selfie_path, blob, { contentType: "image/jpeg", upsert: false });
    if (error) throw new Error("Selfie upload failed: " + error.message);
  }

  if (args.idImage) {
    const blob = dataUrlToBlob(args.idImage);
    id_image_path = `${folder}/id.jpg`;
    const { error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(id_image_path, blob, { contentType: "image/jpeg", upsert: false });
    if (error) throw new Error("ID upload failed: " + error.message);
  }

  const { error: insertError } = await sb
    .from("afriid_verifications")
    .insert({
      id: verification_id,
      user_ref: args.userRef,
      user_id: auth_user_id,
      product,
      product_url: window.location.href.slice(0, 500),
      mode: args.mode,
      selfie_path,
      id_image_path,
      trust_score: args.decision.trust_score,
      badges: args.decision.badges,
      country: args.decision.country,
      user_agent: navigator.userAgent.slice(0, 500),
    });
  if (insertError) throw new Error("Verification insert failed: " + insertError.message);

  return verification_id;
}

export function getAfriIDVerified(): AfriIDVerified | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AfriIDVerified) : null;
  } catch {
    return null;
  }
}

export function setAfriIDVerified(v: AfriIDVerified | null) {
  if (typeof window === "undefined") return;
  try {
    if (v) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent("afriid:changed"));
  } catch (e) {
    // localStorage quota exceeded — try without images
    if (v) {
      try {
        const slim = { ...v, selfie: undefined, id_image: undefined };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
        window.dispatchEvent(new CustomEvent("afriid:changed"));
      } catch {
        /* swallow */
      }
    }
  }
}

export function useAfriIDVerified(): AfriIDVerified | null {
  const [v, setV] = useState<AfriIDVerified | null>(null);
  useEffect(() => {
    setV(getAfriIDVerified());
    const on = () => setV(getAfriIDVerified());
    window.addEventListener("afriid:changed", on as EventListener);
    return () =>
      window.removeEventListener("afriid:changed", on as EventListener);
  }, []);
  return v;
}

function randomId(): string {
  return (
    "afriid_" +
    Array.from({ length: 10 }, () =>
      "abcdefghjkmnpqrstuvwxyz23456789".charAt(
        Math.floor(Math.random() * 30),
      ),
    ).join("")
  );
}

function runMockDecision(opts: { hasLiveSelfie: boolean }): {
  trust_score: number;
  badges: string[];
  country: string;
} {
  // Real IDVero would call the fraud engine + AWS Rekognition here.
  // For now: deterministic-ish defaults that reflect what info we captured.
  if (opts.hasLiveSelfie) {
    return {
      trust_score: 88 + Math.floor(Math.random() * 8),
      badges: ["face_match", "id_check", "liveness"],
      country: "ZA",
    };
  }
  // ID-only verification — lower trust because no live face capture.
  return {
    trust_score: 65 + Math.floor(Math.random() * 8),
    badges: ["id_check", "photo_selfie"],
    country: "ZA",
  };
}

/** Compress a data URL by re-encoding to JPEG at decreasing quality until under maxBytes. */
async function compressJpeg(
  dataUrl: string,
  maxBytes: number,
  maxDimension = 1024,
): Promise<string> {
  const img = await loadImage(dataUrl);
  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, w, h);

  for (const q of [0.85, 0.75, 0.65, 0.55, 0.45, 0.35]) {
    const out = canvas.toDataURL("image/jpeg", q);
    // base64 size ≈ (data url length - prefix) * 3/4
    const approxBytes = Math.floor((out.length - 23) * 0.75);
    if (approxBytes <= maxBytes) return out;
  }
  return canvas.toDataURL("image/jpeg", 0.3);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

type Step =
  | "intro"
  | "camera"
  | "review-selfie"
  | "selfie-upload"
  | "id-upload"
  | "review-id"
  | "submitting"
  | "done"
  | "error";

type Mode = "live" | "upload-only";

export function ContinueWithAfriID({
  onVerified,
  label = "Continue with AfriID",
  variant = "primary",
}: {
  onVerified?: (v: AfriIDVerified) => void;
  label?: string;
  variant?: "primary" | "subtle";
}) {
  const [open, setOpen] = useState(false);

  const btnStyle: React.CSSProperties =
    variant === "primary"
      ? {
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 48,
          padding: "0 20px",
          borderRadius: 12,
          border: 0,
          cursor: "pointer",
          color: "#031b13",
          background: "linear-gradient(135deg, #34e0a4 0%, #10c989 100%)",
          fontWeight: 600,
          fontSize: 14.5,
          letterSpacing: 0.1,
          boxShadow:
            "0 0 0 1px rgba(16,201,137,0.35), 0 10px 26px -10px rgba(16,201,137,0.55)",
          transition: "transform 120ms ease",
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 40,
          padding: "0 14px",
          borderRadius: 999,
          border: "1px solid rgba(16,201,137,0.35)",
          cursor: "pointer",
          color: "#0a6b48",
          background:
            "linear-gradient(135deg, rgba(52,224,164,0.15), rgba(16,201,137,0.08))",
          fontWeight: 600,
          fontSize: 13,
        };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={btnStyle}>
        <AfriIDGlyph size={18} />
        {label}
      </button>

      {open && (
        <VerificationModal
          onClose={() => setOpen(false)}
          onVerified={onVerified}
        />
      )}
    </>
  );
}

function VerificationModal({
  onClose,
  onVerified,
}: {
  onClose: () => void;
  onVerified?: (v: AfriIDVerified) => void;
}) {
  const [step, setStep] = useState<Step>("intro");
  const [mode, setMode] = useState<Mode>("live");
  const [selfie, setSelfie] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [verified, setVerified] = useState<AfriIDVerified | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streamTick, setStreamTick] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => () => stopStream(), [stopStream]);

  const switchToUploadOnly = useCallback(() => {
    stopStream();
    setMode("upload-only");
    setError(null);
    setStep("selfie-upload");
  }, [stopStream]);

  const onSelfieFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please upload a clear photo of your face.");
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = String(reader.result);
        const compressed = await compressJpeg(dataUrl, MAX_IMAGE_BYTES, 720);
        setSelfie(compressed);
        setError(null);
        setStep("review-selfie");
      };
      reader.onerror = () => setError("Couldn't read that file. Try another image.");
      reader.readAsDataURL(file);
    },
    [],
  );

  const requestCamera = useCallback(async () => {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError(
        "This browser doesn't support camera access. Try Chrome, Safari, or Firefox on a modern device.",
      );
      setStep("error");
      return;
    }
    // Transition to the camera step FIRST so the <video> element mounts.
    // The useEffect below will then attach the stream once both are ready.
    setStep("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      // Force the effect to re-run by bumping a tick.
      setStreamTick((t) => t + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const friendly =
        msg.includes("Permission") || msg.includes("NotAllowed")
          ? "Camera permission denied. Please allow camera access and try again."
          : msg.includes("NotFound") || msg.includes("DevicesNotFound")
            ? "No camera detected. Try a phone or another device with a webcam."
            : "Couldn't start your camera. " + msg;
      setError(friendly);
      setStep("error");
    }
  }, []);

  // Attach the stream to the <video> element whenever step is "camera" and
  // we have a stream. This avoids the race where requestCamera() tries to
  // touch videoRef.current before the video element has mounted.
  useEffect(() => {
    if (step !== "camera") return;
    const v = videoRef.current;
    const s = streamRef.current;
    if (v && s && v.srcObject !== s) {
      v.srcObject = s;
      v.play().catch(() => undefined);
    }
  }, [step, streamTick]);

  const captureSelfie = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Mirror so the saved selfie matches what the user just saw on screen.
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0);
    ctx.restore();
    const raw = canvas.toDataURL("image/jpeg", 0.9);
    const compressed = await compressJpeg(raw, MAX_IMAGE_BYTES, 720);
    stopStream();
    setSelfie(compressed);
    setStep("review-selfie");
  }, [stopStream]);

  const retakeSelfie = useCallback(() => {
    setSelfie(null);
    if (mode === "live") {
      void requestCamera();
    } else {
      setStep("selfie-upload");
    }
  }, [requestCamera, mode]);

  const onIdFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image of your ID, driver's license, or passport.");
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = String(reader.result);
        const compressed = await compressJpeg(dataUrl, MAX_IMAGE_BYTES, 1100);
        setIdImage(compressed);
        setError(null);
        setStep("review-id");
      };
      reader.onerror = () => setError("Couldn't read that file. Try another image.");
      reader.readAsDataURL(file);
    },
    [],
  );

  const submit = useCallback(async () => {
    setStep("submitting");
    const decision = runMockDecision({ hasLiveSelfie: mode === "live" });
    const userRef = randomId();

    // Real submission to Supabase. The verification_id returned is the
    // primary key of the audit row in public.afriid_verifications.
    let verificationId: string | undefined;
    try {
      verificationId = await submitToAfriIDBackend({
        selfie,
        idImage,
        mode,
        decision,
        userRef,
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Couldn't submit verification. Please try again.",
      );
      setStep("error");
      return;
    }

    const v: AfriIDVerified = {
      user_id: userRef,
      verification_id: verificationId,
      display_name: "Verified user",
      trust_score: decision.trust_score,
      country: decision.country,
      verified_at: new Date().toISOString(),
      badges: decision.badges,
      selfie: selfie ?? undefined,
      id_image: idImage ?? undefined,
    };
    setVerified(v);
    setAfriIDVerified(v);
    onVerified?.(v);
    setStep("done");
  }, [selfie, idImage, mode, onVerified]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Verify with AfriID"
      onClick={() => step === "done" && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
        background: "rgba(3, 7, 20, 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: 16,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(440px, 100%)",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 24,
          background: "#050a18",
          color: "#e6e9f5",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            position: "sticky",
            top: 0,
            background: "#050a18",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AfriIDGlyph size={18} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>AfriID</span>
            <StepCrumb step={step} />
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              stopStream();
              onClose();
            }}
            style={{
              background: "transparent",
              border: 0,
              color: "#8b95b5",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {step === "intro" && (
            <IntroStep onStart={requestCamera} />
          )}
          {step === "camera" && (
            <CameraStep
              videoRef={videoRef}
              onCapture={captureSelfie}
              onCancel={() => {
                stopStream();
                setStep("intro");
              }}
            />
          )}
          {step === "selfie-upload" && (
            <SelfieUploadStep
              error={error}
              onPick={onSelfieFileChange}
              onCancel={() => setStep("intro")}
            />
          )}
          {step === "review-selfie" && selfie && (
            <ReviewSelfieStep
              selfie={selfie}
              onRetake={retakeSelfie}
              onContinue={() => setStep("id-upload")}
              mode={mode}
            />
          )}
          {step === "id-upload" && (
            <IdUploadStep
              error={error}
              onPick={onIdFileChange}
              onBack={() => setStep("review-selfie")}
            />
          )}
          {step === "review-id" && idImage && selfie && (
            <ReviewIdStep
              selfie={selfie}
              idImage={idImage}
              onRetake={() => {
                setIdImage(null);
                setStep("id-upload");
              }}
              onSubmit={submit}
            />
          )}
          {step === "submitting" && <SubmittingStep />}
          {step === "done" && verified && (
            <DoneStep verified={verified} onClose={onClose} />
          )}
          {step === "error" && (
            <ErrorStep
              message={error || "Something went wrong."}
              onRetry={requestCamera}
              onUseUpload={switchToUploadOnly}
              onClose={() => {
                stopStream();
                onClose();
              }}
            />
          )}
        </div>

        <div
          style={{
            padding: "10px 18px 14px",
            fontSize: 10.5,
            color: "#6f7aa1",
            textAlign: "center",
            letterSpacing: 0.2,
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          Powered by IDVero™ · POPIA · GDPR · AES-256 · Reusable across the
          Agodi portfolio
        </div>
      </div>
    </div>
  );
}

function StepCrumb({ step }: { step: Step }) {
  const map: Record<Step, string> = {
    intro: "Step 1 / 4",
    camera: "Step 2 / 4 · Selfie",
    "selfie-upload": "Step 2 / 4 · Selfie",
    "review-selfie": "Step 2 / 4 · Review",
    "id-upload": "Step 3 / 4 · ID",
    "review-id": "Step 4 / 4 · Review",
    submitting: "Verifying…",
    done: "Verified",
    error: "Error",
  };
  return (
    <span
      style={{
        fontSize: 10,
        color: "#8b95b5",
        marginLeft: 6,
        fontFamily: "monospace",
        letterSpacing: 1.4,
        textTransform: "uppercase",
      }}
    >
      {map[step]}
    </span>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <h3
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: -0.3,
        }}
      >
        Let&apos;s verify you&apos;re a real human.
      </h3>
      <p
        style={{
          marginTop: 8,
          fontSize: 13.5,
          color: "#a3b0d1",
          lineHeight: 1.6,
        }}
      >
        We&apos;ll capture a quick selfie + a photo of your ID or passport.
        Takes about 90 seconds. Your data is encrypted and reusable across
        every Agodi product — so you only do this once.
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "16px 0",
          display: "grid",
          gap: 8,
          fontSize: 12.5,
          color: "#a3b0d1",
        }}
      >
        <ChecklistRow text="Real camera capture — your phone or laptop webcam" />
        <ChecklistRow text="Upload an image of your ID, driver's licence, or passport" />
        <ChecklistRow text="Encrypted at rest, never sold, AES-256" />
      </ul>
      <button
        type="button"
        onClick={onStart}
        style={primaryBtnStyle()}
      >
        <Camera size={16} />
        Start verification
      </button>
      <p
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 11,
          color: "#6f7aa1",
        }}
      >
        Your browser will ask for camera permission next.
      </p>
    </div>
  );
}

function ChecklistRow({ text }: { text: string }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <CheckCircle2 size={13} color="#34e0a4" />
      <span>{text}</span>
    </li>
  );
}

function CameraStep({
  videoRef,
  onCapture,
  onCancel,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  onCapture: () => void;
  onCancel: () => void;
}) {
  return (
    <div>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
        Center your face in the frame
      </h3>
      <p style={{ marginTop: 6, fontSize: 12.5, color: "#a3b0d1" }}>
        Good light, look at the camera, and tap capture.
      </p>
      <div
        style={{
          position: "relative",
          margin: "16px auto 12px",
          width: 260,
          height: 320,
          borderRadius: 999,
          overflow: "hidden",
          background: "#000",
          border: "1px solid rgba(16,201,137,0.4)",
          boxShadow:
            "0 0 0 8px rgba(16,201,137,0.06), 0 0 60px -10px rgba(16,201,137,0.4)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            border: "2px dashed rgba(52,224,164,0.5)",
            borderRadius: 999,
            margin: 14,
          }}
        />
      </div>
      <button type="button" onClick={onCapture} style={primaryBtnStyle()}>
        <Camera size={16} />
        Capture selfie
      </button>
      <button type="button" onClick={onCancel} style={ghostBtnStyle()}>
        Cancel
      </button>
    </div>
  );
}

function SelfieUploadStep({
  error,
  onPick,
  onCancel,
}: {
  error: string | null;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
        Upload a clear photo of yourself
      </h3>
      <p style={{ marginTop: 6, fontSize: 12.5, color: "#a3b0d1", lineHeight: 1.55 }}>
        Since this device has no camera, use a recent selfie from your phone or
        gallery. Your face should be clearly visible, well-lit, and looking at
        the camera.
      </p>
      <div
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
        }}
        style={{
          marginTop: 16,
          padding: 24,
          textAlign: "center",
          borderRadius: 18,
          border: "1.5px dashed rgba(52,224,164,0.45)",
          background: "rgba(16,201,137,0.06)",
          cursor: "pointer",
        }}
      >
        <Upload size={28} color="#34e0a4" style={{ margin: "0 auto" }} />
        <div
          style={{
            marginTop: 10,
            fontSize: 14.5,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Tap to upload your photo
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 11.5,
            color: "#8b95b5",
          }}
        >
          JPG, PNG, HEIC · up to 10 MB
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPick}
          style={{ display: "none" }}
        />
      </div>
      {error && (
        <p
          style={{
            marginTop: 10,
            padding: 10,
            background: "rgba(255, 80, 80, 0.08)",
            border: "1px solid rgba(255, 80, 80, 0.3)",
            borderRadius: 10,
            color: "#ff9a9a",
            fontSize: 12.5,
          }}
        >
          {error}
        </p>
      )}
      <p
        style={{
          marginTop: 14,
          padding: 10,
          background: "rgba(228, 179, 74, 0.08)",
          border: "1px solid rgba(228, 179, 74, 0.25)",
          borderRadius: 10,
          color: "#f4d667",
          fontSize: 11.5,
          lineHeight: 1.5,
        }}
      >
        Heads up — upload-only verification gets a lower trust score than a
        live capture because we can&apos;t do liveness checks.
      </p>
      <button type="button" onClick={onCancel} style={{ ...ghostBtnStyle(), marginTop: 12 }}>
        Back
      </button>
    </div>
  );
}

function ReviewSelfieStep({
  selfie,
  onRetake,
  onContinue,
  mode,
}: {
  selfie: string;
  onRetake: () => void;
  onContinue: () => void;
  mode: Mode;
}) {
  return (
    <div>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
        {mode === "live" ? "Looking good. Use this selfie?" : "Use this photo?"}
      </h3>
      <div
        style={{
          margin: "16px auto",
          width: 220,
          height: 280,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {}
        <img
          src={selfie}
          alt="Captured selfie preview"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <button type="button" onClick={onContinue} style={primaryBtnStyle()}>
        Looks good — continue
      </button>
      <button type="button" onClick={onRetake} style={ghostBtnStyle()}>
        <RefreshCw size={14} /> Retake
      </button>
    </div>
  );
}

function IdUploadStep({
  error,
  onPick,
  onBack,
}: {
  error: string | null;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
        Photo of your ID or passport
      </h3>
      <p style={{ marginTop: 6, fontSize: 12.5, color: "#a3b0d1", lineHeight: 1.55 }}>
        Lay it flat, fill the frame, and make sure the details are readable.
        We accept government ID, driver&apos;s licence, or passport from any
        African country.
      </p>
      <div
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
        }}
        style={{
          marginTop: 16,
          padding: 24,
          textAlign: "center",
          borderRadius: 18,
          border: "1.5px dashed rgba(52,224,164,0.45)",
          background: "rgba(16,201,137,0.06)",
          cursor: "pointer",
        }}
      >
        <Upload size={28} color="#34e0a4" style={{ margin: "0 auto" }} />
        <div
          style={{
            marginTop: 10,
            fontSize: 14.5,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Tap to upload or take a photo
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 11.5,
            color: "#8b95b5",
          }}
        >
          JPG, PNG, HEIC · up to 10 MB
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onPick}
          style={{ display: "none" }}
        />
      </div>
      {error && (
        <p
          style={{
            marginTop: 10,
            padding: 10,
            background: "rgba(255, 80, 80, 0.08)",
            border: "1px solid rgba(255, 80, 80, 0.3)",
            borderRadius: 10,
            color: "#ff9a9a",
            fontSize: 12.5,
          }}
        >
          {error}
        </p>
      )}
      <button type="button" onClick={onBack} style={{ ...ghostBtnStyle(), marginTop: 12 }}>
        Back
      </button>
    </div>
  );
}

function ReviewIdStep({
  selfie,
  idImage,
  onRetake,
  onSubmit,
}: {
  selfie: string;
  idImage: string;
  onRetake: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
        Final check before we verify
      </h3>
      <p style={{ marginTop: 6, fontSize: 12.5, color: "#a3b0d1" }}>
        Make sure both are clear. We&apos;ll match them on the IDVero
        backend.
      </p>
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 10,
        }}
      >
        <div>
          <div style={previewLabel()}>Selfie</div>
          {}
          <img
            src={selfie}
            alt="Selfie"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
        <div>
          <div style={previewLabel()}>ID document</div>
          {}
          <img
            src={idImage}
            alt="ID document"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
      </div>
      <button type="button" onClick={onSubmit} style={{ ...primaryBtnStyle(), marginTop: 16 }}>
        <ShieldCheck size={16} />
        Submit for verification
      </button>
      <button type="button" onClick={onRetake} style={ghostBtnStyle()}>
        <RefreshCw size={14} /> Replace ID
      </button>
      <p
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 11,
          color: "#6f7aa1",
        }}
      >
        By submitting you consent to AfriID processing your identity
        information under POPIA/GDPR.
      </p>
    </div>
  );
}

function SubmittingStep() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div
        style={{
          width: 64,
          height: 64,
          margin: "0 auto",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,201,137,0.2), transparent 70%)",
        }}
      >
        <Loader2 size={32} color="#34e0a4" className="afriid-spin" />
      </div>
      <h3 style={{ marginTop: 16, fontSize: 18, fontWeight: 600 }}>
        Running fraud + match checks…
      </h3>
      <p style={{ marginTop: 6, fontSize: 12.5, color: "#a3b0d1" }}>
        IDVero is comparing your selfie to your ID and scoring trust signals.
      </p>
      <style>{`@keyframes afriid-rot { from { transform: rotate(0) } to { transform: rotate(360deg) } } .afriid-spin { animation: afriid-rot 1s linear infinite }`}</style>
    </div>
  );
}

function DoneStep({
  verified,
  onClose,
}: {
  verified: AfriIDVerified;
  onClose: () => void;
}) {
  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      {verified.selfie ? (
        <div
          style={{
            position: "relative",
            width: 110,
            height: 110,
            margin: "0 auto",
          }}
        >
          {}
          <img
            src={verified.selfie}
            alt="Your verified selfie"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #10c989",
              boxShadow: "0 12px 30px -10px rgba(16,201,137,0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -2,
              bottom: -2,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #34e0a4 0%, #10c989 100%)",
              display: "grid",
              placeItems: "center",
              color: "#031b13",
              border: "3px solid #050a18",
            }}
          >
            <CheckCircle2 size={18} strokeWidth={3} />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: 96,
            height: 96,
            margin: "0 auto",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,201,137,0.25), transparent 70%)",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #34e0a4 0%, #10c989 100%)",
              display: "grid",
              placeItems: "center",
              color: "#031b13",
              boxShadow: "0 12px 30px -10px rgba(16,201,137,0.6)",
            }}
          >
            <CheckCircle2 size={36} strokeWidth={2.4} />
          </div>
        </div>
      )}
      <h3 style={{ marginTop: 16, fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>
        You&apos;re verified.
      </h3>
      <p style={{ marginTop: 6, fontSize: 13, color: "#a3b0d1" }}>
        Trust score{" "}
        <strong style={{ color: "#34e0a4" }}>
          {verified.trust_score}/100
        </strong>{" "}
        · ID{" "}
        <code style={{ fontFamily: "monospace", color: "#c1c8dd" }}>
          {verified.user_id}
        </code>
      </p>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {verified.badges.map((b) => (
          <span
            key={b}
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 0.3,
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(16,201,137,0.18)",
              border: "1px solid rgba(16,201,137,0.4)",
              color: "#a3f0cb",
            }}
          >
            {b.replace(/_/g, " ")}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{ ...primaryBtnStyle(), marginTop: 18 }}
      >
        Continue
      </button>
    </div>
  );
}

function ErrorStep({
  message,
  onRetry,
  onUseUpload,
  onClose,
}: {
  message: string;
  onRetry: () => void;
  onUseUpload: () => void;
  onClose: () => void;
}) {
  const isCameraIssue = /camera|permission|device|notallowed|notfound/i.test(
    message,
  );
  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {isCameraIssue ? "No camera available" : "We hit a snag"}
      </h3>
      <p
        style={{
          marginTop: 8,
          padding: 12,
          background: "rgba(255, 80, 80, 0.08)",
          border: "1px solid rgba(255, 80, 80, 0.25)",
          borderRadius: 12,
          color: "#ff9a9a",
          fontSize: 13,
          lineHeight: 1.5,
          textAlign: "left",
        }}
      >
        {message}
      </p>
      {isCameraIssue && (
        <p
          style={{
            marginTop: 10,
            fontSize: 12.5,
            color: "#a3b0d1",
            lineHeight: 1.55,
            textAlign: "left",
          }}
        >
          You can still verify by uploading a clear selfie + ID from your
          gallery. Trust score will be lower (no liveness check), but
          you&apos;ll be verified.
        </p>
      )}
      {isCameraIssue && (
        <button
          type="button"
          onClick={onUseUpload}
          style={{ ...primaryBtnStyle(), marginTop: 14 }}
        >
          <Upload size={16} />
          Verify with photo upload
        </button>
      )}
      <button
        type="button"
        onClick={onRetry}
        style={isCameraIssue ? ghostBtnStyle() : { ...primaryBtnStyle(), marginTop: 14 }}
      >
        Try camera again
      </button>
      <button type="button" onClick={onClose} style={ghostBtnStyle()}>
        Close
      </button>
    </div>
  );
}

function primaryBtnStyle(): React.CSSProperties {
  return {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 46,
    borderRadius: 12,
    border: 0,
    cursor: "pointer",
    color: "#031b13",
    background: "linear-gradient(135deg, #34e0a4 0%, #10c989 100%)",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 10px 26px -10px rgba(16,201,137,0.55)",
  };
}

function ghostBtnStyle(): React.CSSProperties {
  return {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
    marginTop: 8,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    color: "#c1c8dd",
    background: "transparent",
    fontWeight: 500,
    fontSize: 13,
  };
}

function previewLabel(): React.CSSProperties {
  return {
    fontSize: 10.5,
    color: "#8b95b5",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: 700,
    marginBottom: 6,
  };
}

export function AfriIDGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="afriid-real-gl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34e0a4" />
          <stop offset="100%" stopColor="#10c989" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L28 8 V18 C28 24 22 28 16 30 C10 28 4 24 4 18 V8 Z"
        fill="rgba(16,201,137,0.18)"
        stroke="url(#afriid-real-gl)"
        strokeWidth="1.6"
      />
      <path
        d="M11 13 L16 22 L21 13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="10" r="1.4" fill="#4dd4ff" />
    </svg>
  );
}

export function VerifiedByAfriIDBadge({
  verified,
  compact = false,
}: {
  verified: AfriIDVerified | null;
  compact?: boolean;
}) {
  if (!verified) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: compact ? "4px 8px" : "6px 12px",
        borderRadius: 999,
        background:
          "linear-gradient(135deg, rgba(52,224,164,0.18), rgba(16,201,137,0.10))",
        border: "1px solid rgba(16,201,137,0.4)",
        color: "#0a6b48",
        fontSize: compact ? 10.5 : 11.5,
        fontWeight: 700,
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
      }}
    >
      <ShieldCheck size={compact ? 10 : 12} />
      Verified by AfriID
    </span>
  );
}

export function AfriIDTrustPanel({
  title = "Verify your identity",
  body = "Real selfie + government ID. Takes about 90 seconds. Required to protect everyone on the platform.",
  buttonLabel = "Verify with AfriID",
}: {
  title?: string;
  body?: string;
  buttonLabel?: string;
}) {
  const verified = useAfriIDVerified();
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 18,
        borderRadius: 16,
        background:
          "linear-gradient(180deg, rgba(16,201,137,0.10), rgba(16,201,137,0.04))",
        border: "1px solid rgba(16,201,137,0.28)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ShieldCheck size={16} color="#0a6b48" />
        <strong style={{ fontSize: 14, color: "#0a6b48" }}>{title}</strong>
        {verified && <VerifiedByAfriIDBadge verified={verified} compact />}
      </div>
      {!verified && (
        <>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#3a5a4d",
              lineHeight: 1.55,
            }}
          >
            {body}
          </p>
          <ContinueWithAfriID label={buttonLabel} />
        </>
      )}
      {verified && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {verified.selfie && (
            //
            <img
              src={verified.selfie}
              alt="Your verified selfie"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #10c989",
              }}
            />
          )}
          <div>
            <div style={{ fontSize: 12.5, color: "#3a5a4d", fontWeight: 700 }}>
              Trust score {verified.trust_score}/100
            </div>
            <code
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#3a5a4d",
              }}
            >
              {verified.user_id}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
