import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function DivemasterInternship() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Divemaster Internship</h1>
          <p className="text-xl text-gray-600">
            All-Inclusive Professional Development Program • Koh Tao, Thailand
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">All-Inclusive Koh Tao PADI Divemaster Internship</h2>
          <p className="text-gray-700 mb-4">
            Our Divemaster Internship program gives you the opportunity to earn your first Professional level diving certification, working alongside the most experienced professional level development team in scuba diving.
          </p>
          <p className="text-gray-700 mb-4">
            Our pro level team has fine-tuned our Divemaster Internship over the past 20 years and have certified thousands of PADI Divemaster candidates and PADI Dive Instructors.
          </p>
          <p className="text-gray-700">
            Many of our professional level candidates have successfully gone on to senior roles within the scuba diving industry.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Learn to Become a PADI Divemaster</h2>
          <p className="text-gray-700 mb-4">
            Our Divemaster Internship is an all-inclusive personally tailored program aimed at producing a high quality PADI Divemaster.
          </p>
          <p className="text-gray-700 mb-4">
            You will learn what it takes to become a successful Divemaster in the modern and highly competitive scuba diving industry.
          </p>
          <p className="text-gray-700">
            You will hone and fine tune your professional level role model dive skills, learn how to demonstrate in-water skills to student level divers and perfect your rescue skill techniques and organizational skills.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What It Takes to Become a PADI Divemaster</h2>
          <p className="text-gray-700 mb-4">
            As a role model Dive leader, a PADI Divemaster is expected to lead by example both in their attitude towards others, their profession and diving abilities.
          </p>
          <p className="text-gray-700 font-semibold mb-4">Key Character Traits:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>A great attitude</li>
            <li>Strong communication skills</li>
            <li>Excellent customer service skills</li>
            <li>Able to work as part of a team</li>
            <li>Role model behaviour and diving skills (in and out of the water)</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Courses Included</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PADI Open Water Diver Course</li>
            <li>PADI Advanced Open Water Diver Course</li>
            <li>EFR (Primary & Secondary Care) Course</li>
            <li>PADI Rescue Diver Course</li>
            <li>PADI Divemaster Course</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Materials & Equipment Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-3">Digital Materials</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>PADI e-learning for all courses</li>
                <li>Divemaster Digital Crewpak</li>
                <li>Encyclopedia of Recreational Diving</li>
                <li>Digital Divemaster Slates</li>
                <li>Digital e-RDPml (Dive Planner)</li>
                <li>ReActivate e-Learning</li>
                <li>PADI Log Book</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Physical Equipment</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Blank slate & pencil</li>
                <li>Compass</li>
                <li>Delayed Surface Marker Buoy (DSMB)</li>
                <li>Finger spool with stainless steel</li>
                <li>Whistle</li>
                <li>Dive Professionals T-shirt</li>
                <li>Cutting Tool</li>
                <li>Rescue breathing mask</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            All scuba equipment rental included. PADI Membership, diving medical, and insurance covered.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Divemaster Internship Extras</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Buoyancy Lab Fluid Mechanics Workshop</h3>
              <p className="text-gray-700 text-sm">
                Levels 1-3 included to ensure your buoyancy is exceptional. Learn advanced propulsion, perfect trim, back finning, and dive leadership techniques.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reef Ecology & Conservation Training (REACT)</h3>
              <p className="text-gray-700 text-sm">
                Learn marine ecosystem functions and participate in conservation activities including reef ecology presentations, coral monitoring, beach cleanups, and dive against debris dives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resume Workshop</h3>
              <p className="text-gray-700 text-sm">
                Get guidance on presenting your diving resume to potential employers in the diving industry.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Internship Package Pricing</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Non-diver (all courses)</span>
              <span className="text-2xl font-bold text-blue-600">฿89,500</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Already Open Water Diver</span>
              <span className="text-2xl font-bold text-blue-600">฿81,500</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Already Advanced Open Water</span>
              <span className="text-2xl font-bold text-blue-600">฿73,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Already Rescue Diver</span>
              <span className="text-2xl font-bold text-blue-600">฿59,500</span>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Program Details</h2>
          <p className="text-gray-700 mb-4">
            We believe all dive professionals should demonstrate dive skills in a realistic manner. We work closely with you through each part of the internship to complete the Divemaster skill circuit in neutral buoyancy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-gray-700">4-8 weeks depending on starting level and pace</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Minimum Requirement</h3>
              <p className="text-gray-700">60+ logged dives (all training included)</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Living Costs on Koh Tao</h2>
          <p className="text-gray-700 mb-4">
            The internship package covers all training, PADI materials, certification costs, and equipment. Additional costs include accommodation, food, phone, activities, and living expenses.
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 font-semibold">Estimated Monthly Budget:</p>
            <p className="text-gray-700 text-lg">฿25,000 per month (comfortable living)</p>
            <p className="text-sm text-gray-600 mt-2">
              This covers food, accommodation, scooter rental, and social activities.
            </p>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Divemaster Internship?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>20+ years of experience in professional diver training</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>High training standards and proven employment success</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Flexible scheduling to explore beautiful Koh Tao</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Comprehensive curriculum including conservation training</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>All materials, equipment, and certification costs included</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>International community and networking opportunities</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ready to Become a PADI Divemaster?</h2>
          <p className="text-gray-700 mb-4">Start your professional diving career with our comprehensive divemaster internship program.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=divemaster-internship')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
