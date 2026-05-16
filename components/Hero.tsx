"use client";

import { motion } from "framer-motion";
import Nav from "./Nav";

export default function Hero() {
  return (
    <section className="hero stage-panel" id="hero" data-stage-section="hero">
      <div className="hero-vignette" />
      <div className="hero-warm-tint" />

      <Nav />

      {/* TOP-RIGHT META — boş tavan kenarı */}
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <span className="hero-meta__num">01</span>
        <span className="hero-meta__div" />
        <span className="hero-meta__label">EST. 2020 — ARCHITECTURE STUDIO</span>
      </motion.div>

      {/* BOTTOM-LEFT — zemin boş alan */}
      <motion.div
        className="hero-editorial"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <span className="hero-editorial__tag">#İlhamVerenYaşam</span>
        <h2 className="hero-editorial__statement">
          Mimari, iç mekan ve yaşamın<br />
          kusursuzca buluştuğu<br />
          <em>zamansız alanlar.</em>
        </h2>
      </motion.div>

      {/* BOTTOM-RIGHT — minimal glass CTA */}
      <motion.a
        href="#hizmetler"
        className="hero-cta"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
      >
        <span className="hero-cta__kicker">TASARIM HİZMETLERİ</span>
        <span className="hero-cta__label">
          Projelerimizi Keşfet
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </motion.a>

      {/* Scroll indicator — alt orta, RINOVARCH tabela üstüne denk gelmez */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <span className="hero-scroll-hint__line" />
        <span className="hero-scroll-hint__txt">SCROLL</span>
      </motion.div>
    </section>
  );
}
