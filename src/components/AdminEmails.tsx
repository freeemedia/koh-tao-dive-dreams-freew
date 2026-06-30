import React, { useEffect, useState } from 'react';

const TEAM_EMAILS = [
  { email: 'contact@prodiving.asia', name: 'Contact' },
  { email: 'bas@divinginasia.com', name: 'Bas' },
  { email: 'peter@divinginasia.com', name: 'Peter' },
];

export default function AdminEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  async function fetchEmails() {
    setLoading(true);
    try {
      const adminToken = window.localStorage.getItem('admin_login_token');
      if (!adminToken) {
        setError('Not authenticated. Please login as admin.');
        return;
      }
      const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl || window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/emails`, {
        headers: {
          'x-admin-login-token': adminToken,
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setEmails(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError((err as any).message || 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  }

  async function assignEmail(emailId, assignedTo) {
    try {
      const adminToken = window.localStorage.getItem('admin_login_token');
      if (!adminToken) {
        setError('Not authenticated. Please login as admin.');
        return;
      }
      const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl || window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/emails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify({ id: emailId, assigned_to: assignedTo }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      fetchEmails();
    } catch (err) {
      setError((err as any).message || 'Failed to update email');
    }
  }

  if (loading) return <div>Loading emails...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Emails</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Subject</th>
            <th className="border px-2 py-1">Sender</th>
            <th className="border px-2 py-1">Assigned To</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map(email => (
            <tr key={email.id}>
              <td className="border px-2 py-1">{email.subject}</td>
              <td className="border px-2 py-1">{email.sender}</td>
              <td className="border px-2 py-1">{email.assigned_to || '-'}</td>
              <td className="border px-2 py-1">
                <select
                  value={email.assigned_to || ''}
                  onChange={e => assignEmail(email.id, e.target.value)}
                  className="border rounded px-1"
                >
                  <option value="">Unassigned</option>
                  {TEAM_EMAILS.map(user => (
                    <option key={user.email} value={user.email}>{user.name}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
