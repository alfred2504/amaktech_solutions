import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
  "amaktech-connect": {
    title: "AmakTech Connect",
    category: "Digital Platform",
    description:
      "A digital platform developed as part of the AmakTech product ecosystem.",
  },

  "amaktech-marketplace": {
    title: "AmakTech Marketplace",
    category: "E-Commerce",
    description:
      "A marketplace concept focused on connecting customers with products and services.",
  },

  "smartexpense-ai": {
    title: "SmartExpense AI",
    category: "AI Application",
    description:
      "An AI-focused application designed around smarter personal expense management.",
  },

  "careersync-ai": {
    title: "CareerSync AI",
    category: "AI & Career Technology",
    description:
      "A digital career solution designed to support job seekers and professional development.",
  },

  educore: {
    title: "EduCore",
    category: "Education Technology",
    description:
      "An education technology concept focused on improving digital learning experiences.",
  },

  "personal-portfolio": {
    title: "Personal Portfolio",
    category: "Web Development",
    description:
      "A professional digital portfolio demonstrating software engineering and creative capabilities.",
  },
} as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in projects)) {
    notFound();
  }

  const project = projects[slug as keyof typeof projects];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">{project.category}</span>

          <h1>
            {project.title}
            <span>.</span>
          </h1>

          <p>{project.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container project-detail">
          <span className="section-label">PROJECT OVERVIEW</span>

          <h2>Digital solutions built with purpose.</h2>

          <p>
            This project forms part of the AmakTech technology and digital
            product ecosystem. Detailed project information, screenshots,
            technologies and development progress can be added here as
            the project evolves.
          </p>

          <Link href="/contact" className="btn btn-primary">
            Discuss a Similar Project
          </Link>
        </div>
      </section>
    </main>
  );
}