import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const testimonial = await prisma.testimonial.update({
      where: {
        id,
      },
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

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update testimonial.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: Params
) {
  try {
    await requireAdmin();

    const { id } = await params;

    await prisma.testimonial.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete testimonial.",
      },
      {
        status: 500,
      }
    );
  }
}