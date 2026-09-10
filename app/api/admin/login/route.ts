import { NextResponse } from "next/server";
import {
  createAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const valid = await verifyAdminCredentials(
      email,
      password
    );

    if (!valid) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    await createAdminSession(email);

    return NextResponse.json({
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        message: "Unable to log in.",
      },
      {
        status: 500,
      }
    );
  }
}