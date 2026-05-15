import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SidemountDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Sidemount Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Beheers de technische sidemount-configuratie voor gevorderd wrak- en grotduiken.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/sidemount-diver-underwater.jpg"
            alt="Sidemount diving configuration"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Leer duiken met dubbele flessen aan je zijkant in plaats van op je rug. Sidemount-configuratie biedt betere stroomlijning en toegang tot nauwe wrak- en grotpassages.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Sidemount-uitrustingsconfiguratie</li>
            <li>Stroomlijnings- en trimtechnieken</li>
            <li>Gasmanagement met dubbele flessen</li>
            <li>Communicatie en procedures</li>
            <li>Drijfvermogencontrole en voortbeweging</li>
            <li>Probleemoplossing met uitrusting</li>
            <li>Geavanceerde voortbewegingstechnieken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Advanced Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy vereist</li>
            <li>Minimumleeftijd: 18 jaar</li>
            <li>Minimaal 75 gelogde duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">3-4 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">6 duiken in sidemount-configuratie</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 6 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Beheers sidemount</h2>
          <p className="text-gray-700 mb-4">Leer geavanceerde sidemount-configuratie voor technische duikavonturen.</p>
          <Button size="lg" onClick={() => window.open('/booking', '_blank')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
