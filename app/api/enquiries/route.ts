import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
	try {
		const result = enquirySchema.safeParse(await request.json());
		if (!result.success) {
			return NextResponse.json({ ok: false, message: "Please check the information entered." }, { status: 400 });
		}

		const enquiry = await prisma.enquiry.create({ data: result.data });
		await sendEnquiryNotification(result.data);

		return NextResponse.json({ ok: true, message: "Your enquiry has been received.", id: enquiry.id }, { status: 201 });
	} catch (error) {
		console.error("Enquiry submission failed:", error);
		return NextResponse.json(
			{ ok: false, message: "We could not submit your enquiry. Please try again or contact us on WhatsApp." },
			{ status: 500 },
		);
	}
}
