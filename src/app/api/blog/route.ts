import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/supabase/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let posts = await getBlogPosts(limit * page);

    // Filter by category if provided
    if (category) {
      posts = posts.filter((post) => post.category === category);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          page,
          limit,
          total: posts.length,
          totalPages: Math.ceil(posts.length / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

