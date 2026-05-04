import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EquipmentSpecialist() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Equipment Specialist</h1>
          <p className="text-xl text-gray-600">Learn advanced equipment maintenance, repair, and configuration skills for dive gear.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Regulator service basics</li>
            <li>BCD inspection and repair</li>
            <li>Mask, fin and suit care</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Get Certified</h2>
          <Button size="lg" onClick={() => navigate('/booking?course=equipment-specialist')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
