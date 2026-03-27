-- Migration Script for Pixen India Contact Form Leads Table
-- Run this in your Supabase SQL Editor to create the leads table

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  "businessType" TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'::TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  notes TEXT,
  source TEXT DEFAULT 'website'::TEXT,
  assigned_to TEXT,
  followed_up BOOLEAN DEFAULT false,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

-- Create index on createdAt for sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads("createdAt");

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- Add comment to table
COMMENT ON TABLE public.leads IS 'Contact form submissions from website visitors';

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public contact form)
CREATE POLICY "Allow public to submit leads" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view leads" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update leads
CREATE POLICY "Allow authenticated users to update leads" ON public.leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete leads
CREATE POLICY "Allow authenticated users to delete leads" ON public.leads
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Optional: Create a function to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updatedAt
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data (optional - for testing)
-- Uncomment below to add test lead
-- INSERT INTO public.leads (name, email, businessType, budget, message, phone)
-- VALUES ('Test User', 'test@example.com', 'startup', '<1k', 'This is a test lead', '9876543210');

-- Verify table creation
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'leads'
ORDER BY ordinal_position;
