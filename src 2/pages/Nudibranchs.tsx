import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) => (value ? value.split('\n').filter(Boolean) : []);

const Nudibranchs = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
    description: 'Kleurrijke zeenaaktslakken met ongelooflijke patronen en vormen, perfect voor macrofotografie.',
    size: '1-15cm afhankelijk van soort',
    habitat: 'Koraalriffen, zandvlaktes, rotsachtige zones',
    conservation_status: 'Niet geëvalueerd',
    diet: 'Sponzen, hydroïdpoliepen, zakpijpen, andere naaktslakken',
    behavior: 'Langzame grazers die vaak gespecialiseerd voedsel eten; sommige tonen waarschuwingskleuren vanwege giftigheid; hermafrodiet.',
    best_time: 'Hele jaar, vooral na sterkere stroming',
    frequency: 'Veelvoorkomend in geschikt habitat bij geduldige observatie',
    detailed_description: 'Naaktslakken zijn levende kunstwerkjes die je overal op de riffen van Koh Tao kunt vinden. Deze schelploze weekdieren tonen een enorme variatie in kleur, patroon en lichaamsvorm. Met honderden soorten, van vingertopformaat tot bijna handgroot, blijven ze eindeloos boeiend voor macrofotografen en natuurliefhebbers. Juist door hun variatie en fotogenieke gedrag zijn ze geliefde onderwerpen in onderwaterfotografie.',
    interesting_facts: 'Naaktslakken bestaan in honderden soorten met spectaculaire kleurvariaties\nVeel soorten zijn giftig en waarschuwen daarvoor met felle kleuren\nDe meeste naaktslakken zijn hermafrodiet met zowel mannelijke als vrouwelijke organen\nZe eten vaak zeer specifieke prooien - sommige sponzen, andere hydroïden\nDoor hun vorm en kleur zijn ze ideale macro-onderwerpen\nIn tropische wateren worden nog steeds nieuwe soorten ontdekt',
    photography_tips: 'Gebruik macrolenzen (30-60mm) om het frame met detail te vullen\nHandmatige focus is essentieel voor scherpte op kleine onderwerpen\nGebruik focuslicht om details goed uit te lichten\nFotografeer close-up voor kieuwen, voelsprieten en textuur\nWees geduldig en wacht op een goede positie\nGoede belichting laat kleuren en patronen echt uitkomen',
  } : {
    description: 'Colorful sea slugs with incredible patterns and shapes, perfect for macro photography.',
    size: '1-15cm depending on species',
    habitat: 'Coral reefs, sandy flats, rocky zones',
    conservation_status: 'Not evaluated',
    diet: 'Sponges, hydroids, tunicates, other nudibranchs',
    behavior: 'Slow grazers that often feed on specialized prey; some display warning colors due to toxicity; hermaphroditic.',
    best_time: 'Year-round, especially after stronger currents',
    frequency: 'Common in suitable habitat with patient observation',
    detailed_description: 'Nudibranchs are living artworks found throughout Koh Tao’s reefs. These shell-less mollusks show huge variation in color, pattern, and body shape. With hundreds of species, from fingertip size to nearly hand-sized, they remain endlessly fascinating for macro photographers and marine life enthusiasts. Their variety and photogenic behavior make them favorite subjects in underwater photography.',
    interesting_facts: 'Nudibranchs include hundreds of species with spectacular color variation\nMany species are toxic and advertise this with bright warning colors\nMost nudibranchs are hermaphrodites with both male and female organs\nThey often eat highly specialized prey - some sponges, others hydroids\nTheir shape and color make them ideal macro subjects\nNew species are still being discovered in tropical waters',
    photography_tips: 'Use macro lenses (30-60mm) to fill the frame with detail\nManual focus is essential for sharpness on tiny subjects\nUse a focus light to reveal detail clearly\nShoot close-ups of gills, rhinophores, and texture\nBe patient and wait for a clean position\nGood lighting brings out color and pattern beautifully',
  };

  const { content } = usePageContent({ pageSlug: 'nudibranchs', locale, fallbackContent });

  return (
    <MarineLifeDetail
      name={isDutch ? 'Naaktslakken' : 'Nudibranchs'}
      scientificName={'Various species (Gastropoda)'}
      description={content.description}
      size={content.size}
      habitat={content.habitat}
      conservationStatus={content.conservation_status}
      diet={content.diet}
      behavior={content.behavior}
      bestTime={content.best_time}
      frequency={content.frequency}
      detailedDescription={content.detailed_description}
      interestingFacts={parseLines(content.interesting_facts)}
      photographyTips={parseLines(content.photography_tips)}
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
