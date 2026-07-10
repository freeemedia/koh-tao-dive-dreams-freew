-- Booking comments table for both customers and admins
CREATE TABLE IF NOT EXISTS booking_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id text REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid,
  comment text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_booking_comments_booking_id ON booking_comments(booking_id);
