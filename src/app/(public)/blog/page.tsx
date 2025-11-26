import { blogPostsMockData } from "@/data/blog-mock";
import { BlogCard } from "@/components/blog/blog-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Keten Suites",
  description: "İstanbul'da yaşam, konaklama ve iş seyahati hakkında ipuçları ve rehberler.",
};

export default function BlogPage() {
  const posts = blogPostsMockData;

  // Get unique categories from static data
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  ) as string[];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Blog
          </h1>
          <p className="text-lg text-gray-400">
            İstanbul&apos;da yaşam, konaklama ve iş seyahati hakkında ipuçları ve rehberler
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                Henüz blog yazısı bulunmamaktadır. Yakında yeni içerikler eklenecek!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
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
          )}
        </div>
      </section>
    </div>
  );
}
