import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) => (value ? value.split('\n').filter(Boolean) : []);

const GreenSeaTurtle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
    description: 'Plantenetende zeeschildpadden die op zeegras en algen grazen en zo gezonde mariëne ecosystemen helpen behouden.',
    size: 'Tot 1,5m (5ft), 150-200kg',
    habitat: 'Ondiep kustwater, zeegrasvelden, koraalriffen',
    conservation_status: 'Bedreigd',
    diet: 'Zeegras, algen, zeeplanten',
    behavior: 'Brengt het grootste deel van de tijd grazend door op zeegrasvelden en migreert over lange afstanden om te nestelen. Jonge schildpadden maken een gevaarlijke tocht van strand naar zee.',
    best_time: 'Hele jaar, vooral in ondiepe baaien',
    frequency: 'Veelvoorkomend in geschikte leefgebieden',
    detailed_description: 'De groene zeeschildpad is een van de meest voorkomende zeeschildpadden rond Koh Tao en speelt een belangrijke rol in de gezondheid van zeegrasvelden en koraalriffen. Deze rustige planteneters brengen hun dagen door met grazen op zeegras en algen, waardoor deze habitats in balans blijven. Volwassen dieren worden vaak gezien in ondiepe baaien en rifgebieden, terwijl jonge schildpadjes soms te zien zijn tijdens hun risicovolle tocht van het neststrand naar open zee. Beschermingsmaatregelen in Thailand hebben geholpen deze oeroude zeereizigers te beschermen, en een ontmoeting in het wild blijft altijd bijzonder.',
    interesting_facts: 'Groene zeeschildpadden kunnen tot 80 jaar oud worden\nZe zijn genoemd naar hun groene lichaamsvet, niet naar hun schild\nVrouwtjes keren terug naar het strand waar ze zelf uitkwamen om eieren te leggen\nTijdens rust kunnen ze tot 7 uur hun adem inhouden\nJonge schildpadjes moeten binnen 72 uur de zee bereiken om te overleven\nZe migreren duizenden kilometers tussen foerageer- en nestgebieden',
    photography_tips: 'Benader langzaam en vermijd plotselinge bewegingen\nFotografeer op waterniveau voor een sterke perspectiefwerking\nNeem ook de leefomgeving van de schildpad mee in je compositie\nGebruik natuurlijk licht en vermijd flits\nWees geduldig en laat de schildpad naar jou toe komen\nRespecteer hun ruimte en jaag ze niet op',
  } : {
    description: 'Herbivorous sea turtles that graze on seagrass and algae, helping maintain healthy marine ecosystems.',
    size: 'Up to 1.5m (5ft), 150-200kg',
    habitat: 'Shallow coastal waters, seagrass beds, coral reefs',
    conservation_status: 'Endangered',
    diet: 'Seagrass, algae, marine plants',
    behavior: 'Spends most of its time grazing on seagrass beds and migrates long distances to nest. Juveniles make a dangerous journey from beach to sea.',
    best_time: 'Year-round, especially in shallow bays',
    frequency: 'Common in suitable habitats',
    detailed_description: 'The green sea turtle is one of the most common sea turtle species around Koh Tao and plays an important role in the health of seagrass beds and coral reefs. These calm herbivores spend their days grazing on seagrass and algae, keeping these habitats in balance. Adults are often seen in shallow bays and reef areas, while hatchlings are sometimes observed during their risky journey from nesting beaches to open sea. Conservation efforts in Thailand have helped protect these ancient ocean travelers, and encountering one in the wild is always special.',
    interesting_facts: 'Green sea turtles can live up to 80 years\nThey are named after their green body fat, not their shell\nFemales return to the beach where they hatched to lay eggs\nWhile resting, they can hold their breath for up to 7 hours\nHatchlings must reach the ocean within 72 hours to survive\nThey migrate thousands of kilometers between feeding and nesting areas',
    photography_tips: 'Approach slowly and avoid sudden movements\nShoot at water level for a stronger perspective\nInclude the turtle’s habitat in your composition\nUse natural light and avoid flash\nBe patient and let the turtle come to you\nRespect their space and never chase them',
  };

  const { content } = usePageContent({ pageSlug: 'green-sea-turtle', locale, fallbackContent });

  return (
    <MarineLifeDetail
      name={isDutch ? 'Groene Zeeschildpad' : 'Green sea turtle'}
      scientificName={'Chelonia mydas'}
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
        "/images/green-sea-turtle.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreenSeaTurtle;
