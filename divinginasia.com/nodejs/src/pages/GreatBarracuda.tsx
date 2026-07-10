import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const GreatBarracuda = () => {
  return (
    <MarineLifeDetail
      name="Great Barracuda"
      scientificName="Sphyraena barracuda"
      description="Impressive predatory fish with razor-sharp teeth, known for their sleek silver bodies and hunting in packs."
      size="Up to 2m (6.5ft), 50kg"
      habitat="Coral reefs, offshore waters, wrecks"
      conservationStatus="Least Concern"
      diet="Fish, squid, crustaceans"
      behavior="Ambush predators that hunt in packs, using speed and sharp teeth. Often seen around pinnacles and wrecks."
      bestTime="Year-round"
      frequency="Common at deeper sites"
      detailedDescription="The great barracuda is one of the most impressive predatory fish in Koh Tao's waters, with their sleek silver bodies and intimidating rows of razor-sharp teeth. These powerful hunters can reach speeds of up to 40km/h in short bursts, making them formidable predators. While they look menacing, barracuda are generally not aggressive towards divers unless provoked. They are frequently seen at deeper dive sites like Sail Rock and Chumphon Pinnacle, where they hunt in packs around the granite formations. Their presence indicates a healthy ecosystem with abundant prey species."
      interestingFacts={[
        "Barracuda can swim at speeds up to 40km/h",
        "They have two rows of razor-sharp teeth",
        "Despite their appearance, they rarely attack humans",
        "They can grow up to 2 meters long",
        "Barracuda hunt in packs for better success",
        "They have excellent eyesight and can see polarized light"
      ]}
      photographyTips={[
        "Shoot from a safe distance to avoid startling them",
        "Capture their sleek profile and sharp teeth",
        "Use fast shutter speeds to freeze their quick movements",
        "Include the pack behavior in your shots",
        "Shoot against blue water for dramatic effect",
        "Be aware of your surroundings when they're present"
      ]}
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