import * as React from "react";
import { UnitCard } from "./unit-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Unit {
  id: string;
  unit_name: string;
  unit_type: string;
  capacity: number;
  base_price_per_month: number;
  available?: boolean;
  images?: Array<{
    url: string;
    alt_text: string;
  }>;
}

interface UnitListProps {
  units: Unit[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export const UnitList = ({
  units,
  isLoading = false,
  emptyMessage = "Şu anda müsait daire bulunmamaktadır.",
  className,
}: UnitListProps) => {
  if (isLoading) {
    return <UnitListSkeleton />;
  }

  if (units.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {units.map((unit) => (
          <UnitCard 
            key={unit.id} 
            unit={unit}
            imageUrl={unit.images?.[0]?.url}
            imageAlt={unit.images?.[0]?.alt_text}
          />
        ))}
      </div>
    </div>
  );
};

export const UnitListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
};

