import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const JapaneseGardens = () => {
  return (
    <DiveSiteDetail
      name="Japanese Gardens"
      description="Diverse coral reefs with colorful marine life and swim-throughs."
      depth="12-25m"
      difficulty="Intermediate"
      location="Near Koh Nang Yuan"
      highlights={["Pink Tailed Triggerfish", "Ocellated Eagle Rays", "Colorful Corals", "Marbled Octopus"]}
      detailedDescription="Japanese Gardens is located near Koh Nang Yuan and offers one of the most diverse coral reef ecosystems in Thailand. This intermediate dive site features a stunning variety of coral formations, from colorful soft corals to massive gorgonians. The site is renowned for its healthy coral coverage and abundant marine life. Pink-tailed triggerfish, rarely seen elsewhere in Koh Tao, make this site particularly special. Ocellated eagle rays and marbled octopuses add to the biodiversity. The underwater topography includes swim-throughs, small caves, and coral-encrusted boulders that create perfect habitats for marine life."
      bestTime="Year-round, best visibility November-May"
      current="Light to moderate, generally calm"
      visibility="20-30m, good clarity"
      marineLife={[
        "Pink-tailed Triggerfish (unique to this site)",
        "Ocellated Eagle Rays",
        "Marbled Octopus",
        "Blue-ringed Octopus",
        "Nudibranchs and flatworms",
        "Anthias and damselfish",
        "Parrotfish and wrasse",
        "Moray eels and lionfish"
      ]}
      tips={[
        "Intermediate level recommended for optimal enjoyment",
        "Perfect for underwater photography and macro subjects",
        "Look for the rare pink-tailed triggerfish in sandy areas",
        "Explore the coral formations and small swim-throughs",
        "Great for marine life identification courses",
        "Calm waters make it suitable for extended dives",
        "Excellent site for practicing buoyancy skills"
      ]}
      images={[
        "/images/japanandwins.jpg", // Unique main image for Japanese Gardens
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif"
      ]}
    />
  );
};

export default JapaneseGardens;