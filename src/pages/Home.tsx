import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const dives = [
  { icon: '🐠', name: 'Crystal Bay', depth: '5–40m', highlight: 'Mola Mola season Aug–Oct' },
  { icon: '🦁', name: 'Manta Point', depth: '3–20m', highlight: 'Manta rays year round' },
  { icon: '🐢', name: 'SD Point', depth: '5–25m', highlight: 'Turtles & soft corals' },
  { icon: '🐡', name: 'Gamat Bay', depth: '5–18m', highlight: 'Ideal for beginners' },
]

const funDivePrices = [
  { label: 'Single Fun Dive', price: 'IDR 450,000', usd: '~$28', icon: '🤿' },
  { label: '5-Dive Pack', price: 'IDR 2,000,000', usd: '~$123', icon: '🎯', popular: true },
  { label: '10-Dive Pack', price: 'IDR 3,600,000', usd: '~$220', icon: '🏆' },
]

const bedToBoat = [
  {
    name: 'Weekend Escape',
    nights: 2, dives: 4,
    price: 'IDR 3,200,000',
    usd: '~$197',
    perks: ['2 nights accommodation', '4 fun dives', 'Full equipment', 'Daily breakfast', 'Boat transfers'],
  },
  {
    name: 'Lembongan Explorer',
    nights: 4, dives: 8,
    price: 'IDR 5,800,000',
    usd: '~$357',
    perks: ['4 nights accommodation', '8 fun dives', 'Full equipment', 'Daily breakfast', 'Night dive', 'Free nitrox'],
    popular: true,
  },
  {
    name: 'Dive & Stay Week',
    nights: 6, dives: 14,
    price: 'IDR 9,500,000',
    usd: '~$584',
    perks: ['6 nights accommodation', '14 fun dives', 'Full equipment', 'All meals', 'Night dive', 'Free nitrox', 'Dive photo package'],
  },
]

function EarlyBirdCountdown() {
  const [days, setDays] = useState(7)
  useEffect(() => {
    const target = new Date()
    target.setDate(target.getDate() + 7)
    const update = () => {
      const diff = target.getTime() - Date.now()
      setDays(Math.max(0, Math.ceil(diff / 86400000)))
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold">
      ⏱ Book within <span className="text-yellow-300">{days} days</span> to save 10%
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#023e8a] via-[#0077b6] to-[#00b4d8]">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lembonngannwatersports.lovable.app/assets/hero-lembongan-C3W83fkC.jpg')" }} />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto pt-20">
          <div className="inline-block bg-[#f4845f] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            🌊 Nusa Lembongan, Bali, Indonesia
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-xl mx-auto">
            {t('hero.sub')}
          </p>
          <div className="mb-8">
            <EarlyBirdCountdown />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="btn-primary">{t('hero.cta')}</Link>
            <Link to="/book" className="btn-outline">{t('hero.cta2')}</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white text-2xl">↓</div>
      </section>

      {/* ── EARLY BIRD BANNER ── */}
      <div className="bg-[#f4845f] text-white py-3 px-4 text-center text-sm font-bold">
        🌅 Early Bird Deal — Book 7+ days in advance & save 10% on all packages
      </div>

      {/* ── FUN DIVE PRICES ── */}
      <section id="fun-diving" className="py-20 bg-[#f0f9ff]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Fun Diving</h2>
          <p className="section-sub">Daily boat dives to Lembongan's best sites — equipment included</p>
          <div className="grid md:grid-cols-3 gap-6">
            {funDivePrices.map(p => (
              <div key={p.label} className={`rounded-2xl p-8 relative shadow-sm ${p.popular ? 'bg-[#023e8a] text-white ring-4 ring-[#f4845f]' : 'bg-white text-[#023e8a]'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f4845f] text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>}
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-lg mb-3">{p.label}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${p.popular ? 'text-[#00b4d8]' : 'text-[#0077b6]'}`}>{p.price}</div>
                <div className="text-sm opacity-60 mb-6">{p.usd} USD</div>
                <Link to="/book" className={p.popular ? 'btn-primary' : 'inline-block border-2 border-[#0077b6] text-[#0077b6] font-bold px-6 py-2.5 rounded-full hover:bg-[#0077b6] hover:text-white transition-all'}>
                  Book Now
                </Link>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-6">Includes: boat, guide, tank & weights. BCD/wetsuit available. Price in IDR.</p>
        </div>
      </section>

      {/* ── BED TO BOAT ── */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Bed to Boat Packages</h2>
          <p className="section-sub">Stay & dive combos — everything included from arrival to last dive</p>
          <div className="grid md:grid-cols-3 gap-8">
            {bedToBoat.map(p => (
              <div key={p.name} className={`rounded-2xl p-8 shadow-sm relative ${p.popular ? 'bg-[#023e8a] text-white ring-4 ring-[#f4845f]' : 'bg-[#f0f9ff] text-[#023e8a]'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f4845f] text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <div className="text-sm font-bold mb-1 opacity-60">{p.nights} nights · {p.dives} dives</div>
                <h3 className="text-xl font-extrabold mb-3">{p.name}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${p.popular ? 'text-[#00b4d8]' : 'text-[#0077b6]'}`}>{p.price}</div>
                <div className="text-sm opacity-60 mb-6">{p.usd} USD per person</div>
                <ul className="space-y-1.5 text-left mb-8">
                  {p.perks.map(perk => (
                    <li key={perk} className="flex items-center gap-2 text-sm">
                      <span className="text-green-400 font-bold">✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <Link to="/book" className={p.popular ? 'btn-primary block text-center' : 'block text-center border-2 border-[#0077b6] text-[#0077b6] font-bold px-6 py-3 rounded-full hover:bg-[#0077b6] hover:text-white transition-all'}>
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Why Dive with Us?</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { icon: '🤿', title: 'Expert Guides', desc: 'PADI certified, 10+ years on Lembongan reefs' },
              { icon: '🚤', title: 'Daily Trips', desc: 'Morning & afternoon departures' },
              { icon: '👥', title: 'Small Groups', desc: 'Max 6 divers per guide' },
              { icon: '🎽', title: 'Full Equipment', desc: 'All gear included in price' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#023e8a] mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVE SITES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Top Dive Sites</h2>
          <p className="section-sub">World-class diving right on your doorstep</p>
          <div className="grid md:grid-cols-4 gap-6">
            {dives.map(d => (
              <div key={d.name} className="bg-gradient-to-b from-[#e0f7ff] to-[#f0f9ff] rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-3">{d.icon}</div>
                <h3 className="font-bold text-[#023e8a] mb-1">{d.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{d.depth}</p>
                <p className="text-sm text-gray-600">{d.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#f4845f]">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Ready to dive in?</h2>
          <p className="text-lg mb-8 opacity-90">Limited spots daily — book now to secure your place</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="bg-white text-[#f4845f] font-extrabold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
              Book Now →
            </Link>
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-extrabold px-8 py-4 rounded-full transition-colors shadow-lg">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
