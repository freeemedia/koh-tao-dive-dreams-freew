import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function CoralWatch() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Coral Watch Specialty (AWARE)</h1>
          <p className="text-xl text-gray-600">
            Draag bij aan koraalrifonderzoek terwijl je leert over rifbescherming en monitoring.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Doe mee aan koraalrifbescherming door deel te nemen aan Coral Watch-monitoringprogramma's. Leer de gezondheid van koraal beoordelen en lever echte data aan wereldwijde rifonderzoeksinitiatieven.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Ecologie en fysiologie van koraalriffen</li>
            <li>Koraalbleking en beoordeling van koraalgezondheid</li>
            <li>Coral Watch-methodologie</li>
            <li>Dataverzameling en rapportage</li>
            <li>Beschermingsstrategieën</li>
            <li>Effecten van klimaatverandering op riffen</li>
            <li>Bescherming en herstel van riffen</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 10 jaar</li>
            <li>Geen minimale duikervaring vereist</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">1-2 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">2-3 monitoringduiken</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿2,300</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 2-3 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Bescherm onze riffen</h2>
          <p className="text-gray-700 mb-4">Draag bij aan koraalrifonderzoek en bescherming met echte monitoringsdata.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=coral-watch&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
