# Product Requirements Document (PRD)

## Keten - Housing Rental Platform

**Version:** 1.0  
**Date:** November 16, 2025  
**Project Name:** Keten  
**Status:** Planning Phase

---

## 1. Executive Summary

### Vision

Keten is a modern, responsive housing rental website showcasing a single property offering both student housing and mid-term rentals. The platform draws inspiration from nook.istanbul and blueground.com, focusing on a seamless user experience with emphasis on mobile-first design.

### Target Audience

- **Primary:** University students (18-25) seeking student housing
- **Secondary:** Young professionals and digital nomads (25-35) seeking mid-term rentals (1-12 months)
- **Tertiary:** Corporate clients booking for relocated employees

### Key Differentiators

- Single property focus with comprehensive, detailed information
- Dual offering (student housing & mid-term rentals)
- Seamless mobile-first experience
- Transparent pricing and real-time availability checking
- Blog section for content marketing and SEO

---

## 2. Market Analysis

### Competitor Analysis

#### Nook Istanbul

**Strengths:**

- Clean, modern design with lifestyle emphasis
- High-quality photography showcasing property atmosphere
- Clear value propositions on homepage
- Neighborhood information and local culture emphasis
- Transparent pricing structure

**Key Features to Implement:**

- Lifestyle-focused imagery and content
- Neighborhood guides
- Customer testimonials with photos
- "Why choose us" section
- Flexible lease terms clearly displayed

#### Blueground

**Strengths:**

- Professional, scalable design
- Robust search and filter functionality
- Detailed property pages with 3D tours
- Excellent photography and virtual tours
- Strong corporate presence

**Key Features to Implement:**

- Advanced booking calendar
- High-quality photo galleries
- Virtual tour integration
- Amenities checklist with icons
- Instant booking confirmation
- Professional property presentation

---

## 3. Tech Stack

### Frontend

- **Framework:** Next.js 16+ (App Router)
  - Latest stable release with React 19 support
  - Server-side rendering and static site generation
  - Built-in API routes and Server Actions
- **Language:** TypeScript 5.6+
- **UI Components:** shadcn/ui (built on Radix UI)
  - Accessible, customizable components
  - Compatible with Tailwind CSS and React 19
- **Styling:** Tailwind CSS 4.0+
  - Utility-first CSS framework
  - Responsive design utilities
- **State Management:** Zustand 4.5+
  - Lightweight, simple state management
- **Form Handling:** React Hook Form 7.52+ + Zod 3.23+
  - Efficient form validation and management
- **Date Handling:** date-fns 4.0+
  - Modern date utility library
- **Animations:** Framer Motion 11.0+
  - Smooth animations and transitions
- **Icons:** Lucide React 0.400+
  - Icon library integrated with shadcn/ui

### Backend & Database

- **Database:** Supabase (PostgreSQL)
  - Scalable PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
- **Storage:** Supabase Storage
  - Property images and media files
  - CDN delivery
- **Real-time:** Supabase Realtime
  - Live availability updates
  - Booking status synchronization
- **API:** Next.js API Routes / Server Actions
  - Server-side logic and data fetching

### Payments

- **Payment Gateway:** TBD (Local Turkish Provider)
  - Stripe is restricted in Turkey
  - Options: Iyzico, PayTR, or similar local providers
  - Integration planned for Phase 2

### Analytics

- **Tool:** Google Analytics 4 (GA4)
  - User behavior tracking
  - Conversion tracking
  - Performance monitoring

### Content Management

- **Blog Structure:** Markdown files with MDX
  - Content stored in `/content/blog/` directory
  - MDX for rich content integration
  - Next.js dynamic routing for blog posts

### Deployment & CI/CD

- **Hosting:** Vercel
  - Optimized Next.js deployment
  - Automatic scaling
  - Global CDN
- **Version Control:** GitHub
  - Repository management
  - Code collaboration
