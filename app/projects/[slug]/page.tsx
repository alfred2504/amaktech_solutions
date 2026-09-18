import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | AmakTech Solutions",
    };
  }

  return {
    title: `${project.name} | AmakTech Solutions`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">
            {project.category || "PROJECT"}
          </span>

          <h1>
            {project.name}
            <span>.</span>
          </h1>

          <p>{project.shortDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container project-detail-grid">
          {project.image && (
            <div className="project-detail-image">
              <img src={project.image} alt={project.name} />
            </div>
          )}

          <div className="project-detail-content">
            {project.category && (
              <span className="project-category">
                {project.category}
              </span>
            )}

            <h2>{project.name}</h2>
            <p>{project.description}</p>

            {project.technologies && (
              <div className="project-technologies">
                <h3>Technologies</h3>
                <div className="technology-list">
                  {project.technologies.split(",").map((technology) => (
                    <span className="technology-chip" key={technology}>
                      {technology.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="project-detail-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit Live Project ↗
                </a>
              )}

              <Link href="/contact" className="btn btn-secondary">
                Get in touch
              </Link>

              <Link href="/projects" className="btn btn-secondary">
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}