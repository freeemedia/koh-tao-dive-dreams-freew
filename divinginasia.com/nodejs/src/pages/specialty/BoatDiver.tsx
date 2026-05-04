import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function BoatDiver() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Boat Diver</h1>
          <p className="text-xl text-gray-600">Learn safe and efficient boat diving procedures for a variety of vessel types.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700">This specialty covers boat equipment, entry/exit techniques, skiff and larger vessel briefing procedures, and team coordination for day-to-day boat diving operations.</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Book a Boat Diver Course</h2>
          <p className="text-gray-700 mb-4">Practical sessions are run from local dive boats. Suitable for divers wishing to improve confidence and boat skills.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=boat-diver')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
