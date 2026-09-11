import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const fallbackStats = {
  enquiries: 0,
  newEnquiries: 0,
  services: 0,
  projects: 0,
  testimonials: 0,
  media: 0,
  recentEnquiries: [],
};

export async function GET() {
  try {
    await requireAdmin();

    const [
      enquiries,
      services,
      projects,
      testimonials,
      media,
      newEnquiries,
      recentEnquiries,
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

      prisma.enquiry.count({
        where: {
          status: "NEW",
        },
      }),

      prisma.enquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          service: true,
          budget: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      enquiries,
      newEnquiries,
      services,
      projects,
      testimonials,
      media,
      recentEnquiries,
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    return NextResponse.json(fallbackStats, {
      status: 200,
    });
  }
}