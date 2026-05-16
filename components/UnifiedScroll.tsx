"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Nav from "./Nav";
import useUnifiedScrollCanvas, { type FrameDir } from "@/hooks/useUnifiedScrollCanvas";

/* ── Frame directory config ─────────────────────────────── */
const FRAME_DIRS: FrameDir[] = [
  { dir: "/frame1", prefix: "ezgif-frame-", ext: ".png", start: 1, count: 151 },
  { dir: "/frame2", prefix: "ezgif-frame-", ext: ".png", start: 1, count: 151 },
  { dir: "/frame3", prefix: "ezgif-frame-", ext: ".png", start: 1, count: 151 },
  { dir: "/frame4", prefix: "ezgif-frame-", ext: ".png", start: 1, count: 151 },
];

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

/* ── Advantages — ilkeler manifestosu ────────────────────── */
type Adv2 = {
  roman: string;
  tag: string;
  title: string;
  promise: string;
  detail: string;
  chips: string[];
};
const adv2: Adv2[] = [
  {
    roman: "I",
    tag: "İLKE",
    title: "Malzeme,",
    promise: "sözünüzü taşır.",
    detail: "Görünmeyen yere de aynı kaliteyi koyarız. Beton, ahşap, mermer — hangisi olursa, dayanıklı olanı seçeriz.",
    chips: ["Sertifikalı tedarik", "10 yıl garanti", "Şeffaf bütçe"]
  },
  {
    roman: "II",
    tag: "İLKE",
    title: "Süreç,",
    promise: "tek elden akar.",
    detail: "Eskizden anahtar teslime kadar tek bir ekip. Üç müteahhit arasında koşmazsınız, tek bir muhatabınız olur.",
    chips: ["Tam döngü", "Tek sözleşme", "Haftalık rapor"]
  },
  {
    roman: "III",
    tag: "İLKE",
    title: "Ekip,",
    promise: "değişmeyen yüzler.",
    detail: "Ustalarımız üç yılı aşkın süredir bizimle. Her şantiyede aynı titizlik, aynı imza işçilik.",
    chips: ["3+ yıl deneyim", "Sabit kadro", "Usta-çırak"]
  },
  {
    roman: "IV",
    tag: "İLKE",
    title: "Ödeme,",
    promise: "ritminize uyar.",
    detail: "Aşamalı bir model — siz işin ilerleyişine göre ödersiniz, baştan büyük blok talep yok.",
    chips: ["Kademeli", "Esnek", "Bütçe koruma"]
  }
];

/* ── Featured (panel) — 5 kısa öne çıkan hizmet ─────────── */
type Featured = { no: string; title: string; text: string; tag: string };
const featured: Featured[] = [
  { no: "01", title: "Modern Villa",   text: "Size özel, çağdaş çizgili müstakil yaşam.", tag: "VİLLA" },
  { no: "02", title: "Mimari Konsept", text: "Araziye ve ışığa göre özgün kimlik.",       tag: "KONSEPT" },
  { no: "03", title: "İç Mimari",      text: "Doğal malzeme, sıcak dokular.",              tag: "İÇ MEKAN" },
  { no: "04", title: "Anahtar Teslim", text: "Tasarımdan teslime tek elden.",              tag: "PROJE" },
  { no: "05", title: "Restorasyon",    text: "Özgün karakteri koruyarak yenileme.",        tag: "RENOVASYON" }
];

/* ── Advantage data ─────────────────────────────────────── */
type AdvItem = {
  roman: string;
  title: React.ReactNode;
  text: string;
  icon: React.ReactNode;
};

