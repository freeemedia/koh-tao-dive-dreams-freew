import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  preferred_date: z.string().optional(),
  experience_level: z.string().optional(),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
  paymentChoice: z.enum(['now', 'link', 'none']).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'course' | 'dive';
  itemTitle: string;
  depositMajor?: number;
  depositCurrency?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, itemType, itemTitle, depositMajor, depositCurrency }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferred_date: '',
      experience_level: '',
      message: '',
      paymentChoice: 'now',
    },
  });

  // Reset form whenever dialog opens with a new course/item selection
  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        experience_level: '',
        message: '',
        paymentChoice: 'now',
      });
    }
  }, [isOpen, itemTitle, form]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const messageBody = `Phone: ${data.phone || 'N/A'}\nPreferred Date: ${data.preferred_date || 'N/A'}\nExperience Level: ${data.experience_level || 'N/A'}\n\nMessage:\n${data.message || 'N/A'}`;

      const paymentChoice = (data as any).paymentChoice || 'none';

      // If user wants to pay now or receive a payment link, create a Checkout session first
      let checkoutUrl: string | undefined;
      if ((paymentChoice === 'now' || paymentChoice === 'link') && typeof depositMajor === 'number' && depositMajor > 0) {
        try {
          const body: any = {
            itemTitle,
            itemType,
            name: data.name,
            email: data.email,
          };

          body.amountMajor = depositMajor;
          if (depositCurrency) body.currency = depositCurrency;

          const checkoutRes = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          const json = await checkoutRes.json().catch(() => ({}));
          if (checkoutRes.ok && json.url) {
            checkoutUrl = json.url;
            if (paymentChoice === 'now') {
              // redirect immediately to Checkout
              window.location.href = checkoutUrl;
              return;
            }
            // if 'link', we'll include this link in the inquiry email below
          } else {
            const errMsg = json?.error || `HTTP ${checkoutRes.status}`;
            console.error('Checkout creation failed:', errMsg, json);
            toast.error('Payment initialization failed. You can still submit an inquiry without payment.');
          }
        } catch (err) {
          console.error('Checkout call failed:', err);
          toast.error('Payment initialization failed. You can still submit an inquiry without payment.');
        }
      }

      // If we have a checkout link and user asked for a link, append it to the message
      const messageWithLink = checkoutUrl ? `${messageBody}\n\nPayment link: ${checkoutUrl}` : messageBody;

      const payload = {
        access_key: 'b42b4f7a-b0b3-4ba9-8197-cf5abe9f09e6',
        subject: `Booking Inquiry: ${itemTitle}`,
        name: data.name,
        email: data.email,
        message: messageWithLink,
      };

      console.log('Sending booking payload to Web3Forms', payload);

      // Send booking inquiry to Web3Forms (keeps a record of the request)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resp = await res.json().catch(() => ({}));
      console.log('Web3Forms booking response:', res.status, resp);

      if (res.ok && resp.success) {
        // Save booking to Supabase for admin panel (fire-and-forget)
        supabase.from('booking_inquiries').insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          course_title: itemTitle,
          preferred_date: data.preferred_date || null,
          experience_level: data.experience_level || null,
          message: data.message || null,
        }).then(({ error }) => {
          if (error) console.warn('Supabase booking persist failed', error.message);
        });

        toast.success('Booking inquiry sent. We will contact you shortly.');
        form.reset();
        onClose();
      } else {
        const errMsg = resp?.message || resp?.error || `HTTP ${res.status}`;
        console.error('Web3Forms booking error:', errMsg, resp);
        toast.error(`Failed to send booking: ${errMsg}. Please try again.`);
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      toast.error(`Failed to send booking: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book {itemType === 'course' ? 'Course' : 'Dive'}: {itemTitle}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email *
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+66 123 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Preferred Date
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
              name="experience_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
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
              )}
            />

            <FormField
              control={form.control}
              name="paymentChoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment option</FormLabel>
                  <FormControl>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="now"
                          checked={field.value === 'now'}
                          onChange={() => field.onChange('now')}
                        />
                        <span className="ml-2">Pay deposit now</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="link"
                          checked={field.value === 'link'}
                          onChange={() => field.onChange('link')}
                        />
                        <span className="ml-2">Send payment link to my email</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="none"
                          checked={field.value === 'none'}
                          onChange={() => field.onChange('none')}
                        />
                        <span className="ml-2">Just an inquiry (no deposit)</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Message
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requests or questions?" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
