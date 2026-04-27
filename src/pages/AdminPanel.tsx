import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Booking = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  deposit_amount?: string;
  item_title?: string;
  status?: string;
  created_at?: string;
};

const AdminPanel: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://koh-tao-dive-dreams-.vercel.app';
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`);
    const jb = await res.json();
    // Map server booking schema to local Booking type
    const mapped = (jb || []).map((b: any) => ({
      id: b.id,
      name: b.name,
      email: b.email,
      phone: b.phone,
      deposit_amount: b.deposit_amount || b.deposit || '',
      item_title: b.course_title || b.item_title || '',
      status: b.status || 'pending',
      created_at: b.created_at,
    }));
    setBookings(mapped);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://koh-tao-dive-dreams-mocha.vercel.app';
    await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchBookings();
  };

  const sendInvoice = async (id: string) => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://koh-tao-dive-dreams-mocha.vercel.app';
    await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}/invoice`, { method: 'POST' });
    alert('Invoice sent (if SMTP configured)');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto bg-background rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Admin — Bookings</h1>
          <div>{loading ? 'Loading...' : `${bookings.length} bookings`}</div>
        </div>

        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="p-4 border rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.item_title || 'Booking'}</div>
                <div className="text-sm text-muted-foreground">{b.name} — {b.email} — {b.phone}</div>
                <div className="text-sm mt-1">Amount: {b.deposit_amount}</div>
                <div className="text-xs text-muted-foreground">Created: {b.created_at}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{b.status || 'pending'}</Badge>
                <Button onClick={() => updateStatus(b.id, 'paid')}>Mark Paid</Button>
                <Button variant="outline" onClick={() => updateStatus(b.id, 'pending')}>Mark Pending</Button>
                <Button variant="secondary" onClick={() => sendInvoice(b.id)}>Send Invoice</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
