import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency, CurrencySelector } from '@/hooks/useCurrency';
import InlineCourseBookingForm from '@/components/InlineCourseBookingForm';
import Contact from '@/components/Contact';

const STRIPE_LINK = 'https://book.stripe.com/bJe8wPfK0fwSgRecur7EQ00';

const COURSES = [
  {
    title: 'Open Water Diver',
    path: '/courses/open-water',
    duration: '3–4 days',
    priceTHB: 9900,
    description:
      'Your first scuba certification. Learn to dive safely in confined and open water, earning the most recognised diving qualification in the world.',
  },
  {
    title: 'Advanced Open Water',
    path: '/courses/advanced',
    duration: '2 days',
    priceTHB: 9900,
    description:
      'Five adventure dives including deep diving and underwater navigation. Unlock more dive sites and build real confidence underwater.',
  },
  {
    title: 'Emergency First Response',
    path: '/courses/efr',
    duration: '1 day',
    priceTHB: 5500,
    description:
      'First aid and CPR training — a required prerequisite for Rescue Diver. Valuable skills for everyday life too.',
  },
  {
    title: 'Rescue Diver',
    path: '/courses/rescue',
    duration: '3–4 days',
    priceTHB: 12500,
    description:
      'The most rewarding course many divers ever take. Learn to prevent and manage dive emergencies and look after fellow divers.',
  },
  {
    title: 'Divemaster',
    path: '/courses/divemaster',
    duration: '2–4 weeks',
    priceTHB: 41000,
    description:
      'Your first professional-level qualification. Lead dives, assist instructors, and work in the dive industry worldwide.',
  },
];

const TOTAL_THB = COURSES.reduce((sum, c) => sum + c.priceTHB, 0);
const PACKAGE_THB = Math.round(TOTAL_THB * 0.85); // 15% package saving
const DEPOSIT_THB = Math.round(PACKAGE_THB * 0.2);

const OpenWaterToDivemaster: React.FC = () => {
  const { convertCurrency, currency } = useCurrency();

  const fmt = (thb: number) => convertCurrency(thb, 'THB');

  return (
    <>
      <CurrencySelector />

      {/* Hero */}
      <section
        className="relative bg-gradient-to-br from-teal-800 to-blue-900 text-white py-20 px-4 text-center"
        style={{ minHeight: '340px' }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Full Progression Package
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Open Water to Divemaster
          </h1>
          <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Complete your entire diving journey in one place — from your first breath underwater to
            professional Divemaster certification. Train with us on Koh Tao and join the dive
            industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors"
            >
              Reserve Your Place — Pay Deposit
            </a>
            <a
              href="#book-with-us"
              className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-lg text-lg border border-white/40 transition-colors"
            >
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Pricing banner */}
      <section className="bg-teal-50 border-b border-teal-100 py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Individual total</p>
            <p className="text-2xl font-bold text-gray-400 line-through">{fmt(TOTAL_THB)}</p>
          </div>
          <div className="text-4xl text-teal-400 hidden sm:block">→</div>
          <div>
            <p className="text-sm text-teal-700 uppercase tracking-wider font-semibold">
              Package price (save 15%)
            </p>
            <p className="text-4xl font-extrabold text-teal-700">{fmt(PACKAGE_THB)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Deposit to reserve</p>
            <p className="text-2xl font-bold text-gray-700">{fmt(DEPOSIT_THB)}</p>
          </div>
        </div>
      </section>

      {/* Course breakdown */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Your Progression Path
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Five courses, one journey — all on Koh Tao, Thailand.
          </p>

          <div className="space-y-4">
            {COURSES.map((course, idx) => (
              <div
                key={course.title}
                className="flex items-start gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <Link
                      to={course.path}
                      className="text-lg font-semibold text-teal-700 hover:underline"
                    >
                      {course.title}
                    </Link>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">{fmt(course.priceTHB)}</p>
                  <p className="text-xs text-gray-400">individual</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-teal-700 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-teal-100">
            {[
              'All PADI course materials & digital certification fees',
              'Equipment rental for all courses',
              'All boat dives & pool sessions',
              'EFR first aid & CPR training',
              'Divemaster internship with guided mentorship',
              'Small group sizes — personalised training',
              'Accommodation referrals on Koh Tao',
              'Fun dive discounts throughout your training',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-1 text-teal-300 flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Typical Timeline
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="px-4 py-3 font-semibold text-gray-700 border border-gray-100">Course</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border border-gray-100">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border border-gray-100">Prerequisite</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 border border-gray-100">Open Water Diver</td>
                  <td className="px-4 py-3 border border-gray-100">3–4 days</td>
                  <td className="px-4 py-3 border border-gray-100">None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 border border-gray-100">Advanced Open Water</td>
                  <td className="px-4 py-3 border border-gray-100">2 days</td>
                  <td className="px-4 py-3 border border-gray-100">Open Water Diver</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 border border-gray-100">EFR</td>
                  <td className="px-4 py-3 border border-gray-100">1 day</td>
                  <td className="px-4 py-3 border border-gray-100">None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 border border-gray-100">Rescue Diver</td>
                  <td className="px-4 py-3 border border-gray-100">3–4 days</td>
                  <td className="px-4 py-3 border border-gray-100">Advanced OW + EFR</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 border border-gray-100">Divemaster</td>
                  <td className="px-4 py-3 border border-gray-100">2–4 weeks</td>
                  <td className="px-4 py-3 border border-gray-100">Rescue Diver + 40 dives</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Total time from beginner to Divemaster: approximately 5–7 weeks.
          </p>
        </div>
      </section>

      {/* Stripe CTA */}
      <section className="bg-gray-900 text-white py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-8">
            Pay your deposit securely online with a credit or debit card. We'll be in touch within
            24 hours to confirm your start date and answer any questions.
          </p>
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold px-10 py-4 rounded-lg text-xl shadow-lg transition-colors mb-4"
          >
            Pay Deposit via Stripe
          </a>
          <p className="text-gray-500 text-sm">
            Powered by Stripe — secure card payments.
          </p>
        </div>
      </section>

      {/* Inline booking form */}
      <section className="py-16 px-4 bg-white" id="book-with-us">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Book with Us Now</h2>
          <p className="text-center text-gray-500 mb-8">
            Have questions? Fill in the form and we'll get back to you quickly.
          </p>
          <InlineCourseBookingForm
            itemType="course"
            itemTitle="Open Water to Divemaster Package"
            depositMajor={DEPOSIT_THB}
            depositCurrency="THB"
          />
        </div>
      </section>

      <Contact />
    </>
  );
};

export default OpenWaterToDivemaster;
