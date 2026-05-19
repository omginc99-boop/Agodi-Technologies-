"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LogoIntro — cinematic 7-second intro that plays once per session.
 *
 * Scene 1 (0–1.5s): black → particles emerge + grid fades in
 * Scene 2 (1.5–3.0s): orange + purple energy streams flow, African geometric pattern
 * Scene 3 (3.0–4.5s): logo fragments converge into the Agodi mark, pulse rings + scan lines
 * Scene 4 (4.5–6.0s): wordmark + tagline fade in, soft energy bloom
 * Scene 5 (6.0–7.0s): particles fade, logo holds, then fade to reveal site
 */

// 24 deterministic particle positions (seeded so SSR and client match)
const PARTICLES = Array.from({ length: 36 }).map((_, i) => {
  const seed = (i + 1) * 173;
  const rand = (offset: number) =>
    (((seed + offset) * 9301 + 49297) % 233280) / 233280;
  return {
    x: rand(0) * 100,
    y: rand(1) * 100,
    size: 2 + rand(2) * 5,
    delay: rand(3) * 1.5,
    color: i % 3 === 0 ? "#FF8C00" : i % 3 === 1 ? "#9F7BFF" : "#4B1FAF",
  };
});

export default function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0); // 0..5

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStage(1), 200),    // particles emerge
      setTimeout(() => setStage(2), 1500),   // energy streams
      setTimeout(() => setStage(3), 3000),   // logo forms
      setTimeout(() => setStage(4), 4500),   // wordmark + tagline
      setTimeout(() => setStage(5), 6500),   // fade out
      setTimeout(() => onComplete(), 7500),  // done — reveal site
    ];
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 5 ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ pointerEvents: stage === 5 ? "none" : "auto" }}
    >
      {/* SCENE 1: Holographic grid */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 0.25 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(159,123,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(159,123,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* SCENE 1+: Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity:
              stage === 0 ? 0 :
              stage === 5 ? 0 :
              [0.3, 0.9, 0.3],
            scale: stage >= 1 ? 1 : 0,
            y: stage >= 2 ? [0, -20, 0] : 0,
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay: p.delay },
            scale: { duration: 1, delay: p.delay * 0.5 },
            y: { duration: 4 + p.delay, repeat: Infinity, ease: "easeInOut" },
          }}
          aria-hidden
        />
      ))}

      {/* SCENE 2: Energy streams (orange + purple) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 && stage < 5 ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(75,31,175,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255,140,0,0.35) 0%, transparent 60%)",
            animation: "shimmer-mesh 6s ease-in-out infinite",
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      {/* SCENE 2: African geometric pattern (subtle, beneath surface) */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 && stage < 5 ? 0.08 : 0 }}
        transition={{ duration: 1.5 }}
        aria-hidden
      >
        <defs>
          <pattern id="adinkra" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 2 L18 10 L10 18 L2 10 Z" stroke="#FF8C00" strokeWidth="0.3" fill="none" />
            <circle cx="10" cy="10" r="1.5" stroke="#9F7BFF" strokeWidth="0.3" fill="none" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#adinkra)" />
      </motion.svg>

      {/* SCENE 3+: The logo mark */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Concentric pulse rings */}
        {stage >= 3 && stage < 5 &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                borderColor: i % 2 === 0 ? "rgba(255,140,0,0.4)" : "rgba(159,123,255,0.4)",
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: [0, 600],
                height: [0, 600],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

        {/* The logo SVG */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={
            stage >= 3
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0, opacity: 0, rotate: -180 }
          }
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.svg
            width={180}
            height={180}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              filter:
                stage >= 4
                  ? "drop-shadow(0 0 30px rgba(255,140,0,0.6)) drop-shadow(0 0 60px rgba(75,31,175,0.5))"
                  : "drop-shadow(0 0 10px rgba(75,31,175,0.3))",
            }}
            transition={{ duration: 1 }}
          >
            <defs>
              <linearGradient id="intro-diamond" x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#FFAB66" />
                <stop offset="100%" stopColor="#FF6A00" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="27" fill="#FAF7F2" stroke="#4B1FAF" strokeWidth="8" />
            <polygon points="32,7 50,32 32,57 14,32" fill="url(#intro-diamond)" />
          </motion.svg>

          {/* Scanning line effect over the logo */}
          {stage === 3 && (
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: 1 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #FF8C00 50%, transparent 100%)",
                  filter: "blur(2px)",
                }}
                initial={{ y: 0 }}
                animate={{ y: 180 }}
                transition={{ duration: 1.4, ease: "linear" }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* SCENE 4: Wordmark */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            stage >= 4
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="font-display font-black tracking-[0.25em] text-3xl sm:text-5xl text-white">
            AGODI<span className="text-orange"> TECHNOLOGIES</span>
          </div>
          <motion.div
            className="mt-4 text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-mist/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 4 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Building Africa&apos;s Future Through Technology
          </motion.div>
        </motion.div>
      </div>

      {/* Soft energy bloom at center, expands in scene 4 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 4 && stage < 5 ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,140,0,0.18) 0%, rgba(75,31,175,0.12) 30%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* HUD corners (cinematic UI) */}
      {stage >= 3 && stage < 5 && (
        <>
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-12 h-12"
              style={{
                top: corner.startsWith("t") ? 32 : "auto",
                bottom: corner.startsWith("b") ? 32 : "auto",
                left: corner.endsWith("l") ? 32 : "auto",
                right: corner.endsWith("r") ? 32 : "auto",
                borderTop: corner.startsWith("t") ? "1px solid rgba(255,140,0,0.6)" : "none",
                borderBottom: corner.startsWith("b") ? "1px solid rgba(255,140,0,0.6)" : "none",
                borderLeft: corner.endsWith("l") ? "1px solid rgba(255,140,0,0.6)" : "none",
                borderRight: corner.endsWith("r") ? "1px solid rgba(255,140,0,0.6)" : "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          ))}
        </>
      )}

      {/* Skip button — bottom right */}
      <button
        type="button"
        onClick={() => {
          setStage(5);
          setTimeout(onComplete, 600);
        }}
        className="absolute bottom-8 right-8 text-[10px] uppercase tracking-[0.3em] font-mono text-mist/40 hover:text-cream transition-colors z-[10000]"
        aria-label="Skip intro"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
}
