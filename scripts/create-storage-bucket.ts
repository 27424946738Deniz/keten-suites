#!/usr/bin/env tsx
/**
 * Create Supabase Storage Bucket Script
 * 
 * This script creates a storage bucket for property images in Supabase
 * with public read access.
 * 
 * Usage:
 *   npx tsx scripts/create-storage-bucket.ts
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

const BUCKET_NAME = "property-images";
const BUCKET_PUBLIC = true;

async function createStorageBucket() {
  try {
    console.log(`📦 Creating storage bucket: ${BUCKET_NAME}...`);

    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("❌ Error listing buckets:", listError);
      throw listError;
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (bucketExists) {
      console.log(`✅ Bucket '${BUCKET_NAME}' already exists`);
      
      // Update bucket to ensure it's public
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: BUCKET_PUBLIC,
      });

      if (updateError) {
        console.warn("⚠️  Warning: Could not update bucket settings:", updateError.message);
      } else {
        console.log(`✅ Bucket updated to be ${BUCKET_PUBLIC ? "public" : "private"}`);
      }
    } else {
      // Create new bucket
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: BUCKET_PUBLIC,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      });

      if (error) {
        console.error("❌ Error creating bucket:", error);
        throw error;
      }

      console.log(`✅ Bucket '${BUCKET_NAME}' created successfully`);
      console.log(`   Public access: ${BUCKET_PUBLIC ? "enabled" : "disabled"}`);
    }

    // Set up bucket policies for public read access
    console.log("\n📋 Setting up bucket policies...");
    console.log("   Note: Bucket policies are managed via Supabase Dashboard:");
    console.log("   1. Go to Storage > Policies");
    console.log("   2. Select the 'property-images' bucket");
    console.log("   3. Create a policy for public read access:");
    console.log("      Policy name: Public Read");
    console.log("      Allowed operation: SELECT");
    console.log("      Target roles: anon, authenticated");
    console.log("      Policy definition: true");

    console.log("\n✅ Storage bucket setup completed!");
    
  } catch (error) {
    console.error("❌ Error creating storage bucket:", error);
    process.exit(1);
  }
}

createStorageBucket().catch(console.error);

