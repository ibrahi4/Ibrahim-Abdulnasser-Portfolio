import React, { useEffect, useRef } from "react";
import "./WhoAmi.scss";
import { aboutmeDescription } from "../../constants/aboutmeConstants";

const STATS = [
  { num: "1", label: "Years Experience" },
  { num: "5+", label: "Projects Shipped" },
  { num: "2", label: "Internships"      },
];

const WhoAmI = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".wa-reveal");
    if (!els?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="wa-section" id="aboutMe" ref={sectionRef}>

      {/* eyebrow */}
      <div className="wa-eyebrow">
        <span className="wa-eyebrow-line" />
        <span className="wa-eyebrow-text">01 — About Me</span>
        <span className="wa-eyebrow-line wa-eyebrow-line--right" />
      </div>

      <div className="wa-layout">

        {/* ── LEFT ── */}
        <div className="wa-text">

          <span className="wa-label wa-reveal">Frontend Developer </span>

          <h2 className="wa-name wa-reveal">
            <span className="wa-name-solid">IBRAHIM</span>
            <span className="wa-name-outline">ABDULNASSER</span>
          </h2>

          <div className="wa-divider wa-reveal">
            <span className="wa-div-line" />
            <span className="wa-div-label">The Story</span>
            <span className="wa-div-line" />
          </div>

          <p className="wa-desc wa-reveal">
            {aboutmeDescription}
          </p>

          <div className="wa-stats wa-reveal">
            {STATS.map((s) => (
              <div className="wa-stat" key={s.label}>
                <span className="wa-stat-num">{s.num}</span>
                <span className="wa-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="wa-image-side wa-reveal">
          <div className="wa-frame" />
          <img
            src="/assets/images/common/myPhoto.jpg"
            alt="Ibrahim Abdulnasser"
            className="wa-photo"
            loading="eager"
            decoding="async"
            width="380"
            height="507"
          />
    
        </div>

      </div>
    </section>
  );
};

export default WhoAmI;