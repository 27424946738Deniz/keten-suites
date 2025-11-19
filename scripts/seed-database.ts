#!/usr/bin/env tsx
/**
 * Database Seed Script
 *
 * This script seeds the database with sample data including:
 * - Properties
 * - Units
 * - Amenities
 * - Property-Amenity relationships
 * - Blog posts
 *
 * Usage:
 *   npx tsx scripts/seed-database.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables:");
  console.error("   NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  console.error("   SUPABASE_SERVICE_ROLE_KEY");
  console.error("\nPlease set these in your .env.local file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const sampleAmenities = [
  { name: "WiFi", icon: "wifi", category: "internet" },
  { name: "Air Conditioning", icon: "air-conditioning", category: "comfort" },
  { name: "Heating", icon: "heating", category: "comfort" },
  { name: "Kitchen", icon: "kitchen", category: "facilities" },
  { name: "Washing Machine", icon: "washing-machine", category: "facilities" },
  { name: "TV", icon: "tv", category: "entertainment" },
  { name: "Parking", icon: "parking", category: "facilities" },
  { name: "Balcony", icon: "balcony", category: "outdoor" },
  { name: "Security", icon: "security", category: "safety" },
  { name: "Elevator", icon: "elevator", category: "facilities" },
];

const sampleProperties = [
  {
    name: "Keten Suites",
    slug: "keten-suites",
    description: `
      <p>Welcome to Keten Suites, a modern residential complex offering comfortable living spaces in Istanbul.</p>
      <p>Our apartments are fully furnished with all the amenities you need for comfortable living. Located in the heart of Istanbul, you'll have easy access to public transportation, shopping, dining, and all the city has to offer.</p>
      <h3>Features:</h3>
      <ul>
        <li>Fully furnished apartments</li>
        <li>High-speed WiFi included</li>
        <li>24/7 security</li>
        <li>Modern common areas</li>
        <li>Laundry facilities</li>
        <li>Full kitchen in each unit</li>
      </ul>
    `,
    short_description: "Modern rental apartments in the heart of Istanbul",
    address: "Kadıköy, Istanbul, Turkey",
    city: "Istanbul",
    country: "Turkey",
    latitude: 40.9923,
    longitude: 29.0234,
    property_type: "apartments",
  },
  {
    name: "Keten Mid-Term Apartments",
    slug: "keten-mid-term-apartments",
    description: `
      <p>Perfect for professionals, digital nomads, and anyone looking for flexible mid-term accommodation in Istanbul.</p>
      <p>Our mid-term apartments combine comfort, convenience, and style. Each apartment is fully equipped with modern amenities and located in prime areas of Istanbul.</p>
      <h3>Features:</h3>
      <ul>
        <li>Fully furnished apartments</li>
        <li>Flexible lease terms (1-12 months)</li>
        <li>All utilities included</li>
        <li>Modern kitchen and appliances</li>
        <li>High-speed internet</li>
        <li>Cleaning service available</li>
      </ul>
    `,
    short_description: "Flexible mid-term rentals for professionals",
    address: "Beşiktaş, Istanbul, Turkey",
    city: "Istanbul",
    country: "Turkey",
    latitude: 41.0422,
    longitude: 29.0089,
    property_type: "mid_term_rental",
  },
];

const sampleUnits = [
  {
    unit_name: "1+1 Economy Suite",
    unit_type: "1+1-economy",
    capacity: 2,
    base_price_per_month: 15000,
    short_description: "Compact and affordable studio apartment perfect for singles or young professionals.",
    images: [
      {
        url: "/1729079653_XUWQKFQN04_medium.jpg",
        alt_text: "1+1 Economy Suite living area",
        display_order: 0,
      },
    ],
  },
  {
    unit_name: "1+1 Premium Suite",
    unit_type: "1+1-premium",
    capacity: 2,
    base_price_per_month: 22000,
    short_description: "Upgraded studio with modern fixtures, premium finishes, and better views.",
    images: [
      {
        url: "/1729086563_YZCWXUXA3A_medium.jpg",
        alt_text: "1+1 Premium Suite living space",
        display_order: 0,
      },
    ],
  },
  {
    unit_name: "2+1 Economy Suite",
    unit_type: "2+1-economy",
    capacity: 4,
    base_price_per_month: 28000,
    short_description: "Spacious two-bedroom apartment ideal for families or roommates sharing.",
    images: [
      {
        url: "/1729079829_G88KISGAH3_medium.jpg",
        alt_text: "2+1 Economy Suite living room",
        display_order: 0,
      },
    ],
  },
  {
    unit_name: "2+1 Family Duplex with Terrace",
    unit_type: "2+1-family-duplex",
    capacity: 5,
    base_price_per_month: 42000,
    short_description: "Two-story duplex apartment with private terrace, perfect for families.",
    images: [
      {
        url: "/1729084042_14BPRAW6MG_medium.jpg",
        alt_text: "2+1 Family Duplex living area",
        display_order: 0,
      },
    ],
  },
  {
    unit_name: "3+1 Family Duplex with Terrace",
    unit_type: "3+1-family-duplex",
    capacity: 6,
    base_price_per_month: 55000,
    short_description: "Premium three-bedroom duplex with expansive terrace, ideal for larger families.",
    images: [
      {
        url: "/1729083986_A6WDV4VDKB_medium.jpg",
        alt_text: "3+1 Family Duplex spacious living room",
        display_order: 0,
      },
    ],
  },
];

const sampleBlogPosts = [
  {
    slug: "welcome-to-keten",
    title: "Welcome to Keten Suites - Your Home in Istanbul",
    excerpt:
      "Discover what makes Keten Suites the perfect choice for modern living in Istanbul.",
    content: `
# Welcome to Keten Suites

Welcome to **Keten Suites**, your trusted partner for comfortable modern housing in Istanbul.

## Why Choose Keten Suites?

- **Prime Locations**: All our properties are located in the best neighborhoods of Istanbul
- **Modern Amenities**: Fully furnished spaces with all the comforts you need
- **Flexible Terms**: Choose from various apartment types to suit your needs
- **24/7 Support**: Our team is always here to help

## Modern Apartments

Our apartments are designed with your comfort in mind. Contemporary, spacious, and located in great areas of Istanbul.

## Mid-Term Rentals

Perfect for professionals, families, and anyone who needs quality accommodation in Istanbul.

Contact us today to find your perfect home!
    `,
    featured_image_url: null,
    author_name: "Keten Team",
    category: "announcements",
    tags: ["welcome", "housing", "istanbul"],
    is_published: true,
    published_at: new Date().toISOString(),
  },
  {
    slug: "istanbul-living-guide",
    title: "A Complete Guide to Living in Istanbul",
    excerpt:
      "Everything you need to know about living in Istanbul as a resident.",
    content: `
# A Complete Guide to Living in Istanbul

Istanbul is one of the most vibrant and exciting cities in the world. Here's everything you need to know.

## Transportation

Istanbul has an extensive public transportation network including:
- Metro lines
- Buses
- Ferries
- Trams
- Marmaray undersea railway

## Neighborhoods

Istanbul offers diverse neighborhoods each with its own character:
- Kadıköy: Vibrant Asian side, cafes and nightlife
- Beşiktaş: Central location, close to everything
- Şişli: Modern business district
- Nişantaşı: Upscale shopping and dining

## Cost of Living

Istanbul offers a reasonable cost of living compared to other major European cities, with great value for quality housing.

## Culture and Entertainment

From historic sites to modern entertainment, Istanbul has something for everyone.
    `,
    featured_image_url: null,
    author_name: "Keten Team",
    category: "guides",
    tags: ["living", "istanbul", "guide"],
    is_published: true,
    published_at: new Date().toISOString(),
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // 1. Create Amenities
    console.log("1️⃣  Creating amenities...");
    const amenityIds: Record<string, string> = {};

    for (const amenity of sampleAmenities) {
      const { data, error } = await supabase
        .from("amenities")
        .upsert(amenity, { onConflict: "name" })
        .select()
        .single();

      if (error && error.code !== "23505") {
        // Ignore duplicate key errors
        console.error(
          `   ❌ Error creating amenity ${amenity.name}:`,
          error.message
        );
      } else if (data) {
        amenityIds[amenity.name] = data.id;
        console.log(`   ✅ Created amenity: ${amenity.name}`);
      }
    }

    // 2. Create Properties
    console.log("\n2️⃣  Creating properties...");
    const propertyIds: string[] = [];

    for (const property of sampleProperties) {
      const { data, error } = await supabase
        .from("properties")
        .upsert(property, { onConflict: "slug" })
        .select()
        .single();

      if (error && error.code !== "23505") {
        console.error(
          `   ❌ Error creating property ${property.name}:`,
          error.message
        );
      } else if (data) {
        propertyIds.push(data.id);
        console.log(`   ✅ Created property: ${property.name}`);

        // 3. Create Units for each property
        console.log(`   📦 Creating units for ${property.name}...`);
        for (const unit of sampleUnits) {
          const { images, ...unitData } = unit;
          const { data: createdUnit, error: unitError } = await supabase
            .from("units")
            .insert({
              ...unitData,
              property_id: data.id,
            })
            .select()
            .single();

          if (unitError && unitError.code !== "23505") {
            console.error(`      ❌ Error creating unit:`, unitError.message);
          } else if (createdUnit) {
            console.log(`      ✅ Created unit: ${unit.unit_name}`);
            
            // Add images for this unit
            if (images && images.length > 0) {
              for (const image of images) {
                const { error: imageError } = await supabase
                  .from("images")
                  .insert({
                    unit_id: createdUnit.id,
                    ...image,
                  });
                
                if (imageError && imageError.code !== "23505") {
                  console.error(`         ❌ Error adding image:`, imageError.message);
                } else {
                  console.log(`         ✅ Added image for unit`);
                }
              }
            }
          }
        }

        // 4. Link Amenities to Properties
        console.log(`   🔗 Linking amenities to ${property.name}...`);
        for (const amenityName of Object.keys(amenityIds)) {
          const { error: linkError } = await supabase
            .from("property_amenities")
            .upsert(
              {
                property_id: data.id,
                amenity_id: amenityIds[amenityName],
              },
              { onConflict: "property_id,amenity_id" }
            );

          if (linkError && linkError.code !== "23505") {
            console.error(
              `      ❌ Error linking amenity ${amenityName}:`,
              linkError.message
            );
          }
        }
        console.log(`   ✅ Linked ${Object.keys(amenityIds).length} amenities`);
      }
    }

    // 5. Create Blog Posts
    console.log("\n3️⃣  Creating blog posts...");
    for (const post of sampleBlogPosts) {
      const { data, error } = await supabase
        .from("blog_posts")
        .upsert(post, { onConflict: "slug" })
        .select()
        .single();

      if (error && error.code !== "23505") {
        console.error(
          `   ❌ Error creating blog post ${post.title}:`,
          error.message
        );
      } else if (data) {
        console.log(`   ✅ Created blog post: ${post.title}`);
      }
    }

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${sampleAmenities.length} amenities created`);
    console.log(`   - ${sampleProperties.length} properties created`);
    console.log(
      `   - ${sampleUnits.length * sampleProperties.length} units created`
    );
    console.log(`   - ${sampleBlogPosts.length} blog posts created`);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase().catch(console.error);
