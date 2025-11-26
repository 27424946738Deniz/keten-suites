import { notFound } from "next/navigation";
import { blogPostsMockData } from "@/data/blog-mock";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogCard } from "@/components/blog/blog-card";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/components/shared/share-button";
import type { Metadata } from "next";

// Static export için tüm slug'ları generate et
export async function generateStaticParams() {
  return blogPostsMockData.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const post = blogPostsMockData.find((p) => p.slug === slug);
  if (post) {
    return {
      title: `${post.title} | Keten Blog`,
      description: post.excerpt || "",
    };
  }
  return {
    title: "Blog Post | Keten",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = blogPostsMockData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPostsMockData
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="container py-10">
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          {post.category && (
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
          )}
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author_name && (
              <div>
                <span className="font-medium">By {post.author_name}</span>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.published_at), "MMMM dd, yyyy")}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </div>
            <ShareButton
              title={post.title}
              text={post.excerpt || ""}
              url={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/blog/${post.slug}`}
            />
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <BlogContent content={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t pt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  slug={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  featuredImageUrl={relatedPost.featured_image_url}
                  category={relatedPost.category}
                  publishedAt={relatedPost.published_at}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

