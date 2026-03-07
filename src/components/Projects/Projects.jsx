import React, { useEffect, useRef, useCallback } from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "Farm Vet E-Shop",
    desc: "Full-stack e-commerce for veterinary and farm supplies with Firebase backend and AI-powered product recommendations.",
    image: "/assets/images/common/proj1.png",
    tags: ["React JS", "Firebase", "Tailwind CSS", "AI Analytics"],
    links: [
      { label: "Live Demo",   href: "https://farm-vet-e-shop-1.vercel.app" },
      { label: "Source Code", href: "https://github.com/ibrahi4/Farm-Vet-E-Shop-1" },
    ],
  },
  {
    title: "DRIVER APP (QTX) Dashboard",
    desc: "Fleet management dashboard with real-time tracking, route optimization and AI-powered insights on the MERN stack.",
    image: "/assets/images/common/QTX.png",
    tags: ["React JS", "Node JS", "Express JS", "MongoDB"],
    links: [
      { label: "Live Demo",   href: "https://drive.google.com/file/d/1kZ6tJ4QyPx-Asf6haKUU4GZG7eGhdN7E/view" },
      { label: "Source Code", href: "https://github.com/ibrahi4/QTX-DASHBOARD" },
    ],
  },
  {
    title: "TOTC — E-Learning Platform",
    desc: "Responsive E-learning platform with course management, user auth and an AI-powered chatbot for personalized support.",
    image: "/assets/images/common/proj2.png",
    tags: ["React JS", "Firebase", "Tailwind CSS", "AI Chatbot"],
    links: [
      { label: "Live Demo",   href: "https://totc-l8do.vercel.app/" },
      { label: "Source Code", href: "https://github.com/ibrahi4/TOTC" },
    ],
  },
  {
    title: "Tinyales Clothes Store",
    desc: "Modern e-commerce with Next.js featuring user auth, product management and an AI recommendation engine.",
    image: "/assets/images/common/tintyles.png",
    tags: ["Next JS", "Node JS", "Express JS", "MongoDB"],
    links: [
      { label: "Live Demo",   href: "https://tinytales-snowy.vercel.app" },
      { label: "Source Code", href: "https://github.com/ibrahi4/Tinytales" },
    ],
  },
  {
    title: "Furniture E-Commerce App",
    desc: "Cross-platform mobile shopping app with product browsing, user auth and AI-powered furniture recommendations.",
    image: "/assets/images/common/furnitureapp.png",
    tags: ["React Native", "Expo", "Redux", "Firebase"],
    links: [
      { label: "Live Demo",   href: "https://drive.google.com/file/d/1PmJQgmrl1a_ppI10fgN7OIGoB-8J0V63/view" },
      { label: "Source Code", href: "https://github.com/jovywahba/react-native-G" },
    ],
  },
];

export default function Projects() {
  const cardsRef = useRef([]);

  /* ✅ preload all images on mount — يتحملوا قبل ما المستخدم يوصل */
  useEffect(() => {
    PROJECTS.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  /* ✅ Intersection Observer — reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    cardsRef.current.forEach((card) => card && io.observe(card));
    return () => io.disconnect();
  }, []);

  const setCardRef = useCallback((el, i) => {
    cardsRef.current[i] = el;
  }, []);

  return (
    <section className="projects" id="projects">

      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS</h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend craft and cloud-first architecture.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="projectCard"
            ref={(el) => setCardRef(el, i)}
            style={{ "--i": i }}
          >
            <div className="projectMedia">
              <img
                src={p.image}
                alt={p.title}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                width="640"
                height="360"
              />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`projectBtn ${l.label === "Live Demo" ? "btnPrimary" : "btnSecondary"}`}
                  >
                    <span className="btnIcon">{l.label === "Live Demo" ? "⚡" : "⌥"}</span>
                    <span className="btnText">{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}