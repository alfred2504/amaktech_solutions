import Link from "next/link";
import { getActiveServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services | AmakTech Solutions",
  description:
    "Explore graphic design, digital branding, CV and resume design, website development, software development and AI-powered solutions from AmakTech Solutions.",
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <main>
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

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}