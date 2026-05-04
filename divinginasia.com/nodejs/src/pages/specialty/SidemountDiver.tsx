import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SidemountDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Sidemount Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Master the technical sidemount configuration for advanced wreck and cave diving.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/sidemount-diver-underwater.jpg"
            alt="Sidemount diving configuration"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to dive with dual tanks positioned at your sides instead of on your back. Sidemount configuration offers superior streamlining and access to tight wreck and cave passages.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Sidemount equipment configuration</li>
            <li>Streamlining and trim techniques</li>
            <li>Gas management with dual tanks</li>
            <li>Communication and procedure</li>
            <li>Buoyancy control and propulsion</li>
            <li>Equipment troubleshooting</li>
            <li>Advanced propulsion techniques</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Advanced Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy required</li>
            <li>Minimum age: 18 years old</li>
            <li>Minimum 75 logged dives</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">3-4 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">6 dives in sidemount configuration</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿5,500</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 6 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Master Sidemount</h2>
          <p className="text-gray-700 mb-4">Learn advanced sidemount configuration for technical dive adventures.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=sidemount')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
