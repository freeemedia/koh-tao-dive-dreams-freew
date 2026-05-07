import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch bookings for the logged-in user
    setLoading(false);
  }, []);

  if (loading) return <div>Loading your bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {/* List bookings here */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id} className="mb-4 border-b pb-2">
              <div><strong>Course:</strong> {b.course_title}</div>
              <div><strong>Date:</strong> {b.preferred_date || '-'}</div>
              <div><strong>Status:</strong> {b.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
