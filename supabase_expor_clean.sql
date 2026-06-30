--
-- POLICIES AND ROW LEVEL SECURITY (RLS)
--
CREATE POLICY "Admins can view role change audit" ON public.role_change_audit FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view settings" ON public.admin_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Allow all" ON public.page_content USING (true);
CREATE POLICY "Allow all updates on bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated users to delete bookings" ON public.booking_inquiries FOR DELETE USING ((auth.uid() IS NOT NULL));
CREATE POLICY "Allow authenticated users to insert bookings" ON public.booking_inquiries FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));
CREATE POLICY "Allow authenticated users to manage page_content" ON public.page_content USING ((auth.role() = 'authenticated'::text));
CREATE POLICY "Allow authenticated users to manage page_metadata" ON public.page_metadata TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage page_security" ON public.page_security TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage page_seo" ON public.page_seo TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update bookings" ON public.booking_inquiries FOR UPDATE USING ((auth.uid() IS NOT NULL));
CREATE POLICY "Allow authenticated users to view all bookings" ON public.booking_inquiries FOR SELECT USING ((auth.uid() IS NOT NULL));
CREATE POLICY "Allow public read access to page_metadata" ON public.page_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read access to page_seo" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "Allow read access to emails for all" ON public.emails FOR SELECT USING (true);
CREATE POLICY "Allow select for all" ON public.newdiving FOR SELECT USING (true);
CREATE POLICY "Anyone can insert affiliate clicks" ON public.affiliate_clicks FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY "Anyone can submit booking inquiries" ON public.booking_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view affiliate clicks" ON public.affiliate_clicks FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Authenticated insert bookings" ON public.booking_inquiries FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));
CREATE POLICY "Authenticated select bookings" ON public.booking_inquiries FOR SELECT USING ((auth.uid() IS NOT NULL));
CREATE POLICY "Enable read access for all users" ON public.booking_inquiries FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.emails FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Policy to implement Time To Live (TTL)" ON public.booking_inquiries USING ((created_at > (CURRENT_TIMESTAMP - '1 day'::interval)));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dive_site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newdiving ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
-- End of safe POLICY and RLS statements
-- CLEANED FOR SUPABASE IMPORT
-- This file has had all superuser, OWNER, and supabase_admin-specific statements removed.
-- Review before use. Some features/extensions may need to be enabled via the Supabase dashboard.
-- Cleaned SQL dump for Supabase import
-- All superuser-only, OWNER, and restricted statements removed

-- Safe schema and data statements from original dump:

