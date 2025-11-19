<!-- 273a7299-32da-4eb8-b7e0-a29a85f5c081 80edc55d-2f3b-48ba-a6ea-171050b5746e -->
# Property Units and Listing System

## Overview

Transform the property-focused system into a unit-based system for Keten Suites, featuring 5 distinct apartment types with full browsing, searching, and booking capabilities.

## 1. Create TypeScript Types and Mock Data

### Create types file: `src/types/units.ts`

- Define `UnitType` enum: `1+1-economy`, `1+1-premium`, `2+1-economy`, `2+1-family-duplex`, `3+1-family-duplex`
- Define `Unit` interface extending database schema with computed fields
- Define `UnitFeatures` interface for amenities and specifications

### Create mock data file: `src/data/units-mock.ts`

Define all 5 unit types with:

- **1+1 Economy Suite**: Basic studio, 1-2 capacity, entry-level pricing
- **1+1 Premium Suite**: Upgraded studio, 1-2 capacity, better fixtures/location
- **2+1 Economy Suite**: 2 bedroom apartment, 3-4 capacity, family-friendly
- **2+1 Family Duplex**: 2 bedroom duplex with terrace, 4-5 capacity, premium features
- **3+1 Family Duplex**: 3 bedroom duplex with terrace, 5-6 capacity, top-tier

Each unit should include:

- Name, slug, type, capacity
- Pricing (base_price_per_month, student_discount_percentage)
- 3-5 images (use placeholder paths like `/units/1+1-economy-1.jpg`)
- Detailed description
- Amenities (WiFi, Kitchen, AC, Heating, etc.)
- Square footage, floor, availability

## 2. Update Database Seed Script

### Modify `scripts/seed-database.ts`

- Import unit mock data
- After creating Keten Suites property, insert all 5 units
- Link unit-specific amenities to property_amenities table
- Add sample images for each unit to images table with unit context
- Set initial availability for next 6 months

## 3. Create Unit Listing Components

### Create `src/components/units/unit-card.tsx`

Reusable card component showing:

- Unit image (with carousel if multiple)
- Unit name and type badge
- Capacity (guests icon)
- Price per month
- Availability indicator
- "View Details" button linking to unit detail page

### Create `src/components/units/unit-list.tsx`

Grid/list layout container for unit cards with:

- Responsive grid (1 col mobile, 2 tablet, 3 desktop)
- Loading skeleton states
- Empty state message
- Filter indicators (if filtered by search)

## 4. Update Search Results Page

### Modify `src/components/search/search-results.tsx`

- Change from property-based to unit-based results
- Fetch units filtered by search criteria (dates, guests, type)
- Show available units first, unavailable units below
- Each result should be a unit card, not property card
- Update availability check to be unit-specific

### Update search query logic

- Filter units by `unit_type` matching apartment type selection
- Filter by capacity >= guest count
- Check unit-specific availability from bookings and availability_calendar

## 5. Create Units Browse Page

### Create `src/app/(public)/units/page.tsx`

Main browsing page showing all available units:

- Page title: "Daire Tipleri" or "Our Units"
- Show all 5 unit types in grid
- No date filtering (show all units as browsable)
- Quick filters: by type, by capacity, by price range
- Sort options: price low-to-high, price high-to-low, capacity

### Update navigation

Update `src/components/layout/header.tsx`:

- Change "Property" link to "Daireler" or "Units"
- Link to `/units` instead of `/property/keten-student-residence`

## 6. Create Individual Unit Detail Pages

### Create `src/app/(public)/units/[slug]/page.tsx`

Detailed unit page with:

- Hero section with image gallery
- Unit specifications (type, capacity, size, floor)
- Full description
- Amenities list (unit-specific)
- Pricing calculator (per month, student discount)
- Availability calendar (unit-specific)
- "Book This Unit" CTA
- Breadcrumb: Home > Units > [Unit Name]

### Create unit query

Add `getUnitBySlug` to `src/lib/supabase/queries.ts`:

