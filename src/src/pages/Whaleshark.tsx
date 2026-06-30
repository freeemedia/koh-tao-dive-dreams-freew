import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const Whaleshark = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description: 'De grootste vis ter wereld: deze zachtaardige reuzen eten plankton en kunnen tot 12 meter lang worden.',
        size: 'Tot 12m (40ft), 21 ton',
        habitat: 'Tropische en warm-gematigde oceanen, kust- en open water',
        conservationStatus: 'Bedreigd',
        diet: 'Plankton, kleine vissen, inktvis',
        behavior:
          'Filtervoeder die met open bek zwemt, vaak begeleid door kleine vissen die parasieten verwijderen. Migreren over lange afstanden op zoek naar planktonbloei.',
        bestTime: 'November tot maart (droogseizoen)',
        frequency: 'Regelmatige waarnemingen, vooral op diepere duiklocaties',
        detailedDescription:
          'De walvishaai is de grootste vis ter wereld en een echte zachte reus van de oceaan. Ondanks hun enorme formaat zijn deze indrukwekkende dieren volledig ongevaarlijk voor mensen en leven ze uitsluitend van plankton en kleine mariene organismen. Koh Tao heeft het voorrecht om regelmatig walvishaaien te zien, vooral tijdens het droogseizoen wanneer planktonbloei deze filtervoeders aantrekt. Je ziet ze vaak op diepere duikplekken zoals Sail Rock en Chumphon Pinnacle, waar ze rustig door het blauwe water glijden en makkelijk herkenbaar zijn aan hun gevlekte patroon.',
        interestingFacts: [
          'Walvishaaien kunnen 70-100 jaar oud worden',
          'Ze zijn filtervoeders en kunnen tot 6 ton plankton per dag eten',
          'Elke walvishaai heeft een uniek vlekkenpatroon, zoals een vingerafdruk',
          'Ze kunnen tot 12 meter lang worden en meer dan 20 ton wegen',
          'Ondanks hun grootte zijn ze zachtaardig en geen bedreiging voor duikers',
          'Ze migreren duizenden kilometers op zoek naar voedsel',
        ],
        photographyTips: [
          'Gebruik een groothoeklens om hun enorme formaat vast te leggen',
          'Fotografeer van onderen en schuin opzij voor een dramatisch effect',
          'Wees geduldig en wacht tot ze rustig dichterbij komen',
          'Neem het vlekkenpatroon duidelijk op in je compositie',
          'Gebruik natuurlijk licht in plaats van flits om ze niet te laten schrikken',
          'Houd je drijfvermogen stabiel om stil in positie te blijven',
        ],
      }
    : {
        description: 'The largest fish in the world: these gentle giants feed on plankton and can grow up to 12 meters long.',
        size: 'Up to 12m (40ft), 21 tons',
        habitat: 'Tropical and warm-temperate oceans, coastal and offshore waters',
        conservationStatus: 'Endangered',
        diet: 'Plankton, small fish, squid',
        behavior:
          'A filter feeder that swims with its mouth open, often accompanied by small fish that remove parasites. They migrate long distances in search of plankton blooms.',
        bestTime: 'November to March (dry season)',
        frequency: 'Regular sightings, especially at deeper dive sites',
        detailedDescription:
          'The whale shark is the largest fish in the world and a true gentle giant of the ocean. Despite their huge size, these impressive animals are completely harmless to humans and feed only on plankton and small marine organisms. Koh Tao is fortunate to have regular whale shark sightings, especially during the dry season when plankton blooms attract these filter feeders. They are often seen at deeper dive spots such as Sail Rock and Chumphon Pinnacle, where they glide calmly through blue water and are easy to recognize by their spotted pattern.',
        interestingFacts: [
          'Whale sharks can live 70-100 years',
          'They are filter feeders and can consume up to 6 tons of plankton per day',
          'Each whale shark has a unique spot pattern, like a fingerprint',
          'They can grow up to 12 meters long and weigh over 20 tons',
          'Despite their size, they are gentle and not a threat to divers',
          'They migrate thousands of kilometers in search of food',
        ],
        photographyTips: [
          'Use a wide-angle lens to capture their huge size',
          'Shoot from below and slightly to the side for a dramatic perspective',
          'Be patient and wait for them to approach calmly',
          'Include the spot pattern clearly in your composition',
          'Use natural light instead of flash to avoid startling them',
          'Keep your buoyancy stable to hold position',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Walvishaai' : 'Whale shark'}
      scientificName="Rhincodon typus"
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
        "/images/marine-life-hero.webp",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Whaleshark;