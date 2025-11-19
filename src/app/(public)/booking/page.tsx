"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/booking-form";
import { PricingBreakdown } from "@/components/booking/pricing-breakdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

function BookingPageContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("property") || "";
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [bookingReference, setBookingReference] = React.useState<
    string | null
  >(null);

  // Default pricing - should come from property data
  const basePricePerMonth = 5000;
  const studentDiscountPercentage = 10;

  if (bookingReference) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-2xl">
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <h2 className="mb-2 text-xl font-semibold">
                Booking Request Submitted!
              </h2>
              <p className="mb-2">
                Your booking reference is:{" "}
                <strong>{bookingReference}</strong>
              </p>
              <p>
                We&apos;ve sent a confirmation email to your inbox. Our team
                will contact you shortly to confirm your booking.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Book Your Stay</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
                <CardDescription>
                  Fill out the form below to submit your booking request
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm
                  propertyId={propertyId}
                  onSuccess={(ref) => setBookingReference(ref)}
                  onDateRangeChange={setDateRange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Pricing Breakdown */}
          <div>
            <PricingBreakdown
              startDate={dateRange.from}
              endDate={dateRange.to}
              basePricePerMonth={basePricePerMonth}
              studentDiscountPercentage={studentDiscountPercentage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-10 w-64 bg-muted rounded" />
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}

