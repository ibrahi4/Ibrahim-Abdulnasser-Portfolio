import React, { useEffect, useRef, useCallback, useState } from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "Farm Vet E-Shop",
    desc: "Farm-Vet E-Shop is a full-stack e-commerce platform designed for the veterinary and farm supplies industry.",
    image: "/assets/images/common/proj1.png",
    tags: ["React JS", "Firebase", "Tailwind CSS", "AI Analytics"],
    links: [
      { label: "Live Demo",    href: "https://farm-vet-e-shop-1.vercel.app" },
      { label: "Source Code",  href: "https://github.com/ibrahi4/Farm-Vet-E-Shop-1" },
    ],
  },
  {
    title: "DRIVER APP (QTX) Dashboard",
    desc: "QTX DRIVER Dashboard is a comprehensive fleet management solution designed to optimize operations for transportation companies.",
    image: "/assets/images/common/QTX.png",
    tags: ["React JS", "Node JS", "Express JS", "MongoDB"],
    links: [
      { label: "Live Demo",   href: "https://drive.google.com/file/d/1kZ6tJ4QyPx-Asf6haKUU4GZG7eGhdN7E/view" },
      { label: "Source Code", href: "https://github.com/ibrahi4/QTX-DASHBOARD" },
    ],
  },
  {
    title: "TOTC - E-Learning Platform",
    desc: "TOTC is a fully responsive E-learning platform built with React JS, Firebase, and Tailwind CSS.",
    image: "/assets/images/common/proj2.png",
    tags: ["React JS", "Firebase", "Tailwind CSS", "AI Chatbot"],
    links: [
      { label: "Live Demo",   href: "https://totc-l8do.vercel.app/" },
      { label: "Source Code", href: "https://github.com/ibrahi4/TOTC" },
    ],
  },
  {
    title: "Tinyales Clothes Store",
    desc: "TinyTales is a modern e-commerce platform built with Next.js, Node.js, Express, and Tailwind CSS.",
    image: "/assets/images/common/tintyles.png",
    tags: ["Next JS", "Node JS", "Express JS", "MongoDB"],
    links: [
      { label: "Live Demo",   href: "https://tinytales-snowy.vercel.app" },
      { label: "Source Code", href: "https://github.com/ibrahi4/Tinytales" },
    ],
  },
  {
    title: "Furniture E-Commerce App",
    desc: "Furniture E-Commerce App is a mobile application built with React Native, Expo, Redux, and Firebase.",
    image: "/assets/images/common/furnitureapp.png",
    tags: ["React Native", "Expo", "Redux", "Firebase"],
    links: [
      { label: "Live Demo",   href: "https://drive.google.com/file/d/1PmJQgmrl1a_ppI10fgN7OIGoB-8J0V63/view" },
      { label: "Source Code", href: "https://github.com/jovywahba/react-native-G" },
    ],
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef(null);
  const cardsRef = useRef([]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Simplified Observer for Mobile ── */
  useEffect(() => {
    const options = {
      threshold: isMobile ? 0.05 : 0.08,
      rootMargin: isMobile ? "200px 0px" : "100px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, options);

    cardsRef.current.forEach((card) => {
      if (card) observerRef.current?.observe(card);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isMobile]);

  const setCardRef = useCallback((el, index) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  }, []);

  return (
    <section className="projects" id="projects">

      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS</h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and cloud-first architecture.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p, i) => (
          <article
            className="projectCard"
            key={p.title}
            ref={(el) => setCardRef(el, i)}
            style={{ "--card-index": i }}
          >
            <div className="projectMedia">
              <img 
                src={p.image} 
                alt={p.title} 
                loading="lazy"
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
                    className={`projectBtn ${l.label === "Live Demo" ? "btnPrimary" : "btnSecondary"}`}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="btnIcon">
                      {l.label === "Live Demo" ? "⚡" : "⌥"}
                    </span>
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