- **CI/CD:** Vercel + GitHub Actions
  - Automatic deployments on push
  - Preview deployments for PRs
  - Environment variable management

### Development Tools

- **Linting:** ESLint 9.0+
- **Formatting:** Prettier 3.3+
- **Type Checking:** TypeScript
- **Package Manager:** npm or pnpm

---

## 4. Core Features & Requirements

### 4.1 Homepage

**Must-Have:**

- Hero section with high-impact property imagery
- Clear CTAs: "Book Now" and "View Availability"
- Property highlights (location, amenities, pricing from)
- Student housing vs. Mid-term rental sections/toggle
- Social proof (testimonials, ratings)
- Location map integration
- Footer with contact info and social links
- Blog preview section (latest 3 posts)

**Nice-to-Have:**

- Video tour autoplay in hero
- Live availability indicator
- Comparison table (student vs. mid-term options)
- Animated statistics counter

### 4.2 Property Details Page

**Must-Have:**

- Professional photo gallery (30+ images)
  - Lightbox functionality
  - Thumbnail navigation
- Virtual 3D tour embed (Matterport/Kuula)
- Detailed description sections:
  - Property overview
  - Neighborhood information
  - Transportation access
- Amenities list with icons
- Floor plans (if applicable)
- Pricing calculator based on stay duration
- Availability calendar (real-time)
- "Book Now" CTA (sticky on mobile)
- Reviews and ratings section
- FAQ section
- Location map with nearby points of interest
- Share functionality (social media)

**Nice-to-Have:**

- 360° photo viewer
- Video walkthrough
- Downloadable property brochure (PDF)
- Nearby attractions carousel

### 4.3 Booking System

**Must-Have:**

- Date range picker with real-time availability
  - Visual calendar interface
  - Block unavailable dates
  - Minimum/maximum stay validation
- Pricing breakdown:
  - Base rent
  - Deposit
  - Service fees
  - Taxes (if applicable)
  - Total calculation
- Guest information form:
  - Full name
  - Email
  - Phone number
  - Nationality/ID (if required)
  - Special requests
- Booking confirmation:
  - Email notification (Resend)
  - Booking reference number
  - Summary of booking details
- Terms & conditions acceptance
- Calendar sync (prevent double booking)
- Form validation (React Hook Form + Zod)

**Nice-to-Have:**

- Multi-step booking wizard
- Guest verification
- Early bird discounts
- Promo code functionality
- Booking modification request

### 4.4 Blog Structure

**Must-Have:**

- Blog listing page (`/blog`)
  - Grid/list view toggle
  - Category filtering
  - Search functionality
  - Pagination
- Individual blog post pages (`/blog/[slug]`)
  - Markdown/MDX content rendering
  - Featured image
  - Author information
  - Publication date
  - Reading time estimate
  - Related posts section
  - Social sharing buttons
- Blog categories:
  - Housing Tips
  - Neighborhood Guides
  - Student Life
  - Local Attractions
  - Property Updates

**Nice-to-Have:**

- RSS feed
- Newsletter subscription
- Comment system (future integration)
- SEO-optimized meta tags

### 4.5 Mobile Responsive Design

**Must-Have:**

- Fully responsive on all breakpoints:
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- Touch-optimized navigation
- Mobile-optimized image gallery
- Sticky booking CTA on mobile
- Fast load times (<3s on 3G)
- Progressive Web App (PWA) capabilities
- Mobile menu (hamburger)

**Nice-to-Have:**

- Swipe gestures for image gallery
- Pull-to-refresh functionality
- Offline support

### 4.6 SEO & Performance (Post-Initial Development)

**Must-Have (Phase 2):**

- Server-side rendering (Next.js)
- Meta tags optimization
- Schema.org structured data
- Image optimization (WebP, lazy loading)
- Sitemap generation (`/sitemap.xml`)
- robots.txt configuration
- Open Graph tags for social sharing
- Canonical URLs

**Nice-to-Have:**

- Multi-language support (English, Turkish)
- Blog content for SEO
- Internal linking strategy

