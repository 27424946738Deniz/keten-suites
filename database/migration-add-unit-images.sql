-- Migration: Add unit support to images table and short_description to units
-- Run this in Supabase SQL Editor

-- 1. Add unit_id to images table
ALTER TABLE images ADD COLUMN IF NOT EXISTS unit_id UUID REFERENCES units(id) ON DELETE CASCADE;

-- 2. Add constraint to ensure either property_id or unit_id is set
ALTER TABLE images DROP CONSTRAINT IF EXISTS check_property_or_unit;
ALTER TABLE images ADD CONSTRAINT check_property_or_unit CHECK (
  (property_id IS NOT NULL AND unit_id IS NULL) OR
  (property_id IS NULL AND unit_id IS NOT NULL)
);

-- 3. Add short_description to units table
ALTER TABLE units ADD COLUMN IF NOT EXISTS short_description TEXT;

-- 4. Create index for unit_id in images
CREATE INDEX IF NOT EXISTS idx_images_unit_id ON images(unit_id);


