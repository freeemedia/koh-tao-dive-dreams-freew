import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, BedDouble, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { sendBookingNotification } from '@/lib/sendBookingNotification';

// ─── Accommodation options from /Accommodation page ─────────────────────────
const ACCOMMODATION_OPTIONS = [
  { value: 'none', label: 'No accommodation needed' },
  { value: 'own', label: 'I have my own accommodation' },
  { value: 'family-bungalow', label: 'Family Bungalow (up to 5 guests) — ฿4,000–6,000 / night' },
  { value: 'basic-room', label: 'Basic Room (2 guests) — ฿1,450–1,650 / night' },
  { value: 'bungalow', label: 'Bungalow (2 guests) — ฿1,600–2,000 / night' },
  { value: 'partner-resort', label: 'Help me find a partner resort (Trip.com / Agoda)' },
] as const;

/** Values that require the 7-day advance warning */
const ADVANCE_WARNING_VALUES = new Set([
  'family-bungalow',
  'basic-room',
  'bungalow',
  'partner-resort',
]);

// ─── Zod schema ─────────────────────────────────────────────────────────────
const staySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().max(20).optional(),
  accommodation: z.string().min(1, 'Please select an accommodation option'),
  preferred_date: z.string().trim().min(1, 'Check-in date is required'),
  nights: z.coerce
    .number({ invalid_type_error: 'Enter a number of nights' })
    .int()
    .min(1, 'Minimum 1 night')
    .max(90, 'Maximum 90 nights'),
  guests: z.coerce
    .number({ invalid_type_error: 'Enter a number of guests' })
    .int()
    .min(1, 'Minimum 1 guest')
    .max(10, 'Maximum 10 guests'),
  message: z.string().trim().max(1000).optional(),
});

type StayFormData = z.infer<typeof staySchema>;

