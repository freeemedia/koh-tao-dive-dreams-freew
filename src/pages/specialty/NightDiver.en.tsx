import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBookNowModal } from '@/components/useBookNowModal';
import Contact from '@/components/Contact';

export default function NightDiver() {
  const { setShowBookNow, BookNowModalComponent } = useBookNowModal();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Night Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Discover the hidden underwater world during night dives with specialized training and equipment.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/night/nightr.jpg"
            alt="Night diving scene"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Experience the magic of night diving with proper training in navigation, lighting systems, and communication techniques. Many creatures are more active at night, creating unique diving opportunities.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Dive light selection and use</li>
            <li>Night navigation techniques</li>
            <li>Buddy communication at night</li>
            <li>Safety procedures and protocols</li>
            <li>Disorientation prevention</li>
            <li>Nocturnal marine behavior observation</li>
            <li>Night dive planning and execution</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 15 years old</li>
            <li>Minimum 10 logged dives</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">3 nights or flexible schedule</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">3 night dives</p>
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
          <h2 className="text-2xl font-bold mb-6">Explore After Dark</h2>
          <p className="text-gray-700 mb-4">Experience the magic of night diving with our expert instructors.</p>
          <Button size="lg" onClick={() => setShowBookNow(true)}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
        {BookNowModalComponent}
      </div>
    </main>
  );
}
