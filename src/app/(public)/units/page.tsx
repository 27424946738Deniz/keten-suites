"use client";

import * as React from "react";
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
import { Building } from "lucide-react";
import { unitsMockData } from "@/data/units-mock";

export default function UnitsPage() {
  const [units, setUnits] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [capacityFilter, setCapacityFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("price-asc");

  React.useEffect(() => {
    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        
        if (typeFilter !== "all") {
          params.append("type", typeFilter);
        }
        
        if (capacityFilter !== "all") {
          params.append("min_capacity", capacityFilter);
        }

        const response = await fetch(`/api/units?${params.toString()}`);
        const result = await response.json();

        let unitsData = [];
        
        if (result.success && result.data && result.data.length > 0) {
          unitsData = result.data;
        } else {
          // Use mock data as fallback
          console.log("Using mock data as fallback");
          unitsData = unitsMockData;
        }

        // Apply type filter if using mock data
        if (typeFilter !== "all") {
          unitsData = unitsData.filter((unit: any) => unit.unit_type === typeFilter);
        }

        // Apply capacity filter if using mock data
        if (capacityFilter !== "all") {
          const minCap = parseInt(capacityFilter);
          unitsData = unitsData.filter((unit: any) => unit.capacity >= minCap);
        }

        // Apply sorting
        let sortedUnits = [...unitsData];
        switch (sortBy) {
          case "price-asc":
            sortedUnits.sort((a, b) => a.base_price_per_month - b.base_price_per_month);
            break;
          case "price-desc":
            sortedUnits.sort((a, b) => b.base_price_per_month - a.base_price_per_month);
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
      } catch (error) {
        console.error("Error fetching units:", error);
        // Use mock data on error
        setUnits(unitsMockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits();
  }, [typeFilter, capacityFilter, sortBy]);

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold">Daire Tiplerimiz</h1>
        <p className="text-lg text-muted-foreground">
          Keten Suites'te ihtiyaçlarınıza uygun daire tipini keşfedin
        </p>
      </div>

      {/* Filters and Sort */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Unit Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Daire Tipi</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Building className="mr-2 h-4 w-4 shrink-0" />
                  <SelectValue placeholder="Tüm tipler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm tipler</SelectItem>
                  <SelectItem value="1+1-economy">1+1 Economy Suite</SelectItem>
                  <SelectItem value="1+1-premium">1+1 Premium Suite</SelectItem>
                  <SelectItem value="2+1-economy">2+1 Economy Suite</SelectItem>
                  <SelectItem value="2+1-family-duplex">2+1 Family Duplex</SelectItem>
                  <SelectItem value="3+1-family-duplex">3+1 Family Duplex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Capacity Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Minimum Kapasite</label>
              <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                <SelectTrigger>
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

            {/* Sort */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Sırala</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Fiyat: Düşükten Yükseğe</SelectItem>
                  <SelectItem value="price-desc">Fiyat: Yüksekten Düşüğe</SelectItem>
                  <SelectItem value="capacity-asc">Kapasite: Azdan Çoğa</SelectItem>
                  <SelectItem value="capacity-desc">Kapasite: Çoktan Aza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(typeFilter !== "all" || capacityFilter !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Aktif filtreler:</span>
              {typeFilter !== "all" && (
                <Badge variant="secondary">Tip: {typeFilter}</Badge>
              )}
              {capacityFilter !== "all" && (
                <Badge variant="secondary">Min. {capacityFilter} kişi</Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Units Count */}
      {!isLoading && units.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {units.length} daire bulundu
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
  );
}

