import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function FishIdentification() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Fish Identification Specialty (AWARE)</h1>
          <p className="text-xl text-gray-600">
            Beheers visherkenning en begrijp mariene biodiversiteit in de wateren van Zuidoost-Azië.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Leer vissen rond Koh Tao herkennen en hun gedrag begrijpen. Deze op natuurbescherming gerichte specialty vergroot je waardering voor het zeeleven en helpt het ecosysteem te beschermen via verantwoord duiken.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Technieken voor visherkenning</li>
            <li>Veelvoorkomende vissoorten rond Koh Tao</li>
            <li>Visgedrag en ecologie</li>
            <li>Visfamilies en kenmerken</li>
            <li>Natuurbescherming en verantwoord duiken</li>
            <li>Onderwaterfotografietechnieken</li>
            <li>Herkenning van leefgebieden</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 12 jaar</li>
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
              <p className="text-gray-700">2 identificatieduiken</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 2 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ontdek het zeeleven</h2>
          <p className="text-gray-700 mb-4">Leer de rijke mariene biodiversiteit rond Koh Tao herkennen en waarderen.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=fish-id&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
