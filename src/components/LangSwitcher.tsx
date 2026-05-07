import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'ru', label: 'RU' },
]

export default function LangSwitcher() {
  const { i18n } = useTranslation()
  return (
    <div className="flex gap-1">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => i18n.changeLanguage(l.code)}
          className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
            i18n.language === l.code
              ? 'bg-[#00b4d8] text-white'
              : 'text-blue-200 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
