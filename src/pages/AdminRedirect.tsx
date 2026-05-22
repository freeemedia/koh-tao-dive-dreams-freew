import { useEffect } from 'react'

const fallbackAdminUrl =
  'https://admin.lembonganwatersports.com/wp-admin/admin.php?page=ktd-dashboard'

export default function AdminRedirect() {
  const targetUrl = (import.meta.env.VITE_ADMIN_PANEL_URL || fallbackAdminUrl).trim()

  useEffect(() => {
    window.location.replace(targetUrl)
  }, [targetUrl])

  return (
    <section className="pt-24 pb-16 px-4 text-center">
      <h1 className="text-2xl font-bold mb-3">Redirecting to admin...</h1>
      <p className="text-gray-600 mb-5">
        If you are not redirected automatically, use the button below.
      </p>
      <a
        href={targetUrl}
        className="inline-block bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold px-6 py-3 rounded-full"
      >
        Open Admin Dashboard
      </a>
    </section>
  )
}
