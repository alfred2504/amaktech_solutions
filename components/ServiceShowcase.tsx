import Link from "next/link";
import { getFeaturedServices } from "@/lib/services";

export default async function ServiceShowcase() {
  const services = await getFeaturedServices();

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">OUR SERVICES</span>

          <h2>
            Creative and digital solutions
            <br />
            built for your goals.
          </h2>

          <p>
            From professional graphic design and branding to websites,
            software and AI-powered solutions, AmakTech helps turn ideas
            into practical digital results.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
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
                <span className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{service.name}</h3>

                <p>{service.shortDescription}</p>

                <Link
                  href={`/services/${service.slug}`}
                  className="text-link"
                >
                  Explore service →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="services-footer">
          <Link href="/services" className="btn btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}