-- Migration: Rename geography to rural_or_urban in user_profiles table

ALTER TABLE public.user_profiles 
RENAME COLUMN geography TO rural_or_urban;
