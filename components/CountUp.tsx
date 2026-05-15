"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Props = {
  to: number;
  /** Numbers shown before "to" (e.g. 0 = start at zero). Default 0. */
  from?: number;
  /** Optional suffix after the number ("+", "B+", " days") */
  suffix?: string;
  /** Optional prefix (e.g. "$") */
  prefix?: string;
  /** Animation duration in seconds. Default 2. */
  duration?: number;
  /** Render number with thousands separator. Default true. */
  separator?: boolean;
  /** Decimal places. Default 0 (integers). */
  decimals?: number;
  className?: string;
};

/**
 * Animated count-up. Triggers when the element enters the viewport (once).
 * Uses Framer Motion's `animate()` for smooth easing.
 */
export default function CountUp({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 2,
  separator = true,
  decimals = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out — slow finish
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  const formatted = (() => {
    const fixed = value.toFixed(decimals);
    if (!separator || decimals > 0) return fixed;
    return Number(fixed).toLocaleString("en-US");
  })();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
