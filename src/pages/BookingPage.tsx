// Rezdy integration removed — use internal booking flow
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().max(20).optional(),
  preferred_date: z.string().trim().min(1, 'Preferred date is required'),
  experience_level: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  paymentChoice: z.enum(['now', 'link', 'none']).optional(),
});


type BookingFormData = z.infer<typeof bookingSchema>;

const PAYPAL_LINK = 'https://paypal.me/prodivingasia';
const COURSE_DEPOSIT_RATE = 0.2;
const SKIP_PAYMENT_MESSAGE = 'You have chosen not to pay right now, no problem! We will contact you soon to arrange bookings and payment. Thank You, Pro Diving Asia Team.';

const COURSE_FALLBACKS: Record<string, { item: string; price?: number; currency?: string }> = {
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
  const apiBaseNormalized = apiBaseRaw
    ? (apiBaseRaw.startsWith('http://') || apiBaseRaw.startsWith('https://')
        ? apiBaseRaw
        : `https://${apiBaseRaw}`)
    : 'https://koh-tao-dive-dreams-mocha.vercel.app';
  const apiBase = apiBaseNormalized.replace(/\/+$/, '');
  const apiUrl = (path: string) => `${apiBase}${path}`;
  const courseSlug = (searchParams.get('course') || '').trim();
  const fallbackCourse = courseSlug ? COURSE_FALLBACKS[courseSlug] : undefined;
  // Always default to course booking if no context is present
  const hasDirectBookingContext = Boolean(
    searchParams.get('item') ||
    searchParams.get('type') ||
    searchParams.get('price') ||
    fallbackCourse
  );
  // bookingKind param or fallback to 'course' if no context
  const selectedBookingKind = (searchParams.get('bookingKind') || (!hasDirectBookingContext ? 'course' : '')).trim();
  const bookingSource = (searchParams.get('source') || 'direct').trim();
  const rawType = (searchParams.get('type') || '').trim();
  // Determine itemType: explicit type param, or fallback to selectedBookingKind, or 'course'
  let itemType: BookingItemType;
  if (rawType === 'dive' || rawType === 'stay' || rawType === 'course') {
    itemType = rawType as BookingItemType;
  } else if (hasDirectBookingContext) {
    itemType = 'course';
  } else if (selectedBookingKind === 'dive') {
    itemType = 'dive';
  } else {
    itemType = 'course';
  }
  const itemTitle = searchParams.get('item') || fallbackCourse?.item || (itemType === 'course' ? 'Course Booking' : 'Fun Dive');
  const isDiveBooking = itemType === 'dive';
  const isCourseBooking = itemType === 'course';
  const isStayBooking = itemType === 'stay';
  const rawPrice = searchParams.get('price');
  const parsedPrice = rawPrice ? Number(rawPrice) : NaN;
  const baseCourseCostMajor = Number.isFinite(parsedPrice)
    ? parsedPrice
    : (fallbackCourse?.price || (!hasDirectBookingContext && itemType === 'dive' ? 2000 : 0));
  const parsedDeposit = Number(searchParams.get('deposit') || '0');
  const depositFromQuery = Number.isFinite(parsedDeposit) ? parsedDeposit : 0;
  const depositCurrency = searchParams.get('currency') || fallbackCourse?.currency || 'THB';
  const isFunDiveBooking = isDiveBooking && /fun dive/i.test(itemTitle);
  const isDiscoverScubaBooking = isDiveBooking && /(discover scuba|dsd)/i.test(itemTitle);

  const initialDiveCount = Math.min(20, Math.max(1, Number(searchParams.get('dives') || '2') || 2));
  const [funDiveCount, setFunDiveCount] = useState<number>(initialDiveCount);
  const initialCourseFunDiveCount = Math.min(10, Math.max(0, Number(searchParams.get('courseFunDives') || '0') || 0));
  const [courseFunDiveCount, setCourseFunDiveCount] = useState<number>(initialCourseFunDiveCount);
  const [stayWithUs, setStayWithUs] = useState<boolean>(searchParams.get('stay') === 'yes');
  const [showStayPopup, setShowStayPopup] = useState(false);

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
  const depositMajor = depositFromPrice > 0 ? depositFromPrice : depositFromQuery;

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const availableAddons = useMemo(() => {
    if (!isDiveBooking) return [];
    return ADDONS.filter((addon) => !(isDiscoverScubaBooking && addon.id === 'equipment'));
  }, [isDiveBooking, isDiscoverScubaBooking]);

  const totalAddons = useMemo(() => {
    if (!isDiveBooking) return 0;
    return availableAddons.reduce((sum, a) => sum + (selectedAddons[a.id] ? a.amount : 0), 0);
  }, [isDiveBooking, availableAddons, selectedAddons]);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferred_date: new Date().toISOString().slice(0, 10),
      experience_level: '',
      message: searchParams.get('message') || '',
      paymentChoice: itemType === 'course' || itemType === 'dive' ? 'now' : 'none',
    },
  });

  const [showPaymentLinks, setShowPaymentLinks] = useState(false);
  const [showSkipPaymentPopup, setShowSkipPaymentPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: BookingFormData) => {
    // Customer submits booking, admin gets email, status is always 'pending' until admin acts
    setIsSubmitting(true);
    try {
      const amountMajor = (isStayBooking ? 0 : depositMajor) + totalAddons;
      const selectedAddonsList = isDiveBooking
        ? availableAddons.filter((addon) => selectedAddons[addon.id]).map((addon) => ({
            id: addon.id,
            label: addon.label,
            amount: addon.amount,
          }))
        : [];
                  <Select>
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

            <FormField control={form.control} name="paymentChoice" render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="payment-now"
                        name="paymentChoice"
                        value="now"
                        checked={field.value === 'now'}
                        onChange={() => field.onChange('now')}
                      />
                      <span>{isStayBooking ? 'Pay after confirmation' : 'Pay deposit now with PayPal'}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="payment-none"
                        name="paymentChoice"
                        value="none"
                        checked={field.value === 'none'}
                        onChange={() => field.onChange('none')}
                      />
                      <span>{isStayBooking ? 'Send accommodation inquiry' : 'Pay later (inquire only)'}</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        </Form>

        {showPaymentLinks && (
          <div className="mt-8 p-6 border rounded-xl bg-muted/50 text-center space-y-4">
            <h2 className="text-xl font-bold">Pay Your Deposit</h2>
            <p className="text-muted-foreground">Your inquiry has been sent! To secure your booking, pay the deposit of <strong>฿{depositMajor + totalAddons}</strong> via PayPal:</p>
            <div className="space-y-3">
              <a
                href={`${PAYPAL_LINK}/${depositMajor + totalAddons}THB`}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <Button className="bg-[#0070ba] hover:bg-[#005ea6] text-white px-8 py-3 text-lg w-full">
                    Pay ฿{depositMajor + totalAddons} (THB) with PayPal
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">Amount will be charged in Thai Baht (THB).</p>
              </a>
              <p className="text-sm text-muted-foreground">or</p>
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="px-8 py-3 text-lg w-full">
                  Open PayPal.me/prodivingasia
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Or <button className="underline" onClick={() => { 
              form.reset(); 
              setShowPaymentLinks(false); 
              setShowSkipPaymentPopup(true); 
            }}>skip payment for now</button></p>
          </div>
        )}
      </div>

      <><AlertDialog open={showStayPopup} onOpenChange={setShowStayPopup}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{isCourseBooking ? 'Accommodation Included' : 'Accommodation Request Noted'}</AlertDialogTitle>
              <AlertDialogDescription>
                {isCourseBooking
                  ? 'Accommodation free with us for courses.'
                  : 'Deposit payable now for your dives and accommodation total pricing to be confirmed. Please leave details in the form below and we will contact to confirm your total amount payable on arrival or deposit before arriving.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog><AlertDialog
          open={showSkipPaymentPopup}
          onOpenChange={(open) => {
            setShowSkipPaymentPopup(open);
            if (!open) {
              form.reset();
            }
          } }
        >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Inquiry Sent</AlertDialogTitle>
                <AlertDialogDescription>{SKIP_PAYMENT_MESSAGE}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => {
                  form.reset();
                  setShowSkipPaymentPopup(false);
                } }>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog></>
    </div>
  );
};

export default BookingPage;
