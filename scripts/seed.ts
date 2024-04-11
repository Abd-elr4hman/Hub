const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Information Security" },
        { name: "Machine Learning" },
        { name: "Backend Development" },
        { name: "Frontend Development" },
      ],
    });

    console.log("Success!");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
