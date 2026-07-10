import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const BeardedScorpionFish = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description: 'Meester in camouflage met giftige stekels, perfect vermomd als koraal en spons.',
        size: 'Tot 30cm (12 inch)',
        habitat: 'Koraalriffen, rotsachtige zones, diep rif',
        conservationStatus: 'Niet geëvalueerd',
        diet: 'Vis, schaaldieren',
        behavior:
          'Hinderlaagjager die urenlang roerloos blijft; gebruikt extreme camouflage om te jagen en giftige stekels ter verdediging.',
        bestTime: 'Hele jaar, actiever in de nacht',
        frequency: 'Niet heel algemeen, vraagt nauwkeurige observatie en ervaren gidsen',
        detailedDescription:
          'De baardschorpioenvis is een van de lastigst te vinden vissen in de wateren rond Koh Tao en een echte vermommingsspecialist. Hij lijkt vaak perfect op omliggend koraal, spons en rifstructuur en blijft lange tijd stil liggen tot een prooi binnen bereik komt. Het vinden van deze cryptische roofvis vraagt geduld, goed kijkwerk en een ervaren gids. De giftige stekels dienen als bescherming tegen predatoren.',
        interestingFacts: [
          'Baardschorpioenvissen hebben giftige stekels voor verdediging',
          'Ze zijn zo cryptisch dat ze dagenlang op dezelfde plek kunnen blijven',
          'Ze kunnen meerdere texturen en kleuren tegelijk nabootsen',
          'Ze hebben een traag metabolisme en bewegen weinig',
          'Voor ongetrainde ogen zijn ze bijna onzichtbaar',
          'Hun camouflage behoort tot de beste in het rifecosysteem',
        ],
        photographyTips: [
          'Gebruik een macrolens en laat je helpen door een gids om ze eerst te vinden',
          'Scan rifoppervlakken zorgvuldig op subtiele kleur- en textuurverschillen',
          'Gebruik focuslicht om details zichtbaar te maken',
          'Wees klaar om snel te fotograferen zodra je er één ziet',
          'Neem de omliggende rifcontext mee in je compositie',
          'Veel geduld en een goede duikgids zijn essentieel',
        ],
      }
    : {
        description:
          'A camouflage master with venomous spines, perfectly disguised as coral and sponge.',
        size: 'Up to 30cm (12 inches)',
        habitat: 'Coral reefs, rocky zones, deeper reef',
        conservationStatus: 'Not evaluated',
        diet: 'Fish, crustaceans',
        behavior:
          'An ambush predator that can remain motionless for hours; uses extreme camouflage for hunting and venomous spines for defense.',
        bestTime: 'Year-round, more active at night',
        frequency: 'Not very common; requires careful observation and experienced guides',
        detailedDescription:
          'The bearded scorpionfish is one of the hardest fish to spot in Koh Tao waters and a true disguise specialist. It often blends perfectly with surrounding coral, sponge, and reef structure and remains still for long periods until prey comes within range. Finding this cryptic predator requires patience, careful observation, and an experienced guide. Its venomous spines provide protection against predators.',
        interestingFacts: [
          'Bearded scorpionfish have venomous defensive spines',
          'They are so cryptic they can stay in the same spot for days',
          'They can mimic multiple textures and colors at once',
          'They have a slow metabolism and move very little',
          'To untrained eyes, they are almost invisible',
          'Their camouflage is among the best in reef ecosystems',
        ],
        photographyTips: [
          'Use a macro lens and ask a guide to help locate them first',
          'Scan reef surfaces carefully for subtle color and texture differences',
          'Use a focus light to reveal detail',
          'Be ready to shoot quickly once you find one',
          'Include surrounding reef context in your composition',
          'Patience and a skilled dive guide are essential',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Baardschorpioenvis' : 'Bearded scorpionfish'}
      scientificName="Scorpaenopsis barbata"
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
      secondaryImage="/images/sscorpio2.png"
      images={[
        "/images/bearded-scorpionfish.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BeardedScorpionFish;