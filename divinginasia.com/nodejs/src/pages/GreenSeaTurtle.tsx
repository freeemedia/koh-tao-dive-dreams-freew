import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const GreenSeaTurtle = () => {
  return (
    <MarineLifeDetail
      name="Green Sea Turtle"
      scientificName="Chelonia mydas"
      description="Herbivorous sea turtles that graze on seagrass and algae, important for maintaining healthy marine ecosystems."
      size="Up to 1.5m (5ft), 150-200kg"
      habitat="Shallow coastal waters, seagrass beds, coral reefs"
      conservationStatus="Endangered"
      diet="Seagrass, algae, marine plants"
      behavior="Spends most time grazing on seagrass beds, migrates long distances for nesting. Hatchlings make dangerous journey from beach to sea."
      bestTime="Year-round, especially in shallow bays"
      frequency="Common in suitable habitats"
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      detailedDescription="The green sea turtle is one of the most common sea turtles in Koh Tao's waters and plays a crucial role in maintaining the health of seagrass beds and coral reefs. These gentle herbivores spend their days grazing on seagrass and algae, helping to keep these important habitats in balance. Adult turtles are frequently seen in shallow bays and coral reef areas, while hatchlings can sometimes be observed making their perilous journey from nesting beaches to the open sea. Conservation efforts in Thailand have helped protect these ancient mariners, and seeing them in their natural habitat is always a special experience."
      interestingFacts={[
        "Green sea turtles can live up to 80 years",
        "They are named for their green body fat, not their shell",
        "Females return to the same beach where they hatched to lay eggs",
        "They can hold their breath for up to 7 hours while resting",
        "Hatchlings must reach the sea within 72 hours or die",
        "They migrate thousands of kilometers between feeding and nesting grounds"
      ]}
      photographyTips={[
        "Approach slowly and avoid sudden movements",
        "Shoot from water level for dramatic perspective",
        "Include the turtle's environment in your composition",
        "Use natural light and avoid flash",
        "Be patient and let the turtle come to you",
        "Respect their space and don't chase them"
      ]}
      images={[
        "/images/green-sea-turtle.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreenSeaTurtle;