import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function UnderwaterNaturalist() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Underwater Naturalist Specialty</h1>
          <p className="text-xl text-gray-600">
            Discover and appreciate marine life through identification, behavior observation, and conservation.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/turtle.avif"
            alt="Marine life underwater"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Underwater Naturalist Specialty course teaches you to identify marine life, understand underwater ecosystems, and appreciate the importance of marine conservation. You'll learn about fish, invertebrates, plants, and coral reef systems while developing skills in underwater observation and photography.
          </p>
          <p className="text-gray-700">
            This course is perfect for divers who want to deepen their connection with the underwater world and contribute to marine conservation efforts.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Marine life identification and classification</li>
            <li>Understanding marine ecosystems and habitats</li>
            <li>Animal behavior and interaction observation</li>
            <li>Coral reef ecology and conservation</li>
            <li>Underwater photography techniques</li>
            <li>Marine conservation principles</li>
            <li>Environmental impact awareness</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 12 years old</li>
            <li>Interest in marine life and conservation</li>
            <li>Good observation skills</li>
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
              <p className="text-gray-700">2-3 observation dives</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and observation dives</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Explore Marine Life</h2>
          <p className="text-gray-700 mb-4">Discover the wonders of underwater ecosystems. Join our underwater naturalist course.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=underwater-naturalist')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}