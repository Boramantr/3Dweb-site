"use client";

import { useEffect, useRef, useState } from "react";

/* ── Global image cache ─────────────────────────────────── */
// Shared across all hook instances so the same sequence
// is never loaded twice, even if the component remounts.
const globalCache = new Map<string, HTMLImageElement>();

type PreloaderResult = {
  /** Array of preloaded HTMLImageElement references */
  images: HTMLImageElement[];
  /** Number of images loaded so far */
  loaded: number;
  /** Total number of images in the sequence */
  total: number;
  /** True when all images have finished loading */
  ready: boolean;
};

/**
 * useImagePreloader
 * -----------------
 * Preloads a numbered image sequence and caches it globally.
 *
 * @param dir     - public directory, e.g. "/frame1"
 * @param prefix  - filename prefix, e.g. "ezgif-frame-"
 * @param ext     - extension including dot, e.g. ".jpg"
 * @param start   - first frame number (1-indexed file number)
 * @param count   - total number of frames to load
 * @param pad     - zero-padding width (default 3 → "001")
 */
export default function useImagePreloader(
  dir: string,
  prefix: string,
  ext: string,
  start: number,
  count: number,
  pad: number = 3
): PreloaderResult {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Check how many are already cached
    let alreadyCached = 0;

    for (let i = 0; i < count; i++) {
      const num = String(start + i).padStart(pad, "0");
      const src = `${dir}/${prefix}${num}${ext}`;

      // Reuse from global cache if available
      const cached = globalCache.get(src);
      if (cached) {
        images[i] = cached;
        alreadyCached++;
        continue;
      }

      // Create new image element
      const img = document.createElement("img");
      img.decoding = "async";
      img.src = src;

      img.onload = () => {
        globalCache.set(src, img);
        loadedCount++;
        setLoaded(alreadyCached + loadedCount);
        if (alreadyCached + loadedCount === count) {
          setReady(true);
        }
      };

      img.onerror = () => {
        // Still count errors to avoid hanging
        loadedCount++;
        setLoaded(alreadyCached + loadedCount);
        if (alreadyCached + loadedCount === count) {
          setReady(true);
        }
      };

      images[i] = img;
      globalCache.set(src, img); // store ref immediately for dedup
    }

    imagesRef.current = images;

    // If everything was already cached
    if (alreadyCached === count) {
      setLoaded(count);
      setReady(true);
    } else {
      setLoaded(alreadyCached);
    }

    // No cleanup: images stay in globalCache intentionally
  }, [dir, prefix, ext, start, count, pad]);

  return {
    images: imagesRef.current,
    loaded,
    total: count,
    ready
  };
}
