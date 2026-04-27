import MSDTProgram from './pages/MSDTProgram';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProvider } from './hooks/useCurrency';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';

import Layout from './components/Layout';
import Courses from './components/Courses';

import Index from './pages/index';
import NotFound from './pages/NotFound';
import BookingAffiliate from './pages/BookingAffiliate';
import AgodaHotels from './pages/AgodaHotels';
import ClicksDashboard from './pages/ClicksDashboard';
import BookingPage from './pages/BookingPage';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';

import OpenWater from './pages/OpenWater';
import Advanced from './pages/Advanced';
import EFR from './pages/EFR';
import Rescue from './pages/Rescue';
import Divemaster from './pages/Divemaster';
import Instructor from './pages/Instructor';
import ScubaReview from './pages/ScubaReview';
import ScubaDiver from './pages/ScubaDiver';
import DiscoverScuba from './pages/DiscoverScuba';
import DiscoverScubaDeluxe from './pages/DiscoverScubaDeluxe';
import ProLevelCourses from './pages/ProLevelCourses';
import SpecialtyDetail from './pages/SpecialtyDetail';

import FunDiving from './pages/FunDiving';
import DiveSitesPage from './pages/DiveSitesPage';
import SailRock from './pages/dive-sites/sail-rock';
import ChumphonPinnacle from './pages/dive-sites/chumphon-pinnacle';
import JapaneseGardens from './pages/dive-sites/japanese-gardens';
import HTMSSattakut from './pages/HTMSSattakut';
import TwinsPinnacle from './pages/dive-sites/twins-pinnacle';
import SharkIsland from './pages/SharkIsland';
import MangoBay from './pages/dive-sites/mango-bay';
import SouthWestPinnacle from './pages/dive-sites/south-west-pinnacle';
import AowLeuk from './pages/dive-sites/aow-leuk';
import HinNgam from './pages/dive-sites/hin-ngam';
import TanoteBay from './pages/dive-sites/tanote-bay';
import JunkyardReef from './pages/dive-sites/junkyard-reef';
import BuoyancyWorld from './pages/dive-sites/buoyancy-world';

import MarineLifePage from './pages/MarineLifePage';
import Whaleshark from './pages/Whaleshark';
import GreenSeaTurtle from './pages/GreenSeaTurtle';
import HawksbillSeaTurtle from './pages/HawksbillSeaTurtle';
import GreatBarracuda from './pages/GreatBarracuda';
import BlackTipReefShark from './pages/BlackTipReefShark';
import MalabarGrouper from './pages/MalabarGrouper';
import Cephalopods from './pages/Cephalopods';
import BandedSeaKrait from './pages/BandedSeaKrait';
import BeardedScorpionFish from './pages/BeardedScorpionFish';
import Nudibranchs from './pages/Nudibranchs';

import Accommodation from './pages/Accommodation';
import KohTaoInfo from './pages/KohTaoInfo';
import ThingsToDo from './pages/ThingsToDo';
import BanksKohTao from './pages/BanksKohTao';
import BeachesKohTao from './pages/BeachesKohTao';
import FoodDrink from './pages/FoodDrink';
import HowToGetHere from './pages/HowToGetHere';
import MedicalServices from './pages/MedicalServices';
import ViewpointsKohTao from './pages/ViewpointsKohTao';
import VisasKohTao from './pages/VisasKohTao';
import WeatherKohTao from './pages/WeatherKohTao';

import DeepDiver from './pages/specialty/DeepDiver';
import WreckDiver from './pages/specialty/WreckDiver';
import EnrichedAirDiver from './pages/specialty/EnrichedAirDiver';
import NightDiver from './pages/specialty/NightDiver';
import PeakPerformanceBuoyancy from './pages/specialty/PeakPerformanceBuoyancy';
import SearchRecovery from './pages/specialty/SearchRecovery';
import SelfReliantDiver from './pages/specialty/SelfReliantDiver';
import SidemountDiver from './pages/specialty/SidemountDiver';
import UnderwaterNavigator from './pages/specialty/UnderwaterNavigator';
import FishIdentification from './pages/specialty/FishIdentification';
import DiveAgainstDebris from './pages/specialty/DiveAgainstDebris';
import CoralWatch from './pages/specialty/CoralWatch';
import DPVDiver from './pages/specialty/DPVDiver';
import SharkConservation from './pages/specialty/SharkConservation';
import SeaTurtleAwareness from './pages/specialty/SeaTurtleAwareness';
import WhaleSharkAwareness from './pages/specialty/WhaleSharkAwareness';
import AdaptiveSupportDiver from './pages/specialty/AdaptiveSupportDiver';
import BoatDiver from './pages/specialty/BoatDiver';
import CurrentDiver from './pages/specialty/CurrentDiver';
import Photography from './pages/specialty/Photography';
import EmergencyO2Provider from './pages/specialty/EmergencyO2Provider';
import EquipmentSpecialist from './pages/specialty/EquipmentSpecialist';
import UnderwaterNaturalist from './pages/specialty/UnderwaterNaturalist';

