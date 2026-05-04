import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function DPVDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI DPV Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Explore more with diver propulsion vehicles for extended range and effortless coverage.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/dpv.jpg"
            alt="DPV diver propulsion vehicle"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to safely operate diver propulsion vehicles (scooters) to explore larger areas with less energy expenditure. Perfect for covering more dive sites, wrecks, and deep reefs.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>DPV types and equipment</li>
            <li>Control and handling techniques</li>
            <li>Gas consumption management</li>
            <li>Navigation with DPV</li>
            <li>Safety procedures and buddy techniques</li>
            <li>Buoyancy control with DPV</li>
            <li>Problematic situations and solutions</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy recommended</li>
            <li>Minimum age: 15 years old</li>
            <li>Minimum 25 logged dives</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">4 dives with DPV</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,200</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 4 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ride with DPV Scooters</h2>
          <p className="text-gray-700 mb-4">Experience diving with propulsion vehicles to cover more distance with less effort.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=dpv')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
