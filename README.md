# Keten - Housing Rental Platform

A modern, responsive housing rental website built with Next.js 16, showcasing student housing and mid-term rental options in Istanbul.

## 🚀 Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript 5.6+
- **UI Components:** shadcn/ui (Radix UI)
- **Styling:** Tailwind CSS 4.0+
- **Database:** Supabase (PostgreSQL)
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Date Handling:** date-fns + react-day-picker
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email:** Resend
- **Analytics:** Google Analytics 4
- **MCP:** shadcn/ui MCP Server (for component discovery)

## 📋 Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm
- Supabase account
- Resend account (for emails)
- Google Analytics account (optional)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd keten
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `RESEND_API_KEY` - Your Resend API key
- `RESEND_FROM_EMAIL` - Email address for sending emails
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email address
- `NEXT_PUBLIC_CONTACT_PHONE` - Contact phone number
- `NEXT_PUBLIC_MAPS_API_KEY` - Google Maps or Mapbox API key

### 4. Set Up Supabase Database

#### Option A: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the SQL

#### Option B: Using Database Scripts

The project includes helpful scripts for database setup:

```bash
# Get instructions for creating tables
npm run db:create-tables

# Create storage bucket for images
npm run db:create-bucket

# Test database connection
npm run db:test

# Seed database with sample data
npm run db:seed
```

**Required Tables:**
- `properties` - Property listings
- `units` - Property units/rooms
- `amenities` - Available amenities
- `property_amenities` - Property-amenity relationships
- `images` - Property images
- `availability_calendar` - Availability calendar entries
- `bookings` - Booking records
- `reviews` - Property reviews
- `blog_posts` - Blog posts

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
keten/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public routes group
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── property/      # Property details
│   │   │   ├── booking/       # Booking page
│   │   │   ├── blog/          # Blog pages
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer
│   │   ├── property/          # Property components
│   │   ├── booking/           # Booking components
│   │   ├── blog/              # Blog components
│   │   └── shared/            # Shared components
│   ├── lib/
│   │   ├── supabase/          # Supabase client & queries
│   │   ├── utils.ts           # Utility functions
│   │   ├── validations.ts     # Zod schemas
│   │   └── constants.ts      # App constants
│   ├── hooks/                 # Custom React hooks
│   ├── store/                  # Zustand stores
│   ├── types/                 # TypeScript types
│   └── content/
│       └── blog/              # Blog markdown files
├── public/                    # Static assets
├── .env.example              # Environment variables template
└── PRD.md                     # Product Requirements Document
```

## 🎨 Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dropdown-menu
```

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Operations
- `npm run db:create-tables` - Get instructions for creating database tables
- `npm run db:create-bucket` - Create Supabase storage bucket for images
- `npm run db:test` - Test database connection and verify tables
- `npm run db:seed` - Seed database with sample data (properties, amenities, blog posts)

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration (includes MDX setup)
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `components.json` - shadcn/ui configuration
- `.env.example` - Environment variables template
- `database/schema.sql` - Database schema SQL file

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The project is configured for automatic deployments on push to main branch.

## 🤖 MCP (Model Context Protocol) Setup

The project includes shadcn/ui MCP server configuration for Cursor. This allows AI assistants to browse, search, and install components using natural language.

**Quick Start:**
1. The MCP server is already configured in `.cursor/mcp.json`
2. Restart Cursor to activate the MCP server
3. Use natural language prompts like:
   - "Add a dropdown menu component"
   - "Show me all form components"
   - "Install a data table component"

See [MCP_SETUP.md](./MCP_SETUP.md) for detailed documentation.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui MCP Documentation](https://ui.shadcn.com/docs/mcp)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

Private - All rights reserved

## 👥 Support

For questions or support, please contact: info@keten.com
