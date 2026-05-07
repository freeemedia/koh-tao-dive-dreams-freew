import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase.from('emails').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setEmails(data);
    setLoading(false);
  }

  async function assignEmail(emailId, assignedTo) {
    await supabase.from('emails').update({ assigned_to: assignedTo }).eq('id', emailId);
    fetchEmails();
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
