-- Drop the old books table if it exists
DROP TABLE IF EXISTS bookings;

-- Create a new bookings table with all required fields
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  item_type text,
  course_title text,
  preferred_date text,
  experience_level text,
  message text,
  payment_choice text,
  addons text,
  addons_json text,
  addons_total numeric,
  subtotal_amount numeric,
  total_payable_now numeric,
  internal_notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Basic status guard (non-blocking for historical data that already fits this set)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'bookings_status_check'
  ) THEN
    ALTER TABLE bookings
      ADD CONSTRAINT bookings_status_check
      CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'paid'));
  END IF;
END $$;

-- Helpful indexes for admin screens and updates
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Keep updated_at current on writes
CREATE OR REPLACE FUNCTION set_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_bookings_updated_at ON bookings;
CREATE TRIGGER trg_set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_bookings_updated_at();

-- Enable RLS and provide safe defaults
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookings'
      AND policyname = 'Anyone can submit bookings'
  ) THEN
    CREATE POLICY "Anyone can submit bookings"
      ON bookings
      FOR INSERT
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookings'
      AND policyname = 'Admins can view bookings'
  ) THEN
    CREATE POLICY "Admins can view bookings"
      ON bookings
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookings'
      AND policyname = 'Admins can update bookings'
  ) THEN
    CREATE POLICY "Admins can update bookings"
      ON bookings
      FOR UPDATE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookings'
      AND policyname = 'Admins can delete bookings'
  ) THEN
    CREATE POLICY "Admins can delete bookings"
      ON bookings
      FOR DELETE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Backfill from legacy booking_inquiries when present
DO $$
BEGIN
  IF to_regclass('public.booking_inquiries') IS NOT NULL THEN
    INSERT INTO bookings (
      id,
      name,
      email,
      phone,
      course_title,
      preferred_date,
      experience_level,
      message,
      status,
      created_at,
      updated_at
    )
    SELECT
      bi.id,
      bi.name,
      bi.email,
      bi.phone,
      bi.course_title,
      bi.preferred_date,
      bi.experience_level,
      bi.message,
      'pending',
      bi.created_at,
      bi.created_at
    FROM public.booking_inquiries bi
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;