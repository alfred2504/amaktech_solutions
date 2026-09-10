import Link from "next/link";

export default function AIIntro() {
  return (
    <section className="section ai-section">
      <div className="container">
        <div className="ai-card">
          <div className="ai-content">
            <span className="section-label">AMAKTECH AI</span>

            <h2>
              Not sure which digital solution you need?
            </h2>

            <p>
              Our AI assistant will help you understand your needs,
              recommend the right AmakTech service and guide you
              towards starting your project.
            </p>

            <Link href="/ai-assistant" className="btn btn-primary">
              Talk to AmakTech AI
            </Link>
          </div>

          <div className="ai-visual">
            <div className="ai-orb">
              <span>AI</span>
            </div>

            <div className="ai-message">
              <strong>How can we help?</strong>
              <p>
                Tell us about your business, idea or project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}