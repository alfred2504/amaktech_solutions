import Link from "next/link";

export const dynamic = "force-dynamic";

import {
  SiCss,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextra,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from "react-icons/si";
import ServiceShowcase from "@/components/ServiceShowcase";
import FeaturedWork from "@/components/FeaturedWork";
import AIIntro from "@/components/AIIntro";
import Testimonials from "@/components/Testimonials";
import { EnquiryForm } from "@/components/EnquiryForm";

const technologies = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vite", icon: SiVite },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Django", icon: SiDjango },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Firebase", icon: SiFirebase },
  { name: "Prisma", icon: SiPrisma },
  { name: "JWT", icon: SiJsonwebtokens },
  { name: "NextAuth", icon: SiNextra },
  { name: "Zod", icon: SiZod },
  { name: "Vercel", icon: SiVercel },
  { name: "GitHub", icon: SiGithub },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">AMAKTECH SOLUTIONS</span>

            <h1>
              Transforming Ideas into{" "}
              <span className="accent">Digital Solutions.</span>
            </h1>

            <p>
              We provide professional graphic design, digital branding,
              website development, software engineering, and technology
              solutions that help businesses and individuals grow.
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Get Started
              </Link>

              <Link href="/projects" className="btn btn-secondary">
                View Our Work
              </Link>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>Creative</strong>
                <span>Design Solutions</span>
              </div>

              <div>
                <strong>Digital</strong>
                <span>Technology Solutions</span>
              </div>

              <div>
                <strong>Professional</strong>
                <span>Results</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="/images/hero/hero-showcase.jpg"
                alt="AmakTech Solutions digital work"
              />
            </div>

            <div className="hero-floating-card">
              <span>AM</span>
              <div>
                <strong>AmakTech Solutions</strong>
                <p>Creative. Digital. Professional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div>
            <span className="section-label">ABOUT AMAKTECH</span>

            <h2>
              Technology, creativity and ideas working together.
            </h2>
          </div>

          <div>
            <p>
              AmakTech Solutions is a technology and creative services
              company providing professional graphic design, digital
              branding, business design materials, software development,
              and technology solutions to individuals, businesses,
              organizations, and institutions.
            </p>

            <p>
              Our mission is to provide innovative, professional, and
              accessible digital and creative solutions that help
              individuals, businesses, and organizations build strong
              brands, communicate effectively, and grow.
            </p>

            <Link href="/about" className="text-link">
              Learn more about AmakTech →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <ServiceShowcase />

      {/* WHY AMAKTECH */}
      <section className="section why-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">WHY AMAKTECH</span>

            <h2>
              More than a service provider.
              <br />
              We are your digital partner.
            </h2>

            <p>
              We combine creativity, technology and professionalism to
              turn ideas into practical digital solutions.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Innovation</h3>
              <p>
                We explore modern technologies and creative approaches
                to solve real problems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Quality</h3>
              <p>
                Every design and digital solution is developed with
                attention to quality and detail.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Professionalism</h3>
              <p>
                We aim to provide reliable communication, professional
                service and results that clients can trust.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Customer Satisfaction</h3>
              <p>
                Our solutions are built around understanding the
                client's needs and delivering practical results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <FeaturedWork />

      <Testimonials />

      {/* TECHNOLOGIES */}
      <section id="technologies" className="section technologies-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">TECHNOLOGIES</span>

            <h2>Built with modern technology.</h2>

            <p>
              Our technical capabilities cover modern frontend,
              backend, databases, application development and
              deployment technologies.
            </p>
          </div>

          <div className="technology-list">
            {technologies.map((tech) => {
              const Icon = tech.icon;

              return (
                <span key={tech.name} className="technology-chip">
                  <Icon className="technology-icon" />
                  <span>{tech.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI */}
      <AIIntro />

      {/* FOUNDER */}
      <section className="section founder-section">
        <div className="container founder-grid">
          <div className="founder-image">
            <img
              src="/images/team/alfred-makura.jpg"
              alt="Alfred Makura"
            />
          </div>

          <div className="founder-content">
            <span className="section-label">FOUNDER & DEVELOPER</span>

            <h2>Building technology with vision and purpose.</h2>

            <p>
              AmakTech Solutions is founded by Alfred Makura, a software
              engineering graduate and frontend developer with a growing
              focus on full-stack software engineering and digital
              product development.
            </p>

            <p>
              The goal is simple: combine creativity and technology to
              build solutions that are useful, professional and capable
              of creating real value.
            </p>

            <Link href="/about" className="text-link">
              Meet the founder →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT / ENQUIRY */}
      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-intro">
            <span className="section-label">START A PROJECT</span>

            <h2>
              Have an idea?
              <br />
              Let's build it.
            </h2>

            <p>
              Tell us what you need and the AmakTech team will review
              your requirements and get back to you.
            </p>

            <div className="contact-details">
              <a href="tel:+263716997735">
                +263 716 997 735
              </a>

              <a href="tel:+263782683072">
                +263 782 683 072
              </a>

              <a
                href="https://wa.me/263716997735"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

              <a href="mailto:inforamaiv@gmail.com">
                inforamaiv@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}