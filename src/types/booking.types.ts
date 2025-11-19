export interface Booking {
  id: string;
  property_id: string;
  unit_id: string | null;
  booking_reference: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  start_date: string;
  end_date: string;
  total_price: number;
  booking_type: "rental";
  status: "pending" | "confirmed" | "cancelled";
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  property_id: string;
  unit_id?: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  start_date: string;
  end_date: string;
  booking_type: "rental";
  special_requests?: string;
}

