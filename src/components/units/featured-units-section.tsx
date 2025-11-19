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
    const fetchFeaturedUnits = async () => {
      try {
        const response = await fetch("/api/units");
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Show all units
          setUnits(result.data);
        } else {
          // Use mock data as fallback
          setUnits(unitsMockData);
        }
      } catch (error) {
        console.error("Error fetching featured units:", error);
        // Use mock data on error
        setUnits(unitsMockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedUnits();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Daire Tiplerimiz
            </h2>
            <p className="text-lg text-muted-foreground">
              İhtiyaçlarınıza uygun modern yaşam alanlarını keşfedin
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/30 py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Daire Tiplerimiz
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            İhtiyaçlarınıza uygun modern yaşam alanlarını keşfedin
          </p>
        </div>

        {/* Scrollable Carousel - Always active */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {units.map((unit) => (
                <CarouselItem key={unit.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
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
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-[#8ABFA3] hover:bg-[#7AB093] text-white">
            <Link href="/units">Tüm Daire Tiplerini Görüntüle</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

