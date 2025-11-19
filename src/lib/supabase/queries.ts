import { createClient } from "./server";

// Property queries
export const getPropertyBySlug = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      images (*),
      property_amenities (
        amenity:amenities (*)
      ),
      units (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase error fetching property by slug:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }
  
  if (!data) {
    throw new Error(`Property with slug "${slug}" not found`);
  }
  
  return data;
};

export const getPropertyById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getAllProperties = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      images (*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Availability queries
export const checkAvailability = async (
  propertyId: string,
  startDate: string,
  endDate: string
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("availability_calendar")
    .select("*")
    .eq("property_id", propertyId)
    .gte("date", startDate)
    .lte("date", endDate)
    .eq("is_available", true);

  if (error) throw error;
  return data;
};

// Get blocked dates from bookings
export const getBlockedDates = async (propertyId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("start_date, end_date")
    .eq("property_id", propertyId)
    .in("status", ["pending", "confirmed"]);

  if (error) throw error;
  return data;
};

// Booking queries
export const createBooking = async (bookingData: {
  property_id: string;
  unit_id?: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  start_date: string;
  end_date: string;
  total_price: number;
  booking_type: string;
  special_requests?: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Blog queries
export const getBlogPosts = async (limit?: number) => {
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getBlogPostBySlug = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) throw error;
  return data;
};

// Unit queries
export const getAllUnits = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("units")
    .select(
      `
      *,
      property:properties (
        id,
        name,
        slug,
        address,
        city,
        country
      ),
      images (
        url,
        alt_text,
        display_order
      )
    `
    )
    .order("unit_type", { ascending: true });

  if (error) {
    console.error("Supabase error fetching units:", error);
    throw error;
  }
  return data;
};

export const getUnitBySlug = async (slug: string) => {
  const supabase = await createClient();
  
  // First, try to find a unit with this slug in unit_name
  const { data, error } = await supabase
    .from("units")
    .select(
      `
      *,
      property:properties (
        id,
        name,
        slug,
        description,
        address,
        city,
        country,
        latitude,
        longitude,
        property_amenities (
          amenity:amenities (*)
        )
      )
    `
    )
    .ilike("unit_name", `%${slug}%`)
    .single();

  if (error) {
    console.error("Supabase error fetching unit by slug:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  if (!data) {
    throw new Error(`Unit with slug "${slug}" not found`);
  }

  return data;
};

export const getUnitById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("units")
    .select(
      `
      *,
      property:properties (*)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getAvailableUnits = async (
  startDate: string,
  endDate: string,
  unitType?: string,
  minCapacity?: number
) => {
  const supabase = await createClient();

  // Start building the query
  let query = supabase.from("units").select(
    `
      *,
      property:properties (
        id,
        name,
        slug,
        address
      ),
      images (
        url,
        alt_text,
        display_order
      )
    `
  );

  // Apply filters
  if (unitType) {
    query = query.eq("unit_type", unitType);
  }

  if (minCapacity) {
    query = query.gte("capacity", minCapacity);
  }

  const { data: units, error } = await query;

  if (error) {
    console.error("Error fetching units:", error);
    throw error;
  }

  if (!units) return [];

  // Check availability for each unit
  const unitsWithAvailability = await Promise.all(
    units.map(async (unit) => {
      const available = await checkUnitAvailability(
        unit.id,
        startDate,
        endDate
      );
      return {
        ...unit,
        available,
      };
    })
  );

  return unitsWithAvailability;
};

export const checkUnitAvailability = async (
  unitId: string,
  startDate: string,
  endDate: string
): Promise<boolean> => {
  const supabase = await createClient();

  // Check for any bookings that overlap with the requested dates
  const { data: bookings, error: bookingError } = await supabase
    .from("bookings")
    .select("id")
    .eq("unit_id", unitId)
    .in("status", ["pending", "confirmed"])
    .or(
      `and(start_date.lte.${endDate},end_date.gte.${startDate})`
    );

  if (bookingError) {
    console.error("Error checking unit bookings:", bookingError);
    return false;
  }

  // If there are any bookings, the unit is not available
  if (bookings && bookings.length > 0) {
    return false;
  }

  // Check availability calendar for blocked dates
  const { data: blockedDates, error: calendarError } = await supabase
    .from("availability_calendar")
    .select("id")
    .eq("unit_id", unitId)
    .eq("is_available", false)
    .gte("date", startDate)
    .lte("date", endDate);

  if (calendarError) {
    console.error("Error checking availability calendar:", calendarError);
    return false;
  }

  // If there are any blocked dates, the unit is not available
  return !blockedDates || blockedDates.length === 0;
};

export const getUnitBlockedDates = async (unitId: string) => {
  const supabase = await createClient();

  // Get dates from bookings
  const { data: bookings, error: bookingError } = await supabase
    .from("bookings")
    .select("start_date, end_date")
    .eq("unit_id", unitId)
    .in("status", ["pending", "confirmed"]);

  if (bookingError) {
    console.error("Error fetching unit bookings:", bookingError);
    return [];
  }

  // Get dates from availability calendar
  const { data: calendarDates, error: calendarError } = await supabase
    .from("availability_calendar")
    .select("date")
    .eq("unit_id", unitId)
    .eq("is_available", false);

  if (calendarError) {
    console.error("Error fetching calendar dates:", calendarError);
    return bookings || [];
  }

  return {
    bookings: bookings || [],
    calendarDates: calendarDates || [],
  };
};
