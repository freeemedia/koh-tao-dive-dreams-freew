import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function DPVDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI DPV Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Verken meer met diver propulsion vehicles voor groter bereik en moeiteloze dekking.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/dpv.jpg"
            alt="DPV diver propulsion vehicle"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Leer diver propulsion vehicles (scooters) veilig gebruiken om grotere gebieden met minder inspanning te verkennen. Perfect om meer duiklocaties, wrakken en diepe riffen te bezoeken.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>DPV-typen en uitrusting</li>
            <li>Besturings- en hanteertechnieken</li>
            <li>Beheer van gasverbruik</li>
            <li>Navigeren met DPV</li>
            <li>Veiligheidsprocedures en buddytechnieken</li>
            <li>Drijfvermogencontrole met DPV</li>
            <li>Probleemsituaties en oplossingen</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy aanbevolen</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Minimaal 25 gelogde duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">2 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">4 duiken met DPV</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,200</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 4 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Duik met DPV-scooters</h2>
          <p className="text-gray-700 mb-4">Ervaar duiken met voortstuwingsvoertuigen om meer afstand af te leggen met minder inspanning.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=dpv&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
