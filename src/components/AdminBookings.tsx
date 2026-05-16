import Papa from 'papaparse';
// AdminBookings.tsx
// Clean admin bookings table: shows Name, Email, Phone, Course, Date, Total, Deposit, To Be Paid, PayPal link.
// To add more columns or features, edit below. For comments or notes, add a new column and input logic as needed.

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Comment type for booking comments
interface BookingComment {
  id: string;
  booking_id: string;
  user_id: string;
  comment: string;
  is_admin: boolean;
  created_at: string;
}

const parseCommentsFromNotes = (bookingId: string, notes?: string | null): BookingComment[] => {
  if (!notes) return [];

  return notes
    .split('\n')
    .map((line, index) => ({ line: line.trim(), index }))
    .filter((entry) => entry.line.length > 0)
    .map((entry) => {
      const match = entry.line.match(/^\[(.*?)\]\s*Admin:\s*(.*)$/i);
      if (match) {
        const [, dateRaw, commentText] = match;
        const parsedDate = new Date(dateRaw);
        return {
          id: `${bookingId}-${entry.index}`,
          booking_id: bookingId,
          user_id: 'admin',
          comment: commentText || '',
          is_admin: true,
          created_at: Number.isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString(),
        };
      }

      return {
        id: `${bookingId}-${entry.index}`,
        booking_id: bookingId,
        user_id: 'admin',
        comment: entry.line,
        is_admin: true,
        created_at: new Date().toISOString(),
      };
    });
};
import FunDiveBooking from './FunDiveBooking';
import FinanceSection from './FinanceSection';
import BookingsCalendar from './BookingsCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  booking_source?: string;
  message?: string;
}