import DivemasterInternship from './pages/internship/Divemaster';
import InstructorInternship from './pages/internship/Instructor';
import FacebookFeedPage from './pages/FacebookFeedPage';
import BookingToJiraForm from './components/BookingToJiraForm';

import './i18n';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = async () => {
      if (window.localStorage.getItem('admin_authenticated') === '1') {
        setStatus('allowed');
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      let user = sessionData.session?.user ?? null;

      if (!user) {
        const { data: userData } = await supabase.auth.getUser();
        user = userData.user;
      }

      if (!isMounted) return;

      if (user && hasAdminAccess(user)) {
        setStatus('allowed');
        return;
      }

      setStatus('denied');
    };

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (window.localStorage.getItem('admin_authenticated') === '1') {
        setStatus('allowed');
        return;
      }

      const user = session?.user ?? null;
      if (user && hasAdminAccess(user)) {
        setStatus('allowed');
      } else {
        setStatus('denied');
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CurrencyProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/accommodation-booking" element={<BookingAffiliate />} />
              <Route path="/agoda-hotels" element={<AgodaHotels />} />
              <Route path="/clicks-dashboard" element={<ClicksDashboard />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/open-water" element={<OpenWater />} />
              <Route path="/courses/advanced" element={<Advanced />} />
              <Route path="/courses/efr" element={<EFR />} />
              <Route path="/courses/rescue" element={<Rescue />} />
              <Route path="/courses/divemaster" element={<Divemaster />} />
              <Route path="/courses/instructor" element={<Instructor />} />
              <Route path="/courses/msdt-program" element={<MSDTProgram />} />
              <Route path="/courses/scuba-review" element={<ScubaReview />} />
              <Route path="/courses/scuba-diver" element={<ScubaDiver />} />
              <Route path="/courses/discover-scuba" element={<DiscoverScuba />} />
              <Route path="/courses/dsd" element={<DiscoverScuba />} />
              <Route path="/courses/discover-scuba-deluxe" element={<DiscoverScubaDeluxe />} />
              <Route path="/courses/dsd-deluxe" element={<DiscoverScubaDeluxe />} />
              <Route path="/courses/pro-level" element={<ProLevelCourses />} />
              <Route path="/courses/specialties/:slug" element={<SpecialtyDetail />} />
              <Route path="/specialty/deep-diver" element={<DeepDiver />} />
              <Route path="/specialty/wreck-diver" element={<WreckDiver />} />
              <Route path="/specialty/enriched-air-diver" element={<EnrichedAirDiver />} />
              <Route path="/specialty/night-diver" element={<NightDiver />} />
              <Route path="/specialty/peak-performance-buoyancy" element={<PeakPerformanceBuoyancy />} />
              <Route path="/specialty/search-recovery" element={<SearchRecovery />} />
              <Route path="/specialty/self-reliant-diver" element={<SelfReliantDiver />} />
              <Route path="/specialty/sidemount-diver" element={<SidemountDiver />} />
              <Route path="/specialty/underwater-navigator" element={<UnderwaterNavigator />} />
              <Route path="/specialty/fish-identification" element={<FishIdentification />} />
              <Route path="/specialty/dive-against-debris" element={<DiveAgainstDebris />} />
              <Route path="/specialty/coral-watch" element={<CoralWatch />} />
              <Route path="/specialty/dpv-diver" element={<DPVDiver />} />
              <Route path="/specialty/shark-conservation" element={<SharkConservation />} />
              <Route path="/specialty/sea-turtle-awareness" element={<SeaTurtleAwareness />} />
              <Route path="/specialty/whaleshark-awareness" element={<WhaleSharkAwareness />} />
              <Route path="/specialty/adaptive-support" element={<AdaptiveSupportDiver />} />
              <Route path="/specialty/boat-diver" element={<BoatDiver />} />
              <Route path="/specialty/current-diver" element={<CurrentDiver />} />
              <Route path="/specialty/photography" element={<Photography />} />
              <Route path="/specialty/emergency-o2" element={<EmergencyO2Provider />} />
              <Route path="/specialty/equipment-specialist" element={<EquipmentSpecialist />} />
              <Route path="/specialty/underwater-naturalist" element={<UnderwaterNaturalist />} />
              <Route path="/internship/divemaster" element={<DivemasterInternship />} />
              <Route path="/internship/instructor" element={<InstructorInternship />} />
              <Route path="/fun-diving-koh-tao" element={<FunDiving />} />
              <Route path="/koh-tao-dive-sites" element={<DiveSitesPage />} />
              <Route path="/dive-sites/sail-rock" element={<SailRock />} />
              <Route path="/dive-sites/chumphon-pinnacles" element={<Navigate to="/dive-sites/chumphon-pinnacle" replace />} />
              <Route path="/dive-sites/chumphon-pinnacle" element={<ChumphonPinnacle />} />
              <Route path="/dive-sites/japanese-garden" element={<Navigate to="/dive-sites/japanese-gardens" replace />} />
              <Route path="/dive-sites/japanese-gardens" element={<JapaneseGardens />} />
              <Route path="/dive-sites/htms-sattukut" element={<Navigate to="/dive-sites/htms-sattakut" replace />} />
              <Route path="/dive-sites/htms-sattakut-wreck" element={<Navigate to="/dive-sites/htms-sattakut" replace />} />
              <Route path="/dive-sites/htms-sattakut" element={<HTMSSattakut />} />
              <Route path="/dive-sites/twins" element={<Navigate to="/dive-sites/twins-pinnacle" replace />} />
              <Route path="/dive-sites/twins-pinnacle" element={<TwinsPinnacle />} />
              <Route path="/dive-sites/shark-island" element={<SharkIsland />} />
              <Route path="/dive-sites/mango-bay" element={<MangoBay />} />
              <Route path="/dive-sites/southwest-pinnacle" element={<Navigate to="/dive-sites/south-west-pinnacle" replace />} />
              <Route path="/dive-sites/south-west-pinnacle" element={<SouthWestPinnacle />} />
              <Route path="/dive-sites/ao-leuk" element={<Navigate to="/dive-sites/aow-leuk" replace />} />
              <Route path="/dive-sites/aow-luek" element={<Navigate to="/dive-sites/aow-leuk" replace />} />
              <Route path="/dive-sites/aow-leuk" element={<AowLeuk />} />
              <Route path="/dive-sites/hin-ngam" element={<HinNgam />} />
              <Route path="/dive-sites/tanote" element={<Navigate to="/dive-sites/tanote-bay" replace />} />
              <Route path="/dive-sites/tanote-bay" element={<TanoteBay />} />
              <Route path="/dive-sites/junkyard-reef" element={<JunkyardReef />} />
              <Route path="/dive-sites/buoyancy-world" element={<BuoyancyWorld />} />
              <Route path="/marine-life" element={<MarineLifePage />} />
              <Route path="/marine-life/whaleshark" element={<Whaleshark />} />
              <Route path="/marine-life/green-sea-turtle" element={<GreenSeaTurtle />} />
              <Route path="/marine-life/hawksbill-sea-turtle" element={<HawksbillSeaTurtle />} />
              <Route path="/marine-life/great-barracuda" element={<GreatBarracuda />} />
              <Route path="/marine-life/black-tip-reef-shark" element={<BlackTipReefShark />} />
              <Route path="/marine-life/malabar-grouper" element={<MalabarGrouper />} />
              <Route path="/marine-life/cephalopods" element={<Cephalopods />} />
              <Route path="/marine-life/banded-sea-krait" element={<BandedSeaKrait />} />
              <Route path="/marine-life/bearded-scorpion-fish" element={<BeardedScorpionFish />} />
              <Route path="/marine-life/nudibranchs" element={<Nudibranchs />} />
              <Route path="/Accommodation" element={<Accommodation />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/koh-tao-info" element={<KohTaoInfo />} />
              <Route path="/ThingsToDo" element={<ThingsToDo />} />
              <Route path="/BanksKohTao" element={<BanksKohTao />} />
              <Route path="/BeachesKohTao" element={<BeachesKohTao />} />
              <Route path="/FoodDrink" element={<FoodDrink />} />
              <Route path="/HowToGetHere" element={<HowToGetHere />} />
              <Route path="/MedicalServices" element={<MedicalServices />} />
              <Route path="/ViewpointsKohTao" element={<ViewpointsKohTao />} />
              <Route path="/VisasKohTao" element={<VisasKohTao />} />
              <Route path="/WeatherKohTao" element={<WeatherKohTao />} />
              <Route path="/facebook" element={<FacebookFeedPage />} />
              <Route path="/booking-to-jira" element={<RequireAdmin><BookingToJiraForm /></RequireAdmin>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
