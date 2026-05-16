"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * LenisProvider mounts a single Lenis instance for the whole app.
 * Lenis writes to window.scrollY natively, so Framer Motion's `useScroll`
 * picks up smooth scroll values without any extra wiring.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
