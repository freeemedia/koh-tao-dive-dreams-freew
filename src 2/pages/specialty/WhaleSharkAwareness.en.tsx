import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function WhaleSharkAwareness() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Whaleshark Awareness Specialty (AWARE)</h1>
          <p className="text-xl text-gray-600">
            Experience encounters with whale sharks while learning conservation and responsible diving practices.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn about whale sharks, the world's largest fish species, and how to responsibly interact with them. Understand their biology, behavior, and the importance of conservation efforts.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Whale shark biology and physiology</li>
            <li>Whale shark behavior and feeding patterns</li>
            <li>Migration and life cycle</li>
            <li>Local whale shark populations</li>
            <li>Conservation status and threats</li>
            <li>Responsible whale shark interactions</li>
            <li>Photography and observation techniques</li>
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
              <p className="text-gray-700">1-2 days (seasonal)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">2 whale shark observation encounters</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and seasonal encounters</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Meet the Gentle Giants</h2>
          <p className="text-gray-700 mb-4">Experience encounters with whale sharks and learn about conservation.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=whaleshark&type=course')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
