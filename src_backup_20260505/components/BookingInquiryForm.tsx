import React, { useState } from 'react';

const BookingInquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_title: '',
    preferred_date: '',
    experience_level: '',
    message: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('');
    // Send to Supabase API
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setResult('Booking saved!');
      } else {
        setResult('Failed to save booking: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setResult('Network error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'left', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ textAlign: 'center' }}>Booking / Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <label htmlFor="course_title">Course / Package</label>
        <input type="text" id="course_title" name="course_title" value={formData.course_title} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <label htmlFor="preferred_date">Preferred Date</label>
        <input type="date" id="preferred_date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <label htmlFor="experience_level">Experience Level</label>
        <select id="experience_level" name="experience_level" value={formData.experience_level} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }}>
          <option value="">Select...</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
        </select>

        <label htmlFor="message">Comments / Questions</label>
        <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />

        <button type="submit" disabled={isSubmitting} style={{ width: '100%', background: '#0070ba', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 0', fontSize: '1rem', fontWeight: 'bold' }}>
          {isSubmitting ? 'Sending...' : 'Send Booking'}
        </button>
        {result && <div style={{ marginTop: 12, color: result.includes('fail') ? 'red' : 'green' }}>{result}</div>}
      </form>
    </div>
  );
};

export default BookingInquiryForm;
