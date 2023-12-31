const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.Category.createMany({
      data: [
        { name: 'Famous People' },
        { name: 'Movies & TV' },
        { name: 'Musicians' },
        { name: 'Animals' },
        { name: 'Philosophy' },
        { name: 'Scientists' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories: ', error);
  } finally {
    await db.$disconnect();
  }
}

main();
