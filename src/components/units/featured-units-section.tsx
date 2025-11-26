"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UnitCard } from "./unit-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { unitsMockData } from "@/data/units-mock";

export const FeaturedUnitsSection = () => {
  const [units, setUnits] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Use mock data directly for static site
    setUnits(unitsMockData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
              Daire Tiplerimiz
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              İhtiyaçlarınıza uygun modern yaşam alanlarını keşfedin
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            Daire Tiplerimiz
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
            İhtiyaçlarınıza uygun modern yaşam alanlarını keşfedin
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-10 md:px-14">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {units.map((unit) => (
                <CarouselItem
                  key={unit.id}
                  className="pl-3 sm:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <UnitCard
                      unit={unit}
                      imageUrl={unit.images?.[0]?.url}
                      imageAlt={unit.images?.[0]?.alt_text}
                      className="h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 hidden h-10 w-10 border-gray-200 bg-white shadow-md hover:bg-gray-50 sm:-left-5 sm:flex md:-left-7" />
            <CarouselNext className="-right-3 hidden h-10 w-10 border-gray-200 bg-white shadow-md hover:bg-gray-50 sm:-right-5 sm:flex md:-right-7" />
          </Carousel>
        </div>

        <div className="mt-8 text-center sm:mt-10 md:mt-12">
          <Button
            asChild
            size="lg"
            className="bg-black px-6 text-white hover:bg-gray-800 sm:px-8"
          >
            <Link href="/units">Tüm Daireleri Görüntüle</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
