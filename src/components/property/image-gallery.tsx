"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: Array<{
    id: string;
    url: string;
    alt_text?: string | null;
    display_order?: number;
  }>;
  className?: string;
}

export const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  // Sort images by display_order
  const sortedImages = React.useMemo(
    () =>
      [...images].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
    [images]
  );

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? sortedImages.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === sortedImages.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    },
    [isLightboxOpen, selectedIndex]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!sortedImages.length) {
    return (
      <div className="flex h-96 items-center justify-center bg-muted">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const mainImage = sortedImages[0];
  const thumbnailImages = sortedImages.slice(1, 5);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={mainImage.url}
          alt={mainImage.alt_text || "Property image"}
          fill
          className="cursor-pointer object-cover transition-transform hover:scale-105"
          onClick={() => handleImageClick(0)}
          priority
        />
        {sortedImages.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {sortedImages.length} photos
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {thumbnailImages.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbnailImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted"
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                src={image.url}
                alt={image.alt_text || `Property image ${index + 2}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
          {sortedImages.length > 5 && (
            <div
              className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-black/50 text-white transition-colors hover:bg-black/70"
              onClick={() => handleImageClick(4)}
            >
              <span className="text-sm font-medium">
                +{sortedImages.length - 5} more
              </span>
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl p-0">
          {selectedIndex !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="relative aspect-video w-full">
                <Image
                  src={sortedImages[selectedIndex].url}
                  alt={
                    sortedImages[selectedIndex].alt_text ||
                    `Property image ${selectedIndex + 1}`
                  }
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {selectedIndex + 1} / {sortedImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

