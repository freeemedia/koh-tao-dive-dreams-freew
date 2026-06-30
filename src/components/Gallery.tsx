import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import local images

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = useMemo(() => ({
    gallery_headline: isDutch
      ? 'Bekijk de fotografie van onze blije klanten.'
      : 'Check out the photography of our happy customers.',
    gallery_subtitle: isDutch
      ? 'Ervaar de adembenemende schoonheid van de onderwaterwereld van Koh Tao in onze fotogalerij'
      : 'Experience the breathtaking beauty of Koh Tao’s underwater world in our photo gallery',
  }), [isDutch]);

  const { content } = usePageContent({
    pageSlug: 'home',
    locale,
    fallbackContent,
  });

  const images = isDutch ? [
    {
      src: "/images/photo-1682687982423-295485af248a.avif",
      alt: "Duikers op een boot, klaar voor de duik",
      category: "Duiken"
    },
    {
      src: "/images/htms-sattakut-wreck.jpg",
      alt: "Diepduiken bij het HTMS Sattakut-wrak",
      category: "Wrakduiken"
    },
    {
      src: "/images/sailrock.webp",
      alt: "Diepduiktrip bij Sail Rock, Koh Tao",
      category: "Diepduiken"
    },
    {
      src: "/images/chumphon-pinnacle-top.webp",
      alt: "Chumphon Pinnacle met scholen rifvissen",
      category: "Duiklocaties"
    },
    {
      src: "/images/htms-sattakut.jpg",
      alt: "Wrakduik op de HTMS Sattakut",
      category: "Duiklocaties"
    },
    {
      src: "/images/twins.jpg",
      alt: "Ondiepe rifduik bij Twins",
      category: "Duiklocaties"
    },
    {
      src: "/images/mango-bay.webp",
      alt: "Heldere omstandigheden bij Mango Bay",
      category: "Duiklocaties"
    },
    {
      src: "/images/sharkisand.jpg",
      alt: "Rifstructuren bij Shark Island",
      category: "Duiklocaties"
    },
    {
      src: "/images/fun.png",
      alt: "Duikers die plezier hebben tijdens een fundive",
      category: "Fun Dives"
    },
    {
      src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
      alt: "Vrienden genieten van drankjes op een tropisch strand",
      category: "Beach Bars"
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      alt: "Golden hour op een idyllisch Koh Tao strand",
      category: "Stranden"
    },
    {
      src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      alt: "Avondleven en gezelligheid na een duikdag",
      category: "Nachtleven"
    },
    {
      src: "/images/food-drink-hero.jpg",
      alt: "Genieten van eten en drankjes na het duiken",
      category: "Eten & Drinken"
    },
    {
      src: "/images/viewpoints-hero.jpg",
      alt: "Uitzichtpunt wandeling op Koh Tao",
      category: "Bergwandelen"
    },
    {
      src: "/images/things-to-do.jpg",
      alt: "Leuke activiteiten op Koh Tao",
      category: "Koh Tao Vibes"
    },
    {
      src: "/images/JunejueaBeach.jpg",
      alt: "Prachtig strand bij June Juea",
      category: "Koh Tao Vibes"
    },
    {
      src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ontmoeting met een walvishaai",
      category: "Grote vissen"
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Onderwaterfotograaf",
      category: "Duiken"
    }
  ] : [
    {
      src: "/images/photo-1682687982423-295485af248a.avif",
      alt: "Divers on a boat ready to dive",
      category: "Diving"
    },
    {
      src: "/images/htms-sattakut-wreck.jpg",
      alt: "Deep dive at the HTMS Sattakut wreck",
      category: "Wreck Diving"
    },
    {
      src: "/images/sailrock.webp",
      alt: "Deep diving trip at Sail Rock, Koh Tao",
      category: "Deep Diving"
    },
    {
      src: "/images/chumphon-pinnacle-top.webp",
      alt: "Chumphon Pinnacle with schools of reef fish",
      category: "Dive Sites"
    },
    {
      src: "/images/htms-sattakut.jpg",
      alt: "Wreck dive at HTMS Sattakut",
      category: "Dive Sites"
    },
    {
      src: "/images/twins.jpg",
      alt: "Shallow reef diving at Twins",
      category: "Dive Sites"
    },
    {
      src: "/images/mango-bay.webp",
      alt: "Clear-water conditions at Mango Bay",
      category: "Dive Sites"
    },
    {
      src: "/images/sharkisand.jpg",
      alt: "Reef structure at Shark Island",
      category: "Dive Sites"
    },
    {
      src: "/images/fun.png",
      alt: "Divers having fun during a fun dive",
      category: "Fun Dives"
    },
    {
      src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
      alt: "Friends enjoying drinks at a tropical beach bar",
      category: "Beach Bars"
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      alt: "Golden hour at an idyllic Koh Tao beach",
      category: "Beaches"
    },
    {
      src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      alt: "Night vibes and social moments after diving",
      category: "Nightlife"
    },
    {
      src: "/images/food-drink-hero.jpg",
      alt: "Enjoying food and drinks after diving",
      category: "Food & Drinks"
    },
    {
      src: "/images/viewpoints-hero.jpg",
      alt: "Viewpoint hike in Koh Tao",
      category: "Mountain Hikes"
    },
    {
      src: "/images/things-to-do.jpg",
      alt: "Fun activities around Koh Tao",
      category: "Koh Tao Vibes"
    },
    {
      src: "/images/JunejueaBeach.jpg",
      alt: "Beautiful June Juea beach scene",
      category: "Koh Tao Vibes"
    },
    {
      src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Whale shark encounter",
      category: "Big fish"
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Underwater photographer",
      category: "Diving"
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.gallery_headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.gallery_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                title={isDutch ? 'Sluiten' : 'Close'}
                aria-label={isDutch ? 'Sluiten' : 'Close'}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                title={isDutch ? 'Vorige afbeelding' : 'Previous image'}
                aria-label={isDutch ? 'Vorige afbeelding' : 'Previous image'}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                title={isDutch ? 'Volgende afbeelding' : 'Next image'}
                aria-label={isDutch ? 'Volgende afbeelding' : 'Next image'}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-medium">{images[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">{images[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
