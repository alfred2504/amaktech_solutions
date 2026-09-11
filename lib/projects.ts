import { prisma } from "@/lib/prisma";

export async function getActiveProjects() {
  return prisma.project.findMany({
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
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
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
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: {
      slug,
      active: true,
    },
  });
}