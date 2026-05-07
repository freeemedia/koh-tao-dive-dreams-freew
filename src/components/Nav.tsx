import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LangSwitcher from './LangSwitcher'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', tKey: 'nav.home' },
  { to: '/fun-diving', tKey: 'nav.funDiving' },
  { to: '/packages', tKey: 'nav.packages' },
  { to: '/contact', tKey: 'nav.contact' },
]

export default function Nav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#023e8a]/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-white font-extrabold text-xl tracking-wide">🤿 Lembongan</span>
          <span className="text-[#00b4d8] text-xs font-semibold tracking-widest uppercase">Watersports</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-[#00b4d8]' : 'text-white hover:text-[#00b4d8]'}`
              }
            >
              {t(l.tKey)}
            </NavLink>
          ))}
          <Link to="/book" className="btn-primary text-sm px-5 py-2">{t('nav.bookNow')}</Link>
          <LangSwitcher />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#023e8a] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold ${isActive ? 'text-[#00b4d8]' : 'text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/book" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Book Now</Link>
        </div>
      )}
    </header>
  )
}
