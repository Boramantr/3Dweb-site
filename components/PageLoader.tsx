"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = ["R", "i", "n", "o", "v", "A", "R", "C", "H"];

/* Minimal Renaissance fleuron — small filigree ornament */
function Fleuron({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 24" width={size * 4.2} height={size} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
      <path d="M2 12 L36 12" />
      <path d="M64 12 L98 12" />
      {/* Center flourish */}
      <path d="M40 12 Q44 6 50 12 Q56 18 60 12" />
      <circle cx="50" cy="12" r="1.6" fill="currentColor" />
      {/* Small leaf curls */}
      <path d="M36 12 q-2 -4 -6 -2" />
      <path d="M64 12 q2 -4 6 -2" />
      <path d="M36 12 q-2 4 -6 2" />
      <path d="M64 12 q2 4 6 2" />
    </svg>
  );
}

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const MIN_HOLD = 3200; // hold at least this long for the experience
    const mountedAt = performance.now();

    const hideWithMinHold = () => {
      const elapsed = performance.now() - mountedAt;
      const remaining = Math.max(0, MIN_HOLD - elapsed);
      window.setTimeout(() => setVisible(false), remaining + 250);
    };

    const onLoad = () => hideWithMinHold();

    if (document.readyState === "complete") {
      hideWithMinHold();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Safety fallback
    const safety = window.setTimeout(() => setVisible(false), 5500);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(safety);
    };
  }, []);

  // Lock body scroll while loader is visible
  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="page-loader__vignette" />

          <motion.div
            className="page-loader__inner"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.6 } }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
            }}
          >
            {/* Roman year flourish */}
            <motion.div
              className="page-loader__roman"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="page-loader__roman-mark">·</span>
              <span className="page-loader__roman-num">M·M·X·X</span>
              <span className="page-loader__roman-mark">·</span>
            </motion.div>

            <motion.div
              className="page-loader__fleuron"
              variants={{
                hidden: { opacity: 0, scaleX: 0.1 },
                show: { opacity: 1, scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <Fleuron size={20} />
            </motion.div>

            <h1 className="page-loader__logo">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
                    show: {
                      opacity: 1, y: 0, filter: "blur(0px)",
                      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                  className={i >= 5 ? "page-loader__logo-alt" : ""}
                >
                  {l}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="page-loader__fleuron page-loader__fleuron--small"
              variants={{
                hidden: { opacity: 0, scaleX: 0.1 },
                show: { opacity: 1, scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <Fleuron size={14} />
            </motion.div>

            <motion.span
              className="page-loader__hint"
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 0.78, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <em>Mimari · İç Mekan · Yaşam</em>
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
