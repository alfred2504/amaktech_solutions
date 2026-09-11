import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";

export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">
            SELECTED PROJECTS
          </span>

          <h2>
            Digital products and
            <br />
            creative work.
          </h2>

          <p>
            Explore selected projects developed and designed
            by AmakTech Solutions.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
            >
              {project.image && (
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.name}
                  />
                </div>
              )}

              <div className="project-content">
                {project.category && (
                  <span className="project-category">
                    {project.category}
                  </span>
                )}

                <h3>{project.name}</h3>

                <p>{project.shortDescription}</p>

                <Link
                  href={`/projects/${project.slug}`}
                  className="text-link"
                >
                  View Project →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-footer">
          <Link
            href="/projects"
            className="btn btn-secondary"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}