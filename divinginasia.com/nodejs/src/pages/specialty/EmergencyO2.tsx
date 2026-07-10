import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EmergencyO2() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Emergency Oxygen Provider</h1>
          <p className="text-xl text-gray-600">Training to safely administer emergency oxygen for dive-related incidents.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700">Learn recognition of diving injuries, oxygen therapy setup and delivery, patient assessment, and emergency procedures aligned with dive emergency protocols.</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Enroll Now</h2>
          <p className="text-gray-700 mb-4">Certification useful for shop staff, boat crews, and dive professionals.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=emergency-o2')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
