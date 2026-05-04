  import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [funDivingOpen, setFunDivingOpen] = useState(false);
  const [diveSitesOpen, setDiveSitesOpen] = useState(false);
  const [marineLifeOpen, setMarineLifeOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
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
  const { t } = useTranslation();

  const courseCategories = [
    {
      label: 'BEGINNER COURSES',
      items: [
        { name: 'PADI Open Water Course', to: '/courses/open-water' },
        { name: 'PADI Scuba Diver Course', to: '/courses/scuba-diver' },
      ],
    },
    {
      label: 'ADVANCED COURSES',
      items: [
        { name: 'Advanced Open Water', to: '/courses/advanced' },
        { name: 'EFR First Aid Course', to: '/courses/efr' },
        { name: 'PADI Rescue Diver Course', to: '/courses/rescue' },
        { name: 'Scuba Review', to: '/courses/scuba-review' },
      ],
    },
    {
      label: 'PADI SPECIALTY COURSES',
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
      label: 'PRO LEVEL COURSES',
      items: [
        { name: t('courses.divemaster.title'), to: '/courses/divemaster' },
        { name: t('courses.instructor.title'), to: '/courses/instructor' },
        { name: 'Divemaster Internship', to: '/internship/divemaster' },
        { name: 'Instructor Internship', to: '/internship/instructor' },
      ],
    },
    
    
  ];

  const marineLifeItems = [
    { name: 'All Marine Life Overview', to: '/marine-life' },
    { name: 'Whaleshark', to: '/marine-life/whaleshark' },
    { name: 'Green Sea Turtle', to: '/marine-life/green-sea-turtle' },
    { name: 'Hawksbill Sea Turtle', to: '/marine-life/hawksbill-sea-turtle' },
    { name: 'Great Barracuda', to: '/marine-life/great-barracuda' },
    { name: 'Black Tip Reef Shark', to: '/marine-life/black-tip-reef-shark' },
    { name: 'Malabar Grouper', to: '/marine-life/malabar-grouper' },
    { name: 'Cephalopods', to: '/marine-life/cephalopods' },
    { name: 'Banded Sea Krait', to: '/marine-life/banded-sea-krait' },
    { name: 'Bearded Scorpion Fish', to: '/marine-life/bearded-scorpion-fish' },
    { name: 'Nudibranchs', to: '/marine-life/nudibranchs' },
  ];

  const navItems = [
    { name: t('nav.home'), href: 'https://divinginasia.com' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 border-solid border-0">
          <div className="flex items-center">
            <img src="/images/logo.avif" alt="Pro Diving Asia Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              {t('nav.home')}
            </Link>

            {/* Courses mega dropdown */}
            <div className="relative group">
              <Link
                to="/courses"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.courses')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Link>
              <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[1100px] p-6 flex gap-8">
                  {courseCategories.map((cat) => (
                    <div key={cat.label} className="flex-1">
                      <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                        {cat.label}
                      </h4>
                      <ul className="space-y-1">
                        {cat.items.map((item) => (
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
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    Dive Sites
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/koh-tao-dive-sites"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        All Dive Sites Overview
                      </Link>
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
                        to="/dive-sites/twins-pinnacle"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Twins Pinnacle
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
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    Marine Life
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
                Fun Dive Trips
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[250px] p-5">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    Fun Diving
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/fun-diving-koh-tao"
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Fun Diving Koh Tao
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#schedule"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#schedule')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Boat Schedule
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#pricing"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#pricing')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Pricing & Packages
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#requirements"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#requirements')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Diver Requirements
                      </a>
                    </li>
                    <li>
                      <a
                        href="/fun-diving-koh-tao#tips"
                        onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#tips')}
                        className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        Choosing a Dive Center
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            {/* Info Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1">
                Info
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </button>
              <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[250px] p-5">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">KOH TAO</h4>
                  <ul className="space-y-1">
                    <li><Link to="/Accommodation" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Accommodation</Link></li>
                    <li><Link to="/ThingsToDo" className="block py-1.5 text-sm text-cyan-400 hover:text-white hover:pl-1 transition-all duration-150">Things To Do</Link></li>
                    <li><Link to="/BanksKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Banks Koh Tao</Link></li>
                    <li><Link to="/BeachesKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Beaches Koh Tao</Link></li>
                    <li><Link to="/FoodDrink" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Food & Drink</Link></li>
                    <li><Link to="/HowToGetHere" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">How To Get Here</Link></li>
                    <li><Link to="/MedicalServices" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Medical Services</Link></li>
                    <li><Link to="/ViewpointsKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Viewpoints Koh Tao</Link></li>
                    <li><Link to="/VisasKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Visas Koh Tao</Link></li>
                    <li><Link to="/WeatherKohTao" className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150">Weather Koh Tao</Link></li>
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

            {/* Account dropdown */}
            <div className="relative group">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                Account
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </button>
              <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d]/80 rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[150px] p-3">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-[#1a3a5c] transition-all duration-150 rounded"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-[#1a3a5c] transition-all duration-150 rounded"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
          <div className="md:hidden bg-white border-t border-gray-200">
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
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
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
                  Dive Sites
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${diveSitesOpen ? 'rotate-90' : ''}`} />
                </button>
                {diveSitesOpen && (
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    <Link to="/koh-tao-dive-sites" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      All Dive Sites Overview
                    </Link>
                    <Link to="/dive-sites/sail-rock" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Sail Rock
                    </Link>
                    <Link to="/dive-sites/chumphon-pinnacle" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Chumphon Pinnacle
                    </Link>
                    <Link to="/dive-sites/japanese-gardens" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Japanese Gardens
                    </Link>
                    <Link to="/dive-sites/htms-sattakut" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      HTMS Sattakut
                    </Link>
                    <Link to="/dive-sites/twins-pinnacle" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Twins Pinnacle
                    </Link>
                    <Link to="/dive-sites/shark-island" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Shark Island
                    </Link>
                    <Link to="/dive-sites/mango-bay" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Mango Bay
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
                  <span>Fun Dive Trips</span>
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
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    <Link to="/fun-diving-koh-tao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Fun Diving Koh Tao
                    </Link>
                    <a href="/fun-diving-koh-tao#schedule" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#schedule')}>
                      Boat Schedule
                    </a>
                    <a href="/fun-diving-koh-tao#pricing" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#pricing')}>
                      Pricing & Packages
                    </a>
                    <a href="/fun-diving-koh-tao#requirements" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#requirements')}>
                      Diver Requirements
                    </a>
                    <a href="/fun-diving-koh-tao#tips" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, '/fun-diving-koh-tao#tips')}>
                      Choosing a Dive Center
                    </a>
                  </div>
                )}
              </div>


              {/* Info Dropdown for Mobile */}
              <div>
                <button
                  onClick={() => setFunDivingOpen(!funDivingOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Info
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${funDivingOpen ? 'rotate-90' : ''}`} />
                </button>
                {funDivingOpen && (
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    <Link to="/Accommodation" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Accommodation</Link>
                    <Link to="/ThingsToDo" className="block px-3 py-1.5 text-sm text-cyan-400 hover:text-blue-600" onClick={() => setIsOpen(false)}>Things To Do</Link>
                    <Link to="/BanksKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Banks Koh Tao</Link>
                    <Link to="/BeachesKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Beaches Koh Tao</Link>
                    <Link to="/FoodDrink" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Food & Drink</Link>
                    <Link to="/HowToGetHere" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>How To Get Here</Link>
                    <Link to="/MedicalServices" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Medical Services</Link>
                    <Link to="/ViewpointsKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Viewpoints Koh Tao</Link>
                    <Link to="/VisasKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Visas Koh Tao</Link>
                    <Link to="/WeatherKohTao" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Weather Koh Tao</Link>
                  </div>
                )}
              </div>

              {/* Contact stays as a single nav item for mobile */}
              <a key={navItems[1].name} href={navItems[1].href} className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={(e) => handleAnchorClick(e, navItems[1].href)}>
                {navItems[1].name}
              </a>

              {/* Mobile account accordion */}
              <div>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  <span>Account</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${accountOpen ? 'rotate-90' : ''}`}
                  />
                </button>
                {accountOpen && (
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    <Link to="/login" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link to="/signup" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
