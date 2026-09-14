import AIAssistant from "@/components/AIAssistant";

export const metadata = {
  title: "AI Assistant | AmakTech Solutions",
  description:
    "Talk to the AmakTech AI Assistant and discover the right digital service for your needs.",
};

export default function AIAssistantPage() {
  return (
    <main>
      <section className="ai-page">
        <div className="container">
          <div className="ai-page-header">
            <span className="section-label">
              AMAKTECH AI
            </span>

            <h1>
              Meet the AmakTech
              <br />
              AI Assistant.
            </h1>

            <p>
              Tell us what you are trying to build,
              design or improve. Our AI Assistant can
              help you understand which AmakTech
              service may be right for you.
            </p>
          </div>

          <AIAssistant />
        </div>
      </section>
    </main>
  );
}