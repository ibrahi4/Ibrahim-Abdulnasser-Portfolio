import React, { useState, useRef, useEffect, useCallback } from "react";
import "./TechStack.scss";

/* ── Icons ── */
const reactIcon         = "/assets/images/tech-icons/reactjsIcon.svg";
const htmlIcon          = "/assets/images/tech-icons/htmlIcon.svg";
const cssIcon           = "/assets/images/tech-icons/cssIcon.svg";
const jsIcon            = "/assets/images/tech-icons/javascriptIcon.svg";
const tsIcon            = "/assets/images/tech-icons/typescriptIcon.svg";
const jqueryIcon        = "/assets/images/tech-icons/jqueryIcon.svg";
const tailwindIcon      = "/assets/images/tech-icons/tailwindIcon.svg";
const nodejsIcon        = "/assets/images/tech-icons/nodejsicon.svg";
const sassIcon          = "/assets/images/tech-icons/sassIcon.svg";
const apiIcon           = "/assets/images/tech-icons/apiIcon.svg";
const postgresIcon      = "/assets/images/tech-icons/postgresIcon.svg";
const mongoIcon         = "/assets/images/tech-icons/mongoIcon.svg";
const mysqlIcon         = "/assets/images/tech-icons/mysqlIcon.svg";
const dockerIcon        = "/assets/images/tech-icons/dockerIcon.svg";
const githubActionsIcon = "/assets/images/tech-icons/githubActionsIcon.svg";
const ciCdIcon          = "/assets/images/tech-icons/ciCdIcon.svg";
const msOfficeIcon      = "/assets/images/tech-icons/msOfficeIcon.svg";
const jiraIcon          = "/assets/images/tech-icons/jiraIcon.svg";
const nextjsIcon        = "/assets/images/tech-icons/nextjsIcon.svg";

/* ── Data ── */
const SECTIONS = [
  { id: "all", label: "All", emoji: "✦" },
  {
    id: "frontend", label: "Frontend", emoji: "⬡",
    techs: [
      { name: "React.js",   icon: reactIcon   },
      { name: "Next.js",    icon: nextjsIcon   },
      { name: "HTML",       icon: htmlIcon     },
      { name: "CSS",        icon: cssIcon      },
      { name: "JavaScript", icon: jsIcon       },
      { name: "TypeScript", icon: tsIcon       },
      { name: "jQuery",     icon: jqueryIcon   },
      { name: "Tailwind",   icon: tailwindIcon },
      { name: "Node.js",    icon: nodejsIcon   },
      { name: "SASS",       icon: sassIcon     },
      { name: "REST APIs",  icon: apiIcon      },
    ],
  },
  {
    id: "database", label: "Database", emoji: "◈",
    techs: [
      { name: "PostgreSQL", icon: postgresIcon },
      { name: "MongoDB",    icon: mongoIcon    },
      { name: "MySQL",      icon: mysqlIcon    },
    ],
  },
  {
    id: "devops", label: "DevOps", emoji: "⬢",
    techs: [
      { name: "Docker",         icon: dockerIcon         },
      { name: "GitHub Actions", icon: githubActionsIcon  },
      { name: "CI/CD",          icon: ciCdIcon           },
    ],
  },
  {
    id: "tools", label: "Tools", emoji: "◎",
    techs: [
      { name: "MS Office", icon: msOfficeIcon },
      { name: "JIRA",      icon: jiraIcon     },
    ],
  },
];

const ALL_TECHS = SECTIONS
  .filter(s => s.id !== "all")
  .flatMap(s => s.techs.map(t => ({ ...t, domain: s.label })));

/* ─────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────── */
function TechCard({ tech, domain, index }) {
  const [hovered, setHovered]   = useState(false);
  const cardRef                  = useRef(null);
  const rafRef                   = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);   // -1 → 1
      const dy     = (e.clientY - cy) / (rect.height / 2);   // -1 → 1

      const ry     =  dx * 14;   // rotate Y (left-right)
      const rx     = -dy * 10;   // rotate X (up-down)

      // specular highlight position (%)
      const mx = ((e.clientX - rect.left) / rect.width)  * 100;
      const my = ((e.clientY - rect.top)  / rect.height) * 100;

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
      card.classList.remove("is-idle");
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.classList.add("is-idle");
    setHovered(false);
    setTimeout(() => card?.classList.remove("is-idle"), 600);
  }, []);

  return (
    <div
      ref={cardRef}
      className="ts-card"
      style={{ "--i": index }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <div className="ts-card-inner">
        <img
          src={tech.icon}
          alt={tech.name}
          className="ts-icon"
          loading="lazy"
          onError={e => { e.target.style.display = "none"; }}
        />
        <span className="ts-name">{tech.name}</span>
      </div>

      {hovered && (
        <div className="ts-tooltip">
          <span className="ts-tooltip-domain">{domain || tech.domain}</span>
          <span className="ts-tooltip-name">{tech.name}</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function TechStack() {
  const [active,    setActive]    = useState("all");
  const [animating, setAnimating] = useState(false);
  const indicatorRef = useRef(null);
  const tabsRef      = useRef([]);

  /* move sliding pill indicator */
  useEffect(() => {
    const idx  = SECTIONS.findIndex(s => s.id === active);
    const tab  = tabsRef.current[idx];
    const pill = indicatorRef.current;
    if (!tab || !pill) return;
    pill.style.width = `${tab.offsetWidth}px`;
    pill.style.left  = `${tab.offsetLeft}px`;
  }, [active]);

  const handleTab = (id) => {
    if (id === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(id);
      setAnimating(false);
    }, 200);
  };

  const currentSection = SECTIONS.find(s => s.id === active);
  const displayTechs   = active === "all" ? ALL_TECHS : currentSection.techs;
  const currentDomain  = active === "all" ? null : currentSection.label;

  return (
    <section className="ts-section" id="skills">

      {/* Header */}
      <div className="ts-header">
        <p className="ts-kicker">03. TECH STACK</p>
        <h2 className="ts-title">TECHNICAL EXPERTISE</h2>
        <p className="ts-sub">
          A curated set of technologies I use to ship fast, scalable products —
          clean UI, solid backend, reliable cloud, and automation.
        </p>
      </div>

      {/* Tabs */}
      <div className="ts-tabs-wrapper">
        <div className="ts-tabs" role="tablist">
          <div className="ts-tab-indicator" ref={indicatorRef} />
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              ref={el => (tabsRef.current[i] = el)}
              role="tab"
              aria-selected={active === s.id}
              className={`ts-tab ${active === s.id ? "is-active" : ""}`}
              onClick={() => handleTab(s.id)}
            >
              <span className="ts-tab-emoji">{s.emoji}</span>
              <span className="ts-tab-label">{s.label}</span>
              {s.techs && (
                <span className="ts-tab-count">{s.techs.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={`ts-grid ${animating ? "is-exiting" : "is-entering"}`}>
        {displayTechs.map((tech, i) => (
          <TechCard
            key={`${tech.name}-${active}-${i}`}
            tech={tech}
            domain={currentDomain}
            index={i}
          />
        ))}
      </div>

    </section>
  );
}