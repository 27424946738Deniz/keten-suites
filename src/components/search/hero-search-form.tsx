"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { Calendar, Users, Building, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const apartmentTypes = [
  { value: "1+1", label: "1+1" },
  { value: "2+1", label: "2+1" },
  { value: "dubleks", label: "Dubleks" },
];

const apartmentStatuses = [
  { value: "all", label: "Tümü" },
  { value: "bahce", label: "Bahçe" },
  { value: "balkon", label: "Balkon" },
  { value: "teras", label: "Teras" },
];

const guestCounts = [1, 2, 3, 4];

const MINIMUM_STAY_DAYS = 30;

export function HeroSearchForm() {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [guestCount, setGuestCount] = React.useState<string>("");
  const [apartmentType, setApartmentType] = React.useState<string>("");
  const [apartmentStatus, setApartmentStatus] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState(false);

  const minCheckOutDate = checkInDate
    ? addDays(checkInDate, MINIMUM_STAY_DAYS)
    : undefined;

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date && checkOutDate) {
      const minCheckOut = addDays(date, MINIMUM_STAY_DAYS);
      if (checkOutDate < minCheckOut) {
        setCheckOutDate(undefined);
      }
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);

    const params = new URLSearchParams();

    if (checkInDate) {
      params.append("check_in", format(checkInDate, "yyyy-MM-dd"));
    }
    if (checkOutDate) {
      params.append("check_out", format(checkOutDate, "yyyy-MM-dd"));
    }
    if (guestCount) {
      params.append("guests", guestCount);
    }
    if (apartmentType) {
      params.append("type", apartmentType);
    }
    if (apartmentStatus && apartmentStatus !== "all") {
      params.append("status", apartmentStatus);
    }

    router.push(`/units?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-2xl bg-white p-4 shadow-2xl md:p-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {/* Date Picker - MUCH LARGER */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex min-w-[320px] flex-[2.5] items-center gap-4 rounded-xl bg-gray-100 px-6 py-5 text-left text-lg font-semibold transition-colors hover:bg-gray-200",
                  !checkInDate && !checkOutDate && "text-gray-500"
                )}
              >
                <Calendar className="h-7 w-7 shrink-0 text-gray-500" />
                <span className="truncate">
                  {checkInDate && checkOutDate
                    ? `${format(checkInDate, "dd/MM/yyyy")} - ${format(checkOutDate, "dd/MM/yyyy")}`
                    : "Giriş - Çıkış Tarihi"}
                </span>
              </button>
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
                      if (date < today) return true;
                      if (!checkInDate) return true;
                      if (minCheckOutDate && date < minCheckOutDate) return true;
                      return false;
                    }}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Guest Count */}
          <Select value={guestCount} onValueChange={setGuestCount}>
            <SelectTrigger className="h-[58px] w-[130px] gap-2 rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-700 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
              <Users className="h-5 w-5 shrink-0 text-gray-500" />
              <SelectValue placeholder="Kişi" />
            </SelectTrigger>
            <SelectContent>
              {guestCounts.map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count} Kişi
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Apartment Type */}
          <Select value={apartmentType} onValueChange={setApartmentType}>
            <SelectTrigger className="h-[58px] w-[140px] gap-2 rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-700 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
              <Building className="h-5 w-5 shrink-0 text-gray-500" />
              <SelectValue placeholder="Daire Tipi" />
            </SelectTrigger>
            <SelectContent>
              {apartmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Apartment Status */}
          <Select value={apartmentStatus} onValueChange={setApartmentStatus}>
            <SelectTrigger className="h-[58px] w-[130px] gap-2 rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-700 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
              <Home className="h-5 w-5 shrink-0 text-gray-500" />
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              {apartmentStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="h-[58px] gap-2 rounded-xl bg-black px-8 text-base text-white shadow-sm hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
            <span className="font-semibold">Ara</span>
          </Button>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-4 text-left text-base font-semibold transition-colors hover:bg-gray-200",
                  !checkInDate && !checkOutDate && "text-gray-500"
                )}
              >
                <Calendar className="h-5 w-5 shrink-0 text-gray-500" />
                <span className="truncate">
                  {checkInDate && checkOutDate
                    ? `${format(checkInDate, "dd/MM/yyyy")} - ${format(checkOutDate, "dd/MM/yyyy")}`
                    : "Giriş - Çıkış Tarihi"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col">
                <div className="border-b p-3">
                  <p className="mb-2 text-sm font-medium">Giriş Tarihi</p>
                  <CalendarComponent
                    mode="single"
                    selected={checkInDate}
                    onSelect={handleCheckInChange}
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div className="p-3">
                  <p className="mb-2 text-sm font-medium">Çıkış (Min. 30 gün)</p>
                  <CalendarComponent
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (date < today) return true;
                      if (!checkInDate) return true;
                      if (minCheckOutDate && date < minCheckOutDate) return true;
                      return false;
                    }}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Row for Guest + Apartment Type */}
          <div className="grid grid-cols-2 gap-2">
            <Select value={guestCount} onValueChange={setGuestCount}>
              <SelectTrigger className="h-12 gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
                <Users className="h-4 w-4 shrink-0 text-gray-500" />
                <SelectValue placeholder="Kişi" />
              </SelectTrigger>
              <SelectContent>
                {guestCounts.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Kişi
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={apartmentType} onValueChange={setApartmentType}>
              <SelectTrigger className="h-12 gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
                <Building className="h-4 w-4 shrink-0 text-gray-500" />
                <SelectValue placeholder="Tip" />
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

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="h-12 w-full gap-2 rounded-xl bg-black text-base font-semibold text-white shadow-sm hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
            <span>Ara</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
