// 

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    date: "JUN 2019 – MAY 2022",
    title: "BCS in Science ",
    org: "Minya University, Faculty of Science",
    desc:
      "Graduated with CGPA 3.05 VERY GOOD from the University of Minya",
  },
    {
    date: "DEC 2023 – MAY 2024",
    title: "Task Coordinator ",
    org: "Alryadha Company, Saudi Arabia",
    desc:
      "Led Agile task/sprint tracking; ensured on-time milestone delivery. Facilitated cross-team communication, enhancing project efficiency and collaboration.",
  },
    {
    date: "Jun 2025 – Jul 2025",
    title: "Sprint (NCW) - Internship",
    org: "Front-End Web Development Sprints Participant NCW",
    desc:"Enhanced UI/UX with Tailwind/Material UI; implemented responsive cross-device designs. ",
  },
  
  {
    date: "jul 2025 – dec 2025",
    title: "ITI - Internship",
    org: "Frontend & Cross-Platform Track",
    desc:
      "Completed a comprehensive 6-month internship program focused on frontend and cross-platform development, gaining hands-on experience with modern web technologies and frameworks.",
  },
  
  {
    date: "SEP 2025 – PRESENT",
    title: "Frontend Developer",
    org: "CodeCrafte Company",
    desc:
"Currently working as a Frontend Developer at CodeCrafte Company, where I contribute to building scalable web applications and enhancing user experiences using React and related technologies.",
  },
];

/**
 * @author Ibrahim Abdulnasser
 * @returns Experience component that renders a vertical timeline of professional milestones. Each timeline item animates into view as the user scrolls, with a line that fills up to indicate progress through the timeline. The component uses GSAP for scroll-triggered animations, creating an engaging way to showcase career highlights and achievements.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);

  useGSAP(
    () => {
      const wrap = timelineRef.current;
      const items = gsap.utils.toArray(".tl-item", wrap);

      // Initial states
      items.forEach((item) => {
        const card = item.querySelector(".tl-card");
        const dot = item.querySelector(".tl-dot");

        gsap.set(card, { opacity: 0.18, y: 60, filter: "blur(10px)" });
        gsap.set(dot, { scale: 0.9, opacity: 0.55 });
      });

      // Line fill (grows as you scroll through the timeline)
      gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineFillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Activate item when it hits center-ish
      items.forEach((item) => {
        const card = item.querySelector(".tl-card");
        const dot = item.querySelector(".tl-dot");

        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
              });
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power5.out",
              });
              item.classList.add("is-active");
            } else {
              gsap.to(card, {
                opacity: 0.18,
                y: 60,
                filter: "blur(10px)",
                duration: 0.7,
                ease: "power3.out",
              });
              gsap.to(dot, {
                scale: 0.9,
                opacity: 0.55,
                duration: 0.35,
                ease: "power3.out",
              });
              item.classList.remove("is-active");
            }
          },
        });
      });
      
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section className="journey" ref={sectionRef} id="timeline">
      {/* Hero heading like your video */}
      <div className="journey-hero">
        <p className="journey-kicker">02. JOURNEY</p>
        <h2 className="journey-title">Professional Path</h2>
        <p className="journey-sub">
          A timeline of key milestones—training, internships, and production roles
          focused on scalable web platforms.
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-line">
          <span className="timeline-line-bg" />
          <span className="timeline-line-fill" ref={lineFillRef} />
        </div>

        {TIMELINE.map((t, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div className={`tl-item ${side}`} key={`${t.date}-${i}`}>
              <div className="tl-side tl-left">
                {side === "left" ? (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <div className="tl-org">{t.org}</div>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                ) : null}
              </div>

              <div className="tl-center">
                <span className="tl-dot" aria-hidden="true" />
              </div>

              <div className="tl-side tl-right">
                {side === "right" ? (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <div className="tl-org">{t.org}</div>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
