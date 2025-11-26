"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  propertyId: string;
  unitId?: string;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export const AvailabilityCalendar = ({
  propertyId,
  unitId,
  onDateSelect,
  className,
}: AvailabilityCalendarProps) => {
  const [blockedDates, setBlockedDates] = React.useState<Date[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        setIsLoading(true);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For static export, return empty blocked dates or hardcoded ones
        // const dates = ["2024-12-25", "2025-01-01"].map(d => new Date(d));
        setBlockedDates([]);
      } catch (error) {
        console.error("Error fetching blocked dates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchBlockedDates();
    }
  }, [propertyId, unitId]);

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(
      (blockedDate) =>
        blockedDate.toDateString() === date.toDateString() ||
        date < new Date() // Block past dates
    );
  };

  const handleSelect = (date: Date | undefined) => {
    if (date && !isDateBlocked(date)) {
      setSelectedDate(date);
      if (onDateSelect) {
        onDateSelect(date);
      }
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-muted-foreground">Loading availability...</p>
          </div>
        ) : (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={isDateBlocked}
            className="rounded-md border"
          />
        )}
        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted" />
            <span>Unavailable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

