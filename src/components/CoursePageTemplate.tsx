import React, { useEffect, useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookNowModal } from '@/components/useBookNowModal';
import { usePageContent } from '@/hooks/usePageContent';
// PageContentEditor import removed
import Contact from './Contact';
import InlineCourseBookingForm from './InlineCourseBookingForm';
import DropboxGallerySection from './DropboxGallerySection';
import ImageRow from './ImageRow';

export interface CourseSection {
  title: string;
  content: string | string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CoursePageProps {
  pageSlug: string;
  locale: 'en' | 'nl';
  fallbackContent: {
    hero_title: string;
    hero_subtitle: string;
    course_overview: string;
    price_thb?: string;
    price_usd?: string;
    price_eur?: string;
    duration?: string;
    [key: string]: string | undefined;
  };
  heroImage?: string;
  images?: string[];
  sections?: CourseSection[];
  faqs?: CourseFAQ[];
  level?: string;
  bookingItemName?: string;
  bookingType?: 'course' | 'dive';
  // Added for currency display
  priceIDR?: number;
  priceConverted?: string;
  selectedCurrency?: string;
  galleryFolder?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  galleryUnavailableMessage?: string;
  galleryEmptyMessage?: string;
}

const CoursePageTemplate: React.FC<CoursePageProps> = ({
  pageSlug,
  locale,
  fallbackContent,
  heroImage,
  images = ['/images/photo-1613853250147-2f73e55c1561.avif', '/images/photo-1618865181016-a80ad83a06d3.avif', '/images/photo-1647825194145-2d94e259c745.avif'],
  sections = [],
  faqs = [],
  level = 'Recreational',
  bookingItemName,
  bookingType = 'course',
  selectedCurrency,
  priceConverted,
  galleryFolder,
  galleryTitle,
  galleryDescription,
  galleryUnavailableMessage,
  galleryEmptyMessage,
}) => {



  const { setShowBookNow, BookNowModalComponent } = useBookNowModal();
  const { content, isLoading } = usePageContent({
    pageSlug,
    locale,
    fallbackContent,
  });

  const parseListValue = (value: string) =>
    String(value)
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const buildCmsSections = (source: Record<string, string | undefined>): CourseSection[] => {
    const parsed: CourseSection[] = [];

    for (let idx = 1; idx <= 8; idx += 1) {
      const title = source[`section_${idx}_title`];
      const rawContent = source[`section_${idx}_content`];

      if (!title || !rawContent) continue;

      const items = parseListValue(rawContent);
      parsed.push({
        title,
        content: items.length > 1 ? items : rawContent,
      });
    }

    return parsed;
  };

  const buildCmsFaqs = (source: Record<string, string | undefined>): CourseFAQ[] => {
    const parsed: CourseFAQ[] = [];

    for (let idx = 1; idx <= 10; idx += 1) {
      const question = source[`faq_${idx}_question`];
      const answer = source[`faq_${idx}_answer`];

      if (!question || !answer) continue;

      parsed.push({ question, answer });
    }

    return parsed;
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  const localeTag = locale === 'nl' ? 'nl-NL' : 'en-US';
  const parseAmount = (value: string) => {
    const digits = String(value || '').replace(/[^\d.-]/g, '');
    return Number(digits || 0);
  };


  const priceThb = content.price_thb || fallbackContent.price_thb || '0';
  const priceUsd = content.price_usd || fallbackContent.price_usd || '0';
  const priceEur = content.price_eur || fallbackContent.price_eur || '0';
  const duration = content.duration || fallbackContent.duration || 'Contact us';
  const cmsSections = buildCmsSections(content as Record<string, string | undefined>);
  const cmsFaqs = buildCmsFaqs(content as Record<string, string | undefined>);
  const displaySections = cmsSections.length > 0 ? cmsSections : sections;
  const displayFaqs = cmsFaqs.length > 0 ? cmsFaqs : faqs;
  const thbAmount = parseAmount(priceThb);
  const usdAmount = parseAmount(priceUsd);
  const eurAmount = parseAmount(priceEur);
  const bookingUrl = `/booking?item=${encodeURIComponent(bookingItemName || '')}&type=${bookingType}&price=${thbAmount}&currency=IDR&course=${encodeURIComponent(pageSlug || '')}`;  

  const heroImageUrl = heroImage || images[0];

  const { exchangeRates } = useCurrency();

  // Scroll to contact section
  const openBookNow = () => {
    setShowBookNow(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center overflow-hidden">
        <img 
          src={heroImageUrl} 
          alt={content.hero_title} 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-[20px] text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">{content.hero_title}</h1>
          <p className="mt-4 max-w-2xl text-lg">{content.hero_subtitle}</p>
          <div className="mt-6">
            <Button size="lg" onClick={openBookNow}>
              {locale === 'nl' ? 'Boek Nu' : 'Book Now'}
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-[20px] py-12">
        {images.length > 0 && <ImageRow images={images} />}

        {galleryFolder ? (
          <div className="mt-10">
            <DropboxGallerySection
              folder={galleryFolder}
              title={galleryTitle || (locale === 'nl' ? 'Galerij' : 'Gallery')}
              description={galleryDescription}
              unavailableMessage={galleryUnavailableMessage}
              emptyMessage={galleryEmptyMessage}
            />
          </div>
        ) : null}
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              {locale === 'nl' ? 'Cursusoverzicht' : 'Course Overview'}
            </h2>
            <p className="mb-6 text-base leading-relaxed">{content.course_overview}</p>

            {displaySections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base leading-relaxed">{section.content}</p>
                )}
              </div>
            ))}

