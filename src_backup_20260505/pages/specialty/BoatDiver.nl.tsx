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
          <p className="text-xl text-gray-600">Leer veilige en efficiënte bootduikprocedures voor verschillende type boten.</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700">Deze specialty behandelt bootuitrusting, in- en uitstaptechnieken, briefings voor skiffs en grotere boten, en teamcoördinatie voor dagelijkse bootduikoperaties.</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Boek een Boat Diver-cursus</h2>
          <p className="text-gray-700 mb-4">Praktijksessies worden uitgevoerd vanaf lokale duikboten. Geschikt voor duikers die hun vertrouwen en bootvaardigheden willen verbeteren.</p>
          <Button size="lg" onClick={() => window.open('/booknow.html', '_blank')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
