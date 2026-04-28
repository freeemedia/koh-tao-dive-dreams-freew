import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin-bookings');
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const json = await res.json();
      setBookings(Array.isArray(json) ? json : (json.bookings || []));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Bookings</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {bookings.length > 0 && Object.keys(bookings[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={booking.id || idx}>
                {Object.values(booking).map((value, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
