import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { HeroSearchForm } from "@/components/search/hero-search-form";
import { FeaturedUnitsSection } from "@/components/units/featured-units-section";
import { Testimonial } from "@/components/shared/testimonial";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPostsMockData } from "@/data/blog-mock";
import { ImageCarousel } from "@/components/home/image-carousel";
import { ServicesTabs } from "@/components/home/services-tabs";
import { BusinessSlider } from "@/components/home/business-slider";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Home, Users } from "lucide-react";

export default async function HomePage() {
  const latestPosts = blogPostsMockData.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[85vh] min-h-[500px] max-h-[800px] flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/keten dışarıdan arka plan.jpg"
            alt="Keten Suites Building"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-16 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Keten Suites&apos;de
              <br />
              <span className="text-white/90">Evinizin Konforunu</span>
              <br />
              Yaşayın
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/80 sm:mt-3 sm:text-base">
              Modern tasarım ve şehir manzarasıyla, Keten Suites iş ve tatil
              seyahatleriniz için mükemmel konfor sunuyor.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="relative z-20 px-4 pb-4 sm:px-6 sm:pb-6 md:px-12 lg:px-20">
          <HeroSearchForm />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            {/* Text Content */}
            <div className="mb-10 text-center sm:mb-12 md:mb-16">
              <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                Keten Suites&apos;e Hoş Geldiniz
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Şehirdeki eviniz olarak tasarlanan Keten Suites&apos;te, modern yaşam
                deneyimini yeniden tanımlıyoruz. Özenle tasarlanmış yaşam
                alanlarımız konforu, işlevselliği ve tarzı bir araya getirerek
                nerede olursanız olun kendinizi evinizde hissetmenizi sağlıyor.
              </p>
              <div className="mt-6 sm:mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-black px-8 text-white hover:bg-gray-800"
                >
                  <Link href="/units">Daireleri Keşfet</Link>
                </Button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative">
              {/* Images */}
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg sm:rounded-2xl">
                  <Image
                    src="/1729084042_14BPRAW6MG_medium.jpg"
                    alt="Modern oturma odası"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg sm:rounded-2xl">
                  <Image
                    src="/1729083986_A6WDV4VDKB_medium.jpg"
                    alt="Şık salon"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
            {/* Stat 1 */}
            <Card className="border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-4 text-center sm:p-6">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 sm:mb-4 sm:h-12 sm:w-12">
                  <Heart className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
                </div>
                <div className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  %100
                </div>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                  Müşteri Memnuniyeti
                </p>
              </CardContent>
            </Card>

            {/* Stat 2 */}
            <Card className="border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-4 text-center sm:p-6">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 sm:mb-4 sm:h-12 sm:w-12">
                  <MapPin className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
                </div>
                <div className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  20+
                </div>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                  Seçkin Lokasyona Yakın
                </p>
              </CardContent>
            </Card>

            {/* Stat 3 */}
            <Card className="border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-4 text-center sm:p-6">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 sm:mb-4 sm:h-12 sm:w-12">
                  <Home className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
                </div>
                <div className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  87
                </div>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                  Mobilyalı Daire
                </p>
              </CardContent>
            </Card>

            {/* Stat 4 */}
            <Card className="border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-4 text-center sm:p-6">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 sm:mb-4 sm:h-12 sm:w-12">
                  <Users className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
                </div>
                <div className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  7/24
                </div>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                  Misafir Desteği
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Home, but better - Image Carousel */}
      <ImageCarousel />

      {/* Featured Units */}
      <FeaturedUnitsSection />

      {/* Business Slider - Blueground Style */}
      <BusinessSlider />

      {/* Services Tabs - Neden Seçmelisiniz */}
      <ServicesTabs />

      {/* Testimonials */}
      <section className="bg-gray-100 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl">
            Misafirlerimiz Ne Diyor?
          </h2>
          <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Testimonial
              name="Ayşe Yılmaz"
              role="İş Seyahati"
              rating={5}
              comment="İstanbul'da mükemmel bir konum. Temiz, rahat ve harika bir değer. Kesinlikle tavsiye ederim!"
            />
            <Testimonial
              name="Mehmet Demir"
              role="Dijital Göçebe"
              rating={5}
              comment="Orta vadeli konaklamalar için harika bir yer. Hızlı WiFi, modern olanaklar ve paranın karşılığını fazlasıyla veriyor."
            />
            <Testimonial
              name="Zeynep Kaya"
              role="Profesyonel"
              rating={5}
              comment="Harika bir mahallede güzel bir mülk. Rezervasyon süreci sorunsuz ve konaklama mükemmeldi."
            />
          </div>
        </div>
      </section>

      {/* Blog */}
      {latestPosts.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 text-center sm:mb-10 md:mb-12">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                Blogdan Son Yazılar
              </h2>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/blog">Tümünü Gör</Link>
              </Button>
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
