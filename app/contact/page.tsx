import { EnquiryForm } from "@/components/EnquiryForm";

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">CONTACT AMAKTECH</span>

          <h1>
            Let's turn your
            <span> idea into action.</span>
          </h1>

          <p>
            Tell us about your project, design requirement or technology idea.
            Our team will review your enquiry and get back to you.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-intro">
            <span className="section-label">START A PROJECT</span>

            <h2>
              Tell us what
              <br />
              you need.
            </h2>

            <p>
              From professional graphic design and business branding to
              websites, software applications and AI-powered solutions,
              AmakTech Solutions is ready to help.
            </p>

            <div className="contact-details">
              <a href="tel:+263716997735">
                +263 716 997 735
              </a>

              <a href="tel:+263782683072">
                +263 782 683 072
              </a>

              <a
                href="https://wa.me/263716997735"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

              <a href="mailto:inforamaiv@gmail.com">
                amaktechsolution@gmail.com
              </a>
            </div>

            <div className="contact-note">
              <strong>Graphic Design</strong>
              <span>Branding • CVs • Social Media • Business Materials</span>

              <strong>Technology</strong>
              <span>Websites • Software • AI • Digital Products</span>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">DIRECT CONTACT</span>

            <h2>Prefer to talk directly?</h2>

            <p>
              Contact AmakTech Solutions through phone or WhatsApp for quick
              enquiries.
            </p>

            <div className="hero-actions">
              <a
                href="https://wa.me/263716997735"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Chat on WhatsApp
              </a>

              <a
                href="tel:+263716997735"
                className="btn btn-secondary"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}