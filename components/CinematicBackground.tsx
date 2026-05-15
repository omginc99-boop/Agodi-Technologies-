"use client";

/**
 * CinematicBackground — ambient ecosystem visuals for the Agodi hero.
 *
 * Pure CSS animations (no JS animation loop, no canvas) so it stays cheap on
 * battery and renders crisply on every device. Layers:
 *   1. Deep brand gradient base
 *   2. Two concentric orbit rings rotating in opposite directions
 *   3. Floating particles drifting in different directions
 *   4. Slow-shifting gradient mesh on top
 *   5. African-pattern grid as a subtle structural overlay
 */

const PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  // Deterministic so SSR + client agree
  const seed = (i + 1) * 137;
  return {
    top: ((seed * 9301 + 49297) % 233280) / 233280 * 100,
    left: (((seed + 1) * 9301 + 49297) % 233280) / 233280 * 100,
    size: 2 + ((seed + 2) % 5),
    delay: ((seed + 3) % 8000) / 1000,
    duration: 6 + ((seed + 4) % 8),
    color: seed % 3 === 0 ? "#FF8C00" : seed % 3 === 1 ? "#9F7BFF" : "#FFB347",
  };
});

const SECONDARY_PARTICLES = Array.from({ length: 12 }).map((_, i) => {
  const seed = (i + 100) * 211;
  return {
    top: ((seed * 9301 + 49297) % 233280) / 233280 * 100,
    left: (((seed + 1) * 9301 + 49297) % 233280) / 233280 * 100,
    size: 1 + ((seed + 2) % 3),
    delay: ((seed + 3) % 6000) / 1000,
    duration: 10 + ((seed + 4) % 10),
  };
});

export default function CinematicBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* Deep cinematic gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(75,31,175,0.55) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(255,140,0,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(159,123,255,0.30) 0%, transparent 60%), linear-gradient(180deg, #060311 0%, #0F0822 100%)",
        }}
      />

      {/* Animated shimmer gradient mesh */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(75,31,175,0.35) 25%, transparent 50%, rgba(255,140,0,0.20) 75%, transparent 100%)",
          backgroundSize: "300% 300%",
          animation: "shimmer-mesh 18s ease-in-out infinite",
        }}
      />

      {/* Concentric orbit rings — slow rotation, ecosystem motif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full border border-purple-soft/15"
          style={{
            width: "900px",
            height: "900px",
            animation: "orbit 80s linear infinite",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full border border-orange/20"
          style={{
            width: "1300px",
            height: "1300px",
            animation: "orbit-reverse 120s linear infinite",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full border border-purple/10"
          style={{
            width: "1700px",
            height: "1700px",
            animation: "orbit 200s linear infinite",
          }}
        />
      </div>

      {/* Floating particles — colored, blurred, drifting */}
      {PARTICLES.map((p, i) => (
        <span
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            animation: `drift ${p.duration}s ease-in-out infinite ${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Tiny secondary stars */}
      {SECONDARY_PARTICLES.map((p, i) => (
        <span
          key={`s-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `pulse-glow ${p.duration}s ease-in-out infinite ${p.delay}s`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Subtle African-tech grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(159,123,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(159,123,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette to keep edges anchored in the brand ink */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 50%, rgba(6,3,17,0.85) 100%)",
        }}
      />
    </div>
  );
}
