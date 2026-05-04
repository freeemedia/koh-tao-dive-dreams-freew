import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const ChumphonPinnacle = () => {
  return (
    <DiveSiteDetail
      name="Chumphon Pinnacle"
      description="Granite pinnacle offering excellent whaleshark sightings and large schools of trevally."
      depth="15-30m"
      difficulty="Advanced"
      location="30 minutes offshore"
      highlights={["Whalesharks", "Trevally Schools", "Eagle Rays", "Chevron Barracuda"]}
      detailedDescription="Chumphon Pinnacle is one of Koh Tao's most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle's structure provides excellent swim-through opportunities and photographic subjects."
      bestTime="Year-round, peak season December-April"
      current="Moderate, can be strong at times"
      visibility="25-35m, excellent visibility"
      marineLife={[
        "Whalesharks (regular sightings)",
        "Giant Trevally schools",
        "Chevron Barracuda",
        "Eagle Rays",
        "Scad and Fusilier schools",
        "Giant Barracuda",
        "Kingfish",
        "Various reef fish species"
      ]}
      tips={[
        "Advanced certification recommended due to depth and current",
        "Early morning departures maximize wildlife sightings",
        "Wide-angle photography lens recommended for large subjects",
        "Stay with your dive guide in moderate currents",
        "Perfect for deep diving specialty courses",
        "Whalesharks are most active during incoming tides",
        "Bring a good quality underwater camera"
      ]}
      images={[
        "/images/photo-1682686580849-3e7f67df4015.avif", // Unique main image for Chumphon Pinnacle
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default ChumphonPinnacle;