- Fetch unit with property info, images, amenities
- Join with property to get building-level info

## 7. Add Featured Units Section on Homepage

### Update `src/app/(public)/page.tsx`

Add new section after search component:

- Section title: "Daire Tiplerimiz" or "Our Apartment Types"
- Show 3 featured units (1+1 Premium, 2+1 Family Duplex, 3+1 Family Duplex)
- Use unit-card component
- "View All Units" button linking to `/units`

## 8. Update Footer Links

### Modify `src/components/layout/footer.tsx`

- Update "View Property" link to "Browse Units" → `/units`
- Keep other links as-is

## 9. API Endpoints

### Create `src/app/api/units/route.ts`

- GET endpoint returning all units with availability status
- Query params: `type`, `min_capacity`, `max_price`
- Include property info, first image, base pricing

### Create `src/app/api/units/[slug]/route.ts`

- GET endpoint for single unit details
- Include all images, amenities, property details

## 10. Update Types and Interfaces

### Update `src/lib/supabase/queries.ts`

- Add `getAllUnits()` query
- Add `getUnitBySlug(slug: string)` query  
- Add `getAvailableUnits(startDate: string, endDate: string)` query
- Add `checkUnitAvailability(unitId: string, startDate: string, endDate: string)` query

## User Journey Flows

### Flow 1: Search-First Journey

1. User lands on homepage
2. Uses search bar (dates, guests, type)
3. Clicks "Ara" → navigates to `/search?check_in=...&check_out=...&guests=...&type=...`
4. Views filtered unit results (available first)
5. Clicks unit card → navigates to `/units/[slug]`
6. Reviews details, checks availability calendar
7. Clicks "Book Now" → navigates to `/booking?unit=[unit-id]`

### Flow 2: Browse-First Journey

1. User lands on homepage
2. Sees featured units section
3. Clicks "View All Units" or "Daireler" in nav → navigates to `/units`
4. Browses all 5 unit types
5. Clicks unit card → navigates to `/units/[slug]`
6. Selects dates in availability calendar
7. Clicks "Book Now" → navigates to `/booking?unit=[unit-id]&check_in=...&check_out=...`

### Flow 3: Direct Navigation

1. User navigates to "Daireler" from header
2. Lands on `/units` browse page
3. Follows Flow 2 from step 4

## Files to Create

- `src/types/units.ts`
- `src/data/units-mock.ts`
- `src/components/units/unit-card.tsx`
- `src/components/units/unit-list.tsx`
- `src/app/(public)/units/page.tsx`
- `src/app/(public)/units/[slug]/page.tsx`
- `src/app/api/units/route.ts`
- `src/app/api/units/[slug]/route.ts`

## Files to Modify

- `scripts/seed-database.ts` - Add 5 units with details
- `src/lib/supabase/queries.ts` - Add unit queries
- `src/components/search/search-results.tsx` - Change to unit-based
- `src/app/(public)/page.tsx` - Add featured units section
- `src/components/layout/header.tsx` - Update nav link
- `src/components/layout/footer.tsx` - Update footer links

### To-dos

- [x] Create TypeScript types (src/types/units.ts) and mock data (src/data/units-mock.ts) for all 5 unit types with full details
- [x] Add unit-specific queries to src/lib/supabase/queries.ts (getAllUnits, getUnitBySlug, getAvailableUnits, checkUnitAvailability)
- [x] Update scripts/seed-database.ts to seed all 5 units with images, amenities, and availability data
- [x] Create unit-card.tsx and unit-list.tsx components for displaying units
- [x] Create /units page showing all unit types with filtering and sorting
- [x] Create /units/[slug] detail page with gallery, specs, pricing, and booking CTA
- [x] Modify search-results.tsx to show unit-based results instead of property-based
- [x] Add featured units section to homepage with 3 highlighted units
- [x] Update header and footer navigation to link to /units instead of /property
- [x] Create API endpoints /api/units and /api/units/[slug] for fetching unit data