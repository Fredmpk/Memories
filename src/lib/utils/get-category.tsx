import { prisma } from "../db";

export default async function getCategory(paramsId: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: paramsId },
    });
    return category;
  } catch (error) {
    console.error("error fetching category:", error);
    return null;
  }
}
