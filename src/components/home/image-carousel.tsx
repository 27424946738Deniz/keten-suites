"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselImages = [
  {
    src: "/1729079653_XUWQKFQN04_medium.jpg",
    alt: "Keten Suites - Modern oturma odası",
  },
  {
    src: "/1729079829_G88KISGAH3_medium.jpg",
    alt: "Keten Suites - Şık yatak odası",
  },
  {
    src: "/1729086563_YZCWXUXA3A_medium.jpg",
    alt: "Keten Suites - Lüks banyo",
  },
  {
    src: "/1729084042_14BPRAW6MG_medium.jpg",
    alt: "Keten Suites - Geniş salon",
  },
  {
    src: "/1729083986_A6WDV4VDKB_medium.jpg",
    alt: "Keten Suites - Modern mutfak",
  },
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2
            className="mb-3 font-serif text-3xl italic sm:mb-4 sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Home, but better
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Keten Suites ile evinizin konforunu ve lüksünü keşfedin. Her detayda
            kalite ve zarafet.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-5xl">
          {/* Main Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-xl sm:aspect-[16/9] sm:rounded-2xl">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  index === currentIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white sm:left-4 sm:p-3"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white sm:right-4 sm:p-3"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
              {currentIndex + 1} / {carouselImages.length}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2 sm:mt-6">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-black sm:w-8"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
