import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export async function safeDbQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured()) {
    console.warn("Skipping database query because DATABASE_URL is not configured.");
    return fallback;
  }

  try {
    return await query();
  } catch (error) {
    console.error("Database query failed, using fallback value:", error);
    return fallback;
  }
}
