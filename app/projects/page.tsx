import Link from "next/link";
import { getActiveProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects | AmakTech Solutions",
  description:
    "Explore software, AI, digital platforms, e-commerce and creative projects developed by AmakTech Solutions.",
};

export default async function ProjectsPage() {
  const projects = await getActiveProjects();

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
          {projects.length === 0 ? (
            <div className="empty-projects">
              <h3>No projects available</h3>
              <p>
                Projects will appear here once they are published from the admin dashboard.
              </p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.id}>
                  {project.image && (
                    <div className="project-image">
                      <img src={project.image} alt={project.name} />
                    </div>
                  )}

                  <div className="project-content">
                    <div className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {project.category && (
                      <span className="project-category">
                        {project.category}
                      </span>
                    )}

                    <h3>{project.name}</h3>

                    <p>{project.shortDescription}</p>

                    <Link href={`/projects/${project.slug}`} className="text-link">
                      View project ?
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
