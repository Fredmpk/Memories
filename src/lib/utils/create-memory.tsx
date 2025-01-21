"use server";

import { prisma } from "../db";
import { Memory } from "../types";

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
