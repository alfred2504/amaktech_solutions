import { prisma, safeDbQuery } from "@/lib/prisma";

export async function getActiveProjects() {
  return safeDbQuery(
    () =>
      prisma.project.findMany({
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

export async function getFeaturedProjects() {
  return safeDbQuery(
    () =>
      prisma.project.findMany({
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

export async function getProjectBySlug(slug: string) {
  return safeDbQuery(
    () =>
      prisma.project.findFirst({
        where: {
          slug,
          active: true,
        },
      }),
    null
  );
}