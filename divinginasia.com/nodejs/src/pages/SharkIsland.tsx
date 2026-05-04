import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const SharkIsland = () => {
  return (
    <DiveSiteDetail
      name="Shark Island"
      description="Beautiful soft purple tree corals and gorgonians with abundant marine life."
      depth="8-20m"
      difficulty="Beginner-Intermediate"
      location="South coast"
      highlights={["Sea Fans", "Dynamic Sea Whips", "Black Tip Reef Sharks", "Tropical Fish"]}
      detailedDescription="Shark Island is located on Koh Tao's south coast and is renowned for its spectacular coral formations and marine biodiversity. The site features beautiful soft purple tree corals, vibrant gorgonians including sea fans and dynamic sea whips that sway gracefully in the current. Black-tip reef sharks are commonly sighted cruising the reef, giving the site its name. The underwater landscape includes coral-encrusted boulders and sandy patches, creating diverse habitats for marine life. This site is particularly popular with underwater photographers due to its colorful subjects and excellent visibility."
      bestTime="Year-round, excellent during dry season"
      current="Light, generally calm conditions"
      visibility="20-30m, excellent clarity"
      marineLife={[
        "Black-tip Reef Sharks",
        "Diverse reef fish",
        "Gorgonian sea fans",
        "Soft tree corals",
        "Anthias and anthias",
        "Parrotfish and wrasse",
        "Moray eels",
        "Nudibranchs and invertebrates"
      ]}
      tips={[
        "Suitable for all certification levels",
        "Excellent for underwater photography",
        "Look for sharks in the blue water above the reef",
        "Explore the coral formations carefully",
        "Great for marine life observation",
        "Perfect for extended dives",
        "Good site for practicing photography techniques",
        "Conserve energy for the return swim"
      ]}
      images={[
        "/images/sharkisand.jpg", // Unique main image for Shark Island
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default SharkIsland;