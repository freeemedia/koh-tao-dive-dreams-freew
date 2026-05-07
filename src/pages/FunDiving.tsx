import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const sites = [
  { name: 'Crystal Bay', icon: '🐠', desc: 'Famous for Mola Mola (ocean sunfish) Aug–Oct. Stunning coral gardens.', depth: '5–40m', level: 'Advanced' },
  { name: 'Manta Point', icon: '🦁', desc: 'Year-round manta ray sightings. One of Bali\'s most iconic dives.', depth: '3–20m', level: 'All levels' },
  { name: 'SD Point', icon: '🐢', desc: 'Green turtles, soft corals and macro life. Perfect for photography.', depth: '5–25m', level: 'Beginner' },
  { name: 'Gamat Bay', icon: '🐡', desc: 'Calm, sheltered bay with rich marine life. Great for first dives.', depth: '5–18m', level: 'Beginner' },
  { name: 'Toyapakeh', icon: '🌊', desc: 'Drift dive along a dramatic wall packed with reef fish.', depth: '5–30m', level: 'Intermediate' },
  { name: 'Mangrove Point', icon: '🦑', desc: 'Unique mangrove ecosystem. Seahorses, pipefish & nudis.', depth: '3–15m', level: 'All levels' },
]

export default function FunDiving() {
  const { t } = useTranslation()
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('funDiving.title')}</h1>
        <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">{t('funDiving.sub')}</p>
        <Link to="/book" className="btn-primary">{t('nav.bookNow')}</Link>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center">Dive Prices</h2>
          <p className="text-center text-gray-400 text-sm mb-2">{t('funDiving.includes')}</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { label: t('funDiving.single'), price: 'IDR 450,000', usd: '~$28', popular: false },
              { label: t('funDiving.pack5'), price: 'IDR 2,000,000', usd: '~$123', popular: true },
              { label: t('funDiving.pack10'), price: 'IDR 3,600,000', usd: '~$220', popular: false },
            ].map(p => (
              <div key={p.label} className={`rounded-2xl p-8 text-center shadow-sm relative ${p.popular ? 'bg-[#023e8a] text-white ring-4 ring-[#f4845f]' : 'bg-white text-[#023e8a]'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f4845f] text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>}
                <h3 className="font-bold text-lg mb-4">{p.label}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${p.popular ? 'text-[#00b4d8]' : 'text-[#0077b6]'}`}>{p.price}</div>
                <div className="text-sm opacity-70 mb-6">{p.usd} USD</div>
                <Link to="/book" className={p.popular ? 'btn-primary' : 'btn-outline border-[#0077b6] text-[#0077b6] hover:bg-[#0077b6] hover:text-white font-bold px-6 py-3 rounded-full transition-all border-2 inline-block'}>
                  Book Now
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">🌅 Early bird discount: book 7+ days ahead & save 10%</p>
        </div>
      </section>

      {/* Dive Sites */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title text-center">Our Dive Sites</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {sites.map(s => (
              <div key={s.name} className="border border-blue-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#023e8a] mb-1">{s.name}</h3>
                <div className="flex gap-3 text-xs text-gray-400 mb-3">
                  <span>📏 {s.depth}</span>
                  <span>👤 {s.level}</span>
                </div>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
