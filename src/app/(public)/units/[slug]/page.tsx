import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getUnitBySlug } from "@/lib/supabase/queries";
import { AmenitiesList } from "@/components/property/amenities-list";
import { PricingCalculator } from "@/components/property/pricing-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Home, Users, Maximize, Layers } from "lucide-react";

export async function generateMetadata({
  params,
}: UnitPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const unit = await getUnitBySlug(slug);
    return {
      title: `${unit.unit_name} | Keten Suites`,
      description: `Modern ${unit.unit_name} - ${unit.capacity} kişilik, aylık ${unit.base_price_per_month}₺`,
    };
  } catch {
    return {
      title: "Unit | Keten Suites",
    };
  }
}

interface UnitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { slug } = await params;

  let unit;
  try {
    unit = await getUnitBySlug(slug);
  } catch (error) {
    console.error("Error fetching unit:", error);
    notFound();
  }

  if (!unit) {
    notFound();
  }

  // Extract amenities from property
  const amenities = unit.property?.property_amenities?.map((pa: any) => ({
    amenity: pa.amenity,
  })) || [];

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container py-6 md:py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/units" className="hover:text-foreground">
          Daireler
        </Link>
        <span>/</span>
        <span className="text-foreground">{unit.unit_name}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold">{unit.unit_name}</h1>
          <Badge variant="secondary" className="text-sm">
            <Home className="mr-1 h-3 w-3" />
            {unit.unit_type}
          </Badge>
        </div>
        
        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{unit.capacity} Kişi Kapasiteli</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>Modern Tasarım</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span>Tam Donanımlı</span>
          </div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="mb-8">
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-muted flex items-center justify-center">
            <div className="text-center">
              <Home className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Daire görselleri yakında eklenecek
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Daire Hakkında</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>
                  <strong>{unit.unit_name}</strong>, Keten Suites'in en popüler daire tiplerinden biridir.
                  {unit.capacity} kişilik kapasitesi ile {unit.unit_type.includes("duplex") ? "çift katlı" : "tek katlı"} modern
                  bir yaşam alanı sunar.
                </p>
                <p>
                  Tüm ihtiyaçlarınızı karşılayacak şekilde tasarlanmış dairemiz, modern mobilyalar ve
                  ekipmanlarla donatılmıştır. Konforlu yaşam alanları, tam donanımlı mutfak ve şık
                  banyo ile ev konforunu sizlere sunuyoruz.
                </p>
                {unit.unit_type.includes("duplex") && (
                  <p>
                    <strong>Duplex Özelliği:</strong> İki katlı tasarımı ile yatak odaları üst katta,
                    yaşam alanları alt katta konumlanmıştır. Özel terasınızda rahatça vakit
                    geçirebilir, İstanbul manzarasının keyfini çıkarabilirsiniz.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Özellikler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Kapasite</p>
                  <p className="text-2xl font-bold">{unit.capacity}</p>
                  <p className="text-xs text-muted-foreground">Kişi</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tip</p>
                  <p className="text-lg font-bold">{unit.unit_type}</p>
                  <p className="text-xs text-muted-foreground">Daire Tipi</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">İndirim</p>
                  <p className="text-2xl font-bold">%{unit.student_discount_percentage || 0}</p>
                  <p className="text-xs text-muted-foreground">Aylık Kirada</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div>
              <AmenitiesList amenities={amenities} />
            </div>
          )}

          {/* Location */}
          {unit.property && (
            <Card>
              <CardHeader>
                <CardTitle>Konum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {unit.property.address}
                  <br />
                  {unit.property.city}, {unit.property.country}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky Booking Card */}
          <div className="sticky top-20 space-y-6">
            {/* Pricing */}
            {unit.base_price_per_month ? (
              <PricingCalculator
                basePricePerMonth={Number(unit.base_price_per_month)}
                studentDiscountPercentage={
                  unit.student_discount_percentage
                    ? Number(unit.student_discount_percentage)
                    : 0
                }
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Fiyat Bilgisi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fiyat bilgisi için bizimle iletişime geçin.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Book Now CTA */}
            <Card>
              <CardHeader>
                <CardTitle>Rezervasyon Yapın</CardTitle>
                <CardDescription>
                  Bu daireyi hemen rezerve edin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-2 text-sm font-medium">Aylık Kira</p>
                  <p className="text-3xl font-bold">
                    {formatPrice(unit.base_price_per_month)}
                  </p>
                  {unit.student_discount_percentage > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      İndirimli fiyat:{" "}
                      <span className="font-semibold text-foreground">
                        {formatPrice(
                          unit.base_price_per_month -
                            (unit.base_price_per_month *
                              unit.student_discount_percentage) /
                              100
                        )}
                      </span>
                    </p>
                  )}
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href={`/booking?unit=${unit.id}`}>
                    Rezervasyon Yap
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">
                    İletişime Geç
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

