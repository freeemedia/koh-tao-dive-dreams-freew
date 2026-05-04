import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function AdaptiveSupportDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Adaptive Support Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Learn to support divers with disabilities and make diving accessible to everyone.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1682686580849-3e7f67df4015.avif"
            alt="Adaptive diving support"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Adaptive Support Diver Specialty course teaches you how to assist divers with physical disabilities, making scuba diving accessible to people with various challenges. You'll learn adaptive techniques, equipment modifications, and communication methods to ensure safe and enjoyable dives for all participants.
          </p>
          <p className="text-gray-700">
            This specialty is perfect for divers who want to help others overcome barriers and experience the joy of underwater exploration.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Understanding different types of disabilities and their impact on diving</li>
            <li>Adaptive equipment and modifications</li>
            <li>Communication techniques for divers with disabilities</li>
            <li>Assisting with entries, exits, and underwater mobility</li>
            <li>Emergency procedures for adaptive divers</li>
            <li>Inclusive dive planning and execution</li>
            <li>Building confidence and independence in adaptive divers</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 15 years old</li>
            <li>Good physical condition</li>
            <li>Interest in supporting adaptive divers</li>
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
              <p className="text-gray-700">2-3 dives with adaptive divers</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,000</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and supervised dives</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Make Diving Accessible</h2>
          <p className="text-gray-700 mb-4">Help create inclusive diving experiences. Join our adaptive support diver course today.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=adaptive-support')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}