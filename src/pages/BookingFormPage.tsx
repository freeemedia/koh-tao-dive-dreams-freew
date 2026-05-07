// Rezdy integration removed — use internal booking flow
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { sendBookingNotification } from '@/lib/sendBookingNotification';

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().max(20).optional(),

  accommodation: z.string().optional(),
  preferred_date: z.string().trim().min(1, 'Preferred date is required'),
  experience_level: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  paymentChoice: z.enum(['paypal', 'inquire']).default('inquire'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const COURSE_DEPOSIT_RATE = 0.2;
const SKIP_PAYMENT_MESSAGE = 'You have chosen not to pay right now, no problem! We will contact you soon to arrange bookings and payment. Thank You, Pro Diving Asia Team.';

const COURSE_FALLBACKS: Record<string, { item: string; price?: number; currency?: string }> = {
  'open-water': { item: 'PADI Open Water Course', price: 11500, currency: 'THB' },
  'advanced': { item: 'PADI Advanced Open Water Course', price: 10500, currency: 'THB' },
  'advanced-open-water': { item: 'PADI Advanced Open Water Course', price: 10500, currency: 'THB' },
  'rescue': { item: 'PADI Rescue Diver Course', price: 10000, currency: 'THB' },
  'rescue-diver': { item: 'PADI Rescue Diver Course', price: 10000, currency: 'THB' },
  'divemaster': { item: 'PADI Divemaster Course', price: 41000, currency: 'THB' },
  'idc': { item: 'PADI IDC (Instructor Development Course)', currency: 'THB' },
  'scuba-diver': { item: 'PADI Scuba Diver Course', price: 8500, currency: 'THB' },
  'discover-scuba': { item: 'Discover Scuba Diving', price: 2500, currency: 'THB' },
  'discover-scuba-deluxe': { item: 'Discover Scuba Deluxe', price: 5000, currency: 'THB' },
  'efr': { item: 'Emergency First Response', price: 4500, currency: 'THB' },
  'wreck-diver': { item: 'PADI Wreck Diver Specialty', price: 8000, currency: 'THB' },
  'deep-diver': { item: 'PADI Deep Diver Specialty', price: 8000, currency: 'THB' },
  'self-reliant': { item: 'PADI Self-Reliant Diver Specialty', price: 8000, currency: 'THB' },
  'sidemount': { item: 'PADI Sidemount Diver Specialty', price: 8000, currency: 'THB' },
  'night-diver': { item: 'PADI Night Diver Specialty', price: 8000, currency: 'THB' },
  'peak-buoyancy': { item: 'PADI Peak Performance Buoyancy', price: 8000, currency: 'THB' },
  'navigator': { item: 'PADI Underwater Navigator Specialty', price: 3000, currency: 'THB' },
  'enriched-air': { item: 'PADI Enriched Air Diver Specialty', price: 8000, currency: 'THB' },
  'emergency-o2': { item: 'Emergency Oxygen Provider', price: 8000, currency: 'THB' },
  'dpv': { item: 'PADI DPV Diver Specialty', price: 4200, currency: 'THB' },
  'search-recovery': { item: 'PADI Search & Recovery Specialty', price: 8000, currency: 'THB' },
  'coral-watch': { item: 'Coral Watch Specialty', price: 2300, currency: 'THB' },
  'sea-turtle': { item: 'Sea Turtle Awareness Specialty', price: 2200, currency: 'THB' },
  'fish-id': { item: 'Fish Identification Specialty', price: 8000, currency: 'THB' },
  'dive-against-debris': { item: 'Dive Against Debris Specialty', price: 8000, currency: 'THB' },
  'shark-conservation': { item: 'Shark Conservation Specialty', price: 2500, currency: 'THB' },
  'whaleshark': { item: 'Whale Shark Awareness Specialty', price: 3500, currency: 'THB' },
  'underwater-naturalist': { item: 'PADI Underwater Naturalist Specialty', price: 3500, currency: 'THB' },
  'adaptive-support': { item: 'Adaptive Support Diver Specialty', price: 4000, currency: 'THB' },
  'current-diver': { item: 'PADI Current Diver Specialty', currency: 'THB' },
  'photography': { item: 'PADI Underwater Photography Specialty', price: 8000, currency: 'THB' },
  'equipment-specialist': { item: 'PADI Equipment Specialist', currency: 'THB' },
  'boat-diver': { item: 'PADI Boat Diver Specialty', currency: 'THB' },
  'divemaster-internship': { item: 'PADI Divemaster Internship', currency: 'THB' },
  'instructor-internship': { item: 'PADI Instructor Internship', currency: 'THB' },
};

const ADDONS = [
  { id: 'equipment', label: 'Equipment rental', amount: 300 },
  { id: 'photos', label: 'Underwater photos', amount: 500 },
  { id: 'lunch', label: 'Lunch & drinks', amount: 200 },
];

type BookingItemType = 'course' | 'dive' | 'stay';

const       BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiBaseRaw = (import.meta.env.VITE_API_BASE_URL || '').trim();
  const apiBase = apiBaseRaw ? apiBaseRaw.replace(/\/+$/, '') : '';
  const apiUrl = (path: string) => `${apiBase}${path}`;
  const courseSlug = (searchParams.get('course') || '').trim();
  const fallbackCourse = courseSlug ? COURSE_FALLBACKS[courseSlug] : undefined;
  const hasDirectBookingContext = Boolean(
    searchParams.get('item') ||
    searchParams.get('type') ||
    searchParams.get('price') ||
    fallbackCourse
  );
  const selectedBookingKind = (searchParams.get('bookingKind') || '').trim();
  const bookingSource = (searchParams.get('source') || 'direct').trim();
  const guestCount = Math.max(0, Number(searchParams.get('people') || '0') || 0);
  const nightsCount = Math.max(0, Number(searchParams.get('nights') || '0') || 0);
  const rawType = (searchParams.get('type') || '').trim();
  const genericType: BookingItemType = selectedBookingKind === 'course' ? 'course' : 'dive';
  const itemType: BookingItemType = rawType === 'dive' || rawType === 'stay' || rawType === 'course'
    ? rawType
    : (hasDirectBookingContext ? 'course' : genericType);
  const itemTitle = searchParams.get('item') || fallbackCourse?.item || (itemType === 'course' ? 'Course Booking' : 'Fun Dive');
  const isDiveBooking = itemType === 'dive';
  const isCourseBooking = itemType === 'course';
  const isStayBooking = itemType === 'stay';
  const rawPrice = searchParams.get('price');
  const parsedPrice = rawPrice ? Number(rawPrice) : NaN;
  const baseCourseCostMajor = Number.isFinite(parsedPrice)
    ? parsedPrice
    : (fallbackCourse?.price || (!hasDirectBookingContext && itemType === 'dive' ? 2000 : 0));
  const depositCurrency = searchParams.get('currency') || fallbackCourse?.currency || 'THB';
  const isFunDiveBooking = isDiveBooking && /fun dive/i.test(itemTitle);
  const isDiscoverScubaBooking = isDiveBooking && /(discover scuba|dsd)/i.test(itemTitle);

  const initialDiveCount = Math.min(20, Math.max(1, Number(searchParams.get('dives') || '2') || 2));
  const [funDiveCount, setFunDiveCount] = useState<number>(initialDiveCount);
  const initialCourseFunDiveCount = Math.min(10, Math.max(0, Number(searchParams.get('courseFunDives') || '0') || 0));
  const [courseFunDiveCount, setCourseFunDiveCount] = useState<number>(initialCourseFunDiveCount);
  const [stayWithUs, setStayWithUs] = useState<boolean>(searchParams.get('stay') === 'yes');
  const divingParam = searchParams.get('diving'); // 'yes' | 'no' | null — passed from accommodation page

  const getFunDiveRate = (dives: number) => {
    if (dives >= 10) return 800;
    if (dives >= 2) return 900;
    return 1000;
  };

  const courseCostMajor = isFunDiveBooking
    ? getFunDiveRate(funDiveCount) * funDiveCount
    : baseCourseCostMajor;
  const courseFunDiveCostMajor = isCourseBooking && courseFunDiveCount > 0
    ? getFunDiveRate(courseFunDiveCount) * courseFunDiveCount
    : 0;
  const totalItemCostMajor = isCourseBooking ? courseCostMajor + courseFunDiveCostMajor : courseCostMajor;
  const depositFromPrice = totalItemCostMajor > 0 ? Math.round(totalItemCostMajor * COURSE_DEPOSIT_RATE) : 0;
  const depositMajor = depositFromPrice;

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const availableAddons = useMemo(() => {
    if (!isDiveBooking) return [];
    return ADDONS.filter((addon) => !(isDiscoverScubaBooking && addon.id === 'equipment'));
  }, [isDiveBooking, isDiscoverScubaBooking]);

  const totalAddons = useMemo(() => {
    if (!isDiveBooking) return 0;
    return availableAddons.reduce((sum, a) => sum + (selectedAddons[a.id] ? a.amount : 0), 0);
  }, [isDiveBooking, availableAddons, selectedAddons]);

  const paypalBase = (import.meta.env.VITE_PAYPAL_LINK || 'https://paypal.me/prodivingasia').trim().replace(/\/+$/, '');

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferred_date: new Date().toISOString().slice(0, 10),
      experience_level: '',
      message: searchParams.get('message') || '',
      paymentChoice: 'inquire',
    },
  });

  const [inquiryNotice, setInquiryNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: BookingFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form validation errors:', form.formState.errors);
    setIsSubmitting(true);
    try {
      const amountMajor = (isStayBooking ? 0 : depositMajor) + totalAddons;
      const totalAmountMajor = totalItemCostMajor > 0 ? totalItemCostMajor : null;
      const depositAmountMajor = amountMajor > 0 ? amountMajor : null;
      const balanceAmountMajor = totalItemCostMajor > 0
        ? Math.max(totalItemCostMajor - amountMajor, 0)
        : null;
      const selectedAddonsList = isDiveBooking
        ? availableAddons.filter((addon) => selectedAddons[addon.id]).map((addon) => ({
            id: addon.id,
            label: addon.label,
            amount: addon.amount,
          }))
        : [];
      const bookingItemTitle = isFunDiveBooking
        ? `${itemTitle} (${funDiveCount} dives)`
        : (isCourseBooking && courseFunDiveCount > 0
          ? `${itemTitle} + ${courseFunDiveCount} Fun Dives`
          : itemTitle);
      const addonsText = isDiveBooking
        ? (availableAddons.filter(a => selectedAddons[a.id]).map(a => a.label).join(', ') || 'None')
        : 'N/A (course booking)';
      const messageWithSource = `${data.message || 'No additional message'}\n\nBooking Source: ${bookingSource}`;

      const apiBookingPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        accommodation: data.accommodation || null,
        item_type: itemType,
        course_title: bookingItemTitle,
        preferred_date: data.preferred_date || null,
        experience_level: data.experience_level || null,
        addons: addonsText,
        addons_json: JSON.stringify(selectedAddonsList),
        addons_total: totalAddons,
        subtotal_amount: totalItemCostMajor > 0 ? totalItemCostMajor : null,
        total_payable_now: amountMajor > 0 ? amountMajor : null,
        message: messageWithSource,
        status: 'pending',
        deposit_amount: depositAmountMajor,
        total_amount: totalAmountMajor,
        due_amount: balanceAmountMajor,
      };

      let persisted = false;
      let bookingApiWarning: string | null = null;
      try {
        const dbRes = await fetch(apiUrl('/api/bookings'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiBookingPayload),
        });
        persisted = dbRes.ok;
        const dbJson = await dbRes.json().catch(() => null);
        if (dbRes.ok && dbJson?.warning) {
          bookingApiWarning = String(dbJson.warning);
        }
        if (!dbRes.ok && dbJson?.error) {
          bookingApiWarning = String(dbJson.error);
        }
      } catch (dbErr) {
        console.warn('Booking persistence failed; continuing with email flow.', dbErr);
      }

      // Send booking notification via backend API
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        accommodation: data.accommodation || 'N/A',
        preferred_date: data.preferred_date || 'N/A',
        experience_level: data.experience_level || 'N/A',
        payment_choice: data.paymentChoice === 'paypal' ? 'Pay deposit via PayPal' : 'Inquire only - pay later',
        item_title: bookingItemTitle,
        full_price: totalItemCostMajor > 0 ? `฿${totalItemCostMajor}` : (isStayBooking ? 'Quote on request' : 'N/A'),
        dive_count: isFunDiveBooking ? funDiveCount : 'N/A',
        course_fun_dive_count: isCourseBooking ? courseFunDiveCount : 'N/A',
        course_fun_dive_cost: isCourseBooking && courseFunDiveCostMajor > 0 ? `฿${courseFunDiveCostMajor}` : 'N/A',
        stay_with_us: isCourseBooking
          ? (stayWithUs ? 'Yes - accommodation free with course' : 'No')
          : (isDiveBooking ? (stayWithUs ? 'Yes - accommodation requested with dive booking' : 'No') : 'N/A'),
        diving_with_us: isStayBooking && divingParam !== null
          ? (divingParam === 'yes' ? 'Yes - diving with us' : 'No - accommodation only')
          : undefined,
        payment_mode: 'inquire',
        selected_price: baseCourseCostMajor > 0 ? baseCourseCostMajor : null,
        currency: depositCurrency || 'THB',
        deposit_amount: depositAmountMajor,
        total_amount: totalAmountMajor,
        due_amount: balanceAmountMajor,
        addons: addonsText,
        booking_source: bookingSource,
        message: messageWithSource,
      };

      let emailOk = false;
      let responseData: {
        success?: boolean;
        warning?: string;
        message?: string;
        error?: string;
        provider?: string;
      } = {};
      try {
        const emailResult = await sendBookingNotification({
          endpointUrl: apiUrl('/api/send-booking-notification'),
          payload,
        });
        emailOk = emailResult.success;
        responseData = {
          success: emailResult.success,
          warning: emailResult.warning,
          message: emailResult.message,
          provider: emailResult.provider,
        };
      } catch (emailErr) {
        console.warn('Booking email API unavailable; continuing with saved booking flow.', emailErr);
      }

      // Store booking details for thank-you page display
      const bookingDetailsForDisplay = {
        item_title: bookingItemTitle,
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        accommodation: data.accommodation || 'N/A',
        preferred_date: data.preferred_date || 'N/A',
        experience_level: data.experience_level || 'N/A',
        deposit_amount: depositAmountMajor != null ? `฿${depositAmountMajor}` : 'Quote on request',
        total_amount: totalAmountMajor != null ? `฿${totalAmountMajor}` : 'Quote on request',
        balance_amount: balanceAmountMajor != null ? `฿${balanceAmountMajor}` : 'Quote on request',
        payment_choice: data.paymentChoice === 'paypal' ? 'PayPal deposit' : 'Inquire only',
      };
      sessionStorage.setItem('bookingData', JSON.stringify(bookingDetailsForDisplay));

      // Notify user based on email API result, but booking is already persisted
      if (emailOk) {
        if (responseData.warning) {
          toast.warning(`Booking saved, but email notification needs attention: ${responseData.warning}`);
        } else if (bookingApiWarning) {
          toast.warning(`Inquiry saved with warning: ${bookingApiWarning}`);
        }

        if (data.paymentChoice === 'paypal' && amountMajor > 0) {
          const paypalUrl = `${paypalBase}/${amountMajor}THB`;
          setTimeout(() => { window.location.href = paypalUrl; }, 1200);
        } else {
          setTimeout(() => window.location.href = '/thank-you', 1500);
          setInquiryNotice(SKIP_PAYMENT_MESSAGE);
        }
      } else {
        const errMsg = responseData?.message || responseData?.error || 'Email service unavailable';
        console.error('Booking notification error:', errMsg, responseData);
        if (persisted) {
          toast.warning(`Inquiry saved, but email notification failed: ${errMsg}`);
          setTimeout(() => window.location.href = '/thank-you', 1500);
          setInquiryNotice(SKIP_PAYMENT_MESSAGE);
        } else {
          toast.error(`Submission failed: ${errMsg}. Please retry.`);
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rezdy prefill removed.

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto bg-background rounded-xl shadow-xl shadow-blue-900/20 p-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold mb-2">Book: {itemTitle}</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Select options and submit your booking or inquiry.</p>

        {!hasDirectBookingContext && (
          <div className="mb-6 p-4 border rounded-lg bg-blue-700 border-blue-600 text-white">
            <h3 className="font-semibold mb-3 text-white">What would you like to book?</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={isCourseBooking ? 'default' : 'outline'}
                className={isCourseBooking ? 'bg-blue-900 hover:bg-blue-950 text-white border-blue-900' : 'bg-white/10 hover:bg-white/20 text-white border-white/40'}
                onClick={() => navigate(`/booking?source=${encodeURIComponent(bookingSource)}&bookingKind=course`)}
              >
                Course
              </Button>
              <Button
                type="button"
                variant={isDiveBooking ? 'default' : 'outline'}
                className={isDiveBooking ? 'bg-blue-500 hover:bg-blue-400 text-white border-blue-500' : 'bg-white/10 hover:bg-white/20 text-white border-white/40'}
                onClick={() => navigate(`/booking?source=${encodeURIComponent(bookingSource)}&bookingKind=dive`)}
              >
                Fun Dives
              </Button>
            </div>
            {selectedBookingKind === 'course' && (
              <div className="mt-4">
                <p className="text-sm text-white/80 mb-2">Select your course:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'PADI Open Water', slug: 'open-water', price: 11500 },
                    { label: 'PADI Advanced Open Water', slug: 'advanced-open-water', price: 10500 },
                    { label: 'PADI Rescue Diver', slug: 'rescue-diver', price: 10000 },
                    { label: 'PADI Divemaster', slug: 'divemaster', price: 41000 },
                    { label: 'PADI IDC', slug: 'idc', price: 0, item: 'PADI IDC (Instructor Development Course)' },
                    { label: 'PADI Scuba Diver', slug: 'scuba-diver', price: 8500 },
                    { label: 'Discover Scuba Diving', slug: 'discover-scuba', price: 2500 },
                    { label: 'Discover Scuba Deluxe', slug: 'discover-scuba-deluxe', price: 5000 },
                    { label: 'Emergency First Response', slug: 'efr', price: 4500 },
                    { label: 'PADI Wreck Diver Specialty', slug: 'wreck-diver', price: 8000 },
                    { label: 'PADI Deep Diver Specialty', slug: 'deep-diver', price: 8000 },
                    { label: 'PADI Night Diver Specialty', slug: 'night-diver', price: 8000 },
                    { label: 'Enriched Air (Nitrox)', slug: 'enriched-air', price: 8000 },
                    { label: '3 Specialty Bundle', slug: '', price: 18000, item: '3 Specialty Bundle' },
                    { label: 'Other / Ask us', slug: '', price: 0, item: 'Course Enquiry' },
                  ].map(({ label, slug, price, item }) => (
                    <button
                      key={label}
                      type="button"
                      className="text-left px-3 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-medium transition"
                      onClick={() => { window.location.href = `/booking?item=${encodeURIComponent(item || label)}&type=course${price ? `&price=${price}` : ''}${price ? '&currency=THB' : ''}${slug ? `&course=${slug}` : ''}&source=${encodeURIComponent(bookingSource)}`; }}
                    >
                      {label}{price ? ` — ฿${price.toLocaleString()}` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Special Packages Banner */}
        {!hasDirectBookingContext && (
          <div className="mb-6 p-6 border-2 border-emerald-500 rounded-lg bg-emerald-50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">3 Specialty Bundle - Save ฿6,000!</h3>
                <p className="text-emerald-800 mb-3">
                  Enroll in three PADI Specialty Dive Courses and pay less. It's a unique opportunity to explore various aspects of scuba diving, from marine life identification to underwater photography.
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl font-bold text-emerald-900">฿18,000</span>
                  <span className="text-emerald-700 line-through text-xl">฿24,000</span>
                  <span className="text-sm text-emerald-700">(3 courses of your choice)</span>
                </div>
                <Button 
                  variant="default"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.location.href = '/booking?item=3%20Specialty%20Bundle&type=course&price=18000&currency=THB'}
                >
                  Book 3 Specialty Bundle
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              {itemType === 'course' ? (
                <>
                  <div className="text-lg font-semibold">Course cost</div>
                  <div className="text-2xl font-bold">{totalItemCostMajor > 0 ? `฿${totalItemCostMajor}` : 'Contact us'}</div>
                  {courseFunDiveCostMajor > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Includes Fun Dives add-on: ฿{courseFunDiveCostMajor}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-1">Deposit payable now (20%): {depositMajor > 0 ? `฿${depositMajor}` : 'Contact us'}</div>
                </>
              ) : itemType === 'dive' ? (
                <>
                  <div className="text-lg font-semibold">Dive price</div>
                  <div className="text-2xl font-bold">{courseCostMajor > 0 ? `฿${courseCostMajor}` : 'Contact us'}</div>
                  <div className="text-sm text-muted-foreground mt-1">Deposit payable now (20%): {depositMajor > 0 ? `฿${depositMajor}` : 'Contact us'}</div>
                </>
              ) : (
                <>
                  <div className="text-lg font-semibold">Accommodation request</div>
                  <div className="text-2xl font-bold">Custom quote</div>
                  <div className="text-sm text-muted-foreground mt-1">We will confirm room options and exact seasonal pricing.</div>
                  <div className="mt-3 space-y-1 text-sm">
                    {itemTitle && itemTitle !== 'Resort Accommodation' && (
                      <div className="text-slate-700"><span className="font-medium">Room:</span> {itemTitle.replace(/^Resort Accommodation\s*[-–]\s*/i, '')}</div>
                    )}
                    {guestCount > 0 && (
                      <div className="text-slate-700"><span className="font-medium">Guests:</span> {guestCount}</div>
                    )}
                    {nightsCount > 0 && (
                      <div className="text-slate-700"><span className="font-medium">Nights:</span> {nightsCount}</div>
                    )}
                    {divingParam !== null && (
                      <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        divingParam === 'yes' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {divingParam === 'yes' ? '🤿 Diving with us' : '🏠 Accommodation only'}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {isDiveBooking && (
              <div className="text-right">
                <div className="text-lg font-semibold">Add-ons</div>
                <div className="text-sm text-muted-foreground">Select extras below</div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 p-4 border rounded-lg bg-muted/20">
          <h3 className="font-semibold mb-3">Quick booking options</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (isCourseBooking || isDiveBooking) {
                  setStayWithUs(true);
                  return;
                }
                navigate('/booking?item=Resort%20Accommodation&type=stay&currency=THB');
              }}
            >
              Stay with us at our resort accommodation
            </Button>
          </div>
        </div>

        {(isCourseBooking || isDiveBooking) && (
          <div className="mb-6 p-3 border rounded-lg bg-blue-700 border-blue-600 text-white text-sm">
            If you choose alternative accommodation, please give us the details so we can arrange all necessary arrangements.
          </div>
        )}

        {isCourseBooking && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">Add Fun Dives to your course</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2 mb-3">
              {Array.from({ length: 11 }, (_, i) => i).map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setCourseFunDiveCount(count)}
                  className={`px-3 py-2 rounded border text-sm font-medium transition ${courseFunDiveCount === count ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-blue-50 border-border'}`}
                >
                  {count}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Pricing: 1 dive = ฿1,000, 2-9 dives = ฿900 per dive, 10+ dives = ฿800 per dive.
              Selected add-on: {courseFunDiveCount} dives{courseFunDiveCount > 0 ? ` (฿${courseFunDiveCostMajor})` : ''}.
            </p>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={stayWithUs}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setStayWithUs(checked);
                }}
              />
              Stay with us (accommodation)
            </label>
          </div>
        )}

        {isCourseBooking && stayWithUs && (
          <div className="mb-6 p-3 border rounded-lg bg-emerald-50 border-emerald-200 text-emerald-800 text-sm">
            Accommodation is FREE with this course. Course pricing remains unchanged.
          </div>
        )}

        {isDiveBooking && stayWithUs && (
          <div className="mb-6 p-3 border rounded-lg bg-blue-50 border-blue-200 text-blue-900 text-sm">
            Deposit payable now for your dives and accommodation total pricing to be confirmed. Please leave details in the form below and we will contact to confirm your total amount payable on arrival or deposit before arriving.
          </div>
        )}

        {isFunDiveBooking && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">Choose number of dives</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 mb-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setFunDiveCount(count)}
                  className={`px-3 py-2 rounded border text-sm font-medium transition ${funDiveCount === count ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-blue-50 border-border'}`}
                >
                  {count} {count === 1 ? 'dive' : 'dives'}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Pricing: 1 dive = ฿1,000, 2-9 dives = ฿900 per dive, 10+ dives = ฿800 per dive.
              Current rate: ฿{getFunDiveRate(funDiveCount)} per dive.
            </p>
          </div>
        )}

        {isDiveBooking && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/20">
            <h3 className="font-semibold mb-3">Optional Extras</h3>
            <div className="flex flex-col gap-4">
              {availableAddons.map((a) => (
                <div key={a.id} className="flex items-center gap-4">
                  <span className="w-40 font-medium">{a.label}</span>
                  <span className="text-sm text-muted-foreground flex-1">฿{a.amount}</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    title={`${a.label} selection`}
                    aria-label={`${a.label} selection`}
                    value={selectedAddons[a.id] ? '1' : '0'}
                    onChange={e => setSelectedAddons(s => ({ ...s, [a.id]: e.target.value === '1' }))}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 text-right">
          <div className="text-sm text-muted-foreground">
            {isStayBooking ? 'Payment:' : (isDiveBooking ? 'Total payable now (incl. add-ons):' : 'Total payable now:')}
          </div>
          <div className="text-2xl font-bold">{isStayBooking ? 'Quote on request' : `฿${depositMajor + totalAddons}`}</div>
          {!isStayBooking && totalItemCostMajor > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              Total: ฿{totalItemCostMajor} · Deposit: ฿{depositMajor + totalAddons} · Balance: ฿{Math.max(totalItemCostMajor - (depositMajor + totalAddons), 0)}
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormField control={form.control} name="accommodation" render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodation Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no_preference">No preference</SelectItem>
                    <SelectItem value="none">No accommodation needed</SelectItem>
                    <SelectItem value="resort">Resort accommodation</SelectItem>
                    <SelectItem value="nearby">Nearby hotel/guesthouse</SelectItem>
                    <SelectItem value="own">I have my own accommodation</SelectItem>
                  </SelectContent>
                </Select>
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

            <FormField control={form.control} name="experience_level" render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
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
                <FormControl><Textarea placeholder="Any special requests or questions?" rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {!isStayBooking && depositMajor > 0 && (
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-semibold mb-3">Payment Option</h3>
                <FormField control={form.control} name="paymentChoice" render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          className="mt-1"
                          value="paypal"
                          checked={field.value === 'paypal'}
                          onChange={() => field.onChange('paypal')}
                        />
                        <div>
                          <div className="font-medium">Pay deposit now via PayPal</div>
                          <div className="text-sm text-muted-foreground">
                            Secure your booking by paying the deposit (฿{depositMajor + totalAddons}) via PayPal. You'll be redirected after submitting.
                          </div>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          className="mt-1"
                          value="inquire"
                          checked={field.value === 'inquire'}
                          onChange={() => field.onChange('inquire')}
                        />
                        <div>
                          <div className="font-medium">Inquire only — pay later</div>
                          <div className="text-sm text-muted-foreground">
                            We'll contact you to arrange payment. No money taken now.
                          </div>
                        </div>
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                {isSubmitting ? 'Sending...' : (form.watch('paymentChoice') === 'paypal' && !isStayBooking && depositMajor > 0 ? 'Submit & Pay via PayPal' : 'Submit Inquiry')}
              </Button>
            </div>
          </form>
        </Form>



        {inquiryNotice && (
          <div className="mt-8 rounded-lg border-2 border-emerald-300 bg-emerald-50 p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-900">Inquiry Received!</h2>
              <p className="text-emerald-700 mt-1">Confirmation email sent to <strong>{form.getValues('email')}</strong></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded-lg text-sm">
              <div><span className="font-semibold">Name:</span> {form.getValues('name')}</div>
              <div><span className="font-semibold">Email:</span> {form.getValues('email')}</div>
              <div><span className="font-semibold">Course/Activity:</span> {itemTitle}</div>
              <div><span className="font-semibold">Preferred Date:</span> {form.getValues('preferred_date')}</div>
              <div><span className="font-semibold">Accommodation:</span> {form.getValues('accommodation') || 'Not specified'}</div>
            </div>

            <div className="bg-emerald-100 p-4 rounded-lg border-l-4 border-emerald-600">
              <p className="text-emerald-900 font-semibold mb-2">What Happens Next?</p>
              <p className="text-emerald-800 text-sm">{inquiryNotice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;