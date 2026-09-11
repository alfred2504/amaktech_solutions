import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminProjects from "@/components/AdminProjects";

export default async function AdminProjectsPage() {
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
            Manage
            <span> projects.</span>
          </h1>

          <p>
            Create, update and organise the projects
            showcased on the AmakTech Solutions website.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AdminProjects />
        </div>
      </section>
    </main>
  );
}
