import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const result = enquirySchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					ok: false,
					message: "Please check the information entered.",
				},
				{ status: 400 },
			);
		}

		const data = result.data;

		const aiGenerated = data.aiGenerated;
		const aiProjectBrief = data.aiProjectBrief || null;

		const enquiry = await prisma.enquiry.create({
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone || null,
				company: data.company || null,
				service: data.service || null,
				budget: data.budget || null,
				message: data.message,

				aiGenerated,
				aiProjectBrief,
			},
		});

		await sendEnquiryNotification({
			...data,
			aiGenerated,
			aiProjectBrief,
		});

		return NextResponse.json(
			{
				ok: true,
				message: "Your enquiry has been received.",
				id: enquiry.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Enquiry submission failed:", error);

		return NextResponse.json(
			{
				ok: false,
				message:
					"We could not submit your enquiry. Please try again or contact us on WhatsApp.",
			},
			{ status: 500 },
		);
	}
}