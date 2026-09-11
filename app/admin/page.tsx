import { requireAdmin } from "@/lib/auth";
import AdminDashboardOverview from "@/components/AdminDashboardOverview";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <main className="admin-page">
      <div className="container">
        <AdminDashboardOverview />

        <section className="admin-quick-links">
          <div className="section-heading">
            <span className="section-label">
              QUICK ACTIONS
            </span>

            <h2>Manage AmakTech</h2>
          </div>

          <div className="admin-quick-links-grid">
            <Link
              href="/admin/enquiries"
              className="admin-card"
            >
              <h3>Enquiries</h3>
              <p>
                View and manage customer enquiries.
              </p>
            </Link>

            <Link
              href="/admin/services"
              className="admin-card"
            >
              <h3>Services</h3>
              <p>
                Add, edit and manage your services.
              </p>
            </Link>

            <Link
              href="/admin/projects"
              className="admin-card"
            >
              <h3>Projects</h3>
              <p>
                Manage your portfolio projects.
              </p>
            </Link>

            <Link
              href="/admin/testimonials"
              className="admin-card"
            >
              <h3>Testimonials</h3>
              <p>
                Manage client testimonials.
              </p>
            </Link>

            <Link
              href="/admin/media"
              className="admin-card"
            >
              <h3>Media</h3>
              <p>
                Manage website images and media.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}