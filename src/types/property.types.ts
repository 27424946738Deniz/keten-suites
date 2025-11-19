export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  address: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  property_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  image_type: string;
  display_order: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
  category: string;
}

