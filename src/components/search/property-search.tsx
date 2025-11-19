"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { Calendar, Users, Building, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PropertySearchProps {
  className?: string;
}

const apartmentTypes = [
  { value: "1+1-economy", label: "1+1 Economy Suite" },
  { value: "1+1-premium", label: "1+1 Premium Suite" },
  { value: "2+1-economy", label: "2+1 Economy Suite" },
  { value: "2+1-family-duplex", label: "2+1 Family Duplex" },
  { value: "3+1-family-duplex", label: "3+1 Family Duplex" },
];

const apartmentStatuses = [
  { value: "all", label: "Tümü" },
  { value: "available", label: "Müsait" },
  { value: "reserved", label: "Rezerve" },
];

const guestCounts = [1, 2, 3, 4, 5, 6];

const MINIMUM_STAY_DAYS = 30;

export const PropertySearch = ({ className }: PropertySearchProps) => {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [guestCount, setGuestCount] = React.useState<string>("");
  const [apartmentType, setApartmentType] = React.useState<string>("");
  const [apartmentStatus, setApartmentStatus] = React.useState<string>("all");
  const [isSearching, setIsSearching] = React.useState(false);

  // Calculate minimum checkout date (30 days after check-in)
  const minCheckOutDate = checkInDate
    ? addDays(checkInDate, MINIMUM_STAY_DAYS)
    : undefined;

  // Handle check-in date change
  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date);
    // If check-out date is set but less than 30 days from new check-in, reset it
    if (date && checkOutDate) {
      const minCheckOut = addDays(date, MINIMUM_STAY_DAYS);
      if (checkOutDate < minCheckOut) {
        setCheckOutDate(undefined);
      }
    }
  };

  const handleSearch = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Lütfen giriş ve çıkış tarihlerini seçin");
      return;
    }

    setIsSearching(true);

    // Build search params
    const params = new URLSearchParams({
      check_in: format(checkInDate, "yyyy-MM-dd"),
      check_out: format(checkOutDate, "yyyy-MM-dd"),
    });

    if (guestCount) {
      params.append("guests", guestCount);
    }

    if (apartmentType) {
      params.append("type", apartmentType);
    }

    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className={cn("shadow-2xl border-0", className)}>
      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Date Range Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Giriş Tarihi - Çıkış Tarihi
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full justify-start text-left font-normal bg-background hover:bg-accent",
                    !checkInDate && !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 shrink-0" />
                  {checkInDate && checkOutDate ? (
                    <span className="truncate">
                      {format(checkInDate, "dd/MM")} -{" "}
                      {format(checkOutDate, "dd/MM")}
                    </span>
                  ) : (
                    <span>Tarih Seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col sm:flex-row">
                  <div className="border-b p-3 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-sm font-medium">Giriş Tarihi</p>
                    <CalendarComponent
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckInChange}
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="p-3">
                    <p className="mb-2 text-sm font-medium">
                      Çıkış Tarihi (Min. 30 gün)
                    </p>
                    <CalendarComponent
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        // Disable if before today
                        if (date < today) return true;
                        
                        // Disable if no check-in date selected
                        if (!checkInDate) return true;
                        
                        // Disable if before minimum checkout date (30 days after check-in)
                        if (minCheckOutDate && date < minCheckOutDate) return true;
                        
                        return false;
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Count */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Kişi Sayısı</label>
            <Select value={guestCount} onValueChange={setGuestCount}>
              <SelectTrigger className="h-12 bg-background hover:bg-accent">
                <Users className="mr-2 h-4 w-4 shrink-0" />
                <SelectValue placeholder="Kişi sayısı" />
              </SelectTrigger>
              <SelectContent>
                {guestCounts.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Kişi
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Apartment Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Daire Tipi</label>
            <Select value={apartmentType} onValueChange={setApartmentType}>
              <SelectTrigger className="h-12 bg-background hover:bg-accent">
                <Building className="mr-2 h-4 w-4 shrink-0" />
                <SelectValue placeholder="Daire tipi" />
              </SelectTrigger>
              <SelectContent>
                {apartmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Apartment Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Daire Durumu</label>
            <Select value={apartmentStatus} onValueChange={setApartmentStatus}>
              <SelectTrigger className="h-12 bg-background hover:bg-accent">
                <Home className="mr-2 h-4 w-4 shrink-0" />
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                {apartmentStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex flex-col justify-end space-y-2">
            <label className="hidden text-sm font-medium sm:block">&nbsp;</label>
            <Button
              onClick={handleSearch}
              disabled={isSearching || !checkInDate || !checkOutDate}
              className="h-12 w-full text-base font-semibold"
            >
              {isSearching ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Aranıyor...
                </>
              ) : (
                <>
                  Ara
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

