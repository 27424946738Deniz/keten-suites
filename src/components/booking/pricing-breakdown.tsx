"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PricingBreakdownProps {
  startDate?: Date;
  endDate?: Date;
  basePricePerMonth: number;
  depositPercentage?: number;
  serviceFee?: number;
  className?: string;
}

export const PricingBreakdown = ({
  startDate,
  endDate,
  basePricePerMonth,
  depositPercentage = 20,
  serviceFee = 0,
  className,
}: PricingBreakdownProps) => {
  const calculations = React.useMemo(() => {
    if (!startDate || !endDate) {
      return null;
    }

    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const months = nights / 30;

    // Base rent calculation
    const baseRent = (basePricePerMonth / 30) * nights;

    // Deposit calculation
    const deposit = baseRent * (depositPercentage / 100);

    // Service fee
    const fee = serviceFee;

    // Total
    const total = baseRent + deposit + fee;

    return {
      nights,
      months: months.toFixed(1),
      baseRent,
      deposit,
      serviceFee: fee,
      total,
    };
  }, [startDate, endDate, basePricePerMonth, depositPercentage, serviceFee]);

  if (!calculations) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Pricing Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select dates to see pricing breakdown
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Pricing Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          {startDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in:</span>
              <span className="font-medium">
                {format(startDate, "MMM dd, yyyy")}
              </span>
            </div>
          )}
          {endDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out:</span>
              <span className="font-medium">
                {format(endDate, "MMM dd, yyyy")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">
              {calculations.nights} night{calculations.nights !== 1 ? "s" : ""} (
              {calculations.months} months)
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Rent:</span>
            <span className="font-medium">₺{calculations.baseRent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Deposit ({depositPercentage}%):</span>
            <span>₺{calculations.deposit.toFixed(2)}</span>
          </div>
          {calculations.serviceFee > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service Fee:</span>
              <span>₺{calculations.serviceFee.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>₺{calculations.total.toFixed(2)}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          * Deposit will be refunded after check-out inspection
        </p>
      </CardContent>
    </Card>
  );
};