// ─── Component ───────────────────────────────────────────────────────────────
const StayBookingPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<StayFormData | null>(null);

  const apiBaseRaw = (import.meta.env.VITE_API_BASE_URL || '').trim();
  const apiBase = apiBaseRaw ? apiBaseRaw.replace(/\/+$/, '') : '';
  const apiUrl = (path: string) => `${apiBase}${path}`;

  const form = useForm<StayFormData>({
    resolver: zodResolver(staySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      accommodation: '',
      preferred_date: '',
      nights: 1,
      guests: 1,
      message: '',
    },
  });

  const watchedAccommodation = form.watch('accommodation');
  const showAdvanceWarning = ADVANCE_WARNING_VALUES.has(watchedAccommodation as string);

  const onSubmit = async (data: StayFormData) => {
    setIsSubmitting(true);
    try {
      const accommodationLabel =
        ACCOMMODATION_OPTIONS.find((o) => o.value === data.accommodation)?.label ??
        data.accommodation;

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        course_title: `Accommodation: ${accommodationLabel}`,
        preferred_date: data.preferred_date,
        status: 'new',
        notes: [
          `Accommodation: ${accommodationLabel}`,
          `Check-in: ${data.preferred_date}`,
          `Nights: ${data.nights}`,
          `Guests: ${data.guests}`,
          data.message ? `Message: ${data.message}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        booking_type: 'stay',
        nights: data.nights,
        guests: data.guests,
        accommodation: data.accommodation,
      };

      const res = await fetch(apiUrl('/api/bookings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server error ${res.status}`);
      }

      // Fire-and-forget email notification (same helper used elsewhere)
      sendBookingNotification({
        ...payload,
        item: `Accommodation: ${accommodationLabel}`,
        currency: 'THB',
      }).catch(() => {});

      setSubmittedData(data);
      setSubmitted(true);
      toast.success('Enquiry received! We will be in touch shortly.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(`Submission failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted && submittedData) {
    const accommodationLabel =
      ACCOMMODATION_OPTIONS.find((o) => o.value === submittedData.accommodation)?.label ??
      submittedData.accommodation;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-start justify-center pt-20 pb-16 px-4">
        <div className="max-w-lg w-full rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-8 space-y-6 shadow-lg">
          <div className="text-center">
            <div className="text-4xl mb-3">🏡</div>
            <h2 className="text-2xl font-bold text-emerald-900">Enquiry Received!</h2>
            <p className="text-emerald-700 mt-1">
              Confirmation sent to <strong>{submittedData.email}</strong>
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 text-sm space-y-2">
            <div>
              <span className="font-semibold">Name:</span> {submittedData.name}
            </div>
            <div>
              <span className="font-semibold">Accommodation:</span> {accommodationLabel}
            </div>
            <div>
              <span className="font-semibold">Check-in:</span> {submittedData.preferred_date}
            </div>
            <div>
              <span className="font-semibold">Nights:</span> {submittedData.nights}
            </div>
            <div>
              <span className="font-semibold">Guests:</span> {submittedData.guests}
            </div>
            {submittedData.message && (
              <div>
                <span className="font-semibold">Message:</span> {submittedData.message}
              </div>
            )}
          </div>

          <div className="bg-emerald-100 rounded-lg border-l-4 border-emerald-600 p-4 text-sm text-emerald-900">
            <p className="font-semibold mb-1">What happens next?</p>
            <p>
              Our team will review your request and contact you within 24 hours to confirm
              availability and details. Check your inbox — and your spam folder just in case!
            </p>
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              form.reset();
              setSubmitted(false);
              setSubmittedData(null);
            }}
          >
            Submit another enquiry
          </Button>
        </div>
      </div>
    );
  }

  // ── Form screen ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Stay With Us in Koh Tao</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Choose your room and let us take care of the rest. Cozy rooms and bungalows right next
          to our dive centre.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-10">
        {/* Room cards quick reference */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { name: 'Family Bungalow', guests: 'up to 5', price: '฿4,000–6,000' },
            { name: 'Basic Room', guests: '2 guests', price: '฿1,450–1,650' },
            { name: 'Bungalow', guests: '2 guests', price: '฿1,600–2,000' },
          ].map((room) => (
            <div
              key={room.name}
              className="rounded-xl border bg-white shadow-sm p-4 text-center text-sm"
            >
              <BedDouble className="mx-auto mb-2 text-blue-600" size={22} />
              <p className="font-semibold text-gray-800">{room.name}</p>
              <p className="text-gray-500">{room.guests}</p>
              <p className="text-blue-700 font-medium mt-1">{room.price} / night</p>
            </div>
          ))}
        </div>

        {/* Booking form */}
        <div className="bg-white rounded-2xl shadow-md border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Accommodation Enquiry</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <User size={14} className="inline mr-1" />
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Mail size={14} className="inline mr-1" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Phone size={14} className="inline mr-1" />
                      Phone / WhatsApp
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+66 ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Accommodation */}
              <FormField
                control={form.control}
                name="accommodation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <BedDouble size={14} className="inline mr-1" />
                      Accommodation *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACCOMMODATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 7-day advance warning */}
              {showAdvanceWarning && (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="font-semibold mb-1">⚠️ Accommodation Booking Notice</p>
                  <p>
                    We can only confirm <strong>free accommodation</strong> when booked with a
                    diving course and at least{' '}
                    <strong>7 days in advance</strong>. We will however assist you in finding a
                    suitable resort with one of our partner resorts.
                  </p>
                </div>
              )}

              {/* Date + Nights + Guests row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="preferred_date"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormLabel>
                        <Calendar size={14} className="inline mr-1" />
                        Check-in Date *
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nights</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={90} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Users size={14} className="inline mr-1" />
                        Guests
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <MessageSquare size={14} className="inline mr-1" />
                      Special Requests / Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Anything we should know? Dietary requirements, room preferences, early check-in..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3"
              >
                {isSubmitting ? 'Sending enquiry...' : 'Send Accommodation Enquiry'}
              </Button>

              <p className="text-center text-xs text-gray-400">
                No payment required now — we'll confirm availability and pricing by email.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StayBookingPage;
