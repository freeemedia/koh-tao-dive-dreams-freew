import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MapPin, Waves, Fish, Anchor, Eye, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseSpecies = (value: string) => {
  if (!value) return [];
  return value.split('\n').filter(Boolean).map(line => {
    const [name, description, size, habitat, season, link] = line.split('|');
    return { name: name || '', description: description || '', size: size || '', habitat: habitat || '', season: season || '', link: link || null };
  });
};

interface MarineSpecies {
  name: string;
  description: string;
  size: string;
  habitat: string;
  season: string;
  link?: string | null;
}

const MarineLifePage = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
    label_size: 'Grootte',
    label_habitat: 'Habitat',
    label_season: 'Beste periode',
    label_more: 'Meer info',
    hero_title: 'Marien leven rond Nusa Lembongan',
    hero_text: 'Ontdek de spectaculaire onderwaterwereld van Nusa Lembongan — van reusachtige Mola Mola tot mantaroggen, rifhaaien en kleurrijke koraalriffen.',
    intro_title: 'Marien leven rond de Nusa eilanden',
    intro_text: 'De wateren rond Nusa Lembongan, Nusa Penida en Nusa Ceningan behoren tot de rijkste mariene gebieden van Bali. Sterke stromen brengen voedselrijk koud water omhoog, waardoor unieke ontmoetingen mogelijk zijn met Mola Mola, mantaroggen en bultkoppapegaaivissen. Watertemperaturen liggen tussen 22-28°C.',
    pelagic_title: 'Pelagische soorten',
    sharks_title: 'Rifhaaien',
    turtles_title: 'Zeeschildpadden',
    macro_title: 'Macro marien leven',
    cta_title: 'Klaar om het mariene leven van Lembongan te beleven?',
    cta_text: 'Doe mee met onze PADI-gecertificeerde cursussen en fun dive trips om deze geweldige dieren van dichtbij in hun natuurlijke habitat te zien.',
    cta_courses: 'Bekijk cursussen',
    cta_fun_dives: 'Fun dive trips',
    pelagic_species: 'Mola Mola (Maanvis)|De meest iconische bewoner van Crystal Bay. Deze massieve vissen kunnen tot 2.000 kg wegen en worden gezien op reinigingsstations op 15-30m diepte.|Tot 3m, 2000kg|Crystal Bay & SD Point|Jul-nov (piek aug-okt)|\nMantarog|Elegante planktoneters met enorme spanwijdte die spectaculaire rolbewegingen maken bij reinigingsstations.|Spanwijdte tot 7m|Manta Point, Gamat Bay|Hele jaar, piek apr-okt|\nBultkoppapegaaivis|Indrukwekkende scholen van soms 50+ exemplaren die over het rif trekken.|Tot 70cm|Toyapakeh, Mangrove Point|Hele jaar|\nBarracudaSchool|Zilverglanzende roofvissen die in grote dichte scholen jagen.|Tot 1,8m|Blue Corner, Ceningan Wall|Hele jaar|',
    reef_sharks: 'Zwartpuntrifhaai|Veelgeziene rifhaaien met kenmerkende zwarte vinpunten bij Blue Corner en Ceningan Wall.|Tot 1,8m|Rifrand en Blue Corner|Hele jaar|\nWittiprifhaai|Slanke rifhaaien die vaak rusten op de bodem van holen en grotten.|Tot 2,1m|Diepe riffen en grotten|Hele jaar|',
    sea_turtles: 'Groene zeeschildpad|Regelmatig gezien grazend op zeegras bij Mangrove Point en Toyapakeh.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Herkenbaar aan de snavelvormige bek, eet sponsen op koraalriffen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle',
    macro_life: 'Pygmee zeepaardje|Minuscuul zeepaardje van slechts 2cm dat op waaiersponzen leeft.|2cm|Waaiersponzen 15-30m|Hele jaar|\nNaaktslakken|Honderden soorten kleurrijke zeenaaktslakken op de riffen van Ceningan en Lembongan.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nSpookpijlvis|Zeldzame, goed gecamoufleerde verwant van het zeepaardje.|5-15cm|Zeegras en koraal|Hele jaar|\nKoppotigen|Intelligente octopussen en inktvissen die actief jagen op het rif.|5cm-1m|Koraalriffen|Hele jaar|/marine-life/cephalopods',
  } : {
    label_size: 'Size',
    label_habitat: 'Habitat',
    label_season: 'Best season',
    label_more: 'More info',
    hero_title: 'Marine Life of Nusa Lembongan',
    hero_text: "Discover Nusa Lembongan's spectacular underwater world — from giant Mola Mola to manta rays, reef sharks and vibrant coral reefs.",
    intro_title: 'Marine life around the Nusa Islands',
    intro_text: 'The waters surrounding Nusa Lembongan, Nusa Penida and Nusa Ceningan are among the richest marine environments in Bali. Strong currents upwell cold, nutrient-rich water creating unique encounters with Mola Mola, manta rays and bumphead parrotfish. Water temperatures range from 22-28°C depending on season and depth.',
    pelagic_title: 'Pelagic species',
    sharks_title: 'Reef sharks',
    turtles_title: 'Sea turtles',
    macro_title: 'Macro marine life',
    cta_title: 'Ready to experience Lembongan marine life?',
    cta_text: 'Join our PADI-certified courses and fun dive trips to see these incredible animals up close in their natural habitat.',
    cta_courses: 'View courses',
    cta_fun_dives: 'Fun dive trips',
    pelagic_species: 'Mola Mola (Ocean Sunfish)|The most iconic resident of Crystal Bay. These massive fish can weigh up to 2,000 kg and are seen at cleaning stations at 15-30m depth.|Up to 3m, 2000kg|Crystal Bay & SD Point|Jul-Nov (peak Aug-Oct)|\nManta ray|Elegant plankton feeders with an enormous wingspan that perform spectacular looping rolls at cleaning stations.|Wingspan up to 7m|Manta Point, Gamat Bay|Year-round, peak Apr-Oct|\nBumphead parrotfish|Impressive schools of 50+ individuals sweeping across the reef biting coral.|Up to 70cm|Toyapakeh, Mangrove Point|Year-round|\nBarracuda school|Silver predators that hunt in large dense schools.|Up to 1.8m|Blue Corner, Ceningan Wall|Year-round|',
    reef_sharks: 'Blacktip reef shark|Commonly seen with distinctive black fin tips, active at Blue Corner and Ceningan Wall.|Up to 1.8m|Reef edge and Blue Corner|Year-round|\nWhitetip reef shark|Slender sharks often resting on the bottom of caves and overhangs.|Up to 2.1m|Deeper reefs and caves|Year-round|',
    sea_turtles: 'Green sea turtle|Regularly spotted grazing on seagrass and resting on the reef at Mangrove Point and Toyapakeh.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Recognisable by its beak-like mouth, feeds on sponges on coral reefs.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle',
    macro_life: 'Pygmy seahorse|Tiny 2cm seahorse that lives on sea fan coral — a top find for macro photographers.|2cm|Sea fan coral 15-30m|Year-round|\nNudibranchs|Hundreds of species of colorful sea slugs on the reefs of Ceningan and Lembongan.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nGhost pipefish|Rare, well-camouflaged relative of the seahorse found among seagrass.|5-15cm|Seagrass and coral|Year-round|\nCephalopods|Intelligent octopuses, cuttlefish and squid actively hunting on the reef.|5cm-1m|Coral reefs|Year-round|/marine-life/cephalopods',
  };

  const { content: pageContent } = usePageContent({ pageSlug: 'marine-life-page', locale, fallbackContent });

  const pelagicSpecies = parseSpecies(pageContent.pelagic_species);
  const reefSharks = parseSpecies(pageContent.reef_sharks);
  const seaTurtles = parseSpecies(pageContent.sea_turtles);
  const macroLife = parseSpecies(pageContent.macro_life);

  const renderSpeciesCard = (species: MarineSpecies) => (
    <Card key={species.name} className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fish className="h-5 w-5 text-blue-600" />
          {species.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {species.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Waves className="h-4 w-4 text-blue-500" />
            <span>{pageContent.label_size}: {species.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>{pageContent.label_habitat}: {species.habitat}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>{pageContent.label_season}: {species.season}</span>
          </div>
          {species.link && (
            <Link to={species.link}>
              <Button variant="outline" size="sm" className="mt-2">
                {pageContent.label_more}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/marine.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            {pageContent.hero_title}
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            {pageContent.hero_text}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.intro_title}</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {pageContent.intro_text}
          </p>
        </div>

        {/* Pelagic Species */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Anchor className="h-6 w-6 text-blue-600" />
            {pageContent.pelagic_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pelagicSpecies.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Reef Sharks */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Fish className="h-6 w-6 text-blue-600" />
            {pageContent.sharks_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reefSharks.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Sea Turtles */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-600" />
            {pageContent.turtles_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seaTurtles.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Macro Life */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-600" />
            {pageContent.macro_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroLife.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{pageContent.cta_title}</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {pageContent.cta_text}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {pageContent.cta_courses}
              </Button>
            </Link>
            <Link to="/fun-diving-koh-tao">
              <Button size="lg" variant="outline">
                {pageContent.cta_fun_dives}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineLifePage;
