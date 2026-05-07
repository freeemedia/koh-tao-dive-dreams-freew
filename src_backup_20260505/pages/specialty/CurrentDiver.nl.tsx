import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function CurrentDiver() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Current Diver</h1>
          <p className="text-xl text-gray-600">Begrijp en duik veilig in sterke stromingen met planning, technieken en veiligheidsprocedures.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursushoogtepunten</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Driftduiktechnieken</li>
            <li>Oppervlakteplanning en gebruik van een drijflijn</li>
            <li>Noodprocedures in stroming</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ga mee met een driftduik</h2>
          <Button size="lg" onClick={() => window.open('/booknow.html', '_blank')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
