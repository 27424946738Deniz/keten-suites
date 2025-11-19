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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create booking");
      }

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

