import Link from "next/link";

export default function AIIntro() {
  return (
    <section className="section ai-intro">
      <div className="container ai-intro-grid">
        <div>
          <p className="eyebrow">
            AMAKTECH AI
          </p>

          <h2>
            Not sure which digital
            service you need?
          </h2>
        </div>

        <div>
          <p>
            Tell our AI Assistant what you are trying
            to build, design or improve. It can help
            you identify the right AmakTech service
            and guide you toward your next step.
          </p>

          <Link
            href="/ai-assistant"
            className="button button-primary"
          >
            Talk to AmakTech AI →
          </Link>
        </div>
      </div>
    </section>
  );
}