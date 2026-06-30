import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function AdaptiveSupportDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Adaptive Support Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Leer duikers met een beperking ondersteunen en duiken toegankelijk maken voor iedereen.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1682686580849-3e7f67df4015.avif"
            alt="Aangepaste duikondersteuning"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            De PADI Adaptive Support Diver Specialty-cursus leert je hoe je duikers met fysieke beperkingen ondersteunt, zodat scuba toegankelijk wordt voor mensen met verschillende uitdagingen. Je leert aangepaste technieken, materiaalmodificaties en communicatiemethoden om veilige en plezierige duiken voor alle deelnemers te garanderen.
          </p>
          <p className="text-gray-700">
            Deze specialty is perfect voor duikers die anderen willen helpen barrières te overwinnen en het plezier van onderwaterverkenning te ervaren.
          </p>
        </Card>

        {/* Wat je leert */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Inzicht in verschillende beperkingen en hun invloed op duiken</li>
            <li>Aangepaste uitrusting en modificaties</li>
            <li>Communicatietechnieken voor duikers met een beperking</li>
            <li>Helpen bij instappen, uitstappen en mobiliteit onder water</li>
            <li>Noodprocedures voor adaptive divers</li>
            <li>Inclusieve duikplanning en uitvoering</li>
            <li>Vertrouwen en zelfstandigheid opbouwen bij adaptive divers</li>
          </ul>
        </Card>

        {/* Vereisten */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Goede fysieke conditie</li>
            <li>Interesse in het ondersteunen van adaptive divers</li>
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
              <p className="text-gray-700">2-3 duiken met adaptive divers</p>
            </div>
          </div>
        </Card>

        {/* Prijs */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,000</div>
          <p className="text-gray-600 text-sm">Inclusief training, lesmateriaal en begeleide duiken</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Maak duiken toegankelijk</h2>
          <p className="text-gray-700 mb-4">Help inclusieve duikervaringen creëren. Doe vandaag nog mee met onze Adaptive Support Diver-cursus.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=adaptive-support&type=course')}>Boek nu</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}