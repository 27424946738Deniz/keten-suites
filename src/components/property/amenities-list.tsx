"use client";

import * as React from "react";
import {
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  Tv,
  Wind,
  Shield,
  Key,
  MapPin,
  Building,
  Coffee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Amenity {
  id: string;
  name: string;
  icon?: string | null;
  category?: string | null;
}

interface AmenitiesListProps {
  amenities: Array<{
    amenity: Amenity;
  }>;
  className?: string;
}

// Icon mapping for amenities
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  internet: Wifi,
  parking: Car,
  kitchen: UtensilsCrossed,
  gym: Dumbbell,
  pool: Waves,
  tv: Tv,
  ac: Wind,
  security: Shield,
  furnished: Key,
  location: MapPin,
  building: Building,
  coffee: Coffee,
};

const getIcon = (iconName: string | null | undefined) => {
  if (!iconName) return Building;
  const normalizedName = iconName.toLowerCase().replace(/\s+/g, "_");
  return iconMap[normalizedName] || Building;
};

export const AmenitiesList = ({ amenities, className }: AmenitiesListProps) => {
  // Group amenities by category
  const groupedAmenities = React.useMemo(() => {
    const groups: Record<string, Amenity[]> = {
      basic: [],
      premium: [],
      location: [],
      other: [],
    };

    amenities.forEach(({ amenity }) => {
      const category = amenity.category || "other";
      if (groups[category]) {
        groups[category].push(amenity);
      } else {
        groups.other.push(amenity);
      }
    });

    return groups;
  }, [amenities]);

  if (!amenities.length) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No amenities listed</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(groupedAmenities).map(
        ([category, items]) =>
          items.length > 0 && (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">{category} Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((amenity) => {
                    const IconComponent = getIcon(amenity.icon);
                    return (
                      <div
                        key={amenity.id}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )
      )}
    </div>
  );
};

