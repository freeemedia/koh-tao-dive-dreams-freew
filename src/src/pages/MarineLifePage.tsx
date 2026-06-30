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
    hero_title: 'Marien leven van Koh Tao',
    hero_text: 'Ontdek de indrukwekkende biodiversiteit van Koh Tao\u2019s onderwaterwereld, met meer dan 350 vissoorten en bijzondere zeedieren.',
    intro_title: 'Marien leven op Koh Tao',
    intro_text: 'De tropische wateren rond Koh Tao kennen een enorme rijkdom aan zeeleven en biodiversiteit. Met stabiele watertemperaturen tussen 26-29\u00b0C het hele jaar door vormt de zee een ideaal leefgebied voor diverse soorten fauna en flora. Van vriendelijke reuzen zoals walvishaaien tot kleine macrosoorten: Koh Tao biedt ontmoetingen met enkele van de meest fascinerende zeedieren ter wereld.',
    pelagic_title: 'Pelagische soorten',
    sharks_title: 'Rifhaaien',
    turtles_title: 'Zeeschildpadden',
    macro_title: 'Macro marien leven',
    cta_title: 'Klaar om het mari\u00ebne leven van Koh Tao te beleven?',
    cta_text: 'Doe mee met onze PADI-gecertificeerde cursussen en fun dive trips om deze geweldige dieren van dichtbij in hun natuurlijke habitat te zien.',
    cta_courses: 'Bekijk cursussen',
    cta_fun_dives: 'Fun dive trips',
    pelagic_species: 'Walvishaai|De grootste vis ter wereld. Deze vriendelijke reuzen worden regelmatig gezien in diepere wateren rond Koh Tao, vooral tijdens planktonbloei.|Tot 12m|Diep water uit de kust|Hele jaar, piek nov-mrt|/marine-life/whaleshark\nGrote barracuda|Indrukwekkende roofvissen die in groepen jagen rond rotspieken uit de kust, met snelheden tot 40 km/u.|Tot 2m|Diepe rotspieken|Hele jaar|/marine-life/great-barracuda\nMantaroggen|Elegante planktoneters die tijdens het voeden spectaculaire draaibewegingen maken.|Spanwijdte tot 7m|Diepe wateren|Nov-Mar|\nMalabar tandbaars|Grote roofzuchtige tandbaars die in dieper water leeft en bekendstaat om hinderlaagjacht.|Tot 2,3m, 100kg|Diepe riffen en rotspieken|Hele jaar|/marine-life/malabar-grouper',
    reef_sharks: 'Zwartpuntrifhaai|Veelvoorkomende rifhaaien met kenmerkende zwarte vinpunten, vaak jagend in ondiep water.|Tot 2m|Koraalriffen|Hele jaar|/marine-life/black-tip-reef-shark\nGrijze rifhaai|Schuwere rifhaaien die dieper water verkiezen en minder vaak worden gezien.|Tot 2,5m|Diepe riffen|Hele jaar|',
    sea_turtles: 'Groene zeeschildpad|Plantenetende zeeschildpadden die grazen op zeegras en algen, vaak gezien in ondiepe baaien.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Mooie schildpadden met een kenmerkende snavelvormige bek, bekend om het eten van sponsen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle',
    macro_life: 'Naaktslakken|Kleurrijke zeenaaktslakken met bijzondere patronen en vormen, perfect voor macrofotografie.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nGebandeerde zeekrait|Giftige zeeslangen die in ondiep water op vis en paling jagen.|Tot 1,5m|Ondiepe riffen|Hele jaar|/marine-life/banded-sea-krait\nBaardschorpioenvis|Meester in camouflage met giftige stekels, perfect vermomd als koraal.|Tot 30cm|Koraalriffen|Hele jaar|/marine-life/bearded-scorpion-fish\nKoppotigen|Intelligente octopussen en inktvissen, meesters in camouflage en probleemoplossing.|5cm-3m|Koraalriffen en diep water|Hele jaar|/marine-life/cephalopods',
  } : {
    label_size: 'Size',
    label_habitat: 'Habitat',
    label_season: 'Best season',
    label_more: 'More info',
    hero_title: 'Marine life of Koh Tao',
    hero_text: 'Discover the impressive biodiversity of Koh Tao\u2019s underwater world, with over 350 fish species and remarkable marine animals.',
    intro_title: 'Marine life around Koh Tao',
    intro_text: 'The tropical waters around Koh Tao are rich in marine life and biodiversity. With stable water temperatures between 26-29\u00b0C year-round, the sea is an ideal habitat for diverse fauna and flora. From gentle giants like whale sharks to tiny macro species, Koh Tao offers encounters with some of the most fascinating sea creatures in the world.',
    pelagic_title: 'Pelagic species',
    sharks_title: 'Reef sharks',
    turtles_title: 'Sea turtles',
    macro_title: 'Macro marine life',
    cta_title: 'Ready to experience Koh Tao marine life?',
    cta_text: 'Join our PADI-certified courses and fun dive trips to see these incredible animals up close in their natural habitat.',
    cta_courses: 'View courses',
    cta_fun_dives: 'Fun dive trips',
    pelagic_species: "Whale shark|The largest fish in the world. These gentle giants are regularly spotted in deeper waters around Koh Tao, especially during plankton blooms.|Up to 12m|Deep offshore water|Year-round, peak Nov-Mar|/marine-life/whaleshark\nGreat barracuda|Impressive predators that hunt in schools around offshore pinnacles at speeds up to 40 km/h.|Up to 2m|Deep pinnacles|Year-round|/marine-life/great-barracuda\nManta rays|Elegant plankton feeders that perform spectacular looping movements while feeding.|Wingspan up to 7m|Deep water|Nov-Mar|\nMalabar grouper|Large predatory grouper living in deeper water, known for ambush hunting.|Up to 2.3m, 100kg|Deep reefs and pinnacles|Year-round|/marine-life/malabar-grouper",
    reef_sharks: 'Blacktip reef shark|Common reef sharks with distinctive black fin tips, often hunting in shallow water.|Up to 2m|Coral reefs|Year-round|/marine-life/black-tip-reef-shark\nGrey reef shark|Shyer reef sharks that prefer deeper water and are seen less often.|Up to 2.5m|Deep reefs|Year-round|',
    sea_turtles: 'Green sea turtle|Herbivorous sea turtles that graze on seagrass and algae, often seen in shallow bays.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Beautiful turtles with a distinctive beak-like mouth, known for feeding on sponges.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle',
    macro_life: 'Nudibranchs|Colorful sea slugs with unique patterns and shapes, perfect for macro photography.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nBanded sea krait|Venomous sea snakes that hunt fish and eels in shallow water.|Up to 1.5m|Shallow reefs|Year-round|/marine-life/banded-sea-krait\nBearded scorpionfish|Master of camouflage with venomous spines, perfectly disguised as coral.|Up to 30cm|Coral reefs|Year-round|/marine-life/bearded-scorpion-fish\nCephalopods|Intelligent octopuses and cuttlefish, masters of camouflage and problem solving.|5cm-3m|Coral reefs and deep water|Year-round|/marine-life/cephalopods',
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
