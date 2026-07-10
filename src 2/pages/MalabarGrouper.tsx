import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const MalabarGrouper = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description:
          'Grote roofvis uit de tandbaarsfamilie die op dieper water voorkomt, bekend om zijn indrukwekkende formaat en hinderlaagjacht.',
        size: 'Tot 2,3m (7,5ft), 100kg',
        habitat: 'Diepe riffen, rotsformaties, pinnacles',
        conservationStatus: 'Niet geëvalueerd',
        diet: 'Vis, schaaldieren, koppotigen',
        behavior:
          'Hinderlaagjager die zich verschuilt in grotten en spleten en razendsnel toeslaat. Leeft solitair of in paren en gebruikt krachtige zuigvoeding.',
        bestTime: 'Hele jaar',
        frequency: 'Veelvoorkomend op diepere duiklocaties',
        detailedDescription:
          'De Malabar tandbaars is een van de grootste en meest indrukwekkende tandbaarssoorten op de diepere duiksites van Koh Tao. Deze krachtige roofvis kan prooien snel uit koraalspleten trekken door sterke zuigkracht. Ze zijn relatief schuw en trekken zich vaak terug in grotten wanneer duikers naderen, maar met geduld zijn mooie waarnemingen mogelijk. Door hun formaat en jachtgedrag zijn ze een hoogtepunt van diep rifduiken.',
        interestingFacts: [
          'Malabar tandbaarzen kunnen tot 100 kg wegen en 2,3 meter lang worden',
          'Ze gebruiken zuigvoeding om prooi snel uit koraalspleten te halen',
          'In het wild kunnen ze meer dan 40 jaar oud worden',
          'Ze zijn protogyne hermafrodieten: vrouwtjes kunnen mannetjes worden',
          'Ze komen voor in de hele Indo-Pacifische regio in geschikt habitat',
          'Als toppredator spelen ze een belangrijke rol in de rifbalans',
        ],
        photographyTips: [
          'Gebruik groothoek om hun formaat en diepte goed te tonen',
          'Fotografeer van onderen om kracht en aanwezigheid te benadrukken',
          'Beweeg langzaam en pauzeer regelmatig om ze niet te laten schrikken',
          'Neem rifcontext en grotstructuren mee in je compositie',
          'Probeer zwemmend gedrag en jachtmomenten vast te leggen',
          'Respecteer altijd hun ruimte en houd veilige afstand',
        ],
      }
    : {
        description:
          'A large predatory grouper found in deeper water, known for its impressive size and ambush hunting behavior.',
        size: 'Up to 2.3m (7.5ft), 100kg',
        habitat: 'Deep reefs, rocky formations, pinnacles',
        conservationStatus: 'Not evaluated',
        diet: 'Fish, crustaceans, cephalopods',
        behavior:
          'An ambush hunter that hides in caves and crevices before striking quickly. Lives solitary or in pairs and uses powerful suction feeding.',
        bestTime: 'Year-round',
        frequency: 'Common at deeper dive sites',
        detailedDescription:
          'The Malabar grouper is one of the largest and most impressive grouper species on Koh Tao’s deeper dive sites. This powerful predator can pull prey from coral crevices using strong suction. They are relatively shy and often retreat into caves as divers approach, but patient observation can be very rewarding. Their size and hunting behavior make them a highlight of deep reef dives.',
        interestingFacts: [
          'Malabar groupers can weigh up to 100 kg and grow to 2.3 meters',
          'They use suction feeding to extract prey from coral crevices',
          'In the wild, they can live for more than 40 years',
          'They are protogynous hermaphrodites: females can become males',
          'They occur throughout the Indo-Pacific in suitable habitats',
          'As top predators, they play an important role in reef balance',
        ],
        photographyTips: [
          'Use wide-angle to show their size and depth setting',
          'Shoot from below to emphasize power and presence',
          'Move slowly and pause often to avoid startling them',
          'Include reef context and cave structure in your composition',
          'Try to capture swimming behavior and hunting moments',
          'Always respect their space and keep a safe distance',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Malabar Tandbaars' : 'Malabar grouper'}
      scientificName="Epinephelus malabaricus"
      description={content.description}
      size={content.size}
      habitat={content.habitat}
      conservationStatus={content.conservationStatus}
      diet={content.diet}
      behavior={content.behavior}
      bestTime={content.bestTime}
      frequency={content.frequency}
      detailedDescription={content.detailedDescription}
      interestingFacts={content.interestingFacts}
      photographyTips={content.photographyTips}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/malabar-grouper.png"
      images={[
        "/images/groouper.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default MalabarGrouper;