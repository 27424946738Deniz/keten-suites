import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Home, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitCardProps {
  unit: {
    id: string;
    unit_name: string;
    unit_type: string;
    capacity: number;
    base_price_per_month: number;
    available?: boolean;
  };
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
  className?: string;
}

export const UnitCard = ({ unit, imageUrl, imageAlt, slug, className }: UnitCardProps) => {
  const unitSlug = slug || unit.unit_name.toLowerCase().replace(/\s+/g, "-").replace(/\+/g, "-plus-");
  const finalImageUrl = imageUrl || "/placeholder-unit.jpg";
  const available = unit.available !== false;

  // Format price with Turkish Lira
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-lg", !available && "opacity-75", className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={finalImageUrl}
          alt={imageAlt || unit.unit_name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          {available ? (
            <Badge className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Müsait
            </Badge>
          ) : (
            <Badge variant="secondary">
              <XCircle className="mr-1 h-3 w-3" />
              Dolu
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            <Home className="mr-1 h-3 w-3" />
            {unit.unit_type}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{unit.capacity} Kişi</span>
          </div>
        </div>
        <CardTitle className="line-clamp-1">{unit.unit_name}</CardTitle>
        <CardDescription className="mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(unit.base_price_per_month)}
            </span>
            <span className="text-xs text-muted-foreground">Aylık</span>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Button asChild className="w-full" variant={available ? "default" : "outline"}>
          <Link href={`/units/${unitSlug}`}>
            {available ? "Detayları Gör" : "Daha Fazla Bilgi"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

