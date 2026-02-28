import React, { useEffect, useRef } from "react";
import "./Experience.scss";

const TIMELINE = [
  {
    date: "JUN 2019 – MAY 2022",
    title: "BCS in Science",
    org: "Minya University, Faculty of Science",
    desc: "Graduated with CGPA 3.05 VERY GOOD from the University of Minya.",
  },
  {
    date: "DEC 2023 – MAY 2024",
    title: "Task Coordinator",
    org: "Alryadha Company, Saudi Arabia",
    desc: "Led Agile task/sprint tracking; ensured on-time milestone delivery. Facilitated cross-team communication, enhancing project efficiency and collaboration.",
  },
  {
    date: "JUN 2025 – JUL 2025",
    title: "Sprint (NCW) — Internship",
    org: "Front-End Web Development Sprints NCW",
    desc: "Enhanced UI/UX with Tailwind / Material UI; implemented responsive cross-device designs.",
  },
  {
    date: "JUL 2025 – DEC 2025",
    title: "ITI — Internship",
    org: "Frontend & Cross-Platform Track",
    desc: "Completed a comprehensive 6-month internship focused on frontend and cross-platform development with modern web technologies.",
  },
  {
    date: "SEP 2025 – PRESENT",
    title: "Frontend Developer",
    org: "CodeCrafte Company",
    desc: "Building scalable web applications and enhancing user experiences using React and related technologies.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);

  /* scroll-driven line fill — pure JS, no GSAP */
  useEffect(() => {
    const section = sectionRef.current;
    const line    = lineRef.current;
    if (!section || !line) return;

    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0,
        (vh * 0.6 - top) / (height - vh * 0.4)
      ));
      line.style.transform = `scaleY(${progress})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* card + dot reveal via Intersection Observer */
  useEffect(() => {
    const els = document.querySelectorAll(".tl-card, .tl-dot");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("is-visible", e.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="journey" ref={sectionRef} id="timeline">

      <div className="journey-hero">
        <p className="journey-kicker">02. JOURNEY</p>
        <h2 className="journey-title">Professional Path</h2>
        <p className="journey-sub">
          A timeline of key milestones — training, internships, and production
          roles focused on scalable web platforms.
        </p>
      </div>

      <div className="timeline">
        <div className="timeline-line">
          <span className="timeline-line-bg" />
          <span className="timeline-line-fill" ref={lineRef} />
        </div>

        {TIMELINE.map((t, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div className={`tl-item ${side}`} key={i}>

              <div className="tl-side tl-left">
                {side === "left" && (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <p className="tl-org">{t.org}</p>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                )}
              </div>

              <div className="tl-center">
                <span className="tl-dot" />
              </div>

              <div className="tl-side tl-right">
                {side === "right" && (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <p className="tl-org">{t.org}</p>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}