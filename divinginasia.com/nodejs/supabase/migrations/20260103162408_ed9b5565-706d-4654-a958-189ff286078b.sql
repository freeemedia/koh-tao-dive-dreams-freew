-- Create a table for course booking inquiries
CREATE TABLE public.booking_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_title TEXT NOT NULL,
  preferred_date DATE,
  experience_level TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert booking inquiries (public form)
CREATE POLICY "Anyone can submit booking inquiries"
ON public.booking_inquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins should read bookings (for now, allow service role only)
-- This keeps customer data private]