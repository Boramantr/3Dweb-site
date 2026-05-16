"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollCanvas
 * ---------------
 * Binds a canvas to a scrollytelling section:
 *  - Draws the correct frame based on scroll progress (0→1)
 *  - Cover-fits images to canvas (like object-fit: cover)
 *  - Handles resize and DPR scaling
 *
 * @param images  - preloaded HTMLImageElement array
 * @param total   - total frame count
 * @param ready   - true when all images are loaded
 */
export default function useScrollCanvas(
  images: HTMLImageElement[],
  total: number,
  ready: boolean
) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(0);

  /* ── Draw a single frame, cover-fitted ───────────────── */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
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
    [images]
  );

  /* ── Draw first frame when ready ─────────────────────── */
  useEffect(() => {
    if (ready && images.length > 0) {
      drawFrame(currentFrameRef.current);
    }
  }, [ready, images, drawFrame]);

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
          total - 1,
          Math.floor(progress * total)
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
  }, [total, drawFrame]);

  /* ── Resize: re-draw current frame ──────────────────── */
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return { sectionRef, canvasRef };
}
