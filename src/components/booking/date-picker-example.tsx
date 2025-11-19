"use client";

import * as React from "react";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example component demonstrating the DateRangePicker usage
 * This can be used in the booking form for selecting check-in and check-out dates
 */
export const BookingDatePickerExample = () => {
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Dates</CardTitle>
        <CardDescription>
          Choose your check-in and check-out dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DateRangePicker
          dateRange={dateRange}
          onSelect={(range) => {
            if (range) {
              setDateRange(range);
            }
          }}
          placeholder="Select check-in and check-out dates"
        />
        {dateRange.from && dateRange.to && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Check-in: {dateRange.from.toLocaleDateString()}
            </p>
            <p>
              Check-out: {dateRange.to.toLocaleDateString()}
            </p>
            <p className="mt-2 font-medium">
              Nights:{" "}
              {Math.ceil(
                (dateRange.to.getTime() - dateRange.from.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

