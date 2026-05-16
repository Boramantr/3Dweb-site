"use client";

import { motion } from "framer-motion";
import useImagePreloader from "@/hooks/useImagePreloader";
import useScrollCanvas from "@/hooks/useScrollCanvas";

const TOTAL_FRAMES = 156;

/* ── Advantage data ─────────────────────────────────────── */
type Item = {
  roman: string;
  title: React.ReactNode;
  text: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    roman: "I",
    title: <>Fiyat — Kalite</>,
    text: "Evinizin güvenliği ve dayanıklılığı için sertifikalı, zamana meydan okuyan malzemeler.",
    icon: (
      <svg className="adv-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32l8-8 6 4 8-6 8 6 6-4 8 8-6 8-8-4-6 4-6-4-8 4z" />
        <path d="M22 28l8-6 8 6" />
      </svg>
    )
  },
  {
    roman: "II",
    title: <>Anahtar Teslim İnşaat</>,
    text: "Projeden iç mekan tasarımına kadar eksiksiz, tam döngü bir hizmet anlayışı.",
    icon: (
      <svg className="adv-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="32" r="9" />
        <path d="M33 32h22" />
        <path d="M46 32v6" />
        <path d="M52 32v8" />
      </svg>
    )
  },
  {
    roman: "III",
    title: <>Sabit Ustalar</>,
    text: "Ekibimizdeki tüm ustalar üç yılı aşkın süredir bizimle aynı çatı altında çalışıyor.",
    icon: (
      <svg className="adv-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="22" r="6" />
        <path d="M22 44c0-5 4-9 10-9s10 4 10 9" />
        <circle cx="18" cy="26" r="5" />
        <path d="M10 44c0-4 3-7 8-7" />
        <circle cx="46" cy="26" r="5" />
        <path d="M54 44c0-4-3-7-8-7" />
      </svg>
    )
  },
  {
    roman: "IV",
    title: <>Esnek Ödeme</>,
    text: "İnşaat sürecinin aşamalarına yayılan, ihtiyaca göre kurgulanan kademeli ödeme.",
    icon: (
      <svg className="adv-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="18" width="44" height="28" rx="3" />
        <path d="M10 26h44" />
        <circle cx="46" cy="38" r="2" />
        <circle cx="52" cy="38" r="2" />
      </svg>
    )
  }
];

/* ── Component ──────────────────────────────────────────── */
export default function Avantajlar() {
  const { images, ready } = useImagePreloader("/frame4", "ezgif-frame-", ".png", 105, TOTAL_FRAMES);
  const { sectionRef, canvasRef } = useScrollCanvas(images, TOTAL_FRAMES, ready);

  return (
    <section ref={sectionRef} className="adv-scroll" id="avantajlar">
      <div className="adv-scroll__sticky">
        <canvas ref={canvasRef} className="adv-scroll__canvas" aria-hidden />
        <div className="adv-scroll__dim" />
        <div className="adv-scroll__grain" />

        <div className="adv-scroll__content">
          <div className="section-headline section-headline--adv">
            <span className="section-bg-text adv-bg-text">ADVANTAGES</span>

            <motion.span
              className="features-eyebrow adv-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="features-eyebrow-line" />
              AVANTAJLAR
            </motion.span>

            <motion.h2
              className="adv-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <em>Şaheserin</em> ardındaki ilkeler
            </motion.h2>

            <motion.div
              className="adv-ornament"
              initial={{ opacity: 0, scaleX: 0.2 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="adv-ornament-line" />
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
              </svg>
              <span className="adv-ornament-line" />
            </motion.div>
          </div>

          <div className="adv-grid">
            {items.map((item, i) => (
              <motion.div
                key={item.roman}
                className="adv-item"
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -8 }}
              >
                <div className="adv-icon-wrap">
                  <motion.span
                    className="adv-icon-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                  />
                  {item.icon}
                </div>
                <span className="adv-no">{item.roman}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
