import React, { useState } from 'react';




const COURSE_PRICES: Record<string, number> = {
  'Open Water': 11500,
  'Advanced Open Water': 10500,
  'Rescue Diver': 10000,
  'Divemaster': 35000,
  'IDC (Instructor Development Course)': 0,
  'Fun Dive': 1800,
};

const COURSE_DEPOSIT_RATE = 0.2;

const PAYPAL_BASE = 'https://paypal.me/prodivingasia';

interface BookNowFormProps {
  fullPage?: boolean;
}

const BookNowForm: React.FC<BookNowFormProps> = ({ fullPage = false }) => {
  const [form, setForm] = useState({
    name: '',
    course_title: '',
    email: '',
    phone: '',
    accommodation_type: '',
    arrival_date: '',
    diving_experience: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayOptions, setShowPayOptions] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const coursePrice = COURSE_PRICES[form.course_title] || 0;
  const deposit = coursePrice > 0 ? Math.round(coursePrice * COURSE_DEPOSIT_RATE) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendToSupabaseAndEmail = async (payNow: boolean) => {
    const totalAmount = coursePrice > 0 ? coursePrice : null;
    const depositAmount = deposit > 0 ? deposit : null;
    const dueAmount = totalAmount != null && depositAmount != null
      ? Math.max(totalAmount - depositAmount, 0)
      : null;

    // Submit via API (saves to Supabase + mirrors to WordPress)
    try {
      const result = await Promise.race([
        fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            course_title: form.course_title,
            email: form.email,
            phone: form.phone,
            accommodation: form.accommodation_type,
            preferred_date: form.arrival_date,
            experience_level: form.diving_experience,
            payment_choice: payNow ? 'deposit_requested' : 'pending',
            message: form.message,
            status: 'new',
            booking_type: 'course',
            item_title: form.course_title,
            selected_price: totalAmount,
            currency: 'THB',
            total_amount: totalAmount,
            deposit_amount: depositAmount,
            due_amount: dueAmount,
            booking_source: 'vercel-form',
          }),
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
      ]);

      if (result instanceof Response) {
        const body = await result.json().catch(() => null);
        if (body?.wp_mirror_warning) {
          setError(`Booking saved, but WordPress dashboard sync failed: ${String(body.wp_mirror_warning)}`);
        }
      }
    } catch {
      setError('Booking submitted, but sync check timed out. Please verify in admin.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowPayOptions(true);
  };

  const handlePayNow = async () => {
    setLoading(true);
    sendToSupabaseAndEmail(true);
    // Redirect after 500ms to let API fire
    setTimeout(() => {
      window.location.href = `${PAYPAL_BASE}/${deposit}THB`;
    }, 500);
  };

  const handleNotNow = async () => {
    setLoading(true);
    sendToSupabaseAndEmail(false);
    // Show thank you after 500ms to let API fire
    setTimeout(() => {
      setShowThankYou(true);
      setLoading(false);
    }, 500);
  };

  const wpFormUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com/?fluent_forms_pages=1&preview_id=3';

  return (
    <div className={fullPage ? 'w-full' : 'w-full max-w-lg mx-auto'}>
      <iframe
        src={wpFormUrl}
        className="w-full"
        style={{ minHeight: '700px', border: 'none' }}
        title="Booking Form"
      />
    </div>
  );
};

export default BookNowForm;
