import { NextResponse } from "next/server";
import { getBlockedDates } from "@/lib/supabase/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id");
    const unitId = searchParams.get("unit_id");

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameter: property_id",
        },
        { status: 400 }
      );
    }

    const bookings = await getBlockedDates(propertyId);

    // Convert booking date ranges to individual blocked dates
    const blockedDates: string[] = [];
    bookings.forEach((booking) => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      
      // Add all dates in the range (excluding end date as it's checkout day)
      const current = new Date(start);
      while (current < end) {
        blockedDates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    // Also check availability_calendar for manually blocked dates
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: calendarBlocks } = await supabase
      .from("availability_calendar")
      .select("date")
      .eq("property_id", propertyId)
      .eq("is_available", false);

    if (calendarBlocks) {
      calendarBlocks.forEach((block) => {
        if (!blockedDates.includes(block.date)) {
          blockedDates.push(block.date);
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        blocked_dates: blockedDates,
      },
    });
  } catch (error) {
    console.error("Error fetching blocked dates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blocked dates" },
      { status: 500 }
    );
  }
}

