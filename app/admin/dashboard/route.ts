import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const [
      enquiries,
      services,
      projects,
      testimonials,
      media,
    ] = await Promise.all([
      prisma.enquiry.count(),

      prisma.service.count({
        where: {
          active: true,
        },
      }),

      prisma.project.count({
        where: {
          active: true,
        },
      }),

      prisma.testimonial.count({
        where: {
          active: true,
        },
      }),

      prisma.media.count(),
    ]);

    const newEnquiries = await prisma.enquiry.count({
      where: {
        status: "NEW",
      },
    });

    return NextResponse.json({
      enquiries,
      newEnquiries,
      services,
      projects,
      testimonials,
      media,
    });
  } catch (error) {
    console.error(
      "Dashboard statistics error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load dashboard statistics.",
      },
      {
        status: 500,
      }
    );
  }
}