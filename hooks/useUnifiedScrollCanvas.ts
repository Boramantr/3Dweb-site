"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ── Global image cache ─────────────────────────────────── */
const globalCache = new Map<string, HTMLImageElement>();

export type FrameDir = {
  dir: string;       // e.g. "/frame1"
  prefix: string;    // e.g. "ezgif-frame-"
  ext: string;       // e.g. ".png"
  start: number;     // first frame number (1-indexed)
  count: number;     // how many frames in this directory
  pad?: number;      // zero-padding width (default 3)
};

/**
 * useUnifiedScrollCanvas
 * ----------------------
 * Loads frames from multiple directories and plays them in sequence
 * as the user scrolls through a tall section. All frame directories
 * are concatenated into one continuous timeline.
 */
export default function useUnifiedScrollCanvas(dirs: FrameDir[]) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  // Total frames across all directories
  const totalFrames = dirs.reduce((sum, d) => sum + d.count, 0);

  /* ── Preload all frames ──────────────────────────────── */
  useEffect(() => {
    const allImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let alreadyCached = 0;

    for (const d of dirs) {
      const pad = d.pad ?? 3;
      for (let i = 0; i < d.count; i++) {
        const num = String(d.start + i).padStart(pad, "0");
        const src = `${d.dir}/${d.prefix}${num}${d.ext}`;

        const cached = globalCache.get(src);
        if (cached) {
          allImages.push(cached);
          alreadyCached++;
          continue;
        }

        const img = document.createElement("img");
        img.decoding = "async";
        img.src = src;

        const onDone = () => {
          globalCache.set(src, img);
          loadedCount++;
          if (alreadyCached + loadedCount === totalFrames) {
            setReady(true);
          }
        };

        img.onload = onDone;
        img.onerror = onDone;

        allImages.push(img);
        globalCache.set(src, img);
      }
    }

    imagesRef.current = allImages;

    if (alreadyCached === totalFrames) {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Draw a single frame, cover-fitted ───────────────── */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const images = imagesRef.current;
      const img = images[frameIndex];
      if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let drawW: number, drawH: number, dx: number, dy: number;

      if (imgRatio > canvasRatio) {
        drawH = h;
        drawW = h * imgRatio;
        dx = (w - drawW) / 2;
        dy = 0;
      } else {
        drawW = w;
        drawH = w / imgRatio;
        dx = 0;
        dy = (h - drawH) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    },
    []
  );

  /* ── Draw first frame when ready ─────────────────────── */
  useEffect(() => {
    if (ready && imagesRef.current.length > 0) {
      drawFrame(currentFrameRef.current);
    }
  }, [ready, drawFrame]);

  /* ── Scroll → frame mapping via rAF ──────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollable = sectionHeight - viewportHeight;
        if (scrollable <= 0) return;

        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(progress * totalFrames)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [totalFrames, drawFrame]);

  /* ── Resize: re-draw current frame ──────────────────── */
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return { sectionRef, canvasRef, ready, totalFrames };
}
