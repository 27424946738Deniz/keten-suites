import { notFound } from "next/navigation";
import { unitsMockData } from "@/data/units-mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  Maximize,
  BedDouble,
  Bath,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Check,
  Wifi,
  Wind,
  Tv,
  UtensilsCrossed,
  Car,
  Shield,
  Building2,
  CalendarDays,
  Layers,
  Compass,
  Sofa,
  Droplets,
  Lock,
  Eye,
  Flame,
  Volume2,
  Dumbbell,
  Coffee,
  Headphones,
  PawPrint,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react";
import { UnitDetailGallery } from "@/components/units/unit-detail-gallery";
import type { Metadata } from "next";

// Static export için tüm slug'ları generate et
export async function generateStaticParams() {
  return unitsMockData.map((unit) => ({
    slug: unit.slug,
  }));
}

interface UnitPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: UnitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = unitsMockData.find((u) => u.slug === slug);
  
  if (unit) {
    return {
      title: `${unit.unit_name} | Keten Suites`,
      description: `${unit.short_description || unit.unit_name} - ${unit.capacity} kişilik, aylık ${unit.base_price_per_month}₺`,
    };
  }
  return {
    title: "Daire | Keten Suites",
  };
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { slug } = await params;

  const unit = unitsMockData.find((u) => u.slug === slug);

  if (!unit) {
    notFound();
  }

  // Keten'deki fotoğraflar
  const galleryImages = [
    "/1729079653_XUWQKFQN04_medium.jpg",
    "/1729079829_G88KISGAH3_medium.jpg",
    "/1729083986_A6WDV4VDKB_medium.jpg",
    "/1729084042_14BPRAW6MG_medium.jpg",
    "/1729086563_YZCWXUXA3A_medium.jpg",
    "/keten dışarıdan arka plan.jpg",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Daire detayları - Nook tarzı
  const squareMeters = unit.features?.squareFootage || 50;
  const netSquareMeters = Math.round(squareMeters * 0.84);
  const bedrooms = unit.features?.bedrooms || 1;
  const bathrooms = unit.features?.bathrooms || 1;
  const floor = unit.unit_type.includes("duplex") ? "3-4" : (bedrooms === 1 ? "2" : "3");
  
  // Fiyat hesaplamaları
  const monthlyPrice = unit.base_price_per_month;
  const longTermPrice = Math.round(monthlyPrice * 0.85); // %15 indirim
  const shortTermPrice = Math.round(monthlyPrice * 1.2); // %20 fazla

  // Bina özellikleri
  const buildingFeatures = [
    { icon: Building2, name: "2 Asansör" },
    { icon: Eye, name: "7/24 Gözetim" },
    { icon: Layers, name: "Çift Camlı Pencereler" },
    { icon: Tv, name: "Full HD Akıllı TV" },
    { icon: Wind, name: "Klima" },
    { icon: Lock, name: "Kod Anahtarı" },
    { icon: Droplets, name: "Merkezi Yerden Isıtma" },
    { icon: Layers, name: "Parke Zeminler" },
    { icon: Volume2, name: "Ses Yalıtımı" },
    { icon: Flame, name: "Yangın Yalıtımı" },
    { icon: Shield, name: "Yangına Dayanıklı Kapılar" },
    { icon: Wifi, name: "Yüksek Hızlı İnternet" },
  ];

  // Yaşam alanları / Hizmetler
  const lifestyleServices = [
    { icon: Car, name: "Özel Park Alanı" },
    { icon: Dumbbell, name: "GYM" },
    { icon: Coffee, name: "Dinlenme Alanı" },
    { icon: Headphones, name: "Ortak Çalışma Alanı" },
    { icon: Coffee, name: "Cafe Bar" },
    { icon: Users, name: "Danışma" },
    { icon: Sparkles, name: "Temizlik Hizmeti" },
    { icon: BedDouble, name: "Nevresim ve Havlular" },
    { icon: Shield, name: "Bakım Hizmetleri" },
    { icon: Users, name: "Misafir İlişkileri" },
    { icon: PawPrint, name: "Evcil Hayvan Dostu" },
  ];

  return (
    <div className="flex flex-col">
      {/* Image Gallery - Client Component */}
      <UnitDetailGallery unitName={unit.unit_name} images={galleryImages} />

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700">
                  Anasayfa
        </Link>
        <span>/</span>
                <Link href="/units" className="hover:text-gray-700">
          Daireler
        </Link>
        <span>/</span>
                <span className="text-gray-700">{unit.unit_name}</span>
      </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                    {unit.unit_name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Nişantaşı, Şişli, İstanbul</span>
                  </div>
                </div>
                <Badge className="bg-black text-white hover:bg-gray-800">
                  {unit.unit_type
                    .replace(/-/g, " ")
                    .replace(/economy/i, "Economy")
                    .replace(/premium/i, "Premium")}
          </Badge>
              </div>
        </div>
        
            {/* Genel Bakış - Nook Style */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Genel Bakış</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Yatak Odaları</p>
                  <BedDouble className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">{bedrooms}</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Banyolar</p>
                  <Bath className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">{bathrooms}</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Kapasite</p>
                  <Users className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">{unit.capacity}</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Min. Konaklama</p>
                  <CalendarDays className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">100 gün</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Garaj</p>
                  <Car className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">1</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Alan</p>
                  <Maximize className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">{squareMeters} m²</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Kat</p>
                  <Layers className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">{floor}. Kat</p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">Yapım Yılı</p>
                  <Building2 className="mx-auto mb-2 h-6 w-6 text-gray-900" />
                  <p className="text-xl font-bold">2025</p>
                </div>
              </div>
          </div>

            {/* Fiyat Detayları - Nook Style */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Fiyat Detayları</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Avantajlı Fiyat */}
                <div className="rounded-xl border bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Avantajlı Fiyat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-gray-900" />
                      <span className="text-gray-700">
                        Peşin Ödeme 6-11 Ay: <strong>{formatPrice(longTermPrice)}₺</strong> (aylık)
                      </span>
          </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-gray-900" />
                      <span className="text-gray-700">
                        Aylık Ödeme 6-11 Ay: <strong>{formatPrice(monthlyPrice)}₺</strong> (aylık)
                      </span>
          </div>
        </div>
      </div>

                {/* Standart Fiyat */}
                <div className="rounded-xl border bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Standart Fiyat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-gray-900" />
                      <span className="text-gray-700">
                        Kısa Süreli Kiralama 3-6 Ay: <strong>{formatPrice(shortTermPrice)}₺</strong> (aylık)
                      </span>
                    </div>
            </div>
          </div>
      </div>

              {/* Fiyat Notları */}
              <div className="mt-4 rounded-xl bg-gray-100 p-4">
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
                    Aylık fiyatlar 30 gün üzerinden hesaplanmıştır, aylara göre değişiklik gösterebilir.
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
                    Kısa dönem kiralama süresi en az 3 ay 10 gündür.
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
                    2 Aylık depozito bedeli giriş sırasında alınır, çıkış sırasında iade edilir.
                  </li>
                </ul>
              </div>
            </div>

            {/* Ekstra Ücretler - Nook Style */}
            <div>
              <h2 className="mb-4 text-xl font-bold">Ekstra Ücretler</h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Tüketim Bedeli: <span className="text-gray-900">(gecelik)</span></p>
                  <p className="text-lg font-semibold">400₺</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Temizlik Bedeli: <span className="text-gray-900">(gecelik)</span></p>
                  <p className="text-lg font-semibold">333₺</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hizmet Bedeli: <span className="text-gray-900">(gecelik)</span></p>
                  <p className="text-lg font-semibold">1.750₺</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">KDV: <span className="text-gray-900">(%)</span></p>
                  <p className="text-lg font-semibold">20</p>
                </div>
              </div>
            </div>

            {/* Daire Detayları - Nook Style Table */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Daire Detayları</h2>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="bg-gray-50 px-4 py-3 font-medium">BRÜT m²:</td>
                      <td className="px-4 py-3">{squareMeters} m²</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">NET m²:</td>
                      <td className="px-4 py-3 text-gray-900">{netSquareMeters} m²</td>
                    </tr>
                    <tr className="border-b">
                      <td className="bg-gray-50 px-4 py-3 font-medium">MOBİLYA:</td>
                      <td className="px-4 py-3">Tam donanımlı mobilyalı daire</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">ODA 1:</td>
                      <td className="px-4 py-3 text-gray-900">
                        {bedrooms >= 2 ? "2 kişilik yataklı 1 büyük yatak odası" : "1 kişilik yataklı yatak odası"}
                      </td>
                    </tr>
                    {bedrooms >= 2 && (
                      <tr className="border-b bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">ODA 2:</td>
                        <td className="px-4 py-3 text-gray-900">1 kişilik yataklı 1 yatak odası</td>
                      </tr>
                    )}
                    {unit.unit_type.includes("duplex") && (
                      <tr className="border-b">
                        <td className="bg-gray-50 px-4 py-3 font-medium">GİYİNME ODASI:</td>
                        <td className="px-4 py-3">1 giyinme odası</td>
                      </tr>
                    )}
                    <tr className="border-b">
                      <td className="bg-gray-50 px-4 py-3 font-medium">BANYO:</td>
                      <td className="px-4 py-3">{bathrooms} banyo</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">GARDIROP:</td>
                      <td className="px-4 py-3 text-gray-900">Gardırop</td>
                    </tr>
                    <tr className="border-b">
                      <td className="bg-gray-50 px-4 py-3 font-medium">MUTFAK:</td>
                      <td className="px-4 py-3">Mutfak ve üst düzey elektrikli aletler</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">BEYAZ EŞYA:</td>
                      <td className="px-4 py-3 text-gray-900">Çamaşır makinası, kurutma makinası ve buzdolabı</td>
                    </tr>
                    <tr className="border-b">
                      <td className="bg-gray-50 px-4 py-3 font-medium">CEPHE:</td>
                      <td className="px-4 py-3">Kuzey cephe</td>
                    </tr>
                    {unit.unit_type.includes("duplex") && (
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">TERAS:</td>
                        <td className="px-4 py-3 text-gray-900">Özel teras</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bina Özellikleri - Nook Style Grid */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Bina Özellikleri</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {buildingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="h-5 w-5 shrink-0 text-gray-900" />
                    <span className="text-sm text-gray-700">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Yaşam Alanları / Hizmetler - Nook Style Grid */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Yaşam Alanları / Hizmetler</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {lifestyleServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 shrink-0 text-gray-900" />
                    <span className="text-sm text-gray-700">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

          {/* Location */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Konum</h2>
              <div className="rounded-xl border bg-gray-100 p-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-gray-900" />
                  <div>
                    <p className="font-medium">Nişantaşı, Şişli</p>
                    <p className="text-sm text-gray-500">İstanbul, Türkiye</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  İstanbul&apos;un en prestijli semtlerinden Nişantaşı&apos;nda, metro
                  istasyonuna 5 dakika yürüme mesafesinde, alışveriş merkezleri
                  ve restoranlara yakın konumda.
                </p>
              </div>
            </div>
        </div>

        {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden border-0 shadow-xl">
              {/* Price Header */}
              <div className="bg-black p-6 text-white">
                <p className="text-sm opacity-80">Aylık Kira</p>
                <p className="text-4xl font-bold">
                  {formatPrice(unit.base_price_per_month)}₺
                </p>
                <p className="mt-1 text-sm opacity-80">Minimum 100 gün</p>
              </div>

              <CardContent className="space-y-6 p-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <BedDouble className="mx-auto mb-1 h-5 w-5 text-gray-600" />
                    <p className="text-xs text-gray-500">Yatak</p>
                    <p className="font-bold">{bedrooms}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <Users className="mx-auto mb-1 h-5 w-5 text-gray-600" />
                    <p className="text-xs text-gray-500">Kapasite</p>
                    <p className="font-bold">{unit.capacity}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <Button asChild className="w-full bg-black hover:bg-gray-800" size="lg">
                  <Link href={`/booking?unit=${unit.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Rezervasyon Yap
                  </Link>
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:+905404906575">
                      <Phone className="mr-2 h-4 w-4" />
                      Ara
                    </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://api.whatsapp.com/send?phone=905404906575"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                </Button>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4">
                  <p className="mb-3 text-sm font-medium text-gray-500">
                    İletişim
                  </p>
                  <div className="space-y-2 text-sm">
                    <a
                      href="tel:+905404906575"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <Phone className="h-4 w-4" />
                      0540 490 65 75
                    </a>
                    <a
                      href="mailto:info@ketensuites.com"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <Mail className="h-4 w-4" />
                      info@ketensuites.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
