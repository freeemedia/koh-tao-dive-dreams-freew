import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const MSDTProgram: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const toList = (value: string) =>
    String(value || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const fallbackContent = {
    hero_title: isDutch
      ? 'PADI Master Scuba Diver Trainer (MSDT) Programma'
      : 'PADI Master Scuba Diver Trainer (MSDT) Program',
    hero_subtitle: isDutch
      ? 'Het PADI MSDT-programma is ontwikkeld voor instructeurs die hun lescarriere naar een hoger niveau willen brengen. Dit programma geeft je de vaardigheden, ervaring en certificeringen om een breed aanbod aan PADI-specialtycursussen te geven.'
      : 'The PADI MSDT Program is designed for instructors who want to take their teaching career to the next level. This program provides you with the skills, experience, and certifications to teach a wide range of PADI specialty courses, making you more employable and confident as a dive professional.',
    why_title: isDutch ? 'Waarom MSDT worden?' : 'Why Become an MSDT?',
    why_items: isDutch
      ? 'Geef minimaal vijf PADI Specialty-cursussen\nDoe praktijkervaring op via team teaching en mentoring\nVergroot je inzetbaarheid en verdienpotentieel\nVal op bij duikcentra en resorts wereldwijd\nVersterk je zelfvertrouwen en lesvaardigheden'
      : 'Teach at least five PADI Specialty courses\nGain hands-on experience through team teaching and mentorship\nIncrease your employability and earning potential\nStand out to dive centers and resorts worldwide\nEnhance your confidence and teaching skills',
    overview_title: isDutch ? 'Programmaoverzicht' : 'Program Overview',
    overview_items: isDutch
      ? 'Kies vijf PADI Specialty Instructor-ratings (bijv. Deep, Wreck, Nitrox, Night, Sidemount)\nVolg praktijkworkshops en realistische lessituaties\nWerk in teamverband met ervaren Course Directors en Staff Instructors\nOntvang begeleiding over standards, logistiek en studentmanagement\nLog minimaal 25 certificeringen om in aanmerking te komen voor de MSDT-rating'
      : 'Choose five PADI Specialty Instructor ratings (e.g., Deep, Wreck, Nitrox, Night, Sidemount, etc.)\nParticipate in hands-on workshops and real-world teaching scenarios\nTeam teach with experienced Course Directors and Staff Instructors\nReceive guidance on course standards, logistics, and student management\nLog at least 25 certifications to qualify for the MSDT rating',
    prereq_title: isDutch ? 'Toelatingseisen' : 'Prerequisites',
    prereq_items: isDutch
      ? 'PADI Open Water Scuba Instructor (OWSI)-certificering\nGeldige EFR Instructor-status\nMinimaal 25 PADI-studentcertificeringen (voor MSDT-aanvraag)\nMinimumleeftijd: 18 jaar'
      : 'PADI Open Water Scuba Instructor (OWSI) certification\nCurrent EFR Instructor\nMinimum 25 PADI student certifications (to apply for MSDT rating)\nMinimum age: 18 years',
    included_title: isDutch ? 'Wat is inbegrepen' : 'What’s Included',
    included_items: isDutch
      ? 'Vijf PADI Specialty Instructor-cursussen\nTeam teaching en mentoring\nAlle benodigde trainingsmaterialen\nBegeleiding bij het aanvraagproces\nToegang tot ervaren Course Directors'
      : 'Five PADI Specialty Instructor courses\nTeam teaching and mentorship\nAll required training materials\nGuidance on application process\nAccess to experienced Course Directors',
    enroll_title: isDutch ? 'Hoe schrijf je je in' : 'How to Enroll',
    enroll_body: isDutch
      ? 'Klaar om PADI Master Scuba Diver Trainer te worden? Neem contact op voor cursusdata, prijzen en advies over je specialty-keuzes.'
      : 'Ready to become a PADI Master Scuba Diver Trainer? Contact us for course dates, pricing, and to discuss your specialty choices.',
    enroll_cta: isDutch ? 'Informatie / Boek nu' : 'Enquire / Book Now',
  };

  const { content } = usePageContent({
    pageSlug: 'msdt-program',
    locale,
    fallbackContent,
  });

  const bookingUrl = `/booking?item=${encodeURIComponent(
    content.hero_title || 'PADI Master Scuba Diver Trainer (MSDT) Program'
  )}&type=course&currency=THB`;

  const contactRef = useRef<HTMLDivElement>(null);
  const handleContactScroll = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">{content.hero_title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {content.hero_subtitle}
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.why_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {toList(content.why_items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.overview_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {toList(content.overview_items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.prereq_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {toList(content.prereq_items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.included_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {toList(content.included_items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.enroll_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{content.enroll_body}</p>
              <Button onClick={handleContactScroll}>{content.enroll_cta}</Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <div ref={contactRef} className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-4">Contact for More Info</h2>
        <p>Contact us for course dates, pricing, and specialty advice. We'll help you plan your MSDT journey.</p>
        {/* You can add a contact form or component here if desired */}
      </div>
    </div>
  );
};

export default MSDTProgram;
