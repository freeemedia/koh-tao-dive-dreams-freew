import Papa from 'papaparse';
// AdminBookings.tsx
// Clean admin bookings table: shows Name, Email, Phone, Course, Date, Total, Deposit, To Be Paid, PayPal link.
// To add more columns or features, edit below. For comments or notes, add a new column and input logic as needed.

import React, { useEffect, useState } from 'react';
// Comment type for booking comments
interface BookingComment {
  id: string;
  booking_id: string;
  user_id: string;
  comment: string;
  is_admin: boolean;
  created_at: string;
}
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

    // Bookings state must come first
    const [bookings, setBookings] = useState<Booking[]>([]);
    // Filter state
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterText, setFilterText] = useState<string>('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteResult, setDeleteResult] = useState<string | null>(null);

    // Filtered bookings
    const filteredBookings = bookings.filter((b) => {
      const statusMatch = filterStatus ? (b.status === filterStatus) : true;
      const text = filterText.toLowerCase();
      const textMatch =
        !text ||
        b.name.toLowerCase().includes(text) ||
        b.email.toLowerCase().includes(text) ||
        (b.course_title && b.course_title.toLowerCase().includes(text)) ||
        (b.phone && b.phone.toLowerCase().includes(text));
      return statusMatch && textMatch;
    });

    // Delete booking
    const handleDelete = async (id: string) => {
      setDeleting(true);
      setDeleteResult(null);
      try {
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) throw error;
        setBookings((prev) => prev.filter((b) => b.id !== id));
        setDeleteResult('Booking deleted.');
      } catch (err: any) {
        setDeleteResult(err.message || 'Delete failed.');
      } finally {
        setDeleting(false);
        setDeleteId(null);
      }
    };

    // Export CSV
    const handleExportCSV = () => {
      const csv = Papa.unparse(filteredBookings.map(({ id, ...b }) => b));
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings.csv';
      a.click();
      URL.revokeObjectURL(url);
    };
  // (removed duplicate bookings state)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [showFunDiveBooking, setShowFunDiveBooking] = useState(false);
  const [financeModalBooking, setFinanceModalBooking] = useState<Booking | null>(null);
  // Comments state for finance modal
  const [comments, setComments] = useState<BookingComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [commentSaving, setCommentSaving] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
    // Fetch comments when finance modal opens
    useEffect(() => {
      if (!financeModalBooking) return;
      setCommentsLoading(true);
      setComments([]);
      setCommentError(null);
      fetch(`/api/bookings/comments?booking_id=${financeModalBooking.id}`)
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then((data) => setComments(Array.isArray(data) ? data : []))
        .catch(() => setCommentError('Failed to load comments'))
        .finally(() => setCommentsLoading(false));
    }, [financeModalBooking]);

    // Add new comment
    const handleAddComment = async () => {
      if (!financeModalBooking || !commentDraft.trim()) return;
      setCommentSaving(true);
      setCommentError(null);
      try {
        // Get admin user id from supabase session
        const { data: { session } } = await supabase.auth.getSession();
        const user_id = session?.user?.id;
        if (!user_id) throw new Error('No admin user ID');
        const res = await fetch('/api/bookings/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            booking_id: financeModalBooking.id,
            user_id,
            comment: commentDraft,
            is_admin: true,
          }),
        });
        if (!res.ok) throw new Error('Failed to add comment');
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setCommentDraft('');
      } catch (err: any) {
        setCommentError(err.message || 'Failed to add comment');
      } finally {
        setCommentSaving(false);
      }
    };
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
        const apiKey = import.meta.env.VITE_OPENEXCHANGERATES_API_KEY || '';
        const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}&symbols=THB,USD,EUR`);
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

  const copyBookingDetails = async (booking: Booking) => {
    const details = `Name: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || '-'}\nCourse: ${booking.course_title}\nDate: ${booking.preferred_date || '-'}\nStatus: ${booking.status}\nNotes: ${booking.internal_notes || ''}`;
    try {
      await navigator.clipboard.writeText(details);
      setCopyStatus((prev) => ({ ...prev, [booking.id]: 'Copied!' }));
    } catch {
      setCopyStatus((prev) => ({ ...prev, [booking.id]: 'Copy failed!' }));
    }
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [booking.id]: '' })), 2000);
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

  const escalateToJira = async (booking: Booking) => {
    setJiraStatus((prev) => ({ ...prev, [booking.id]: 'Sending...' }));
    try {
      const res = await adminAuthedFetch('/api/create-jira-booking', {
        method: 'POST',
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          bookingDetails: `Course: ${booking.course_title}\nDate: ${booking.preferred_date || '-'}\nPhone: ${booking.phone || '-'}\nStatus: ${booking.status}\nNotes: ${booking.internal_notes || ''}`,
        }),
      });
      if (res.ok) {
        setJiraStatus((prev) => ({ ...prev, [booking.id]: 'Escalated!' }));
      } else {
        setJiraStatus((prev) => ({ ...prev, [booking.id]: 'Failed!' }));
      }
    } catch {
      setJiraStatus((prev) => ({ ...prev, [booking.id]: 'Error!' }));
    }
    setTimeout(() => setJiraStatus((prev) => ({ ...prev, [booking.id]: '' })), 3000);
  };

  const calendarFeedUrl = 'https://koh-tao-dive-dreams.vercel.app/api/bookings/calendar';

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        // Fetch bookings directly from Supabase
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setBookings(data || []);
        const initialDrafts: Record<string, string> = {};
        (data || []).forEach((booking: Booking) => {
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
        rows.forEach((row: any) => {
          if (!row?.section_key) return;
          if (row.section_key === 'paypal_link' && row.content_value) setPaypalLink(row.content_value);
          if (row.section_key === 'bank_transfer_details' && row.content_value) setBankTransferDetails(row.content_value);
        });
      })
      .catch(() => {
        // Keep defaults if settings are unavailable.
      });
  }, []);

  const getPayableNow = (booking: Booking) => {
    if (typeof booking.total_payable_now === 'number' && booking.total_payable_now > 0) return booking.total_payable_now;
    if (typeof booking.deposit_amount === 'number' && booking.deposit_amount > 0) return booking.deposit_amount;
    if (typeof booking.total_amount === 'number' && booking.total_amount > 0) return booking.total_amount;
    return null;
  };

  const buildPayPalUrl = (booking: Booking) => {
    const amount = getPayableNow(booking);
    if (amount === null) return null;
    // Add account_id and site_id as query parameters for commission tracking
    const accountId = '7864578';
    const siteId = '295439656';
    return `${paypalLink}/${amount}?account_id=${accountId}&site_id=${siteId}`;
  };

  useEffect(() => {
    if (!financeModalBooking) return;
    setNoteDraft(financeModalBooking.internal_notes || '');
    setNoteResult(null);
    setBankTransferDraft(financeModalBooking.bank_transfer_details || bankTransferDetails || '');
    setBankTransferResult(null);
  }, [financeModalBooking, bankTransferDetails]);

  const saveBookingNote = async () => {
    if (!financeModalBooking) return;

    setNoteSaving(true);
    setNoteResult(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: financeModalBooking.id, internal_notes: noteDraft }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to save booking note');
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === financeModalBooking.id
            ? {
                ...b,
                internal_notes: noteDraft,
              }
            : b
        )
      );
      setFinanceModalBooking((prev) =>
        prev
          ? {
              ...prev,
              internal_notes: noteDraft,
            }
          : prev
      );
      setNoteResult('Note saved.');
    } catch (err) {
      setNoteResult(err instanceof Error ? err.message : 'Failed to save note');
    } finally {
      setNoteSaving(false);
    }
  };

  const saveBankTransferDetails = async () => {
    if (!financeModalBooking) return;

    setBankTransferSaving(true);
    setBankTransferResult(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: financeModalBooking.id, bank_transfer_details: bankTransferDraft }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to save bank transfer details');
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === financeModalBooking.id
            ? {
                ...b,
                bank_transfer_details: bankTransferDraft,
              }
            : b
        )
      );
      setFinanceModalBooking((prev) =>
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

  const saveStatus = async (bookingId: string, explicitStatus?: string) => {
    const selectedStatus = explicitStatus || statusDrafts[bookingId];
    if (!selectedStatus) return;

    setStatusSavingId(bookingId);
    setStatusResult(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, status: selectedStatus }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to update booking status');
      }

      const updatedBooking = await res.json();
      setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status: updatedBooking.status || selectedStatus } : booking)));
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
        <input
          type="text"
          placeholder="Search name, email, course..."
          className="px-2 py-1 rounded border border-gray-300"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <label htmlFor="status-filter" className="sr-only">Filter by status</label>
        <select
          id="status-filter"
          title="Filter by status"
          className="px-2 py-1 rounded border border-gray-300"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          className="px-4 py-2 bg-slate-700 text-white rounded"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
        {/* ...other controls... */}
      </div>

          {showFunDiveBooking && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 p-4"
              onClick={() => setShowFunDiveBooking(false)}
            >
              <div className="relative z-50 w-full max-w-md" onClick={(event) => event.stopPropagation()}>
                <FunDiveBooking />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowFunDiveBooking(false)}
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
                  <th className="border px-1 py-1 whitespace-nowrap">Notes</th>
                  <th className="border px-1 py-1 whitespace-nowrap">Finance</th>
                  <th className="border px-1 py-1 whitespace-nowrap">PayPal</th>
                  <th className="border px-1 py-1 whitespace-nowrap">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    {/* Inline editable fields for name, email, phone, course, date */}
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.name}
                        onSave={async (val) => await handleInlineEdit(b.id, 'name', val)}
                      />
                    </td>
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.email}
                        onSave={async (val) => await handleInlineEdit(b.id, 'email', val)}
                      />
                    </td>
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.phone || ''}
                        onSave={async (val) => await handleInlineEdit(b.id, 'phone', val)}
                      />
                    </td>
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.course_title}
                        onSave={async (val) => await handleInlineEdit(b.id, 'course_title', val)}
                      />
                    </td>
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.preferred_date || ''}
                        onSave={async (val) => await handleInlineEdit(b.id, 'preferred_date', val)}
                      />
                    </td>
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
                    {/* Notes column with inline edit */}
                    <td className="border px-1 py-1 whitespace-nowrap">
                      <InlineEditCell
                        value={b.internal_notes || ''}
                        onSave={async (val) => await handleInlineEdit(b.id, 'internal_notes', val)}
                        textarea
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setFinanceModalBooking(b)}
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
                      <button
                        className="ml-2 px-2 py-1 text-xs bg-slate-600 text-white rounded"
                        onClick={() => copyBookingDetails(b)}
                        title="Copy booking details to clipboard"
                      >
                        Copy Details
                      </button>
                      {copyStatus[b.id] && (
                        <span className="ml-2 text-xs text-emerald-700">{copyStatus[b.id]}</span>
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      <button
                        className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                        onClick={() => setDeleteId(b.id)}
                        disabled={deleting && deleteId === b.id}
                        title="Delete booking"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              // InlineEditCell component for inline editing
              const InlineEditCell: React.FC<{
                value: string;
                onSave: (val: string) => Promise<void>;
                textarea?: boolean;
              }> = ({ value, onSave, textarea }) => {
                const [editing, setEditing] = useState(false);
                const [draft, setDraft] = useState(value);
                const [saving, setSaving] = useState(false);
                useEffect(() => { setDraft(value); }, [value]);
                return editing ? (
                  <span>
                    {textarea ? (
                      <textarea
                        className="border rounded px-1 py-1 w-full"
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        rows={2}
                      />
                    ) : (
                      <input
                        className="border rounded px-1 py-1 w-full"
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                      />
                    )}
                    <button
                      className="ml-1 px-2 py-1 text-xs bg-blue-600 text-white rounded"
                      disabled={saving}
                      onClick={async () => {
                        setSaving(true);
                        await onSave(draft);
                        setSaving(false);
                        setEditing(false);
                      }}
                    >Save</button>
                    <button
                      className="ml-1 px-2 py-1 text-xs bg-gray-400 text-white rounded"
                      onClick={() => { setEditing(false); setDraft(value); }}
                    >Cancel</button>
                  </span>
                ) : (
                  <span onClick={() => setEditing(true)} className="cursor-pointer hover:underline">
                    {value || <span className="text-gray-400">(empty)</span>}
                  </span>
                );
              };

              // Handler for inline edit save
              const handleInlineEdit = async (id: string, field: string, value: string) => {
                try {
                  const res = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, [field]: value }),
                  });
                  if (!res.ok) throw new Error('Failed to update');
                  setBookings(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
                } catch (err) {
                  // Optionally show error
                }
              };
              </tbody>
            </table>
          )}

          {/* Finance Modal rendered outside the table for valid JSX */}
          {financeModalBooking && (
            <Dialog open={Boolean(financeModalBooking)} onOpenChange={(open) => { if (!open) setFinanceModalBooking(null); }}>
              <DialogContent className="sm:max-w-2xl">
                <div className="space-y-3 text-sm">
                  {/* Finance Section Heading and Status */}
                  <FinanceSection />
                  <div><strong>Booking ID:</strong> {financeModalBooking.id}</div>
                  <div><strong>Course:</strong> {financeModalBooking.course_title}</div>
                  <div><strong>Date:</strong> {financeModalBooking.preferred_date || '-'}</div>
                  <div><strong>Total:</strong> {typeof financeModalBooking.total_amount === 'number' ? financeModalBooking.total_amount : '-'}</div>
                  <div><strong>Deposit:</strong> {typeof financeModalBooking.deposit_amount === 'number' ? financeModalBooking.deposit_amount : '-'}</div>
                  <div><strong>Due:</strong> {typeof financeModalBooking.due_amount === 'number' ? financeModalBooking.due_amount : '-'}</div>
                  <div>
                    <strong>Payable now:</strong>{' '}
                    {getPayableNow(financeModalBooking) !== null ? getPayableNow(financeModalBooking) : '-'}
                  </div>
                  <div>
                    <strong>PayPal URL:</strong>{' '}
                    {buildPayPalUrl(financeModalBooking) ? (
                      <a
                        href={buildPayPalUrl(financeModalBooking) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-600 underline"
                      >
                        {buildPayPalUrl(financeModalBooking)}
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
                  </div>
                  <div className="mt-2">
                    <strong>Notes</strong>
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      placeholder="Add notes for this booking..."
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={saveBookingNote}
                        disabled={noteSaving}
                        className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {noteSaving ? 'Saving...' : 'Save note'}
                      </button>
                      {noteResult ? <span className="text-xs text-slate-600">{noteResult}</span> : null}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4">
                    <strong>Comments</strong>
                    <div className="border rounded bg-gray-50 p-2 max-h-40 overflow-y-auto mt-1">
                      {commentsLoading ? (
                        <div>Loading comments...</div>
                      ) : commentError ? (
                        <div className="text-red-600">{commentError}</div>
                      ) : comments.length === 0 ? (
                        <div className="text-gray-400">No comments yet.</div>
                      ) : (
                        <ul className="space-y-2">
                          {comments.map((c) => (
                            <li key={c.id} className="border-b pb-1 last:border-b-0">
                              <div className="text-xs text-gray-600 flex justify-between">
                                <span>{c.is_admin ? 'Admin' : 'User'} • {new Date(c.created_at).toLocaleString()}</span>
                              </div>
                              <div className="text-sm whitespace-pre-wrap">{c.comment}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={commentDraft}
                        onChange={e => setCommentDraft(e.target.value)}
                        className="flex-1 rounded border border-gray-300 p-2"
                        placeholder="Add a comment..."
                        disabled={commentSaving}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }}
                      />
                      <button
                        type="button"
                        onClick={handleAddComment}
                        disabled={commentSaving || !commentDraft.trim()}
                        className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {commentSaving ? 'Saving...' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
    </div>
  );
}

export default AdminBookings;