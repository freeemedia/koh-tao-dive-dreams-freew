import React from 'react';
import Navigation from './Navigation';
import BookNowModal from './BookNowModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackAffiliateClick } from '@/lib/affiliateTracking';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Download, Facebook, Instagram, MessageCircle } from 'lucide-react';
import CookieConsent from './CookieConsent';

const InstallBanner: React.FC = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const [installPrompt, setInstallPrompt] = React.useState<any>(null);
  const [dismissed, setDismissed] = React.useState(
    () => window.sessionStorage.getItem('pwa-banner-dismissed') === '1'
  );
  const [isIos, setIsIos] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);

  React.useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => { setInstallPrompt(null); setDismissed(true); });
    }
  };

  const dismiss = () => {
    window.sessionStorage.setItem('pwa-banner-dismissed', '1');
    setDismissed(true);
  };

  if (isStandalone || dismissed) return null;
  if (!installPrompt && !isIos) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between gap-3 bg-cyan-950 border-b border-cyan-700 px-4 py-2 text-white text-sm shadow-lg">
      <div className="flex items-center gap-2 min-w-0">
        <Download className="h-4 w-4 text-cyan-300 shrink-0" />
        {isIos ? (
          <span className="truncate">
            {isDutch ? 'Tik Delen → "Zet op beginscherm" om te installeren' : 'Tap Share → "Add to Home Screen" to install the app'}
          </span>
        ) : (
          <span className="truncate">
            {isDutch ? 'Installeer de app op je telefoon' : 'Install the app on your phone'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {!isIos && (
          <button
            onClick={handleInstall}
            className="rounded-md bg-cyan-500 hover:bg-cyan-400 px-3 py-1 text-xs font-semibold transition"
          >
            {isDutch ? 'Installeer' : 'Install'}
          </button>
        )}
        <button onClick={dismiss} aria-label="Dismiss" className="text-white/50 hover:text-white text-base leading-none">✕</button>
      </div>
    </div>
  );
};

const TRIP_ALLIANCE_ID = import.meta.env.VITE_TRIP_ALLIANCE_ID as string | undefined;
const TRIP_SITE_ID = import.meta.env.VITE_TRIP_SITE_ID as string | undefined;
const WHATSAPP_LINK = 'https://wa.me/6281353833289';
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
      try {
        const base = import.meta.env.VITE_API_URL || '';
        const params = new URLSearchParams({ slug: '#contact', locale });
        const response = await fetch(`${base}/api/page-content?${params.toString()}`, { cache: 'no-store' });
        if (!response.ok) return;
        const payload = await response.json().catch(() => ({}));
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];

        const content: { [key: string]: string } = {};
        rows.forEach((row: any) => {
          content[row.section_key] = row.content_value;
        });
        setFooterContent(content);
      } catch {
        // Keep default footer text if remote content is unavailable.
      }
    };
    fetchFooterContent();
  }, [locale]);

    return (
    <footer className="bg-[#0a2239] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 mb-10">
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
              <li><Link to="/courses" className="hover:text-white transition">{isDutch ? 'Cursussen' : 'Courses'}</Link></li>
              <li><Link to="/courses/open-water" className="hover:text-white transition">Open Water</Link></li>
              <li><Link to="/courses/advanced" className="hover:text-white transition">Advanced</Link></li>
              <li><Link to="/courses/rescue" className="hover:text-white transition">Rescue Diver</Link></li>
              <li><Link to="/courses/divemaster" className="hover:text-white transition">Divemaster</Link></li>
              <li><Link to="/fun-diving-koh-tao" className="hover:text-white transition">{isDutch ? 'Fun Diving' : 'Fun Diving'}</Link></li>
              <li><Link to="/marine-life" className="hover:text-white transition">{isDutch ? 'Mariene Fauna' : 'Marine Life'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">{isDutch ? 'Duikplekken' : 'Dive Sites'}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/koh-tao-dive-sites" className="hover:text-white transition">{isDutch ? 'Overzicht' : 'Overview'}</Link></li>
              <li><Link to="/dive-site-reports" className="hover:text-white transition">{isDutch ? 'Duiklocatie rapporten' : 'Dive Site Reports'}</Link></li>
              <li><Link to="/dive-sites/sail-rock" className="hover:text-white transition">Sail Rock</Link></li>
              <li><Link to="/dive-sites/chumphon-pinnacle" className="hover:text-white transition">Chumphon Pinnacle</Link></li>
              <li><Link to="/dive-sites/south-west-pinnacle" className="hover:text-white transition">South West Pinnacle</Link></li>
              <li><Link to="/dive-sites/japanese-gardens" className="hover:text-white transition">Japanese Gardens</Link></li>
              <li><Link to="/dive-sites/htms-sattakut" className="hover:text-white transition">HTMS Sattakut</Link></li>
              <li><Link to="/dive-sites/shark-island" className="hover:text-white transition">Shark Island</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">Koh Tao</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/Accommodation" className="hover:text-white transition">{isDutch ? 'Accommodatie' : 'Accommodation'}</Link></li>
              <li><Link to="/ThingsToDo" className="hover:text-white transition">{isDutch ? 'Dingen om te doen' : 'Things To Do'}</Link></li>
              <li><Link to="/BeachesKohTao" className="hover:text-white transition">{isDutch ? 'Stranden' : 'Beaches'}</Link></li>
              <li><Link to="/FoodDrink" className="hover:text-white transition">{isDutch ? 'Eten & Drinken' : 'Food & Drink'}</Link></li>
              <li><Link to="/HowToGetHere" className="hover:text-white transition">{isDutch ? 'Hoe kom je hier' : 'How To Get Here'}</Link></li>
              <li><Link to="/WeatherKohTao" className="hover:text-white transition">{isDutch ? 'Weer' : 'Weather'}</Link></li>
              <li><Link to="/VisasKohTao" className="hover:text-white transition">Visa</Link></li>
              <li><Link to="/MedicalServices" className="hover:text-white transition">{isDutch ? 'Medisch' : 'Medical'}</Link></li>
              <li><Link to="/ViewpointsKohTao" className="hover:text-white transition">{isDutch ? 'Uitkijkpunten' : 'Viewpoints'}</Link></li>
              <li><Link to="/BanksKohTao" className="hover:text-white transition">{isDutch ? 'Banken & Geldautomaten' : 'Banks & ATMs'}</Link></li>
              <li>
                <a
                  href={tripFooterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  onClick={() => trackAffiliateClick({
                    provider: 'trip',
                    destinationUrl: tripFooterUrl,
                    placement: 'footer-link',
                  })}
                >
                  Trip.com
                </a>
              </li>
              <li><Link to="/agoda-hotels" className="hover:text-white transition">Agoda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              {isDutch ? 'Contact' : 'Contact Us'}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-1">{isDutch ? 'Locatie' : 'Location'}</span>
                <span className="leading-relaxed">
                  Sairee Beach, Koh Tao<br />
                  Surat Thani 84360, Thailand
                </span>
              </li>
              <li>
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-1">{isDutch ? 'Telefoon' : 'Phone'}</span>
                <a href="tel:+31638697279" className="block hover:text-white transition">+31 6 38697279</a>
                <a href="tel:+62081353833289" className="block hover:text-white transition">+62(0)81353833289</a>
              </li>
              <li>
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:contact@divinginasia.com" className="hover:text-white transition">contact@divinginasia.com</a>
              </li>
              <li>
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-1">
                  {isDutch ? 'Openingstijden' : 'Opening Hours'}
                </span>
                <span className="block">{isDutch ? 'Dagelijks: 07:00 – 19:00' : 'Daily: 07:00 – 19:00'}</span>
                <span className="block">{isDutch ? 'Noodgeval: 24/7' : 'Emergency: 24/7'}</span>
              </li>
              <li>
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-2">
                  {isDutch ? 'Volg Ons' : 'Follow Us'}
                </span>
                <div className="flex items-center gap-3">
                  <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 transition hover:text-cyan-400">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 transition hover:text-cyan-400">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </li>
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
      setIsAdmin(adminSession);
    };
    checkAuth();

    // Listen for storage changes (e.g., logout from another tab)
    const handleStorageChange = () => {
      const adminSession = window.localStorage.getItem('admin_authenticated') === '1';
      setIsAdmin(adminSession);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem('admin_authenticated');
    window.localStorage.removeItem('admin_login_token');
    toast.success(isDutch ? 'Succesvol uitgelogd' : 'Successfully logged out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <InstallBanner />
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
