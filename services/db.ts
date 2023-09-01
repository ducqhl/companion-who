import prismaDb from '@/lib/prismadb';
import { Category, Companion } from '@prisma/client';

export async function getCategories(): Promise<Category[]> {
  const categories = prismaDb.category.findMany();

  return categories;
}

export async function getCompanions(): Promise<Companion[]> {
  const companions = prismaDb.companion.findMany();

  return companions;
}

export async function getCompanion(id: string): Promise<Companion | null> {
  const companion = await prismaDb.companion.findUnique({
    where: {
      id: id,
    },
  });

  return companion;
}
