import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BandedSeaKrait = () => {
  return (
    <MarineLifeDetail
      name="Banded Sea Krait"
      scientificName="Laticauda colubrina"
      description="Venomous sea snakes with distinctive black and blue bands, hunt fish and eels in shallow reef waters."
      size="Up to 1.5m (5ft)"
      habitat="Shallow reefs, seagrass beds, coral areas"
      conservationStatus="Not Evaluated"
      diet="Fish, eels, small crustaceans"
      behavior="Active hunters, come to surface to breathe air every 30-40 minutes, generally non-aggressive to divers, nocturnal hunters."
      bestTime="Year-round"
      frequency="Occasional sightings in shallow areas"
      detailedDescription="The banded sea krait is one of the most intriguing marine animals found in Koh Tao's shallow waters. Despite being one of the most venomous sea snakes in the world, they are generally docile and rarely bite unless provoked. Their distinctive black and blue banding makes them unmistakable, and watching them hunt in shallow reef areas is a unique experience. They must surface to breathe air every 30-40 minutes, creating opportunities for observation and photography."
      interestingFacts={[
        "Banded sea kraits are among the most venomous sea snakes in the world",
        "Despite their venom, they rarely bite humans unless severely provoked",
        "They must come to the surface to breathe air every 30-40 minutes",
        "They have a flattened tail that acts as a rudder for swimming",
        "They are ovoviviparous, meaning they give birth to live young",
        "Their coloration serves as warning to potential predators"
      ]}
      photographyTips={[
        "Maintain a safe distance of at least 1-2 meters at all times",
        "Use telephoto or macro lenses to photograph without getting too close",
        "Never touch or attempt to corner them",
        "Shoot head-on or from the side to capture their distinctive band pattern",
        "Be patient and still - let them move naturally",
        "Move slowly away if they appear to be approaching"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/snakecamo.png"
      images={[
        "/images/seasnake.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BandedSeaKrait;