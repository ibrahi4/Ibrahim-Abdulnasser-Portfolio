import { useEffect, useRef } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { RiMessage2Line } from "react-icons/ri";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";

// CSS File
import "./Contact.scss";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    Aos.refresh();
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <h4 className="contact-title" data-aos="fade-down">
            DO YOU HAVE A PROJECT TO
            <br />
            DISCUSS?
          </h4>

          <div className="contact-subtitle" data-aos="fade-down">
            <span>Get In Touch</span>
            <RiMessage2Line />
          </div>

          <div className="contact-info-wrapper">
            <div className="contact-info" data-aos="fade-down">
              <span>Contact</span>
              <h2>Ibrahim Abdulnasser</h2>
            </div>

            <div className="contact-social" data-aos="fade-down">
              <span>Social Media</span>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ibrahim-abdulnasser-49762a3a2?"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://wa.me/201091857418"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="https://www.facebook.com/share/16vVqR6FS8/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://t.me/FrontEndDeveloperc"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTelegramPlane size={20} />
                </a>
                <a
                  href="https://github.com/ibrahi4"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Complete Your Name")
              .required("Name Is Required"),
            email: Yup.string()
              .min(8, "Complete Your Email")
              .email("Invalid Email")
              .required("Email Is Required"),
            message: Yup.string()
              .min(2, "Complete Your Message")
              .required("Message Is Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            emailjs
              .sendForm("service_q3xqogq", "template_4n2bb4v", form.current, {
                publicKey: "IB0QNkQKmtbr5knUe",
              })
              .then(() => {
                Swal.fire({
                  title: "Message sent successfully",
                  icon: "success",
                });
                resetForm();
              })
              .catch((error) => {
                Swal.fire({
                  title: "Message failed to send " + error.text,
                  icon: "error",
                });
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form ref={form} className="contact-form">
              <span className="form-title" data-aos="fade-down">
                Contact Form
              </span>

              <label htmlFor="Name" data-aos="fade-down">
                Name
              </label>
              <Field
                id="Name"
                type="text"
                name="name"
                placeholder="Your Name"
                className="input-field"
                data-aos="fade-down"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-text"
              />

              <label htmlFor="Email" data-aos="fade-down">
                Email
              </label>
              <Field
                id="Email"
                type="text"
                name="email"
                placeholder="Your Email"
                className="input-field"
                data-aos="fade-down"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-text"
              />

              <label htmlFor="Message" data-aos="fade-down">
                Message
              </label>
              <Field
                as="textarea"
                id="Message"
                name="message"
                placeholder="Your Message"
                className="input-field textarea"
                data-aos="fade-down"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="error-text"
              />

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                data-aos="fade-down"
              >
                {isSubmitting ? "Sending ..." : "Send"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Contact;