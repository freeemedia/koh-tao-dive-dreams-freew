import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MessageSquare, Globe, Hotel, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { queueWordPressCrmSync } from '@/lib/wordpressCrmSync';
import { sendBookingNotification } from '@/lib/sendBookingNotification';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().max(20).optional(),
  nationality: z.string().trim().max(80).optional(),
  accommodation: z.string().trim().max(120).optional(),
  guest_count: z.string().trim().max(2).optional(),
  preferred_date: z.string().optional(),
  experience_level: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  paymentChoice: z.enum(['paypal', 'inquire']).default('inquire'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  itemType: 'course' | 'dive';
  itemTitle: string;
  depositMajor?: number;
  depositCurrency?: string;
  crmSource?: string;
  crmTags?: string[];
}

const InlineCourseBookingForm: React.FC<Props> = ({
  itemType,
  itemTitle,
  depositMajor,
  depositCurrency = 'THB',
  crmSource = 'ktd-website',
  crmTags = [],
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [showAccommodationNotice, setShowAccommodationNotice] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState<FormData | null>(null);

  const apiBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
  const apiUrl = (path: string) => (apiBase ? `${apiBase}${path}` : path);
  const paypalBase = (import.meta.env.VITE_PAYPAL_LINK || 'https://paypal.me/prodivingasia').trim().replace(/\/+$/, '');
  const wpApiBase = (import.meta.env.VITE_WP_API_BASE || '').trim().replace(/\/+$/, '');
  const wpApiKey = (import.meta.env.VITE_WP_BOOKING_API_KEY || '').trim();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      nationality: '',
      accommodation: '',
      guest_count: '1',
      preferred_date: '',
      experience_level: '',
      message: '',
      paymentChoice: 'inquire',
    },
  });

  const { formState: { isSubmitting } } = form;

  // Prevent stale "submitted" success view when the selected item changes.
  useEffect(() => {
    setSubmitted(false);
    setSubmittedEmail('');
    setShowAccommodationNotice(false);
    setPendingSubmission(null);
  }, [itemTitle, itemType]);

  const submitBooking = async (data: FormData) => {
    try {
      const deposit = typeof depositMajor === 'number' ? depositMajor : 0;
      const guestCount = data.guest_count === '6' ? 6 : Number(data.guest_count || '1');

      const payload = {
        item_title: itemTitle,
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        nationality: data.nationality || 'N/A',
        accommodation: data.accommodation || 'N/A',
        guest_count: data.guest_count || '1',
        preferred_date: data.preferred_date || 'N/A',
        experience_level: data.experience_level || 'N/A',
        payment_choice: data.paymentChoice === 'paypal' ? 'paypal-deposit' : 'inquire',
        deposit_amount: deposit > 0 ? `฿${deposit}` : 'N/A',
        message: `Phone: ${data.phone || 'N/A'}\nNationality: ${data.nationality || 'N/A'}\nAccommodation: ${data.accommodation || 'N/A'}\nGroup Size: ${data.guest_count || '1'}\nPreferred Date: ${data.preferred_date || 'N/A'}\nExperience Level: ${data.experience_level || 'N/A'}\nPayment: ${data.paymentChoice}\n\nMessage:\n${data.message || 'N/A'}`,
      };

      let emailOk = false;
      let resData: any = {};
      try {
        const emailResult = await sendBookingNotification({
          endpointUrl: apiUrl('/api/send-booking-notification'),
          payload,
        });
        emailOk = emailResult.success;
        resData = {
          success: emailResult.success,
          warning: emailResult.warning,
          message: emailResult.message,
          provider: emailResult.provider,
        };
      } catch (emailErr) {
        console.warn('Email notification API unavailable; continuing with booking save flow.', emailErr);
      }

      let dbResult: any = null;
      let dbError: string | null = null;
      try {
        const dbRes = await fetch(apiUrl('/api/bookings'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            accommodation: data.accommodation,
            preferred_date: data.preferred_date,
            experience_level: data.experience_level,
            message: data.message,
            payment_choice: data.paymentChoice,
            item_type: itemType,
            booking_type: itemType,
            item_title: itemTitle,
            course_title: itemTitle,
            status: 'pending',
            guests: Number.isFinite(guestCount) ? guestCount : 1,
            deposit_amount: deposit,
            total_amount: deposit > 0 ? Math.round(deposit / 0.2) : 0,
            due_amount: deposit > 0 ? Math.round(deposit / 0.2) - deposit : 0,
            booking_source: crmSource,
            currency: depositCurrency,
          }),
        });
        dbResult = await dbRes.json().catch(() => ({}));
        if (!dbRes.ok) {
          dbError = dbResult?.error || `HTTP ${dbRes.status}`;
        }
      } catch (err) {
        dbError = err instanceof Error ? err.message : 'Booking persistence failed';
      }

      let wpDirectError: string | null = null;
      let wpDirectSaved = false;
      if (wpApiBase && wpApiKey) {
        try {
          const wpRes = await fetch(`${wpApiBase}/wp-json/ktd/v1/bookings/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: wpApiKey,
              status: 'new',
              booking_type: itemType,
              item_title: itemTitle,
              course_title: itemTitle,
              name: data.name,
              email: data.email,
              phone: data.phone || '',
              accommodation: data.accommodation || '',
              preferred_date: data.preferred_date || '',
              guests: Number.isFinite(guestCount) ? guestCount : 1,
              experience_level: data.experience_level || '',
              payment_choice: data.paymentChoice,
              currency: depositCurrency,
              deposit_amount: deposit,
              total_amount: deposit > 0 ? Math.round(deposit / 0.2) : 0,
              due_amount: deposit > 0 ? Math.round(deposit / 0.2) - deposit : 0,
              message: data.message || '',
              booking_source: crmSource,
            }),
          });
          wpDirectSaved = wpRes.ok;
          if (!wpRes.ok) {
            wpDirectError = `WP direct save failed (HTTP ${wpRes.status})`;
          }
        } catch (err) {
          wpDirectError = err instanceof Error ? err.message : 'WP direct save failed';
        }

        queueWordPressCrmSync({
          wpApiBase,
          wpApiKey,
          payload: {
            source: crmSource,
            source_page: window.location.pathname,
            event_type: 'booking_created',
            submitted_at: new Date().toISOString(),
            contact: {
              full_name: data.name,
              email: data.email,
              phone: data.phone || '',
              country: data.nationality || '',
            },
            booking: {
              course_interest: itemTitle,
              preferred_start_date: data.preferred_date || '',
              experience_level: data.experience_level || '',
              guest_count: Number.isFinite(guestCount) ? guestCount : 1,
              accommodation_interest: data.accommodation || '',
              message: data.message || '',
              payment_choice: data.paymentChoice,
              payment_status: data.paymentChoice === 'paypal' ? 'deposit_paypal_redirect' : 'new_inquiry',
              deposit_amount: deposit || undefined,
              currency: depositCurrency,
            },
            tags: ['ktd', 'website-form', `${itemType}-page`, 'inline-form', ...crmTags].filter(Boolean),
          },
        });
      }

      if (dbError) {
        toast.error(`Booking not saved to WordPress: ${dbError}`);
      }

      const bookingSaved = wpDirectSaved || !dbError;

      if (bookingSaved) {
        if (dbError) {
          toast.warning('Booking saved to WordPress directly, but API mirror failed.');
        }
        if (wpDirectError) {
          toast.warning(`WordPress direct save warning: ${wpDirectError}`);
        }
        if (!emailOk) {
          toast.warning('Booking saved, but email notification is currently unavailable.');
        }
        if (dbResult?.warning) {
          toast.warning(`WordPress saved with warning: ${dbResult.warning}`);
        }
        setSubmittedEmail(data.email);
        setSubmitted(true);
        form.reset();

        if (data.paymentChoice === 'paypal' && deposit > 0) {
          toast.success('Booking sent! Redirecting to PayPal...');
          setTimeout(() => { window.location.href = `${paypalBase}/${deposit}THB`; }, 1500);
        } else {
          toast.success('Booking inquiry sent! We\'ll be in touch within 24 hours.');
        }
      } else {
        const errMsg = resData?.message || resData?.error || 'Booking and email services unavailable';
        toast.error(`Failed to send booking: ${errMsg}`);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      toast.error('Submission failed. Please try again.');
    }
  };

  const onSubmit = async (data: FormData) => {
    // Require explicit acknowledgment when accommodation is provided.
    if ((data.accommodation || '').trim().length > 0) {
      setPendingSubmission(data);
      setShowAccommodationNotice(true);
      return;
    }

    await submitBooking(data);
  };

  const handleAccommodationConfirm = async () => {
    const data = pendingSubmission;
    setShowAccommodationNotice(false);
    setPendingSubmission(null);
    if (data) {
      await submitBooking(data);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-6 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Booking Received!</h3>
        <p className="text-emerald-700">Confirmation sent to <strong>{submittedEmail}</strong>. We'll be in touch within 24 hours.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name *</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email *</FormLabel>
              <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</FormLabel>
              <FormControl><Input placeholder="+66 123 456 789" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="nationality" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Globe className="h-4 w-4" /> Nationality</FormLabel>
              <FormControl><Input placeholder="e.g. Dutch, British, Thai" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="accommodation" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Hotel className="h-4 w-4" /> Accommodation</FormLabel>
              <FormControl><Input placeholder="Hotel name or area on Koh Tao" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="preferred_date" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Preferred Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="guest_count" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4" /> Group Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || '1'}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="How many people?" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4 people</SelectItem>
                  <SelectItem value="5">5 people</SelectItem>
                  <SelectItem value="6">6+ people</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="experience_level" render={({ field }) => (
          <FormItem>
            <FormLabel>Experience Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Select your experience level" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">No diving experience</SelectItem>
                <SelectItem value="beginner">Beginner (1-10 dives)</SelectItem>
                <SelectItem value="intermediate">Intermediate (10-50 dives)</SelectItem>
                <SelectItem value="advanced">Advanced (50+ dives)</SelectItem>
                <SelectItem value="professional">Professional diver</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Message</FormLabel>
            <FormControl><Textarea placeholder="Any questions or special requests?" rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {typeof depositMajor === 'number' && depositMajor > 0 && (
          <div className="p-4 border rounded-lg bg-muted/20">
            <p className="font-semibold mb-3 text-sm">Payment Option</p>
            <FormField control={form.control} name="paymentChoice" render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" className="mt-1" value="paypal" checked={field.value === 'paypal'} onChange={() => field.onChange('paypal')} />
                    <div>
                      <div className="font-medium text-sm">Pay ฿{depositMajor} deposit now via PayPal</div>
                      <div className="text-xs text-muted-foreground">You'll be redirected to PayPal after submitting.</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" className="mt-1" value="inquire" checked={field.value === 'inquire'} onChange={() => field.onChange('inquire')} />
                    <div>
                      <div className="font-medium text-sm">Inquire only — pay later</div>
                      <div className="text-xs text-muted-foreground">We'll contact you to arrange payment.</div>
                    </div>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          {isSubmitting
            ? 'Sending...'
            : (form.watch('paymentChoice') === 'paypal' && typeof depositMajor === 'number' && depositMajor > 0
              ? `Book Now & Pay ฿${depositMajor} Deposit via PayPal`
              : 'Book with Us Now')}
        </Button>
      </form>

      <Dialog open={showAccommodationNotice} onOpenChange={setShowAccommodationNotice}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Accommodation Notice</DialogTitle>
            <DialogDescription>
              Accommodation must be confirmed at least 1 week in advance. If confirmation is later than that, payment for accommodation may be charged separately from the course.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAccommodationNotice(false);
                setPendingSubmission(null);
              }}
            >
              Edit Booking
            </Button>
            <Button
              type="button"
              onClick={handleAccommodationConfirm}
            >
              I Understand, Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default InlineCourseBookingForm;
