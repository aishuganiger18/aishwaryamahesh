import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import portraitAsset from "@/assets/aishwarya-portrait.jpg.asset.json";
import portfolioCss from "@/styles/portfolio.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aishwarya Mahesh Teli | Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Aishwarya Mahesh Teli — Computer Science & Design Undergraduate and Full Stack Developer.",
      },
      {
        property: "og:title",
        content: "Aishwarya Mahesh Teli | Portfolio",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Aishwarya Mahesh Teli — Computer Science & Design Undergraduate and Full Stack Developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: portfolioCss },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
    ],
  }),
  component: Portfolio,
});

const NAV_SECTIONS = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#internships", label: "Internships" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
] as const;

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-in");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-page">
      {/* Navigation */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#hero" className="brand-logo">
            AMT<span>.</span>
          </a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
          <nav
            className={`nav-menu ${menuOpen ? "active" : ""}`}
            id="navMenu"
            onClick={() => setMenuOpen(false)}
          >
            {NAV_SECTIONS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <Link to="/bio-studio" className="nav-link">
              Bio Studio
            </Link>
            <a href="#contact" className="nav-link btn-nav">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero / About Section */}
        <section className="section hero-section" id="hero">
          <div className="container hero-container">
            <div className="hero-image-wrapper fade-in">
              <img
                src={portraitAsset.url}
                alt="Aishwarya Mahesh Teli"
                className="hero-portrait"
              />
            </div>
            <div className="hero-content fade-in" id="about">
              <span className="eyebrow">Welcome to my portfolio</span>
              <h1 className="hero-name">Aishwarya Mahesh Teli</h1>
              <p className="hero-tagline">
                Computer Science &amp; Design Undergraduate | Full Stack
                Developer
              </p>
              <p className="hero-bio">
                Motivated Computer Science and Design undergraduate with
                internship experience in full-stack web development and
                application/API testing. Seeking a software internship to apply
                my programming and problem-solving skills, gain industry
                experience, and contribute to real-world projects.
              </p>

              <div className="hero-actions">
                <a href="resume.pdf" download className="btn btn-primary">
                  <i className="fa-solid fa-file-arrow-down"></i> Download
                  Resume
                </a>
                <a href="#contact" className="btn btn-secondary">
                  <i className="fa-solid fa-paper-plane"></i> Contact Me
                </a>
              </div>

              {/* Social Icon Buttons */}
              <div className="social-links">
                <a
                  href="https://github.com/aishuganiger18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/aishwarya-m-teli-78ba31333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="mailto:aishuganiger18@gmail.com"
                  className="social-icon"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section" id="education">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Academic Background</span>
              <h2 className="section-title">Education</h2>
            </div>

            <div className="timeline">
              {/* Item 1 */}
              <div className="timeline-item fade-in">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-period">Sep 2024 – Present</span>
                    <span className="badge badge-accent">
                      CGPA: 9.02 / 10 (Sem 1–4)
                    </span>
                  </div>
                  <h3 className="timeline-degree">
                    B.E. in Computer Science and Design
                  </h3>
                  <p className="timeline-school">
                    Mysore University School of Engineering, Mysuru, Karnataka
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="timeline-item fade-in">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-period">2022 – 2024</span>
                    <span className="badge">90.5%</span>
                  </div>
                  <h3 className="timeline-degree">
                    Pre-University Course (PUC)
                  </h3>
                  <p className="timeline-school">
                    Vidhya Niketan PU College, Hubballi, Karnataka
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="timeline-item fade-in">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-period">2022</span>
                    <span className="badge">96.16%</span>
                  </div>
                  <h3 className="timeline-degree">SSLC (10th Standard)</h3>
                  <p className="timeline-school">
                    SVEM School, Ainapur, Karnataka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internships Section */}
        <section className="section bg-alt" id="internships">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Experience</span>
              <h2 className="section-title">Internships</h2>
            </div>

            <div className="cards-grid">
              {/* Internship 1 */}
              <div className="card fade-in">
                <div className="card-meta">
                  <span className="card-duration">
                    07 Aug 2026 – 26 Aug 2026
                  </span>
                  <span className="badge">Internship</span>
                </div>
                <h3 className="card-title">
                  Full Stack Web Development Intern
                </h3>
                <p className="card-org">Elevance Skills</p>
                <ul className="card-bullets">
                  <li>
                    Completed a full-stack web development internship, gaining
                    exposure to front-end and back-end development concepts.
                  </li>
                  <li>
                    Applied development fundamentals through practical tasks and
                    strengthened understanding of end-to-end web application
                    development.
                  </li>
                </ul>
                <div className="card-footer">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fa-solid fa-award"></i> View Certificate
                  </a>
                </div>
              </div>

              {/* Internship 2 */}
              <div className="card fade-in">
                <div className="card-meta">
                  <span className="card-duration">
                    3 days, completed 09 May 2026
                  </span>
                  <span className="badge">Testing Intern</span>
                </div>
                <h3 className="card-title">
                  Application and API Testing Intern
                </h3>
                <p className="card-org">IVIS Labs</p>
                <ul className="card-bullets">
                  <li>
                    Learned application and API testing fundamentals and gained
                    exposure to software testing workflows.
                  </li>
                  <li>
                    Strengthened understanding of validating application and API
                    functionality and reliability.
                  </li>
                </ul>
                <div className="card-footer">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fa-solid fa-award"></i> View Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Featured Work</span>
              <h2 className="section-title">Projects</h2>
            </div>

            <div className="cards-grid">
              {/* Project 1 */}
              <div className="card fade-in">
                <div className="card-icon">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <h3 className="card-title">LearnHub — Video Learning Platform</h3>
                <p className="card-desc">
                  Video learning platform with subscription plans, download
                  limits, download tracking, and remaining-quota display.
                </p>
                <div className="project-links">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="card fade-in">
                <div className="card-icon">
                  <i className="fa-solid fa-video"></i>
                </div>
                <h3 className="card-title">Video Conference Web Application</h3>
                <p className="card-desc">
                  Real-time video conferencing web application.
                </p>
                <div className="project-links">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Languages Section */}
        <section className="section bg-alt" id="skills">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Competencies</span>
              <h2 className="section-title">Technical Skills &amp; Languages</h2>
            </div>

            <div className="skills-grid">
              <div className="skill-group-card fade-in">
                <h3 className="skill-group-title">
                  <i className="fa-solid fa-code"></i> Programming
                </h3>
                <div className="badges-wrapper">
                  <span className="skill-badge">C</span>
                  <span className="skill-badge">C++</span>
                </div>
              </div>

              <div className="skill-group-card fade-in">
                <h3 className="skill-group-title">
                  <i className="fa-solid fa-diagram-project"></i> Core Concepts
                </h3>
                <div className="badges-wrapper">
                  <span className="skill-badge">
                    Data Structures and Algorithms
                  </span>
                </div>
              </div>

              <div className="skill-group-card fade-in">
                <h3 className="skill-group-title">
                  <i className="fa-solid fa-layer-group"></i> Web Development
                </h3>
                <div className="badges-wrapper">
                  <span className="skill-badge">Full-Stack Web Development</span>
                </div>
              </div>

              <div className="skill-group-card fade-in">
                <h3 className="skill-group-title">
                  <i className="fa-solid fa-vial-circle-check"></i> Testing
                </h3>
                <div className="badges-wrapper">
                  <span className="skill-badge">
                    Application and API Testing
                  </span>
                </div>
              </div>

              <div className="skill-group-card fade-in">
                <h3 className="skill-group-title">
                  <i className="fa-solid fa-language"></i> Languages
                </h3>
                <div className="badges-wrapper">
                  <span className="skill-badge">English</span>
                  <span className="skill-badge">Hindi</span>
                  <span className="skill-badge">Kannada</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Achievements Section */}
        <section className="section" id="certifications">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Recognition</span>
              <h2 className="section-title">Certifications &amp; Achievements</h2>
            </div>

            <div className="certifications-list">
              {/* Cert 1 */}
              <div className="cert-card fade-in">
                <div className="cert-info">
                  <i className="fa-solid fa-certificate cert-icon"></i>
                  <div>
                    <h4 className="cert-name">
                      Full Stack Web Development Internship
                    </h4>
                    <p className="cert-issuer">Elevance Skills</p>
                  </div>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="cert-card fade-in">
                <div className="cert-info">
                  <i className="fa-solid fa-certificate cert-icon"></i>
                  <div>
                    <h4 className="cert-name">
                      Application and API Testing Internship
                    </h4>
                    <p className="cert-issuer">IVIS Labs</p>
                  </div>
                </div>
              </div>

              {/* Cert 3 */}
              <div className="cert-card fade-in">
                <div className="cert-info">
                  <i className="fa-solid fa-wrench cert-icon"></i>
                  <div>
                    <h4 className="cert-name">Software Testing Workshop</h4>
                    <p className="cert-issuer">NAMMA (2026)</p>
                  </div>
                </div>
              </div>

              {/* Cert 4 */}
              <div className="cert-card fade-in">
                <div className="cert-info">
                  <i className="fa-solid fa-trophy cert-icon"></i>
                  <div>
                    <h4 className="cert-name">
                      Participated in CODEWARZ '26 Hackathon
                    </h4>
                    <p className="cert-issuer">
                      Organized by Dept. of ECE with IEEE and IIC, BGS Institute
                      of Technology, Adichunchanagiri University (07 April 2026)
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <i className="fa-solid fa-award"></i> View Certificate
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section bg-alt" id="contact">
          <div className="container">
            <div className="contact-box fade-in">
              <span className="section-tag">Get in Touch</span>
              <h2 className="section-title">Let's connect</h2>
              <p className="contact-subtext">
                Open to software internship opportunities.
              </p>

              <div className="contact-links">
                <a
                  href="https://github.com/aishuganiger18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/aishwarya-m-teli-78ba31333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                </a>
                <a
                  href="mailto:aishuganiger18@gmail.com"
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-envelope"></i> Email Me
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p className="footer-copy">
            &copy; 2026 Aishwarya Mahesh Teli. All rights reserved.
          </p>
          <div className="social-links footer-socials">
            <a
              href="https://github.com/aishuganiger18"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/aishwarya-m-teli-78ba31333"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="mailto:aishuganiger18@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
