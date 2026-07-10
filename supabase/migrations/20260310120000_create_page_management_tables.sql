-- Create page_metadata table for tracking page properties
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
