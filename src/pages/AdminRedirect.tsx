import { useEffect } from 'react';

const wpAdminUrl = `${(import.meta.env.VITE_WP_API_BASE || '').trim().replace(/\/$/, '')}/wp-admin/admin.php?page=ktd-bookings`;

const AdminRedirect = () => {
  useEffect(() => {
    window.location.replace(wpAdminUrl);
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-100 px-6">
      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Redirecting to WordPress bookings</h1>
        <p className="mt-3 text-sm text-slate-600">
          The real booking admin now lives in WordPress. If the redirect does not happen, use the links below.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={wpAdminUrl}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Open WordPress bookings
          </a>
          <a
            href="/admin"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open legacy tools
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminRedirect;