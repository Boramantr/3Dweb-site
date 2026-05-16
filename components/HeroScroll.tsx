"use client";

import { motion } from "framer-motion";
import Nav from "./Nav";
import useImagePreloader from "@/hooks/useImagePreloader";
import useScrollCanvas from "@/hooks/useScrollCanvas";

const TOTAL_FRAMES = 152;

export default function HeroScroll() {
  const { images, ready } = useImagePreloader("/frame1", "ezgif-frame-", ".png", 1, TOTAL_FRAMES);
  const { sectionRef, canvasRef } = useScrollCanvas(images, TOTAL_FRAMES, ready);

  return (
    <section ref={sectionRef} className="hero-scroll" id="heroScroll">
      <div className="hero-scroll__sticky">
        <canvas ref={canvasRef} className="hero-scroll__canvas" aria-hidden />
        <div className="hero-scroll__dim" />
        <div className="hero-scroll__grain" />

        <Nav />

        <div className="hero-scroll__content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Rinov<span>ARCH</span>
          </motion.h1>
        </div>

        <div className="hero-bottom">
          <motion.div
            className="tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            #İlhamVerenYaşam
          </motion.div>

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            Mimari, iç mekan ve yaşamın
            <br />
            kusursuzca buluştuğu modern
            <br />
            alanlar tasarlıyoruz.
          </motion.p>

          <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <div className="service-card-img">
              <svg viewBox="0 0 80 80" width="100%" height="100%">
                <rect width="80" height="80" fill="#e8eef3" />
                <path d="M20 55 L20 35 Q20 25 30 25 L50 25 Q60 25 60 35 L60 55 Z" fill="#a8c0d4" />
                <rect x="22" y="55" width="4" height="14" fill="#5a6b78" />
                <rect x="54" y="55" width="4" height="14" fill="#5a6b78" />
                <ellipse cx="40" cy="32" rx="18" ry="6" fill="#b8cfe0" />
              </svg>
            </div>
            <div className="service-card-body">
              <h3>Tasarım Hizmetleri</h3>
              <p>
                Mimari ve iç mekan çözümlerimizle, doğal malzemelerin sıcaklığını modern formlarla
                buluşturuyor; size özel, zamansız yaşam alanları tasarlıyoruz.
              </p>
              <a href="#hizmetler" className="explore-link">
                KEŞFET
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
