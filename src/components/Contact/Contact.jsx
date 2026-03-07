import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FaFacebook, FaGithub, FaLinkedin,
  FaTelegramPlane, FaWhatsapp,
} from "react-icons/fa";
import "./Contact.scss";

const PROJECT_TYPES = ["Web App", "Mobile App", "Dashboard", "E-Commerce", "Other"];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/ibrahim-abdulnasser-49762a3a2?", icon: <FaLinkedin size={22} />,     label: "LinkedIn"  },
  { href: "https://github.com/ibrahi4",                                  icon: <FaGithub   size={22} />,     label: "GitHub"    },
  { href: "https://wa.me/201091857418",                                  icon: <FaWhatsapp size={22} />,     label: "WhatsApp"  },
  { href: "https://www.facebook.com/share/16vVqR6FS8/?mibextid=wwXIfr", icon: <FaFacebook size={22} />,     label: "Facebook"  },
  { href: "https://t.me/FrontEndDeveloperc",                             icon: <FaTelegramPlane size={22} />, label: "Telegram" },
];

export default function Contact() {
  const [projectType, setProjectType] = useState("Web App");

  return (
    <section id="contact" className="ct-section">

      {/* ambient glows */}
      <div className="ct-glow ct-glow-1" />
      <div className="ct-glow ct-glow-2" />
      <div className="ct-glow ct-glow-3" />

      <div className="ct-inner">

        {/* eyebrow */}
        <div className="ct-eyebrow">
          <span className="ct-eyebrow-line" />
          <span className="ct-eyebrow-text">05 — Contact</span>
          <span className="ct-eyebrow-line" />
        </div>

        {/* hero title */}
        <div className="ct-hero">
          <h2 className="ct-big-title">
            <span className="ct-outline">LET'S</span>
            <span className="ct-solid">WORK</span>
            <span className="ct-gradient">TOGETHER</span>
          </h2>
          <p className="ct-tagline">
            Have a project in mind? I'd love to hear about it.
            Send me a message and let's create something exceptional.
          </p>
        </div>

        {/* grid */}
        <div className="ct-grid">

          {/* ── LEFT ── */}
          <div className="ct-left">

            <div className="ct-badge">
              <span className="ct-badge-dot" />
              <span className="ct-badge-text">Available for freelance work</span>
            </div>

            <div className="ct-info-card">
              <p className="ct-info-name">Ibrahim Abdulnasser</p>
              <p className="ct-info-role">Frontend Developer</p>
              <div className="ct-info-divider" />
       {[
  { 
    icon: "/assets/images/tech-icons/location-pin-svgrepo-com.svg",
    label: "Location",
    value: "Cairo, Egypt"
  },
  { 
    icon: "/assets/images/tech-icons/phone-call-24-hours-svgrepo-com.svg",
    label: "Response time",
    value: "Within 24 hours +201091857418"
  },
  { 
    icon: "/assets/images/tech-icons/coding-html-svgrepo-com.svg",
    label: "Speciality",
    value: "React & Next.js and React Native"
  },
].map((item) => (
  <div className="ct-info-row" key={item.label}>
    
    <div className="ct-info-icon">
      <img 
        src={item.icon} 
        alt={item.label} 
        className="ct-info-icon-img"
      />
    </div>

    <div className="ct-info-detail">
      <span className="ct-info-label">{item.label}</span>
      <span className="ct-info-value">{item.value}</span>
    </div>

  </div>
))}
            </div>

            <div className="ct-social-card">
              <p className="ct-social-label">Find me on</p>
              <div className="ct-social-row">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank"
                     rel="noreferrer" className="ct-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT — FORM ── */}
          <div className="ct-form-card">
            <h3 className="ct-form-heading">Send a Message</h3>
            <p className="ct-form-sub">
              Fill in the form and I'll get back to you as soon as possible.
            </p>

            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={Yup.object({
                name:    Yup.string().min(3, "Complete your name").required("Name is required"),
                email:   Yup.string().email("Invalid email").required("Email is required"),
                message: Yup.string().min(10, "Message too short").required("Message is required"),
              })}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                emailjs.send(
                  "service_q3xqogq",
                  "template_4n2bb4v",
                  { from_name: values.name, from_email: values.email, message: values.message },
                  "IB0QNkQKmtbr5knUe"
                )
                .then(() => {
                  Swal.fire({ title: "Message sent successfully!", icon: "success" });
                  resetForm();
                })
                .catch((err) => {
                  Swal.fire({ title: "Failed to send: " + err.text, icon: "error" });
                })
                .finally(() => setSubmitting(false));
              }}
            >
              {({ isSubmitting }) => (
                <Form className="ct-form">

                  <div className="ct-form-row">
                    <div className="ct-field-group">
                      <label htmlFor="ct-name">Name</label>
                      <Field id="ct-name" name="name" type="text"
                        placeholder="Your full name" className="ct-input" />
                      <ErrorMessage name="name" component="p" className="ct-error" />
                    </div>
                    <div className="ct-field-group">
                      <label htmlFor="ct-email">Email</label>
                      <Field id="ct-email" name="email" type="email"
                        placeholder="your@email.com" className="ct-input" />
                      <ErrorMessage name="email" component="p" className="ct-error" />
                    </div>
                  </div>

                  <div className="ct-chips-group">
                    <p className="ct-chips-label">Project type</p>
                    <div className="ct-chips">
                      {PROJECT_TYPES.map((t) => (
                        <button key={t} type="button"
                          className={`ct-chip ${projectType === t ? "is-active" : ""}`}
                          onClick={() => setProjectType(t)}
                        >{t}</button>
                      ))}
                    </div>
                  </div>

                  <div className="ct-field-group">
                    <label htmlFor="ct-message">Message</label>
                    <Field as="textarea" id="ct-message" name="message"
                      placeholder="Tell me about your project, goals, timeline..."
                      className="ct-input ct-textarea" />
                    <ErrorMessage name="message" component="p" className="ct-error" />
                  </div>

                  <div className="ct-submit-row">
                    <div className="ct-submit-note">
                      <span className="ct-note-dot" />
                      <span>Usually responds within 24h</span>
                    </div>
                    <button type="submit" className="ct-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <span className="ct-btn-arrow"></span>}
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>
    </section>
  );
}