-- Drop and recreate booking_inquiries with all required columns
DROP TABLE IF EXISTS public.booking_inquiries CASCADE;
CREATE TABLE public.booking_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_title TEXT NOT NULL DEFAULT '',
    preferred_date TEXT,
    experience_level TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    deposit_amount TEXT,
    deposit_currency TEXT,
    payment_choice TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
-- Anyone can insert (booking form goes via server-side API with service key, but keep open as fallback)
CREATE POLICY "Public can insert bookings" ON public.booking_inquiries FOR
INSERT WITH CHECK (true);
-- Only authenticated users (admin) can read
CREATE POLICY "Authenticated can view bookings" ON public.booking_inquiries FOR
SELECT USING (auth.uid() IS NOT NULL);
-- Only authenticated users (admin) can update
CREATE POLICY "Authenticated can update bookings" ON public.booking_inquiries FOR
UPDATE USING (auth.uid() IS NOT NULL);
-- Only authenticated users (admin) can delete
CREATE POLICY "Authenticated can delete bookings" ON public.booking_inquiries FOR DELETE USING (auth.uid() IS NOT NULL);