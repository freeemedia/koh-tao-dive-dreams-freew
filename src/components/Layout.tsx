import React from 'react';
import Navigation from './Navigation';
import BookNowModal from './BookNowModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackAffiliateClick } from '@/lib/affiliateTracking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import CookieConsent from './CookieConsent';

const TRIP_ALLIANCE_ID = import.meta.env.VITE_TRIP_ALLIANCE_ID as string | undefined;
const TRIP_SITE_ID = import.meta.env.VITE_TRIP_SITE_ID as string | undefined;
const WHATSAPP_LINK = 'https://wa.me/66612345678';
const FACEBOOK_LINK = 'https://www.facebook.com/divegoprobybas/';
const INSTAGRAM_LINK = 'https://www.instagram.com/pro_diving_asia/';

const trackBookingWidgetClick = (source: 'left-widget' | 'mobile-sticky') => {
  try {
    const key = `booking-widget-clicks:${source}`;
    const current = Number(window.localStorage.getItem(key) || '0');
    window.localStorage.setItem(key, String(current + 1));


    const payload = {
      event: 'booking_widget_click',
      source,
      path: window.location.pathname,
      clicked_at: new Date().toISOString(),
    };

    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push(payload);
    }

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'booking_widget_click', {
        source,
        page_path: window.location.pathname,
      });
    }
  } catch {
    // Tracking should never block navigation.
  }
};

const buildTripFooterUrl = () => {
  const baseUrl = 'https://www.trip.com/';
  const params = new URLSearchParams();

  if (TRIP_ALLIANCE_ID) params.set('allianceid', TRIP_ALLIANCE_ID);
  if (TRIP_SITE_ID) params.set('sid', TRIP_SITE_ID);

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
};

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const [footerContent, setFooterContent] = React.useState<{ [key: string]: string }>({});
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';
  const isDutch = locale === 'nl';
  const tripFooterUrl = buildTripFooterUrl();

  React.useEffect(() => {
    // Fetch all footer content for the current locale
    const fetchFooterContent = async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('section_key, content_value')
        .eq('page_slug', '#contact')
        .eq('locale', locale)
        .in('section_key', ['footer_line_1', 'footer_line_2']);
      if (!error && data) {
        const content: { [key: string]: string } = {};
        data.forEach((row: any) => {
          content[row.section_key] = row.content_value;
        });
        setFooterContent(content);
      }
    };
    fetchFooterContent();
  }, [locale]);

  return (
    <footer className="bg-[#0a2239] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mb-10">
          <div>
            <div className="text-xl font-bold text-cyan-400 mb-3">Pro Diving Asia</div>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {isDutch
                ? 'Koh Tao\'s premium duikschool voor PADI-cursussen, fun dives en onvergetelijke onderwaterervaringen.'
                : 'Koh Tao\'s premium dive school for PADI courses, fun dives, and unforgettable underwater experiences.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 transition hover:text-cyan-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 transition hover:text-cyan-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              {isDutch ? 'Duiken' : 'Diving'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/#/courses/open-water" className="hover:text-white transition">Open Water</Link></li>
              <li><Link to="/#/courses/advanced" className="hover:text-white transition">Advanced</Link></li>
              <li><Link to="/#/courses/rescue" className="hover:text-white transition">Rescue Diver</Link></li>
              <li><Link to="/#/courses/divemaster" className="hover:text-white transition">Divemaster</Link></li>
              <li><Link to="/#/fun-diving-koh-tao" className="hover:text-white transition">{isDutch ? 'Fun Diving' : 'Fun Diving'}</Link></li>
              <li><Link to="/#/contact" className="hover:text-white transition">{isDutch ? 'Contact' : 'Contact'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">Koh Tao</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/#/koh-tao-info" className="hover:text-white transition">{isDutch ? 'Over Koh Tao' : 'About Koh Tao'}</Link></li>
              <li><Link to="/#/accommodation" className="hover:text-white transition">{isDutch ? 'Accommodatie' : 'Accommodation'}</Link></li>
              <li><Link to="/#/beaches-koh-tao" className="hover:text-white transition">{isDutch ? 'Stranden' : 'Beaches'}</Link></li>
              <li><Link to="/#/food-drink" className="hover:text-white transition">{isDutch ? 'Eten & Drinken' : 'Food & Drink'}</Link></li>
              <li><Link to="/#/things-to-do" className="hover:text-white transition">{isDutch ? 'Dingen om te doen' : 'Things To Do'}</Link></li>
              <li><Link to="/#/how-to-get-here" className="hover:text-white transition">{isDutch ? 'Hoe kom je hier' : 'How To Get Here'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              {isDutch ? 'Info' : 'Info'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/#/weather-koh-tao" className="hover:text-white transition">{isDutch ? 'Weer' : 'Weather'}</Link></li>
              <li><Link to="/#/visas-koh-tao" className="hover:text-white transition">Visa</Link></li>
              <li><Link to="/#/medical-services" className="hover:text-white transition">{isDutch ? 'Medisch' : 'Medical'}</Link></li>
              <li><Link to="/#/accommodation-booking" className="hover:text-white transition">Booking.com</Link></li>
              <li>
                <a
                  href={tripFooterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  onClick={() => trackAffiliateClick('footer-link', 'trip.com', tripFooterUrl)}
                >
                  Trip.com
                </a>
              </li>
              <li><Link to="/#/contact" className="hover:text-white transition">{isDutch ? 'Neem contact op' : 'Contact Us'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a3a5c] pt-6 text-center text-xs text-gray-500 space-y-1">
          {footerContent.footer_line_1 || `© ${new Date().getFullYear()} Pro Diving Asia — All rights reserved | Powered By One Media Asia Co, Ltd`}
          {footerContent.footer_line_2 && <span>{footerContent.footer_line_2}</span>}
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const [user, setUser] = React.useState<any>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [showBookNow, setShowBookNow] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const adminSession = window.localStorage.getItem('admin_authenticated') === '1';
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      // Import here to avoid circular dependency
      const { hasAdminAccess } = await import('@/lib/adminAccess');
      setIsAdmin(adminSession || (user ? hasAdminAccess(user) : false));
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUser(user);
      import('@/lib/adminAccess').then(({ hasAdminAccess }) => {
        const adminSession = window.localStorage.getItem('admin_authenticated') === '1';
        setIsAdmin(adminSession || (user ? hasAdminAccess(user) : false));
      });
    });
    return () => { subscription.unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem('admin_authenticated');
    window.localStorage.removeItem('admin_login_token');
    await supabase.auth.signOut();
    toast.success(isDutch ? 'Succesvol uitgelogd' : 'Successfully logged out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation user={user} isAdmin={isAdmin} isAdminRoute={isAdminRoute} />
      {isAdminRoute && (
        <div className="fixed top-20 right-4 z-50">
          <Button variant="outline" onClick={handleLogout}>{isDutch ? 'Uitloggen' : 'Logout'}</Button>
        </div>
      )}
      {/* Global Book Now Button removed as requested */}
      {/* Book Now Modal */}
      <BookNowModal open={showBookNow} onClose={() => setShowBookNow(false)} />
      <main className="flex-1">{children}</main>
      <CookieConsent />
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isDutch ? 'Chat via WhatsApp' : 'Chat on WhatsApp'}
        title={isDutch ? 'Chat via WhatsApp' : 'Chat on WhatsApp'}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <Footer />
    </div>
  );
};

export default Layout;
