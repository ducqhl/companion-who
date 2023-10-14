import prismaDb from '@/lib/prismadb';
import { Category, Companion } from '@prisma/client';

type GetCategoriesRequest = any;

/**
 *
 * @param query prisma query properties - for looking up
 * @returns [companion object]
 */
async function getCategories(query?: GetCategoriesRequest): Promise<any> {
  const categories = prismaDb.category.findMany({
    ...query,
  });

  return categories;
}

type GetCompanionsRequest = any;

/**
 *
 * @param query prisma query properties - for looking up
 * @returns [companion object]
 */
async function getCompanions(query?: GetCompanionsRequest): Promise<any> {
  const companions = prismaDb.companion.findMany({
    ...query,
  });

  return companions;
}

type GetCompanionRequest = any;

async function getCompanion(
  query: GetCompanionRequest,
): Promise<Companion | any> {
  const companion = await prismaDb.companion.findUnique(query);

  return companion;
}

type CompanionCreateRequest = Omit<Companion, 'id' | 'createdAt' | 'updatedAt'>;

async function createCompanion(
  data: CompanionCreateRequest,
): Promise<Companion | null> {
  const companion = await prismaDb.companion.create({
    data,
  });
  return companion;
}

type CompanionUpdateRequest = any;

async function updateCompanion(
  query: CompanionUpdateRequest,
): Promise<Companion | null> {
  const companion = await prismaDb.companion.update(query);
  return companion;
}

type DeleteCompanionRequest = any;

async function deleteCompanion(
  query: DeleteCompanionRequest,
): Promise<Companion | null> {
  const companion = await prismaDb.companion.delete(query);
  return companion;
}

export {
  getCategories,
  getCompanion,
  getCompanions,
  createCompanion,
  updateCompanion,
  deleteCompanion,
};
