import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function NightDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Night Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Ontdek de verborgen onderwaterwereld tijdens nachtduiken met gespecialiseerde training en uitrusting.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/night/nightr.jpg"
            alt="Night diving scene"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Ervaar de magie van nachtduiken met goede training in navigatie, lichtsystemen en communicatietechnieken. Veel dieren zijn 's nachts actiever, wat unieke duikmogelijkheden creëert.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Selectie en gebruik van duiklampen</li>
            <li>Nachtnavigatietechnieken</li>
            <li>Buddycommunicatie in het donker</li>
            <li>Veiligheidsprocedures en protocollen</li>
            <li>Voorkomen van desoriëntatie</li>
            <li>Observatie van nachtelijk marien gedrag</li>
            <li>Planning en uitvoering van nachtduiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Minimaal 10 gelogde duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">3 avonden of flexibel schema</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">3 nachtduiken</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 3 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ontdek de nacht</h2>
          <p className="text-gray-700 mb-4">Ervaar de magie van nachtduiken met onze ervaren instructeurs.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=night-diver&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
