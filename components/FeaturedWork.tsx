import Link from "next/link";

const projects = [
  {
    title: "AmakTech Connect",
    category: "Digital Platform",
    image: "/images/projects/amaktech-connect.jpg",
    description:
      "A digital platform developed as part of the AmakTech product ecosystem.",
  },
  {
    title: "AmakTech Marketplace",
    category: "E-Commerce",
    image: "/images/projects/amaktech-marketplace.jpg",
    description:
      "A marketplace concept focused on connecting customers with products and services.",
  },
  {
    title: "SmartExpense AI",
    category: "AI Application",
    image: "/images/projects/smartexpense-ai.jpg",
    description:
      "An AI-focused application designed around smarter personal expense management.",
  },
  {
    title: "CareerSync AI",
    category: "AI & Career Technology",
    image: "/images/projects/careersync-ai.jpg",
    description:
      "A digital career solution designed to support job seekers and professional development.",
  },
  {
    title: "EduCore",
    category: "Education Technology",
    image: "/images/projects/educore.jpg",
    description:
      "An education technology concept focused on improving digital learning experiences.",
  },
  {
    title: "Graphic Design Portfolio",
    category: "Creative Design",
    image: "/images/projects/graphic-design.jpg",
    description:
      "Selected visual design work created for businesses, organisations and individuals.",
  },
];

export default function FeaturedWork() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">OUR WORK</span>

          <h2>Ideas brought to life.</h2>

          <p>
            Explore selected AmakTech digital products, software
            projects and creative work.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                />
              </div>

              <div className="project-content">
                <span>{project.category}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <Link href="/projects">
                  View project →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action">
          <Link href="/projects" className="btn btn-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}