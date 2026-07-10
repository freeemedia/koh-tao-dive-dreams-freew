import React from 'react';
import { useTranslation } from 'react-i18next';

const beaches = [
  {
    name: "Mae Haad Beach",
    subtitle: "Noord & Zuid",
    image: "/images/maehad.jpg",
    description: "Often overlooked due to their proximity to the pier, both north and south sections of Mae Haad beach offer a great place to spend a day. The south section stretches from Coconut Monkey coffee shop all the way to Sensi Paradise resort — clean, white and sandy. Near the resort is a 60-year-old shipwreck, a great snorkeling location with its own marine ecosystem. The north side features a safe swimming area cordoned off from boat traffic, kept in pristine condition and cleaned daily. A very popular spot to watch Koh Tao's famous sunsets.",
    location: "Westkust",
    tags: ["Snorkelen", "Zwemmen", "Zonsondergang", "Gezinsvriendelijk"],
    tip: "Ga naar Breeze Koh Tao voor lunch en strandbedjes — perfect voor zonsondergang.",
  },
  {
    name: "Sai Nuan Beach",
    subtitle: "Verborgen parel",
    image: "/images/sanjuan.jpg",
    description: "A hidden gem and throwback to the days when the first backpackers arrived on Koh Tao. Sai Nuan is actually two scenic beaches separated by a rocky outcrop. The first has a grass area with a tree swing and hammocks between palm trees. The small Sai Thong resort of wooden Thai-style bungalows adds to the relaxed, peaceful atmosphere. On a clear day expect white sand, coconut palms, and a clear warm turquoise sea. One of the least crowded beaches on the island.",
    location: "Zuidwest",
    tags: ["Afgelegen", "Rustig", "Snorkelen", "Hangmatten"],
    tip: "Loop vanaf Mae Haad achter Sensi Paradise langs — ongeveer 25 minuten. Volg de bordjes onderweg.",
  },
  {
    name: "June Juea Beach",
    subtitle: "Meest afgelegen",
    image: "/images/JunejueaBeach.jpg",
    description: "Possibly the most remote beach on Koh Tao and certainly one of the smallest, June Juea is one of the most picturesque and secluded places to watch the sunset. Located on the south west side of the island, you can reach it by continuing the coastal walk from Sai Nuan, or walking from Chalok Baan Kao. The bay is made up of small areas of sand between large rocks and trees that provide natural shade. Perfect for getting away from it all.",
    location: "Zuidwest",
    tags: ["Afgelegen", "Zonsondergang", "Rust", "Zwemmen"],
    tip: "Een van de beste zonsondergangplekken op het eiland — neem wat te drinken mee en geniet.",
  },
  {
    name: "Freedom Beach",
    subtitle: "Favoriet in het zuiden",
    image: "/images/freedom-beach-resort.jpg",
    description: "Another small secluded beach, Freedom beach is probably the most popular small beach on Koh Tao. Located on the south side, it's best reached by scooter — about 10 minutes from Sairee. The 100 baht entrance fee gives access to John Suwan Viewpoint, Taa Toh beach, and Freedom Beach. Beautiful white sandy beach with shade from Pemphis Acidula trees with hammocks, a shallow reef for snorkeling, and a beachside restaurant overlooking Chalok Baan Kao bay.",
    location: "Zuidkust",
    tags: ["Snorkelen", "Hangmatten", "Restaurant", "Dagtrip"],
    tip: "Bezoek eerst John Suwan Viewpoint en koel daarna af met een duik. Twee stranden voor één entree.",
  },
  {
    name: "Tanote Beach",
    subtitle: "Tanote Bay — Oostkust",
    image: "/images/tanote.png",
    description: "Situated on the east side of Koh Tao, Tanote Bay is easily accessible via the concrete road on a scooter. For early risers it's perfect for watching the sunrise facing east. Surrounded by steep jungle-covered hills, the beach stretches across the bay offering room for activities, swimming, snorkeling, and sunbathing. A large granite rock just offshore is the best rock jumping location on Koh Tao. Excellent marine life makes it a popular snorkeling and occasional diving spot.",
    location: "Oostkust",
    tags: ["Rots springen", "Zonsopkomst", "Snorkelen", "Duiken", "Restaurant"],
    tip: "Twee resorts aan het strand met restaurants — ideaal voor een hele dag. Kom vroeg voor de beste springplek.",
  },
  {
    name: "Aow Leuk Beach",
    subtitle: "Instagram-paradijs",
    image: "/images/aowluk.jpg",
    description: "This beautiful beach sits in a stunning bay on the south east side of Koh Tao — one of the most picturesque bays in the entire Samui Archipelago. On a clear day you have a stunning backdrop of Koh Phangan with the iconic Shark Island in the foreground, less than 1km by kayak. A 100 baht entrance fee includes fresh water and a sun lounger with umbrella. Colourful coral reef lines both sides of the bay, and the sheltered middle is perfect for swimming.",
    location: "Zuidoost",
    tags: ["Snorkelen", "Ligbedden", "Koraalrif", "Fotografie"],
    tip: "Neem je eigen masker en snorkel mee of huur ter plekke — prachtig zeeleven direct vanaf het strand.",
  },
  {
    name: "Sairee Beach",
    subtitle: "Het hoofdstrand — 2 km lang",
    image: "/images/sairee.png",
    description: "World-famous Sairee Beach is the busiest and longest beach on Koh Tao at almost 2 kilometres. The main tourist hub, Sairee has bars, restaurants, and resorts with soft white sand and plenty of shade. Activities include tree swings, paddleboarding, kayaking, beach volleyball, swimming, and snorkeling. Walk the full length along the path behind beachfront properties past shops and resort entrances. Popular sunset bars with music make evenings unforgettable on the west-facing shore.",
    location: "Westkust",
    tags: ["Bars & restaurants", "Paddleboarden", "Kajakken", "Zonsondergang", "Nachtleven"],
    tip: "Loop van het ene uiteinde naar het andere — zo ontdek je eenvoudig de leukste plekjes van Sairee.",
  },
  {
    name: "Koh Nang Yuan",
    subtitle: "Het iconische eiland — 800 m uit de kust",
    image: "/images/japanandwins.jpg",
    description: "Koh Nang Yuan is a separate island located approximately 800 metres off the north west coast of Koh Tao, accessible by long-tail boat. Probably the most photographed beach in Thailand — a unique inter-connected sandbar connecting three land masses. With a stunning Viewpoint to climb and snorkeling one of Thailand's most diverse coral reefs, it's on every visitor's bucket list. At low tide the sandbar connects the land masses with soft white sand and sun loungers.",
    location: "Noordwest (apart eiland)",
    tags: ["Iconisch", "Uitzichtpunt", "Snorkelen", "Koraalrif", "Fotografie"],
    tip: "Boek een halve of hele dag snorkeltour, of huur een lokale longtailboot vanaf de westkant van Koh Tao.",
  },
];

