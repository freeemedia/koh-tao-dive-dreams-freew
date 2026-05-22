import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function BookNow() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const apiBase = (import.meta.env.VITE_API_BASE_URL || 'https://api.lembonganwatersports.com')
    .trim()
    .replace(/\/+$/, '')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', divers: '1', type: 'Fun Dive', message: ''
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferred_date: form.date,
          course_title: form.type,
          message: form.divers !== '1'
            ? `Divers: ${form.divers}${form.message ? '. ' + form.message : ''}`
            : form.message,
          status: 'pending',
        }),
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()
      const isJson = contentType.includes('application/json')

      if ((res.ok || res.status === 201) && isJson) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', date: '', divers: '1', type: 'Fun Dive', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('booking.title')}</h1>
        <p className="text-blue-100 max-w-md mx-auto">Fill in the form and we'll confirm your booking via WhatsApp.</p>
      </section>

      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-lg mx-auto px-4">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-green-700 mb-2">{t('booking.success')}</h2>
              <a href="https://wa.me/628123456789" className="inline-block mt-4 bg-green-500 text-white font-bold px-6 py-3 rounded-full">
                💬 Open WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.name')} *</label>
                <input name="name" value={form.name} onChange={onChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.email')} *</label>
                <input name="email" type="email" value={form.email} onChange={onChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.phone')} *</label>
                <input name="phone" value={form.phone} onChange={onChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.date')} *</label>
                  <input name="date" type="date" value={form.date} onChange={onChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.divers')}</label>
                  <select name="divers" value={form.divers} onChange={onChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.type')}</label>
                <select name="type" value={form.type} onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]">
                  <option>Fun Dive</option>
                  <option>5-Dive Pack</option>
                  <option>10-Dive Pack</option>
                  <option>Weekend Package</option>
                  <option>Explorer Package</option>
                  <option>Dive Addict Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('booking.message')}</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" />
              </div>
              {status === 'error' && (
                <div className="text-red-500 text-sm">{t('booking.error')}</div>
              )}
              <button type="submit" disabled={status === 'sending'}
                className="w-full btn-primary justify-center disabled:opacity-60">
                {status === 'sending' ? t('booking.sending') : t('booking.submit')}
              </button>
            </form>
          )}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400 mb-3">Or book directly via WhatsApp</p>
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
