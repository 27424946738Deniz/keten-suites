"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PricingCalculatorProps {
  basePricePerMonth: number;
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

export const PricingCalculator = ({
  basePricePerMonth,
  startDate,
  endDate,
  className,
}: PricingCalculatorProps) => {
  const calculations = React.useMemo(() => {
    if (!startDate || !endDate) {
      return null;
    }

    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const months = nights / 30;

    const monthlyRate = basePricePerMonth;
    const totalForPeriod = (monthlyRate / 30) * nights;
    const deposit = totalForPeriod * 0.2; // 20% deposit
    const total = totalForPeriod + deposit;

    return {
      nights,
      months: months.toFixed(1),
      monthlyRate,
      totalForPeriod,
      deposit,
      total,
    };
  }, [startDate, endDate, basePricePerMonth]);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Fiyat Hesaplama</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              ₺{basePricePerMonth.toLocaleString()}
            </span>
            <span className="text-muted-foreground">/ay</span>
          </div>
          {calculations && (
            <div className="mt-2 text-sm text-muted-foreground">
              {calculations.nights} gece: ₺
              {calculations.totalForPeriod.toFixed(2)}
            </div>
          )}
        </div>

        {calculations && (
          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Süre:</span>
              <span>
                {calculations.nights} gece ({calculations.months} ay)
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Depozito (20%):</span>
              <span>₺{calculations.deposit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Toplam:</span>
              <span>₺{calculations.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {!calculations && (
          <p className="mt-4 text-sm text-muted-foreground">
            Fiyatları görmek için tarih seçin
          </p>
        )}
      </CardContent>
    </Card>
  );
};