const advantages: AdvItem[] = [
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
export default function UnifiedScroll() {
  const { sectionRef, canvasRef, totalFrames } = useUnifiedScrollCanvas(FRAME_DIRS);

  /* ── Active panel tracking ─────────────────────────────── */
  const [activePanel, setActivePanel] = useState(0); // 0=hero, 1=about, 2=services, 3=adv
  const [aboutStage, setAboutStage] = useState(0); // 0=intro, 1=vision, 2=mission
  const [serviceIndex, setServiceIndex] = useState(0); // 0..featured.length-1
  const [advIndex, setAdvIndex] = useState(0); // 0..adv2.length-1
  const total = featured.length;
  const advTotal = adv2.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollable = sectionHeight - viewportHeight;
        if (scrollable <= 0) return;

        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const panel = Math.min(3, Math.floor(progress * 4));
        setActivePanel(panel);

        // About sub-progress (panel 1 → 0.25..0.50)
        const aboutSub = Math.max(0, Math.min(1, (progress - 0.25) * 4));
        setAboutStage(aboutSub >= 0.66 ? 2 : aboutSub >= 0.33 ? 1 : 0);

        // Services sub-progress (panel 2 → 0.50..0.75) → service index 0..total-1
        const svcSub = Math.max(0, Math.min(0.9999, (progress - 0.5) * 4));
        setServiceIndex(Math.floor(svcSub * total));

        // Advantages sub-progress (panel 3 → 0.75..1.0) → adv index 0..advTotal-1
        const advSub = Math.max(0, Math.min(0.9999, (progress - 0.75) * 4));
        setAdvIndex(Math.floor(advSub * advTotal));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [sectionRef, total, advTotal]);

  const progress = (serviceIndex / Math.max(1, total - 1)) * 100;
  const prevSvc = serviceIndex > 0 ? featured[serviceIndex - 1] : null;
  const currSvc = featured[serviceIndex];
  const nextSvc = serviceIndex < total - 1 ? featured[serviceIndex + 1] : null;

  const advProgress = (advIndex / Math.max(1, advTotal - 1)) * 100;
  const prevAdv = advIndex > 0 ? adv2[advIndex - 1] : null;
  const currAdv = adv2[advIndex];
  const nextAdv = advIndex < advTotal - 1 ? adv2[advIndex + 1] : null;

  return (
    <section ref={sectionRef} className="unified-scroll" id="unified">
      {/* ── Sticky viewport with single canvas ─────────── */}
      <div className="unified-scroll__sticky">
        <canvas ref={canvasRef} className="unified-scroll__canvas" aria-hidden />
        <div className="unified-scroll__dim" />
        <div className="unified-scroll__grain" />

        {/* ── HERO PANEL ─────────────────────────────────── */}
        <div className={`unified-panel unified-panel--hero${activePanel === 0 ? " is-active" : ""}`} id="heroScroll">
          <div className="hero-vignette" />
          <div className="hero-warm-tint" />

          <Nav />

          {/* TOP-RIGHT META */}
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

          {/* BOTTOM-LEFT editorial */}
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

          {/* BOTTOM-RIGHT glass CTA */}
          <motion.a
            href="/projeler"
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

          {/* Scroll hint */}
          <motion.div
            className="hero-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            <span className="hero-scroll-hint__line" />
            <span className="hero-scroll-hint__txt">SCROLL</span>
          </motion.div>
        </div>

        {/* ── ABOUT PANEL ────────────────────────────────── */}
        <div className={`unified-panel unified-panel--about${activePanel === 1 ? " is-active" : ""}`} id="hakkimizda">
          <div className="about2">
            <div className="about2-vignette" />

            {/* LEFT — portrait */}
            <motion.div
              className="about2-portrait"
              initial={{ opacity: 0, x: -40 }}
              animate={activePanel === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/r%C3%BCya.jpeg"
                alt="Rüya Ocaker — RinovARCH Kurucu Mimar"
                loading="lazy"
              />
              <div className="about2-portrait__frame" />
              <div className="about2-portrait__plate">
                <span className="about2-portrait__name">Rüya Ocaker</span>
                <span className="about2-portrait__role">RinovARCH · Kurucu Mimar</span>
                <span className="about2-portrait__role about2-portrait__role--alt">Yüksek Mimar</span>
              </div>
            </motion.div>

            {/* RIGHT — animated stages */}
            <div className="about2-stage">
              <motion.div
                className="about2-stepper"
                initial={{ opacity: 0, y: -10 }}
                animate={activePanel === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {["TANIŞMA", "VİZYON", "MİSYON"].map((label, i) => (
                  <span
                    key={label}
                    className={`about2-step${aboutStage === i ? " is-active" : ""}${aboutStage > i ? " is-past" : ""}`}
                  >
                    <span className="about2-step__dot" />
                    <span className="about2-step__label">{label}</span>
                  </span>
                ))}
              </motion.div>

              <AnimatePresence mode="wait">
                {aboutStage === 0 && (
                  <motion.div
                    key="intro"
                    className="about2-content"
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span className="about2-kicker" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                      — Merhaba
                    </motion.span>
                    <motion.h2 className="about2-headline" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                      Ben <em>Rüya.</em><br />
                      RinovARCH'ın kurucusu;<br />
                      <em>iz bırakan</em> mekanlar tasarlıyorum.
                    </motion.h2>
                    <motion.p className="about2-body" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                      Her proje yeni bir hikâye. Önce sizi dinlerim — sonra ışığı, malzemeyi ve oranı
                      bu hikâyeyle birlikte örerim.
                    </motion.p>
                    <div className="about2-meta">
                      {[
                        { value: "120+", label: "Proje" },
                        { value: "5", label: "Yıl" },
                        { value: "Antalya", label: "· Türkiye" }
                      ].map((m) => (
                        <motion.span key={m.label} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                          <b>{m.value}</b> {m.label}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {aboutStage === 1 && (
                  <motion.div
                    key="vision"
                    className="about2-content"
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span className="about2-kicker" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                      — Vizyon
                    </motion.span>
                    <motion.h2 className="about2-headline" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                      Mekân, sizin<br />
                      <em>hikâyenizdir.</em>
                    </motion.h2>
                    <motion.p className="about2-body" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                      Modaya değil, içinde yaşayanın ruhuna bakarız. Doğal malzeme, dürüst işçilik
                      ve zamana direnen oranlarla — kırk yıl sonra da sıcak duracak alanlar.
                    </motion.p>
                    <ul className="about2-pillars">
                      {["Doğal malzeme", "İnsan ölçeği", "Işık & oran"].map((p) => (
                        <motion.li key={p} whileHover={{ y: -3, scale: 1.04 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {aboutStage === 2 && (
                  <motion.div
                    key="mission"
                    className="about2-content"
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span className="about2-kicker" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                      — Misyon
                    </motion.span>
                    <motion.h2 className="about2-headline" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                      Her detay,<br />
                      <em>birlikte</em> yazılır.
                    </motion.h2>
                    <motion.p className="about2-body" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                      İlk eskizden anahtar teslime kadar yanınızdayım. Tek ekip, şeffaf süreç,
                      titiz takip — projeniz bizim de evimiz gibi.
                    </motion.p>
                    <ul className="about2-pillars">
                      {["Şeffaf süreç", "Sabit ekip", "El işçiliği"].map((p) => (
                        <motion.li key={p} whileHover={{ y: -3, scale: 1.04 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── SERVICES PANEL ─────────────────────────────── */}
        <div className={`unified-panel unified-panel--services${activePanel === 2 ? " is-active" : ""}`} id="hizmetler">
          <div className="svc2">
            <div className="svc2-vignette" />

            {/* HEADER */}
            <motion.div
              className="svc2-header"
              initial={{ opacity: 0, y: -10 }}
              animate={activePanel === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="svc2-eyebrow">— HİZMETLERİMİZ</span>
              <h2 className="svc2-title">
                Her proje, <em>kendi hikâyesi.</em>
              </h2>
            </motion.div>

            {/* CENTER FOCUS — big readable card */}
            <div className="svc2-focus-wrap">
              {/* ghost prev/next */}
              <AnimatePresence mode="wait">
                {prevSvc && (
                  <motion.span
                    key={`g-prev-${prevSvc.no}`}
                    className="svc2-ghost svc2-ghost--left"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 0.35, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {prevSvc.no} · {prevSvc.tag}
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.article
                  key={`focus-${currSvc.no}`}
                  className="svc2-focus"
                  initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -60, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="svc2-focus__tag">{currSvc.tag}</span>
                  <span className="svc2-focus__no">{currSvc.no}</span>
                  <h3 className="svc2-focus__title">{currSvc.title}</h3>
                  <p className="svc2-focus__text">{currSvc.text}</p>
                </motion.article>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {nextSvc && (
                  <motion.span
                    key={`g-next-${nextSvc.no}`}
                    className="svc2-ghost svc2-ghost--right"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 0.35, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {nextSvc.no} · {nextSvc.tag}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* PROGRESS BAR */}
            <div className="svc2-progress">
              <span className="svc2-progress__count">
                <b>{String(serviceIndex + 1).padStart(2, "0")}</b>
                <i />
                <span>{String(total).padStart(2, "0")}</span>
              </span>
              <div className="svc2-progress__bar">
                <motion.span
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* BOTTOM CENTER — subtle CTA */}
            <Link href="/projeler" className="svc2-cta">
              <span>Tüm projelerimizi gör</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── ADVANTAGES PANEL ───────────────────────────── */}
        <div className={`unified-panel unified-panel--adv${activePanel === 3 ? " is-active" : ""}`} id="avantajlar">
          <div className="adv2">
            <div className="adv2-vignette" />
            <span className="adv2-bg-mark">RINOV — ARCH</span>

            {/* HEADER */}
            <motion.div
              className="adv2-header"
              initial={{ opacity: 0, y: -10 }}
              animate={activePanel === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="adv2-eyebrow">— AVANTAJLAR</span>
              <h2 className="adv2-title">Dört <em>ilke,</em> bir söz.</h2>
              <span className="adv2-ornament" aria-hidden>
                <span className="adv2-ornament__line" />
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg>
                <span className="adv2-ornament__line" />
              </span>
            </motion.div>

            {/* MAIN — two columns, Roman numeral + content */}
            <div className="adv2-main">
              {/* LEFT: roman numeral pillar */}
              <div className="adv2-roman-wrap">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`roman-${currAdv.roman}`}
                    className="adv2-roman-stack"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="adv2-roman-tag">{currAdv.tag}</span>
                    <span className="adv2-roman">{currAdv.roman}</span>
                    <span className="adv2-roman-line" />
                    <span className="adv2-roman-of">{String(advIndex + 1).padStart(2, "0")} / {String(advTotal).padStart(2, "0")}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: content */}
              <div className="adv2-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`adv-${currAdv.roman}`}
                    initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(6px)" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="adv2-content__inner"
                  >
                    <h3 className="adv2-headline">
                      {currAdv.title} <em>{currAdv.promise}</em>
                    </h3>
                    <p className="adv2-detail">{currAdv.detail}</p>
                    <ul className="adv2-chips">
                      {currAdv.chips.map((c, i) => (
                        <motion.li
                          key={c}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ y: -3, scale: 1.04 }}
                        >
                          <span className="adv2-chip__dot" />
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* FOOTER — dot stepper + subtle CTA */}
            <div className="adv2-foot">
              <div className="adv2-dots">
                {adv2.map((a, i) => (
                  <span
                    key={a.roman}
                    className={`adv2-dot${advIndex === i ? " is-active" : ""}${advIndex > i ? " is-past" : ""}`}
                  />
                ))}
              </div>
              <a href="tel:+905353353208" className="adv2-cta">
                <span>Bizimle konuşun</span>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
