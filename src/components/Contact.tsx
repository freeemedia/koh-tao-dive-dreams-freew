import React, { useMemo, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';

// Do not call emailjs.init with the service ID — we'll pass the public key on send.

const Contact = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const fallbackContent = useMemo(() => {
    if (isDutch) {
      return {
        section_title: 'Neem contact op',
        section_subtitle: 'Klaar om de onderwaterwereld te ontdekken? Neem contact op met Bas om jouw duikavontuur op Koh Tao te boeken.',
        details_title: 'Contactgegevens',
        location_title: 'Locatie',
        location_line_1: 'Sairee Beach, Koh Tao',
        location_line_2: 'Surat Thani 84360, Thailand',
        phone_title: 'Telefoon',
        phone_line_1: '+31 6 38697279',
        phone_line_2: '+62(0)81353833289',
        email_title: 'E-mail',
        email_value: 'contact@divinginasia.com',
        opening_hours_title: 'Openingstijden',
        opening_hours_line_1: 'Dagelijks: 07:00 - 19:00',
        opening_hours_line_2: 'Noodgeval: 24/7',
        follow_title: 'Volg ons',
        form_title: 'Stuur ons een bericht',
        form_first_name_label: 'Voornaam',
        form_last_name_label: 'Achternaam',
        form_email_label: 'E-mail',
        form_subject_label: 'Onderwerp',
        subject_option_1: 'Cursusinformatie',
        subject_option_2: 'Boeking duiktrip',
        subject_option_3: 'Materiaalverhuur',
        subject_option_4: 'Algemene vraag',
        form_message_label: 'Bericht',
        form_submit_label: 'Verstuur bericht',
        form_sending_label: 'Versturen...',
        footer_line_1: '© 2026 Pro Diving Asia. Alle rechten voorbehouden. Powered by One Media Asia @ www.onemedia.asia',
        footer_line_2: 'Ontdek de magie onder de golven in het duikparadijs van Thailand.',
      };
    }

    return {
      section_title: 'Get in Touch',
      section_subtitle: 'Ready to explore the underwater world? Contact Bas to book your diving adventure on Koh Tao.',
      details_title: 'Contact Details',
      location_title: 'Location',
      location_line_1: 'Sairee Beach, Koh Tao',
      location_line_2: 'Surat Thani 84360, Thailand',
      phone_title: 'Phone',
      phone_line_1: '+66 77 456 789',
      phone_line_2: '+66 89 123 4567',
      email_title: 'Email',
      email_value: 'contact@divinginasia.com',
      opening_hours_title: 'Opening Hours',
      opening_hours_line_1: 'Daily: 07:00 - 19:00',
      opening_hours_line_2: 'Emergency: 24/7',
      follow_title: 'Follow Us',
      form_title: 'Send Us a Message',
      form_first_name_label: 'First Name',
      form_last_name_label: 'Last Name',
      form_email_label: 'Email',
      form_subject_label: 'Subject',
      subject_option_1: 'Course Information',
      subject_option_2: 'Dive Trip Booking',
      subject_option_3: 'Equipment Rental',
      subject_option_4: 'General Question',
      form_message_label: 'Message',
      form_submit_label: 'Send Message',
      form_sending_label: 'Sending...',
      footer_line_1: '© 2026 Pro Diving Asia. All rights reserved. Powered by One Media Asia @ www.onemedia.asia',
      footer_line_2: "Discover the magic beneath the waves in Thailand's diving paradise.",
    };
  }, [isDutch]);

  const { content } = usePageContent({
    pageSlug: 'contact',
    locale,
    fallbackContent,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');

    try {
      const response = await fetch('/api/send-booking-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
          subject: formData.subject || 'General inquiry',
          item_title: 'Contact form submission',
          payment_choice: 'inquire',
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || 'Unable to send your message right now.');
      }

      setFormStatus('success');
      setFormMessage('Thanks! Your message is on its way and we will reply shortly.');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus('error');
      setFormMessage(error instanceof Error ? error.message : 'Unable to send your message right now.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{content.section_title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{content.section_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{content.details_title}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{content.location_title}</h4>
                  <p className="text-gray-300">
                    {content.location_line_1}<br />
                    {content.location_line_2}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{content.phone_title}</h4>
                  <p className="text-gray-300">{content.phone_line_1}</p>
                  <p className="text-gray-300">{content.phone_line_2}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{content.email_title}</h4>
                  <p className="text-gray-300">{content.email_value}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{content.opening_hours_title}</h4>
                  <p className="text-gray-300">{content.opening_hours_line_1}</p>
                  <p className="text-gray-300">{content.opening_hours_line_2}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">{content.follow_title}</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/divegoprobybas/" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/pro_diving_asia/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://wa.me/66612345678" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="text-green-400 hover:text-green-300 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">{content.form_title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-200">
                  <span className="mb-2 block">{content.form_first_name_label}</span>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none ring-0 focus:border-blue-400" />
                </label>
                <label className="block text-sm font-medium text-gray-200">
                  <span className="mb-2 block">{content.form_last_name_label}</span>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none ring-0 focus:border-blue-400" />
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-200">
                <span className="mb-2 block">{content.form_email_label}</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none ring-0 focus:border-blue-400" />
              </label>

              <label className="block text-sm font-medium text-gray-200">
                <span className="mb-2 block">{content.form_subject_label}</span>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none focus:border-blue-400">
                  <option value="">Select a topic</option>
                  <option value={content.subject_option_1}>{content.subject_option_1}</option>
                  <option value={content.subject_option_2}>{content.subject_option_2}</option>
                  <option value={content.subject_option_3}>{content.subject_option_3}</option>
                  <option value={content.subject_option_4}>{content.subject_option_4}</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-gray-200">
                <span className="mb-2 block">{content.form_message_label}</span>
                <textarea name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none focus:border-blue-400" />
              </label>

              <button type="submit" disabled={formStatus === 'submitting'} className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70">
                {formStatus === 'submitting' ? content.form_sending_label : content.form_submit_label}
              </button>

              {formMessage ? (
                <p className={`text-sm ${formStatus === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {formMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>

        {/* Footer lines removed to prevent double footer. Use global Footer in Layout. */}
      </div>
    </section>
  );
};


import { useSupabaseUser } from '@/hooks/useSupabaseUser';

const ContactWrapper = () => {
  const user = useSupabaseUser();
  return (
    <>
      <Contact />
    </>
  );
};

export default ContactWrapper;