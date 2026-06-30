// Minor change: trigger for git push
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, RefreshCw, Upload } from 'lucide-react';


interface PageContentEditorProps {
  pageSlug: string;
  locale: string;
}

interface ContentItem {
  section_key: string;
  content_value: string;
  content_type: string;
  label: string;
}

type DraftStatus = 'draft' | 'published';

const getErrorMessage = (err: unknown) => {
  if (!err) return '';
  if (typeof err === 'string') return err.toLowerCase();
  if (typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
    return (err as any).message.toLowerCase();
  }
  return '';
};

const PAGE_DEFINITIONS: Record<string, ContentItem[]> = {
  'home': [
    { section_key: 'hero_title', content_value: 'Dive Koh Tao with Pro Diving Asia', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Discover world-class diving, friendly instructors, and unforgettable underwater adventures on Koh Tao.', content_type: 'textarea', label: 'Hero Subtitle' },
    { section_key: 'hero_primary_cta', content_value: 'Book Now', content_type: 'text', label: 'Hero Primary CTA' },
    { section_key: 'hero_secondary_cta', content_value: 'Courses', content_type: 'text', label: 'Hero Secondary CTA' },
    { section_key: 'about_headline', content_value: 'Small island, 21 km², lush and surrounded by more than 15 dive sites.', content_type: 'textarea', label: 'About Headline' },
    { section_key: 'about_sites_line', content_value: 'WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - AND MORE', content_type: 'textarea', label: 'About Dive Sites Line' },
    { section_key: 'about_map_alt', content_value: 'Map of Koh Tao and dive sites', content_type: 'text', label: 'About Map Alt Text' },
    { section_key: 'about_title', content_value: 'From PADI Open Water certifications to PADI Divemaster internships', content_type: 'textarea', label: 'About Title' },
    { section_key: 'about_paragraph_1', content_value: 'Koh Tao is not only a top destination in Thailand for your diving holiday, but also ideal for completing almost all PADI dive certifications, for both beginners and experienced divers.', content_type: 'textarea', label: 'About Paragraph 1' },
    { section_key: 'about_paragraph_2', content_value: 'Lifetime certifications valid worldwide, at a surprisingly low price. Earn your PADI diving certification here for 11500 baht, now including 4 nights accommodation in the course price.', content_type: 'textarea', label: 'About Paragraph 2' },
    { section_key: 'about_note', content_value: 'Free accommodation with our courses can only be guaranteed if booked 7 days in advance. If our accommodation is not available, we will assist you with staying in one of our partner resorts.', content_type: 'textarea', label: 'About Note' },
    { section_key: 'courses_section_title', content_value: 'Our Diving Courses', content_type: 'text', label: 'Courses Section Title' },
    { section_key: 'courses_section_subtitle', content_value: 'Choose from beginner experiences to professional dive training on Koh Tao.', content_type: 'textarea', label: 'Courses Section Subtitle' },
    { section_key: 'gallery_headline', content_value: 'Check out the photography of our happy customers.', content_type: 'text', label: 'Gallery Headline' },
    { section_key: 'gallery_subtitle', content_value: 'Experience the breathtaking beauty of Koh Tao’s underwater world in our photo gallery', content_type: 'textarea', label: 'Gallery Subtitle' },
    { section_key: 'course_open_water_title', content_value: 'PADI Open Water Course', content_type: 'text', label: 'Open Water Card Title' },
    { section_key: 'course_open_water_level', content_value: 'Beginner', content_type: 'text', label: 'Open Water Card Level' },
    { section_key: 'course_open_water_duration', content_value: '3-4 days', content_type: 'text', label: 'Open Water Card Duration' },
    { section_key: 'course_open_water_max_depth', content_value: '18m', content_type: 'text', label: 'Open Water Card Max Depth' },
    { section_key: 'course_open_water_price', content_value: '฿11,000', content_type: 'text', label: 'Open Water Card Price' },
    { section_key: 'course_open_water_price_usd', content_value: '320', content_type: 'text', label: 'Open Water Card Price USD' },
    { section_key: 'course_open_water_price_eur', content_value: '290', content_type: 'text', label: 'Open Water Card Price EUR' },
    { section_key: 'course_open_water_description', content_value: 'Learn the fundamentals of scuba diving and become a certified diver for life.', content_type: 'textarea', label: 'Open Water Card Description' },
    { section_key: 'course_advanced_title', content_value: 'Advanced Open Water', content_type: 'text', label: 'Advanced Card Title' },
    { section_key: 'course_advanced_level', content_value: 'Intermediate', content_type: 'text', label: 'Advanced Card Level' },
    { section_key: 'course_advanced_duration', content_value: '2 days', content_type: 'text', label: 'Advanced Card Duration' },
    { section_key: 'course_advanced_max_depth', content_value: '30m', content_type: 'text', label: 'Advanced Card Max Depth' },
    { section_key: 'course_advanced_price', content_value: '฿9,500', content_type: 'text', label: 'Advanced Card Price' },
    { section_key: 'course_advanced_price_usd', content_value: '275', content_type: 'text', label: 'Advanced Card Price USD' },
    { section_key: 'course_advanced_price_eur', content_value: '250', content_type: 'text', label: 'Advanced Card Price EUR' },
    { section_key: 'course_advanced_description', content_value: 'Build confidence underwater, improve navigation, and unlock deeper dive adventures.', content_type: 'textarea', label: 'Advanced Card Description' },
    { section_key: 'course_efr_title', content_value: 'Emergency First Response', content_type: 'text', label: 'EFR Card Title' },
    { section_key: 'course_efr_level', content_value: 'First Aid', content_type: 'text', label: 'EFR Card Level' },
    { section_key: 'course_efr_duration', content_value: '1 day', content_type: 'text', label: 'EFR Card Duration' },
    { section_key: 'course_efr_max_depth', content_value: 'N/A', content_type: 'text', label: 'EFR Card Max Depth' },
    { section_key: 'course_efr_price', content_value: '฿3,500', content_type: 'text', label: 'EFR Card Price' },
    { section_key: 'course_efr_price_usd', content_value: '130', content_type: 'text', label: 'EFR Card Price USD' },
    { section_key: 'course_efr_price_eur', content_value: '120', content_type: 'text', label: 'EFR Card Price EUR' },
    { section_key: 'course_efr_description', content_value: 'Learn CPR, first aid, and emergency response skills essential for divers and non-divers.', content_type: 'textarea', label: 'EFR Card Description' },
    { section_key: 'course_rescue_title', content_value: 'PADI Rescue Diver', content_type: 'text', label: 'Rescue Card Title' },
    { section_key: 'course_rescue_level', content_value: 'Advanced', content_type: 'text', label: 'Rescue Card Level' },
    { section_key: 'course_rescue_duration', content_value: '3 days', content_type: 'text', label: 'Rescue Card Duration' },
    { section_key: 'course_rescue_max_depth', content_value: '30m', content_type: 'text', label: 'Rescue Card Max Depth' },
    { section_key: 'course_rescue_price', content_value: '฿10,000', content_type: 'text', label: 'Rescue Card Price' },
    { section_key: 'course_rescue_price_usd', content_value: '290', content_type: 'text', label: 'Rescue Card Price USD' },
    { section_key: 'course_rescue_price_eur', content_value: '265', content_type: 'text', label: 'Rescue Card Price EUR' },
    { section_key: 'course_rescue_description', content_value: 'Learn to prevent and manage dive emergencies while becoming a stronger, more aware diver.', content_type: 'textarea', label: 'Rescue Card Description' },
    { section_key: 'course_divemaster_title', content_value: 'PADI Divemaster', content_type: 'text', label: 'Divemaster Card Title' },
    { section_key: 'course_divemaster_level', content_value: 'Professional', content_type: 'text', label: 'Divemaster Card Level' },
    { section_key: 'course_divemaster_duration', content_value: '2-4 weeks', content_type: 'text', label: 'Divemaster Card Duration' },
    { section_key: 'course_divemaster_max_depth', content_value: '40m', content_type: 'text', label: 'Divemaster Card Max Depth' },
    { section_key: 'course_divemaster_price', content_value: '฿41,000', content_type: 'text', label: 'Divemaster Card Price' },
    { section_key: 'course_divemaster_price_usd', content_value: '1190', content_type: 'text', label: 'Divemaster Card Price USD' },
    { section_key: 'course_divemaster_price_eur', content_value: '1090', content_type: 'text', label: 'Divemaster Card Price EUR' },
    { section_key: 'course_divemaster_description', content_value: 'Start your professional dive career and train to lead certified divers underwater.', content_type: 'textarea', label: 'Divemaster Card Description' },
    { section_key: 'course_instructor_title', content_value: 'PADI Instructor', content_type: 'text', label: 'Instructor Card Title' },
    { section_key: 'course_instructor_level', content_value: 'Professional', content_type: 'text', label: 'Instructor Card Level' },
    { section_key: 'course_instructor_duration', content_value: '2-3 weeks', content_type: 'text', label: 'Instructor Card Duration' },
    { section_key: 'course_instructor_max_depth', content_value: '40m', content_type: 'text', label: 'Instructor Card Max Depth' },
    { section_key: 'course_instructor_price', content_value: '฿68,900', content_type: 'text', label: 'Instructor Card Price' },
    { section_key: 'course_instructor_price_usd', content_value: '1710', content_type: 'text', label: 'Instructor Card Price USD' },
    { section_key: 'course_instructor_price_eur', content_value: '1560', content_type: 'text', label: 'Instructor Card Price EUR' },
    { section_key: 'course_instructor_description', content_value: 'Train to teach scuba professionally and build a dive career anywhere in the world.', content_type: 'textarea', label: 'Instructor Card Description' },
    { section_key: 'course_discover_scuba_title', content_value: 'Discover Scuba Diving (DSD)', content_type: 'text', label: 'Discover Scuba Card Title' },
    { section_key: 'course_discover_scuba_level', content_value: 'Beginner', content_type: 'text', label: 'Discover Scuba Card Level' },
    { section_key: 'course_discover_scuba_duration', content_value: '1 day', content_type: 'text', label: 'Discover Scuba Card Duration' },
    { section_key: 'course_discover_scuba_max_depth', content_value: '12m', content_type: 'text', label: 'Discover Scuba Card Max Depth' },
    { section_key: 'course_discover_scuba_price', content_value: '฿2,500', content_type: 'text', label: 'Discover Scuba Card Price' },
    { section_key: 'course_discover_scuba_price_usd', content_value: '72', content_type: 'text', label: 'Discover Scuba Card Price USD' },
    { section_key: 'course_discover_scuba_price_eur', content_value: '66', content_type: 'text', label: 'Discover Scuba Card Price EUR' },
    { section_key: 'course_discover_scuba_description', content_value: 'No certification required. The perfect first step to experience scuba diving safely.', content_type: 'textarea', label: 'Discover Scuba Card Description' },
    { section_key: 'course_discover_scuba_deluxe_title', content_value: 'Discover Scuba Diving Deluxe', content_type: 'text', label: 'Discover Scuba Deluxe Card Title' },
    { section_key: 'course_discover_scuba_deluxe_level', content_value: 'Beginner', content_type: 'text', label: 'Discover Scuba Deluxe Card Level' },
    { section_key: 'course_discover_scuba_deluxe_duration', content_value: '1-2 days', content_type: 'text', label: 'Discover Scuba Deluxe Card Duration' },
    { section_key: 'course_discover_scuba_deluxe_max_depth', content_value: '12m', content_type: 'text', label: 'Discover Scuba Deluxe Card Max Depth' },
    { section_key: 'course_discover_scuba_deluxe_price', content_value: '฿5,000', content_type: 'text', label: 'Discover Scuba Deluxe Card Price' },
    { section_key: 'course_discover_scuba_deluxe_price_usd', content_value: '144', content_type: 'text', label: 'Discover Scuba Deluxe Card Price USD' },
    { section_key: 'course_discover_scuba_deluxe_price_eur', content_value: '132', content_type: 'text', label: 'Discover Scuba Deluxe Card Price EUR' },
    { section_key: 'course_discover_scuba_deluxe_description', content_value: 'Extended DSD with 3 dives for more underwater time and a more relaxed pace.', content_type: 'textarea', label: 'Discover Scuba Deluxe Card Description' },
  ],

  'contact': [
    { section_key: 'section_title', content_value: 'Get in Touch', content_type: 'text', label: 'Section Title' },
    { section_key: 'section_subtitle', content_value: 'Ready to explore the underwater world? Contact Bas to book your diving adventure on Koh Tao.', content_type: 'textarea', label: 'Section Subtitle' },
    { section_key: 'details_title', content_value: 'Contact Details', content_type: 'text', label: 'Details Title' },
    { section_key: 'location_title', content_value: 'Location', content_type: 'text', label: 'Location Title' },
    { section_key: 'location_line_1', content_value: 'Sairee Beach, Koh Tao', content_type: 'text', label: 'Location Line 1' },
    { section_key: 'location_line_2', content_value: 'Surat Thani 84360, Thailand', content_type: 'text', label: 'Location Line 2' },
    { section_key: 'phone_title', content_value: 'Phone', content_type: 'text', label: 'Phone Title' },
    { section_key: 'phone_line_1', content_value: '+66 77 456 789', content_type: 'text', label: 'Phone Line 1' },
    { section_key: 'phone_line_2', content_value: '+66 89 123 4567', content_type: 'text', label: 'Phone Line 2' },
    { section_key: 'email_title', content_value: 'Email', content_type: 'text', label: 'Email Title' },
    { section_key: 'email_value', content_value: 'contact@divinginasia.com', content_type: 'text', label: 'Email Value' },
    { section_key: 'opening_hours_title', content_value: 'Opening Hours', content_type: 'text', label: 'Opening Hours Title' },
    { section_key: 'opening_hours_line_1', content_value: 'Daily: 07:00 - 19:00', content_type: 'text', label: 'Opening Hours Line 1' },
    { section_key: 'opening_hours_line_2', content_value: 'Emergency: 24/7', content_type: 'text', label: 'Opening Hours Line 2' },
    { section_key: 'follow_title', content_value: 'Follow Us', content_type: 'text', label: 'Follow Title' },
    { section_key: 'form_title', content_value: 'Send Us a Message', content_type: 'text', label: 'Form Title' },
    { section_key: 'form_first_name_label', content_value: 'First Name', content_type: 'text', label: 'First Name Label' },
    { section_key: 'form_last_name_label', content_value: 'Last Name', content_type: 'text', label: 'Last Name Label' },
    { section_key: 'form_email_label', content_value: 'Email', content_type: 'text', label: 'Email Label' },
    { section_key: 'form_subject_label', content_value: 'Subject', content_type: 'text', label: 'Subject Label' },
    { section_key: 'subject_option_1', content_value: 'Course Information', content_type: 'text', label: 'Subject Option 1' },
    { section_key: 'subject_option_2', content_value: 'Dive Trip Booking', content_type: 'text', label: 'Subject Option 2' },
    { section_key: 'subject_option_3', content_value: 'Equipment Rental', content_type: 'text', label: 'Subject Option 3' },
    { section_key: 'subject_option_4', content_value: 'General Question', content_type: 'text', label: 'Subject Option 4' },
    { section_key: 'form_message_label', content_value: 'Message', content_type: 'text', label: 'Message Label' },
    { section_key: 'form_submit_label', content_value: 'Send Message', content_type: 'text', label: 'Submit Button Label' },
    { section_key: 'form_sending_label', content_value: 'Sending...', content_type: 'text', label: 'Sending Button Label' },
    { section_key: 'footer_line_1', content_value: '© 2026 Pro Diving Asia. All rights reserved. Powered by One Media Asia @ www.onemedia.asia', content_type: 'textarea', label: 'Footer Line 1' },
    { section_key: 'footer_line_2', content_value: "Discover the magic beneath the waves in Thailand's diving paradise.", content_type: 'textarea', label: 'Footer Line 2' },
  ],

  'open-water': [
    { section_key: 'hero_title', content_value: 'PADI Open Water Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: "The world's most popular scuba course. Learn the fundamentals and get certified to dive independently to 18 metres/60 feet.", content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: "The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You'll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.", content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '11000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '320', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '290', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '3-4 days', content_type: 'text', label: 'Duration' },
  ],
  'advanced': [
    { section_key: 'hero_title', content_value: 'PADI Advanced Open Water Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Expand your skills with adventure dives. Explore deeper depths, improve navigation, and try specialties.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'The Advanced course consists of 5 adventure dives, including deep and navigation (required), plus 3 electives of your choice.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '9500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '275', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '250', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'rescue': [
    { section_key: 'hero_title', content_value: 'PADI Rescue Diver Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Learn to prevent and manage dive emergencies. Essential skills for any serious diver.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Build confidence in handling emergencies underwater and at the surface through realistic rescue scenarios.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '10000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '290', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '265', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '3 days', content_type: 'text', label: 'Duration' },
  ],
  'efr': [
    { section_key: 'hero_title', content_value: 'Emergency First Response (EFR)', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Learn CPR, first aid, and emergency response. Required for Rescue Diver certification.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Practice primary and secondary care skills including bandaging, splinting, and emergency assessments.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '3500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '130', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '120', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1 day', content_type: 'text', label: 'Duration' },
  ],
  'divemaster': [
    { section_key: 'hero_title', content_value: 'PADI Divemaster Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Begin your professional diving career. Learn leadership, supervision and dive management skills.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Develops dive leadership skills including supervising activities, assisting instructors, and guiding certified divers.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '41000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '1190', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '1090', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2-4 weeks', content_type: 'text', label: 'Duration' },
  ],
  'instructor': [
    { section_key: 'hero_title', content_value: 'PADI Instructor Development Course (IDC)', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Become a PADI Instructor. Transform your passion into a career teaching scuba diving.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Comprehensive training in teaching methodology, dive theory, and student management. Prepares you for the IE.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '59000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '1710', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '1560', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2-3 weeks', content_type: 'text', label: 'Duration' },
  ],
  'discover-scuba': [
    { section_key: 'hero_title', content_value: 'Discover Scuba Diving', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Try scuba diving for the first time. No experience necessary!', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'A quick introduction to scuba diving. Pool practice followed by a shallow ocean dive.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '2500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '72', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '66', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: 'Half day', content_type: 'text', label: 'Duration' },
  ],
  'scuba-diver': [
    { section_key: 'hero_title', content_value: 'PADI Scuba Diver Certification', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Get certified in just 2 days. Perfect for those with limited time.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'A shorter version of Open Water. Certifies you to dive with a professional to 12 meters.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '8500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '245', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '225', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'scuba-review': [
    { section_key: 'hero_title', content_value: 'Scuba Review / ReActivate', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: "Haven't dived in a while? Refresh your skills with a professional instructor.", content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Quick knowledge review followed by confined and open water skill practice.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '2500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '72', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '66', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1-2 days', content_type: 'text', label: 'Duration' },
  ],
  'discover-scuba-deluxe': [
    { section_key: 'hero_title', content_value: 'Discover Scuba Diving Deluxe', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'An upgraded first dive experience with extra dives and a professional photo package.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Includes a briefing, two open water dives, and an underwater photo session.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '5000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '144', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '132', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1-2 days', content_type: 'text', label: 'Duration' },
  ],
  'msdt-program': [
    { section_key: 'hero_title', content_value: 'MSDT Program', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Become a Master Scuba Diver Trainer. The highest non-professional rating in recreational diving.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Combine your Divemaster or Instructor rating with 5 specialty instructor certifications.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '25000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '720', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '660', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: 'Varies', content_type: 'text', label: 'Duration' },
  ],
  'fun-diving': [
    { section_key: 'fun_diving_hero_title', content_value: 'Fun Diving Koh Tao', content_type: 'text', label: 'Hero Title' },
    { section_key: 'fun_diving_hero_subtitle', content_value: "Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, meet amazing marine life, and make unforgettable memories.", content_type: 'textarea', label: 'Hero Subtitle' },
    { section_key: 'fun_diving_hero_cta', content_value: 'Go Fun Diving Koh Tao', content_type: 'text', label: 'Hero CTA Button' },
    { section_key: 'fun_diving_hero_cta2', content_value: 'Book a Course', content_type: 'text', label: 'Hero Secondary CTA' },
    { section_key: 'fun_diving_overview_title', content_value: 'From Breathtaking Shipwrecks to Exotic Marine Life', content_type: 'text', label: 'Overview Section Title' },
    { section_key: 'fun_diving_overview_body', content_value: "Koh Tao's fun dives have it all! We take pride in offering you a personalized, relaxed, and enjoyable fun diving experience. We're dedicated to showcasing the finest underwater marvels tailored to your level of training and experience, ensuring your dives align with your specific interests.", content_type: 'textarea', label: 'Overview Section Body' },
    { section_key: 'fun_diving_world_class_title', content_value: 'World-Class Dive Sites', content_type: 'text', label: 'World-Class Sites Card Title' },
    { section_key: 'fun_diving_world_class_body', content_value: "Beneath the turquoise water surrounding Koh Tao lies a world of colorful coral reefs, teeming marine life from macro creatures to turtles and if you're lucky, the majestic whale shark. With over 25 captivating dive sites, there's boundless diversity to explore.", content_type: 'textarea', label: 'World-Class Sites Card Body' },
    { section_key: 'fun_diving_expert_title', content_value: 'Expert Dive Professionals', content_type: 'text', label: 'Expert Card Title' },
    { section_key: 'fun_diving_expert_body', content_value: 'Our dive team comprises seasoned and highly knowledgeable dive professionals who have immersed themselves in the local reef ecology and dive sites. Their expertise ensures a safe and enriching diving experience for you.', content_type: 'textarea', label: 'Expert Card Body' },
    { section_key: 'fun_diving_marine_life_title', content_value: 'Diverse Marine Life', content_type: 'text', label: 'Marine Life Card Title' },
    { section_key: 'fun_diving_marine_life_body', content_value: "From massive whale sharks and graceful sea turtles to colorful reef fish and fascinating macro life, Koh Tao's waters host an incredible variety of marine species. Every dive brings new discoveries and unforgettable encounters.", content_type: 'textarea', label: 'Marine Life Card Body' },
    { section_key: 'fun_diving_flexible_title', content_value: 'Flexible Schedule', content_type: 'text', label: 'Flexible Card Title' },
    { section_key: 'fun_diving_flexible_body', content_value: 'We run two dive trips a day - morning and afternoon - on our spacious customized dive boats. After an exhilarating day of diving, unwind with refreshing drinks and share your incredible underwater experiences over a stunning sunset.', content_type: 'textarea', label: 'Flexible Card Body' },
    { section_key: 'fun_diving_ready_title', content_value: 'Ready to Explore?', content_type: 'text', label: 'Ready Section Title' },
    { section_key: 'fun_diving_ready_body', content_value: "Whether you're a newly certified Open Water diver or an experienced technical diver, we have the perfect dive sites and packages for you. Book your fun diving adventure today!", content_type: 'textarea', label: 'Ready Section Body' },
    { section_key: 'fun_diving_ready_cta1', content_value: 'View Pricing & Schedule', content_type: 'text', label: 'Ready Section CTA 1' },
    { section_key: 'fun_diving_ready_cta2', content_value: 'Explore Dive Sites', content_type: 'text', label: 'Ready Section CTA 2' },
    { section_key: 'fun_diving_trips_title', content_value: 'Trips & Programs', content_type: 'text', label: 'Trips Tab Title' },
    { section_key: 'fun_diving_sites_title', content_value: 'Best Koh Tao Fun Diving Trips', content_type: 'text', label: 'Sites Tab Title' },
    { section_key: 'fun_diving_all_sites_title', content_value: 'All Dive Sites', content_type: 'text', label: 'All Sites Subsection Title' },
    { section_key: 'fun_diving_marine_tab_title', content_value: 'Discover the Underwater World', content_type: 'text', label: 'Marine Life Tab Title' },
    // Add more as needed for other tabs/sections
  ],
  // SPECIALTIES
  'specialty/night-diver': [
    { section_key: 'hero_title', content_value: 'Night Diver Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Experience the underwater world after dark — a completely different perspective.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Complete 3 night dives and learn to navigate, communicate, and manage buoyancy in the dark.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '6500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '188', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '172', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'specialty/deep-diver': [
    { section_key: 'hero_title', content_value: 'Deep Diver Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Go deeper — safely. Learn the skills to dive to 40 metres/130 feet.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Four dives covering deep dive planning, buoyancy control, gas management, and narcosis awareness.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '6500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '188', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '172', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'specialty/wreck-diver': [
    { section_key: 'hero_title', content_value: 'Wreck Diver Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Explore sunken ships and artificial reefs. Discover the history beneath the waves.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Four dives on real wrecks covering survey techniques, navigation, and safe penetration procedures.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '8500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '245', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '225', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'specialty/enriched-air': [
    { section_key: 'hero_title', content_value: 'Enriched Air Nitrox Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Extend your bottom time with Nitrox. The world\'s most popular specialty.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Learn to plan and make dives with enriched air mixtures of up to 40% oxygen.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '4500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '130', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '120', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1 day', content_type: 'text', label: 'Duration' },
  ],
  'specialty/underwater-photography': [
    { section_key: 'hero_title', content_value: 'Underwater Photography Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Capture the beauty of the ocean. Learn to take stunning photos underwater.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Two dives focusing on composition, lighting, and techniques to photograph marine life.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '5500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '158', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '145', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1-2 days', content_type: 'text', label: 'Duration' },
  ],
  'specialty/sidemount': [
    { section_key: 'hero_title', content_value: 'Sidemount Diver Specialty', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Streamline your diving. Mount your cylinders at your sides for improved trim and flexibility.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Learn to configure and dive with sidemount equipment across three open water dives.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '8500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '245', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '225', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  // DIVE SITES
  'dive-sites/sail-rock': [
    { section_key: 'hero_title', content_value: 'Sail Rock', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'One of the best dive sites in Southeast Asia. Famous for whale shark sightings.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'A massive pinnacle rising from 40m to just below the surface, with a unique vertical chimney swim-through.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '5–40m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Intermediate – Advanced', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Whale sharks, barracuda, batfish, giant grouper', content_type: 'text', label: 'Highlights' },
  ],
  'dive-sites/chumphon-pinnacle': [
    { section_key: 'hero_title', content_value: 'Chumphon Pinnacle', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'A world-class dive site with massive schools of fish and regular whale shark sightings.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Four large granite pinnacles covered in soft corals, anemones, and abundant marine life.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '14–40m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Intermediate – Advanced', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Whale sharks, chevron barracuda, giant grouper', content_type: 'text', label: 'Highlights' },
  ],
  'dive-sites/japanese-gardens': [
    { section_key: 'hero_title', content_value: 'Japanese Gardens', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'A stunning shallow reef perfect for beginners and snorkellers.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Colourful coral gardens teeming with reef fish, turtles, and moray eels in calm, clear water.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '4–20m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Beginner – Intermediate', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Turtles, moray eels, clownfish, vibrant corals', content_type: 'text', label: 'Highlights' },
  ],
  'dive-sites/htms-sattakut': [
    { section_key: 'hero_title', content_value: 'HTMS Sattakut Wreck', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'A 50-metre warship deliberately sunk to create an artificial reef.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'The HTMS Sattakut lies at 30m and has become home to thousands of fish and spectacular soft corals.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '22–30m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Intermediate – Advanced', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Wreck penetration, lionfish, batfish, moray eels', content_type: 'text', label: 'Highlights' },
  ],
  'dive-sites/twins': [
    { section_key: 'hero_title', content_value: 'The Twins', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Two parallel rocky ridges with rich corals and an abundance of marine life.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'A popular site suitable for all levels featuring arches, swim-throughs, and colourful reef fish.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '8–20m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Beginner – Intermediate', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Trevally, snapper, fusiliers, moray eels', content_type: 'text', label: 'Highlights' },
  ],
  'dive-sites/shark-island': [
    { section_key: 'hero_title', content_value: 'Shark Island', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'A rocky outcrop with strong currents and exciting encounters with larger pelagics.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Boulders and rock formations create a dynamic dive with frequent encounters with reef sharks and rays.', content_type: 'textarea', label: 'Description' },
    { section_key: 'depth', content_value: '6–25m', content_type: 'text', label: 'Depth Range' },
    { section_key: 'difficulty', content_value: 'Intermediate', content_type: 'text', label: 'Difficulty' },
    { section_key: 'highlights', content_value: 'Blacktip reef sharks, stingrays, scorpionfish', content_type: 'text', label: 'Highlights' },
  ],
  // MARINE LIFE
  'marine-life/whale-shark': [
    { section_key: 'hero_title', content_value: 'Whale Shark', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'The ocean\'s gentle giant. Encounter the world\'s largest fish at Koh Tao.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Whale sharks are filter feeders that can reach up to 12m in length. Koh Tao is one of the best places in the world to encounter them.', content_type: 'textarea', label: 'Description' },
    { section_key: 'best_season', content_value: 'March – May and October – December', content_type: 'text', label: 'Best Season' },
    { section_key: 'best_sites', content_value: 'Sail Rock, Chumphon Pinnacle', content_type: 'text', label: 'Best Dive Sites' },
  ],
  'marine-life/green-sea-turtle': [
    { section_key: 'hero_title', content_value: 'Green Sea Turtle', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'One of the most beloved residents of Koh Tao\'s reefs.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Green sea turtles are commonly spotted grazing on seagrass and resting on the reef around Koh Tao.', content_type: 'textarea', label: 'Description' },
    { section_key: 'best_season', content_value: 'Year-round', content_type: 'text', label: 'Best Season' },
    { section_key: 'best_sites', content_value: 'Japanese Gardens, Mango Bay, Hin Wong Pinnacle', content_type: 'text', label: 'Best Dive Sites' },
  ],
  'marine-life/hawksbill-turtle': [
    { section_key: 'hero_title', content_value: 'Hawksbill Sea Turtle', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'A critically endangered species with a striking narrow beak and stunning shell pattern.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'description', content_value: 'Hawksbill turtles feed on sponges and are occasionally spotted on Koh Tao\'s coral reefs.', content_type: 'textarea', label: 'Description' },
    { section_key: 'best_season', content_value: 'Year-round', content_type: 'text', label: 'Best Season' },
    { section_key: 'best_sites', content_value: 'Japanese Gardens, Shark Island, Twins', content_type: 'text', label: 'Best Dive Sites' },
  ],
  // INFO PAGES
  'accommodation': [
    { section_key: 'hero_title', content_value: 'Accommodation on Koh Tao', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Find the perfect place to stay during your diving holiday.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'intro', content_value: 'Koh Tao offers a wide range of accommodation from budget bungalows to luxury resorts, many right on the beach.', content_type: 'textarea', label: 'Introduction' },
  ],
  'koh-tao-info': [
    { section_key: 'hero_title', content_value: 'Koh Tao Island Guide', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Everything you need to know about the Dive Capital of Thailand.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'intro', content_value: 'Koh Tao is a small island in the Gulf of Thailand, world-famous for its affordable diving courses and stunning marine life.', content_type: 'textarea', label: 'Introduction' },
  ],
  'how-to-get-here': [
    { section_key: 'hero_title', content_value: 'How to Get to Koh Tao', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Travel options from Bangkok and beyond to the Gulf of Thailand\'s diving paradise.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'intro', content_value: 'Koh Tao is accessible by ferry from Chumphon or Surat Thani, with connecting buses, trains, and flights from Bangkok.', content_type: 'textarea', label: 'Introduction' },
  ],
  'things-to-do': [
    { section_key: 'hero_title', content_value: 'Things to Do on Koh Tao', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Beyond diving — explore beaches, viewpoints, food, and nightlife.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'intro', content_value: 'Koh Tao has plenty to offer outside of diving, from jungle hikes and stunning viewpoints to fresh seafood and sunset bars.', content_type: 'textarea', label: 'Introduction' },
  ],
  'weather': [
    { section_key: 'hero_title', content_value: 'Koh Tao Weather', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'When is the best time to visit and dive at Koh Tao?', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'intro', content_value: 'Koh Tao has a tropical climate with two main seasons. The best diving conditions are typically from March to September.', content_type: 'textarea', label: 'Introduction' },
    { section_key: 'best_months', content_value: 'March – September', content_type: 'text', label: 'Best Months' },
    { section_key: 'avg_water_temp', content_value: '28–30°C', content_type: 'text', label: 'Average Water Temp' },
    { section_key: 'avg_visibility', content_value: '10–25m', content_type: 'text', label: 'Average Visibility' },
  ],
};

export const PageContentEditor: React.FC<PageContentEditorProps> = ({ pageSlug, locale }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const template = PAGE_DEFINITIONS[pageSlug] || [];
      
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
        const baseUrl = apiUrl || window.location.origin;
        const response = await fetch(`${baseUrl}/api/admin/page-content?slug=${encodeURIComponent(pageSlug)}&locale=${encodeURIComponent(locale)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const { data } = await response.json();
        
        const loadedItems = template.map((item) => {
          const dbItem = data?.find((d: any) => d.section_key === item.section_key);
          return {
            ...item,
            content_value: dbItem?.content_value || item.content_value,
          };
        });
        setContentItems(loadedItems);
      } catch (err) {
        console.error('Failed to load content:', err);
        toast.error('Failed to load page content');
        setContentItems(template);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [pageSlug, locale]);

  // Removed: ensureMetadata, handleSaveDraft, handlePublish

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const adminToken = window.localStorage.getItem('admin_login_token');
      if (!adminToken) {
        toast.error('Not authenticated. Please login as admin.');
        return;
      }
      const upserts = contentItems.map((item) => ({
        page_slug: pageSlug,
        locale,
        section_key: item.section_key,
        content_type: item.content_type,
        content_value: item.content_value,
      }));
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl || window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/page-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify(upserts),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      toast.success('Content saved successfully');
    } catch (err) {
      console.error('Failed to save content:', err);
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (sectionKey: string, value: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.section_key === sectionKey ? { ...item, content_value: value } : item
      )
    );
  };

  if (!isAdmin) return null;
  if (isLoading) return <div className="p-4">Loading editor...</div>;

  return (
    <Card className="mt-8 border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Page Content Editor
        </CardTitle>
        <CardDescription>
          Admin-only: Edit page content for {pageSlug} ({locale})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contentItems.map((item) => (
          <div key={item.section_key} className="space-y-2">
            <Label htmlFor={item.section_key}>{item.label}</Label>
            {item.content_type === 'text' && item.content_value.length < 150 ? (
              <Input
                id={item.section_key}
                value={item.content_value}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                className="bg-white"
              />
            ) : (
              <Textarea
                id={item.section_key}
                value={item.content_value}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                rows={4}
                className="bg-white"
              />
            )}
          </div>
        ))}
        <div className="flex gap-2 p-4">
          <Button onClick={handleSave} disabled={isSaving} variant="default">
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
