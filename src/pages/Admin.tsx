import AdminPagesManager from '../components/AdminPagesManager';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DiveSiteReports from './DiveSiteReports';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface KtdBooking {
  id: number;
  booking_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  item_title: string;
  status: string;
  deposit_amount?: number;
  total_amount?: number;
  notes?: string;
}

const Admin = () => {
  const { t } = useTranslation();
  const jiraEmbedUrl = import.meta.env.VITE_JIRA_EMBED_URL || '';
  const jiraProjectUrl = import.meta.env.VITE_JIRA_PROJECT_URL || jiraEmbedUrl || 'https://divinginasia.atlassian.net';
  const [activeTab, setActiveTab] = useState<'bookings' | 'pages' | 'project-manager' | 'dive-reports'>('bookings');
  const [bookings, setBookings] = useState<KtdBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [bookingSearch, setBookingSearch] = useState('');

  useEffect(() => {
    if (activeTab !== 'bookings') return;
    setBookingsLoading(true);
    setBookingsError(null);
    const wpBase = (import.meta.env.VITE_WP_API_BASE || '').replace(/\/+$/, '');
    const apiKey = import.meta.env.VITE_WP_BOOKING_API_KEY || '';
    fetch(`${wpBase}/wp-json/ktd/v1/bookings?per_page=200`, {
      headers: { 'X-KTD-API-Key': apiKey },
    })
      .then(r => r.json())
      .then(data => {
        const rows: KtdBooking[] = Array.isArray(data) ? data : (data.bookings || []);
        setBookings(rows);
      })
      .catch(() => setBookingsError('Could not load bookings from WordPress.'))
      .finally(() => setBookingsLoading(false));
  }, [activeTab]);

  const tabs = [
    { key: 'bookings' as const, label: t('admin.tab_bookings', { defaultValue: 'Bookings' }) },
    { key: 'pages' as const, label: t('admin.tab_pages', { defaultValue: 'Page Content' }) },
    { key: 'project-manager' as const, label: t('admin.tab_project_manager', { defaultValue: 'Project Manager' }) },
    { key: 'dive-reports' as const, label: 'Dive Site Reports' },
  ];

  return (
    <div className="min-h-[80vh] bg-slate-100">
      <header className="relative overflow-hidden border-b border-slate-800/40 bg-[#0e1a2b] text-slate-100 shadow-xl">
        <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-6 py-8">
          <div className="absolute right-6 top-4">
            <LanguageSwitcher />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Operations Console</p>
          <h1 className="text-3xl font-bold tracking-wide">{t('admin.dashboard_title', { defaultValue: 'Admin Dashboard' })}</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-6 py-6">
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Bookings</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">KTD Bookings</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Content</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">Page Editor</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Workflow</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">Project Manager</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Community</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">Dive Site Reports</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === tab.key ? 'bg-slate-900 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://lightsalmon-dinosaur-377714.hostingersite.com/wp-admin"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
              WP Admin
            </a>
            <a
              href="/"
              className="inline-block rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-900"
            >
              {t('admin.back_to_main_page', { defaultValue: 'Back to Main Page' })}
            </a>
          </div>
        </div>

        {activeTab === 'bookings' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Bookings</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search name, email, item..."
                  value={bookingSearch}
                  onChange={e => setBookingSearch(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => {
                    setBookingsLoading(true);
                    setBookingsError(null);
                    const wpBase = (import.meta.env.VITE_WP_API_BASE || '').replace(/\/+$/, '');
                    const apiKey = import.meta.env.VITE_WP_BOOKING_API_KEY || '';
                    fetch(`${wpBase}/wp-json/ktd/v1/bookings?per_page=200`, { headers: { 'X-KTD-API-Key': apiKey } })
                      .then(r => r.json())
                      .then(data => setBookings(Array.isArray(data) ? data : (data.bookings || [])))
                      .catch(() => setBookingsError('Could not load bookings.'))
                      .finally(() => setBookingsLoading(false));
                  }}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
                >
                  Refresh
                </button>
              </div>
            </div>
            {bookingsLoading && <p className="py-8 text-center text-sm text-slate-500">Loading bookings...</p>}
            {bookingsError && <p className="py-4 text-center text-sm text-red-500">{bookingsError}</p>}
            {!bookingsLoading && !bookingsError && (() => {
              const filtered = bookings.filter(b => {
                if (!bookingSearch) return true;
                const q = bookingSearch.toLowerCase();
                return (
                  (b.customer_name || '').toLowerCase().includes(q) ||
                  (b.customer_email || '').toLowerCase().includes(q) ||
                  (b.item_title || '').toLowerCase().includes(q)
                );
              });
              return filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-400">No bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        {['Date', 'Name', 'Email', 'Phone', 'Item', 'Status', 'Deposit', 'Total'].map(h => (
                          <th key={h} className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap px-3 py-2 text-slate-600">{b.booking_date ? new Date(b.booking_date).toLocaleDateString() : '—'}</td>
                          <td className="px-3 py-2 font-medium text-slate-900">{b.customer_name || '—'}</td>
                          <td className="px-3 py-2 text-slate-600">{b.customer_email || '—'}</td>
                          <td className="px-3 py-2 text-slate-600">{b.customer_phone || '—'}</td>
                          <td className="px-3 py-2 text-slate-700">{b.item_title || '—'}</td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                              b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              b.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>{b.status || 'new'}</span>
                          </td>
                          <td className="px-3 py-2 text-slate-600">{b.deposit_amount ? `฿${b.deposit_amount.toLocaleString()}` : '—'}</td>
                          <td className="px-3 py-2 text-slate-600">{b.total_amount ? `฿${b.total_amount.toLocaleString()}` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <AdminPagesManager />
          </div>
        )}

        {activeTab === 'dive-reports' && (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
            <DiveSiteReports />
          </div>
        )}

        {activeTab === 'project-manager' && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Project Manager</h2>
                <p className="text-sm text-slate-600">
                  {t('admin.project_manager_jira_restriction', { defaultValue: 'Jira cannot be embedded due to Atlassian restrictions. Please use the button below to open the Jira project board in a new tab.' })}
                </p>
              </div>
              <a
                href={jiraProjectUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {t('admin.open_jira', { defaultValue: 'Open Jira' })}
              </a>
            </div>
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
              {t('admin.project_manager_embedding_not_supported', { defaultValue: '(Direct embedding is not supported by Jira. Use the button above to access your board.)' })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;