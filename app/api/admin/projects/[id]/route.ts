import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        image: body.image || null,
        category: body.category || null,
        technologies: body.technologies || null,
        liveUrl: body.liveUrl || null,
        featured: Boolean(body.featured),
        active: body.active !== false,
        sortOrder: Number(body.sortOrder) || 0,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project PATCH error:", error);

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();

    const { id } = await params;

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Project DELETE error:", error);

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
