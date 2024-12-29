import { prisma } from "../db";

export default async function getMemories(categoryId: string) {
  const memories = await prisma.memory.findMany({
    where: { categoryId: categoryId },
  });
  return memories;
}