const BeachesKohTao = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = {
    nl: {
      heroTitle: 'Stranden van Koh Tao',
      heroText: 'Koh Tao is gezegend met prachtige natuur: groene jungle, baaien met palmen en tropisch turquoise water aan witte zandstranden.',
      introTitle: 'Prachtige stranden op Koh Tao – Ontspan & geniet',
      introText: 'Het eiland heeft talloze spectaculaire baaien en stranden. Of je nu wilt snorkelen, zonnen of gewoon ontspannen: er is altijd een strand dat bij je past.',
      tipLabel: '💡 Tip:',
      ctaTitle: 'Ontdek Koh Tao buiten de stranden',
      ctaText: 'Duik op locaties van wereldklasse, ontdek indrukwekkend zeeleven of ga mee op snorkeltrip naar Koh Nang Yuan.',
      ctaSites: 'Bekijk duiklocaties',
      ctaMarineLife: 'Mariene leven Koh Tao',
      ctaBook: 'Boek een trip',
    },
    en: {
      heroTitle: 'Beaches of Koh Tao',
      heroText: 'Koh Tao is blessed with stunning nature: lush jungle, palm-lined bays, and tropical turquoise water along white sandy beaches.',
      introTitle: 'Beautiful beaches on Koh Tao – Relax & enjoy',
      introText: 'The island has many spectacular bays and beaches. Whether you want to snorkel, sunbathe, or simply relax, there is always a beach that fits your style.',
      tipLabel: '💡 Tip:',
      ctaTitle: 'Discover Koh Tao beyond the beaches',
      ctaText: 'Dive world-class sites, discover incredible marine life, or join a snorkeling trip to Koh Nang Yuan.',
      ctaSites: 'View dive sites',
      ctaMarineLife: 'Koh Tao marine life',
      ctaBook: 'Book a trip',
    },
  };

  const pageContent = isDutch ? content.nl : content.en;

  const toEnglishLocation = (location: string) => {
    const map: Record<string, string> = {
      Westkust: 'West coast',
      Zuidwest: 'Southwest',
      Zuidkust: 'South coast',
      Oostkust: 'East coast',
      Zuidoost: 'Southeast',
      'Noordwest (apart eiland)': 'Northwest (separate island)',
    };
    return map[location] || location;
  };

  const toEnglishTag = (tag: string) => {
    const map: Record<string, string> = {
      Snorkelen: 'Snorkeling',
      Zwemmen: 'Swimming',
      Zonsondergang: 'Sunset',
      Gezinsvriendelijk: 'Family-friendly',
      Afgelegen: 'Secluded',
      Rustig: 'Quiet',
      Hangmatten: 'Hammocks',
      Rust: 'Relaxation',
      Restaurant: 'Restaurant',
      Dagtrip: 'Day trip',
      'Rots springen': 'Rock jumping',
      Zonsopkomst: 'Sunrise',
      Duiken: 'Diving',
      Ligbedden: 'Sun loungers',
      Koraalrif: 'Coral reef',
      Fotografie: 'Photography',
      Paddleboarden: 'Paddleboarding',
      Kajakken: 'Kayaking',
      Nachtleven: 'Nightlife',
      Iconisch: 'Iconic',
      Uitzichtpunt: 'Viewpoint',
      'Bars & restaurants': 'Bars & restaurants',
    };
    return map[tag] || tag;
  };

  const toEnglishSubtitle = (subtitle: string) => {
    const map: Record<string, string> = {
      'Noord & Zuid': 'North & South',
      'Verborgen parel': 'Hidden gem',
      'Meest afgelegen': 'Most secluded',
      'Favoriet in het zuiden': 'Southern favorite',
      'Tanote Bay — Oostkust': 'Tanote Bay — East coast',
      'Instagram-paradijs': 'Instagram paradise',
      'Het hoofdstrand — 2 km lang': 'The main beach — 2 km long',
      'Het iconische eiland — 800 m uit de kust': 'The iconic island — 800 m offshore',
    };
    return map[subtitle] || subtitle;
  };

  const toEnglishTip = (tip: string) => {
    const map: Record<string, string> = {
      'Ga naar Breeze Koh Tao voor lunch en strandbedjes — perfect voor zonsondergang.': 'Head to Breeze Koh Tao for lunch and beach loungers — perfect for sunset.',
      'Loop vanaf Mae Haad achter Sensi Paradise langs — ongeveer 25 minuten. Volg de bordjes onderweg.': 'Walk from Mae Haad past Sensi Paradise — about 25 minutes. Follow the signs along the way.',
      'Een van de beste zonsondergangplekken op het eiland — neem wat te drinken mee en geniet.': 'One of the best sunset spots on the island — bring a drink and enjoy.',
      'Bezoek eerst John Suwan Viewpoint en koel daarna af met een duik. Twee stranden voor één entree.': 'Visit John Suwan Viewpoint first, then cool off with a swim. Two beaches for one entrance fee.',
      'Twee resorts aan het strand met restaurants — ideaal voor een hele dag. Kom vroeg voor de beste springplek.': 'Two beachfront resorts with restaurants — ideal for a full day. Arrive early for the best jumping spot.',
      'Neem je eigen masker en snorkel mee of huur ter plekke — prachtig zeeleven direct vanaf het strand.': 'Bring your own mask and snorkel or rent on-site — amazing marine life right from the beach.',
      'Loop van het ene uiteinde naar het andere — zo ontdek je eenvoudig de leukste plekjes van Sairee.': 'Walk from one end to the other to easily discover Sairee’s best spots.',
      'Boek een halve of hele dag snorkeltour, of huur een lokale longtailboot vanaf de westkant van Koh Tao.': 'Book a half-day or full-day snorkeling trip, or hire a local longtail boat from Koh Tao’s west side.',
    };
    return map[tip] || tip;
  };

  return (
  <main className="min-h-screen bg-gradient-to-b from-blue-50 to-background">
    {/* Hero Section */}
    <section className="relative h-64 md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/sexy.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="text-center text-white z-10 px-4 relative">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">{pageContent.heroTitle}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow text-white/90">
          {pageContent.heroText}
        </p>
      </div>
    </section>

    {/* Intro */}
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.introTitle}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        {pageContent.introText}
      </p>
    </section>

    {/* Beach Cards */}
    <section className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
      {beaches.map((beach, i) => (
        <div key={beach.name} className={`bg-background rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-2/5 relative min-h-[280px] md:min-h-full bg-gradient-to-br from-blue-500 to-teal-500">
            <img src={beach.image} alt={beach.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            <div className="relative h-full flex items-end p-6">
              <div className="text-white">
                <div className="text-5xl font-bold opacity-20 leading-none mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-2xl font-bold">{beach.name}</h3>
                <p className="text-blue-100 italic mt-1">{isDutch ? beach.subtitle : toEnglishSubtitle(beach.subtitle)}</p>
                <div className="mt-3 flex items-center gap-1 text-sm text-blue-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {isDutch ? beach.location : toEnglishLocation(beach.location)}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between gap-4">
            <p className="text-gray-600 leading-relaxed">{beach.description}</p>
            <div className="flex flex-wrap gap-2">
              {beach.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">{isDutch ? tag : toEnglishTag(tag)}</span>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <span className="font-semibold">{pageContent.tipLabel} </span>{isDutch ? beach.tip : toEnglishTip(beach.tip)}
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* CTA */}
    <section className="bg-blue-600 text-white py-14 px-4 text-center">
      <h2 className="text-3xl font-bold mb-3">{pageContent.ctaTitle}</h2>
      <p className="text-blue-100 max-w-xl mx-auto mb-8">{pageContent.ctaText}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/koh-tao-dive-sites" className="bg-background text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">{pageContent.ctaSites}</a>
        <a href="/marine-life" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg border border-blue-500 hover:bg-blue-700 transition">{pageContent.ctaMarineLife}</a>
        <a href="/#contact" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition">{pageContent.ctaBook}</a>
      </div>
    </section>
  </main>
  );
};

export default BeachesKohTao;
