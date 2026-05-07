import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) => (value ? value.split('\n').filter(Boolean) : []);

const HawksbillSeaTurtle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
    description: 'Prachtige zeeschildpad met een kenmerkende snavelvormige bek, bekend om het eten van sponzen en het kleurrijke schild.',
    size: 'Tot 1m (3,3ft), 50-80kg',
    habitat: 'Koraalriffen, rotsachtige zones, kustwater',
    conservation_status: 'Ernstig bedreigd',
    diet: 'Sponzen, zakpijpen, kwallen',
    behavior: 'Gespecialiseerde sponseter die sponspopulaties op riffen helpt reguleren. Veel schuwer en moeilijker te benaderen dan andere schildpadden.',
    best_time: 'Hele jaar',
    frequency: 'Minder vaak gezien dan groene zeeschildpadden',
    detailed_description: 'De karetschildpad is een ernstig bedreigde soort met een karakteristieke snavelbek die perfect is aangepast om sponzen en andere kleine organismen uit spleten te halen. Hun prachtige schild heeft overlappende schubben die een mozaïekpatroon vormen. Ze spelen een belangrijke rol in het rifecosysteem door sponsgroei te beperken. Karetschildpadden zijn veel schuwer dan groene zeeschildpadden en vereisen rustige, geduldige observatie. Hun aanwezigheid is een teken van een gezond rif, waardoor elke waarneming extra bijzonder is voor duikers en snorkelaars.',
    interesting_facts: 'Karetschildpadden hebben een snavelachtige bek voor het eten van sponzen\nHun schild werd vroeger gebruikt voor schildpadproducten (nu illegaal)\nZe kunnen tot 35 minuten onder water blijven\nVrouwtjes nestelen elke 2-3 jaar en leggen 3-5 legsels per seizoen\nZe hebben een van de mooiste schildpatronen van alle zeeschildpadden\nKaretschildpadden zijn de meest tropische van alle zeeschildpaddensoorten',
    photography_tips: "Ga uiterst voorzichtig te werk - ze zijn erg schuw\nFotografeer op afstand om verstoring te voorkomen\nNeem de karakteristieke snavel duidelijk op in je foto's\nLeg het mooie patroon van het schild vast\nGebruik natuurlijk licht en indien mogelijk een langere lens\nWees voorbereid op snelle, plotselinge bewegingen",
  } : {
    description: 'A beautiful sea turtle with a distinctive beak-shaped mouth, known for feeding on sponges and its colorful shell.',
    size: 'Up to 1m (3.3ft), 50-80kg',
    habitat: 'Coral reefs, rocky zones, coastal waters',
    conservation_status: 'Critically endangered',
    diet: 'Sponges, tunicates, jellyfish',
    behavior: 'A specialized sponge feeder that helps regulate sponge populations on reefs. Much shyer and harder to approach than other turtles.',
    best_time: 'Year-round',
    frequency: 'Seen less often than green sea turtles',
    detailed_description: 'The hawksbill sea turtle is a critically endangered species with a distinctive beak perfectly adapted to extracting sponges and small organisms from crevices. Their beautiful shell has overlapping scutes that create a mosaic pattern. They play an important role in reef ecosystems by controlling sponge growth. Hawksbills are much shyer than green turtles and require calm, patient observation. Their presence is a sign of a healthy reef, making every sighting especially memorable for divers and snorkelers.',
    interesting_facts: 'Hawksbills have a beak-like mouth adapted for eating sponges\nTheir shell was historically used for tortoiseshell products (now illegal)\nThey can stay underwater for up to 35 minutes\nFemales nest every 2-3 years and lay 3-5 clutches per season\nThey have one of the most beautiful shell patterns of all sea turtles\nHawksbills are the most tropical of all sea turtle species',
    photography_tips: 'Approach with extreme care - they are very shy\nPhotograph from a distance to avoid disturbance\nCapture the distinctive beak clearly in your shots\nHighlight the shell’s beautiful pattern\nUse natural light and, if possible, a longer lens\nBe ready for quick, sudden movements',
  };

  const { content } = usePageContent({ pageSlug: 'hawksbill-sea-turtle', locale, fallbackContent });

  return (
    <MarineLifeDetail
      name={isDutch ? 'Karetschildpad' : 'Hawksbill sea turtle'}
      scientificName={'Eretmochelys imbricata'}
      description={content.description}
      size={content.size}
      habitat={content.habitat}
      conservationStatus={content.conservation_status}
      diet={content.diet}
      behavior={content.behavior}
      bestTime={content.best_time}
      frequency={content.frequency}
      detailedDescription={content.detailed_description}
      interestingFacts={parseLines(content.interesting_facts)}
      photographyTips={parseLines(content.photography_tips)}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/hawksbill-sea-turtle.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default HawksbillSeaTurtle;
