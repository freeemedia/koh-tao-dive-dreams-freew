import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const NewBooking: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course_title: '',
    preferred_date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { name, email, course_title, preferred_date } = form;
    if (!name || !email || !course_title || !preferred_date) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('bookings').insert([{ ...form }]);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', course_title: '', preferred_date: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Your Dive</h2>
      {success && <div className="mb-4 text-green-700">Booking submitted! We’ll contact you soon.</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Course *</label>
          <input name="course_title" value={form.course_title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Preferred Date *</label>
          <input name="preferred_date" type="date" value={form.preferred_date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold" disabled={loading}>
          {loading ? 'Submitting...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default NewBooking;
