import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BeardedScorpionFish = () => {
  return (
    <MarineLifeDetail
      name="Bearded Scorpion Fish"
      scientificName="Scorpaenopsis barbata"
      description="Master cryptic fish with venomous spines, perfectly camouflaged as coral and sponges."
      size="Up to 30cm (12 inches)"
      habitat="Coral reefs, rocky areas, deep reef"
      conservationStatus="Not Evaluated"
      diet="Fish, crustaceans"
      behavior="Ambush predator, stays motionless for hours, uses incredible camouflage to hunt, venomous spines for defense."
      bestTime="Year-round, more active at night"
      frequency="Uncommon, requires careful observation and expert guides"
      detailedDescription="One of the most difficult fish to spot in Koh Tao's waters, the bearded scorpion fish is a master of disguise. It perfectly mimics the surrounding coral, sponges, and reef structure, remaining motionless for extended periods as it waits for unsuspecting prey to pass within striking distance. Finding these cryptic predators requires patience, careful observation, and an experienced guide. Their venomous spines serve as a defense mechanism against predators."
      interestingFacts={[
        "Bearded scorpion fish have venomous spines they use for defense",
        "They are so cryptic that they can stay in the same location for days",
        "They can mimic multiple surface textures and colors simultaneously",
        "They have very slow metabolisms and move infrequently",
        "They are nearly invisible to untrained eyes",
        "Their camouflage is considered one of the best in the reef ecosystem"
      ]}
      photographyTips={[
        "Use macro lenses to photograph after locating with dive guide's help",
        "Scan reef surfaces carefully for subtle color and texture changes",
        "Use focus lights to illuminate details when photographing",
        "Be ready to shoot quickly when spotted as they may move away",
        "Include surrounding coral and context in your composition",
        "Extreme patience and a good dive guide are essential for success"
      ]}
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