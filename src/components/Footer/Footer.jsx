import { useEffect, useRef } from "react";
import {
  FaFacebook, FaGithub, FaLinkedin,
  FaTelegramPlane, FaWhatsapp,
} from "react-icons/fa";
import "./Footer.scss";

const NAV_LINKS = [
  { label: "Home",       href: "#hero"     },
  { label: "About",      href: "#whoami"   },
  { label: "Journey",    href: "#timeline" },
  { label: "Skills",     href: "#skills"   },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact"  },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/ibrahim-abdulnasser-49762a3a2?", icon: <FaLinkedin size={16} />,      label: "LinkedIn"  },
  { href: "https://github.com/ibrahi4",                                  icon: <FaGithub   size={16} />,      label: "GitHub"    },
  { href: "https://wa.me/201091857418",                                  icon: <FaWhatsapp size={16} />,      label: "WhatsApp"  },
  { href: "https://www.facebook.com/share/16vVqR6FS8/?mibextid=wwXIfr", icon: <FaFacebook size={16} />,      label: "Facebook"  },
  { href: "https://t.me/FrontEndDeveloperc",                             icon: <FaTelegramPlane size={16} />, label: "Telegram"  },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  const canvasRef = useRef(null);

  /* ── subtle particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H, particles;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: 38 }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a:  Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,107,31,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="ft">
      <canvas className="ft-canvas" ref={canvasRef} />

      {/* top gradient separator */}
      <div className="ft-separator" />

      <div className="ft-inner">

        {/* ── BIG NAME ── */}
        <div className="ft-brand">
          <span className="ft-name-outline">IBRAHIM</span>
          <span className="ft-name-solid">ABDULNASSER</span>
        </div>

        {/* ── TAGLINE ── */}
        <p className="ft-tagline">
          Building fast, scalable, and beautiful web experiences.
        </p>

        {/* ── MIDDLE ROW: nav + social ── */}
        <div className="ft-mid">

          <nav className="ft-nav" aria-label="Footer navigation">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="ft-nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ft-social">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank"
                 rel="noreferrer" className="ft-social-btn" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="ft-divider" />

        {/* ── BOTTOM ROW ── */}
        <div className="ft-bottom">
          <p className="ft-copy">
            © {YEAR} Ibrahim Abdulnasser — All rights reserved.
          </p>

          <div className="ft-bottom-right">
            <span className="ft-made-with">
              Crafted with using React
            </span>

            <button className="ft-back-top" onClick={scrollToTop} aria-label="Back to top">
              <span className="ft-back-top-arrow">↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}