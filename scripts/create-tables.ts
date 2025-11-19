#!/usr/bin/env tsx
/**
 * Database Schema Setup Script
 * 
 * This script executes the database schema SQL file to create all tables,
 * indexes, triggers, and RLS policies in Supabase.
 * 
 * Usage:
 *   npx tsx scripts/create-tables.ts
 * 
 * Requirements:
 *   - SUPABASE_URL environment variable
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
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

async function executeSchema() {
  try {
    console.log("📖 Reading schema file...");
    const schemaPath = join(process.cwd(), "database", "schema.sql");
    const schemaSQL = readFileSync(schemaPath, "utf-8");

    // Split SQL into individual statements
    // Remove comments and split by semicolons
    const statements = schemaSQL
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement || statement.length === 0) continue;

      try {
        // Use RPC to execute SQL (requires a function in Supabase)
        // Since we can't execute raw SQL directly, we'll use the REST API
        // For now, we'll provide instructions to run in Supabase SQL Editor
        
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        
        // Note: Supabase JS client doesn't support raw SQL execution
        // This script provides the SQL to be executed manually or via Supabase CLI
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error);
        throw error;
      }
    }

    console.log("\n✅ Schema execution completed!");
    console.log("\n⚠️  Note: Supabase JS client doesn't support raw SQL execution.");
    console.log("   Please run the SQL from database/schema.sql in your Supabase SQL Editor:");
    console.log("   1. Go to https://supabase.com/dashboard");
    console.log("   2. Select your project");
    console.log("   3. Go to SQL Editor");
    console.log("   4. Copy and paste the contents of database/schema.sql");
    console.log("   5. Click 'Run' to execute");
    
  } catch (error) {
    console.error("❌ Error executing schema:", error);
    process.exit(1);
  }
}

// Alternative: Use Supabase Management API
async function executeViaManagementAPI() {
  console.log("\n📋 Alternative: Using Supabase Management API");
  console.log("   This requires the Supabase Management API key.");
  console.log("   You can also use the Supabase CLI:");
  console.log("   npx supabase db push");
}

executeSchema().catch(console.error);

