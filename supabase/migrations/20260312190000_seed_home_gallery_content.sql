-- Seed editable gallery heading/subtitle for home page (EN + NL)
INSERT INTO public.page_content (page_slug, locale, section_key, content_type, content_value)
VALUES
  ('home', 'en', 'gallery_headline', 'text', 'Check out the photography of our happy customers.'),
  ('home', 'en', 'gallery_subtitle', 'textarea', 'Experience the breathtaking beauty of Koh Tao''s underwater world in our photo gallery'),
  ('home', 'nl', 'gallery_headline', 'text', 'Bekijk de fotografie van onze blije klanten.'),
  ('home', 'nl', 'gallery_subtitle', 'textarea', 'Ervaar de adembenemende schoonheid van de onderwaterwereld van Koh Tao in onze fotogalerij')
ON CONFLICT (page_slug, locale, section_key) DO NOTHING;