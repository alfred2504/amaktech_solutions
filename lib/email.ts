import nodemailer from "nodemailer";

const smtpPort = Number(process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: smtpPort,
	secure: smtpPort === 465,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export async function sendEnquiryNotification(enquiry: {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	service?: string;
	budget?: string;
	message: string;
	aiGenerated?: boolean;
	aiProjectBrief?: string | null;
}) {
	const recipient = process.env.CONTACT_TO_EMAIL;

	if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !recipient) {
		throw new Error("Email configuration is incomplete.");
	}

	return transporter.sendMail({
		from: process.env.SMTP_USER,
		to: recipient,
		replyTo: enquiry.email,
		subject: `New enquiry from ${enquiry.name}`,
		text: [
			`Name: ${enquiry.name}`,
			`Email: ${enquiry.email}`,
			`Phone: ${enquiry.phone || "Not provided"}`,
			`Company / Organisation: ${enquiry.company || "Not provided"}`,
			`Service: ${enquiry.service || "Not specified"}`,
			`Budget: ${enquiry.budget || "Not specified"}`,
			"",
			"Project details:",
			enquiry.message,
		].join("\n"),
	});
}
