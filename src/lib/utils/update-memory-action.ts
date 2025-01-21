"use server";

import { prisma } from "../db";
import { Memory } from "../types";

export async function updateMemoryAction(data: Memory) {
  if (!data.id) {
    throw new Error("Memory ID is required");
  }

  try {
    const updatedMemory = await prisma.memory.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        text: data.text,
        author: data.author,
      },
    });
    return updatedMemory;
  } catch (error) {
    console.log(error);

    throw new Error("Error updating memory");
  }
}
