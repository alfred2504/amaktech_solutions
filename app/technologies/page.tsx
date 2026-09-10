import Link from "next/link";

const technologyGroups = [
  {
    title: "Frontend Development",
    description:
      "Modern technologies for creating responsive, fast and user-friendly digital experiences.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Vite",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Reliable backend technologies for APIs, business logic and scalable applications.",
    technologies: ["Node.js", "Express.js", "Django"],
  },
  {
    title: "Databases",
    description:
      "Database technologies used to securely store, manage and retrieve application data.",
    technologies: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "MongoDB Atlas",
      "Firebase",
    ],
  },
  {
    title: "Application & Authentication",
    description:
      "Tools that help build secure, structured and maintainable applications.",
    technologies: [
      "Prisma",
      "JWT",
      "NextAuth / Auth.js",
      "Zod",
      "Zustand",
      "React Router",
    ],
  },
  {
    title: "Deployment & Development Tools",
    description:
      "Tools and platforms used to develop, version, test and deploy digital products.",
    technologies: ["Vercel", "GitHub", "GitHub Pages"],
  },
  {
    title: "Artificial Intelligence",
    description:
      "AI integration for intelligent assistants, automation, recommendations and digital products.",
    technologies: [
      "AI API Integration",
      "AI Assistants",
      "AI Content Generation",
      "AI Recommendations",
      "AI-powered Applications",
    ],
  },
];

export default function TechnologiesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">OUR TECHNOLOGIES</span>

          <h1>
            Technology that turns
            <span> ideas into products.</span>
          </h1>

          <p>
            We use modern development technologies and tools to build
            professional websites, software applications, digital products and
            intelligent technology solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="technology-page-intro">
            <span className="section-label">TECHNICAL CAPABILITIES</span>

            <h2>
              The tools behind our
              <span> digital solutions.</span>
            </h2>

            <p>
              Our technology stack allows us to work across frontend
              development, backend systems, databases, authentication,
              deployment and AI-powered applications.
            </p>
          </div>

          <div className="technology-groups">
            {technologyGroups.map((group) => (
              <article className="technology-group" key={group.title}>
                <div className="technology-group-number">
                  {String(technologyGroups.indexOf(group) + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <div>
                  <h3>{group.title}</h3>

                  <p>{group.description}</p>

                  <div className="technology-tags">
                    {group.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container cta-box">
          <span className="section-label">BUILD WITH US</span>

          <h2>
            Have a technology idea?
            <br />
            Let's make it real.
          </h2>

          <p>
            Whether you need a website, business application, software
            platform or AI-powered solution, we can help turn your idea into a
            practical digital product.
          </p>

          <Link href="/contact" className="btn btn-primary">
            Start a Project
          </Link>
        </div>
      </section>
    </main>
  );
}