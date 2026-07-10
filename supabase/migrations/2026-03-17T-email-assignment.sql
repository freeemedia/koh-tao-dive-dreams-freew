-- Emails table for admin assignment
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  sender text NOT NULL,
  body text,
  assigned_to text, -- email of assigned user
  status text DEFAULT 'unread',
  created_at timestamptz DEFAULT now()
);

-- Example users table (if not already present)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text
);

-- Insert your team emails if not present
INSERT INTO users (email, name) VALUES
  ('contact@prodiving.asia', 'Contact'),
  ('bas@divinginasia.com', 'Bas')
ON CONFLICT (email) DO NOTHING;

-- Sample emails for testing
INSERT INTO emails (subject, sender, body, assigned_to, status)
VALUES
  ('Booking Inquiry: Open Water', 'alice@example.com', 'I would like to book the Open Water course.', NULL, 'unread'),
  ('Question about Advanced Course', 'bob@example.com', 'Can you tell me more about the advanced course?', NULL, 'unread'),
  ('Group Booking', 'carol@example.com', 'We are a group of 4 interested in diving.', NULL, 'unread');

-- Add deposit and total columns to booking_inquiries for voucher support
ALTER TABLE public.booking_inquiries
ADD COLUMN deposit NUMERIC DEFAULT 0,
ADD COLUMN total NUMERIC DEFAULT 0;

-- Dedicated vouchers table for tracking generated vouchers
CREATE TABLE IF NOT EXISTS public.vouchers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES booking_inquiries(id),
  voucher_code text UNIQUE NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now(),
  generated_by text,
  downloaded boolean DEFAULT false,
  downloaded_at timestamptz,
  notes text
);