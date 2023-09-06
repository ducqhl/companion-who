import Categories from '@/components/Categories';
import Companions, { CompanionsType } from '@/components/Companions';
import SearchInput from '@/components/search-input';
import { getCategories, getCompanions } from '@/services/db';

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function RootPage({ searchParams }: RootPageProps) {
  const categories = await getCategories();
  const companions: CompanionsType = await getCompanions({
    where: {
      categoryId: searchParams.categoryId,
      name: searchParams.name,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <div className="h-full p-4 pl-4 space-y-2">
      <SearchInput />
      {categories && <Categories data={categories} />}
      {companions && <Companions data={companions} />}
    </div>
  );
}
