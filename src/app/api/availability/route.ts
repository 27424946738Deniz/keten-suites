import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/supabase/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    if (!propertyId || !startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: property_id, start_date, end_date",
        },
        { status: 400 }
      );
    }

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid date format" },
        { status: 400 }
      );
    }

    if (start >= end) {
      return NextResponse.json(
        { success: false, error: "End date must be after start date" },
        { status: 400 }
      );
    }

    const availability = await checkAvailability(
      propertyId,
      startDate,
      endDate
    );

    // Calculate available dates
    const availableDates = availability.map((item) => item.date);
    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return NextResponse.json({
      success: true,
      data: {
        available: availability.length > 0,
        available_dates: availableDates,
        total_days: totalDays,
        start_date: startDate,
        end_date: endDate,
      },
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check availability" },
      { status: 500 }
    );
  }
}

