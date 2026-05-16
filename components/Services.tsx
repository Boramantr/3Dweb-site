"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useImagePreloader from "@/hooks/useImagePreloader";
import useScrollCanvas from "@/hooks/useScrollCanvas";

const TOTAL_FRAMES = 104;

/* ── Service data ───────────────────────────────────────── */
type Service = {
  no: string;
  title: React.ReactNode;
  text: string;
  tag: string;
  img: string;
};

const services: Service[] = [
  {
    no: "/ 01",
    title: (<>Modern Villa<br />Tasarımı</>),
    text: "Çağdaş çizgilerin sıcaklıkla buluştuğu, size özel müstakil villa projeleri.",
    tag: "VİLLA",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 02",
    title: (<>Mimari<br />Konsept</>),
    text: "Araziye, ışığa ve manzaraya göre kurgulanan özgün mimari kimlik.",
    tag: "KONSEPT",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 03",
    title: (<>İç Mimari<br />& Dekorasyon</>),
    text: "Mekânın ruhunu doğal malzemeler ve sıcak dokularla yeniden yorumluyoruz.",
    tag: "İÇ MEKAN",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 04",
    title: (<>Anahtar Teslim<br />Konut</>),
    text: "Tasarımdan inşaata, ince işçilikten teslime kadar tek elden çözüm.",
    tag: "PROJE",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 05",
    title: (<>Doğayla<br />Bütünleşik Tasarım</>),
    text: "Çevreye saygı duyan, peyzajla iç içe yaşam alanları kurguluyoruz.",
    tag: "PEYZAJ",
    img: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 06",
    title: (<>Restorasyon<br />& Renovasyon</>),
    text: "Mevcut yapıları özgün karakterini koruyarak çağdaş ihtiyaçlara uyarlıyoruz.",
    tag: "RENOVASYON",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 07",
    title: (<>Ofis & Ticari<br />Mekan</>),
    text: "Marka kimliğinizi yansıtan, verimli ve etkileyici kurumsal mekan tasarımları.",
    tag: "TİCARİ",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 08",
    title: (<>3D Görselleştirme<br />& Render</>),
    text: "Projenizi inşa edilmeden, fotogerçekçi görsellerle baştan deneyimleyin.",
    tag: "RENDER",
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 09",
    title: (<>Proje Yönetimi<br />& Danışmanlık</>),
    text: "Süreci A'dan Z'ye planlıyor, ekipleri yönetiyor, bütçeyi kontrol altında tutuyoruz.",
    tag: "YÖNETİM",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=85&auto=format&fit=crop"
  },
  {
    no: "/ 10",
    title: (<>Sürdürülebilir<br />Tasarım</>),
    text: "Enerji verimli, düşük karbon ayak izli, doğaya saygılı mimari çözümler.",
    tag: "SÜRDÜRÜLEBİLİR",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=85&auto=format&fit=crop"
  }
];

/* ── Component ──────────────────────────────────────────── */
export default function Services() {
  const { images, ready } = useImagePreloader("/frame3", "ezgif-frame-", ".png", 1, TOTAL_FRAMES);
  const { sectionRef, canvasRef } = useScrollCanvas(images, TOTAL_FRAMES, ready);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const total = services.length;

  /* ── Horizontal scroll card tracker ──────────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 28
        : 360;
      const idx = Math.min(total, Math.max(1, Math.round(el.scrollLeft / cardWidth) + 1));
      setCurrent(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  const go = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 28
      : 360;
    el.scrollBy({ left: cardWidth * dir, behavior: "smooth" });
  };

  const progress = ((current - 1) / Math.max(1, total - 1)) * 100;

  return (
    <section ref={sectionRef} className="services-scroll" id="hizmetler">
      <div className="services-scroll__sticky">
        <canvas ref={canvasRef} className="services-scroll__canvas" aria-hidden />
        <div className="services-scroll__dim" />
        <div className="services-scroll__grain" />

        <div className="services-scroll__content">
          <div className="services-header">
            <div className="section-headline">
              <span className="section-bg-text">SERVICES</span>
              <span className="features-eyebrow">
                <span className="features-eyebrow-line" />
                HİZMETLERİMİZ
              </span>
            </div>
            <p className="services-intro">
              Her projeyi sıfırdan, sizinle birlikte kuruyoruz.
              <br />
              Aşağıda sunduğumuz hizmetlerin tamamını keşfedin.
            </p>
          </div>

          <div className="services-track-wrap">
            <div className="services-scroll-track" ref={scrollRef}>
              {services.map((s, i) => (
                <motion.article
                  key={s.no}
                  className="service-card-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  data-index={i}
                >
                  <div className="service-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.tag} loading="lazy" />
                    <span className="service-tag">{s.tag}</span>
                  </div>
                  <div className="service-meta">
                    <span className="service-no">{s.no}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="service-cta">
                      Detayları gör <i />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="services-foot">
            <div className="services-progress">
              <span className="services-counter">
                <b>{String(current).padStart(2, "0")}</b>
                <i />
                <span>{String(total).padStart(2, "0")}</span>
              </span>
              <div className="services-progress-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="services-nav">
              <button className="svc-arrow" onClick={() => go(-1)} aria-label="Önceki">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="svc-arrow" onClick={() => go(1)} aria-label="Sonraki">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
