import { useState } from "react";
import { toast } from "sonner";
import type { BookingFormValues } from "@/lib/validations";

interface BookingResult {
  booking_id: string;
  booking_reference: string;
  message: string;
}

export const useBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async (data: BookingFormValues): Promise<BookingResult | null> => {
    setIsSubmitting(true);
    try {
      // Mock API call for static export
      await new Promise(resolve => setTimeout(resolve, 1000));

      const bookingReference = `KTN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      const result = {
        success: true,
        data: {
          booking_id: `static-${Date.now()}`,
          booking_reference: bookingReference,
          message: "Booking request received successfully"
        }
      };

      toast.success("Booking request submitted successfully!", {
        description: `Your booking reference is: ${result.data.booking_reference}`,
      });

      return result.data;
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBooking, isSubmitting };
};

