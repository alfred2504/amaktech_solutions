import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE = "amaktech_admin_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyAdminCredentials(
  email: string,
  password: string
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD is not configured."
    );
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  /*
   * Supports a bcrypt password hash.
   * For initial setup, plain-text comparison is also
   * supported so you can get the system running.
   */
  if (adminPassword.startsWith("$2")) {
    return bcrypt.compare(password, adminPassword);
  }

  return password === adminPassword;
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({
    email,
    role: "ADMIN",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    SESSION_COOKIE
  )?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      getSecret()
    );

    if (
      payload.role !== "ADMIN" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      email: payload.email,
      role: "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}