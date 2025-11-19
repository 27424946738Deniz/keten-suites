export enum UnitType {
  ECONOMY_1_PLUS_1 = "1+1-economy",
  PREMIUM_1_PLUS_1 = "1+1-premium",
  ECONOMY_2_PLUS_1 = "2+1-economy",
  FAMILY_DUPLEX_2_PLUS_1 = "2+1-family-duplex",
  FAMILY_DUPLEX_3_PLUS_1 = "3+1-family-duplex",
}

export interface UnitImage {
  url: string;
  alt_text: string;
}

export interface UnitAmenity {
  name: string;
  icon: string;
  category: string;
}

export interface UnitFeatures {
  squareFootage: number;
  floor?: string;
  bedrooms: number;
  bathrooms: number;
  hasTerrace: boolean;
  hasBalcony: boolean;
  viewType?: string;
}

export interface Unit {
  id: string;
  property_id?: string;
  name: string;
  slug: string;
  unit_type: UnitType;
  capacity: number;
  base_price_per_month: number;
  description: string;
  short_description: string;
  images: UnitImage[];
  amenities: UnitAmenity[];
  features: UnitFeatures;
  is_featured?: boolean;
  display_order?: number;
}

export interface UnitWithAvailability extends Unit {
  available: boolean;
  next_available_date?: string;
}

