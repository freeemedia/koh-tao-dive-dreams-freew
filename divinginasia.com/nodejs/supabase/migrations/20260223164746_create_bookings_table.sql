-- Create bookings table
CREATE TABLE IF NOT EXISTS booking_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_title TEXT NOT NULL,
  preferred_date TEXT,
  experience_level TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow admin to view all bookings" ON booking_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to insert bookings" ON booking_inquiries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to update bookings" ON booking_inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to delete bookings" ON booking_inquiries
  FOR DELETE USING (auth.role() = 'authenticated');