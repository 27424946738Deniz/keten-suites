import { z } from "zod";

export const bookingFormSchema = z.object({
  property_id: z.string().min(1, "Property is required"),
  unit_id: z.string().optional(),
  guest_name: z.string().min(2, "Name must be at least 2 characters"),
  guest_email: z.string().email("Invalid email address"),
  guest_phone: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  booking_type: z.enum(["rental"]),
  special_requests: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

