"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LogoIntro from "./LogoIntro";

const SESSION_KEY = "agodi_intro_seen";

/**
 * IntroGate — wraps the page and plays the cinematic LogoIntro on the very
 * first load of a session. Subsequent navigation within the session skips it.
 */
export default function IntroGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (!seen) {
        setShow(true);
        // Lock body scroll while intro plays
        document.body.style.overflow = "hidden";
      }
    } catch {
      // sessionStorage blocked — skip intro silently
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setShow(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && <LogoIntro key="intro" onComplete={handleComplete} />}
    </AnimatePresence>
  );
}
