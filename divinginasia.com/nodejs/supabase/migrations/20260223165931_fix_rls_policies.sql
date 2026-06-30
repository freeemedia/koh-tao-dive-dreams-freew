-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin to view all bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow admin to insert bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow admin to update bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow admin to delete bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view all bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to insert bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete bookings" ON booking_inquiries;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to view all bookings" ON booking_inquiries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert bookings" ON booking_inquiries
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update bookings" ON booking_inquiries
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete bookings" ON booking_inquiries
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Temporary policy to check if data exists (remove after testing)
-- (temporary public policies removed) -- use authenticated policies only