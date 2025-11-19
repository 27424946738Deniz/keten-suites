import { useState, useEffect } from "react";

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
        const response = await fetch(`/api/properties/${slug}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to fetch property");
        }

        setProperty(result.data);
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

