import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EnrichedAirDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Enriched Air (Nitrox) Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Extend your bottom time and reduce surface intervals with enriched air diving.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/enrich.jpg"
            alt="Enriched air diving equipment"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to use enriched air (nitrox) to extend your no-decompression limits and reduce surface intervals. This practical specialty teaches you the physics and physiology of diving with higher oxygen content.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Enriched air physics and physiology</li>
            <li>Oxygen partial pressure limits</li>
            <li>Equipment requirements and analysis</li>
            <li>Dive planning with enriched air tables</li>
            <li>Safety procedures and narcosis reduction</li>
            <li>Advantages and limitations of nitrox</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 12 years old</li>
            <li>No minimum dive experience required</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1 day</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">2 dives with enriched air</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 2 training dives</p>
        </Card>
        <Card className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Save with 3 Specialty Bundle!</h3>
              <p className="text-emerald-800 mb-3">
                Enroll in three PADI Specialty courses and pay only <strong>฿18,000</strong> instead of ฿24,000. 
                Mix and match any specialties to explore different aspects of scuba diving!
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-emerald-900">฿18,000</span>
                <span className="text-emerald-700 line-through">฿24,000</span>
                <span className="text-sm bg-emerald-200 text-emerald-900 px-2 py-1 rounded">Save ฿6,000</span>
              </div>
              <Button 
                variant="default" 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => navigate('/booking?item=3%20Specialty%20Bundle&type=course&price=18000&currency=THB')}
              >
                Book 3 Specialty Bundle
              </Button>
            </div>
          </div>
        </Card>
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Extend Your Bottom Time</h2>
          <p className="text-gray-700 mb-4">Learn to safely use enriched air for longer, more enjoyable dives.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=enriched-air&type=course')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
