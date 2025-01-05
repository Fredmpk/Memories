import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Adventsverse" },
    { name: "Urlaube" },
    { name: "Weisheiten" },
    { name: "Sprüche" },
    { name: "Flüche" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
