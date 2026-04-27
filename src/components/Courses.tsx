import React, { useMemo, useState, useEffect } from 'react';

import { Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CourseRecommender from './CourseRecommender';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageContent } from '@/hooks/usePageContent';

const Courses = () => {



  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const homeFallbackContent = useMemo(() => ({
    courses_section_title: t('courses.title'),
    courses_section_subtitle: t('courses.subtitle'),

    course_open_water_title: t('courses.openWater.title'),
    course_open_water_level: t('courses.openWater.level'),
    course_open_water_duration: t('courses.openWater.duration'),
    course_open_water_max_depth: t('courses.openWater.maxDepth'),
    course_open_water_price: t('courses.openWater.price'),
    // Removed USD/EUR fallback prices
    course_open_water_description: t('courses.openWater.description'),

    course_advanced_title: t('courses.advanced.title'),
    course_advanced_level: t('courses.advanced.level'),
    course_advanced_duration: t('courses.advanced.duration'),
    course_advanced_max_depth: t('courses.advanced.maxDepth'),
    course_advanced_price: t('courses.advanced.price'),
    // Removed USD/EUR fallback prices
    course_advanced_description: t('courses.advanced.description'),

    course_efr_title: t('courses.efr.title'),
    course_efr_level: t('courses.efr.level'),
    course_efr_duration: t('courses.efr.duration'),
    course_efr_max_depth: t('courses.efr.maxDepth'),
    course_efr_price: t('courses.efr.price'),
    course_efr_price_usd: '130',
    course_efr_price_eur: '120',
    course_efr_description: t('courses.efr.description'),

    course_rescue_title: t('courses.rescue.title'),
    course_rescue_level: t('courses.rescue.level'),
    course_rescue_duration: t('courses.rescue.duration'),
    course_rescue_max_depth: t('courses.rescue.maxDepth'),
    course_rescue_price: t('courses.rescue.price'),
    course_rescue_price_usd: '290',
    course_rescue_price_eur: '265',
    course_rescue_description: t('courses.rescue.description'),

    course_divemaster_title: t('courses.divemaster.title'),
    course_divemaster_level: t('courses.divemaster.level'),
    course_divemaster_duration: t('courses.divemaster.duration'),
    course_divemaster_max_depth: t('courses.divemaster.maxDepth'),
    course_divemaster_price: t('courses.divemaster.price'),
    course_divemaster_price_usd: '1190',
    course_divemaster_price_eur: '1090',
    course_divemaster_description: t('courses.divemaster.description'),

    course_instructor_title: t('courses.instructor.title'),
    course_instructor_level: t('courses.instructor.level'),
    course_instructor_duration: t('courses.instructor.duration'),
    course_instructor_max_depth: t('courses.instructor.maxDepth'),
    course_instructor_price: t('courses.instructor.price'),
    course_instructor_price_usd: '1710',
    course_instructor_price_eur: '1560',
    course_instructor_description: t('courses.instructor.description'),

    course_discover_scuba_title: 'Discover Scuba Diving (DSD)',
    course_discover_scuba_level: isDutch ? 'Beginner' : 'Beginner',
    course_discover_scuba_duration: isDutch ? '1 dag' : '1 day',
    course_discover_scuba_max_depth: '12m',
    course_discover_scuba_price: '฿2,500',
    course_discover_scuba_price_usd: '72',
    course_discover_scuba_price_eur: '66',
    course_discover_scuba_description: isDutch
      ? 'Geen brevet nodig. De ideale eerste stap om veilig kennis te maken met duiken.'
      : 'No certification required. The perfect first step to experience scuba diving safely.',

    course_discover_scuba_deluxe_title: 'Discover Scuba Diving Deluxe',
    course_discover_scuba_deluxe_level: isDutch ? 'Beginner' : 'Beginner',
    course_discover_scuba_deluxe_duration: isDutch ? '1-2 dagen' : '1-2 days',
    course_discover_scuba_deluxe_max_depth: '12m',
    course_discover_scuba_deluxe_price: '฿5,000',
    course_discover_scuba_deluxe_price_usd: '144',
    course_discover_scuba_deluxe_price_eur: '132',
    course_discover_scuba_deluxe_description: isDutch
      ? 'Uitgebreide DSD met 3 duiken voor meer onderwatertijd en een relaxter tempo.'
      : 'Extended DSD with 3 dives for more underwater time and a more relaxed pace.',
  }), [t, locale, isDutch]);

  const { content: homeContent } = usePageContent({
    pageSlug: 'home',
    locale,
    fallbackContent: homeFallbackContent,
  });

  const parsePriceMajor = (priceLabel: string) => {
    const digits = String(priceLabel || '').replace(/[^\d.-]/g, '');
    return digits ? Number(digits) : 0;
  };

  const localeTag = isDutch ? 'nl-NL' : 'en-US';
  const formatCurrency = (amount: number, currency: 'THB' | 'USD' | 'EUR') =>
    new Intl.NumberFormat(localeTag, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  // Helper to get THB price as number from price string (e.g., '฿2,500')
  const getThbPrice = (price: string) => {
    const digits = String(price || '').replace(/[^\d.]/g, '').replace(/,/g, '');
    return digits ? Number(digits) : 0;
  };


  const courses = [
    {
      key: 'openWater',
      path: '/courses/open-water',
      title: homeContent.course_open_water_title,
      level: homeContent.course_open_water_level,
      duration: homeContent.course_open_water_duration,
      maxDepth: homeContent.course_open_water_max_depth,
      price: homeContent.course_open_water_price,
      priceUsd: homeContent.course_open_water_price_usd,
      priceEur: homeContent.course_open_water_price_eur,
      description: homeContent.course_open_water_description,
      fullDescription: t('courses.openWater.fullDescription'),
      includes: t('courses.openWater.includes', { returnObjects: true }),
      whatsNext: t('courses.openWater.whatsNext'),
      courseImages: t('courses.openWater.courseImages', { returnObjects: true }),
      icon: "🤿",
      depositMajor: 2000,
      depositCurrency: 'THB'
    },
    {
      key: 'advanced',
      path: '/courses/advanced',
      title: homeContent.course_advanced_title,
      level: homeContent.course_advanced_level,
      duration: homeContent.course_advanced_duration,
      maxDepth: homeContent.course_advanced_max_depth,
      price: homeContent.course_advanced_price,
      priceUsd: homeContent.course_advanced_price_usd,
      priceEur: homeContent.course_advanced_price_eur,
      description: homeContent.course_advanced_description,
      fullDescription: t('courses.advanced.fullDescription'),
      includes: t('courses.advanced.includes', { returnObjects: true }),
      courseImages: t('courses.advanced.courseImages', { returnObjects: true }),
      icon: "🌊",
      depositMajor: 2500,
      depositCurrency: 'THB'
    },
    {
      key: 'efr',
      path: '/courses/efr',
      title: homeContent.course_efr_title,
      level: homeContent.course_efr_level,
      duration: homeContent.course_efr_duration,
      maxDepth: homeContent.course_efr_max_depth,
      price: homeContent.course_efr_price,
      priceUsd: homeContent.course_efr_price_usd,
      priceEur: homeContent.course_efr_price_eur,
      description: homeContent.course_efr_description,
      fullDescription: t('courses.efr.fullDescription'),
      includes: t('courses.efr.includes', { returnObjects: true }),
      courseImages: t('courses.efr.courseImages', { returnObjects: true }),
      icon: "🏥",
      depositMajor: 500,
      depositCurrency: 'THB'
    },
    {
      key: 'rescue',
      path: '/courses/rescue',
      title: homeContent.course_rescue_title,
      level: homeContent.course_rescue_level,
      duration: homeContent.course_rescue_duration,
      maxDepth: homeContent.course_rescue_max_depth,
      price: homeContent.course_rescue_price,
      priceUsd: homeContent.course_rescue_price_usd,
      priceEur: homeContent.course_rescue_price_eur,
      description: homeContent.course_rescue_description,
      fullDescription: t('courses.rescue.fullDescription'),
      includes: t('courses.rescue.includes', { returnObjects: true }),
      courseImages: t('courses.rescue.courseImages', { returnObjects: true }),
      icon: "🚨",
      depositMajor: 3000,
      depositCurrency: 'THB'
    },
    {
      key: 'divemaster',
      path: '/courses/divemaster',
      title: homeContent.course_divemaster_title,
      level: homeContent.course_divemaster_level,
      duration: homeContent.course_divemaster_duration,
      maxDepth: homeContent.course_divemaster_max_depth,
      price: homeContent.course_divemaster_price,
      priceUsd: homeContent.course_divemaster_price_usd,
      priceEur: homeContent.course_divemaster_price_eur,
      description: homeContent.course_divemaster_description,
      fullDescription: t('courses.divemaster.fullDescription'),
      includes: t('courses.divemaster.includes', { returnObjects: true }),
      courseImages: t('courses.divemaster.courseImages', { returnObjects: true }),
      icon: "👨‍🏫",
      depositMajor: 5000,
      depositCurrency: 'THB'
    },
    {
      key: 'instructor',
      path: '/courses/instructor',
      title: homeContent.course_instructor_title,
      level: homeContent.course_instructor_level,
      duration: homeContent.course_instructor_duration,
      maxDepth: homeContent.course_instructor_max_depth,
      price: homeContent.course_instructor_price,
      priceUsd: homeContent.course_instructor_price_usd,
      priceEur: homeContent.course_instructor_price_eur,
      description: homeContent.course_instructor_description,
      fullDescription: t('courses.instructor.fullDescription'),
      includes: t('courses.instructor.includes', { returnObjects: true }),
      courseImages: t('courses.instructor.courseImages', { returnObjects: true }),
      icon: "🎓",
      depositMajor: 10000,
      depositCurrency: 'THB'
    },
    {
      key: 'discoverScuba',
      path: '/courses/discover-scuba',
      title: homeContent.course_discover_scuba_title,
      level: homeContent.course_discover_scuba_level,
      duration: homeContent.course_discover_scuba_duration,
      maxDepth: homeContent.course_discover_scuba_max_depth,
      price: homeContent.course_discover_scuba_price,
      priceUsd: homeContent.course_discover_scuba_price_usd,
      priceEur: homeContent.course_discover_scuba_price_eur,
      description: homeContent.course_discover_scuba_description,
      fullDescription: isDutch
        ? 'Discover Scuba Diving is ontworpen voor beginners. Je leert basisvaardigheden in een veilige omgeving en maakt daarna je eerste buitenwaterduik met een professional.'
        : 'Discover Scuba Diving is designed for beginners. You learn core skills in a safe environment and then complete your first open water dive with a professional.',
      includes: isDutch
        ? ['Gecertificeerde duikprofessional', 'Alle uitrusting inbegrepen', 'Kleine groepen (max 4)', 'Extra duiken mogelijk']
        : ['Certified scuba dive professional', 'All equipment included', 'Small groups (max 4)', 'Additional dives available'],
      courseImages: ['photo-1659518893171-b15e20a8e201.avif'],
      icon: '🐠',
      depositMajor: 1000,
      depositCurrency: 'THB',
      bookingType: 'dive'
    },
    {
      key: 'discoverScubaDeluxe',
      path: '/courses/discover-scuba-deluxe',
      title: homeContent.course_discover_scuba_deluxe_title,
      level: homeContent.course_discover_scuba_deluxe_level,
      duration: homeContent.course_discover_scuba_deluxe_duration,
      maxDepth: homeContent.course_discover_scuba_deluxe_max_depth,
      price: homeContent.course_discover_scuba_deluxe_price,
      priceUsd: homeContent.course_discover_scuba_deluxe_price_usd,
      priceEur: homeContent.course_discover_scuba_deluxe_price_eur,
      description: homeContent.course_discover_scuba_deluxe_description,
      fullDescription: isDutch
        ? 'DSD Deluxe bevat zwembad/confined training plus een kustduik en twee bootduiken rond Koh Tao. Perfect als je meer ervaring wilt voordat je beslist over Open Water.'
        : 'DSD Deluxe includes confined training plus one shore dive and two boat dives around Koh Tao. Ideal if you want more experience before deciding on Open Water.',
      includes: isDutch
        ? ['3 begeleide duiken', 'Alle uitrusting inbegrepen', 'Gecertificeerde instructeur', 'Kleine groepen (max 4)']
        : ['3 guided dives', 'All equipment included', 'Certified instructor', 'Small groups (max 4)'],
      courseImages: ['photo-1682687982423-295485af248a.avif'],
      icon: '🌊',
      depositMajor: 1500,
      depositCurrency: 'THB',
      bookingType: 'dive'
    }
  ];

  const getLevelColor = (level: string) => {
    const levelColors: { [key: string]: string } = {
      [t('courses.openWater.level')]: 'bg-green-100 text-green-800 border-green-200',
      [t('courses.advanced.level')]: 'bg-blue-100 text-blue-800 border-blue-200',
      [t('courses.efr.level')]: 'bg-pink-100 text-pink-800 border-pink-200',
      [t('courses.rescue.level')]: 'bg-orange-100 text-orange-800 border-orange-200',
      [t('courses.divemaster.level')]: 'bg-purple-100 text-purple-800 border-purple-200',
      [t('courses.instructor.level')]: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return levelColors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <section id="courses" className="py-20 bg-muted scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 sm:px-[24px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {homeContent.courses_section_title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {homeContent.courses_section_subtitle}
          </p>
        </div>

        <CourseRecommender />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <div
              key={index}
              id={`course-${course.key}`}
              className="bg-background rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 scroll-mt-20"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{course.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{formatCurrency(getThbPrice(course.price), 'THB')}</div>
                  {/* Currency conversion removed */}
                  <div className="text-sm text-gray-500">{t('courses.perPerson')}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {t('courses.duration')}: {course.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="h-4 w-4 mr-2 text-blue-600 font-bold">📏</div>
                  {t('courses.maxDepth')}: {course.maxDepth}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">{t('courses.courseIncludes')}:</h4>
                <ul className="space-y-2">
                  {(course.includes as string[]).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-2 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {course.fullDescription && (
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="details" className="border-blue-200">
                    <AccordionTrigger className="text-blue-600 hover:text-blue-700 hover:no-underline">
                      {t('courses.readMore', 'Read more about this course')}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-gray-600 space-y-4 pt-2">
                        {(course.fullDescription as string).split('\n\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                        {course.courseImages && (course.courseImages as string[]).length > 0 && (
                          <div className="my-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {(course.courseImages as string[]).map((image, idx) => (
                                <img
                                  key={idx}
                                  src={`/images/${image}`}
                                  alt={`${course.title} - underwater scene ${idx + 1}`}
                                  className="rounded-lg object-cover h-40 w-full"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {course.whatsNext && (
                          <p className="text-blue-600 font-semibold italic mt-4">
                            {course.whatsNext}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Link to={course.path} className="flex-1">
                    <Button variant="outline" className="w-full">{t('courses.viewCourse', 'View course')}</Button>
                  </Link>
                  <button
                    onClick={() => {
                      const url = `https://booking.divinginasia.com/booking?item=${encodeURIComponent(course.title)}&type=${course.bookingType || 'course'}&price=${parsePriceMajor(course.price)}&currency=${course.depositCurrency}`;
                      window.open(url, '_blank', 'noopener');
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    {t('courses.bookButton')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{t('courses.specialOffers.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-blue-700 rounded-lg p-6">
              <h4 className="font-bold text-xl mb-2">{t('courses.specialOffers.combo.title')}</h4>
              <p className="text-blue-200 mb-3">{t('courses.specialOffers.combo.description')}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{t('courses.specialOffers.combo.price')}</span>
                <span className="text-blue-300 line-through">{t('courses.specialOffers.combo.originalPrice')}</span>
              </div>
            </div>
            <div className="bg-blue-700 rounded-lg p-6">
              <h4 className="font-bold text-xl mb-2">{t('courses.specialOffers.group.title')}</h4>
              <p className="text-blue-200 mb-3">{t('courses.specialOffers.group.description')}</p>
              <div className="text-2xl font-bold">{t('courses.specialOffers.group.discount')}</div>
            </div>
            <div className="bg-emerald-600 rounded-lg p-6 border-2 border-emerald-400">
              <h4 className="font-bold text-xl mb-2">🎓 {isDutch ? '3 Specialties Bundel!' : '3 Specialty Bundle!'}</h4>
              <p className="text-emerald-100 mb-3">
                {isDutch 
                  ? 'Schrijf in voor drie PADI Specialty duikcursussen en betaal minder. Verken verschillende aspecten van duiken, van zeeleven herkenning tot onderwaterfotografie.'
                  : 'Enroll in three PADI Specialty Dive Courses and pay less. Explore various aspects of scuba diving, from marine life identification to underwater photography.'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">฿18,000</span>
                <span className="text-emerald-200 line-through text-lg">฿24,000</span>
              </div>
              <Button 
                className="w-full mt-4 bg-background text-emerald-600 hover:bg-emerald-50"
                onClick={() => {
                  window.open('https://booking.divinginasia.com/booking?item=3%20Specialty%20Bundle&type=course&price=18000&currency=THB', '_blank', 'noopener');
                }}
              >
                {isDutch ? 'Boek Bundel' : 'Book Bundle'}
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Booking now handled on dedicated /booking page */}
    </section>
  );
};

export default Courses;
