import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BlackTipReefShark = () => {
  return (
    <MarineLifeDetail
      name="Black Tip Reef Shark"
      scientificName="Carcharhinus melanopterus"
      description="Common reef sharks with distinctive black tips on their fins, important for maintaining healthy coral reef ecosystems."
      size="Up to 2m (6.5ft), 13kg"
      habitat="Coral reefs, shallow coastal waters"
      conservationStatus="Near Threatened"
      diet="Fish, crustaceans, cephalopods"
      behavior="Active hunters during the day, rest in caves at night. Play important role in controlling fish populations on reefs."
      bestTime="Year-round, especially during breeding season"
      frequency="Very common on shallow reefs"
      detailedDescription="The black tip reef shark is one of the most commonly encountered sharks in Koh Tao's coral reefs and plays a vital role in maintaining ecosystem balance. Named for the distinctive black tips on their fins, these sharks are active hunters during the day and can often be seen patrolling the reefs or resting in small caves. They are generally not aggressive towards humans and provide an exciting but safe diving experience. During breeding season, young sharks are particularly abundant, offering amazing photo opportunities for both divers and snorkelers."
      interestingFacts={[
        "Black tip reef sharks can live up to 12 years",
        "They give birth to live young (viviparous)",
        "Females can have up to 4 pups per litter",
        "They are most active during the day",
        "Despite their name, they are generally harmless to humans",
        "They help control fish populations on coral reefs"
      ]}
      photographyTips={[
        "Approach slowly and calmly",
        "Shoot from below for dramatic fin shots",
        "Include the black fin tips in your composition",
        "Use available light for natural colors",
        "Be patient and let them approach you",
        "Capture both swimming and resting behaviors"
      ]}
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