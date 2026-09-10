import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Params
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Service not found.",
        },
        {
          status: 404,
        }
      );
    }

    const service = await prisma.service.update({
      where: {
        id,
      },
      data: {
        ...(body.name !== undefined && {
          name: String(body.name).trim(),
        }),

        ...(body.slug !== undefined && {
          slug: String(body.slug).trim(),
        }),

        ...(body.shortDescription !== undefined && {
          shortDescription: String(
            body.shortDescription
          ).trim(),
        }),

        ...(body.description !== undefined && {
          description: String(
            body.description
          ).trim(),
        }),

        ...(body.image !== undefined && {
          image: body.image
            ? String(body.image).trim()
            : null,
        }),

        ...(body.icon !== undefined && {
          icon: body.icon
            ? String(body.icon).trim()
            : null,
        }),

        ...(body.featured !== undefined && {
          featured: Boolean(body.featured),
        }),

        ...(body.active !== undefined && {
          active: Boolean(body.active),
        }),

        ...(body.sortOrder !== undefined && {
          sortOrder: Number(body.sortOrder),
        }),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Failed to update service:", error);

    return NextResponse.json(
      {
        message: "Could not update service.",
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
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Service deleted.",
    });
  } catch (error) {
    console.error("Failed to delete service:", error);

    return NextResponse.json(
      {
        message: "Could not delete service.",
      },
      {
        status: 500,
      }
    );
  }
}