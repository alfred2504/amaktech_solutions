import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  _request: Request,
  { params }: Params
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const mediaClient = (prisma as any).media;

    await mediaClient.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Media deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete media." },
      { status: 500 }
    );
  }
}