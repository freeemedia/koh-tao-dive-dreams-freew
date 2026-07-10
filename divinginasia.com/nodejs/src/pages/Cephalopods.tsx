import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Cephalopods = () => {
  return (
    <MarineLifeDetail
      name="Cephalopods"
      scientificName="Various species (Cephalopoda)"
      description="Intelligent invertebrates including octopuses and squid, masters of camouflage and problem-solving with incredible abilities."
      size="5cm-3m depending on species"
      habitat="Coral reefs, sand flats, rocky areas, deep water"
      conservationStatus="Not Evaluated"
      diet="Fish, crustaceans, mollusks, other cephalopods"
      behavior="Masters of camouflage, change color and texture in seconds, solitary and highly intelligent, nocturnal hunters."
      bestTime="Year-round, dawn and dusk more active"
      frequency="Regular sightings with patience and macro lens"
      detailedDescription="Cephalopods are among the most fascinating invertebrates found in Koh Tao's waters. With their incredible intelligence, problem-solving abilities, and instant camouflage techniques, they represent some of the most advanced invertebrate life on Earth. Their ability to change color, pattern, and texture in milliseconds is a marvel to witness. Both octopuses and squid are favorite subjects for divers and macro photographers, offering endless opportunities for observation and photography."
      interestingFacts={[
        "Cephalopods have three hearts - two pump blood to the gills, one to the body",
        "Their blood is blue due to copper-based hemocyanin instead of iron-based hemoglobin",
        "They are among the most intelligent invertebrates, capable of solving complex problems",
        "Some species can change color and pattern in milliseconds through chromatophore cells",
        "Several species are highly venomous, including the blue-ringed octopus",
        "They can squeeze through any opening larger than their hard beak"
      ]}
      photographyTips={[
        "Use macro lenses (30-60mm) for detailed shots of eyes and suckers",
        "Shoot during dawn and dusk when cephalopods are most active",
        "Be extremely patient and still - sudden movements scare them away",
        "Capture close-ups of the eye and sucker details",
        "Use proper lighting to show off their incredible color-changing abilities",
        "Manual focus is essential for sharp macro photography"
      ]}
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