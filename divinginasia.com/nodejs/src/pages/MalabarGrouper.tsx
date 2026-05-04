import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const MalabarGrouper = () => {
  return (
    <MarineLifeDetail
      name="Malabar Grouper"
      scientificName="Epinephelus malabaricus"
      description="Large predatory grouper fish found in deeper waters, known for their impressive size and ambush hunting tactics."
      size="Up to 2.3m (7.5ft), 100kg"
      habitat="Deep reefs, rock formations, pinnacles"
      conservationStatus="Not Evaluated"
      diet="Fish, crustaceans, cephalopods"
      behavior="Ambush predator that hides in caves and crevices, emerges quickly to catch prey. Solitary or in pairs, uses powerful suction feeding."
      bestTime="Year-round"
      frequency="Common at deeper dive sites"
      detailedDescription="The Malabar grouper is one of the largest and most impressive grouper species found at Koh Tao's deeper dive sites. These powerful predators are known for their ability to rapidly extract victims from coral crevices using powerful suction feeding. They are relatively shy and tend to retreat into caves when divers approach, but patient observation often rewards with sightings of these magnificent fish. Their impressive size and predatory nature make them a highlight of deep reef diving."
      interestingFacts={[
        "Malabar groupers can weigh up to 100kg and reach 2.3 meters in length",
        "They use suction feeding to rapidly capture prey from coral crevices",
        "They can live up to 40+ years in the wild",
        "They are protogynous hermaphrodites, meaning females can change to males",
        "They are found throughout the Indo-Pacific region in appropriate habitat",
        "They play an important role in reef ecosystem balance as apex predators"
      ]}
      photographyTips={[
        "Use wide-angle lenses to capture their impressive size and depth",
        "Shoot from below to emphasize their power and dominance",
        "Move slowly and pause frequently to avoid startling them",
        "Include reef context and cave formations in your composition",
        "Capture mid-water movements and feeding behaviors when possible",
        "Always respect their space and maintain a safe distance"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/malabar-grouper.png"
      images={[
        "/images/groouper.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default MalabarGrouper;