const InlineEditCell: React.FC<{
  value: string;
  onSave: (val: string) => Promise<void>;
  textarea?: boolean;
}> = ({ value, onSave, textarea }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  return editing ? (
    <span>
      {textarea ? (
        <textarea
          className="border rounded px-1 py-1 w-full"
          placeholder="Edit note"
          title="Edit note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
        />
      ) : (
        <input
          className="border rounded px-1 py-1 w-full"
          placeholder="Edit value"
          title="Edit value"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
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
        onClick={() => {
          setEditing(false);
          setDraft(value);
        }}
      >Cancel</button>
    </span>
  ) : (
    <span onClick={() => setEditing(true)} className="cursor-pointer hover:underline">
      {value || <span className="text-gray-400">(empty)</span>}
    </span>
  );
};

const AdminBookings: React.FC = () => {
    const { t } = useTranslation();

    // Bookings state must come first
    const [bookings, setBookings] = useState<Booking[]>([]);
    // Filter state
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterText, setFilterText] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteResult, setDeleteResult] = useState<string | null>(null);

    const getBookingDate = (booking: Booking) => {
      const raw = booking.preferred_date || booking.created_at;
      if (!raw) return null;
      const dt = new Date(raw);
      return Number.isNaN(dt.getTime()) ? null : dt;
    };

    const getBookingValue = (booking: Booking) => {
      if (typeof booking.total_amount === 'number' && booking.total_amount > 0) return booking.total_amount;
      if (typeof booking.subtotal_amount === 'number' && booking.subtotal_amount > 0) return booking.subtotal_amount;
      if (typeof booking.total_payable_now === 'number' && booking.total_payable_now > 0) return booking.total_payable_now;
      if (typeof booking.deposit_amount === 'number' && booking.deposit_amount > 0) return booking.deposit_amount;
      return 0;
    };

    // Filtered bookings
    const filteredBookings = useMemo(() => bookings.filter((b) => {
      const statusMatch = filterStatus ? (b.status === filterStatus) : true;
      const text = filterText.toLowerCase();
      const textMatch =
        !text ||
        b.name.toLowerCase().includes(text) ||
        b.email.toLowerCase().includes(text) ||
        (b.course_title && b.course_title.toLowerCase().includes(text)) ||
        (b.phone && b.phone.toLowerCase().includes(text)) ||
        (b.booking_source && b.booking_source.toLowerCase().includes(text));

      const rowDate = getBookingDate(b);
      const fromOk = !dateFrom || (rowDate && rowDate >= new Date(`${dateFrom}T00:00:00`));
      const toOk = !dateTo || (rowDate && rowDate <= new Date(`${dateTo}T23:59:59`));

      return statusMatch && textMatch && Boolean(fromOk) && Boolean(toOk);
    }), [bookings, filterStatus, filterText, dateFrom, dateTo]);

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

    const handleDelete = async (id: string) => {
      const confirmed = window.confirm('Delete this booking permanently?');
      if (!confirmed) return;

      setDeleting(true);
      setDeleteId(id);
      setDeleteResult(null);
      try {
        const res = await adminAuthedFetch(`/api/admin-bookings?id=${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const p = await res.json().catch(() => ({}));
          throw new Error(p?.error || `Delete failed (HTTP ${res.status})`);
        }
        setBookings((prev) => prev.filter((b) => b.id !== id));
        setDeleteResult('Booking deleted.');
      } catch (err: any) {
        setDeleteResult(err.message || 'Delete failed.');
      } finally {
        setDeleting(false);
        setDeleteId(null);
      }
    };
  // (removed duplicate bookings state)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'board' | 'calendar'>('table');
  const [showFunDiveBooking, setShowFunDiveBooking] = useState(false);
  const [financeModalBooking, setFinanceModalBooking] = useState<Booking | null>(null);
  // Comments state for finance modal
  const [comments, setComments] = useState<BookingComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [commentSaving, setCommentSaving] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
    // Populate comments from booking notes when finance modal opens
    useEffect(() => {
      if (!financeModalBooking) return;
      setCommentsLoading(true);
      setCommentError(null);
      setComments(parseCommentsFromNotes(financeModalBooking.id, financeModalBooking.internal_notes || ''));
      setCommentsLoading(false);
    }, [financeModalBooking]);

    // Add new comment
    const handleAddComment = async () => {
      if (!financeModalBooking || !commentDraft.trim()) return;
      setCommentSaving(true);
      setCommentError(null);
      try {
        const commentText = commentDraft.trim();
        const now = new Date();
        const commentLine = `[${now.toISOString()}] Admin: ${commentText}`;
        const existingNotes = financeModalBooking.internal_notes?.trim() || '';
        const mergedNotes = existingNotes ? `${existingNotes}\n${commentLine}` : commentLine;

        const response = await adminAuthedFetch(`/api/admin-bookings?id=${encodeURIComponent(financeModalBooking.id)}`, {
          method: 'PATCH',
          body: JSON.stringify({ internal_notes: mergedNotes }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || 'Failed to add comment');
        }

        const updatedBooking = await response.json().catch(() => null);
        const nextNotes = updatedBooking?.internal_notes || mergedNotes;

        setBookings((prev) => prev.map((b) => (b.id === financeModalBooking.id ? { ...b, internal_notes: nextNotes } : b)));
        setFinanceModalBooking((prev) => (prev ? { ...prev, internal_notes: nextNotes } : prev));
        setComments(parseCommentsFromNotes(financeModalBooking.id, nextNotes));
        setNoteDraft(nextNotes);
        setCommentDraft('');
        toast.success('Comment added');
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
  const [assigneeDrafts, setAssigneeDrafts] = useState<Record<string, string>>({});

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
    const details = `Name: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || '-'}\nCourse: ${booking.course_title}\nDate: ${booking.preferred_date || '-'}\nStatus: ${booking.status}\nNotes: ${booking.internal_notes || booking.message || ''}`;
    try {
      await navigator.clipboard.writeText(details);
      setCopyStatus((prev) => ({ ...prev, [booking.id]: 'Copied!' }));
    } catch {
      setCopyStatus((prev) => ({ ...prev, [booking.id]: 'Copy failed!' }));
    }
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [booking.id]: '' })), 2000);
  };

  const adminAuthedFetch = async (url: string, init?: RequestInit) => {
    const adminLoginToken = window.localStorage.getItem('admin_login_token');
    const viewToken = import.meta.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN || window.localStorage.getItem('admin_view_token');

    const headers = new Headers(init?.headers || {});
    if (adminLoginToken) {
      headers.set('x-admin-login-token', adminLoginToken);
    }
    if (viewToken) {
      headers.set('x-admin-view-token', String(viewToken));
    }
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    let finalUrl = url;
    if (viewToken) {
      try {
        const parsed = new URL(url, window.location.origin);
        if (!parsed.searchParams.has('view_token')) {
          parsed.searchParams.set('view_token', String(viewToken));
        }
        finalUrl = parsed.pathname + parsed.search + parsed.hash;
      } catch {
        // Keep original URL if parsing fails.
      }
    }

    return fetch(finalUrl, { ...init, headers });
  };

  const buildApiUrl = (path: string) => {
    const rawBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
    const base = rawBase.replace(/\/$/, '');
    return base ? `${base}${path}` : path;
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

  const calendarFeedUrl = `${window.location.origin}/api/bookings/calendar`;

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        // Fetch via server-side API that uses service role key (bypasses RLS)
        const res = await adminAuthedFetch('/api/admin-bookings');
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.error || `HTTP ${res.status}`);
        }
        const bookingData: Booking[] = await res.json();
        setBookings(bookingData);
        const initialDrafts: Record<string, string> = {};
        const initialAssignees: Record<string, string> = {};
        bookingData.forEach((booking: Booking) => {
          initialDrafts[booking.id] = booking.status || 'pending';
          const match = (booking.internal_notes || booking.message || '').match(/Assigned Instructor:\s*([^\n]+)/i);
          initialAssignees[booking.id] = match?.[1]?.trim() || '';
        });
        setStatusDrafts(initialDrafts);
        setAssigneeDrafts(initialAssignees);
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
    return `${paypalLink}/${amount}THB?account_id=${accountId}&site_id=${siteId}`;
  };

  useEffect(() => {
    if (!financeModalBooking) return;
    setNoteDraft(financeModalBooking.internal_notes || financeModalBooking.message || '');
    setNoteResult(null);
    setBankTransferDraft(financeModalBooking.bank_transfer_details || bankTransferDetails || '');
    setBankTransferResult(null);
  }, [financeModalBooking, bankTransferDetails]);

  const saveBookingNote = async () => {
    if (!financeModalBooking) return;

    setNoteSaving(true);
    setNoteResult(null);
    try {
      const res = await adminAuthedFetch(`/api/admin-bookings?id=${financeModalBooking.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ internal_notes: noteDraft }),
      });
      if (!res.ok) { const p = await res.json().catch(() => ({})); throw new Error(p?.error || 'Failed to save note'); }

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
      const res = await adminAuthedFetch(`/api/admin-bookings?id=${financeModalBooking.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ bank_transfer_details: bankTransferDraft }),
      });
      if (!res.ok) { const p = await res.json().catch(() => ({})); throw new Error(p?.error || 'Failed to save bank transfer details'); }

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
      const res = await adminAuthedFetch(`/api/admin-bookings?id=${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (!res.ok) { const p = await res.json().catch(() => ({})); throw new Error(p?.error || 'Failed to update status'); }

      setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status: selectedStatus } : booking)));
      setStatusResult(`Status updated to ${selectedStatus}.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update booking status';
      setStatusResult(message);
    } finally {
      setStatusSavingId(null);
    }
  };

  const normalizePhoneForWhatsApp = (phone?: string) => {
    if (!phone) return '';
    const digits = phone.replace(/[^\d+]/g, '');
    if (digits.startsWith('+')) return digits.slice(1);
    return digits;
  };

  const openWhatsApp = (booking: Booking) => {
    const phone = normalizePhoneForWhatsApp(booking.phone);
    if (!phone) return;
    const text = encodeURIComponent(`Hi ${booking.name}, this is Koh Tao Dive Dreams regarding your booking for ${booking.course_title}${booking.preferred_date ? ` on ${booking.preferred_date}` : ''}.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const openInvoiceDraft = (booking: Booking) => {
    const amount = getBookingValue(booking);
    const subject = encodeURIComponent(`Invoice for ${booking.course_title} booking`);
    const body = encodeURIComponent(
      `Hello ${booking.name},\n\nPlease find your booking invoice details:\nCourse: ${booking.course_title}\nDate: ${booking.preferred_date || '-'}\nAmount: ${amount || '-'} THB\nStatus: ${booking.status}\n\nThank you.`
    );
    window.open(`mailto:${booking.email}?subject=${subject}&body=${body}`);
  };

  const saveAssignee = async (booking: Booking) => {
    const assignee = (assigneeDrafts[booking.id] || '').trim();
    if (!assignee) return;
    const prefix = `Assigned Instructor: ${assignee}`;
    const current = booking.internal_notes || '';
    const nextNotes = current.includes('Assigned Instructor:')
      ? current.replace(/Assigned Instructor:\s*[^\n]*/i, prefix)
      : `${prefix}${current ? `\n${current}` : ''}`;

    await handleInlineEdit(booking.id, 'internal_notes', nextNotes);
    setStatusResult(`Instructor assigned to ${booking.name}.`);
  };

  const bookingMetrics = useMemo(() => {
    const statusCounts = filteredBookings.reduce<Record<string, number>>((acc, booking) => {
      const key = booking.status || 'pending';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const totalRevenue = filteredBookings.reduce((sum, booking) => sum + getBookingValue(booking), 0);
    const payableNow = filteredBookings.reduce((sum, booking) => sum + (getPayableNow(booking) || 0), 0);

    const byCourse = filteredBookings.reduce<Record<string, number>>((acc, booking) => {
      const key = booking.course_title || 'Unspecified';
      acc[key] = (acc[key] || 0) + getBookingValue(booking);
      return acc;
    }, {});

    const bySource = filteredBookings.reduce<Record<string, number>>((acc, booking) => {
      const key = booking.booking_source || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const topCourses = Object.entries(byCourse)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const topSources = Object.entries(bySource)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return {
      totalBookings: filteredBookings.length,
      totalRevenue,
      payableNow,
      pending: statusCounts.pending || 0,
      confirmed: statusCounts.confirmed || 0,
      cancelled: statusCounts.cancelled || 0,
      topCourses,
      topSources,
    };
  }, [filteredBookings]);

  const handleInlineEdit = async (id: string, field: string, value: string) => {
    try {
      const res = await adminAuthedFetch(`/api/admin-bookings?id=${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
    } catch {
      // Optionally show error
    }
  };

  if (loading) return <div>{t('admin.loading', { defaultValue: 'Loading bookings...' })}</div>;
  if (error) return <div>{t('admin.error', { defaultValue: 'Error' })}: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('admin.bookings', { defaultValue: 'Bookings' })}</h2>
      {/* Unified horizontal control bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder={t('admin.search_placeholder', { defaultValue: 'Search name, email, course...' })}
          className="px-2 py-1 rounded border border-gray-300"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <label htmlFor="status-filter" className="sr-only">{t('admin.filter_status', { defaultValue: 'Filter by status' })}</label>
        <select
          id="status-filter"
          title={t('admin.filter_status', { defaultValue: 'Filter by status' })}
          className="px-2 py-1 rounded border border-gray-300"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">{t('admin.all_statuses', { defaultValue: 'All Statuses' })}</option>
          <option value="pending">{t('admin.status_pending', { defaultValue: 'Pending' })}</option>
          <option value="confirmed">{t('admin.status_confirmed', { defaultValue: 'Confirmed' })}</option>
          <option value="cancelled">{t('admin.status_cancelled', { defaultValue: 'Cancelled' })}</option>
          <option value="archived">{t('admin.status_archived', { defaultValue: 'Archived' })}</option>
        </select>
        <button
          className="px-4 py-2 bg-slate-700 text-white rounded"
          onClick={handleExportCSV}
        >
          {t('admin.export_csv', { defaultValue: 'Export CSV' })}
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
          {deleteResult && <div className="mb-4 text-amber-700">{deleteResult}</div>}

          {view === 'calendar' ? (
            <BookingsCalendar bookings={bookings} />
          ) : (
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.name', { defaultValue: 'Name' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.email', { defaultValue: 'Email' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.phone', { defaultValue: 'Phone' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.course', { defaultValue: 'Course' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.date', { defaultValue: 'Date' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.status', { defaultValue: 'Status' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.notes', { defaultValue: 'Notes' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.finance', { defaultValue: 'Finance' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.paypal', { defaultValue: 'PayPal' })}</th>
                  <th className="border px-1 py-1 whitespace-nowrap">{t('admin.actions', { defaultValue: 'Actions' })}</th>
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
                          <option value="archived">archived</option>
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
                    <td className="border px-2 py-1 whitespace-nowrap">
                      {b.status !== 'archived' && (
                        <button
                          className="px-2 py-1 text-xs bg-gray-700 text-white rounded"
                          onClick={() => {
                            setStatusDrafts((prev) => ({ ...prev, [b.id]: 'archived' }));
                            saveStatus(b.id, 'archived');
                          }}
                        >
                          Archive
                        </button>
                      )}
                      <button
                        className="ml-2 px-2 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-60"
                        onClick={() => handleDelete(b.id)}
                        disabled={deleting && deleteId === b.id}
                        title="Delete booking"
                      >
                        {deleting && deleteId === b.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Finance Modal rendered outside the table for valid JSX */}
          {financeModalBooking && (
            <Dialog open={Boolean(financeModalBooking)} onOpenChange={(open) => { if (!open) setFinanceModalBooking(null); }}>
              <DialogContent className="sm:max-w-2xl">
                <div className="space-y-3 text-sm">
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
                    <strong>{t('admin.finance_bank_transfer_details', { defaultValue: 'Bank Transfer Details' })}</strong>
                    <textarea
                      value={bankTransferDraft}
                      onChange={(e) => setBankTransferDraft(e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      placeholder={t('admin.finance_bank_transfer_placeholder', { defaultValue: 'Bank name, account number, IBAN/SWIFT...' })}
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={saveBankTransferDetails}
                        disabled={bankTransferSaving}
                        className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {bankTransferSaving ? t('admin.saving', { defaultValue: 'Saving...' }) : t('admin.save_bank_details', { defaultValue: 'Save bank details' })}
                      </button>
                      {bankTransferResult ? <span className="text-xs text-slate-600">{bankTransferResult}</span> : null}
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>{t('admin.notes', { defaultValue: 'Notes' })}</strong>
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      placeholder={t('admin.notes_placeholder', { defaultValue: 'Add notes for this booking...' })}
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={saveBookingNote}
                        disabled={noteSaving}
                        className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {noteSaving ? t('admin.saving', { defaultValue: 'Saving...' }) : t('admin.save_note', { defaultValue: 'Save note' })}
                      </button>
                      {noteResult ? <span className="text-xs text-slate-600">{noteResult}</span> : null}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4">
                    <strong>{t('admin.comments', { defaultValue: 'Comments' })}</strong>
                    <div className="border rounded bg-gray-50 p-2 max-h-40 overflow-y-auto mt-1">
                      {commentsLoading ? (
                        <div>{t('admin.loading_comments', { defaultValue: 'Loading comments...' })}</div>
                      ) : commentError ? (
                        <div className="text-red-600">{commentError}</div>
                      ) : comments.length === 0 ? (
                        <div className="text-gray-400">{t('admin.no_comments', { defaultValue: 'No comments yet.' })}</div>
                      ) : (
                        <ul className="space-y-2">
                          {comments.map((c) => (
                            <li key={c.id} className="border-b pb-1 last:border-b-0">
                              <div className="text-xs text-gray-600 flex justify-between">
                                <span>{c.is_admin ? t('admin.comment_admin', { defaultValue: 'Admin' }) : t('admin.comment_user', { defaultValue: 'User' })} • {new Date(c.created_at).toLocaleString()}</span>
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
                        placeholder={t('admin.add_comment_placeholder', { defaultValue: 'Add a comment...' })}
                        disabled={commentSaving}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }}
                      />
                      <button
                        type="button"
                        onClick={handleAddComment}
                        disabled={commentSaving || !commentDraft.trim()}
                        className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {commentSaving ? t('admin.saving', { defaultValue: 'Saving...' }) : t('admin.add_comment_button', { defaultValue: 'Add' })}
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