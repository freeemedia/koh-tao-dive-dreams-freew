import React, { useEffect, useState } from 'react';

const FinanceSummary: React.FC = () => {
  const [summary, setSummary] = useState<{ total: number; outstanding: number; count: number }>({ total: 0, outstanding: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
        const baseUrl = apiUrl || window.location.origin;
        const adminToken = window.localStorage.getItem('admin_login_token');
        if (!adminToken) {
          setLoading(false);
          return;
        }
        const response = await fetch(`${baseUrl}/api/admin-bookings`, {
          headers: {
            'x-admin-login-token': adminToken,
          },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const bookings = Array.isArray(data) ? data : [];
        let total = 0, outstanding = 0, count = 0;
        bookings.forEach((b: any) => {
          if (typeof b.total_amount === 'number') total += b.total_amount;
          if (typeof b.due_amount === 'number') outstanding += b.due_amount;
          count++;
        });
        setSummary({ total, outstanding, count });
      } catch (err) {
        console.error('Failed to fetch booking summary:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  if (loading) return null;

  return (
    <div className="w-full flex justify-center my-4">
      <div className="bg-white shadow rounded px-6 py-3 flex gap-8 items-center text-lg font-semibold text-slate-800">
        <span>Bookings: <span className="text-blue-600">{summary.count}</span></span>
        <span>Total Revenue: <span className="text-green-600">฿{summary.total.toLocaleString()}</span></span>
        <span>Outstanding: <span className="text-red-600">฿{summary.outstanding.toLocaleString()}</span></span>
      </div>
    </div>
  );
};

export default FinanceSummary;
