import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const Cephalopods = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description:
          'Intelligente ongewervelden zoals octopussen en inktvissen, meesters in camouflage en probleemoplossing.',
        size: '5cm-3m afhankelijk van soort',
        habitat: 'Koraalriffen, zandvlaktes, rotszones, diep water',
        conservationStatus: 'Niet geëvalueerd',
        diet: 'Vis, schaaldieren, weekdieren, andere koppotigen',
        behavior:
          'Meesters in camouflage; veranderen in seconden van kleur en textuur, leven vaak solitair en jagen vooral in de schemer of nacht.',
        bestTime: 'Hele jaar, actiever bij zonsopkomst en zonsondergang',
        frequency: 'Regelmatige waarnemingen met geduld en macrolens',
        detailedDescription:
          'Koppotigen behoren tot de meest fascinerende ongewervelden in de wateren van Koh Tao. Met hun hoge intelligentie, probleemoplossend vermogen en directe camouflage horen ze bij de meest geavanceerde ongewervelde dieren op aarde. Hun vermogen om binnen milliseconden kleur, patroon en textuur te veranderen is indrukwekkend om te zien. Zowel octopussen als inktvissen zijn favoriete onderwerpen voor duikers en macrofotografen en bieden eindeloze mogelijkheden voor observatie en fotografie.',
        interestingFacts: [
          'Koppotigen hebben drie harten: twee voor de kieuwen en één voor het lichaam',
          'Hun bloed is blauw door koperhoudend hemocyanine in plaats van ijzerhoudend hemoglobine',
          'Ze behoren tot de intelligentste ongewervelden en kunnen complexe problemen oplossen',
          'Sommige soorten veranderen in milliseconden van kleur en patroon via chromatoforen',
          'Verschillende soorten zijn sterk giftig, waaronder de blauwgeringde octopus',
          'Ze kunnen zich door elke opening wringen die groter is dan hun harde snavel',
        ],
        photographyTips: [
          'Gebruik macrolenzen (30-60mm) voor detailopnames van ogen en zuignappen',
          'Fotografeer in de schemer wanneer koppotigen het actiefst zijn',
          'Blijf zeer rustig en stil, plotselinge bewegingen jagen ze weg',
          'Maak close-ups van ogen en zuignapdetails',
          'Gebruik goede belichting om kleurverandering zichtbaar te maken',
          "Handmatige focus is essentieel voor scherpe macrofoto's",
        ],
      }
    : {
        description:
          'Intelligent invertebrates such as octopuses and squids, masters of camouflage and problem-solving.',
        size: '5cm-3m depending on species',
        habitat: 'Coral reefs, sandy flats, rocky zones, deep water',
        conservationStatus: 'Not evaluated',
        diet: 'Fish, crustaceans, mollusks, other cephalopods',
        behavior:
          'Masters of camouflage that can change color and texture in seconds; often solitary and mostly hunting at dusk or night.',
        bestTime: 'Year-round, more active at sunrise and sunset',
        frequency: 'Regular sightings with patience and a macro lens',
        detailedDescription:
          'Cephalopods are among the most fascinating invertebrates in Koh Tao waters. With their high intelligence, problem-solving ability, and instant camouflage, they are among the most advanced invertebrates on Earth. Their ability to change color, pattern, and texture within milliseconds is remarkable to observe. Both octopuses and squids are favorite subjects for divers and macro photographers, offering endless opportunities for observation and photography.',
        interestingFacts: [
          'Cephalopods have three hearts: two for the gills and one for the body',
          'Their blood is blue due to copper-based hemocyanin rather than iron-based hemoglobin',
          'They are among the most intelligent invertebrates and can solve complex problems',
          'Some species change color and pattern within milliseconds using chromatophores',
          'Several species are highly venomous, including the blue-ringed octopus',
          'They can squeeze through any opening larger than their hard beak',
        ],
        photographyTips: [
          'Use macro lenses (30-60mm) for close detail shots of eyes and suckers',
          'Photograph at dusk when cephalopods are most active',
          'Stay very calm and still; sudden movements will scare them away',
          'Capture close-ups of eye details and suckers',
          'Use solid lighting to reveal color changes',
          'Manual focus is essential for sharp macro images',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Koppotigen' : 'Cephalopods'}
      scientificName={isDutch ? 'Diverse soorten (Cephalopoda)' : 'Various species (Cephalopoda)'}
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
      secondaryImage="/images/squid.png"
      images={[
        "/images/cephalopods.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Cephalopods;