---

## 5. Excluded Features (Phase 2.0)

The following features are **explicitly excluded** from Phase 1 and will be developed in Phase 2.0:

### 5.1 User Authentication

- User registration
- Login/logout functionality
- Password reset
- Social login (Google, Facebook)
- User profiles

### 5.2 User Dashboard

- View current and past bookings
- Download invoices
- Update profile information
- Saved properties (favorites)
- Booking history

### 5.3 Admin Panel

- Booking management (view, approve, cancel)
- Calendar management (block dates, set availability)
- Property content management (images, descriptions)
- Pricing management
- User management
- Payment tracking
- Analytics dashboard

**Note:** For Phase 1, bookings will be handled via form submission and email notifications. Manual management will be required initially.

---

## 6. Database Schema (Supabase)

### Core Tables

```sql
-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'Turkey',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  property_type VARCHAR(50), -- 'student_housing' or 'mid_term_rental'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Units/Rooms table (if property has multiple units)
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_name VARCHAR(100),
  unit_type VARCHAR(50), -- 'studio', '1br', '2br', etc.
  capacity INTEGER DEFAULT 1,
  base_price_per_month DECIMAL(10, 2),
  student_discount_percentage DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities table
CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  category VARCHAR(50), -- 'basic', 'premium', 'location'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property amenities junction table
CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

-- Images table
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  image_type VARCHAR(50), -- 'gallery', 'hero', 'floor_plan', 'virtual_tour'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability calendar
CREATE TABLE availability_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  price_override DECIMAL(10, 2), -- Optional price override for specific dates
  notes TEXT,
  UNIQUE(property_id, unit_id, date),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id),
  unit_id UUID REFERENCES units(id),
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  booking_type VARCHAR(50), -- 'student_housing' or 'mid_term_rental'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (end_date > start_date)
);

-- Reviews table (for future use)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  property_id UUID REFERENCES properties(id),
  guest_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- Markdown/MDX content
  featured_image_url TEXT,
  author_name VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_availability_calendar_date ON availability_calendar(date);
CREATE INDEX idx_availability_calendar_property ON availability_calendar(property_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);
```

---

## 7. Project Structure

```
keten/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions workflow
├── .next/                            # Next.js build output
├── public/
│   ├── images/                       # Static images
│   ├── icons/                        # Favicons, etc.
│   └── blog/                         # Blog assets
├── src/
│   ├── app/
│   │   ├── (public)/                 # Public routes group
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── layout.tsx            # Public layout
│   │   │   ├── property/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Property details page
│   │   │   ├── booking/
│   │   │   │   └── page.tsx          # Booking page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Blog post page
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # About page
│   │   │   └── contact/
│   │   │       └── page.tsx          # Contact page
│   │   ├── api/
│   │   │   ├── bookings/
│   │   │   │   └── route.ts          # Booking API endpoint
│   │   │   ├── availability/
│   │   │   │   └── route.ts          # Availability check API
│   │   │   └── blog/
│   │   │       └── route.ts          # Blog posts API
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...                   # Other shadcn components
│   │   ├── layout/
│   │   │   ├── header.tsx            # Site header
│   │   │   ├── footer.tsx            # Site footer
│   │   │   └── navigation.tsx        # Navigation component
│   │   ├── property/
│   │   │   ├── property-hero.tsx     # Property hero section
│   │   │   ├── image-gallery.tsx     # Image gallery component
│   │   │   ├── amenities-list.tsx    # Amenities display
│   │   │   ├── availability-calendar.tsx # Availability calendar
│   │   │   ├── pricing-calculator.tsx # Pricing calculator
│   │   │   └── booking-widget.tsx    # Booking widget
│   │   ├── booking/
│   │   │   ├── booking-form.tsx      # Booking form
│   │   │   ├── date-picker.tsx       # Date range picker
│   │   │   └── pricing-breakdown.tsx # Price breakdown
│   │   ├── blog/
│   │   │   ├── blog-card.tsx         # Blog post card
│   │   │   ├── blog-list.tsx         # Blog listing
│   │   │   └── blog-content.tsx      # Blog content renderer
│   │   └── shared/
│   │       ├── map.tsx                # Map component
│   │       ├── testimonial.tsx        # Testimonial component
│   │       └── seo-head.tsx           # SEO head component
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Supabase client
│   │   │   ├── server.ts             # Server-side Supabase
│   │   │   └── queries.ts            # Database queries
│   │   ├── utils.ts                  # Utility functions
│   │   ├── validations.ts            # Zod schemas
│   │   └── constants.ts              # App constants
│   ├── hooks/
│   │   ├── use-booking.ts            # Booking logic hook
│   │   ├── use-property.ts           # Property data hook
│   │   └── use-availability.ts        # Availability hook
│   ├── store/
│   │   └── booking-store.ts          # Zustand booking store
│   ├── types/
│   │   ├── database.types.ts         # Supabase types
│   │   ├── booking.types.ts          # Booking types
│   │   └── property.types.ts         # Property types
│   └── content/
│       └── blog/                      # Blog markdown files
│           ├── post-1.md
│           └── post-2.md
├── .env.local                         # Environment variables (gitignored)
├── .env.example                       # Example env file
├── .eslintrc.json                     # ESLint config
├── .prettierrc                        # Prettier config
├── components.json                    # shadcn/ui config
├── next.config.ts                     # Next.js config
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind config
├── tsconfig.json                      # TypeScript config
└── README.md                          # Project documentation
```

