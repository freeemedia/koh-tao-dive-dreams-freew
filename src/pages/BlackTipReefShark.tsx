import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) => (value ? value.split('\n').filter(Boolean) : []);

const BlackTipReefShark = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
    description: 'Veelvoorkomende rifhaai met herkenbare zwarte puntjes op de vinnen, belangrijk voor een gezond koraalrifecosysteem.',
    size: 'Tot 2m (6,5ft), 13kg',
    habitat: 'Koraalriffen, ondiep kustwater',
    conservation_status: 'Bijna bedreigd',
    diet: 'Vis, schaaldieren, koppotigen',
    behavior: "Actieve jager overdag, rust 's nachts in grotten. Speelt een belangrijke rol in het reguleren van vispopulaties op riffen.",
    best_time: 'Hele jaar, vooral tijdens het voortplantingsseizoen',
    frequency: 'Zeer veelvoorkomend op ondiepe riffen',
    detailed_description: 'De zwartpuntrifhaai is een van de meest geziene haaisoorten op de riffen van Koh Tao en is cruciaal voor de ecologische balans. De soort is genoemd naar de zwarte uiteinden van de vinnen. Overdag patrouilleren ze actief over het rif en rusten ze soms in kleine grotten. Ze zijn doorgaans niet agressief richting mensen en zorgen voor een spannende maar veilige duikervaring. Tijdens het voortplantingsseizoen zijn jonge haaien extra vaak te zien, wat mooie fotokansen geeft voor duikers en snorkelaars.',
    interesting_facts: 'Zwartpuntrifhaaien kunnen tot 12 jaar oud worden\nZe krijgen levende jongen (levendbarend)\nVrouwtjes kunnen tot 4 jongen per worp krijgen\nZe zijn vooral overdag actief\nOndanks hun naam zijn ze meestal ongevaarlijk voor mensen\nZe helpen vispopulaties op koraalriffen in balans te houden',
    photography_tips: 'Benader langzaam en rustig\nFotografeer van onderen voor krachtige vinbeelden\nZorg dat de zwarte vinpunten duidelijk in beeld zijn\nGebruik beschikbaar licht voor natuurlijke kleuren\nWees geduldig en laat de haai naar jou toe komen\nLeg zowel zwemmend als rustend gedrag vast',
  } : {
    description: 'A common reef shark with distinctive black fin tips, important for maintaining a healthy coral reef ecosystem.',
    size: 'Up to 2m (6.5ft), 13kg',
    habitat: 'Coral reefs, shallow coastal waters',
    conservation_status: 'Near threatened',
    diet: 'Fish, crustaceans, cephalopods',
    behavior: 'An active daytime hunter that rests in caves at night. Plays an important role in regulating reef fish populations.',
    best_time: 'Year-round, especially during breeding season',
    frequency: 'Very common on shallow reefs',
    detailed_description: 'The blacktip reef shark is one of the most commonly seen shark species on Koh Tao reefs and is crucial for ecological balance. The species is named for the black tips on its fins. During the day they actively patrol the reef and sometimes rest in small caves. They are generally not aggressive toward humans and offer an exciting yet safe diving experience. During breeding season, juveniles are seen more frequently, creating great opportunities for divers and snorkelers.',
    interesting_facts: 'Blacktip reef sharks can live up to 12 years\nThey give birth to live young (viviparous)\nFemales can have up to 4 pups per litter\nThey are mainly active during the day\nDespite their name, they are usually harmless to humans\nThey help keep reef fish populations in balance',
    photography_tips: 'Approach slowly and calmly\nShoot from below for powerful fin silhouettes\nMake sure the black fin tips are clearly visible\nUse ambient light for natural colors\nBe patient and let the shark come to you\nCapture both swimming and resting behavior',
  };

  const { content } = usePageContent({ pageSlug: 'blacktip-reef-shark', locale, fallbackContent });

  return (
    <MarineLifeDetail
      name={isDutch ? 'Zwartpuntrifhaai' : 'Blacktip reef shark'}
      scientificName={'Carcharhinus melanopterus'}
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
        "/images/blacktip-reef-shark.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BlackTipReefShark;
