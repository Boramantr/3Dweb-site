"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useImagePreloader from "@/hooks/useImagePreloader";
import useScrollCanvas from "@/hooks/useScrollCanvas";

const TOTAL_FRAMES = 148;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  const { images, ready } = useImagePreloader("/frame2", "ezgif-frame-", ".png", 153, TOTAL_FRAMES);
  const { sectionRef, canvasRef } = useScrollCanvas(images, TOTAL_FRAMES, ready);

  return (
    <section ref={sectionRef} className="about-scroll" id="hakkimizda">
      <div className="about-scroll__sticky">
        <canvas ref={canvasRef} className="about-scroll__canvas" aria-hidden />
        <div className="about-scroll__dim" />
        <div className="about-scroll__grain" />

        <div className="about-scroll__content">
          <div className="section-headline">
            <span className="section-bg-text">ABOUT</span>
            <span className="features-eyebrow">
              <span className="features-eyebrow-line" />
              HAKKIMIZDA
            </span>
          </div>

          <div className="about-grid">
            <motion.p
              className="about-intro"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              Doğanın huzurunda, modern yaşamın
              <br />
              inceliğiyle tasarlanmış konutlar.
              <br />
              Burada kendinizi gerçekten evinizde hissedersiniz.
            </motion.p>

            <motion.div
              className="about-image about-image--main"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image src="/about-1.jpg" alt="RinovARCH konutu" width={1200} height={825} priority={false} />
            </motion.div>

            <motion.div
              className="about-title-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="about-label">HAKKIMIZDA</span>
              <h2 className="about-title-big">
                RINOV
                <br />
                <em>RIDGE</em>
              </h2>
            </motion.div>

            <motion.p
              className="about-body"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              Burası, modern konforun el değmemiş doğayla buluştuğu yer. Eviniz sadece bir mülk değil,
              yaşamınızın ayrılmaz bir parçası olur.
            </motion.p>

            <motion.div
              className="about-image about-image--thumb"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image src="/about-2.jpg" alt="RinovARCH proje detayı" width={800} height={500} />
            </motion.div>

            <div className="stats">
              {[
                { no: "01", value: "120", suffix: "+", label: "Tamamlanan proje" },
                { no: "02", value: "12", suffix: "+", label: "Yıllık mimari deneyim" },
                { no: "03", value: "98", suffix: "%", label: "Müşteri memnuniyeti", unit: true }
              ].map((s, i) => (
                <motion.div
                  key={s.no}
                  className="stat-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="stat-no">{s.no}</span>
                  <span className="stat-value">
                    {s.value}
                    <span className={s.unit ? "stat-unit" : "stat-plus"}>{s.suffix}</span>
                  </span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
              <motion.div
                className="stat-card stat-card--progress"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.24 }}
              >
                <span className="stat-title">Bu Yıl</span>
                <div className="progress-row">
                  <div className="progress-row-head">
                    <span>Aktif Projeler</span>
                    <span>14</span>
                  </div>
                  <div className="progress-bar">
                    <i style={{ width: "78%" }} />
                  </div>
                </div>
                <div className="progress-row">
                  <div className="progress-row-head">
                    <span>Teslim Oranı</span>
                    <span>92%</span>
                  </div>
                  <div className="progress-bar">
                    <i style={{ width: "92%" }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