---

## 8. Design System

### Color Palette (Simple & Scalable)

**Primary Colors:**

```css
--primary: 220 14% 96%; /* Light gray-blue */
--primary-foreground: 222 47% 11%; /* Dark blue-gray */
```

**Secondary Colors:**

```css
--secondary: 210 40% 98%; /* Very light blue */
--secondary-foreground: 222 47% 11%;
```

**Accent Colors:**

```css
--accent: 210 40% 96%; /* Light accent */
--accent-foreground: 222 47% 11%;
```

**Neutral Colors:**

```css
--background: 0 0% 100%; /* White */
--foreground: 222 47% 11%; /* Dark text */
--muted: 210 40% 96%; /* Muted background */
--muted-foreground: 215 16% 47%; /* Muted text */
--border: 214 32% 91%; /* Border color */
--input: 214 32% 91%; /* Input border */
--ring: 222 47% 11%; /* Focus ring */
```

**Semantic Colors:**

```css
--destructive: 0 84% 60%; /* Error/Delete */
--destructive-foreground: 0 0% 98%;
--success: 142 76% 36%; /* Success */
--warning: 38 92% 50%; /* Warning */
```

**Note:** Color palette uses HSL format compatible with Tailwind CSS and shadcn/ui. Colors can be easily adjusted later via CSS variables.

### Typography

**Font Family:**

- **Headings:** Inter (Bold, 600-800 weight)
- **Body:** Inter (Regular, 400-500 weight)
- **Monospace:** JetBrains Mono (for code, prices)

**Font Sizes (Tailwind scale):**

- `text-xs`: 0.75rem (12px)
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px)
- `text-5xl`: 3rem (48px)

### Spacing System

Uses Tailwind's default spacing scale (0.25rem increments).

### Component Library (shadcn/ui)

- Button, Input, Label, Textarea
- Card, Badge, Avatar
- Dialog, Sheet, Dropdown Menu
- Calendar, Date Picker
- Tabs, Accordion
- Toast, Alert
- Form components
- Table, Pagination
- Skeleton (loading states)

---

## 9. Development Phases

### Phase 1: Foundation & Core Features (Weeks 1-4)

#### Week 1: Project Setup

