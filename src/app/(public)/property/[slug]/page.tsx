import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { propertiesMockData } from "@/data/properties-mock";
import { ImageGallery } from "@/components/property/image-gallery";
import { AmenitiesList } from "@/components/property/amenities-list";
import { AvailabilityCalendar } from "@/components/property/availability-calendar";
import { PricingCalculator } from "@/components/property/pricing-calculator";
import { Map } from "@/components/shared/map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ShareButton } from "@/components/shared/share-button";

// Static export için tüm slug'ları generate et
export async function generateStaticParams() {
  return propertiesMockData.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const property = propertiesMockData.find((p) => p.slug === slug);
  if (property) {
    return {
      title: `${property.name} | Keten`,
      description: property.short_description || property.description || "",
    };
  }
  return {
    title: "Property | Keten",
  };
}

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  const property = propertiesMockData.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const images = property.images || [];
  const amenities =
    property.property_amenities?.map((pa: any) => ({
      amenity: pa.amenity,
    })) || [];

  return (
    <div className="container py-6 md:py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-4xl font-bold">{property.name}</h1>
        {property.short_description && (
          <p className="text-lg text-muted-foreground">
            {property.short_description}
          </p>
        )}
        {property.address && (
          <p className="mt-2 text-sm text-muted-foreground">{property.address}</p>
        )}
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mb-8">
          <ImageGallery images={images} />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
              <TabsTrigger value="transportation">Transportation</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: property.description || "No description available.",
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="neighborhood" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Neighborhood information coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transportation" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Transportation information coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div>
              <AmenitiesList amenities={amenities} />
            </div>
          )}

          {/* Map */}
          {property.latitude && property.longitude && (
            <div>
              <Map
                latitude={Number(property.latitude)}
                longitude={Number(property.longitude)}
                address={property.address}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky Booking Card */}
          <div className="sticky top-20 space-y-6">
            {/* Pricing Calculator */}
            {property.units && property.units.length > 0 && property.units[0].base_price_per_month ? (
              <PricingCalculator
                basePricePerMonth={Number(property.units[0].base_price_per_month)}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Pricing information will be available soon. Please contact us for details.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Availability Calendar */}
            <AvailabilityCalendar propertyId={property.id} />

            {/* Book Now CTA */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to Book?</CardTitle>
                <CardDescription>
                  Check availability and reserve your stay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/booking?property=${property.id}`}>
                    Book Now
                  </Link>
                </Button>
                <ShareButton
                  title={property.name}
                  text={property.short_description || ""}
                  url={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/property/${property.slug}`}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

