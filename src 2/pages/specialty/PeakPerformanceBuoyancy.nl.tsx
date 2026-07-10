import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function PeakPerformanceBuoyancy() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Peak Performance Buoyancy Specialty</h1>
          <p className="text-xl text-gray-600">
            Beheers nauwkeurige drijfvermogencontrole en perfectioneer je horizontale trim voor veiliger en efficiënter duiken.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1659518893171-b15e20a8e201.avif"
            alt="Buoyancy control demonstration"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Perfecte drijfvermogencontrole is de basis van gevorderd duiken. Deze specialty leert je neutraal drijfvermogen en correcte trim bereiken, wat veiligheid, comfort en duikplezier verbetert.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Fijn afstellen van je loodconfiguratie</li>
            <li>Bereiken en behouden van neutraal drijfvermogen</li>
            <li>Horizontale trim en lichaamspositie</li>
            <li>Vintechnieken en voortbeweging</li>
            <li>Instellen van drijfvermogen-uitrusting</li>
            <li>Geavanceerde trimtechnieken</li>
            <li>Milieubewustzijn en bescherming</li>
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
              <p className="text-gray-700">3 duiken met focus op drijfvermogen</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 3 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Perfectioneer je drijfvermogen</h2>
          <p className="text-gray-700 mb-4">Beheers de kunst van drijfvermogencontrole voor veiligere en efficiëntere duiken.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=peak-buoyancy&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
