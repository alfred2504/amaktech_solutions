
import Link from "next/link";
import { getActiveServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services | AmakTech Solutions",
  description:
    "Explore creative design, digital branding, CV and resume design, website development, software development and AI-powered solutions from AmakTech Solutions.",
};

const clientPortalUrl = "https://billing.amaktechsolutions.co.zw";

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <main>
      {/* SERVICES HERO */}
      <section className="inner-hero">
        <div className="container">
          <span className="section-label">AMAKTECH SERVICES</span>

          <h1>
            Creative solutions.
            <br />
            Digital technology.
          </h1>

          <p>
            Professional creative and technology services designed to
            help individuals, businesses and organizations build,
            communicate and grow.
          </p>
        </div>
      </section>

      {/* ADMIN-MANAGED SERVICES */}
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.length > 0 ? (
              services.map((service) => (
                <article className="service-card" key={service.id}>
                  {service.image && (
                    <div className="service-image">
                      <img
                        src={service.image}
                        alt={service.name}
                      />
                    </div>
                  )}

                  <div className="service-content">
                    <h2>{service.name}</h2>

                    <p>{service.shortDescription}</p>

                    <Link
                      href={`/services/${service.slug}`}
                      className="text-link"
                    >
                      Learn more →
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p>
                Our services are being updated. Please contact us
                for assistance.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* DOMAINS AND HOSTING - RESELLME INTEGRATION */}
      <section className="section">
        <div className="container">
          <span className="section-label">
            DOMAINS & WEB HOSTING
          </span>

          <h2>
            Build your online presence with AmakTech.
          </h2>

          <p>
            Looking for a domain name or reliable web hosting for your
            business? Access our customer portal to explore domain
            registration, hosting packages, manage your services
            and access your invoices.
          </p>

          <a
            href={clientPortalUrl}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Domains & Hosting →
          </a>

          <p>
            Already a customer?{" "}
            <a
              href={clientPortalUrl}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Access your Client Portal
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}