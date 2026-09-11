import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unauthorized or failed to load testimonials.",
      },
      {
        status: 401,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: body.clientName,
        company: body.company || null,
        role: body.role || null,
        content: body.content,
        image: body.image || null,
        rating: Number(body.rating) || 5,
        featured: Boolean(body.featured),
        active: body.active !== false,
        sortOrder: Number(body.sortOrder) || 0,
      },
    });

    return NextResponse.json(testimonial, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create testimonial.",
      },
      {
        status: 500,
      }
    );
  }
}