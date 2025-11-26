"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Maximize,
  BedDouble,
  Layers,
  MapPin,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitCardProps {
  unit: {
    id: string;
    unit_name: string;
    unit_type: string;
    capacity: number;
    base_price_per_month: number;
    short_description?: string;
    available?: boolean;
    slug?: string;
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
  };
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
  className?: string;
  horizontal?: boolean;
}

export const UnitCard = ({
  unit,
  imageUrl,
  imageAlt,
  slug,
  className,
  horizontal = false,
}: UnitCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const unitSlug =
    slug ||
    unit.slug ||
    unit.unit_name.toLowerCase().replace(/\s+/g, "-").replace(/\+/g, "-plus-");

  const images = unit.images || [];
  const finalImageUrl = imageUrl || images[0]?.url || "/1729079653_XUWQKFQN04_medium.jpg";
  const available = unit.available !== false;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const currentImage = images[currentImageIndex]?.url || finalImageUrl;

  // Get floor from unit type or features
  const floor = unit.features?.floor || (unit.unit_type.includes("duplex") ? "3" : "2");

  // Horizontal Layout (Nook style)
  if (horizontal) {
    return (
      <Card
        className={cn(
          "group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg",
          className
        )}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 md:aspect-auto md:h-auto md:w-[320px] lg:w-[380px]">
            <Link href={`/units/${unitSlug}`}>
              <Image
                src={currentImage}
                alt={imageAlt || unit.unit_name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Image Counters */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {images.length > 0 && (
                <div className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
                  <ImageIcon className="h-3 w-3" />
                  <span>{images.length}</span>
                </div>
              )}
              <div className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
                <Grid3X3 className="h-3 w-3" />
                <span>1</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-5 md:p-6">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Link href={`/units/${unitSlug}`}>
                    <h3 className="text-xl font-bold text-gray-900 transition-colors hover:text-gray-600 md:text-2xl">
                      {unit.unit_name}
                    </h3>
                  </Link>
                  <Badge
                    variant="outline"
                    className="border-gray-300 text-xs font-medium text-gray-600"
                  >
                    {unit.unit_type.includes("duplex") ? "Dubleks" : 
                     unit.unit_type.includes("1+1") ? "1+1" : 
                     unit.unit_type.includes("2+1") ? "2+1" : 
                     unit.unit_type.includes("3+1") ? "3+1" : "Daire"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Nişantaşı, İstanbul, Türkiye</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {formatPrice(unit.base_price_per_month)}₺
                </span>
                <span className="text-sm text-gray-500"> / Aylık</span>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed md:text-base">
              {unit.short_description || 
                `${unit.unit_name}, modern tasarımı ve konforlu yaşam alanlarıyla iş seyahatleri ve uzun dönem konaklamalar için ideal bir seçenek sunuyor. Tam donanımlı mutfak ve şık iç mekanlarıyla evinizin konforunu yaşayın.`}
            </p>

            {/* Meta Info - Nook Style */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 md:gap-6">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-gray-400" />
                <span>{unit.features?.bedrooms || 1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{unit.capacity}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-gray-400" />
                <span>{unit.features?.squareFootage || 50} m²</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-gray-400" />
                <span>{floor}. Kat</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Vertical Layout (Original)
  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all hover:shadow-xl sm:rounded-2xl",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Link href={`/units/${unitSlug}`}>
          <Image
            src={currentImage}
            alt={imageAlt || unit.unit_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 sm:p-2"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 sm:p-2"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white sm:bottom-3 sm:left-3 sm:py-1 sm:text-xs">
            <ImageIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>
              {currentImageIndex + 1}/{images.length || 1}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
          <Badge
            className={cn(
              "text-[10px] font-medium sm:text-xs",
              available
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-500 hover:bg-gray-600"
            )}
          >
            {available ? "Müsait" : "Dolu"}
          </Badge>
        </div>

        {/* Unit Type Badge */}
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-[10px] text-gray-800 hover:bg-white sm:text-xs"
          >
            {unit.unit_type
              .replace(/-/g, " ")
              .replace(/economy/i, "Economy")
              .replace(/premium/i, "Premium")}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Title & Location */}
        <div className="mb-2 sm:mb-3">
          <Link href={`/units/${unitSlug}`}>
            <h3 className="line-clamp-1 text-base font-bold text-gray-900 transition-colors hover:text-gray-600 sm:text-lg">
              {unit.unit_name}
            </h3>
          </Link>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 sm:mt-1 sm:text-sm">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Nişantaşı, İstanbul</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="mb-3 flex flex-wrap items-center gap-2 border-t border-b py-2 sm:mb-4 sm:gap-4 sm:py-3">
          {unit.features?.bedrooms && (
            <div className="flex items-center gap-1 text-gray-600">
              <BedDouble className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs font-medium sm:text-sm">
                {unit.features.bedrooms} Oda
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs font-medium sm:text-sm">
              {unit.capacity} Kişi
            </span>
          </div>
          {unit.features?.squareFootage && (
            <div className="flex items-center gap-1 text-gray-600">
              <Maximize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs font-medium sm:text-sm">
                {unit.features.squareFootage} m²
              </span>
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
              {formatPrice(unit.base_price_per_month)}₺
            </span>
            <span className="text-xs text-gray-500 sm:text-sm"> / Aylık</span>
          </div>
          <Button
            asChild
            className="shrink-0 bg-black text-xs text-white hover:bg-gray-800 sm:text-sm"
            size="sm"
          >
            <Link href={`/units/${unitSlug}`}>Detaylar</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
