import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function UnderwaterNaturalist() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Underwater Naturalist Specialty</h1>
          <p className="text-xl text-gray-600">
            Ontdek en waardeer zeeleven via herkenning, gedragsobservatie en natuurbescherming.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/turtle.avif"
            alt="Zeeleven onder water"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            De PADI Underwater Naturalist Specialty-cursus leert je zeeleven herkennen, onderwaterecosystemen begrijpen en het belang van mariene bescherming waarderen. Je leert over vissen, ongewervelden, planten en koraalrifsystemen terwijl je vaardigheden in observatie en onderwaterfotografie ontwikkelt.
          </p>
          <p className="text-gray-700">
            Deze cursus is perfect voor duikers die hun band met de onderwaterwereld willen verdiepen en willen bijdragen aan mariene bescherming.
          </p>
        </Card>

        {/* Wat je leert */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Herkenning en classificatie van zeeleven</li>
            <li>Inzicht in mariene ecosystemen en leefgebieden</li>
            <li>Observatie van diergedrag en interactie</li>
            <li>Koraalrifecologie en bescherming</li>
            <li>Onderwaterfotografietechnieken</li>
            <li>Principes van mariene bescherming</li>
            <li>Bewustzijn van milieu-impact</li>
          </ul>
        </Card>

        {/* Vereisten */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 12 jaar</li>
            <li>Interesse in zeeleven en natuurbescherming</li>
            <li>Goede observatievaardigheden</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">1-2 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">2-3 observatieduiken</p>
            </div>
          </div>
        </Card>

        {/* Prijs */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en observatieduiken</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ontdek het zeeleven</h2>
          <p className="text-gray-700 mb-4">Ontdek de wonderen van onderwaterecosystemen. Doe mee met onze Underwater Naturalist-cursus.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=underwater-naturalist&type=course')}>Boek nu</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}