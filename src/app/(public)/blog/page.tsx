import { getBlogPosts } from "@/lib/supabase/queries";
import { BlogCard } from "@/components/blog/blog-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Suspense } from "react";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

async function BlogList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  let posts;
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    posts = [];
  }

  // Filter by category if provided
  if (category) {
    posts = posts.filter((post) => post.category === category);
  }

  // Filter by search term if provided
  if (search) {
    const searchLower = search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          {search || category
            ? "No posts found matching your criteria."
            : "No blog posts available yet. Check back soon!"}
        </p>
      </div>
    );
  }

  return (
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
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;

  // Get unique categories
  let allPosts;
  try {
    allPosts = await getBlogPosts();
  } catch (error) {
    allPosts = [];
  }

  const categories = Array.from(
    new Set(allPosts.map((post) => post.category).filter(Boolean))
  ) as string[];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Discover tips, guides, and insights about housing and living in
          Istanbul
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search blog posts..."
            className="pl-10"
            defaultValue={search}
            name="search"
          />
        </div>

        {categories.length > 0 && (
          <Tabs defaultValue={category || "all"}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Blog Posts */}
      <Suspense
        fallback={
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        }
      >
        <BlogList category={category} search={search} />
      </Suspense>
    </div>
  );
}

