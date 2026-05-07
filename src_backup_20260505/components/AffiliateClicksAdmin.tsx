import React, { useEffect, useState } from 'react';

const AffiliateClicksAdmin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/affiliate-clicks?provider=trip')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Trip.com clicks...</div>;
  if (error) return <div className="text-red-600">Error loading affiliate clicks.</div>;
  if (!data) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Trip.com Affiliate Clicks</h2>
      <div className="mb-2">Total Clicks: <b>{data.total}</b></div>
      <div className="mb-4">Recent Clicks (latest 100):</div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Time</th>
              <th className="border px-2 py-1">Hotel Name</th>
              <th className="border px-2 py-1">Hotel URL</th>
              <th className="border px-2 py-1">Placement</th>
              <th className="border px-2 py-1">Page</th>
            </tr>
          </thead>
          <tbody>
            {data.recent.map((event, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{event.clicked_at ? new Date(event.clicked_at).toLocaleString() : ''}</td>
                <td className="border px-2 py-1">{event.hotel_name || '-'}</td>
                <td className="border px-2 py-1"><a href={event.hotel_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">link</a></td>
                <td className="border px-2 py-1">{event.placement || '-'}</td>
                <td className="border px-2 py-1">{event.page_path || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AffiliateClicksAdmin;
