"use client";

export default function Globe() {
  return (
    <section id="globe" className="globe-section">
      {/* Background video */}
      <video
        className="globe-video"
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        aria-hidden
      />
      <div className="globe-dim" />
      <div className="globe-grain" />

      {/* Content overlay */}
      <div className="globe-overlay">
        <span className="spline-eyebrow">
          <span className="features-eyebrow-line" />
          İLHAM
        </span>
        <blockquote className="spline-quote">
          <span className="spline-quote-mark">&ldquo;</span>
          Tarihteki en büyük şaheserler,
          <br />
          büyük hayaller kuranlarla,
          <br />
          o hayalleri anlayan ustaların
          <br />
          ortaklığıyla doğmuştur.
          <footer className="spline-quote-author">— Mimar Sinan</footer>
        </blockquote>
      </div>

      {/* Phone CTA */}
      <a href="tel:+905353353208" className="spline-phone" aria-label="Bizi arayın">
        <span className="spline-phone-pulse" />
        <svg
          className="spline-phone-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
        </svg>
        <span className="spline-phone-text">
          <small>Hemen Ara</small>
          <strong>0535 335 32 08</strong>
        </span>
      </a>
    </section>
  );
}
