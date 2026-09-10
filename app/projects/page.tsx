import Link from "next/link";

const projects = [
  {
    slug: "amaktech-connect",
    title: "AmakTech Connect",
    category: "Digital Platform",
    description:
      "A digital platform developed as part of the AmakTech product ecosystem.",
  },
  {
    slug: "amaktech-marketplace",
    title: "AmakTech Marketplace",
    category: "E-Commerce",
    description:
      "A marketplace concept focused on connecting customers with products and services.",
  },
  {
    slug: "smartexpense-ai",
    title: "SmartExpense AI",
    category: "AI Application",
    description:
      "An AI-focused application designed around smarter personal expense management.",
  },
  {
    slug: "careersync-ai",
    title: "CareerSync AI",
    category: "AI & Career Technology",
    description:
      "A digital career solution designed to support job seekers and professional development.",
  },
  {
    slug: "educore",
    title: "EduCore",
    category: "Education Technology",
    description:
      "An education technology concept focused on improving digital learning experiences.",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Web Development",
    description:
      "A professional digital portfolio demonstrating software engineering and creative capabilities.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">OUR WORK</span>

          <h1>
            Ideas brought to
            <span> life.</span>
          </h1>

          <p>
            Explore selected AmakTech digital products, software projects
            and technology initiatives.
          </p>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.slug}>
                <div className="project-content">
                  <div className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span>{project.category}</span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <Link href={`/projects/${project.slug}`}>
                    View project →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}