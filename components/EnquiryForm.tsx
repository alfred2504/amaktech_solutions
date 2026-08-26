"use client";
import { FormEvent, useState } from "react";

export function EnquiryForm() {
	const [status, setStatus] = useState("");
	const [loading, setLoading] = useState(false);

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setStatus("");
		const form = e.currentTarget;

		try {
			const response = await fetch("/api/enquiries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
			});
			const body = await response.text();
			let message = "";

			if (body) {
				try {
					message = JSON.parse(body).message;
				} catch {
					message = "The server returned an invalid response.";
				}
			}

			if (!response.ok) {
				throw new Error(message || "We could not submit your enquiry. Please try again.");
			}

			form.reset();
			setStatus(message || "Your enquiry has been received.");
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}

	return <form className="enquiry-form" onSubmit={submit}><div className="form-grid"><label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" /></label><label>Company / Organisation<input name="company" /></label><label>Service<select name="service" defaultValue=""><option value="">Select a service</option><option>Graphic Design & Branding</option><option>Website Design</option><option>Software Development</option><option>AI-Powered Solutions</option><option>Digital Product Development</option></select></label><label>Budget<select name="budget" defaultValue=""><option value="">Prefer not to say</option><option>Under $100</option><option>$100 - $500</option><option>$500 - $1,000</option><option>$1,000+</option></select></label></div><label>Tell us about your project<textarea name="message" required minLength={10} rows={6} /></label><button className="button button-primary" disabled={loading}>{loading ? "Sending..." : "Send Enquiry"}</button>{status && <p className="form-status">{status}</p>}</form>;
}
