import Categories from '@/components/Categories';
import SearchInput from '@/components/search-input';
import { getCategories } from '@/services/db';

export default async function RootPage() {
  const categories = await getCategories();

  return (
    <div className="h-full p-4 pl-4 space-y-2">
      <SearchInput />
      {categories && <Categories data={categories} />}
    </div>
  );
}
