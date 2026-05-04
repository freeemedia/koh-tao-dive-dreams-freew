import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Whaleshark = () => {
  return (
    <MarineLifeDetail
      name="Whaleshark"
      scientificName="Rhincodon typus"
      description="The world's largest fish, these gentle giants are plankton-eating marvels that can grow up to 12 meters long."
      size="Up to 12m (40ft), 21 tonnes"
      habitat="Tropical and warm temperate oceans, coastal and offshore waters"
      conservationStatus="Endangered"
      diet="Plankton, small fish, squid"
      behavior="Filter feeder that swims with mouth open, often accompanied by smaller fish that clean parasites. Migrates long distances following plankton blooms."
      bestTime="November to March (dry season)"
      frequency="Regular sightings, especially at deeper dive sites"
      detailedDescription="The whaleshark is the largest fish in the world and a true gentle giant of the ocean. Despite their enormous size, these magnificent creatures are completely harmless to humans, feeding exclusively on plankton and small marine organisms. Koh Tao is privileged to have regular whaleshark sightings, particularly during the dry season when plankton blooms attract these filter-feeding behemoths to our waters. They can often be seen at deeper dive sites like Sail Rock and Chumphon Pinnacle, where they cruise majestically through the blue, their spotted patterns making them easily identifiable."
      interestingFacts={[
        "Whalesharks can live up to 70-100 years",
        "They are filter feeders, consuming up to 6 tonnes of plankton daily",
        "Each whaleshark has a unique spot pattern, like a fingerprint",
        "They can grow up to 12 meters long and weigh over 20 tonnes",
        "Despite their size, they are gentle and pose no threat to divers",
        "They migrate thousands of kilometers following food sources"
      ]}
      photographyTips={[
        "Use a wide-angle lens to capture their enormous size",
        "Shoot from below and to the side for dramatic effect",
        "Be patient and wait for them to approach slowly",
        "Include the spot pattern in your composition",
        "Use available light rather than flash to avoid startling them",
        "Practice buoyancy control to maintain position quietly"
      ]}
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