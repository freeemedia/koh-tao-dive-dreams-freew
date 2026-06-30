import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function PeakPerformanceBuoyancy() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Peak Performance Buoyancy Specialty</h1>
          <p className="text-xl text-gray-600">
            Master precise buoyancy control and perfect your horizontal trim for safer, more efficient diving.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1659518893171-b15e20a8e201.avif"
            alt="Buoyancy control demonstration"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Perfect buoyancy control is the foundation of advanced diving. This specialty teaches you to achieve neutral buoyancy and proper trim, improving safety, comfort, and dive enjoyment.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Fine-tuning buoyancy weighting</li>
            <li>Achieving and maintaining neutral buoyancy</li>
            <li>Horizontal trim and body positioning</li>
            <li>Finning techniques and propulsion</li>
            <li>Buoyancy control equipment setup</li>
            <li>Advanced trim techniques</li>
            <li>Environmental awareness and protection</li>
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
              <p className="text-gray-700">1-2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">3 dives with focus on buoyancy</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 3 training dives</p>
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
          <h2 className="text-2xl font-bold mb-6">Perfect Your Buoyancy</h2>
          <p className="text-gray-700 mb-4">Master the art of buoyancy control for safer, more efficient dives.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=peak-buoyancy&type=course')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
