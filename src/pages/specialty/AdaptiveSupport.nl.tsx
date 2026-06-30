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
          <p className="text-xl text-gray-600">Duiktraining aangepast voor duikers met een beperking of speciale behoeften.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700">Dit programma biedt maatwerkinstructie en ondersteuning zodat mensen met verschillende mogelijkheden veilig van scuba kunnen genieten. De training wordt aangepast aan individuele behoeften en richt zich op vertrouwen, veiligheid en plezier.</p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Gepersonaliseerde vaardigheidsopbouw</li>
            <li>Gebruik van aangepaste uitrusting</li>
            <li>Communicatie met buddy en instructeur</li>
            <li>Veiligheid en risicobeheer</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Klaar om te duiken?</h2>
          <p className="text-gray-700 mb-4">Neem contact met ons op om je persoonlijke wensen en planning te bespreken.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=adaptive-support&type=course')}>Informatie / Boeken</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
