-- Profile Enhancement Migration Script
-- Adds new columns to users table for enhanced profile fields
-- Run this in Supabase SQL Editor

-- Add new columns for enhanced profile information
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add comments to document the new columns
COMMENT ON COLUMN public.users.dob IS 'Date of birth';
COMMENT ON COLUMN public.users.gender IS 'Gender identity';
COMMENT ON COLUMN public.users.phone IS 'Phone number with country code';
COMMENT ON COLUMN public.users.company IS 'Company or organization name';
COMMENT ON COLUMN public.users.job_title IS 'Job title or position';
COMMENT ON COLUMN public.users.location IS 'City and country';

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('dob', 'gender', 'phone', 'company', 'job_title', 'location')
ORDER BY column_name;
