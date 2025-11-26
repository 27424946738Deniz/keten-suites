"use client";

import * as React from "react";
import { UnitCard } from "./unit-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Home } from "lucide-react";

interface Unit {
  id: string;
  unit_name: string;
  unit_type: string;
  capacity: number;
  base_price_per_month: number;
  short_description?: string;
  available?: boolean;
  features?: {
    squareFootage?: number;
    bedrooms?: number;
    bathrooms?: number;
    floor?: string;
  };
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
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <Home className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Daire Bulunamadı
          </h3>
          <p className="max-w-sm text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            imageUrl={unit.images?.[0]?.url}
            imageAlt={unit.images?.[0]?.alt_text}
            horizontal
          />
        ))}
      </div>
    </div>
  );
};

export const UnitListSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="overflow-hidden rounded-2xl border shadow-sm">
          <div className="flex flex-col md:flex-row">
            <Skeleton className="aspect-[4/3] w-full md:h-[220px] md:w-[320px]" />
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="mb-2 h-7 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="mb-4 h-12 w-full" />
              <div className="flex gap-6">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
