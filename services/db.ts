import prismaDb from '@/lib/prismadb';
import { Category, Companion } from '@prisma/client';

export async function getCategories(): Promise<Category[]> {
  const categories = prismaDb.category.findMany();

  return categories;
}

/**
 *
 * @param query prisma query properties - for looking up
 * @returns [companion object]
 */
export async function getCompanions(query?: any): Promise<any> {
  const companions = prismaDb.companion.findMany({
    ...query,
  });

  return companions;
}
type GetCompanionRequest = any;

export async function getCompanion(
  query: GetCompanionRequest,
): Promise<Companion | any> {
  const companion = await prismaDb.companion.findUnique(query);

  return companion;
}

type CompanionCreateRequest = Omit<Companion, 'id' | 'createdAt' | 'updatedAt'>;
type CompanionUpdateRequest = Omit<Companion, 'id' | 'createdAt' | 'updatedAt'>;

export async function createCompanion(
  data: CompanionCreateRequest,
): Promise<Companion | null> {
  const companion = await prismaDb.companion.create({
    data,
  });
  return companion;
}

export async function updateCompanion(
  id: string,
  data: CompanionCreateRequest,
): Promise<Companion | null> {
  const companion = await prismaDb.companion.update({
    where: {
      id,
    },
    data,
  });
  return companion;
}
