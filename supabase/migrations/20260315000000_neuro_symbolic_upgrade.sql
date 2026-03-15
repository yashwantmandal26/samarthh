
-- Step 1: Database Expansion for Neuro-Symbolic Multi-Agent System

-- Create user_profiles table to store extracted user facts
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  age INT,
  annual_income INT,
  category TEXT, -- e.g., 'SC', 'ST', 'OBC', 'General'
  gender TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create schemes_db table for symbolic rule matching
CREATE TABLE IF NOT EXISTS public.schemes_db (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_name TEXT NOT NULL,
  min_age INT DEFAULT 0,
  max_age INT DEFAULT 150,
  max_income INT, -- Annual income threshold
  target_category TEXT, -- 'All' or specific like 'SC|ST'
  target_gender TEXT, -- 'All', 'Male', 'Female'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes_db ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous citizen access
CREATE POLICY "Anyone can manage their own profile" ON public.user_profiles
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view schemes" ON public.schemes_db
  FOR SELECT USING (true);

-- Dummy Data for Jharkhand Schemes (Symbolic Knowledge Base)
INSERT INTO public.schemes_db (scheme_name, min_age, max_income, target_category, target_gender, description)
VALUES 
('Mukhyamantri Maiyan Samman Yojana', 21, 100000, 'All', 'Female', 'Financial assistance of ₹1000/month for women aged 21-50 from low-income families.'),
('e-Kalyan Post-Matric Scholarship', 16, 250000, 'SC|ST|OBC', 'All', 'Scholarship for Jharkhand students pursuing post-matric courses with family income below ₹2.5 Lakh.'),
('Birsa Awas Yojana', 18, 50000, 'ST', 'All', 'Housing scheme specifically targeting Primitive Tribal Groups (PTG) with very low annual income.');

-- Trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
