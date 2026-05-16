import React, { useEffect, useState } from 'react';




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

const normalizeCourseTitle = (itemRaw: string, typeRaw: string) => {
  const item = String(itemRaw || '').toLowerCase();
  const type = String(typeRaw || '').toLowerCase();

  if (item.includes('advanced')) return 'Advanced Open Water';
  if (item.includes('open water')) return 'Open Water';
  if (item.includes('rescue')) return 'Rescue Diver';
  if (item.includes('divemaster')) return 'Divemaster';
  if (item.includes('instructor') || item.includes('idc')) return 'IDC (Instructor Development Course)';
  if (item.includes('fun dive') || type === 'dive') return 'Fun Dive';

  return '';
};

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
  const [priceOverride, setPriceOverride] = useState<number | null>(null);
  const [currencyOverride, setCurrencyOverride] = useState('THB');

  const coursePrice = priceOverride ?? COURSE_PRICES[form.course_title] ?? 0;
  const deposit = coursePrice > 0 ? Math.round(coursePrice * COURSE_DEPOSIT_RATE) : 0;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item') || '';
    const type = params.get('type') || '';
    const price = Number(params.get('price'));
    const currency = (params.get('currency') || 'THB').toUpperCase();
    const dives = params.get('dives') || '';

    const prefillCourse = normalizeCourseTitle(item, type);
    if (prefillCourse) {
      setForm((prev) => ({ ...prev, course_title: prefillCourse }));
    }

    if (Number.isFinite(price) && price > 0) {
      setPriceOverride(price);
    }

    if (currency) {
      setCurrencyOverride(currency);
    }

    if (dives) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `Requested dives: ${dives}`,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'course_title' && priceOverride !== null) {
      setPriceOverride(null);
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendToBookingApiAndEmail = async (payNow: boolean): Promise<boolean> => {
    const totalAmount = coursePrice > 0 ? coursePrice : null;
    const depositAmount = deposit > 0 ? deposit : null;
    const dueAmount = totalAmount != null && depositAmount != null
      ? Math.max(totalAmount - depositAmount, 0)
      : null;

    // Submit via API (WordPress/MySQL booking storage)
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
            currency: currencyOverride,
            total_amount: totalAmount,
            deposit_amount: depositAmount,
            due_amount: dueAmount,
            booking_source: 'website-form',
          }),
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
      ]);

      if (result instanceof Response) {
        if (!result.ok) {
          const failureBody = await result.json().catch(() => null);
          setError(failureBody?.error || 'Booking submission failed. Please try again.');
          return false;
        }

        const body = await result.json().catch(() => null);
        if (body?.wp_mirror_warning) {
          setError(`Booking saved, but WordPress dashboard sync failed: ${String(body.wp_mirror_warning)}`);
        }
      }
      return true;
    } catch {
      setError('Booking submitted, but sync check timed out. Please verify in admin.');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Courses without a defined price should skip deposit options and be submitted as enquiry.
    if (coursePrice <= 0) {
      setLoading(true);
      const ok = await sendToBookingApiAndEmail(false);
      if (ok) {
        setShowThankYou(true);
      }
      setLoading(false);
      return;
    }

    setShowPayOptions(true);
  };

  const handlePayNow = async () => {
    setLoading(true);
    const ok = await sendToBookingApiAndEmail(true);
    if (ok) {
      window.location.href = `${PAYPAL_BASE}/${deposit}THB`;
      return;
    }
    setLoading(false);
  };

  const handleNotNow = async () => {
    setLoading(true);
    const ok = await sendToBookingApiAndEmail(false);
    if (ok) {
      setShowThankYou(true);
    }
    setLoading(false);
  };

  const containerStyle: React.CSSProperties = fullPage
    ? {
        width: '100%',
        maxWidth: 920,
        margin: '0 auto',
        background: '#fff',
        color: '#222',
        padding: '2.5rem',
        borderRadius: 14,
        boxShadow: '0 12px 40px rgba(2, 6, 23, 0.12)',
      }
    : {
        maxWidth: 500,
        margin: '2rem auto',
        background: '#fff',
        color: '#222',
        padding: '2.5rem',
        borderRadius: 10,
        boxShadow: '0 2px 12px #0002',
      };

  return (
    <div className="form-container" style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img src="/images/logo.png" alt="Diving In Asia Logo" style={{ maxWidth: 180, height: 'auto' }} />
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Booking / Inquiry Form</h2>
      {showThankYou ? (
        <div style={{ background: '#e6ffe6', borderRadius: 8, padding: 32, textAlign: 'center', fontSize: '1.1em', color: '#1a4d1a', marginTop: 24 }}>
          <p>You have chosen not to pay now. That's fine, we will contact you to discuss your arrangements.</p>
          <p style={{ marginTop: 16 }}>Thank you – Team Asia</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* ...existing code... */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="name" style={{ marginBottom: 4, fontWeight: 500 }}>Name</label>
              <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="course_title" style={{ marginBottom: 4, fontWeight: 500 }}>Course</label>
              <select id="course_title" name="course_title" required value={form.course_title} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select...</option>
                <option value="Open Water">Open Water</option>
                <option value="Advanced Open Water">Advanced Open Water</option>
                <option value="Rescue Diver">Rescue Diver</option>
                <option value="Divemaster">Divemaster</option>
                <option value="IDC (Instructor Development Course)">IDC (Instructor Development Course)</option>
                <option value="Fun Dive">Fun Dive</option>
              </select>
            </div>
            {form.course_title && coursePrice > 0 && (
              <div style={{ background: '#f0f8ff', borderRadius: 6, padding: '1rem', marginBottom: 8 }}>
                <div><strong>Course Price:</strong> {coursePrice.toLocaleString()} THB</div>
                <div><strong>Deposit (20%):</strong> {deposit.toLocaleString()} THB</div>
                {priceOverride !== null && (
                  <div style={{ fontSize: '0.9em', color: '#555', marginTop: 4 }}>
                    Prefilled from link ({currencyOverride})
                  </div>
                )}
                <div style={{ fontSize: '0.95em', color: '#555', marginTop: 4 }}>You can pay the deposit now to secure your spot, or choose to pay later.</div>
              </div>
            )}
            {/* ...existing code... */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="email" style={{ marginBottom: 4, fontWeight: 500 }}>Email</label>
              <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="phone" style={{ marginBottom: 4, fontWeight: 500 }}>Phone</label>
              <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="accommodation_type" style={{ marginBottom: 4, fontWeight: 500 }}>Accommodation Type</label>
              <select id="accommodation_type" name="accommodation_type" value={form.accommodation_type} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select...</option>
                <option value="standard">Standard Room</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="suite">Suite</option>
                <option value="other">Other / Not sure</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="arrival_date" style={{ marginBottom: 4, fontWeight: 500 }}>Arrival Date</label>
              <input type="date" id="arrival_date" name="arrival_date" value={form.arrival_date} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="diving_experience" style={{ marginBottom: 4, fontWeight: 500 }}>Diving Experience</label>
              <select id="diving_experience" name="diving_experience" value={form.diving_experience} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select...</option>
                <option value="none">No diving experience</option>
                <option value="beginner">Beginner (1-10 dives)</option>
                <option value="intermediate">Intermediate (10-50 dives)</option>
                <option value="advanced">Advanced (50+ dives)</option>
                <option value="professional">Professional diver</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="message" style={{ marginBottom: 4, fontWeight: 500 }}>Comments / Questions</label>
              <textarea id="message" name="message" rows={3} placeholder="Let us know any special requests, questions, or details..." value={form.message} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {!showPayOptions && (
              <button type="submit" disabled={loading} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#0070ba', color: '#fff', border: 'none', borderRadius: 4, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Submitting...' : 'Submit Booking'}
              </button>
            )}
          </form>
          {/* Payment options modal/section */}
          {showPayOptions && form.course_title && coursePrice > 0 && (
            <div style={{ marginTop: 24, background: '#f8f8f8', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 1px 6px #0001' }}>
              <h3 style={{ marginBottom: 12 }}>Secure Your Spot</h3>
              <div style={{ marginBottom: 8 }}>Pay a <strong>20% deposit ({deposit.toLocaleString()} THB)</strong> now via PayPal to confirm your booking, or choose to pay later.</div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
                <button onClick={handlePayNow} disabled={loading} style={{ background: '#0070ba', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Processing...' : 'Pay Now (PayPal)'}
                </button>
                <button onClick={handleNotNow} disabled={loading} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Processing...' : 'Send Enquiry'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookNowForm;
