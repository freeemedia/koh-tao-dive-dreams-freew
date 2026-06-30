import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b42b4f7a-b0b3-4ba9-8197-cf5abe9f09e6',
          subject: 'New Contact Message - Koh Tao Dive Dreams',
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(data.message || 'Error sending message');
      }
    } catch (err) {
      setStatus('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-slate-900">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-blue-500 focus:outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-blue-500 focus:outline-none"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        className="min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-blue-500 focus:outline-none"
      />
      <button type="submit" className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800">
        Send
      </button>
      <div className="text-sm text-slate-700">{status}</div>
    </form>
  );
}
