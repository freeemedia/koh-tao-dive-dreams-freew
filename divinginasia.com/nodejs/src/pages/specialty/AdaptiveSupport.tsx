import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function AdaptiveSupport() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Adaptive Support Diver</h1>
          <p className="text-xl text-gray-600">Scuba training adapted for divers with disabilities or special needs.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700">This program provides tailored instruction and support so people with varying abilities can enjoy scuba safely. Training is adapted to individual needs and focuses on confidence, safety, and fun.</p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personalised skill progression</li>
            <li>Adaptive equipment use</li>
            <li>Buddy and instructor communication</li>
            <li>Safety and risk management</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ready to Dive?</h2>
          <p className="text-gray-700 mb-4">Contact us to discuss your individual requirements and schedule.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=adaptive-support')}>Enquire / Book</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
