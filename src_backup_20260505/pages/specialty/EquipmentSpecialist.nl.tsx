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
          <p className="text-xl text-gray-600">Leer geavanceerde vaardigheden voor onderhoud, reparatie en configuratie van duikuitrusting.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusinhoud</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Basis onderhoud van ademautomaten</li>
            <li>Inspectie en reparatie van BCD's</li>
            <li>Onderhoud van masker, vinnen en duikpak</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Behaal je certificering</h2>
          <Button size="lg" onClick={() => window.open('/booknow.html', '_blank')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
