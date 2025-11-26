"use client";

import * as React from "react";
import Image from "next/image";
import { UnitList, UnitListSkeleton } from "@/components/units/unit-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Home, Filter } from "lucide-react";
import { unitsMockData } from "@/data/units-mock";

export default function UnitsPage() {
  const [units, setUnits] = React.useState<typeof unitsMockData>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [capacityFilter, setCapacityFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("price-asc");

  React.useEffect(() => {
    setIsLoading(true);

    // Use static mock data directly
    let unitsData = [...unitsMockData];

    // Apply type filter
    if (typeFilter !== "all") {
      unitsData = unitsData.filter((unit) => unit.unit_type === typeFilter);
    }

    // Apply capacity filter
    if (capacityFilter !== "all") {
      const minCap = parseInt(capacityFilter);
      unitsData = unitsData.filter((unit) => unit.capacity >= minCap);
    }

    // Apply sorting
    const sortedUnits = [...unitsData];
    switch (sortBy) {
      case "price-asc":
        sortedUnits.sort(
          (a, b) => a.base_price_per_month - b.base_price_per_month
        );
        break;
      case "price-desc":
        sortedUnits.sort(
          (a, b) => b.base_price_per_month - a.base_price_per_month
        );
        break;
      case "capacity-asc":
        sortedUnits.sort((a, b) => a.capacity - b.capacity);
        break;
      case "capacity-desc":
        sortedUnits.sort((a, b) => b.capacity - a.capacity);
        break;
      default:
        break;
    }

    setUnits(sortedUnits);
    setIsLoading(false);
  }, [typeFilter, capacityFilter, sortBy]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/1729083986_A6WDV4VDKB_medium.jpg"
            alt="Keten Suites Daireler"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Dairelerimiz
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            Keten Suites'te ihtiyaçlarınıza uygun daire tipini keşfedin. Modern
            tasarım, tam donanım ve merkezi konum.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-white py-6 shadow-sm">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Filtrele ve Sırala</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Unit Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Daire Tipi
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-50">
                  <Building className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                  <SelectValue placeholder="Tüm tipler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm tipler</SelectItem>
                  <SelectItem value="1+1-economy">1+1 Economy Suite</SelectItem>
                  <SelectItem value="1+1-premium">1+1 Premium Suite</SelectItem>
                  <SelectItem value="2+1-economy">2+1 Economy Suite</SelectItem>
                  <SelectItem value="2+1-family-duplex">
                    2+1 Family Duplex
                  </SelectItem>
                  <SelectItem value="3+1-family-duplex">
                    3+1 Family Duplex
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Capacity Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Kişi Sayısı
              </label>
              <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                <SelectTrigger className="bg-gray-50">
                  <Users className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                  <SelectValue placeholder="Tüm kapasiteler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm kapasiteler</SelectItem>
                  <SelectItem value="1">1+ Kişi</SelectItem>
                  <SelectItem value="2">2+ Kişi</SelectItem>
                  <SelectItem value="4">4+ Kişi</SelectItem>
                  <SelectItem value="5">5+ Kişi</SelectItem>
                  <SelectItem value="6">6+ Kişi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Daire Durumu
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-gray-50">
                  <Home className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="balkon">Balkon</SelectItem>
                  <SelectItem value="bahce">Bahçe</SelectItem>
                  <SelectItem value="teras">Teras</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sırala
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">
                    Fiyat: Düşükten Yükseğe
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Fiyat: Yüksekten Düşüğe
                  </SelectItem>
                  <SelectItem value="capacity-asc">
                    Kapasite: Azdan Çoğa
                  </SelectItem>
                  <SelectItem value="capacity-desc">
                    Kapasite: Çoktan Aza
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(typeFilter !== "all" || capacityFilter !== "all") && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                Aktif filtreler:
              </span>
              {typeFilter !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Tip: {typeFilter}
                </Badge>
              )}
              {capacityFilter !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Min. {capacityFilter} kişi
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Units Grid */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Units Count */}
          {!isLoading && units.length > 0 && (
            <div className="mb-6 text-center">
              <p className="text-lg font-medium">
                <span className="text-2xl font-bold text-black">
                  {units.length}
                </span>{" "}
                daire bulundu
              </p>
            </div>
          )}

          {/* Units List */}
          {isLoading ? (
            <UnitListSkeleton />
          ) : (
            <UnitList
              units={units}
              emptyMessage="Seçtiğiniz kriterlere uygun daire bulunamadı. Lütfen filtreleri değiştirin."
            />
          )}
        </div>
      </section>
    </div>
  );
}
