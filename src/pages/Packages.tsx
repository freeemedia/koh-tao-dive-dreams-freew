import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const packages = [
  {
    name: 'Weekend Diver',
    dives: 2,
    nights: 2,
    price: 'IDR 1,200,000',
    usd: '~$74',
    perks: ['2 fun dives', 'Full equipment', 'Boat & guide', 'Dive briefing'],
  },
  {
    name: 'Lembongan Explorer',
    dives: 5,
    nights: 3,
    price: 'IDR 2,500,000',
    usd: '~$154',
    perks: ['5 fun dives', 'Full equipment', 'Boat & guide', 'Dive log', 'Free nitrox fill'],
    popular: true,
  },
  {
    name: 'Dive Addict',
    dives: 10,
    nights: 5,
    price: 'IDR 4,500,000',
    usd: '~$277',
    perks: ['10 fun dives', 'Full equipment', 'Boat & guide', 'Dive log', 'Free nitrox', 'Night dive included'],
  },
]

export default function Packages() {
  const { t } = useTranslation()
  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('packages.title')}</h1>
        <p className="text-lg text-blue-100 max-w-xl mx-auto">{t('packages.sub')}</p>
      </section>

      {/* Early bird */}
      <div className="bg-[#f4845f] text-white text-center py-3 px-4 text-sm font-bold">
        {t('packages.earlyBird')}
      </div>

      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map(p => (
              <div key={p.name} className={`rounded-2xl p-8 shadow-sm relative ${p.popular ? 'bg-[#023e8a] text-white ring-4 ring-[#f4845f]' : 'bg-white text-[#023e8a]'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f4845f] text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-xl font-extrabold mb-2">{p.name}</h3>
                <div className={`text-3xl font-extrabold mb-1 ${p.popular ? 'text-[#00b4d8]' : 'text-[#0077b6]'}`}>{p.price}</div>
                <div className="text-sm opacity-60 mb-6">{p.usd} USD</div>
                <ul className="space-y-2 mb-8">
                  {p.perks.map(perk => (
                    <li key={perk} className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <Link to="/book" className={p.popular ? 'btn-primary block text-center' : 'block text-center border-2 border-[#0077b6] text-[#0077b6] font-bold px-6 py-3 rounded-full hover:bg-[#0077b6] hover:text-white transition-all'}>
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">All prices in IDR. Custom packages available — contact us.</p>
        </div>
      </section>
    </>
  )
}