- ✅ Create GitHub repository
- ✅ Initialize Next.js 16+ project with TypeScript
- ✅ Install and configure Tailwind CSS 4.0+
- ✅ Install and configure shadcn/ui
- ✅ Set up Supabase project
- ✅ Configure database schema
- ✅ Set up Vercel deployment
- ✅ Configure GitHub Actions CI/CD
- ✅ Set up ESLint, Prettier
- ✅ Create basic layout components (Header, Footer)

#### Week 2: Homepage & Property Details

- 🏠 Design and develop homepage
- 🏠 Property hero section
- 🏠 Image gallery component
- 🏠 Amenities list component
- 🏠 Property details page structure
- 🏠 Map integration
- 📱 Mobile responsive adjustments

#### Week 3: Booking System

- 📅 Availability calendar component
- 📅 Date range picker
- 📅 Booking form with validation
- 📅 Pricing calculator
- 📅 Booking API endpoint
- 📧 Email notification setup (Resend)
- 🗄️ Database queries for availability

#### Week 4: Blog Structure & Polish

- 📝 Blog listing page
- 📝 Blog post page template
- 📝 MDX content rendering
- 📝 Blog API endpoints
- 🎨 UI polish and refinements
- 🐛 Bug fixes and testing
- 📱 Final mobile optimizations

### Phase 2: SEO & Performance (Weeks 5-6)

- 🔍 SEO optimization (meta tags, structured data)
- 🖼️ Image optimization (WebP, lazy loading)
- 📊 Google Analytics integration
- 🗺️ Sitemap generation
- 🤖 robots.txt configuration
- ⚡ Performance optimization
- 🧪 Lighthouse testing and improvements

### Phase 3: Future Enhancements (Post-Launch)

- 💳 Payment gateway integration (Turkish provider)
- 👤 User authentication system
- 📊 User dashboard
- 🛠️ Admin panel
- 🔔 Advanced notifications
- 🌐 Multi-language support (Turkish)
- 📱 PWA enhancements

---

## 10. API Endpoints

### Public Endpoints

```
GET    /api/properties              # Get all properties
GET    /api/properties/[slug]       # Get property by slug
GET    /api/availability            # Check availability (query params: start_date, end_date, property_id)
POST   /api/bookings                # Create booking
GET    /api/blog                    # Get blog posts (query params: category, page, limit)
GET    /api/blog/[slug]             # Get blog post by slug
```

### Request/Response Examples

**Get Property:**

```typescript
GET /api/properties/keten-property

Response:
{
  id: "uuid",
  name: "Keten Property",
  slug: "keten-property",
  description: "...",
  images: [...],
  amenities: [...],
  // ... other fields
}
```

**Check Availability:**

```typescript
GET /api/availability?property_id=uuid&start_date=2025-12-01&end_date=2025-12-31

Response:
{
  available: true,
  available_dates: ["2025-12-01", "2025-12-02", ...],
  blocked_dates: ["2025-12-15", "2025-12-16"],
  price_per_month: 5000,
  total_price: 10000
}
```

**Create Booking:**

```typescript
POST /api/bookings

Body:
{
  property_id: "uuid",
  unit_id: "uuid",
  guest_name: "John Doe",
  guest_email: "john@example.com",
  guest_phone: "+90 555 123 4567",
  start_date: "2025-12-01",
  end_date: "2025-12-31",
  booking_type: "mid_term_rental",
  special_requests: "Early check-in preferred"
}

Response:
{
  success: true,
  booking_id: "uuid",
  booking_reference: "KTN-2025-001",
  message: "Booking request received"
}
```

---

## 11. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@keten.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# App Configuration
NEXT_PUBLIC_APP_URL=https://keten.com
NEXT_PUBLIC_CONTACT_EMAIL=info@keten.com
NEXT_PUBLIC_CONTACT_PHONE=+90 555 123 4567

# Maps (Google Maps or Mapbox)
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

---

## 12. Dependencies

### Production Dependencies

