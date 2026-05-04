import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const Twins = () => {
  return (
    <DiveSiteDetail
      name="Twins Pinnacle"
      description="Koh Tao's most popular dive site featuring three granite pinnacles with abundant marine life and perfect for all certification levels."
      depth="5-20m"
      difficulty="Beginner to Intermediate"
      location="West coast of Koh Nang Yuan"
      highlights={["Three Granite Pinnacles", "Archway and Rock Formations", "Abundant Marine Life", "Perfect for Training", "Flat Conditions", "Clownfish Anemones"]}
      detailedDescription="Twins Pinnacle is possibly the most popular dive site on Koh Tao and is perfectly designed for recreational scuba diving and PADI training courses. The site features three distinct pinnacles: two large collections of coral-covered boulders and a smaller deeper group of rocks further west, creating an east-west axis that is easy to navigate. The name likely derives from either the two main rock pinnacles underwater or the two peaks of Koh Nang Yuan island that overlook this wonderful dive site. With its sheltered position and relative protection from monsoon weather, Twins always provides excellent diving conditions and thriving marine life. The site is renowned for its macro action and diverse reef fish species, making it ideal for photography, identification courses, and buoyancy practice."
      bestTime="Year-round, best November-May"
      current="Flat almost all year with very little current"
      visibility="5-20 metres average"
      marineLife={[
        "Saddleback Clownfish and Sebae Anemones (famous residents)",
        "Nudibranchs",
        "Pipefish",
        "Yellow Boxfish",
        "Longface Emperor Fish",
        "White's Butterflyfish",
        "Angel Fish (Six-banded and others)",
        "Coral Fish",
        "Moray Eels",
        "Trevally",
        "Blue-spotted Ribbontail Rays",
        "Snapper",
        "Groupers (Brown Marbled)",
        "Parrotfish",
        "Wrasse varieties",
        "Bannerfish",
        "Sea Turtles",
        "Scribbled Filefish",
        "Anemone Fish",
        "Cowfish and Wart Slugs"
      ]}
      tips={[
        "Perfect for Open Water divers and training courses",
        "Explore the deeper western peak and small rocks first to find Longface Emperor Fish and Pipefish",
        "Navigate to the middle peak and explore the archway on the north side (requires good buoyancy control)",
        "Look under ledges of the shallow peak for Blue-spotted rays and Snapper",
        "Don't miss the famous Clownfish living with Sebae Anemone southeast of the middle pinnacle",
        "Note: A rock circle has been created around the famous clownfish resident - do not venture inside",
        "Great for macro photography and fish identification",
        "Practice buoyancy skills on the archway and rock formations",
        "If buoyancy is challenging, nearby Buoyancy World is specifically designed for skill practice",
        "Excellent for marine conservation awareness and identification courses",
        "Easy navigation with the three peaks marking your dive route"
      ]}
      images={[
        "/images/twins-header.png",
        "/images/twins.jpg",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif"
      ]}
    />
  );
};

export default Twins;
