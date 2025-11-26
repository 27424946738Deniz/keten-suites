"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitDetailGalleryProps {
  unitName: string;
  images: string[];
}

export function UnitDetailGallery({ unitName, images }: UnitDetailGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative">
      {/* Mobile Gallery */}
      <div className="relative h-[300px] w-full md:hidden">
        <Image
          src={images[currentImageIndex]}
          alt={unitName}
          fill
          className="object-cover"
          priority
        />
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        {/* Image Counter */}
        <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
        {/* Main Image */}
        <div className="relative col-span-2 row-span-2">
          <Image
            src={images[currentImageIndex]}
            alt={unitName}
            fill
            className="object-cover"
            priority
          />
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Side Images */}
        {images.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => setCurrentImageIndex(index + 1)}
          >
            <Image
              src={img}
              alt={`${unitName} - ${index + 2}`}
              fill
              className={cn(
                "object-cover transition-opacity hover:opacity-80",
                currentImageIndex === index + 1 && "ring-2 ring-black"
              )}
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span className="text-lg font-medium">
                  +{images.length - 5} Fotoğraf
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

