"use server";

import { Memory } from "@/components/add-memory";
import { prisma } from "../db";

export async function createMemory(data: Memory) {
  try {
    const newMemory = await prisma.memory.create({
      data: {
        title: data.title,
        text: data.text,
        categoryId: data.categoryId,
        author: data.author,
      },
    });
    return newMemory;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating memory");
  }
}
