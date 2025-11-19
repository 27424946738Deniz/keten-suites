import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Testimonial } from "@/components/shared/testimonial";
import { BlogCard } from "@/components/blog/blog-card";
import { PropertySearch } from "@/components/search/property-search";
import { FeaturedUnitsSection } from "@/components/units/featured-units-section";
import { getBlogPosts } from "@/lib/supabase/queries";
import { getAllProperties } from "@/lib/supabase/queries";
import Image from "next/image";

export default async function HomePage() {
  // Fetch latest blog posts and properties
  let latestPosts = [];
  let properties = [];

  try {
    latestPosts = await getBlogPosts(3);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  try {
    properties = await getAllProperties();
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  const mainProperty = properties[0];
  const heroImage = mainProperty?.images?.[0]?.url;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/keten dışarıdan arka plan.jpg"
            alt="Keten Suites Building"
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
              Lüks ve Konforlu Konaklamayı Keşfedin
            </h1>
            <p className="mb-12 text-base text-white/90 drop-shadow-lg md:text-lg lg:text-xl">
              Nefes kesici manzaralardan zarif mobilyalara kadar, dairelerimiz lüks kavramını yeniden tanımlıyor ve benzersiz bir deneyim sunuyor.
            </p>
            {/* Search Bar in Hero */}
            <div className="mx-auto max-w-6xl">
              <PropertySearch />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                Nook'a Hoş Geldiniz – Şehirdeki Eviniz
              </h2>
              <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
                Nook'ta, rezidans daire deneyimini yeniden tanımlıyoruz. Özenle tasarlanmış yaşam alanlarımız konforu, işlevselliği ve tarzı bir araya getirerek nerede olursanız olun kendinizi evinizde hissetmenizi sağlıyor. Üç ay kalın ya da bir yıl, her Nook dairesi yaşama hazır.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-[#8ABFA3] hover:bg-[#7AB093] text-white">
                  <Link href="/units">Daireleri Keşfet</Link>
                </Button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative mt-16 grid gap-6 md:grid-cols-2">
              {/* Comfort is Home Text Overlay */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="font-serif text-4xl italic text-white drop-shadow-2xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'Georgia, serif' }}>
                  Comfort is Home
                </h3>
              </div>

              {/* Left Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/1729084042_14BPRAW6MG_medium.jpg"
                  alt="Modern apartment living room with balcony"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/1729083986_A6WDV4VDKB_medium.jpg"
                  alt="Spacious apartment dining and living area"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 */}
            <Card className="border-0 bg-[#FFF8E1] shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div className="mb-2 text-4xl font-bold">%100</div>
                <p className="text-sm font-medium text-muted-foreground">
                  Müşteri Memnuniyet Oranı
                </p>
              </CardContent>
            </Card>

            {/* Stat 2 */}
            <Card className="border-0 bg-[#E0F2F1] shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="mb-2 text-4xl font-bold">20+</div>
                <p className="text-sm font-medium text-muted-foreground">
                  İstanbul'un Seçkin Lokasyonlarına Yakınlık
                </p>
              </CardContent>
            </Card>

            {/* Stat 3 */}
            <Card className="border-0 bg-[#E3F2FD] shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div className="mb-2 text-4xl font-bold">38</div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tam Donanımlı Mobilyalı Daire
                </p>
              </CardContent>
            </Card>

            {/* Stat 4 */}
            <Card className="border-0 bg-[#F3E5F5] shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="mb-2 text-4xl font-bold">7/24</div>
                <p className="text-sm font-medium text-muted-foreground">
                  Her Misafire Özel Destek
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Units Section */}
      <FeaturedUnitsSection />

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose Keten?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Modern Apartments</CardTitle>
                <CardDescription>
                  Contemporary, comfortable housing for everyone
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mid-Term Rentals</CardTitle>
                <CardDescription>
                  Flexible lease terms for professionals and digital nomads
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prime Location</CardTitle>
                <CardDescription>
                  Located in the heart of Istanbul with easy access to
                  everything
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Our Guests Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial
              name="Sarah Johnson"
              role="Resident"
              rating={5}
              comment="Perfect location in Istanbul. Clean, comfortable, and great value. Highly recommend!"
            />
            <Testimonial
              name="Michael Chen"
              role="Digital Nomad"
              rating={5}
              comment="Great place for mid-term stays. Fast WiFi, modern amenities, and excellent value for money."
            />
            <Testimonial
              name="Emma Williams"
              role="Professional"
              rating={5}
              comment="Beautiful property in a fantastic neighborhood. The booking process was smooth and the stay was perfect."
            />
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {latestPosts.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
              <Button asChild variant="outline">
                <Link href="/blog">View All</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => {
                const wordCount = post.content.split(/\s+/).length;
                const readingTime = Math.ceil(wordCount / 200);

                return (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    featuredImageUrl={post.featured_image_url}
                    category={post.category}
                    publishedAt={post.published_at}
                    readingTime={readingTime}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
