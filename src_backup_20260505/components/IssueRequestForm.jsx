import React, { useState } from 'react';

const IssueRequestForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/create-jira-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Issue submitted successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to submit issue.');
      }
    } catch (err) {
      setStatus('Error submitting issue.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Report an Issue / Request</h2>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Message:
        <textarea name="message" value={form.message} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Submit</button>
      <div>{status}</div>
    </form>
  );
};

export default IssueRequestForm;
