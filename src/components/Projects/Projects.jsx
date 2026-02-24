import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
  title: "Farm Vet E-Shop",
  desc: "Farm-Vet E-Shop is a full-stack e-commerce platform designed for the veterinary and farm supplies industry, providing a secure, scalable, and intelligent shopping experience,The platform combines modern frontend architecture, Firebase backend services, and AI-powered features for data analysis and product recommendations.",
  image: "/assets/images/common/proj1.png",
  tags: ["React JS", "Firebase", "Tailwind CSS", "AI Analytics"],
  links: [
    { label: "Live Demo", href: "https://farm-vet-e-shop-1.vercel.app", icon: "↗" },
    { label: "Source Code", href: "https://github.com/ibrahi4/Farm-Vet-E-Shop-1", icon: "⌂" },
  ]
},
  {
  title: "DRIVER APP (QTX) Dashboard",
  desc: "QTX DRIVER Dashboard is a comprehensive fleet management solution designed to optimize operations for transportation companies. Built with React JS, Node.js, Express, MongoDB, and Tailwind CSS, the dashboard provides real-time tracking, route optimization, and AI-powered insights to enhance efficiency and reduce costs. The platform is scalable and secure, making it ideal for businesses of all sizes in the transportation industry.",
  image: "/assets/images/common/QTX.png",
  tags: ["React JS", "Node js","Express js", "MongoDB", "Tailwind CSS", "AI Analytics"],
  links: [
    { label: "Live Demo", href: " https://drive.google.com/file/d/1kZ6tJ4QyPx-Asf6haKUU4GZG7eGhdN7E/view", icon: "↗" },
    { label: "Source Code", href: "https://github.com/ibrahi4/QTX-DASHBOARD", icon: "⌂" },
  ]
},
    {
  title: "TOTC - E-Learning Platform",
  desc: "TOTC is a fully responsive E-learning platform built with React JS, Firebase, and Tailwind CSS. It offers a seamless learning experience with features like user authentication, course management, and an AI-powered chatbot for personalized support. The platform is designed to be scalable and secure, making it ideal for educational institutions and online learners.",
  image: "/assets/images/common/proj2.png",
  tags: ["React JS", "Firebase", "Tailwind CSS", "AI chatbot"],
  links: [
    { label: "Live Demo", href: "https://totc-l8do.vercel.app/", icon: "↗" },
    { label: "Source Code", href: "https://github.com/ibrahi4/TOTC", icon: "⌂" },
  ]
},
    {
  title: "Tinyales CLOTHSE STORE",
  desc: "TinyTales is a modern e-commerce platform built with Next.js, Node.js, Express, and Tailwind CSS. It offers a seamless shopping experience with features like user authentication, product management, and an AI-powered recommendation engine. The platform is designed to be scalable and secure, making it ideal for online retailers looking to enhance customer engagement and drive sales.",
  image: "/assets/images/common/tintyles.png",
  tags: ["Next JS", "Node JS ", "Express Js","MongoDB", "Tailwind CSS"],
  links: [
    { label: "Live Demo", href: "https://tinytales-snowy.vercel.app", icon: "↗" },
    { label: "Source Code", href: "https://github.com/ibrahi4/Tinytales", icon: "⌂" },
  ]
},    
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* Header like your Certifications screenshot */}
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS </h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and cloud-first architecture.
        </p>
      </div>

      {/* Cards like your first screenshot */}
      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
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
