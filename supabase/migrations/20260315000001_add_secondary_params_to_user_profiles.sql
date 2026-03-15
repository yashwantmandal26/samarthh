-- Migration: Add secondary parameters to user_profiles table

ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS occupation TEXT,
ADD COLUMN IF NOT EXISTS geography TEXT,
ADD COLUMN IF NOT EXISTS special_status TEXT;

-- Update the user_profiles table if needed to support these new fields in RLS or other constraints
-- (The existing policy for anyone can manage their own profile should already cover this)
