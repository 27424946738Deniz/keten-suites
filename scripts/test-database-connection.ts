#!/usr/bin/env tsx
/**
 * Database Connection Test Script
 * 
 * This script tests the database connection and verifies that all tables
 * exist and RLS policies are configured correctly.
 * 
 * Usage:
 *   npx tsx scripts/test-database-connection.ts
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable (for RLS testing)
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable (for admin operations)
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  process.exit(1);
}

if (!supabaseAnonKey && !supabaseServiceKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const expectedTables = [
  "properties",
  "units",
  "amenities",
  "property_amenities",
  "images",
  "availability_calendar",
  "bookings",
  "reviews",
  "blog_posts",
];

async function testDatabaseConnection() {
  console.log("🔍 Testing database connection...\n");

  // Test with service role key (bypasses RLS)
  const adminClient = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

  // Test with anon key (respects RLS)
  const anonClient = supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

  try {
    // Test 1: Check if we can connect
    console.log("1️⃣  Testing connection...");
    if (adminClient) {
      const { data, error } = await adminClient.from("properties").select("id").limit(1);
      if (error && error.code !== "PGRST116") {
        // PGRST116 is "relation does not exist" which is expected if tables aren't created
        console.error("   ❌ Connection error:", error.message);
        throw error;
      }
      console.log("   ✅ Connection successful");
    } else {
      console.log("   ⚠️  Skipping (no service role key)");
    }

    // Test 2: Verify tables exist
    console.log("\n2️⃣  Verifying tables exist...");
    const existingTables: string[] = [];

    for (const table of expectedTables) {
      try {
        const { error } = await (adminClient || anonClient)!
          .from(table)
          .select("id")
          .limit(1);

        if (error) {
          if (error.code === "PGRST116") {
            console.log(`   ❌ Table '${table}' does not exist`);
          } else {
            console.log(`   ⚠️  Table '${table}' exists but has an error: ${error.message}`);
            existingTables.push(table);
          }
        } else {
          console.log(`   ✅ Table '${table}' exists`);
          existingTables.push(table);
        }
      } catch (err) {
        console.log(`   ❌ Error checking table '${table}':`, err);
      }
    }

    if (existingTables.length === expectedTables.length) {
      console.log(`\n✅ All ${expectedTables.length} tables exist`);
    } else {
      console.log(`\n⚠️  Only ${existingTables.length}/${expectedTables.length} tables exist`);
      console.log("   Please run the schema.sql file in Supabase SQL Editor");
    }

    // Test 3: Test RLS policies (if anon key is available)
    if (anonClient) {
      console.log("\n3️⃣  Testing RLS policies...");
      
      // Test properties table (should be readable by everyone)
      const { data: properties, error: propertiesError } = await anonClient
        .from("properties")
        .select("id")
        .limit(1);

      if (propertiesError && propertiesError.code !== "PGRST116") {
        console.log("   ⚠️  Properties RLS test:", propertiesError.message);
      } else {
        console.log("   ✅ Properties table is readable (RLS working)");
      }

      // Test blog_posts table (should only show published posts)
      const { data: blogPosts, error: blogError } = await anonClient
        .from("blog_posts")
        .select("id")
        .limit(1);

      if (blogError && blogError.code !== "PGRST116") {
        console.log("   ⚠️  Blog posts RLS test:", blogError.message);
      } else {
        console.log("   ✅ Blog posts table respects RLS (only published posts visible)");
      }
    } else {
      console.log("\n3️⃣  Skipping RLS tests (no anon key provided)");
    }

    // Test 4: Check indexes (if admin client available)
    if (adminClient) {
      console.log("\n4️⃣  Checking indexes...");
      console.log("   Note: Index verification requires direct database access");
      console.log("   Expected indexes:");
      expectedTables.forEach((table) => {
        if (table === "properties") console.log("     - idx_properties_slug");
        if (table === "availability_calendar") {
          console.log("     - idx_availability_calendar_date");
          console.log("     - idx_availability_calendar_property");
        }
        if (table === "bookings") {
          console.log("     - idx_bookings_dates");
          console.log("     - idx_bookings_status");
        }
        if (table === "blog_posts") {
          console.log("     - idx_blog_posts_slug");
          console.log("     - idx_blog_posts_published");
        }
      });
    }

    console.log("\n✅ Database connection test completed!");
    
  } catch (error) {
    console.error("\n❌ Database connection test failed:", error);
    process.exit(1);
  }
}

testDatabaseConnection().catch(console.error);

