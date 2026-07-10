
import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void | Promise<void>;
}


const LOCAL_STORAGE_KEY = 'bookingModalForm';

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    experience: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load saved form data when modal opens
  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          setForm(JSON.parse(saved));
        } catch {
          setForm({
            name: '',
            email: '',
            phone: '',
            date: '',
            experience: '',
            message: '',
          });
        }
      } else {
        setForm({
          name: '',
          email: '',
          phone: '',
          date: '',
          experience: '',
          message: '',
        });
      }
    }
  }, [open]);

  if (!open) return null;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await Promise.resolve(onSubmit(form));
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      onClose();
    } catch {
      setSubmitError('Unable to submit right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs max-h-[calc(100vh-4rem)] overflow-auto rounded-lg bg-white p-2 text-gray-900 shadow-lg sm:max-w-sm sm:p-4 md:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">New Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" />
          <input name="date" value={form.date} onChange={handleChange} placeholder="Preferred Date" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" type="date" />
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience Level" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full border p-1.5 sm:p-2 rounded text-gray-900 text-sm sm:text-base" />
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
          <div className="flex justify-end gap-2 mt-2 sm:mt-4">
            <button type="button" onClick={onClose} disabled={submitting} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 rounded text-gray-900 text-sm sm:text-base disabled:opacity-60">Cancel</button>
            <button type="submit" disabled={submitting} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-sm sm:text-base disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
