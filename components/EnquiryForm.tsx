"use client";

import { FormEvent, useState } from "react";

const services = [
  "Graphic Design & Branding",
  "Digital Branding",
  "CV & Resume Design",
  "Website Design",
  "Software Development",
  "AI-Powered Solutions",
];

const serviceSlugMap: Record<string, string> = {
  "graphic-design-branding": "Graphic Design & Branding",
  "digital-branding": "Digital Branding",
  "cv-resume-design": "CV & Resume Design",
  "website-design": "Website Design",
  "software-development": "Software Development",
  "ai-powered-solutions": "AI-Powered Solutions",
};

export function EnquiryForm() {
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const serviceSlug = params.get("service");
  const aiBrief = params.get("brief");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedService, setSelectedService] = useState(() =>
    serviceSlug && serviceSlugMap[serviceSlug]
      ? serviceSlugMap[serviceSlug]
      : ""
  );

  const [projectBrief, setProjectBrief] = useState(() =>
    aiBrief ?? ""
  );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const message = String(formData.get("message") ?? "").trim();

      const aiProjectBrief = projectBrief.trim();

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          service: formData.get("service"),
          budget: formData.get("budget"),
          message,

          // AI consultation information
          aiGenerated: Boolean(aiProjectBrief),
          aiProjectBrief: aiProjectBrief || null,
        }),
      });

      const body = await response.text();

      let responseMessage = "";

      if (body) {
        try {
          responseMessage = JSON.parse(body).message;
        } catch {
          responseMessage =
            "The server returned an invalid response.";
        }
      }

      if (!response.ok) {
        throw new Error(
          responseMessage ||
            "We could not submit your enquiry. Please try again."
        );
      }

      form.reset();

      setSelectedService("");
      setProjectBrief("");

      setStatus(
        responseMessage ||
          "Your enquiry has been received."
      );
    } catch (err) {
      setStatus(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" required />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            required
          />
        </label>

        <label>
          Phone
          <input name="phone" />
        </label>

        <label>
          Company / Organisation
          <input name="company" />
        </label>

        <label>
          Service
          <select
            name="service"
            value={selectedService}
            onChange={(e) =>
              setSelectedService(e.target.value)
            }
          >
            <option value="">
              Select a service
            </option>

            {services.map((service) => (
              <option
                key={service}
                value={service}
              >
                {service}
              </option>
            ))}
          </select>
        </label>

        <label>
          Budget
          <select
            name="budget"
            defaultValue=""
          >
            <option value="">
              Prefer not to say
            </option>

            <option value="Under $100">
              Under $100
            </option>

            <option value="$100 - $500">
              $100 - $500
            </option>

            <option value="$500 - $1,000">
              $500 - $1,000
            </option>

            <option value="$1,000+">
              $1,000+
            </option>
          </select>
        </label>
      </div>

      {projectBrief && (
        <div className="ai-enquiry-context">
          <span>AI-GENERATED PROJECT BRIEF</span>

          <p>
            Review the project brief below and edit it if
            anything needs to be changed before submitting
            your enquiry.
          </p>

          <textarea
            name="aiProjectBrief"
            value={projectBrief}
            onChange={(event) =>
              setProjectBrief(event.target.value)
            }
            rows={8}
          />
        </div>
      )}

      <label>
        Tell us about your project
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Tell us about your project, goals, requirements or what you would like us to help you with."
        />
      </label>

      <button
        className="button button-primary"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send Enquiry"}
      </button>

      {status && (
        <p className="form-status">
          {status}
        </p>
      )}
    </form>
  );
}