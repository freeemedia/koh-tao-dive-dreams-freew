import Accommodation from "./pages/Accommodation";
import ThingsToDo from "./pages/ThingsToDo";
import BanksKohTao from "./pages/BanksKohTao";
import BeachesKohTao from "./pages/BeachesKohTao";
import FoodDrink from "./pages/FoodDrink";
import HowToGetHere from "./pages/HowToGetHere";
import MedicalServices from "./pages/MedicalServices";
import ViewpointsKohTao from "./pages/ViewpointsKohTao";
import VisasKohTao from "./pages/VisasKohTao";
import WeatherKohTao from "./pages/WeatherKohTao";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import OpenWater from "./pages/OpenWater";
import Advanced from "./pages/Advanced";
import EFR from "./pages/EFR";
import Rescue from "./pages/Rescue";
import Divemaster from "./pages/Divemaster";
import Instructor from "./pages/Instructor";
import FunDiving from "./pages/FunDiving";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Courses from "./components/Courses";
import ProLevelCourses from "./pages/ProLevelCourses";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import DiveSitesPage from "./pages/DiveSitesPage";
import SailRock from "./pages/SailRock";
import ChumphonPinnacle from "./pages/ChumphonPinnacle";
import JapaneseGardens from "./pages/JapaneseGardens";
import HTMSSattakut from "./pages/HTMSSattakut";
import Twins from "./pages/Twins";
import SharkIsland from "./pages/SharkIsland";
import MangoBay from "./pages/MangoBay";
import BookingPage from "./pages/BookingPage";
import BookingAffiliate from "./pages/BookingAffiliate";
import AffiliateStats from "./pages/AffiliateStats";
import TripAffiliateStats from "./pages/TripAffiliateStats";
import TripAffiliate from "./pages/TripAffiliate";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import MarineLifePage from "./pages/MarineLifePage";
import Whaleshark from "./pages/Whaleshark";
import GreenSeaTurtle from "./pages/GreenSeaTurtle";
import HawksbillSeaTurtle from "./pages/HawksbillSeaTurtle";
import GreatBarracuda from "./pages/GreatBarracuda";
import BlackTipReefShark from "./pages/BlackTipReefShark";
import MalabarGrouper from "./pages/MalabarGrouper";
import Cephalopods from "./pages/Cephalopods";
import BandedSeaKrait from "./pages/BandedSeaKrait";
import BeardedScorpionFish from "./pages/BeardedScorpionFish";
import Nudibranchs from "./pages/Nudibranchs";
import AccommodationsPage from "./pages/AccommodationsPage";
import ScubaReview from "./pages/ScubaReview";
import ScubaDiver from "./pages/ScubaDiver";

// Specialty Courses
import DeepDiver from "./pages/specialty/DeepDiver";
import WreckDiver from "./pages/specialty/WreckDiver";
import EnrichedAirDiver from "./pages/specialty/EnrichedAirDiver";
import NightDiver from "./pages/specialty/NightDiver";
import PeakPerformanceBuoyancy from "./pages/specialty/PeakPerformanceBuoyancy";
import SearchRecovery from "./pages/specialty/SearchRecovery";
import SelfReliantDiver from "./pages/specialty/SelfReliantDiver";
import SidemountDiver from "./pages/specialty/SidemountDiver";
import UnderwaterNavigator from "./pages/specialty/UnderwaterNavigator";
import FishIdentification from "./pages/specialty/FishIdentification";
import DiveAgainstDebris from "./pages/specialty/DiveAgainstDebris";
import CoralWatch from "./pages/specialty/CoralWatch";
import DPVDiver from "./pages/specialty/DPVDiver";
import SharkConservation from "./pages/specialty/SharkConservation";
import SeaTurtleAwareness from "./pages/specialty/SeaTurtleAwareness";
import WhaleSharkAwareness from "./pages/specialty/WhaleSharkAwareness";
import AdaptiveSupportDiver from "./pages/specialty/AdaptiveSupportDiver";
import BoatDiver from "./pages/specialty/BoatDiver";
import CurrentDiver from "./pages/specialty/CurrentDiver";
import Photography from "./pages/specialty/Photography";
import EmergencyO2Provider from "./pages/specialty/EmergencyO2Provider";
import EquipmentSpecialist from "./pages/specialty/EquipmentSpecialist";
import UnderwaterNaturalist from "./pages/specialty/UnderwaterNaturalist";

// Internship Programs
import DivemasterInternship from "./pages/internship/Divemaster";
import InstructorInternship from "./pages/internship/Instructor";

import "./i18n";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fun-diving-koh-tao" element={<FunDiving />} />
          <Route path="/koh-tao-dive-sites" element={<DiveSitesPage />} />
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
          {/* <Route path="/koh-tao/accommodation" element={<AccommodationsPage />} /> removed, use /Accommodation instead */}
          <Route path="/dive-sites/sail-rock" element={<SailRock />} />
          <Route path="/dive-sites/chumphon-pinnacle" element={<ChumphonPinnacle />} />
          <Route path="/dive-sites/japanese-gardens" element={<JapaneseGardens />} />
          <Route path="/dive-sites/htms-sattakut" element={<HTMSSattakut />} />
          <Route path="/dive-sites/twins-pinnacle" element={<Twins />} />
          <Route path="/dive-sites/shark-island" element={<SharkIsland />} />
          <Route path="/dive-sites/mango-bay" element={<MangoBay />} />
          <Route path="/accommodation-booking" element={<BookingAffiliate />} />
          <Route path="/trip-booking" element={<TripAffiliate />} />
          <Route path="/admin/affiliate-stats" element={<AffiliateStats />} />
          <Route path="/admin/trip-affiliate-stats" element={<TripAffiliateStats />} />
          <Route path="/courses/open-water" element={<OpenWater />} />
          <Route path="/courses/advanced" element={<Advanced />} />
          <Route path="/courses/efr" element={<EFR />} />
          <Route path="/courses/rescue" element={<Rescue />} />
          <Route path="/courses/divemaster" element={<Divemaster />} />
          <Route path="/courses/instructor" element={<Instructor />} />
          <Route path="/courses/scuba-review" element={<ScubaReview />} />
          <Route path="/courses/scuba-diver" element={<ScubaDiver />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/courses/pro-level" element={<ProLevelCourses />} />
          <Route path="/courses/specialties/:slug" element={<SpecialtyDetail />} />
          
          {/* Specialty Course Routes */}
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

          {/* Internship Program Routes */}
          <Route path="/internship/divemaster" element={<DivemasterInternship />} />
          <Route path="/internship/instructor" element={<InstructorInternship />} />

          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/Accommodation" element={<Accommodation />} />
          <Route path="/ThingsToDo" element={<ThingsToDo />} />
          <Route path="/BanksKohTao" element={<BanksKohTao />} />
          <Route path="/BeachesKohTao" element={<BeachesKohTao />} />
          <Route path="/FoodDrink" element={<FoodDrink />} />
          <Route path="/HowToGetHere" element={<HowToGetHere />} />
          <Route path="/MedicalServices" element={<MedicalServices />} />
          <Route path="/ViewpointsKohTao" element={<ViewpointsKohTao />} />
          <Route path="/VisasKohTao" element={<VisasKohTao />} />
          <Route path="/WeatherKohTao" element={<WeatherKohTao />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
