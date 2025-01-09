import { prisma } from "../db";

export default async function getEmptyCategories() {
  try {
    const emptyCategories = await prisma.category.findMany({
      where: {
        memories: {
          none: {},
        },
      },
    });

    console.log(
      "empty categories fetched successfully:",
      emptyCategories.length
    );
    return emptyCategories;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}
