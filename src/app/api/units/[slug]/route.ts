import { NextRequest, NextResponse } from "next/server";
import { getUnitBySlug } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Unit slug is required",
        },
        { status: 400 }
      );
    }

    const unit = await getUnitBySlug(slug);

    if (!unit) {
      return NextResponse.json(
        {
          success: false,
          error: "Unit not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: unit,
    });
  } catch (error) {
    console.error("Error fetching unit:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch unit",
      },
      { status: 500 }
    );
  }
}

