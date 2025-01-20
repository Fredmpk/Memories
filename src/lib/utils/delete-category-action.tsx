"use server";

import { prisma } from "../db";
import { revalidatePath } from "next/cache";

export default async function deleteCategoryAction(categoryId: string) {
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });
    revalidatePath("/"); // Revalidate the main page
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error deleting category" };
  }
}
