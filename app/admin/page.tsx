import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const adminCards = [
  {
    number: "01",
    title: "Enquiries",
    description:
      "View and manage project enquiries submitted through the AmakTech website.",
    href: "/admin/enquiries",
  },
  {
    number: "02",
    title: "Services",
    description:
      "Manage AmakTech services including graphic design, CV design, websites, software and AI solutions.",
    href: "/admin/services",
  },
  {
    number: "03",
    title: "Projects",
    description:
      "Manage projects and digital products presented on the AmakTech website.",
    href: "/projects",
  },
  {
    number: "04",
    title: "Media",
    description:
      "Manage images and visual assets used throughout the website.",
    href: "/admin/media",
  },
];

export default async function AdminDashboard() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-page">

      <section className="page-hero">
        <div className="container">

          <span className="section-label">
            AMAKTECH ADMIN
          </span>

          <h1>
            Business
            <span> dashboard.</span>
          </h1>

          <p>
            Manage AmakTech Solutions enquiries,
            services, projects and digital content
            from one central workspace.
          </p>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-header">

            <div>
              <span className="section-label">
                MANAGEMENT
              </span>

              <h2>
                AmakTech Workspace
              </h2>

              <p className="admin-session-email">
                Signed in as {session.email}
              </p>
            </div>

            <div className="admin-actions">

              <Link
                href="/"
                className="btn btn-secondary"
              >
                View Website
              </Link>

              <AdminLogoutButton />

            </div>

          </div>

          <div className="admin-grid">

            {adminCards.map((card) => (
              <Link
                href={card.href}
                className="admin-card"
                key={card.number}
              >
                <span>{card.number}</span>

                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <strong>
                  Open →
                </strong>
              </Link>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}