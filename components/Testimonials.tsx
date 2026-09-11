import { getFeaturedTestimonials } from "@/lib/testimonials";

export default async function Testimonials() {
  const testimonials = await getFeaturedTestimonials();

  // Don't render an empty section if there are no testimonials yet.
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-heading centered">
          <span className="section-label">
            CLIENT FEEDBACK
          </span>

          <h2>
            What our clients
            <br />
            say about us.
          </h2>

          <p>
            We value the trust our clients place in
            AmakTech Solutions.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article
              className="testimonial-card"
              key={testimonial.id}
            >
              <div className="testimonial-rating">
                {"★".repeat(
                  Math.max(
                    0,
                    Math.min(5, testimonial.rating)
                  )
                )}
              </div>

              <blockquote>
                “{testimonial.content}”
              </blockquote>

              <div className="testimonial-client">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.clientName}
                  />
                ) : (
                  <div className="testimonial-avatar">
                    {testimonial.clientName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <strong>
                    {testimonial.clientName}
                  </strong>

                  {(testimonial.role ||
                    testimonial.company) && (
                    <span>
                      {testimonial.role || ""}
                      {testimonial.role &&
                      testimonial.company
                        ? " • "
                        : ""}
                      {testimonial.company || ""}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}