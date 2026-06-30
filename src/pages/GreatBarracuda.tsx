import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const GreatBarracuda = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description:
          'Indrukwekkende roofvis met messcherpe tanden, bekend om zijn gestroomlijnde zilveren lichaam en jacht in groepen.',
        size: 'Tot 2m (6,5ft), 50kg',
        habitat: 'Koraalriffen, open water, wrakken',
        conservationStatus: 'Niet bedreigd',
        diet: 'Vis, inktvis, schaaldieren',
        behavior:
          'Hinderlaagjager die met snelheid en scherpe tanden in groepen jaagt. Vaak gezien rond pinnacles en wrakken.',
        bestTime: 'Hele jaar',
        frequency: 'Veelvoorkomend op diepere duiksites',
        detailedDescription:
          'De grote barracuda is een van de meest indrukwekkende roofvissen in de wateren rond Koh Tao, met een strak zilverkleurig lichaam en opvallende rijen scherpe tanden. Deze krachtige jagers kunnen in korte sprints snelheden tot 40 km/u halen. Hoewel ze intimiderend ogen, zijn barracuda\'s doorgaans niet agressief naar duikers tenzij ze worden geprovoceerd. Je ziet ze vaak op diepere locaties zoals Sail Rock en Chumphon Pinnacle, waar ze in scholen rond granieten formaties jagen. Hun aanwezigheid wijst op een gezond ecosysteem met voldoende prooisoorten.',
        interestingFacts: [
          "Barracuda's kunnen snelheden tot 40 km/u halen",
          'Ze hebben twee rijen messcherpe tanden',
          'Ondanks hun uiterlijk vallen ze zelden mensen aan',
          'Ze kunnen tot 2 meter lang worden',
          "Barracuda's jagen in groepen voor meer succes",
          'Ze hebben uitstekend zicht en kunnen gepolariseerd licht waarnemen',
        ],
        photographyTips: [
          'Fotografeer op veilige afstand om ze niet te laten schrikken',
          'Leg hun gestroomlijnde profiel en scherpe tanden vast',
          'Gebruik snelle sluitertijden om hun bewegingen te bevriezen',
          'Probeer groepsgedrag mee te nemen in je beelden',
          'Fotografeer tegen blauw water voor een sterk effect',
          'Blijf alert op je omgeving wanneer ze in de buurt zijn',
        ],
      }
    : {
        description:
          'An impressive predator with razor-sharp teeth, known for its streamlined silver body and group hunting behavior.',
        size: 'Up to 2m (6.5ft), 50kg',
        habitat: 'Coral reefs, open water, wrecks',
        conservationStatus: 'Least concern',
        diet: 'Fish, squid, crustaceans',
        behavior:
          'An ambush predator that hunts in groups using speed and sharp teeth. Often seen around pinnacles and wrecks.',
        bestTime: 'Year-round',
        frequency: 'Common at deeper dive sites',
        detailedDescription:
          'The great barracuda is one of the most impressive predatory fish in Koh Tao waters, with a sleek silver body and striking rows of sharp teeth. These powerful hunters can reach sprint speeds of up to 40 km/h. Although they look intimidating, barracudas are generally not aggressive toward divers unless provoked. They are often seen at deeper locations such as Sail Rock and Chumphon Pinnacle, where they hunt in schools around granite formations. Their presence indicates a healthy ecosystem with abundant prey.',
        interestingFacts: [
          'Barracudas can reach speeds up to 40 km/h',
          'They have two rows of razor-sharp teeth',
          'Despite their appearance, attacks on humans are rare',
          'They can grow up to 2 meters long',
          'Barracudas hunt in groups for higher success',
          'They have excellent vision and can detect polarized light',
        ],
        photographyTips: [
          'Photograph from a safe distance to avoid startling them',
          'Capture their streamlined profile and sharp teeth',
          'Use faster shutter speeds to freeze movement',
          'Try to include schooling behavior in your shots',
          'Shoot against open blue water for strong contrast',
          'Stay aware of your surroundings when they are nearby',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Grote Barracuda' : 'Great barracuda'}
      scientificName="Sphyraena barracuda"
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
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/great-barracuda.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreatBarracuda;