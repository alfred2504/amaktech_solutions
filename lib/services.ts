import { prisma } from "@/lib/prisma";

export async function getActiveServices() {
  try {
    return await prisma.service.findMany({
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
  } catch (error) {
    console.error("Unable to load active services:", error);
    return [];
  }
}

export async function getFeaturedServices() {
  try {
    return await prisma.service.findMany({
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
  } catch (error) {
    console.error("Unable to load featured services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findFirst({
      where: {
        slug,
        active: true,
      },
    });
  } catch (error) {
    console.error("Unable to load service by slug:", error);
    return null;
  }
}