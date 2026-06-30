import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Nudibranchs = () => {
  return (
    <MarineLifeDetail
      name="Nudibranchs"
      scientificName="Various species (Gastropoda)"
      description="Colorful sea slugs with incredible patterns and shapes, absolutely perfect for macro photography."
      size="1-15cm depending on species"
      habitat="Coral reefs, sand flats, rocky areas"
      conservationStatus="Not Evaluated"
      diet="Sponges, hydroids, ascidians, other nudibranchs"
      behavior="Slow-moving grazers, feed on specific prey items, some display warning colors for toxicity, hermaphroditic."
      bestTime="Year-round, especially after strong currents"
      frequency="Common in suitable habitats with patient observation"
      detailedDescription="Nudibranchs are living works of art found throughout Koh Tao's reefs. These shell-less mollusks display incredible diversity of colors, patterns, and body shapes. With hundreds of different species ranging from tiny finger-sized to large palm-sized specimens, nudibranchs offer endless fascination for macro photographers and nature enthusiasts. Their incredible variety and willingness to pose for photographs make them favorite subjects for underwater photography."
      interestingFacts={[
        "Nudibranchs come in hundreds of species with stunning color variations",
        "Many species are toxic or venomous, and their bright colors advertise this danger",
        "Most nudibranchs are hermaphrodites, having both male and female organs",
        "They feed on specific prey items - some eat sponges, others eat hydroids",
        "They are excellent macro photography subjects due to their beauty and variety",
        "New nudibranch species are still being discovered in tropical waters"
      ]}
      photographyTips={[
        "Use macro lenses (30-60mm) to fill the frame with detail",
        "Manual focus is essential for achieving sharpness on small subjects",
        "Use focus lights to illuminate and highlight details",
        "Shoot macro to show incredible detail of gills and tentacles",
        "Be patient and wait for them to move into ideal positions",
        "Proper lighting brings out the incredible colors and patterns"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/nudi.png"
      images={[
        "/images/headnudi.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Nudibranchs;