import Contact from '../components/Contact';

import React, { useMemo, useState, useEffect } from 'react';
import BookNowModal from '@/components/BookNowModal';
import DropboxGallery from '@/components/DropboxGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const SUPPORTED_CURRENCIES = ['THB', 'USD', 'EUR'] as const;
type Currency = typeof SUPPORTED_CURRENCIES[number];
const IDC_DROPBOX_FOLDER = 'instructor';

const Instructor: React.FC = () => {
  const [showBookNow, setShowBookNow] = useState(false);
  // Currency state
  const [currency, setCurrency] = useState<Currency>('THB');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({ THB: 1, USD: 1, EUR: 1 });

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_OPENEXCHANGERATES_API_KEY}&symbols=THB,USD,EUR`);
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates({
            THB: data.rates.THB || 1,
            USD: data.rates.USD || 1,
            EUR: data.rates.EUR || 1,
          });
        }
      } catch {
        // fallback: keep default rates
      }
    };
    fetchRates();
  }, []);

  // Currency conversion helper
  const convertCurrency = (amount: number | null | undefined, from: string = 'THB') => {
    if (!amount || !exchangeRates[from] || !exchangeRates[currency]) return '-';
    const thbAmount = from === 'THB' ? amount : (amount / exchangeRates[from]) * exchangeRates['THB'];
    const converted = (thbAmount / exchangeRates['THB']) * exchangeRates[currency];
    const symbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : '€';
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const toList = (value: string) =>
    String(value || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const fallbackContent = useMemo(
    () => ({
      hero_title: isDutch ? 'PADI Open Water Scuba Instructor' : 'PADI Open Water Scuba Instructor',
      hero_subtitle: isDutch
        ? 'Train om PADI-instructeur te worden en duikers wereldwijd op te leiden. De Instructor Development Course (IDC) bereidt je voor om cursussen te leiden en cursisten te certificeren.'
        : 'Train to become a PADI Instructor and teach divers worldwide. The Instructor Development Course (IDC) prepares candidates to lead courses and certify students.',
      cta_primary: isDutch ? 'Informatie over Instructor' : 'Enquire About Instructor',
      section_overview_title: isDutch ? 'Programmaoverzicht' : 'Program Overview',
      section_overview_body: isDutch
        ? 'Het Instructor-traject leidt ervaren duikers op om nieuwe duikers op te leiden en te certificeren. De IDC omvat lespresentaties, studentbeoordelingen en praktijkervaring in lesgeven, met begeleiding van ervaren stafinstructeurs.'
        : 'The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.',
      section_prereq_title: isDutch ? 'Toelatingseisen' : 'Prerequisites',
      section_prereq_body: isDutch
        ? 'Vereisten: PADI Divemaster (of gelijkwaardig), geldige EFR en een minimumaantal gelogde duiken volgens PADI-richtlijnen. Kandidaten moeten de Instructor-examens en beoordelingen succesvol afronden.'
        : 'Prerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.',
      section_learn_title: isDutch ? 'Wat je leert' : "What you'll learn",
      section_learn_items: isDutch
        ? 'Didactische en presentatievaardigheden\nCursusmanagement en studentbeoordeling\nRisicobeheer en leiderschap\nMarketing en zakelijke ontwikkeling voor instructeurs'
        : 'Teaching and presentation skills\nCourse management and student evaluation\nRisk management and leadership\nMarketing and business development for instructors',
      section_inclusions_title: isDutch ? 'Inbegrepen' : 'Inclusions',
      section_inclusions_items: isDutch
        ? 'IDC-materialen en PADI-registratie\nPraktijklessen en mentoring\nExamenvoorbereiding en examenkosten (waar van toepassing)'
        : 'IDC materials and PADI registration\nPractical teaching sessions and mentoring\nExam preparation and exam fees (where applicable)',
      faq_title: 'FAQ',
      faq_1_q: isDutch ? 'Hoe schrijf ik me in voor de IDC op Koh Tao?' : 'How do I enrol in the IDC on Koh Tao?',
      faq_1_a: isDutch
        ? 'Neem contact met ons op voor cursusdata, planning en het aanmeldproces. We begeleiden je stap voor stap van vereisten tot inschrijving.'
        : 'Contact us for course dates, schedule options and the application process. We can guide you step-by-step from prerequisites to enrollment.',
      faq_2_q: isDutch
        ? 'Kan ik direct na de IDC als PADI-instructeur werken?'
        : 'Can I work as a PADI Instructor right after completing IDC?',
      faq_2_a: isDutch
        ? 'Ja. Na afronding van de IDC en het behalen van het Instructor Examination (IE) ontvang je de PADI Open Water Scuba Instructor-certificering en kun je professioneel lesgeven.'
        : 'Yes. After completing the IDC and passing the Instructor Examination (IE), you earn the PADI Open Water Scuba Instructor certification and can teach professionally.',
      faq_3_q: isDutch
        ? 'Kan ik na de IDC doorgaan met professionele training?'
        : 'Can I continue professional training after the IDC?',
      faq_3_a: isDutch
        ? 'Absoluut. Na je instructeurscertificering kun je verder doorgroeien met pro-level trajecten zoals MSDT en meer, afhankelijk van je ervaring en doelen.'
        : 'Absolutely. After instructor certification, you can continue with pro-level development such as MSDT and beyond, depending on your experience and goals.',
      faq_4_q: isDutch ? 'Waarom Koh Tao kiezen voor een IDC?' : 'Why choose Koh Tao for an IDC?',
      faq_4_a: isDutch
        ? 'Koh Tao combineert uitstekende duiklocaties, ervaren instructeurs, lagere kosten van levensonderhoud en een sterke duikcommunity. Daardoor is het een van de beste plekken om een duikcarriere op te bouwen.'
        : 'Koh Tao combines excellent dive sites, experienced instructors, affordable living costs and a strong dive community, making it one of the best places to build a dive career.',
      sidebar_title: isDutch ? 'Cursusdetails' : 'Course Details',
      sidebar_badge: isDutch ? 'Pro Niveau' : 'Pro Level',
      sidebar_subtitle: isDutch
        ? 'IDC · Instructor Examination · Praktijkles'
        : 'IDC · Instructor Examination · Practical Teaching',
      price_thb: '68900',
      sidebar_note: isDutch
        ? 'Neem contact op voor een persoonlijk Instructor-traject en examendata.'
        : 'Contact us for a tailored Instructor pathway and exam dates.',
      sidebar_cta: isDutch ? 'Informatie / Aanmelden' : 'Enquire / Apply',
      next_steps_title: isDutch ? 'Volgende stappen' : 'Next steps',
      next_steps_body: isDutch
        ? 'Stuur je duik-cv en gewenste startdata. Wij begeleiden je door IDC-vereisten, planning en doorgroeimogelijkheden.'
        : "Send your diving resume and preferred start dates. We'll guide you through IDC prerequisites, schedules and placement opportunities.",
      contact_cta: isDutch ? 'Neem contact op voor boeking/informatie' : 'Get in touch to book/enquire',
      contact_hint: isDutch
        ? 'Of gebruik onderstaand formulier om direct een boekingsaanvraag te sturen.'
        : 'Or use the form below to send a booking request directly.',
      bottom_cta: isDutch ? 'Stuur boekingsaanvraag' : 'Send Booking Request',
    }),
    [isDutch]
  );

  const { content } = usePageContent({
    pageSlug: 'instructor',
    locale,
    fallbackContent,
  });

  const basePriceTHB = Number(String(content.price_thb || '68900').replace(/[^\d.-]/g, '')) || 68900;
  const bookingUrl = `/booking?item=${encodeURIComponent(
    content.hero_title || 'PADI Open Water Scuba Instructor'
  )}&type=course&price=${convertCurrency(basePriceTHB, 'THB').replace(/[^\d.]/g, '')}&currency=${currency}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-end items-center p-4">
        <label htmlFor="currency-select" className="mr-2 font-medium">Currency:</label>
        <select
          id="currency-select"
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
          className="border rounded px-2 py-1"
        >
          {SUPPORTED_CURRENCIES.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <section className="instructor-hero-bg relative h-72 md:h-96 flex items-center">
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">{content.hero_title}</h1>
          <p className="mt-4 max-w-2xl">{content.hero_subtitle}</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => setShowBookNow(true)}>{content.cta_primary}</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{content.section_overview_title}</h2>
            <p className="mb-6">{content.section_overview_body}</p>

            <h3 className="text-xl font-semibold mb-3">{content.section_prereq_title}</h3>
            <p className="mb-6">{content.section_prereq_body}</p>

            <h3 className="text-xl font-semibold mb-3">{content.section_learn_title}</h3>
            <ul className="list-disc pl-5 mb-6">
              {toList(content.section_learn_items).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3">{content.section_inclusions_title}</h3>
            <ul className="list-disc pl-5 mb-6">
              {toList(content.section_inclusions_items).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3">{content.faq_title}</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{content.faq_1_q}</CardTitle>
                </CardHeader>
                <CardContent>
                  {content.faq_1_a}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{content.faq_2_q}</CardTitle>
                </CardHeader>
                <CardContent>
                  {content.faq_2_a}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{content.faq_3_q}</CardTitle>
                </CardHeader>
                <CardContent>
                  {content.faq_3_a}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{content.faq_4_q}</CardTitle>
                </CardHeader>
                <CardContent>
                  {content.faq_4_a}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Book Now widget removed as requested */}
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <DropboxGallery folder={IDC_DROPBOX_FOLDER} />
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">{content.next_steps_title}</h3>
          <p className="mb-4">{content.next_steps_body}</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">{content.contact_cta}</a>
            <div className="text-muted-foreground text-sm mb-4">{content.contact_hint}</div>
          </div>
          <Button onClick={() => setShowBookNow(true)}>{content.bottom_cta}</Button>
        </section>
      </main>
        <Contact />
      <BookNowModal open={showBookNow} onClose={() => setShowBookNow(false)} />
    </div>
  );
};

export default Instructor;
