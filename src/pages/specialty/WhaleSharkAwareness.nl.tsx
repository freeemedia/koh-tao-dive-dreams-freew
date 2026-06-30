import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function WhaleSharkAwareness() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Whaleshark Awareness Specialty (AWARE)</h1>
          <p className="text-xl text-gray-600">
            Beleef ontmoetingen met walvishaaien terwijl je leert over natuurbescherming en verantwoord duiken.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Leer over walvishaaien, de grootste vissoort ter wereld, en hoe je verantwoord met ze omgaat. Begrijp hun biologie, gedrag en het belang van beschermingsinspanningen.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Biologie en fysiologie van walvishaaien</li>
            <li>Gedrag en voedingspatronen van walvishaaien</li>
            <li>Migratie en levenscyclus</li>
            <li>Lokale populaties walvishaaien</li>
            <li>Beschermingsstatus en bedreigingen</li>
            <li>Verantwoorde interacties met walvishaaien</li>
            <li>Fotografie- en observatietechnieken</li>
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
              <p className="text-gray-700">1-2 dagen (seizoensgebonden)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">2 observatie-ontmoetingen met walvishaaien</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en seizoensgebonden ontmoetingen</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ontmoet de vriendelijke reuzen</h2>
          <p className="text-gray-700 mb-4">Beleef ontmoetingen met walvishaaien en leer over natuurbescherming.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=whaleshark&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
