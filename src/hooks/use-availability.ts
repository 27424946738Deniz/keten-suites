import { useState, useEffect } from "react";

interface AvailabilityData {
  available: boolean;
  available_dates: string[];
  total_days: number;
  start_date: string;
  end_date: string;
}

export const useAvailability = (
  propertyId: string,
  startDate?: string,
  endDate?: string
) => {
  const [availability, setAvailability] = useState<AvailabilityData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!propertyId || !startDate || !endDate) {
      return;
    }

    const checkAvailability = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `/api/availability?property_id=${propertyId}&start_date=${startDate}&end_date=${endDate}`
        );
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to check availability");
        }

        setAvailability(result.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    checkAvailability();
  }, [propertyId, startDate, endDate]);

  return { availability, isLoading, error };
};

