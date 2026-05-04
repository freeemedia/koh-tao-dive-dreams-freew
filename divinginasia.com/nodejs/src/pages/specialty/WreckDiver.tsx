import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function WreckDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Wreck Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Become a true ocean explorer and delve into history by exploring sunken shipwrecks with specialized training and certification.
          </p>
        </div>

        {/* Hero Background Image */}
        <div className="mb-8 h-80 rounded-lg shadow-lg overflow-hidden" style={{ backgroundImage: "url('/images/htms-sattakut.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to safely dive a shipwreck and become a certified PADI Wreck Diver. This course teaches you how to explore sunken wrecks with proper planning, organization, procedures, and techniques for safe and exciting wreck diving.
          </p>
          <p className="text-gray-700 mb-4">
            You'll receive training on the HTMS Sattakut, a real wreck on Koh Tao that's perfect for learning wreck diving skills. During your training, you'll gradually build confidence and ability to become a competent wreck diver specialist.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Common problems and hazards of wreck diving</li>
            <li>Planning, organization, procedures and techniques for fun and safe wreck diving</li>
            <li>Dive planning and equipment considerations for deeper dives</li>
            <li>Special training for shipwreck penetration and entry hazards</li>
            <li>Moving through and using a penetration line inside a wreck</li>
            <li>Emergency procedures for loss of visibility, light failure or air supply</li>
            <li>Useful knots and reel deployment techniques</li>
            <li>Limitations for wreck penetration and specialized equipment needed</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Be an Adventure Diver or have qualifying certification from another agency</li>
            <li>Recent diving experience (we recommend a scuba review if you haven't dived in 12+ months)</li>
            <li>Minimum age: 15 years old</li>
            <li>Medically fit to dive</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Details</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-1">Duration</h3>
              <p>1.5 - 2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Training Dives</h3>
              <p>4 wreck dives at HTMS Sattakut</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Course Includes</h3>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>PADI Wreck Diver manual</li>
                <li>All training dives</li>
                <li>PADI Certification card</li>
                <li>Rental of all scuba equipment</li>
                <li>FREE use of dive computer</li>
                <li>Log book</li>
                <li>Maximum 4 students per instructor</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">The 4 Training Dives</h2>
          <div className="space-y-4 text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Dive #1: Wreck Exploration</h3>
              <p>Experience the excitement of diving the wreck. Learn to safely plan and execute a wreck dive deeper than 18 metres. Swim along the outside while identifying and avoiding hazards.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Dive #2: Wreck Mapping</h3>
              <p>Create an outline map of the wreck with features and detail. Calculate approximate size and survey possible entrances and exits in preparation for penetration.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Dive #3: Line Deployment Practice</h3>
              <p>Practice deploying and retrieving a penetration line. Swim along the deployed line while maintaining contact without disturbing silt and using your dive light properly.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Dive #4: Wreck Penetration</h3>
              <p>Your final dive! Plan and perform a wreck penetration that enters and exits the wreck. Focus on moving through without excessive silt while keeping contact with the line.</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm mb-4">Includes all training, materials, equipment rental, and certification</p>
          <p className="text-sm text-gray-600">*Discount 1,500 baht if you've already completed the Wreck Adventure dive as part of Advanced Open Water</p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-lg font-bold mb-3">Combine with Other Courses</h2>
          <p className="text-gray-700 mb-4">You can combine the PADI Wreck Diver course with the PADI Enriched Air Nitrox Specialty course to gain two certifications in the same timeframe!</p>
          <p className="text-sm text-gray-600">Add ฿5,900 to combine with Enriched Air Nitrox</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ready to Explore Wrecks?</h2>
          <p className="text-gray-700 mb-4">Discover the history and mysteries of underwater wrecks with our experienced instructors on Koh Tao.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=wreck-diver')}>Book Your Wreck Course Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
