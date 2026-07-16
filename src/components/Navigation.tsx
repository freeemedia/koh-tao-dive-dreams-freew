
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [funDivingOpen, setFunDivingOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [diveSitesOpen, setDiveSitesOpen] = useState(false);
  const [marineLifeOpen, setMarineLifeOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // href format: /path#anchor or /#anchor
    const parts = href.split('#');
    const path = parts[0] || '/';
    const anchor = parts[1];
    if (!anchor) return navigate(path || '/');

    // Fun Diving sections live inside tabs; always navigate with hash so page can switch tab first.
    if ((path === '/fun-diving-koh-tao' || path === 'fun-diving-koh-tao') && anchor) {
      try { sessionStorage.setItem('scrollTo', anchor); } catch (_) {}
      navigate(`/fun-diving-koh-tao#${anchor}`);
      setIsOpen(false);
      return;
    }

    // If already on target page, scroll directly
    if (location.pathname === (path === '' ? '/' : path)) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        return;
      }
    }

    // Otherwise store desired anchor and navigate — page will read sessionStorage and scroll on mount
    try { sessionStorage.setItem('scrollTo', anchor); } catch (_) {}
    // update URL with hash for clarity
    const targetPath = (path === '' ? '/' : path);
    navigate(`${targetPath}#${anchor}`);
    setIsOpen(false);
  };
  const { t, i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const labels = {
    beginnerCourses: isDutch ? 'BEGINNERSCURSUSSEN' : 'BEGINNER COURSES',
    advancedCourses: isDutch ? 'GEVORDERDE CURSUSSEN' : 'ADVANCED COURSES',
    specialtyCourses: isDutch ? 'PADI SPECIALTY CURSUSSEN' : 'PADI SPECIALTY COURSES',
    professionalCourses: isDutch ? 'PROFESSIONELE CURSUSSEN' : 'PROFESSIONAL COURSES',
    marineLifeTitle: isDutch ? 'Marien leven' : 'Marine Life',
    marineLifeOverview: isDutch ? 'Overzicht marien leven' : 'Marine life overview',
    greenSeaTurtle: isDutch ? 'Groene zeeschildpad' : 'Green sea turtle',
    hawksbillSeaTurtle: isDutch ? 'Karetschildpad' : 'Hawksbill sea turtle',
    greatBarracuda: isDutch ? 'Grote barracuda' : 'Great barracuda',
    blacktipReefShark: isDutch ? 'Zwartpuntrifhaai' : 'Blacktip reef shark',
    bandedSeaKrait: isDutch ? 'Gestreepte zeekrait' : 'Banded sea krait',
    beardedScorpionfish: isDutch ? 'Baardschorpioenvis' : 'Bearded scorpionfish',
    diveSitesTitle: isDutch ? 'Locaties' : 'Sites',
    diveSitesOverview: isDutch ? 'Overzicht alle duiklocaties' : 'All dive sites overview',
    diveSiteReports: isDutch ? 'Duiklocatie rapporten' : 'Dive site reports',
    funDiveTrips: isDutch ? 'Fun Duiktrips' : 'Fun Dive Trips',
    boatSchedule: isDutch ? 'Bootschema' : 'Boat schedule',
    pricingPackages: isDutch ? 'Prijzen & pakketten' : 'Pricing & packages',
    diverRequirements: isDutch ? 'Vereisten voor duikers' : 'Diver requirements',
    chooseDiveCenter: isDutch ? 'Een duikcentrum kiezen' : 'Choosing a dive center',
    accommodation: isDutch ? 'Accommodatie' : 'Accommodation',
    thingsToDo: isDutch ? 'Wat te doen' : 'Things to do',
    banksKohTao: isDutch ? 'Banken op Koh Tao' : 'Banks on Koh Tao',
    beachesKohTao: isDutch ? 'Stranden op Koh Tao' : 'Beaches on Koh Tao',
    foodDrink: isDutch ? 'Eten & drinken' : 'Food & drink',
    howToGetHere: isDutch ? 'Hoe kom je hier' : 'How to get here',
    medicalServices: isDutch ? 'Medische zorg' : 'Medical services',
    viewpoints: isDutch ? 'Uitzichtpunten' : 'Viewpoints',
    weatherKohTao: isDutch ? 'Weer op Koh Tao' : 'Koh Tao weather',
    // Removed duplicate keys below
    // beginnerCourses: isDutch ? 'BEGINNERS' : 'BEGINNER',
    // advancedCourses: isDutch ? 'GEVORDERD' : 'ADVANCED',
    // specialtyCourses: isDutch ? 'SPECIALTY' : 'SPECIALTY',
    // professionalCourses: isDutch ? 'PROFESSIONEEL' : 'PROFESSIONAL',
    // marineLifeTitle: isDutch ? 'Marien' : 'Marine',
    // diveSitesTitle: isDutch ? 'Locaties' : 'Sites',
    // funDiveTrips: isDutch ? 'Fun Duik' : 'Fun Dive',
    // pricingPackages: isDutch ? 'Prijzen' : 'Pricing',
    // chooseDiveCenter: isDutch ? 'Duikcentrum' : 'Dive center',
    // accommodation: isDutch ? 'Accommodatie' : 'Stay',
    // thingsToDo: isDutch ? 'Te Doen' : 'To Do',
    // banksKohTao: isDutch ? 'Banken' : 'Banks',
    info: isDutch ? 'Info' : 'Info',
    visa: isDutch ? 'Visum' : 'Visa',
    funDivingHeading: isDutch ? 'Fun diven' : 'Fun diving',
    funDivingKohTao: isDutch ? 'Fun Diving Koh Tao' : 'Fun diving Koh Tao',
    discoverScuba: isDutch ? 'Ontdek Scuba (DSD)' : 'Discover Scuba (DSD)',
    discoverScubaDeluxe: isDutch ? 'Ontdek Scuba Deluxe' : 'Discover Scuba Deluxe',
  };

  const courseCategories = [
    {
      label: labels.beginnerCourses,
      items: [
        { name: t('courses.openWater.title'), to: '/courses/open-water' },
        { name: isDutch ? 'PADI Scuba Diver Cursus' : 'PADI Scuba Diver Course', to: '/courses/scuba-diver' },
        { name: labels.discoverScuba, to: '/courses/discover-scuba' },
        { name: labels.discoverScubaDeluxe, to: '/courses/discover-scuba-deluxe' },
      ],
    },
    {
      label: labels.advancedCourses,
      items: [
        { name: t('courses.advanced.title'), to: '/courses/advanced' },
        { name: isDutch ? 'EFR EHBO Cursus' : 'EFR First Aid Course', to: '/courses/efr' },
        { name: t('courses.rescue.title'), to: '/courses/rescue' },
        { name: isDutch ? 'Scuba Opfrissing' : 'Scuba Review', to: '/courses/scuba-review' },
      ],
    },
    {
      label: labels.specialtyCourses,
      items: [
        { name: 'Adaptive Support Diver', to: '/specialty/adaptive-support' },
        { name: 'Aware Fish Identification', to: '/specialty/fish-identification' },
        { name: 'Current Diver', to: '/specialty/current-diver' },
        { name: 'PADI Boat Diver', to: '/specialty/boat-diver' },
        { name: 'PADI Deep Diver', to: '/specialty/deep-diver' },
        { name: 'PADI DPV Diver', to: '/specialty/dpv-diver' },
        { name: 'Emergency O2 Provider', to: '/specialty/emergency-o2' },
        { name: 'Enriched Air Diver', to: '/specialty/enriched-air-diver' },
        { name: 'Equipment Specialist', to: '/specialty/equipment-specialist' },
        { name: 'PADI Night Diver', to: '/specialty/night-diver' },
        { name: 'PADI Peak Buoyancy', to: '/specialty/peak-performance-buoyancy' },
        { name: 'Search & Recovery Diver', to: '/specialty/search-recovery' },
        { name: 'Self Reliant Diver', to: '/specialty/self-reliant-diver' },
        { name: 'Sidemount Diver', to: '/specialty/sidemount-diver' },
        { name: 'Underwater Naturalist', to: '/specialty/underwater-naturalist' },
        { name: 'Underwater Navigator', to: '/specialty/underwater-navigator' },
        { name: 'Underwater Photography', to: '/specialty/photography' },
        { name: 'PADI Wreck Diver', to: '/specialty/wreck-diver' },
      ],
    },
    {
      label: labels.professionalCourses,
      items: [
        { name: t('courses.divemaster.title'), to: '/courses/divemaster' },
        { name: t('courses.instructor.title'), to: '/courses/instructor' },
        { name: isDutch ? 'Divemaster Stage' : 'Divemaster Internship', to: '/internship/divemaster' },
        { name: isDutch ? 'Instructeur Stage' : 'Instructor Internship', to: '/internship/instructor' },
        { name: isDutch ? 'PADI MSDT Programma' : 'PADI MSDT Program', to: '/courses/msdt-program' },
        { name: isDutch ? 'Trainingsvideos' : 'Training Videos', to: '/training-videos' },
      ],
    },
    
    
  ];

  const marineLifeItems = [
    { name: labels.marineLifeOverview, to: '/marine-life' },
    { name: 'Whaleshark', to: '/marine-life/whaleshark' },
    { name: labels.greenSeaTurtle, to: '/marine-life/green-sea-turtle' },
    { name: labels.hawksbillSeaTurtle, to: '/marine-life/hawksbill-sea-turtle' },
    { name: labels.greatBarracuda, to: '/marine-life/great-barracuda' },
    { name: labels.blacktipReefShark, to: '/marine-life/black-tip-reef-shark' },
    { name: 'Malabar Grouper', to: '/marine-life/malabar-grouper' },
    { name: 'Cephalopods', to: '/marine-life/cephalopods' },
    { name: labels.bandedSeaKrait, to: '/marine-life/banded-sea-krait' },
    { name: labels.beardedScorpionfish, to: '/marine-life/bearded-scorpion-fish' },
    { name: 'Nudibranchs', to: '/marine-life/nudibranchs' },
  ];

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  // Standard/main navigation for all other users/routes
  return (
    <nav className="fixed top-0 w-full border-b border-blue-600 bg-background/70 pt-4 shadow-sm backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 border-solid border-0 py-2">
          <div className="flex items-center pl-6">
            <img src="/images/logo.png" alt="Go. Pro Diving Asia Logo" className="block h-14 w-auto ml-0 mr-5" />
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-7 pl-[10px] pt-4 text-[1.05rem]">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              {t('nav.home')}
            </Link>
            {/* Courses mega dropdown */}
            <div className="relative group">
              <Link
                to="/courses"
                className="ml-0 flex items-center gap-1 pl-0 font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
              >
                {t('nav.courses')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Link>
              <div className="invisible absolute left-0 right-auto top-full z-50 ml-0 pl-0 pt-0 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="ml-0 flex min-w-[900px] max-w-[95vw] gap-8 overflow-x-auto rounded-lg border border-[#1a3a5c] bg-[#0b1e3d]/80 p-6 pl-8 shadow-2xl">
                  {courseCategories.map((cat) => (
                    <div key={cat.label} className="flex-1">
                      <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                        {cat.label}
                      </h4>
                      <ul className="space-y-1">
                        {cat.items
                          .map((item) => (
                            <li key={item.to}>
                              {item.to && item.to.startsWith('http') ? (
                                <a
                                  href={item.to}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150 uppercase tracking-wide"
                                >
                                  {item.name}
                                </a>
                              ) : (
                                <Link
                                  to={item.to}
                                  className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150 uppercase tracking-wide"
                                >
                                  {item.name}
                                </Link>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dive Sites dropdown */}
            <div className="relative group">
              <a
                href="#dive-sites"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.diveSites')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[300px] p-5">
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    {labels.diveSitesTitle}
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/koh-tao-dive-sites"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.diveSitesOverview}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-site-reports"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.diveSiteReports}
                      </Link>
                    </li>
                    <li className="pt-2 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      Deep Sites
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/sail-rock"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Sail Rock
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/chumphon-pinnacle"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Chumphon Pinnacle
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/south-west-pinnacle"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        South West Pinnacle
                      </Link>
                    </li>
                    <li className="pt-2 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      Coral Reefs
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/japanese-gardens"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Japanese Gardens
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/htms-sattakut"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        HTMS Sattakut
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/shark-island"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Shark Island
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/mango-bay"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Mango Bay
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/twins-pinnacle"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Twins Pinnacle
                      </Link>
                    </li>
                    <li className="pt-2 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      Artificial Reefs
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/htms-sattakut"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        HTMS Sattakut
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/junkyard-reef"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Junkyard Reef
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/buoyancy-world"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Buoyancy World
                      </Link>
                    </li>
                    <li className="pt-2 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      Beginner Sites
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/aow-leuk"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Aow Leuk
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/hin-ngam"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Hin Ngam
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dive-sites/tanote-bay"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Tanote Bay
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Marine Life dropdown */}
            <div className="relative group">
              <Link
                to="/marine-life"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.marineLife')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[300px] p-5">
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    {labels.marineLifeTitle}
                  </h4>
                  <ul className="space-y-1">
                    {marineLifeItems.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Fun Dive Trips dropdown */}
            <div className="relative group">
              <Link
                to="/fun-diving-koh-tao"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {labels.funDiveTrips}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[250px] p-5">
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    {labels.funDivingHeading}
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/fun-diving-koh-tao"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.funDivingKohTao}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/courses/discover-scuba"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.discoverScuba}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/courses/discover-scuba-deluxe"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.discoverScubaDeluxe}
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#schedule"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#schedule')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.boatSchedule}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#pricing"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#pricing')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.pricingPackages}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#requirements"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#requirements')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.diverRequirements}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#tips"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#tips')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {labels.chooseDiveCenter}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            {/* Info Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1">
                {labels.info}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </button>
              <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[250px] p-5">
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">KOH TAO</h4>
                  <ul className="space-y-1">
                    <li><Link to="/Accommodation" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.accommodation}</Link></li>
                    <li><Link to="/ThingsToDo" className="block py-1.5 text-sm text-blue-400 hover:text-white hover:pl-1 transition-all duration-150">{labels.thingsToDo}</Link></li>
                    <li><Link to="/BanksKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.banksKohTao}</Link></li>
                    <li><Link to="/BeachesKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.beachesKohTao}</Link></li>
                    <li><Link to="/FoodDrink" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.foodDrink}</Link></li>
                    <li><Link to="/HowToGetHere" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.howToGetHere}</Link></li>
                    <li><Link to="/MedicalServices" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.medicalServices}</Link></li>
                    <li><Link to="/ViewpointsKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.viewpoints}</Link></li>
                    <li><Link to="/VisasKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.visa}</Link></li>
                    <li><Link to="/WeatherKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">{labels.weatherKohTao}</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact stays as a single nav item */}
            <a
              href={navItems[1].href}
              onClick={(e) => handleAnchorClick(e, navItems[1].href)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {navItems[1].name}
            </a>
            <LanguageSwitcher />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                {t('nav.home')}
              </Link>

              <div>
                <button
                  onClick={() => setCoursesOpen(!coursesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {t('nav.courses')}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${coursesOpen ? 'rotate-90' : ''}`} />
                </button>
                {coursesOpen && (
                  <div className="pl-4 space-y-1 bg-muted rounded-lg mx-2 py-2">
                    {courseCategories.map((cat) => (
                      <div key={cat.label} className="mb-2">
                        <span className="block px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">{cat.label}</span>
                        {cat.items.map((item) => (
                          item.to && item.to.startsWith('http') ? (
                            <a key={item.to} href={item.to} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)} target="_blank" rel="noopener noreferrer">
                            {item.name}
                          </a>
                          ) : (
                            <Link key={item.to} to={item.to} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                              {item.name}
                            </Link>
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/koh-tao-dive-sites" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                {t('nav.diveSites')}
              </Link>

              {/* Mobile dive sites accordion */}
              <div>
                <button
                  onClick={() => setDiveSitesOpen(!diveSitesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {labels.diveSitesTitle}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${diveSitesOpen ? 'rotate-90' : ''}`} />
                </button>
                {diveSitesOpen && (
                  <div className="pl-4 space-y-1 bg-muted rounded-lg mx-2 py-2">
                    <Link to="/koh-tao-dive-sites" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {labels.diveSitesOverview}
                    </Link>
                    <Link to="/dive-site-reports" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {labels.diveSiteReports}
                    </Link>
                    <div className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Deep Sites</div>
                    <Link to="/dive-sites/sail-rock" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Sail Rock
                    </Link>
                    <Link to="/dive-sites/chumphon-pinnacle" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Chumphon Pinnacle
                    </Link>
                    <Link to="/dive-sites/south-west-pinnacle" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      South West Pinnacle
                    </Link>
                    <div className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Coral Reefs</div>
                    <Link to="/dive-sites/japanese-gardens" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Japanese Gardens
                    </Link>
                    <Link to="/dive-sites/shark-island" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Shark Island
                    </Link>
                    <Link to="/dive-sites/mango-bay" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Mango Bay
                    </Link>
                    <Link to="/dive-sites/twins-pinnacle" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Twins Pinnacle
                    </Link>
                    <div className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Artificial Reefs</div>
                    <Link to="/dive-sites/htms-sattakut" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      HTMS Sattakut
                    </Link>
                    <Link to="/dive-sites/junkyard-reef" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Junkyard Reef
                    </Link>
                    <Link to="/dive-sites/buoyancy-world" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Buoyancy World
                    </Link>
                    <div className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Beginner Sites</div>
                    <Link to="/dive-sites/aow-leuk" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Aow Leuk
                    </Link>
                    <Link to="/dive-sites/hin-ngam" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Hin Ngam
                    </Link>
                    <Link to="/dive-sites/tanote-bay" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Tanote Bay
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile fun dive trips accordion */}
              <div>
                <Link
                  to="/fun-diving-koh-tao"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  <span>{labels.funDiveTrips}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${funDivingOpen ? 'rotate-90' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFunDivingOpen(!funDivingOpen);
                    }}
                  />
                </Link>
                {funDivingOpen && (
                  <div className="pl-4 space-y-1 bg-muted rounded-lg mx-2 py-2">
                    <Link to="/fun-diving-koh-tao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {labels.funDivingKohTao}
                    </Link>
                    <Link to="/courses/discover-scuba" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {labels.discoverScuba}
                    </Link>
                    <Link to="/courses/discover-scuba-deluxe" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {labels.discoverScubaDeluxe}
                    </Link>
                    <a href="/fun-diving-koh-tao#schedule" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#schedule')}>
                      {labels.boatSchedule}
                    </a>
                    <a href="/fun-diving-koh-tao#pricing" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#pricing')}>
                      {labels.pricingPackages}
                    </a>
                    <a href="/fun-diving-koh-tao#requirements" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#requirements')}>
                      {labels.diverRequirements}
                    </a>
                    <a href="/fun-diving-koh-tao#tips" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#tips')}>
                      {labels.chooseDiveCenter}
                    </a>
                  </div>
                )}
              </div>


              {/* Info Dropdown for Mobile */}
              <div>
                <button
                  onClick={() => setInfoOpen(!infoOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {labels.info}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${infoOpen ? 'rotate-90' : ''}`} />
                </button>
                {infoOpen && (
                  <div className="pl-4 space-y-1 bg-muted rounded-lg mx-2 py-2">
                    <Link to="/Accommodation" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.accommodation}</Link>
                    <Link to="/ThingsToDo" className="block px-3 py-1.5 text-sm text-blue-400 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.thingsToDo}</Link>
                    <Link to="/BanksKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.banksKohTao}</Link>
                    <Link to="/BeachesKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.beachesKohTao}</Link>
                    <Link to="/FoodDrink" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.foodDrink}</Link>
                    <Link to="/HowToGetHere" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.howToGetHere}</Link>
                    <Link to="/MedicalServices" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.medicalServices}</Link>
                    <Link to="/ViewpointsKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.viewpoints}</Link>
                    <Link to="/VisasKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.visa}</Link>
                    <Link to="/WeatherKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{labels.weatherKohTao}</Link>
                  </div>
                )}
              </div>

              {/* Contact stays as a single nav item for mobile */}
              <a key={navItems[1].name} href={navItems[1].href} className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, navItems[1].href)}>
                {navItems[1].name}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
