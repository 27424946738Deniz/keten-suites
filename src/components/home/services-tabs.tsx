"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 0,
    icon: "🏠",
    title: "Fonksiyonel Konfor",
    description:
      "Her dairemiz, günlük yaşamınızı kolaylaştırmak için akıllıca tasarlanmış modern mobilyalar ve tam donanımlı mutfaklar sunuyor.",
    images: [
      "/1729079653_XUWQKFQN04_medium.jpg",
      "/1729079829_G88KISGAH3_medium.jpg",
    ],
  },
  {
    id: 1,
    icon: "🌳",
    title: "Bina Hizmetleri",
    description:
      "24 saat güvenlik, temizlik hizmeti, çamaşırhane ve fitness merkezi gibi premium bina olanakları ile yaşamınızı kolaylaştırıyoruz.",
    images: [
      "/1729086563_YZCWXUXA3A_medium.jpg",
      "/1729084042_14BPRAW6MG_medium.jpg",
    ],
  },
  {
    id: 2,
    icon: "📍",
    title: "Merkezi Lokasyon",
    description:
      "İstanbul'un en prestijli noktalarında, toplu taşımaya yakın, restoran ve alışveriş merkezlerine yürüme mesafesinde konumlanıyoruz.",
    images: [
      "/1729083986_A6WDV4VDKB_medium.jpg",
      "/1729079653_XUWQKFQN04_medium.jpg",
    ],
  },
  {
    id: 3,
    icon: "🎯",
    title: "Yaşam Olanakları",
    description:
      "Yüksek hızlı WiFi, akıllı TV, klima ve çalışma alanları ile hem iş hem de tatil için ideal bir konaklama deneyimi sunuyoruz.",
    images: [
      "/1729079829_G88KISGAH3_medium.jpg",
      "/1729086563_YZCWXUXA3A_medium.jpg",
    ],
  },
];

export function ServicesTabs() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            Neden Keten Suites&apos;i Seçmelisiniz?
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Konaklamanızı keyifli bir deneyime dönüştürmek için tasarlanmış
            Keten Suites daireleri sizi bekliyor.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:gap-3 md:grid-cols-4 md:gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-3 transition-all sm:gap-2 sm:rounded-xl sm:p-4 md:p-6",
                  activeTab === service.id
                    ? "scale-[1.02] bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                <span className="text-2xl sm:text-3xl">{service.icon}</span>
                <span className="text-center text-xs font-medium sm:text-sm">
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Images */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {services[activeTab].images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl"
                >
                  <Image
                    src={image}
                    alt={`${services[activeTab].title} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 text-4xl sm:mb-4 sm:text-5xl">
                {services[activeTab].icon}
              </div>
              <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
                {services[activeTab].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {services[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