            {displayFaqs.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mb-4 mt-8">
                  {locale === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h3>
                <div className="space-y-4">
                  {displayFaqs.map((faq, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside>
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{locale === 'nl' ? 'Cursusdetails' : 'Course Details'}</CardTitle>
                  <Badge>{level}</Badge>
                </div>
                <CardDescription>{duration}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {locale === 'nl' ? 'Prijs' : 'Price'}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-sky-600">฿{thbAmount.toLocaleString(localeTag)}</p>
                    {exchangeRates && exchangeRates.USD && exchangeRates.IDR && (
                      <p className="text-base text-muted-foreground">
                        ${(thbAmount / exchangeRates.IDR * exchangeRates.USD).toLocaleString(localeTag, { maximumFractionDigits: 0 })} USD
                      </p>
                    )}
                    {exchangeRates && exchangeRates.EUR && exchangeRates.IDR && (
                      <p className="text-base text-muted-foreground">
                        €{(thbAmount / exchangeRates.IDR * exchangeRates.EUR).toLocaleString(localeTag, { maximumFractionDigits: 0 })} EUR
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'nl' 
                    ? 'Inclusief alle training, materialen, PADI certificering en uitrusting' 
                    : 'Includes all training, materials, PADI certification and equipment'}
                </p>
                <Button className="w-full" onClick={openBookNow}>
                  {locale === 'nl' ? 'Boek / Informeer' : 'Book / Enquire'}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* PageContentEditor removed */}
        
        <section className="mt-12" id="book-with-us">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              {locale === 'nl' ? 'Boek bij ons' : 'Book with Us Now'}
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              {locale === 'nl'
                ? 'Vul het formulier in en we nemen binnen 24 uur contact met je op.'
                : 'Fill in the form below and we\'ll confirm availability within 24 hours.'}
            </p>
            <InlineCourseBookingForm
              itemType={bookingType}
              itemTitle={bookingItemName || content.hero_title || ''}
              depositMajor={thbAmount > 0 ? Math.round(thbAmount * 0.2) : undefined}
              depositCurrency="IDR"
            />
          </div>
        </section>

        <section className="mt-12" id="contact-section">
          <Contact />
        </section>
        {BookNowModalComponent}
      </main>
    </div>
  );
};

export default CoursePageTemplate;
