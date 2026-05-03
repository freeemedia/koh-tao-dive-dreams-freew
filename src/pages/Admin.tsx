import AdminPagesManager from '../components/AdminPagesManager';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DiveSiteReports from './DiveSiteReports';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const { t } = useTranslation();
  const jiraEmbedUrl = import.meta.env.VITE_JIRA_EMBED_URL || '';
  const jiraProjectUrl = import.meta.env.VITE_JIRA_PROJECT_URL || jiraEmbedUrl || 'https://divinginasia.atlassian.net';
  const fluentFormsUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com/?fluent_forms_pages=1&design_mode=1&preview_id=3';
  const [activeTab, setActiveTab] = useState<'bookings' | 'pages' | 'project-manager' | 'dive-reports'>('bookings');

  const tabs = [
    { key: 'bookings' as const, label: t('admin.tab_bookings', { defaultValue: 'Fluent Forms' }) },
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
            <p className="mt-2 text-xl font-semibold text-slate-900">Fluent Forms Entries</p>
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
              href={fluentFormsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
              Fluent Forms
            </a>
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
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">Bookings are managed via Fluent Forms.</p>
              <a
                href={fluentFormsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Open in new tab
              </a>
            </div>
            <iframe
              src={fluentFormsUrl}
              title="Fluent Forms Bookings"
              className="h-[70vh] w-full rounded-xl border border-slate-200"
            />
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