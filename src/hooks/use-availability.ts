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
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const totalDays = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Generate available dates (all dates in range)
        const availableDates: string[] = [];
        const current = new Date(start);
        while (current < end) {
          availableDates.push(current.toISOString().split("T")[0]);
          current.setDate(current.getDate() + 1);
        }

        setAvailability({
          available: true,
          available_dates: availableDates,
          total_days: totalDays,
          start_date: startDate,
          end_date: endDate,
        });
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

