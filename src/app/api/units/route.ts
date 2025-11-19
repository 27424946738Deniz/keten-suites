import { NextRequest, NextResponse } from "next/server";
import { getAllUnits, getAvailableUnits } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const unitType = searchParams.get("type");
    const minCapacity = searchParams.get("min_capacity");

    let units;

    // If dates are provided, check availability
    if (startDate && endDate) {
      units = await getAvailableUnits(
        startDate,
        endDate,
        unitType || undefined,
        minCapacity ? parseInt(minCapacity) : undefined
      );
    } else {
      // Otherwise, get all units
      units = await getAllUnits();

      // Apply filters if provided
      if (unitType) {
        units = units.filter((unit: any) => unit.unit_type === unitType);
      }

      if (minCapacity) {
        const minCap = parseInt(minCapacity);
        units = units.filter((unit: any) => unit.capacity >= minCap);
      }
    }

    return NextResponse.json({
      success: true,
      data: units,
    });
  } catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch units",
      },
      { status: 500 }
    );
  }
}

