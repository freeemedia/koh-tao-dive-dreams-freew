import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const HTMSSattakut = () => {
  return (
    <DiveSiteDetail
      name="HTMS Sattakut"
      description="WWII ex-US Navy vessel donated by Thai Navy, now a thriving artificial reef."
      depth="18-30m"
      difficulty="Advanced"
      location="Between islands"
      highlights={["Wreck Exploration", "Marine Life", "Swim-throughs", "Historical Significance"]}
      detailedDescription="HTMS Sattakut is a fascinating WWII-era ex-US Navy vessel deliberately sunk in 2011 to create an artificial reef. This 30-meter long wreck lies between Koh Tao and Koh Nang Yuan at depths of 18-30 meters. The wreck has become a thriving artificial reef, completely covered in corals and home to a diverse array of marine life. The ship's structure provides excellent swim-through opportunities, from the engine room to the bridge. Large groupers, snappers, and barracuda now call this wreck home, and it's become a premier wreck diving destination in Southeast Asia."
      bestTime="Year-round, best during dry season"
      current="Light to moderate, generally predictable"
      visibility="15-25m, good visibility around wreck"
      marineLife={[
        "Malabar Groupers (resident)",
        "Giant Barracuda",
        "Snapper and Fusilier schools",
        "Moray Eels",
        "Lionfish and scorpionfish",
        "Coral growth on wreck structure",
        "Various reef fish species",
        "Puffers and triggerfish"
      ]}
      tips={[
        "Advanced certification required for wreck diving",
        "Excellent site for wreck diving specialty course",
        "Respect the historical significance of the site",
        "Use wreck diving techniques and penetration skills",
        "Stay with your guide when exploring the interior",
        "Perfect for underwater photography",
        "Conserve air due to depth and exploration",
        "Look for the ship's historical features"
      ]}
      images={[
        "/images/htms-sattakut-wreck.jpg", // Unique main image for HTMS Sattakut
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default HTMSSattakut;