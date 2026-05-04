import React from 'react';
import { Check, Star, Zap, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const divePacks = [
  {
    id: 'single',
    name: 'Single Dive',
    tag: null,
    priceIDR: '385,000',
    priceNote: 'per dive · equipment included',
    dives: 1,
    color: 'from-cyan-400 to-cyan-600',
    border: 'border-cyan-200',
    includes: [
      'Guided boat dive',
      'Full equipment rental',
      'Tanks & weights',
      'Dive briefing',
    ],
  },
  {
    id: 'funpack10',
    name: '10-Dive Package',
    tag: 'Best Value',
    priceIDR: '3,300,000',
    priceNote: 'IDR 330,000 per dive',
    dives: 10,
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    includes: [
      '10 guided boat dives',
      'Full equipment every dive',
      'Tanks & weights',
      'Crystal Bay & Manta Point trips',
      'Valid 14 days',
    ],
  },
  {
    id: 'staydive',
    name: 'Stay & Dive 7 Days',
    tag: 'Most Popular',
    priceIDR: '7,500,000',
    priceNote: 'per person · accommodation included',
    dives: 21,
    color: 'from-teal-500 to-blue-600',
    border: 'border-teal-400',
    includes: [
      '7 nights accommodation',
      '21 guided boat dives',
      'Full equipment every dive',
      'Nusa Penida day trip',
      'Night dive included',
      'Welcome Bintang on arrival 🍺',
    ],
  },
];

const earlyBirdPerks = [
  { icon: '💰', text: '10% off any package' },
  { icon: '🤿', text: '2 bonus dives free' },
  { icon: '📸', text: 'Free underwater photo session' },
  { icon: '🍺', text: 'Welcome dinner & drinks' },
];

const StayDivePackages = () => {
  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
            Fun Diving
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Crystal Bay. Manta Point. Nusa Penida.<br />
            <span className="text-blue-600">Dive it all from our doorstep.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Step off the boat, hit world-class sites in minutes. Full equipment included on every dive — no extras, no surprises.
          </p>
          {/* Site pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Crystal Bay', 'Manta Point', 'Toyapakeh', 'Blue Corner', 'Ceningan Wall', 'SD Point', 'Mangrove Point'].map(s => (
              <span key={s} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Waves className="h-3 w-3" />{s}
              </span>
            ))}
          </div>
        </div>

        {/* Early Bird Banner */}
        <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 md:p-8 mb-14 overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-200 fill-yellow-200" />
                  <span className="text-white font-bold text-lg uppercase tracking-wider">Early Bird Special</span>
                  <Star className="h-4 w-4 text-yellow-200 fill-yellow-200" />
                </div>
                <p className="text-orange-100 text-sm md:text-base">Book <strong className="text-white">21+ days in advance</strong> and unlock exclusive perks on any package</p>
              </div>
            </div>
            <Link to="/book" className="shrink-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow">
              Claim Early Bird →
            </Link>
          </div>

          {/* Perks row */}
          <div className="relative mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {earlyBirdPerks.map((p, i) => (
              <div key={i} className="bg-white/15 rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="text-xl">{p.icon}</span>
                <span className="text-white text-sm font-medium">{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {divePacks.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${pkg.id === 'staydive' ? 'border-teal-400 scale-[1.02]' : pkg.border} overflow-hidden flex flex-col`}
            >
              {pkg.tag && (
                <div className={`absolute top-0 right-0 bg-gradient-to-l ${pkg.color} text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl`}>
                  {pkg.tag}
                </div>
              )}

              {/* Card top gradient strip */}
              <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-3xl font-extrabold">IDR {pkg.priceIDR}</span>
                </div>
                <p className="text-white/70 text-sm mt-1">{pkg.priceNote}</p>
                <div className="flex gap-4 mt-4 text-sm text-white/90">
                  <span>🤿 {pkg.dives} dive{pkg.dives > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Includes list */}
              <div className="p-6 flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">What's included</p>
                <ul className="space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6">
                <Link
                  to="/book"
                  className={`block w-full text-center bg-gradient-to-r ${pkg.color} text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity`}
                >
                  Book This Package
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-sm">
          All prices based on double occupancy. Single supplement available.&nbsp;
          <Link to="/book" className="text-blue-600 hover:underline font-medium">Custom package? Contact us.</Link>
        </p>

      </div>
    </section>
  );
};

export default StayDivePackages;
