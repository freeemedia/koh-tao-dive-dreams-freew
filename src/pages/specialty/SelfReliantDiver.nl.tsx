import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function SelfReliantDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Self Reliant Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Bouw vertrouwen op en duik zelfstandig met geavanceerde probleemoplossende en zelfredzame vaardigheden.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1647825194145-2d94e259c745.avif"
            alt="Independent diving"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Ontwikkel de vaardigheden en het vertrouwen om zelfstandiger te duiken met behoud van hoge veiligheidsnormen. Leer je uitrusting beheren, veelvoorkomende problemen oplossen en goede duikbeslissingen nemen.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Redundantie en configuratie van uitrusting</li>
            <li>Geavanceerde probleemoplossende technieken</li>
            <li>Zelfredzaamheid tijdens het duiken</li>
            <li>Beheersing van gasmanagement</li>
            <li>Navigatie en routeplanning</li>
            <li>Optimalisatie van voortbeweging en trim</li>
            <li>Zelfstandig besluitnemen tijdens duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Advanced Open Water Diver</li>
            <li>PADI Peak Performance Buoyancy aanbevolen</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Minimaal 100 gelogde duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & trainingsduiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">2-3 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trainingsduiken</h3>
              <p className="text-gray-700">4 duiken met focus op zelfredzaamheid</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en 4 trainingsduiken</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Word zelfredzaam</h2>
          <p className="text-gray-700 mb-4">Bouw het vertrouwen en de vaardigheden op om zelfstandig en veilig te duiken.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=self-reliant&type=course')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
