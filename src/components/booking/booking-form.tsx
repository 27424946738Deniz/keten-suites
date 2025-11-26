"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema, type BookingFormValues } from "@/lib/validations";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface BookingFormProps {
  propertyId: string;
  unitId?: string;
  onSuccess?: (bookingReference: string) => void;
  onDateRangeChange?: (range: { from: Date | undefined; to?: Date | undefined }) => void;
  className?: string;
}

export const BookingForm = ({
  propertyId,
  unitId,
  onSuccess,
  onDateRangeChange,
  className,
}: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      property_id: propertyId,
      unit_id: unitId,
      guest_name: "",
      guest_email: "",
      guest_phone: "",
      start_date: "",
      end_date: "",
      booking_type: "mid_term_rental",
      special_requests: "",
    },
  });

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to?: Date | undefined;
  } | undefined) => {
    if (!range) return;
    
    setDateRange(range);
    if (range.from) {
      form.setValue("start_date", range.from.toISOString().split("T")[0]);
    }
    if (range.to) {
      form.setValue("end_date", range.to.toISOString().split("T")[0]);
    }
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      // Mock API call for static export
      await new Promise(resolve => setTimeout(resolve, 1000));

      const bookingReference = `KTN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      const result = {
        success: true,
        data: {
          booking_reference: bookingReference
        }
      };

      toast.success("Booking request submitted successfully!", {
        description: `Your booking reference is: ${result.data.booking_reference}. Note: This is a demo, no data was saved.`,
      });

      form.reset();
      setDateRange({ from: undefined, to: undefined });

      if (onSuccess) {
        onSuccess(result.data.booking_reference);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="space-y-6">
          {/* Date Range Picker */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Dates</FormLabel>
                <FormControl>
                  <DateRangePicker
                    dateRange={dateRange}
                    onSelect={handleDateRangeChange}
                    placeholder="Select check-in and check-out dates"
                  />
                </FormControl>
                <FormDescription>
                  Choose your check-in and check-out dates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Booking Type */}
          <FormField
            control={form.control}
            name="booking_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select booking type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mid_term_rental">
                      Mid-Term Rental
                    </SelectItem>
                    <SelectItem value="student_housing">Student Housing</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the type of accommodation you need
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Guest Name */}
          <FormField
            control={form.control}
            name="guest_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Guest Email */}
          <FormField
            control={form.control}
            name="guest_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Guest Phone */}
          <FormField
            control={form.control}
            name="guest_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+90 555 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Special Requests */}
          <FormField
            control={form.control}
            name="special_requests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or requirements..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Let us know if you have any special requirements
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden fields */}
          <FormField
            control={form.control}
            name="property_id"
            render={({ field }) => <input type="hidden" {...field} />}
          />
          {unitId && (
            <FormField
              control={form.control}
              name="unit_id"
              render={({ field }) => <input type="hidden" {...field} />}
            />
          )}
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

