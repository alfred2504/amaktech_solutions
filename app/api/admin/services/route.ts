import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);

    return NextResponse.json(
      {
        message: "Could not load services.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const slug = String(body.slug || "").trim();
    const shortDescription = String(
      body.shortDescription || ""
    ).trim();
    const description = String(
      body.description || ""
    ).trim();

    const image = body.image
      ? String(body.image).trim()
      : null;

    const icon = body.icon
      ? String(body.icon).trim()
      : null;

    const featured = Boolean(body.featured);
    const active =
      body.active === undefined
        ? true
        : Boolean(body.active);

    const sortOrder = Number(body.sortOrder || 0);

    if (
      !name ||
      !slug ||
      !shortDescription ||
      !description
    ) {
      return NextResponse.json(
        {
          message:
            "Name, slug, short description and description are required.",
        },
        {
          status: 400,
        }
      );
    }

    const existing = await prisma.service.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message:
            "A service with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        shortDescription,
        description,
        image,
        icon,
        featured,
        active,
        sortOrder,
      },
    });

    return NextResponse.json(service, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to create service:", error);

    return NextResponse.json(
      {
        message: "Could not create service.",
      },
      {
        status: 500,
      }
    );
  }
}