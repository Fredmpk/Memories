import { prisma } from "../db";

export default async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}
