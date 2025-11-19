import { NextResponse } from "next/server";
import { createBooking, getPropertyById } from "@/lib/supabase/queries";
import { bookingFormSchema } from "@/lib/validations";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = bookingFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate booking reference
    const bookingReference = `KTN-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Calculate total price (simplified - should be calculated based on dates and pricing)
    // This will be enhanced when pricing calculator is implemented
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // TODO: Get actual pricing from property/unit
    const basePricePerMonth = 5000; // This should come from database
    const totalPrice = (basePricePerMonth / 30) * nights;

    const bookingData = {
      property_id: data.property_id,
      unit_id: data.unit_id,
      booking_reference: bookingReference,
      guest_name: data.guest_name,
      guest_email: data.guest_email,
      guest_phone: data.guest_phone || undefined,
      start_date: data.start_date,
      end_date: data.end_date,
      total_price: totalPrice,
      booking_type: data.booking_type,
      special_requests: data.special_requests || undefined,
    };

    const booking = await createBooking(bookingData);

    // Get property name for email
    try {
      const property = await getPropertyById(data.property_id);

      // Send confirmation email
      try {
        await sendBookingConfirmationEmail({
          bookingReference: booking.booking_reference,
          guestName: data.guest_name,
          guestEmail: data.guest_email,
          startDate: data.start_date,
          endDate: data.end_date,
          totalPrice: totalPrice,
          propertyName: property.name || "Keten Property",
        });
      } catch (emailError) {
        console.error("Failed to send email, but booking was created:", emailError);
        // Don't fail the request if email fails
      }
    } catch (error) {
      console.error("Error fetching property for email:", error);
      // Still send email with default name
      try {
        await sendBookingConfirmationEmail({
          bookingReference: booking.booking_reference,
          guestName: data.guest_name,
          guestEmail: data.guest_email,
          startDate: data.start_date,
          endDate: data.end_date,
          totalPrice: totalPrice,
          propertyName: "Keten Property",
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        booking_id: booking.id,
        booking_reference: booking.booking_reference,
        message: "Booking request received successfully",
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