```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.6.0",
  "@supabase/supabase-js": "^2.45.0",
  "@supabase/ssr": "^0.5.0",
  "zustand": "^4.5.0",
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.9.0",
  "date-fns": "^4.0.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "react-day-picker": "^9.0.0",
  "resend": "^4.0.0",
  "@radix-ui/react-*": "^1.0.0", // Various Radix UI packages
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

### Development Dependencies

```json
{
  "@types/node": "^22.0.0",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "eslint": "^9.0.0",
  "eslint-config-next": "^15.1.0",
  "prettier": "^3.3.0",
  "prettier-plugin-tailwindcss": "^0.6.0",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47",
  "tailwindcss": "^4.0.0"
}
```

---

## 13. Success Metrics (KPIs)

### User Engagement

- Page views per session: >4
- Average session duration: >3 minutes
- Bounce rate: <40%
- Mobile traffic: >60%

### Conversion

- Inquiry rate: >5% of visitors
- Booking conversion: >15% of inquiries
- Average booking value: Track monthly
- Blog engagement: >2 minutes average read time

### Technical

- Page load time: <2 seconds
- Lighthouse score: >90
- Uptime: >99.9%
- Error rate: <1%

---

## 14. Security & Compliance

### Security Measures

- HTTPS enforcement (Vercel)
- Supabase Row Level Security (RLS)
- Input validation & sanitization (Zod)
- CSRF protection (Next.js built-in)
- Rate limiting on APIs (future)
- Environment variable protection
- Regular dependency updates

### Compliance

- GDPR compliance (data privacy)
- Cookie consent (future)
- Terms of service page
- Privacy policy page
- Data retention policies

---

## 15. Testing Strategy

### Unit Testing

- Component testing with React Testing Library
- Utility function testing
- Validation schema testing

### Integration Testing

- API endpoint testing
- Database query testing
- Form submission testing

### E2E Testing (Future)

- Booking flow testing
- Navigation testing
- Mobile responsiveness testing

---

## 16. Documentation Requirements

### Code Documentation

- JSDoc comments for complex functions
- README.md with setup instructions
- API documentation (inline comments)

### User Documentation

- Booking guide
- FAQ page
- Contact information

---

## 17. Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Supabase RLS policies configured
- [ ] Images uploaded to Supabase Storage
- [ ] Google Analytics configured
- [ ] Email templates tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed

### Post-Deployment

- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking verified
- [ ] Email notifications working
- [ ] Booking form submissions tested
- [ ] Performance monitoring active

---

## 18. Future Enhancements (Post-Launch)

- **Multi-property support** (if expanding)
- **Mobile native app** (React Native)
- **AI chatbot** for inquiries
- **Dynamic pricing** based on demand
- **Referral program**
- **Multi-language support** (Turkish)
- **Integration with property management systems**
- **Smart home integration** (IoT)
- **Advanced analytics dashboard**
- **Customer portal** (Phase 2.0)

---

## 19. Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest keten --typescript --tailwind --app --use-npm

# Navigate to project
cd keten

# Install shadcn/ui
npx shadcn@latest init

# Install core dependencies
npm install @supabase/supabase-js @supabase/ssr zustand react-hook-form zod @hookform/resolvers date-fns framer-motion lucide-react react-day-picker resend

# Install shadcn components (as needed)
npx shadcn@latest add button card input label textarea calendar dialog form select tabs accordion toast alert badge avatar

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 20. Contact & Support

**Project Repository:** [GitHub URL]  
**Deployment:** [Vercel URL]  
**Documentation:** [Docs URL]

---

## Appendix A: Reference Websites

- **Nook Istanbul:** https://nook.istanbul
- **Blueground:** https://www.theblueground.com

---

## Appendix B: Turkish Payment Providers (Future Reference)

- **Iyzico:** https://www.iyzico.com
- **PayTR:** https://www.paytr.com
- **Paymes:** https://www.paymes.com.tr

---

**Document Status:** ✅ Ready for Implementation  
**Last Updated:** November 16, 2025  
**Next Review:** After Phase 1 Completion
