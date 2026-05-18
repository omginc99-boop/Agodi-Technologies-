"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * AnimatedHands — two halves of the AI × Africa visual slide toward each other
 * when the section enters the viewport. Triggers once per page load.
 */
export default function AnimatedHands() {
  return (
    <div className="relative h-full w-full">
      {/* Outer halo */}
      <div
        className="absolute -inset-12 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,140,0,0.18) 0%, rgba(75,31,175,0.15) 30%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      {/* Contact-point bloom — glows brighter once the hands meet */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(ellipse 30% 25% at 50% 50%, rgba(255,171,102,0.55) 0%, rgba(159,123,255,0.30) 35%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Robot hand — slides in from the LEFT */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        initial={{ x: "-30%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/hands-robot.png"
          alt="Robot hand reaching toward a child's hand"
          fill
          className="object-contain object-right drop-shadow-2xl"
          sizes="(max-width: 1024px) 50vw, 360px"
          style={{
            filter: "saturate(0.95) contrast(1.06) brightness(1.05)",
          }}
        />
      </motion.div>

      {/* Child's hand — slides in from the RIGHT */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        initial={{ x: "30%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/hands-child.png"
          alt="A child's hand reaching toward a robot's hand"
          fill
          className="object-contain object-left drop-shadow-2xl"
          sizes="(max-width: 1024px) 50vw, 360px"
          style={{
            filter: "saturate(0.95) contrast(1.06) brightness(1.05)",
          }}
        />
      </motion.div>

      {/* Brand soft-light tint over everything */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, #4B1FAF 0%, transparent 50%, #FF8C00 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
