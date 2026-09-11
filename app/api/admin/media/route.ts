import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const mediaClient = (prisma as any).media;
    const media = await mediaClient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unauthorized or failed to load media." },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    if (!body.name || !body.url || !body.type) {
      return NextResponse.json(
        {
          error: "Name, URL and type are required.",
        },
        { status: 400 }
      );
    }

    const mediaClient = (prisma as any).media;
    const media = await mediaClient.create({
      data: {
        name: body.name,
        url: body.url,
        type: body.type,
        altText: body.altText || null,
        category: body.category || null,
      },
    });

    return NextResponse.json(media, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create media." },
      { status: 500 }
    );
  }
}