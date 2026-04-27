import AdminBookings from '../components/AdminBookings';
import AdminPagesManager from '../components/AdminPagesManager';
import AdminUsersManager from '../components/AdminUsersManager';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';




// Remove static sectionKeyList, use dynamic fetching

const Admin = () => {
  // Tab navigation UI
  // Add more admin tabs here
  const tabs = [
    { key: 'bookings', label: 'Bookings' },
    { key: 'pages', label: 'Pages Manager' },
    { key: 'project-manager', label: 'Project Manager' },
  ];
  const jiraEmbedUrl = import.meta.env.VITE_JIRA_EMBED_URL || '';
  const jiraProjectUrl = import.meta.env.VITE_JIRA_PROJECT_URL || jiraEmbedUrl || 'https://divinginasia.atlassian.net';
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [commentDraft, setCommentDraft] = useState('');
  const [savingComment, setSavingComment] = useState(false);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeLoading, setFinanceLoading] = useState(false);
  const [financeSaving, setFinanceSaving] = useState(false);
  const [financeDraft, setFinanceDraft] = useState<Record<string, string>>({
    paypal_link: 'https://paypal.me/prodivingasia',
    course_deposit_rate: '0.2',
    default_deposit_amount: '',
    bank_transfer_details: '',
  });

  const FINANCE_SLUG = 'admin-finance';
  const FINANCE_LOCALE = 'en';
  const financeFields: Array<{ key: string; label: string; multiline?: boolean; placeholder?: string }> = [
    { key: 'paypal_link', label: 'PayPal Link', placeholder: 'https://paypal.me/prodivingasia' },
    { key: 'course_deposit_rate', label: 'Course Deposit Rate', placeholder: '0.2' },
    { key: 'default_deposit_amount', label: 'Default Deposit Amount', placeholder: 'e.g. 2500' },
    { key: 'bank_transfer_details', label: 'Bank Transfer Details', multiline: true, placeholder: 'Bank name, account number, IBAN/SWIFT...' },
  ];

  const loadFinanceSettings = async () => {
    setFinanceLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('section_key,content_value')
        .eq('page_slug', FINANCE_SLUG)
        .eq('locale', FINANCE_LOCALE);

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        const next = { ...financeDraft };
        data.forEach((row: any) => {
          if (row?.section_key) {
            next[row.section_key] = row.content_value || '';
          }
        });
        setFinanceDraft(next);
      }
    } catch (err) {
      console.error('Failed to load finance settings:', err);
    } finally {
      setFinanceLoading(false);
    }
  };

  const saveFinanceSettings = async () => {
    setFinanceSaving(true);
    try {
      const rows = financeFields.map((field) => ({
        page_slug: FINANCE_SLUG,
        locale: FINANCE_LOCALE,
        section_key: field.key,
        content_type: field.multiline ? 'textarea' : 'text',
        content_value: financeDraft[field.key] || '',
      }));

      const { error } = await supabase
        .from('page_content')
        .upsert(rows, { onConflict: 'page_slug,section_key,locale' });

      if (error) throw error;
      setFinanceModalOpen(false);
    } catch (err) {
      alert('Error saving finance settings: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setFinanceSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'comments') {
      setLoading(true);
      async function fetchBookings() {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          const token = session?.access_token;
          if (!token) throw new Error('Not authenticated');
          const res = await fetch('/api/bookings', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch bookings');
          const data = await res.json();
          setBookings(data);
        } catch (err) {
          setBookings([]);
        } finally {
          setLoading(false);
        }
      }
      fetchBookings();
    }
  }, [activeTab]);

  // When a booking is selected in comments tab, set draft
  useEffect(() => {
    if (activeTab === 'comments' && selectedBookingId) {
      const b = bookings.find(b => b.id === selectedBookingId);
      setCommentDraft(b?.internal_notes || '');
    }
  }, [selectedBookingId, bookings, activeTab]);

  useEffect(() => {
    if (financeModalOpen) {
      loadFinanceSettings();
    }
  }, [financeModalOpen]);

  const handleSaveComment = async () => {
    if (!selectedBookingId) return;
    setSavingComment(true);
    try {
      const res = await fetch(`/api/booking_inquiries?id=${selectedBookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: commentDraft }),
      });
      if (!res.ok) throw new Error('Failed to save comment');
      setBookings(prev => prev.map(b => b.id === selectedBookingId ? { ...b, internal_notes: commentDraft } : b));
    } catch (e) {
      alert('Error saving comment: ' + (e instanceof Error ? e.message : e));
    } finally {
      setSavingComment(false);
    }
  };


  return (


    <div className="min-h-[80vh] pt-[10px] bg-gradient-to-br from-blue-50 to-emerald-50">
      <header className="w-full py-8 mb-8 bg-gradient-to-r from-blue-700 to-emerald-600 shadow-lg text-white rounded-b-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-wide mb-2">Admin Dashboard</h1>
        <p className="text-lg opacity-80">Manage bookings, pages, and more</p>
      </header>
      {/* Centered horizontal tab row with more spacing */}
      <div className="flex flex-col items-center mb-8">
        <nav className="flex flex-row gap-6 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-7 py-3 text-base font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10 ${activeTab === tab.key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab(tab.key)}
              style={{ minWidth: 160 }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setFinanceModalOpen(true)}
          className="mt-4 rounded bg-emerald-600 px-5 py-2 text-base font-semibold text-white hover:bg-emerald-700 shadow"
        >
          Global Finance Defaults
        </button>
        <a
          href="/"
          className="mt-4 inline-block rounded bg-gray-500 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700 shadow"
        >
          Back to Main Page
        </a>
      </div>
      {/* Main Content */}
      <div className="full-width">
        <Dialog open={financeModalOpen} onOpenChange={setFinanceModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Global Finance Defaults</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {financeLoading ? (
                <div className="text-sm text-gray-500">Loading finance settings...</div>
              ) : (
                financeFields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                    {field.multiline ? (
                      <textarea
                        value={financeDraft[field.key] || ''}
                        onChange={(e) => setFinanceDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        rows={4}
                        placeholder={field.placeholder || ''}
                        className="w-full rounded border border-gray-300 p-2"
                      />
                    ) : (
                      <input
                        value={financeDraft[field.key] || ''}
                        onChange={(e) => setFinanceDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder || ''}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                      />
                    )}
                  </div>
                ))
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFinanceModalOpen(false)}
                  className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveFinanceSettings}
                  disabled={financeSaving || financeLoading}
                  className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {financeSaving ? 'Saving...' : 'Save Finance Settings'}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div style={{ width: '100%' }}>
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              <AdminBookings />
            </div>
          )}
          {activeTab === 'pages' && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              <React.Suspense fallback={<div>Loading Pages Manager...</div>}>
                <AdminPagesManager />
              </React.Suspense>
            </div>
          )}
          {activeTab === 'project-manager' && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Project Manager</h2>
                  <p className="text-sm text-gray-600">
                    Jira cannot be embedded due to Atlassian restrictions. Please use the button below to open the Jira project board in a new tab.
                  </p>
                </div>
                <a
                  href={jiraProjectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Open Jira
                </a>
              </div>
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
                (Direct embedding is not supported by Jira. Use the button above to access your board.)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
