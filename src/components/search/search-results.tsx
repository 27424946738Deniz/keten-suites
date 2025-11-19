"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { UnitCard } from "@/components/units/unit-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { unitsMockData } from "@/data/units-mock";

interface UnitResult {
  id: string;
  unit_name: string;
  unit_type: string;
  capacity: number;
  base_price_per_month: number;
  available: boolean;
  images?: Array<{
    url: string;
    alt_text: string;
  }>;
  property?: {
    name: string;
    address: string;
  };
}

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const [units, setUnits] = React.useState<UnitResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const checkIn = searchParams.get("check_in");
  const checkOut = searchParams.get("check_out");
  const guests = searchParams.get("guests");
  const apartmentType = searchParams.get("type");

  React.useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      
      try {
        // Build query parameters
        const params = new URLSearchParams();
        
        if (checkIn && checkOut) {
          params.append("start_date", checkIn);
          params.append("end_date", checkOut);
        }
        
        if (guests) {
          params.append("min_capacity", guests);
        }
        
        if (apartmentType) {
          params.append("type", apartmentType);
        }

        // Fetch units with availability
        const response = await fetch(`/api/units?${params.toString()}`);
        const result = await response.json();

        let unitsData = [];

        if (result.success && result.data && result.data.length > 0) {
          unitsData = result.data;
        } else {
          // Use mock data as fallback
          console.log("Using mock data as fallback for search results");
          unitsData = unitsMockData.map(unit => ({
            ...unit,
            available: true, // Default to available for mock data
          }));
        }

        // Sort by availability (available first)
        const sortedUnits = unitsData.sort((a: UnitResult, b: UnitResult) => {
          if (a.available === b.available) return 0;
          return a.available ? -1 : 1;
        });

        setUnits(sortedUnits);
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Use mock data on error
        const mockUnits = unitsMockData.map(unit => ({
          ...unit,
          available: true,
        }));
        setUnits(mockUnits);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [checkIn, checkOut, guests, apartmentType]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Daireler aranıyor...</p>
        </div>
      </div>
    );
  }

  const availableUnits = units.filter((u) => u.available);
  const unavailableUnits = units.filter((u) => !u.available);

  return (
    <div className="space-y-8">
      {/* Search Info */}
      <div className="flex flex-wrap gap-3">
        {checkIn && checkOut && (
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(checkIn), "dd/MM/yyyy")} -{" "}
            {format(new Date(checkOut), "dd/MM/yyyy")}
          </Badge>
        )}
        {guests && (
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {guests} Kişi
          </Badge>
        )}
        {apartmentType && (
          <Badge variant="secondary" className="gap-1">
            {apartmentType.replace("-", " ")}
          </Badge>
        )}
      </div>

      {/* Available Units */}
      {availableUnits.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-green-600">
            ✓ Müsait Daireler ({availableUnits.length})
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableUnits.map((unit) => (
              <UnitCard 
                key={unit.id} 
                unit={unit}
                imageUrl={unit.images?.[0]?.url}
                imageAlt={unit.images?.[0]?.alt_text}
              />
            ))}
          </div>
        </div>
      )}

      {/* Unavailable Units */}
      {unavailableUnits.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-muted-foreground">
            ✕ Bu Tarihler İçin Müsait Olmayan Daireler ({unavailableUnits.length})
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unavailableUnits.map((unit) => (
              <UnitCard 
                key={unit.id} 
                unit={unit}
                imageUrl={unit.images?.[0]?.url}
                imageAlt={unit.images?.[0]?.alt_text}
              />
            ))}
          </div>
        </div>
      )}

      {units.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              Aradığınız kriterlere uygun daire bulunamadı.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

