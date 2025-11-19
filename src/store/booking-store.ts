import { create } from "zustand";

interface BookingState {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  propertyId: string | null;
  unitId: string | null;
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  setPropertyId: (id: string) => void;
  setUnitId: (id: string | null) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  dateRange: {
    from: undefined,
    to: undefined,
  },
  propertyId: null,
  unitId: null,
  setDateRange: (range) => set({ dateRange: range }),
  setPropertyId: (id) => set({ propertyId: id }),
  setUnitId: (id) => set({ unitId: id }),
  reset: () =>
    set({
      dateRange: { from: undefined, to: undefined },
      propertyId: null,
      unitId: null,
    }),
}));

