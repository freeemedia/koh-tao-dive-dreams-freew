import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EmergencyO2Provider() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Emergency Oxygen Provider Specialty</h1>
          <p className="text-xl text-gray-600">
            Learn to provide emergency oxygen administration for dive injuries and medical emergencies.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/o2-cylinder.png"
            alt="Emergency oxygen equipment"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Emergency Oxygen Provider Specialty course teaches you how to safely and effectively administer emergency oxygen to injured divers and others. You'll learn about oxygen delivery systems, indications for oxygen use, and proper administration techniques for various dive-related and medical emergencies.
          </p>
          <p className="text-gray-700">
            This course is valuable for dive professionals and anyone who wants to be prepared to provide emergency oxygen in diving situations.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Understanding oxygen and its medical uses</li>
            <li>Types of oxygen delivery systems</li>
            <li>Indications and contraindications for oxygen administration</li>
            <li>Proper administration techniques</li>
            <li>Equipment maintenance and safety</li>
            <li>Integration with CPR and first aid</li>
            <li>Documentation and legal considerations</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 15 years old</li>
            <li>Current CPR certification recommended</li>
            <li>Basic first aid knowledge</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1 day</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-gray-700">Classroom and practical sessions</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Includes training and materials</p>
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
                onClick={() => navigate('/booking?item=3%20Specialty%20Bundle&type=course&price=18000&currency=IDR')}
              >
                Book 3 Specialty Bundle
              </Button>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Be Prepared for Emergencies</h2>
          <p className="text-gray-700 mb-4">Learn life-saving oxygen administration skills. Enroll in our emergency oxygen provider course.</p>
          <Button size="lg" onClick={() => window.open('/booknow.html', '_blank')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}