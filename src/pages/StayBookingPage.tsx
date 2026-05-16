import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.toString()) return;

    const accommodationType = (params.get('accommodationType') || '').toLowerCase();
    const guests = Number(params.get('people'));
    const nights = Number(params.get('nights'));
    const message = params.get('message') || '';
    const diving = (params.get('diving') || '').toLowerCase();

    const accommodationMap: Record<string, string> = {
      family: 'family-bungalow',
      basic: 'basic-room',
      bungalow: 'bungalow',
    };

    const mappedAccommodation = accommodationMap[accommodationType] || accommodationType;
    if (mappedAccommodation) {
      form.setValue('accommodation', mappedAccommodation, { shouldDirty: false });
    }

    if (Number.isFinite(guests) && guests >= 1 && guests <= 10) {
      form.setValue('guests', guests, { shouldDirty: false });
    }

    if (Number.isFinite(nights) && nights >= 1 && nights <= 90) {
      form.setValue('nights', nights, { shouldDirty: false });
    }

    const divingLine = diving ? `Diving with us: ${diving === 'yes' ? 'Yes' : 'No'}` : '';
    const combinedMessage = [message, divingLine].filter(Boolean).join('\n');
    if (combinedMessage) {
      form.setValue('message', combinedMessage, { shouldDirty: false });
    }
  }, [form]);

  const watchedAccommodation = form.watch('accommodation');
  const showAdvanceWarning = ADVANCE_WARNING_VALUES.has(watchedAccommodation as string);

  const onSubmit = async (data: StayFormData) => {
    setIsSubmitting(true);
    try {
      const accommodationLabel =
        ACCOMMODATION_OPTIONS.find((o) => o.value === data.accommodation)?.label ??
        data.accommodation;

      const payload = {
        id: crypto.randomUUID(),
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
        created_at: new Date().toISOString(),
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

      // Store for ThankYouPage display
      sessionStorage.setItem(
        'bookingData',
        JSON.stringify({
          item_title: `Accommodation: ${accommodationLabel}`,
          name: data.name,
          email: data.email,
          phone: data.phone || 'N/A',
          accommodation: accommodationLabel,
          preferred_date: data.preferred_date,
          experience_level: `${data.nights} night(s), ${data.guests} guest(s)`,
          payment_choice: 'Enquiry only — no payment required now',
        }),
      );

      toast.success('Enquiry received! We will be in touch shortly.');
      setTimeout(() => { window.location.href = '/thank-you'; }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(`Submission failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Form screen ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-10">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Stay With Us in Koh Tao</h1>
        <p className="text-blue-200 text-sm md:text-base max-w-2xl mx-auto">
          Choose your room and let us take care of the rest. Cozy rooms and bungalows right next
          to our dive centre.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Compact room reference */}
        <div className="rounded-xl border bg-white shadow-sm p-4 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-slate-700">
              <span className="font-semibold">Quick rates:</span> Family ฿4,000–6,000, Basic ฿1,450–1,650, Bungalow ฿1,600–2,000
            </div>
            <BedDouble className="text-blue-600" size={18} />
          </div>
          <details className="mt-2 text-xs text-slate-600">
            <summary className="cursor-pointer select-none font-medium text-slate-700">View room details</summary>
            <ul className="mt-2 space-y-1">
              <li><strong>Family Bungalow:</strong> up to 5 guests</li>
              <li><strong>Basic Room:</strong> 2 guests</li>
              <li><strong>Bungalow:</strong> 2 guests</li>
            </ul>
          </details>
        </div>

        {/* Booking form */}
        <div className="bg-white rounded-2xl shadow-md border p-5 md:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Accommodation Enquiry</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

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
