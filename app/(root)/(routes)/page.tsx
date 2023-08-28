import SearchInput from "@/components/search-input";
import { UserButton } from "@clerk/nextjs";

export default function RootPage() {
  return (
    <div className="h-full p-4 pl-8 space-y-2">
      <SearchInput />
    </div>
  );
}