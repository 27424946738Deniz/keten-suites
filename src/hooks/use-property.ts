import { useState, useEffect } from "react";
import { propertiesMockData } from "@/data/properties-mock";

interface Property {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  address: string;
  images?: Array<{ id: string; url: string; alt_text?: string | null }>;
  amenities?: Array<{ amenity: { id: string; name: string; icon?: string | null } }>;
  units?: Array<{
    id: string;
    base_price_per_month: number;
    student_discount_percentage?: number;
  }>;
}

export const useProperty = (slug: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProperty = propertiesMockData.find(p => p.slug === slug);

        if (!foundProperty) {
          throw new Error("Property not found");
        }

        // Cast mock data to Property type (may need adjustment based on mock data structure)
        setProperty(foundProperty as unknown as Property);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  return { property, isLoading, error };
};

