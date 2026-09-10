import AdminEnquiries from "@/components/AdminEnquiries";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminEnquiriesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const serialisedEnquiries = enquiries.map(
      (enquiry) => ({
        ...enquiry,
        createdAt: enquiry.createdAt.toISOString(),
      })
    );

    return (
      <main className="admin-page">
        <section className="page-hero">
          <div className="container">
            <span className="section-label">
              AMAKTECH ADMIN
            </span>

            <h1>
              Project
              <span> enquiries.</span>
            </h1>

            <p>
              Review customer enquiries and manage
              their progress from initial contact
              through completion.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">

            <div className="admin-header">
              <div>
                <span className="section-label">
                  CUSTOMER REQUESTS
                </span>

                <h2>
                  Enquiry Management
                </h2>
              </div>
            </div>

            <AdminEnquiries
              initialEnquiries={
                serialisedEnquiries
              }
            />

          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error(
      "Admin enquiries database error:",
      error
    );

    return (
      <main className="admin-page">
        <section className="page-hero">
          <div className="container">
            <span className="section-label">
              AMAKTECH ADMIN
            </span>

            <h1>
              Enquiry
              <span> management.</span>
            </h1>

            <p>
              The enquiry database could not be
              reached.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="enquiry-admin-empty">
              <div className="enquiry-admin-icon">
                DB
              </div>

              <h3>
                Database connection required
              </h3>

              <p>
                Check your DATABASE_URL in the
                environment configuration and make
                sure your PostgreSQL / Supabase
                database is reachable.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }
}