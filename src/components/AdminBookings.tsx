// AdminBookings.tsx
// Clean admin bookings table: shows Name, Email, Phone, Course, Date, Total, Deposit, To Be Paid, PayPal link.
// To add more columns or features, edit below. For comments or notes, add a new column and input logic as needed.

import React, { useEffect, useState } from 'react';
import FunDiveBooking from './FunDiveBooking';
import FinanceSection from './FinanceSection';
import BookingsCalendar from './BookingsCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

interface Booking {
  total_payable_now?: number | null;
  subtotal_amount?: number | null;
  id: string;
  name: string;
  email: string;
  course_title: string;
  preferred_date?: string;
  status: string;
  internal_notes?: string;
  created_at: string;
  phone?: string;
  deposit_amount?: number | null;
  total_amount?: number | null;
  due_amount?: number | null;
  bank_transfer_details?: string | null;
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [showFunDiveBook, setShowFunDiveBook] = useState(false);
  const [financeModalBook, setFinanceModalBook] = useState<Booking | null>(null);
  const [paypalLink, setPaypalLink] = useState('https://paypal.me/prodivingasia');
  const [bankTransferDetails, setBankTransferDetails] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteResult, setNoteResult] = useState<string | null>(null);
  const [bankTransferDraft, setBankTransferDraft] = useState('');
  const [bankTransferSaving, setBankTransferSaving] = useState(false);
  const [bankTransferResult, setBankTransferResult] = useState<string | null>(null);

  const [exporting, setExporting] = useState(false);
  const [exportResult, setExportResult] = useState<string | null>(null);
  const [copyResult, setCopyResult] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});
  const [jiraStatus, setJiraStatus] = useState<Record<string, string>>({});

  // Currency state
  const [currency, setCurrency] = useState<'THB' | 'USD' | 'EUR'>('THB');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({ THB: 1, USD: 1, EUR: 1 });

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=THB&symbols=THB,USD,EUR');
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates({
            THB: data.rates.THB || 1,
            USD: data.rates.USD || 1,
            EUR: data.rates.EUR || 1,
          });
        }
      } catch {
        // fallback: keep default rates
      }
    };
    fetchRates();
  }, []);

  // Currency conversion helper
  const convertCurrency = (amount: number | null | undefined, from: string = 'THB') => {
    if (!amount || !exchangeRates[from] || !exchangeRates[currency]) return '-';
    // Convert from base (THB) to USD, EUR, etc.
    const thbAmount = from === 'THB' ? amount : (amount / exchangeRates[from]) * exchangeRates['THB'];
    const converted = (thbAmount / exchangeRates['THB']) * exchangeRates[currency];
    return `${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };

  const copyBookDetails = async (book: Booking) => {
    const details = `Name: ${book.name}\nEmail: ${book.email}\nPhone: ${book.phone || '-'}\nCourse: ${book.course_title}\nDate: ${book.preferred_date || '-'}\nStatus: ${book.status}\nNotes: ${book.internal_notes || ''}`;
    try {
      await navigator.clipboard.writeText(details);
      setCopyStatus((prev) => ({ ...prev, [book.id]: 'Copied!' }));
    } catch {
      setCopyStatus((prev) => ({ ...prev, [book.id]: 'Copy failed!' }));
    }
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [book.id]: '' })), 2000);
  };

  const adminAuthedFetch = async (url: string, init?: RequestInit) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const adminLoginToken = window.localStorage.getItem('admin_login_token');

    if (!token && !adminLoginToken) {
      throw new Error('No authenticated admin session found');
    }

    const headers = new Headers(init?.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (adminLoginToken) {
      headers.set('x-admin-login-token', adminLoginToken);
    }
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return fetch(url, { ...init, headers });
  };

  const escalateToJira = async (book: Booking) => {
    setJiraStatus((prev) => ({ ...prev, [book.id]: 'Sending...' }));
    try {
      const res = await adminAuthedFetch('/api/create-jira-book', {
        method: 'POST',
        body: JSON.stringify({
          name: book.name,
          email: book.email,
          bookDetails: `Course: ${book.course_title}\nDate: ${book.preferred_date || '-'}\nPhone: ${book.phone || '-'}\nStatus: ${book.status}\nNotes: ${book.internal_notes || ''}`,
        }),
      });
      if (res.ok) {
        setJiraStatus((prev) => ({ ...prev, [book.id]: 'Escalated!' }));
      } else {
        setJiraStatus((prev) => ({ ...prev, [book.id]: 'Failed!' }));
      }
    } catch {
      setJiraStatus((prev) => ({ ...prev, [book.id]: 'Error!' }));
    }
    setTimeout(() => setJiraStatus((prev) => ({ ...prev, [book.id]: '' })), 3000);
  };

  const calendarFeedUrl = 'https://koh-tao-dive-dreams.vercel.app/api/bookings/calendar';

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin-bookings');
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.error || `HTTP ${res.status}`);
        }
        const data: Booking[] = await res.json();
        setBookings(data);
        const initialDrafts: Record<string, string> = {};
        data.forEach((booking: Booking) => {
          initialDrafts[booking.id] = booking.status || 'pending';
        });
        setStatusDrafts(initialDrafts);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  useEffect(() => {
    fetch('/api/get-page-content?page_slug=admin-finance&locale=en')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        const rows = Array.isArray(payload?.content) ? payload.content : [];
        if (!rows.length) return;
        if (Array.isArray(rows)) {
          rows.forEach((row: any) => {
            if (!row?.section_key) return;
            if (row.section_key === 'paypal_link' && row.content_value) setPaypalLink(row.content_value);
            if (row.section_key === 'bank_transfer_details' && row.content_value) setBankTransferDetails(row.content_value);
          });
        } else {
          console.error('Rows is not an array:', rows);
        }
      })
      .catch(() => {
        // Keep defaults if settings are unavailable.
      });
  }, []);

  const getPayableNow = (book: Booking) => {
    if (typeof book.total_payable_now === 'number' && book.total_payable_now > 0) return book.total_payable_now;
    if (typeof book.deposit_amount === 'number' && book.deposit_amount > 0) return book.deposit_amount;
    if (typeof book.total_amount === 'number' && book.total_amount > 0) return book.total_amount;
    return null;
  };

  const buildPayPalUrl = (book: Booking) => {
    const amount = getPayableNow(book);
    if (amount === null) return null;
    // Add account_id and site_id as query parameters for commission tracking
    const accountId = '7864578';
    const siteId = '295439656';
    return `${paypalLink}/${amount}?account_id=${accountId}&site_id=${siteId}`;
  };

  useEffect(() => {
    if (!financeModalBook) return;
    setNoteDraft(financeModalBook.internal_notes || '');
    setNoteResult(null);
    setBankTransferDraft(financeModalBook.bank_transfer_details || bankTransferDetails || '');
    setBankTransferResult(null);
  }, [financeModalBook, bankTransferDetails]);

  const saveBookNote = async () => {
    if (!financeModalBook) return;

    setNoteSaving(true);
    setNoteResult(null);
    try {
      const res = await fetch(`/api/admin-bookings?id=${financeModalBook.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: noteDraft }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to save booking note');
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === financeModalBook.id
            ? {
                ...b,
                internal_notes: noteDraft,
              }
            : b
        )
      );
      setFinanceModalBook((prev) =>
        prev
          ? {
              ...prev,
              internal_notes: noteDraft,
            }
          : prev
      );
      setNoteResult('Booking note saved.');
    } catch (err) {
      setNoteResult(err instanceof Error ? err.message : 'Failed to save note');
    } finally {
      setNoteSaving(false);
    }
  };

  const saveBankTransferDetails = async () => {
    if (!financeModalBook) return;

    setBankTransferSaving(true);
    setBankTransferResult(null);

    try {
      const res = await fetch(`/api/admin-bookings?id=${financeModalBook.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank_transfer_details: bankTransferDraft }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to save booking bank transfer details');
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === financeModalBook.id
            ? {
                ...b,
                bank_transfer_details: bankTransferDraft,
              }
            : b
        )
      );
      setFinanceModalBook((prev) =>
        prev
          ? {
              ...prev,
              bank_transfer_details: bankTransferDraft,
            }
          : prev
      );
      setBankTransferResult('Booking bank transfer details saved.');
    } catch (err) {
      setBankTransferResult(err instanceof Error ? err.message : 'Failed to save bank transfer details');
    } finally {
      setBankTransferSaving(false);
    }
  };

  const saveStatus = async (bookId: string, explicitStatus?: string) => {
    const selectedStatus = explicitStatus || statusDrafts[bookId];
    if (!selectedStatus) return;

    setStatusSavingId(bookId);
    setStatusResult(null);

    try {
      const res = await fetch(`/api/admin-bookings?id=${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to update booking status');
      }

      const updatedBooking = await res.json();
      setBookings((prev) => prev.map((booking) => (booking.id === bookId ? { ...booking, status: updatedBooking.status || selectedStatus } : booking)));
      setStatusResult(`Status updated to ${updatedBooking.status || selectedStatus}.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update booking status';
      setStatusResult(message);
    } finally {
      setStatusSavingId(null);
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      {/* Unified horizontal control bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label htmlFor="admin-bookings-currency" className="font-medium mr-2">Currency:</label>
        <select
          id="admin-bookings-currency"
          className="px-2 py-1 rounded border border-gray-300 mr-4"
          value={currency}
          onChange={e => setCurrency(e.target.value as 'THB' | 'USD' | 'EUR')}
        >
          <option value="THB">THB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
          onClick={() => setShowFunDiveBook(true)}
        >
          Book a Fun Dive
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          onClick={async () => {
            setExporting(true);
            setExportResult(null);
            try {
              const res = await adminAuthedFetch('/api/export-bookings-to-jira', { method: 'POST' });
              const data = await res.json();
              setExportResult(data.message || 'Export complete.');
            } catch (e) {
              setExportResult('Export failed.');
            } finally {
              setExporting(false);
            }
          }}
          disabled={exporting}
        >
          {exporting ? 'Exporting...' : 'Export to Jira'}
        </button>
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded"
          onClick={() => window.open(calendarFeedUrl, '_blank', 'noopener,noreferrer')}
        >
          Open Calendar Feed
        </button>
        <button
          className="px-4 py-2 bg-slate-700 text-white rounded"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(calendarFeedUrl);
              setCopyResult('Calendar feed URL copied.');
            } catch {
              setCopyResult(`Copy failed. URL: ${calendarFeedUrl}`);
            }
          }}
        >
          Copy Feed URL
        </button>
        <button
          className={`px-4 py-2 rounded font-medium transition-colors ${
            view === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
          onClick={() => setView('table')}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded font-medium transition-colors ${
            view === 'calendar'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
          onClick={() => setView('calendar')}
        >
          Calendar View
        </button>
      </div>

      {showFunDiveBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 p-4"
          onClick={() => setShowFunDiveBook(false)}
        >
          <div className="relative z-50 w-full max-w-md" onClick={(event) => event.stopPropagation()}>
            <FunDiveBooking />
            <button
              className="absolute top-2 right-2 bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowFunDiveBook(false)}
              aria-label="Close Fun Dive Booking"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {exportResult && <div className="mb-4 text-green-700">{exportResult}</div>}
      {copyResult && <div className="mb-4 text-slate-700">{copyResult}</div>}
      {statusResult && <div className="mb-4 text-emerald-700">{statusResult}</div>}
      {view === 'calendar' ? (
        <BookingsCalendar bookings={bookings} />
      ) : (
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-1 py-1 whitespace-nowrap">Name</th>
            <th className="border px-1 py-1 whitespace-nowrap">Email</th>
            <th className="border px-1 py-1 whitespace-nowrap">Phone</th>
            <th className="border px-1 py-1 whitespace-nowrap">Course</th>
            <th className="border px-1 py-1 whitespace-nowrap">Date</th>
            <th className="border px-1 py-1 whitespace-nowrap">Status</th>
            <th className="border px-1 py-1 whitespace-nowrap">Finance</th>
            <th className="border px-1 py-1 whitespace-nowrap">PayPal</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border px-1 py-1 whitespace-nowrap">{b.name}</td>
              <td className="border px-1 py-1 whitespace-nowrap">{b.email}</td>
              <td className="border px-1 py-1 whitespace-nowrap">{b.phone || '-'}</td>
              <td className="border px-1 py-1 whitespace-nowrap">{b.course_title}</td>
              <td className="border px-1 py-1 whitespace-nowrap">{b.preferred_date || '-'}</td>
              <td className="border px-1 py-1 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-2 py-1"
                    title="Booking status"
                    value={statusDrafts[b.id] || b.status || 'pending'}
                    onChange={(e) => {
                      const nextStatus = e.target.value;
                      setStatusDrafts((prev) => ({ ...prev, [b.id]: nextStatus }));
                    }}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  <button
                    className="px-2 py-1 text-xs bg-emerald-600 text-white rounded disabled:opacity-60"
                    disabled={statusSavingId === b.id || (statusDrafts[b.id] || b.status) === b.status}
                    onClick={() => saveStatus(b.id)}
                  >
                    {statusSavingId === b.id ? 'Saving...' : 'Save'}
                  </button>
                  {b.status !== 'confirmed' && (
                    <button
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded disabled:opacity-60"
                      disabled={statusSavingId === b.id}
                      onClick={() => {
                        setStatusDrafts((prev) => ({ ...prev, [b.id]: 'confirmed' }));
                        saveStatus(b.id, 'confirmed');
                      }}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </td>
              <td className="border px-2 py-1">
                <button
                  type="button"
                  onClick={() => setFinanceModalBook(b)}
                  className="mt-2 rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Finance
                </button>
              </td>
              <td className="border px-2 py-1">
                {buildPayPalUrl(b) && (
                  <a
                    href={buildPayPalUrl(b) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    PayPal
                  </a>
                )}
                <span className="margin-left-8" />
                <a
                  href={`https://www.trip.com/hotels/list?city=19957&display=Koh%20Tao&optionId=19957&optionType=City&optionName=Koh%20Tao&Allianceid=7864578&SID=295439656&trip_sub1=${b.trip_sub1 || 'tao1'}&trip_sub3=${b.trip_sub3 || 'D15055497'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Trip.com
                </a>
                <button
                  className="ml-2 px-2 py-1 text-xs bg-blue-700 text-white rounded"
                  onClick={() => escalateToJira(b)}
                  disabled={jiraStatus[b.id] === 'Sending...'}
                  title="Escalate this booking to Jira"
                >
                  {jiraStatus[b.id] === 'Sending...' ? 'Escalating...' : 'Escalate to Jira'}
                </button>
                {jiraStatus[b.id] && jiraStatus[b.id] !== 'Sending...' && (
                  <span className="ml-2 text-xs text-emerald-700">{jiraStatus[b.id]}</span>
                )}
                <button
                  className="ml-2 px-2 py-1 text-xs bg-slate-600 text-white rounded"
                  onClick={() => copyBookDetails(b)}
                  title="Copy booking details to clipboard"
                >
                  Copy Details
                </button>
                {copyStatus[b.id] && (
                  <span className="ml-2 text-xs text-emerald-700">{copyStatus[b.id]}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      <Dialog open={Boolean(financeModalBook)} onOpenChange={(open) => { if (!open) setFinanceModalBook(null); }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Individual Finance Details{financeModalBook ? ` - ${financeModalBook.name}` : ''}
            </DialogTitle>
          </DialogHeader>

          {financeModalBook && (
            <div className="space-y-3 text-sm">
              {/* Finance Section Heading and Status */}
              <FinanceSection />
              <div><strong>Booking ID:</strong> {financeModalBook.id}</div>
              <div><strong>Course:</strong> {financeModalBook.course_title}</div>
              <div><strong>Date:</strong> {financeModalBook.preferred_date || '-'}</div>
              <div><strong>Total:</strong> {typeof financeModalBook.total_amount === 'number' ? financeModalBook.total_amount : '-'}</div>
              <div><strong>Deposit:</strong> {typeof financeModalBook.deposit_amount === 'number' ? financeModalBook.deposit_amount : '-'}</div>
              <div><strong>Due:</strong> {typeof financeModalBook.due_amount === 'number' ? financeModalBook.due_amount : '-'}</div>
              <div>
                <strong>Payable now:</strong>{' '}
                {getPayableNow(financeModalBook) !== null ? getPayableNow(financeModalBook) : '-'}
              </div>
              <div>
                <strong>PayPal URL:</strong>{' '}
                {buildPayPalUrl(financeModalBook) ? (
                  <a
                    href={buildPayPalUrl(financeModalBook) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 underline"
                  >
                    {buildPayPalUrl(financeModalBook)}
                  </a>
                ) : (
                  '-'
                )}
              </div>

              <div>
                <strong>Bank transfer details</strong>
                <textarea
                  value={bankTransferDraft}
                  onChange={(e) => setBankTransferDraft(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Bank name, account number, IBAN/SWIFT..."
                />
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={saveBankTransferDetails}
                    disabled={bankTransferSaving}
                    className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {bankTransferSaving ? 'Saving...' : 'Save bank details'}
                  </button>
                  {bankTransferResult ? <span className="text-xs text-slate-600">{bankTransferResult}</span> : null}
                </div>
              </div>

              <div>
                <strong>Comments / Notes</strong>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Add notes for this booking..."
                />
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={saveBookNote}
                    disabled={noteSaving}
                    className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {noteSaving ? 'Saving...' : 'Save note'}
                  </button>
                  {noteResult ? <span className="text-xs text-slate-600">{noteResult}</span> : null}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
