import React from 'react';

const beaches = [
  {
    name: "Mae Haad Beach",
    subtitle: "North & South",
    description: "Often overlooked due to their proximity to the pier, both north and south sections of Mae Haad beach offer a great place to spend a day. The south section stretches from Coconut Monkey coffee shop all the way to Sensi Paradise resort — clean, white and sandy. Near the resort is a 60-year-old shipwreck, a great snorkeling location with its own marine ecosystem. The north side features a safe swimming area cordoned off from boat traffic, kept in pristine condition and cleaned daily. A very popular spot to watch Koh Tao's famous sunsets.",
    location: "West Coast",
    tags: ["Snorkeling", "Swimming", "Sunset Watching", "Family Friendly"],
    tip: "Head to Breeze Koh Tao restaurant for lunch and beachside sun loungers — great sunset views.",
  },
  {
    name: "Sai Nuan Beach",
    subtitle: "Hidden Gem",
    description: "A hidden gem and throwback to the days when the first backpackers arrived on Koh Tao. Sai Nuan is actually two scenic beaches separated by a rocky outcrop. The first has a grass area with a tree swing and hammocks between palm trees. The small Sai Thong resort of wooden Thai-style bungalows adds to the relaxed, peaceful atmosphere. On a clear day expect white sand, coconut palms, and a clear warm turquoise sea. One of the least crowded beaches on the island.",
    location: "South West",
    tags: ["Secluded", "Peaceful", "Snorkeling", "Hammocks"],
    tip: "Walk from Mae Haad behind Sensi Paradise resort — about 25 minutes. Watch for signposts along the route.",
  },
  {
    name: "June Juea Beach",
    subtitle: "Most Remote",
    description: "Possibly the most remote beach on Koh Tao and certainly one of the smallest, June Juea is one of the most picturesque and secluded places to watch the sunset. Located on the south west side of the island, you can reach it by continuing the coastal walk from Sai Nuan, or walking from Chalok Baan Kao. The bay is made up of small areas of sand between large rocks and trees that provide natural shade. Perfect for getting away from it all.",
    location: "South West",
    tags: ["Remote", "Sunset", "Secluded", "Swimming"],
    tip: "One of the best sunset spots on the island — bring drinks and enjoy the view.",
  },
  {
    name: "Freedom Beach",
    subtitle: "South Side Favourite",
    description: "Another small secluded beach, Freedom beach is probably the most popular small beach on Koh Tao. Located on the south side, it's best reached by scooter — about 10 minutes from Sairee. The 100 baht entrance fee gives access to John Suwan Viewpoint, Taa Toh beach, and Freedom Beach. Beautiful white sandy beach with shade from Pemphis Acidula trees with hammocks, a shallow reef for snorkeling, and a beachside restaurant overlooking Chalok Baan Kao bay.",
    location: "South Coast",
    tags: ["Snorkeling", "Hammocks", "Restaurant", "Day Trip"],
    tip: "Visit John Suwan Viewpoint first, then cool down with a swim. Two beaches for one entrance fee — Taa Toh beach is just over the rocks.",
  },
  {
    name: "Tanote Beach",
    subtitle: "Tanote Bay — East Coast",
    description: "Situated on the east side of Koh Tao, Tanote Bay is easily accessible via the concrete road on a scooter. For early risers it's perfect for watching the sunrise facing east. Surrounded by steep jungle-covered hills, the beach stretches across the bay offering room for activities, swimming, snorkeling, and sunbathing. A large granite rock just offshore is the best rock jumping location on Koh Tao. Excellent marine life makes it a popular snorkeling and occasional diving spot.",
    location: "East Coast",
    tags: ["Rock Jumping", "Sunrise", "Snorkeling", "Diving", "Restaurant"],
    tip: "Two beachside resorts with restaurants — great for a full day. Come early for the best rock jumping spot.",
  },
  {
    name: "Aow Leuk Beach",
    subtitle: "Instagram Paradise",
    description: "This beautiful beach sits in a stunning bay on the south east side of Koh Tao — one of the most picturesque bays in the entire Samui Archipelago. On a clear day you have a stunning backdrop of Koh Phangan with the iconic Shark Island in the foreground, less than 1km by kayak. A 100 baht entrance fee includes fresh water and a sun lounger with umbrella. Colourful coral reef lines both sides of the bay, and the sheltered middle is perfect for swimming.",
    location: "South East",
    tags: ["Snorkeling", "Sun Loungers", "Coral Reef", "Photography"],
    tip: "Bring your own mask and snorkel or rent one at the beach — incredible marine life just steps from the water's edge.",
  },
  {
    name: "Sairee Beach",
    subtitle: "The Main Beach — 2km Long",
    description: "World-famous Sairee Beach is the busiest and longest beach on Koh Tao at almost 2 kilometres. The main tourist hub, Sairee has bars, restaurants, and resorts with soft white sand and plenty of shade. Activities include tree swings, paddleboarding, kayaking, beach volleyball, swimming, and snorkeling. Walk the full length along the path behind beachfront properties past shops and resort entrances. Popular sunset bars with music make evenings unforgettable on the west-facing shore.",
    location: "West Coast",
    tags: ["Bars & Restaurants", "Paddleboarding", "Kayaking", "Sunset", "Nightlife"],
    tip: "Walk from one end to the other — a great way to explore the island's main strip and find hidden gems along the way.",
  },
  {
    name: "Koh Nang Yuan",
    subtitle: "The Iconic Island — 800m Offshore",
    description: "Koh Nang Yuan is a separate island located approximately 800 metres off the north west coast of Koh Tao, accessible by long-tail boat. Probably the most photographed beach in Thailand — a unique inter-connected sandbar connecting three land masses. With a stunning Viewpoint to climb and snorkeling one of Thailand's most diverse coral reefs, it's on every visitor's bucket list. At low tide the sandbar connects the land masses with soft white sand and sun loungers.",
    location: "North West (Separate Island)",
    tags: ["Iconic", "Viewpoint", "Snorkeling", "Coral Reef", "Photography"],
    tip: "Join a half-day or full-day snorkel trip, or hire a local longtail boat for the short journey from the west side of Koh Tao.",
  },
];

