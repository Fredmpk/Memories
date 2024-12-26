"use server";

import { prisma } from "../db";

export async function createCategory(data: { name: string }) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return newCategory;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating category");
  }
}
