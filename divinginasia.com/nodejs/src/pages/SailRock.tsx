import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const SailRock = () => {
  return (
    <DiveSiteDetail
      name="Sail Rock"
      description="Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda."
      depth="18-40m"
      difficulty="Advanced"
      location="40 minutes offshore"
      highlights={["Whalesharks", "Giant Barracuda", "Malabar Grouper", "Sailfish"]}
      detailedDescription="Sail Rock is widely regarded as the Gulf of Thailand's premier scuba diving site. Located 40 minutes offshore, this impressive granite pinnacle rises from the deep blue ocean to within 18 meters of the surface. The site is famous for its 'Chimney' - a distinctive vertical swim-through that creates a natural vortex attracting large pelagic fish. Whalesharks are frequently sighted cruising the depths, and the site hosts massive schools of snapper, fusiliers, and chevron barracuda. Eagle rays and sailfish are also common visitors, making this a truly spectacular deep diving experience."
      bestTime="Year-round, best in dry season (December-May)"
      current="Moderate to strong, can be challenging"
      visibility="20-30m, excellent clarity"
      marineLife={[
        "Whalesharks (frequent sightings)",
        "Giant Barracuda schools",
        "Malabar Grouper",
        "Sailfish and Eagle Rays",
        "Chevron Barracuda",
        "Large Snapper and Fusilier schools",
        "King Mackerel",
        "Brown Marbled Grouper"
      ]}
      tips={[
        "Advanced certification required - this is a deep dive site",
        "Strong current awareness essential - stay with your guide",
        "Use a dive computer for accurate depth and time monitoring",
        "Whalesharks are most active in the morning - early boat departure recommended",
        "Bring a wide-angle lens for photographing large pelagics",
        "Conserve air due to depth and potential current",
        "Perfect for deep specialty course dives"
      ]}
      images={[
        "/images/sailrock.webp", // Unique main image for Sail Rock
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default SailRock;