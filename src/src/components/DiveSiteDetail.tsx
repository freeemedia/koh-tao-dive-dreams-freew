import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface DiveSiteDetailProps {
  name: string;
  overview: string;
  quickFacts: {
    depth: string;
    difficulty: string;
    location: string;
    bestTime: string;
  };
  whatYouCanSee: string[];
  marineLifeHighlights: string[];
  divingTips: string[];
  images: string[];
  heroImage?: string;
  hideGallery?: boolean;
}

const cleanImageToken = (value: string) => {
  const token = String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/^\s*[-*•]+\s*/, '')
    .replace(/^\s*\d+[\.)]\s*/, '')
    .replace(/^\s*["']+|["']+\s*$/g, '')
    .trim();

  if (/^(\/images\/|https?:\/\/|data:image\/)/i.test(token)) {
    return token;
  }

  return '';
};

const extractImagePaths = (input: string) => {
  const source = String(input || '');
  const localMatches = source.match(/\/images\/[^<>"'\s,]+?\.(?:avif|webp|png|jpe?g|gif|svg)(?:\?[^<>"'\s,]*)?/gi) || [];
  const remoteMatches = source.match(/https?:\/\/[^<>"'\s,]+?\.(?:avif|webp|png|jpe?g|gif|svg)(?:\?[^<>"'\s,]*)?/gi) || [];
  const dataMatches = source.match(/data:image\/[a-zA-Z+.-]+;base64,[A-Za-z0-9+/=]+/g) || [];

  return [...localMatches, ...remoteMatches, ...dataMatches];
};

const DiveSiteDetail: React.FC<DiveSiteDetailProps> = ({
  name,
  overview,
  quickFacts,
  whatYouCanSee,
  marineLifeHighlights,
  divingTips,
  images,
  heroImage,
  hideGallery = false,
}) => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const normalizedImages = (() => {
    const raw = (images || []).map((item) => String(item || '')).join('\n');
    const extracted = extractImagePaths(raw);

    if (extracted.length > 0) {
      return Array.from(new Set(extracted.map(cleanImageToken).filter(Boolean)));
    }

    return (images || [])
      .flatMap((item) => String(item || '').split(/\r?\n|,/))
      .map(cleanImageToken)
      .filter(Boolean);
  })();

  const normalizedHero = (() => {
    if (!heroImage) return '';

    const extracted = extractImagePaths(heroImage);
    if (extracted.length > 0) {
      return cleanImageToken(extracted[0]);
    }

    return cleanImageToken(heroImage);
  })();

  const hero = normalizedHero || normalizedImages[0] || '/images/photo-1682686580849-3e7f67df4015.avif';

  const labels = isDutch
    ? {
        overview: 'Overzicht',
        quickFacts: 'Snelle feiten',
        depthRange: 'Dieptebereik',
        level: 'Niveau',
        location: 'Locatie',
        bestTime: 'Beste periode',
        whatToSee: 'Wat kun je zien',
        marineLife: 'Hoogtepunten marien leven',
        tips: 'Duiktips',
        gallery: 'Galerij',
      }
    : {
        overview: 'Overview',
        quickFacts: 'Quick facts',
        depthRange: 'Depth range',
        level: 'Level',
        location: 'Location',
        bestTime: 'Best time',
        whatToSee: 'What you can see',
        marineLife: 'Marine life highlights',
        tips: 'Diving tips',
        gallery: 'Gallery',
      };

  return (
    <div className="min-h-screen bg-background px-[20px] py-8">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg mb-8 h-72">
        <img src={hero} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">{name}</h1>
          {quickFacts.bestTime && (
            <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-full px-4 py-1 mb-2 shadow-lg">
              {labels.bestTime}: {quickFacts.bestTime}
            </span>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Facts */}
        <Card className="h-full flex flex-col justify-between bg-[#0a2239] text-white">
          <CardHeader>
            <CardTitle>{labels.quickFacts}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
              <div><span className="font-medium text-sm">{labels.depthRange}:</span> <span className="text-sm text-white/90">{quickFacts.depth}</span></div>
              <div><span className="font-medium text-sm">{labels.level}:</span> <span className="text-sm text-white/90">{quickFacts.difficulty}</span></div>
              <div><span className="font-medium text-sm">{labels.location}:</span> <span className="text-sm text-white/90">{quickFacts.location}</span></div>
          </CardContent>
        </Card>

        {/* What You Can See */}
        <Card className="h-full flex flex-col justify-between bg-[#0a2239] text-white">
          <CardHeader>
            <CardTitle>{labels.whatToSee}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {whatYouCanSee.map((item, index) => (
                  <Badge key={index} variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Marine Life Highlights */}
        <Card className="h-full flex flex-col justify-between bg-[#0a2239] text-white">
          <CardHeader>
            <CardTitle>{labels.marineLife}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {marineLifeHighlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Overview & Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{labels.overview}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base">{overview}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{labels.tips}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {divingTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Section */}
      {!hideGallery && normalizedImages.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{labels.gallery}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {normalizedImages.map((image, index) => (
                <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiveSiteDetail;