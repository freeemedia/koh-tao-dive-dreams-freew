import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SearchRecovery() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Search & Recovery Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Learn search patterns, recovery techniques, and underwater problem-solving skills.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Develop skills in underwater search techniques, recovery methods, and specialized equipment use. This specialty combines problem-solving with practical diving skills.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Search patterns and procedures</li>
            <li>Recovery equipment and techniques</li>
            <li>Underwater problem-solving</li>
            <li>Lift bags and buoyancy calculations</li>
            <li>Team coordination and safety</li>
            <li>Towing and securing objects</li>
            <li>Documentation and legal considerations</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>PADI Advanced Open Water recommended</li>
            <li>Minimum age: 12 years old</li>
            <li>Minimum 10 logged dives</li>
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
              <p className="text-gray-700">4 dives with search patterns</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,000</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 4 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Master Search & Recovery</h2>
          <p className="text-gray-700 mb-4">Develop expert search and recovery skills with our experienced team.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=search-recovery')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
