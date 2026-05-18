import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenCheck, ChartNoAxesCombined, FolderKanban, LogOut, ShieldCheck, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import AdminBookings from '../components/AdminBookings';
import FinanceSummary from '../components/FinanceSummary';
import AdminUsersManager from '../components/AdminUsersManager';

function ProjectTab({ jiraProjectUrl, trelloBoardUrl }: { jiraProjectUrl: string; trelloBoardUrl: string }) {
  const [exporting, setExporting] = useState(false);
  const [exportingJira, setExportingJira] = useState(false);
  const [exportResult, setExportResult] = useState<string | null>(null);

  async function handleExport() {
    setExporting(true);
    setExportResult(null);
    try {
      const token = window.localStorage.getItem('admin_login_token') || window.sessionStorage.getItem('admin_login_token') || import.meta.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN || '';
      const res = await fetch('/api/admin-bookings?action=export-to-trello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-login-token': token },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setExportResult(data.message || (res.ok ? 'Export complete.' : data.error));
    } catch {
      setExportResult('Export failed. Check your network or Trello credentials.');
    } finally {
      setExporting(false);
    }
  }

  async function handleJiraExport() {
    setExportingJira(true);
    setExportResult(null);
    try {
      const token = window.localStorage.getItem('admin_login_token') || window.sessionStorage.getItem('admin_login_token') || import.meta.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN || '';
      const res = await fetch('/api/admin-bookings?action=export-to-jira', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-login-token': token },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setExportResult(data.message || (res.ok ? 'Jira export complete.' : data.error));
    } catch {
      setExportResult('Jira export failed. Check your network or Jira credentials.');
    } finally {
      setExportingJira(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Project Management</h2>
        <p className="mt-1 text-sm text-slate-600">Use Jira and Trello boards for planning and tracking.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={jiraProjectUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Open Jira
          </a>
          <a href={trelloBoardUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center rounded bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
            Open Trello
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-semibold text-slate-900">Export Bookings to Jira</h3>
        <p className="mt-1 text-sm text-slate-600">
          Creates a Jira issue for every booking in your database.
          Requires <code className="rounded bg-slate-200 px-1 text-xs">JIRA_EMAIL</code>,{' '}
          <code className="rounded bg-slate-200 px-1 text-xs">JIRA_API_TOKEN</code>, and{' '}
          <code className="rounded bg-slate-200 px-1 text-xs">JIRA_PROJECT_KEY</code> set in Vercel.
        </p>
        <button
          onClick={handleJiraExport}
          disabled={exportingJira}
          className="mt-3 inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {exportingJira ? 'Exporting to Jira...' : 'Export all bookings to Jira'}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-semibold text-slate-900">Export Bookings to Trello</h3>
        <p className="mt-1 text-sm text-slate-600">
          Creates a Trello card for every booking in your database.
          Requires <code className="rounded bg-slate-200 px-1 text-xs">TRELLO_API_KEY</code>,{' '}
          <code className="rounded bg-slate-200 px-1 text-xs">TRELLO_TOKEN</code>, and{' '}
          <code className="rounded bg-slate-200 px-1 text-xs">TRELLO_LIST_ID</code> set in Vercel.
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="mt-3 inline-flex items-center justify-center rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-60"
        >
          {exporting ? 'Exporting to Trello...' : 'Export all bookings to Trello'}
        </button>
        {exportResult && (
          <p className="mt-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">{exportResult}</p>
        )}
      </div>
    </div>
  );
}

const Admin = () => {
  const navigate = useNavigate();
  const jiraProjectUrl = import.meta.env.VITE_JIRA_PROJECT_URL || 'https://divinginasia.atlassian.net';
  const trelloBoardUrl = import.meta.env.VITE_TRELLO_BOARD_URL || 'https://trello.com';

  const handleLogout = () => {
    window.localStorage.removeItem('admin_authenticated');
    window.localStorage.removeItem('admin_login_token');
    window.localStorage.removeItem('admin_view_token');
    sessionStorage.removeItem('admin_login_token');
    sessionStorage.removeItem('admin_view_token');
    toast.success('Logged out successfully');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Admin</p>
            <h1 className="text-2xl font-bold text-slate-900">Operations Control Center</h1>
            <p className="mt-1 text-sm text-slate-600">Bookings, finance tracking, and team access in one place.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
        <section className="mb-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sky-700">
              <BookOpenCheck className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">Bookings</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">Manage all inquiries, payment states, and follow-up notes.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700">
              <ChartNoAxesCombined className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">Finance</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">Track totals, outstanding amounts, and booking volume.</p>
          </div>
          <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-violet-700">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">Access</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">Control admin/user roles with full audit visibility.</p>
          </div>
        </section>

        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
            <TabsTrigger value="bookings" className="gap-2 rounded-lg px-4 py-2">
              <BookOpenCheck className="h-4 w-4" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2 rounded-lg px-4 py-2">
              <ChartNoAxesCombined className="h-4 w-4" /> Finance
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 rounded-lg px-4 py-2">
              <UsersRound className="h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="project" className="gap-2 rounded-lg px-4 py-2">
              <FolderKanban className="h-4 w-4" /> Project
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-0 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <AdminBookings />
          </TabsContent>

          <TabsContent value="finance" className="mt-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <FinanceSummary />
          </TabsContent>

          <TabsContent value="users" className="mt-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <AdminUsersManager />
          </TabsContent>

          <TabsContent value="project" className="mt-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <ProjectTab jiraProjectUrl={jiraProjectUrl} trelloBoardUrl={trelloBoardUrl} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;