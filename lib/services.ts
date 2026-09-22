import { prisma, safeDbQuery } from "@/lib/prisma";

export async function getActiveServices() {
  return safeDbQuery(
    () =>
      prisma.service.findMany({
        where: {
          active: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
    []
  );
}

export async function getFeaturedServices() {
  return safeDbQuery(
    () =>
      prisma.service.findMany({
        where: {
          active: true,
          featured: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
    []
  );
}

export async function getServiceBySlug(slug: string) {
  return safeDbQuery(
    () =>
      prisma.service.findFirst({
        where: {
          slug,
          active: true,
        },
      }),
    null
  );
}