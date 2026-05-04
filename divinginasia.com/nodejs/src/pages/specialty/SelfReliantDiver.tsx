import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SelfReliantDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Self Reliant Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Build confidence and dive independently with advanced problem-solving and self-sufficiency skills.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1647825194145-2d94e259c745.avif"
            alt="Independent diving"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Develop the skills and confidence to dive more independently while maintaining high safety standards. Learn to manage your equipment, handle common problems, and make sound diving decisions.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Equipment redundancy and configuration</li>
            <li>Advanced problem-solving techniques</li>
            <li>Self-sufficiency in diving</li>
            <li>Gas management mastery</li>
            <li>Navigation and route planning</li>
            <li>Propulsion and trim optimization</li>
            <li>Independent dive decision-making</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Advanced Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy recommended</li>
            <li>Minimum age: 15 years old</li>
            <li>Minimum 100 logged dives</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">2-3 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">4 dives focused on self-reliance</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,800</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 4 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Become Self Reliant</h2>
          <p className="text-gray-700 mb-4">Build the confidence and skills to dive independently and safely.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=self-reliant')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