const BeachesKohTao = () => (
  <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    {/* Hero Section */}
    <section
      className="relative h-64 md:h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/sexy.png')" }}
    >
      <div className="text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">Beaches of Koh Tao</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow text-white/90">
          Koh Tao is blessed with stunning natural beauty — lush green jungle, palm-lined bays, and tropical turquoise waters lapping up to white sandy beaches.
        </p>
      </div>
    </section>

    {/* Intro */}
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Amazing Koh Tao Beaches – Relax & Enjoy</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        The island has lots of spectacular bays and beaches to keep even long-term visitors more than occupied. Whether you're snorkeling, sunbathing, or simply unwinding, there's a beach for every mood.
      </p>
    </section>

    {/* Beach Cards */}
    <section className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
      {beaches.map((beach, i) => (
        <div key={beach.name} className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-2/5 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center p-10">
            <div className="text-center text-white">
              <div className="text-6xl font-bold opacity-20 mb-2">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-2xl font-bold">{beach.name}</h3>
              <p className="text-blue-100 italic mt-1">{beach.subtitle}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-sm text-blue-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {beach.location}
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between gap-4">
            <p className="text-gray-600 leading-relaxed">{beach.description}</p>
            <div className="flex flex-wrap gap-2">
              {beach.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">{tag}</span>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <span className="font-semibold">💡 Tip: </span>{beach.tip}
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* CTA */}
    <section className="bg-blue-600 text-white py-14 px-4 text-center">
      <h2 className="text-3xl font-bold mb-3">Explore Koh Tao Beyond the Beaches</h2>
      <p className="text-blue-100 max-w-xl mx-auto mb-8">Dive the world-class dive sites, discover incredible marine life, or join us for a snorkel trip to Koh Nang Yuan.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/koh-tao-dive-sites" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">Explore Dive Sites</a>
        <a href="/marine-life" className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg border border-blue-400 hover:bg-blue-400 transition">Koh Tao Marine Life</a>
        <a href="/contact" className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-400 transition">Book a Trip</a>
      </div>
    </section>
  </main>
);

export default BeachesKohTao;
