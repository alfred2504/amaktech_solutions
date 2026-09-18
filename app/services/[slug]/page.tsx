import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services";

export const dynamic = "force-dynamic";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | AmakTech Solutions",
    };
  }

  return {
    title: `${service.name} | AmakTech Solutions`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="section-label">
            AMAKTECH SERVICE
          </span>

          <h1>{service.name}</h1>

          <p>{service.shortDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            {service.image && (
              <div className="service-detail-image">
                <img
                  src={service.image}
                  alt={service.name}
                />
              </div>
            )}
          </div>

          <div className="service-detail-content">
            <span className="section-label">
              ABOUT THIS SERVICE
            </span>

            <h2>{service.name}</h2>

            <p>{service.description}</p>

            <div className="service-detail-actions">
              <Link
                href="/contact"
                className="btn btn-primary"
              >
                Get Started
              </Link>

              <Link
                href="/services"
                className="btn btn-secondary"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}