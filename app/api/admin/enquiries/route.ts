import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const allowedStatuses = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
] as const;

type EnquiryStatus = (typeof allowedStatuses)[number];

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);

    return NextResponse.json(
      {
        message: "Could not load enquiries.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body = await request.json();

    const id = String(body.id || "");
    const status = body.status as EnquiryStatus;

    if (!id) {
      return NextResponse.json(
        {
          message: "Enquiry ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid enquiry status.",
        },
        {
          status: 400,
        }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error("Failed to update enquiry:", error);

    return NextResponse.json(
      {
        message: "Could not update enquiry.",
      },
      {
        status: 500,
      }
    );
  }
}