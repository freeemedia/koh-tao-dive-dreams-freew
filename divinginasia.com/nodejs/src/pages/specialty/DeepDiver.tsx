import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function DeepDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Deep Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Extend your diving limits and explore deeper waters safely with advanced techniques and knowledge.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1682686580849-3e7f67df4015.avif"
            alt="Deep diving scene"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Deep Diver Specialty course allows you to safely explore depths of up to 40 meters (130 feet). Learn essential techniques for deep diving, including gas management, narcosis awareness, and efficient buoyancy control at depth.
          </p>
          <p className="text-gray-700">
            This course is perfect for divers who want to access deeper dive sites and underwater features like wrecks, deep reefs, and extended underwater landscape formations.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Hazards of deep diving and nitrogen narcosis</li>
            <li>Proper planning and execution of deep dives</li>
            <li>Efficient use of air at greater depths</li>
            <li>Advanced buoyancy control techniques</li>
            <li>Time management and dive procedures</li>
            <li>Decompression diving introduction</li>
            <li>Navigation and communication at depth</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 15 years old</li>
            <li>Minimum 10 logged dives (recommended)</li>
            <li>Good physical condition</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1-2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">4 dives (2-4 meters deeper than previous dives)</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Includes all training, materials, and 4 training dives</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ready to Go Deeper?</h2>
          <p className="text-gray-700 mb-4">Join us for an unforgettable deep diving experience. Our expert instructors will guide you safely to greater depths.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=deep-diver')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
