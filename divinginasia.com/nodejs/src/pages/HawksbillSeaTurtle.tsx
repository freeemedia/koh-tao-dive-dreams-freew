import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const HawksbillSeaTurtle = () => {
  return (
    <MarineLifeDetail
      name="Hawksbill Sea Turtle"
      scientificName="Eretmochelys imbricata"
      description="Beautiful sea turtles with distinctive beak-like mouths, known for eating sponges and having colorful shells."
      size="Up to 1m (3.3ft), 50-80kg"
      habitat="Coral reefs, rocky areas, coastal waters"
      conservationStatus="Critically Endangered"
      diet="Sponges, sea squirts, jellyfish"
      behavior="Specialized sponge-eaters that help control sponge populations on reefs. Very shy and elusive compared to other turtles."
      bestTime="Year-round"
      frequency="Less common than green turtles"
      detailedDescription="The hawksbill sea turtle is a critically endangered species with a distinctive beak-like mouth perfectly adapted for reaching into crevices to extract sponges and other small marine organisms. Their beautiful shells feature overlapping scales that create a mosaic pattern, and they play an important role in maintaining coral reef ecosystems by controlling sponge populations. Hawksbills are much more elusive than green sea turtles and require careful, patient observation. Their presence indicates a healthy coral reef ecosystem, making every sighting particularly special for divers and snorkelers."
      interestingFacts={[
        "Hawksbills have a beak-like mouth for eating sponges",
        "Their shells are used to make tortoiseshell items (now illegal)",
        "They can stay underwater for up to 35 minutes",
        "Females nest every 2-3 years, laying 3-5 clutches per season",
        "They have the most beautiful shell pattern of all sea turtles",
        "Hawksbills are the most tropical of all sea turtle species"
      ]}
      photographyTips={[
        "Use extreme caution - they are very shy",
        "Shoot from a distance to avoid disturbing them",
        "Include the distinctive beak in your photos",
        "Capture the beautiful shell pattern",
        "Use natural light and long lenses if possible",
        "Be prepared for quick, sudden movements"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/hawksbill-sea-turtle.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default HawksbillSeaTurtle;