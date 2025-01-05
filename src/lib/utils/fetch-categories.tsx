import { prisma } from "../db";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    console.log("Categories fetched successfully:", categories.length);
    return categories;
  } catch (error) {
    console.error("Database error:", error);
    // Return empty array instead of throwing
    return [];
    // Or handle the error differently based on your needs
  }
}
