"use server";

import { prisma } from "../db";
import { revalidatePath } from "next/cache";

export async function deleteMemoryAction(memoryId: string) {
  try {
    await prisma.memory.delete({
      where: { id: memoryId },
    });
    revalidatePath("/"); // Revalidate the main page
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error deleting memory" };
  }
}
