import { prisma } from "@/lib/prisma";

export async function getActiveTestimonials() {
  return prisma.testimonial.findMany({
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

export async function getFeaturedTestimonials() {
  return prisma.testimonial.findMany({
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