import * as React from "react";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Search Results | Keten",
  description: "Search for available properties",
};

export default function SearchPage() {
  return (
    <div className="container py-6 md:py-10">
      <h1 className="mb-6 text-3xl font-bold">Arama Sonuçları</h1>
      
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

const SearchResultsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

