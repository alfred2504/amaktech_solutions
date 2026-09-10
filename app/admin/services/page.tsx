import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminServices from "@/components/AdminServices";

export default async function AdminServicesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const services = await prisma.service.findMany({
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const serialisedServices = services.map(
    (service) => ({
      ...service,
      createdAt:
        service.createdAt.toISOString(),
      updatedAt:
        service.updatedAt.toISOString(),
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
            Manage
            <span> services.</span>
          </h1>

          <p>
            Create, update and organise the
            services offered by AmakTech Solutions.
          </p>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <AdminServices
            initialServices={
              serialisedServices
            }
          />

        </div>
      </section>

    </main>
  );
}