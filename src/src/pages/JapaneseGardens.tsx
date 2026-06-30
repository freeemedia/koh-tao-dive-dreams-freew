import React from 'react';
// import DiveSiteDetail from '../components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const JapaneseGardens = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description: "Divers koraalrif met kleurrijk onderwaterleven en mooie doorgangen.",
        difficulty: "Gemiddeld",
        location: "Nabij Koh Nang Yuan",
        highlights: ["Roze staarttrekker", "Gevlekte adelaarsrog", "Kleurrijk koraal", "Gemarmerde octopus"],
        detailedDescription:
          "Japanese Gardens ligt bij Koh Nang Yuan en biedt een van de meest diverse koraalrifecosystemen van Thailand. Deze duiklocatie voor gemiddeld niveau heeft een indrukwekkende variatie aan koraalformaties, van kleurrijke zachte koralen tot grote gorgonen. De site staat bekend om gezonde koraaldekking en veel onderwaterleven. De roze staarttrekker, die elders rond Koh Tao minder vaak wordt gezien, maakt deze plek extra bijzonder. Gevlekte adelaarsroggen en gemarmerde octopussen verhogen de biodiversiteit. Het onderwaterlandschap met doorgangen, kleine grotten en met koraal begroeide rotsblokken biedt ideaal leefgebied voor veel soorten.",
        bestTime: "Hele jaar, beste zicht november-mei",
        current: "Licht tot matig, meestal rustig",
        visibility: "20-30m, goed helder",
        marineLife: [
          "Roze staarttrekker (bijzonder voor deze site)",
          "Gevlekte adelaarsrog",
          "Gemarmerde octopus",
          "Blauwgeringde octopus",
          "Naaktslakken en platwormen",
          "Anthias en juffervissen",
          "Papegaaivissen en lipvissen",
          "Murenen en koraalduivels"
        ],
        tips: [
          "Gemiddeld niveau aanbevolen voor optimaal duikplezier",
          "Perfect voor onderwaterfotografie en macro-onderwerpen",
          "Zoek in zandgebieden naar de zeldzamere roze staarttrekker",
          "Verken de koraalformaties en kleine doorgangen",
          "Uitstekend voor cursussen soortherkenning",
          "Rustig water maakt langere duiken mogelijk",
          "Goede locatie om drijfvermogen te oefenen"
        ]
      }
    : {
        description: "Diverse coral reefs with colorful marine life and swim-throughs.",
        difficulty: "Intermediate",
        location: "Near Koh Nang Yuan",
        highlights: ["Pink Tailed Triggerfish", "Ocellated Eagle Rays", "Colorful Corals", "Marbled Octopus"],
        detailedDescription:
          "Japanese Gardens is located near Koh Nang Yuan and offers one of the most diverse coral reef ecosystems in Thailand. This intermediate dive site features a stunning variety of coral formations, from colorful soft corals to massive gorgonians. The site is renowned for its healthy coral coverage and abundant marine life. Pink-tailed triggerfish, rarely seen elsewhere in Koh Tao, make this site particularly special. Ocellated eagle rays and marbled octopuses add to the biodiversity. The underwater topography includes swim-throughs, small caves, and coral-encrusted boulders that create perfect habitats for marine life.",
        bestTime: "Year-round, best visibility November-May",
        current: "Light to moderate, generally calm",
        visibility: "20-30m, good clarity",
        marineLife: [
          "Pink-tailed Triggerfish (unique to this site)",
          "Ocellated Eagle Rays",
          "Marbled Octopus",
          "Blue-ringed Octopus",
          "Nudibranchs and flatworms",
          "Anthias and damselfish",
          "Parrotfish and wrasse",
          "Moray eels and lionfish"
        ],
        tips: [
          "Intermediate level recommended for optimal enjoyment",
          "Perfect for underwater photography and macro subjects",
          "Look for the rare pink-tailed triggerfish in sandy areas",
          "Explore the coral formations and small swim-throughs",
          "Great for marine life identification courses",
          "Calm waters make it suitable for extended dives",
          "Excellent site for practicing buoyancy skills"
        ]
      };

  return (
    {/* <DiveSiteDetail
      name="Japanese Gardens"
      description={content.description}
      depth="12-25m"
      difficulty={content.difficulty}
      location={content.location}
      highlights={content.highlights}
      detailedDescription={content.detailedDescription}
      bestTime={content.bestTime}
      current={content.current}
      visibility={content.visibility}
      marineLife={content.marineLife}
      tips={content.tips}
      images={[
        "/images/japanandwins.jpg", // Unique main image for Japanese Gardens
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif"
      ]}
    /> */}
  );
};

export default JapaneseGardens;