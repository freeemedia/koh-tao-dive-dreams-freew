import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const contactEmail = import.meta.env.VITE_ADMIN_EMAILS || 'admin@lembonganwatersports.com'

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white text-center px-4">
        <h1 className="text-4xl font-extrabold mb-4">{t('contact.title')}</h1>
        <p className="text-blue-100 max-w-md mx-auto">{t('contact.sub')}</p>
      </section>
      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-lg mx-auto px-4 text-center space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="font-bold text-[#023e8a] mb-1">Location</h3>
            <p className="text-gray-500 text-sm">Jungutbatu Beach, Nusa Lembongan, Bali, Indonesia</p>
          </div>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl shadow-sm transition-colors w-full">
            💬 {t('contact.whatsapp')}
          </a>
          <a href={`mailto:${contactEmail}`}
            className="flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-[#023e8a] font-bold px-8 py-4 rounded-2xl shadow-sm border border-blue-100 transition-colors w-full">
            📧 {t('contact.email')}
          </a>
        </div>
      </section>
    </>
  )
}
