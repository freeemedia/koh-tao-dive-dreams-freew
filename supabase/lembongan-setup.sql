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
);-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create admin_settings table for notification email
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles (only admins can view/manage)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for admin_settings
CREATE POLICY "Admins can view settings"
ON public.admin_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage settings"
ON public.admin_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view booking inquiries
CREATE POLICY "Admins can view booking inquiries"
ON public.booking_inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete booking inquiries
CREATE POLICY "Admins can delete booking inquiries"
ON public.booking_inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update booking inquiries
CREATE POLICY "Admins can update booking inquiries"
ON public.booking_inquiries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));-- Create a table for user profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  experience_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create a trigger to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();-- Create page_metadata table for tracking page properties
CREATE TABLE IF NOT EXISTS page_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT UNIQUE NOT NULL,
  has_seo BOOLEAN DEFAULT FALSE,
  is_secured BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_seo table for SEO and meta tags
CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT UNIQUE NOT NULL,
  
  -- Basic SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  robots TEXT DEFAULT 'index, follow',
  
  -- Open Graph (Facebook)
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  og_type TEXT DEFAULT 'website',
  
  -- Twitter Card
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Structured Data
  schema_type TEXT DEFAULT 'WebPage',
  schema_json JSONB,
  
  -- Metadata
  updated_by TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES page_metadata(page_slug) ON DELETE CASCADE
);

-- Create page_security table for security settings
CREATE TABLE IF NOT EXISTS page_security (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT UNIQUE NOT NULL,
  
  -- Basic Security
  is_secured BOOLEAN DEFAULT FALSE,
  require_auth BOOLEAN DEFAULT FALSE,
  require_admin BOOLEAN DEFAULT FALSE,
  allowed_roles TEXT[],
  
  -- IP Whitelist
  ip_whitelist TEXT,
  
  -- Rate Limiting
  rate_limit_enabled BOOLEAN DEFAULT TRUE,
  rate_limit_requests INTEGER DEFAULT 100,
  rate_limit_window INTEGER DEFAULT 60,
  
  -- Protection
  csrf_protection BOOLEAN DEFAULT TRUE,
  xss_protection BOOLEAN DEFAULT TRUE,
  content_security_policy TEXT,
  
  -- Metadata
  updated_by TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES page_metadata(page_slug) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_metadata_slug ON page_metadata(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_seo_slug ON page_seo(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_security_slug ON page_security(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_metadata_secured ON page_metadata(is_secured);
CREATE INDEX IF NOT EXISTS idx_page_metadata_has_seo ON page_metadata(has_seo);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_page_metadata_updated_at
  BEFORE UPDATE ON page_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_seo_updated_at
  BEFORE UPDATE ON page_seo
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_security_updated_at
  BEFORE UPDATE ON page_security
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_security ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow public read access to page_metadata"
  ON page_metadata FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to page_seo"
  ON page_seo FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage page_metadata"
  ON page_metadata FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage page_seo"
  ON page_seo FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage page_security"
  ON page_security FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial page metadata for existing pages
INSERT INTO page_metadata (page_slug, has_seo, is_secured) VALUES
('open-water', FALSE, FALSE),
('advanced', FALSE, FALSE),
('rescue', FALSE, FALSE),
('efr', FALSE, FALSE),
('divemaster', FALSE, FALSE),
('instructor', FALSE, FALSE),
('discover-scuba', FALSE, FALSE),
('scuba-diver', FALSE, FALSE),
('scuba-review', FALSE, FALSE)
ON CONFLICT (page_slug) DO NOTHING;

COMMENT ON TABLE page_metadata IS 'Tracks metadata and properties for all website pages';
COMMENT ON TABLE page_seo IS 'Stores SEO and meta tag configurations for pages';
COMMENT ON TABLE page_security IS 'Manages security settings and access controls for pages';
-- Seed editable gallery heading/subtitle for home page (EN + NL)
INSERT INTO public.page_content (page_slug, locale, section_key, content_type, content_value)
VALUES
  ('home', 'en', 'gallery_headline', 'text', 'Check out the photography of our happy customers.'),
  ('home', 'en', 'gallery_subtitle', 'textarea', 'Experience the breathtaking beauty of Koh Tao''s underwater world in our photo gallery'),
  ('home', 'nl', 'gallery_headline', 'text', 'Bekijk de fotografie van onze blije klanten.'),
  ('home', 'nl', 'gallery_subtitle', 'textarea', 'Ervaar de adembenemende schoonheid van de onderwaterwereld van Koh Tao in onze fotogalerij')
ON CONFLICT (page_slug, locale, section_key) DO NOTHING;-- Drop the old books table if it exists
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
END $$;ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS bank_transfer_details text;
CREATE TABLE IF NOT EXISTS public.role_change_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL CHECK (action IN ('add', 'remove')),
  target_user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  changed_by uuid NULL,
  changed_by_email text NULL,
  note text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_role_change_audit_created_at
  ON public.role_change_audit(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_role_change_audit_target_user
  ON public.role_change_audit(target_user_id);

ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'role_change_audit'
      AND policyname = 'Admins can view role change audit'
  ) THEN
    CREATE POLICY "Admins can view role change audit"
      ON public.role_change_audit
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
-- One-time cleanup of legacy HTML/encoded HTML saved in dive-site page_content rows.
-- Normalizes content to plain text for sections used by DiveSiteDetail.

UPDATE public.page_content
SET content_value = trim(
  BOTH E' \n\r\t' FROM regexp_replace(
    regexp_replace(
      regexp_replace(
        replace(
          replace(
            replace(
              replace(
                replace(
                  content_value,
                  '&nbsp;',
                  ' '
                ),
                '&amp;',
                '&'
              ),
              '&lt;',
              '<'
            ),
            '&gt;',
            '>'
          ),
          E'\r\n',
          E'\n'
        ),
        '<br\\s*/?>',
        E'\n',
        'gi'
      ),
      '</(p|div|li|h[1-6])>',
      E'\n',
      'gi'
    ),
    '<li[^>]*>|<[^>]*>',
    ' ',
    'gi'
  )
)
WHERE (
    page_slug LIKE 'dive-sites/%'
    OR page_slug IN (
      'sail-rock',
      'shark-island',
      'htms-sattakut',
      'japanese-gardens',
      'mango-bay',
      'twins-pinnacle',
      'south-west-pinnacle',
      'chumphon-pinnacle'
    )
  )
  AND section_key IN (
    'overview',
    'quick_facts_depth',
    'quick_facts_difficulty',
    'quick_facts_location',
    'quick_facts_best_time',
    'what_you_can_see',
    'marine_life_highlights',
    'diving_tips',
    'images'
  )
  AND content_value ~* '(<[^>]+>|&lt;|&gt;|&nbsp;|&amp;)';
-- Rename bookings_duplicate table back to bookings
ALTER TABLE bookings_duplicate RENAME TO bookings;
-- Rename bookings table to bookings_duplicate
ALTER TABLE bookings RENAME TO bookings_duplicate;
