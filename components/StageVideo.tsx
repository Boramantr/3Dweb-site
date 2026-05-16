"use client";

import { useEffect, useRef } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useReducedMotion
} from "framer-motion";

type Props = {
  /** ref to the .scroll-stage wrapper that defines scrub range */
  targetRef: React.RefObject<HTMLElement>;
  src?: string;
  poster?: string;
};

/**
 * StageVideo
 * ----------
 * Renders a fixed full-bleed <video> behind page content and scrubs
 * currentTime in 1:1 lockstep with scroll progress through `targetRef`.
 *
 * - Direct mapping (no easing): scrolling controls frames.
 * - rAF-throttled writes prevent decoder stalls.
 * - Reduced-motion fallback: loop autoplay.
 */
export default function StageVideo({
  targetRef,
  src = "/video.mp4",
  poster = "/hero-bg.jpg"
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAppliedRef = useRef(-1);
  const rafPendingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // scrollYProgress is 0 when targetRef top hits viewport top,
  // 1 when targetRef bottom hits viewport bottom.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Apply scroll progress → video.currentTime
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    if (!duration) return;
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;

    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      const target = Math.max(0, Math.min(duration - 0.05, progress * (duration - 0.05)));
      // Skip near-duplicate writes (~1 frame @ 60fps)
      if (Math.abs(target - lastAppliedRef.current) < 0.012) return;
      lastAppliedRef.current = target;
      try {
        video.currentTime = target;
      } catch {
        /* ignore */
      }
    });
  });

  // Activate/deactivate visibility for performance & opacity transition
  useEffect(() => {
    const wrap = wrapRef.current;
    const target = targetRef.current;
    if (!wrap || !target) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          wrap.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [targetRef]);

  // First-frame priming + reduced-motion fallback + mobile decoder unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showFirstFrame = () => {
      try {
        video.currentTime = 0.001;
      } catch {
        /* ignore */
      }
    };

    const onLoadedMeta = () => {
      video.pause();
      showFirstFrame();
      if (prefersReducedMotion) {
        video.loop = true;
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 1) onLoadedMeta();
    else video.addEventListener("loadedmetadata", onLoadedMeta, { once: true });

    // We drive playback manually; if browser tries to play, pause it
    const onPlay = () => {
      if (!prefersReducedMotion) video.pause();
    };
    video.addEventListener("play", onPlay);

    // Unlock decoder on first user gesture (mobile)
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      }
    };
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    window.addEventListener("click", prime, { once: true });

    return () => {
      video.removeEventListener("play", onPlay);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("click", prime);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={wrapRef} className="stage-video-wrap" aria-hidden>
      <video
        ref={videoRef}
        className="stage-video"
        muted
        playsInline
        preload="auto"
        poster={poster}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="stage-video-dim" />
      <div className="stage-video-grain" />
    </div>
  );
}
