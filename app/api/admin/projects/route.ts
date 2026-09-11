import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const projects = await prisma.project.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Project GET error:", error);

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
      { error: "Failed to load projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const project = await prisma.project.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Project POST error:", error);

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
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}