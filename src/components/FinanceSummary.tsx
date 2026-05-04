import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const FinanceSummary: React.FC = () => {
  const [summary, setSummary] = useState<{ total: number; outstanding: number; count: number }>({ total: 0, outstanding: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      // Fetch all bookings and aggregate totals
      const { data, error } = await supabase.from('bookings').select('total_amount, due_amount');
      if (error || !data) return setLoading(false);
      let total = 0, outstanding = 0, count = 0;
      data.forEach((b: any) => {
        if (typeof b.total_amount === 'number') total += b.total_amount;
        if (typeof b.due_amount === 'number') outstanding += b.due_amount;
        count++;
      });
      setSummary({ total, outstanding, count });
      setLoading(false);
    }
    fetchSummary();
  }, []);

  if (loading) return null;

  return (
    <div className="w-full flex justify-center my-4">
      <div className="bg-white shadow rounded px-6 py-3 flex gap-8 items-center text-lg font-semibold text-slate-800">
        <span>Bookings: <span className="text-blue-600">{summary.count}</span></span>
        <span>Total Revenue: <span className="text-green-600">IDR {summary.total.toLocaleString()}</span></span>
        <span>Outstanding: <span className="text-red-600">IDR {summary.outstanding.toLocaleString()}</span></span>
      </div>
    </div>
  );
};

export default FinanceSummary;
