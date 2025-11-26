"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/1729084042_14BPRAW6MG_medium.jpg",
    title: "Kurumsal Müşteriler",
    points: [
      "Kolay rezervasyon süreci ile İstanbul'un merkezinde 38+ kurumsal daireye erişim.",
      "Şirketinizin ihtiyaçlarına özel çözümler, kendi hesap yöneticiniz ve esnek konaklama süreleri.",
    ],
  },
  {
    id: 2,
    image: "/1729079653_XUWQKFQN04_medium.jpg",
    title: "İş Seyahati Yapanlar",
    points: [
      "4.000'den fazla lider şirket, KOBİ ve STK'dan iş profesyonelleriyle aynı ortamda olun.",
      "İş merkezlerine yakın premium lokasyonlarda yaşayın; yüksek hızlı internet ve evden çalışma paketi ile konforlu çalışın.",
    ],
  },
  {
    id: 3,
    image: "/1729086563_YZCWXUXA3A_medium.jpg",
    title: "Dijital Göçebeler",
    points: [
      "Otel masraflarından tasarruf ederek şirketinizin seyahat bütçesini optimize edin.",
      "Kurumsal fiyatlandırma ve enterprise müşterilerimize özel kişiselleştirilmiş hizmetlerden yararlanın.",
    ],
  },
];

export function BusinessSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20">
      {/* Header */}
      <div className="container mx-auto mb-8 px-4 text-center sm:mb-10 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Keten Suites Farklı İhtiyaçlara
          <br />
          Çözüm Sunuyor
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Slides Container */}
        <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[2.5/1] md:aspect-[3/1]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                index === currentSlide
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Info Card */}
              <div className="absolute bottom-4 right-4 w-[280px] rounded-xl bg-white p-5 shadow-xl sm:bottom-8 sm:right-8 sm:w-[320px] sm:p-6 md:bottom-12 md:right-12 md:w-[380px] md:p-8">
                <p className="mb-2 text-xs text-gray-500 sm:text-sm">
                  {index + 1}/{slides.length}
                </p>
                <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl md:text-2xl">
                  {slide.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {slide.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white sm:left-4 sm:p-3"
          aria-label="Önceki"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white sm:right-4 sm:p-3"
          aria-label="Sonraki"
        >
          <ChevronRight className="h-5 w-5 text-gray-800 sm:h-6 sm:w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentSlide
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

