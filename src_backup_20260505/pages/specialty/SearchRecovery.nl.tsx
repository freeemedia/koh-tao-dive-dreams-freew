import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SearchRecovery() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Search & Recovery Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Leer zoekpatronen, bergingstechnieken en probleemoplossende vaardigheden onder water.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Ontwikkel vaardigheden in onderwaterzoektechnieken, bergingsmethoden en het gebruik van gespecialiseerde uitrusting. Deze specialty combineert probleemoplossing met praktische duikvaardigheden.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Zoekpatronen en procedures</li>
            <li>Bergingsuitrusting en technieken</li>
            <li>Probleemoplossing onder water</li>
            <li>Liftbags en drijfvermogen-berekeningen</li>
            <li>Teamcoördinatie en veiligheid</li>
            <li>Slepen en zekeren van objecten</li>
            <li>Documentatie en juridische aandachtspunten</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>PADI Advanced Open Water aanbevolen</li>
            <li>Minimumleeftijd: 12 jaar</li>
            <li>Minimaal 10 gelogde duiken</li>
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
              <p className="text-gray-700">4 duiken met zoekpatronen</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">IDR 3,100,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 4 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Beheers zoeken en bergen</h2>
          <p className="text-gray-700 mb-4">Ontwikkel deskundige zoek- en bergingsvaardigheden met ons ervaren team.</p>
          <Button size="lg" onClick={() => window.open('/booknow.html', '_blank')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
