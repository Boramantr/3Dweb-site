"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

type Project = {
  no: string;
  title: string;
  text: string;
  tag: string;
  img: string;
  size?: "lg" | "md" | "sm";
  details: string[];
};

const projects: Project[] = [
  {
    no: "01",
    title: "Modern Villa Tasarımı",
    text: "Çağdaş çizgilerin sıcaklıkla buluştuğu, size özel müstakil villa projeleri.",
    tag: "VİLLA",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=90&auto=format&fit=crop",
    size: "lg",
    details: [
      "Havuz ve teraslar dış mekan yaşamını uzatır.",
      "Akıllı sistemlerle tüm ev tek dokunuşta kontrol edilir.",
      "Doğal taş ve ahşap, mekana zamansız bir dokunuş katar."
    ]
  },
  {
    no: "02",
    title: "Mimari Konsept",
    text: "Araziye, ışığa ve manzaraya göre kurgulanan özgün mimari kimlik.",
    tag: "KONSEPT",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90&auto=format&fit=crop",
    size: "md",
    details: [
      "Araziyi ve iklimi okuyup yapıyı ona göre yerleştiririz.",
      "Manzara, evin en sessiz hikâyecisi olur.",
      "Fotogerçekçi maketle projeyi baştan deneyimleyin."
    ]
  },
  {
    no: "03",
    title: "İç Mimari & Dekorasyon",
    text: "Mekânın ruhunu doğal malzemeler ve sıcak dokularla yeniden yorumluyoruz.",
    tag: "İÇ MEKAN",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=90&auto=format&fit=crop",
    size: "md",
    details: [
      "Mobilya seçimi mekanın karakterini belirler.",
      "Aydınlatma, gün boyu farklı bir ruh hali kurar.",
      "Sanat eseri yerleşimi mekana imza olur."
    ]
  },
  {
    no: "04",
    title: "Anahtar Teslim Konut",
    text: "Tasarımdan inşaata, ince işçilikten teslime kadar tek elden çözüm.",
    tag: "PROJE",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90&auto=format&fit=crop",
    size: "sm",
    details: [
      "Ruhsat ve izinleri sizin yerinize takip ederiz.",
      "Bütçe ve tedariki şeffaf bir akışla yönetiriz.",
      "Anahtarınızı planlı bir teslimle elinize veririz."
    ]
  },
  {
    no: "05",
    title: "Doğayla Bütünleşik Tasarım",
    text: "Çevreye saygı duyan, peyzajla iç içe yaşam alanları kurguluyoruz.",
    tag: "PEYZAJ",
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90&auto=format&fit=crop",
    size: "sm",
    details: [
      "Bitki ve ağaç planı, mevsimlerle birlikte akar.",
      "Su öğeleri ve dinlenme köşeleri huzuru çağırır.",
      "Yöresel taş, peyzajı toprağa bağlar."
    ]
  },
  {
    no: "06",
    title: "Restorasyon & Renovasyon",
    text: "Mevcut yapıları özgün karakterini koruyarak çağdaş ihtiyaçlara uyarlıyoruz.",
    tag: "RENOVASYON",
    img: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1200&q=90&auto=format&fit=crop",
    size: "md",
    details: [
      "Yapıyı sessizce, görünmez bir titizlikle güçlendiririz.",
      "Özgün detayları olduğu gibi koruruz.",
      "Modern konforu eski karakterle harmanlarız."
    ]
  },
  {
    no: "07",
    title: "Ofis & Ticari Mekan",
    text: "Marka kimliğinizi yansıtan, verimli ve etkileyici kurumsal mekan tasarımları.",
    tag: "TİCARİ",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=90&auto=format&fit=crop",
    size: "md",
    details: [
      "Marka kimliğiniz mekanın diline işlenir.",
      "Ergonomik düzen, ekibinizin verimini yükseltir.",
      "Müşteri deneyimi her köşede hissedilir."
    ]
  },
  {
    no: "08",
    title: "3D Görselleştirme",
    text: "Projenizi inşa edilmeden, fotogerçekçi görsellerle baştan deneyimleyin.",
    tag: "RENDER",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90&auto=format&fit=crop",
    size: "sm",
    details: [
      "İç ve dış mekanı fotogerçekçi görsellerle sunarız.",
      "360° sanal turla projeye baştan adım atarsınız.",
      "Malzemeleri uygulanmadan önce görüp seçersiniz."
    ]
  },
  {
    no: "09",
    title: "Proje Yönetimi",
    text: "Süreci A'dan Z'ye planlıyor, ekipleri yönetiyor, bütçeyi kontrol altında tutuyoruz.",
    tag: "YÖNETİM",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=90&auto=format&fit=crop",
    size: "sm",
    details: [
      "Her hafta net bir ilerleme raporu paylaşırız.",
      "Bütçeyi şeffaf ve denetlenebilir tutarız.",
      "Tek muhatap, sıfır karmaşa — süreç akıcı işler."
    ]
  },
  {
    no: "10",
    title: "Sürdürülebilir Tasarım",
    text: "Enerji verimli, düşük karbon ayak izli, doğaya saygılı mimari çözümler.",
    tag: "SÜRDÜRÜLEBİLİR",
    img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&q=90&auto=format&fit=crop",
    size: "lg",
    details: [
      "Güneş ve jeotermal enerjiyle ısınma maliyeti düşer.",
      "Yağmur suyu hasadıyla bahçe kendi kendini sular.",
      "LEED ve BREEAM standartlarına uygun çözümler."
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function ProjelerPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [activeNo, setActiveNo] = useState<string | null>(null);
  const microSpring = { type: "spring" as const, stiffness: 260, damping: 20 };

  return (
    <main className="proj-page">
      <div className="proj-page__vignette" />
      <div className="proj-page__grain" />

      {/* Top progress bar */}
      <motion.div
        className="proj-page__scroll-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="proj-page__nav">
        <Link href="/" className="proj-page__back">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          <span>Ana Sayfa</span>
        </Link>
        <Link href="/" className="proj-page__logo">
          Rinov<span>ARCH</span>
        </Link>
        <span className="proj-page__counter">
          <b>∞</b> Proje · 5 Yıl
        </span>
      </header>

      {/* HERO */}
      <motion.section ref={heroRef} className="proj-hero" style={{ y: heroY, opacity: heroOpacity }}>
        <motion.span
          className="proj-hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2, letterSpacing: "0.40em" }}
        >
          <span className="proj-hero__line" />
          TÜM PROJELERİMİZ
          <span className="proj-hero__line" />
        </motion.span>

        <motion.h1
          className="proj-hero__title"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
          }}
        >
          <motion.span
            variants={fadeUp}
            whileHover={{ x: 6 }}
            transition={microSpring}
          >
            Güzel <em>hikâyeler,</em>
          </motion.span>
          <motion.span
            variants={fadeUp}
            whileHover={{ x: -6 }}
            transition={microSpring}
          >
            tek bir <em>el işçiliği.</em>
          </motion.span>
        </motion.h1>

        <motion.div
          className="proj-hero__ornament"
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 8, scale: 1.06 }}
        >
          <span /><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg><span />
        </motion.div>

        <motion.p
          className="proj-hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          // micro-spring on hover handled inline below via transition prop
        >
          İlk eskizden anahtar teslime — RinovARCH'ın 5 yıllık<br />
          mirası, tek bir koleksiyonda.
        </motion.p>

        <motion.div
          className="proj-hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="proj-hero__scroll-line" />
          <span>KAYDIRIN</span>
        </motion.div>
      </motion.section>

      {/* GRID */}
      <section className="proj-grid">
        {projects.map((p, i) => {
          const isActive = activeNo === p.no;
          return (
            <motion.article
              key={p.no}
              layout
              className={`proj-card proj-card--${p.size ?? "md"}${isActive ? " is-active" : ""}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              custom={i % 3}
              variants={fadeUp}
              whileHover={{ y: isActive ? 0 : -8 }}
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={() => setActiveNo(isActive ? null : p.no)}
              style={{ zIndex: isActive ? 5 : 1 }}
            >
              <div className="proj-card__shine" />
              <div className="proj-card__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.tag} loading="lazy" />
                <div className="proj-card__img-overlay" />
                <span className="proj-card__no">/ {p.no}</span>
                <span className="proj-card__tag">{p.tag}</span>
              </div>
              <motion.div layout="position" className="proj-card__body">
                <motion.h3
                  whileHover={{ x: 4 }}
                  transition={microSpring}
                >
                  {p.title}
                </motion.h3>
                <p>{p.text}</p>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="expand"
                      className="proj-card__expand"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="proj-card__expand-label">Kapsam</span>
                      <ul>
                        {p.details.map((d, idx) => (
                          <motion.li
                            key={d}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="proj-card__bullet" />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="proj-card__cta">
                  {isActive ? "Kapat" : "Detayları gör"}
                  <motion.svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </motion.svg>
                </span>
              </motion.div>
            </motion.article>
          );
        })}
      </section>

      <footer className="proj-page__foot">
        <span>© RINOVARCH · ANTALYA</span>
        <Link href="/" className="proj-page__back proj-page__back--small">
          <span>Ana Sayfaya Dön</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </footer>
    </main>
  );
}
