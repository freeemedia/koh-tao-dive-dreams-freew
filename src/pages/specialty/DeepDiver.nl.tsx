import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBookNowModal } from '@/components/useBookNowModal';
import Contact from '@/components/Contact';

export default function DeepDiver() {
  const { setShowBookNow, BookNowModalComponent } = useBookNowModal();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Deep Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Verleg je duiklimieten en verken veilig diepere wateren met geavanceerde technieken en kennis.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1682686580849-3e7f67df4015.avif"
            alt="Deep diving scene"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            De PADI Deep Diver Specialty-cursus laat je veilig dieptes tot 40 meter (130 voet) verkennen. Je leert essentiële technieken voor diepduiken, waaronder gasmanagement, bewustzijn van narcose en efficiënt drijfvermogen op diepte.
          </p>
          <p className="text-gray-700">
            Deze cursus is perfect voor duikers die diepere duiklocaties en onderwaterstructuren zoals wrakken, diepe riffen en uitgestrekte onderwaterlandschappen willen verkennen.
          </p>
        </Card>

        {/* Wat je leert */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Gevaren van diepduiken en stikstofnarcose</li>
            <li>Correct plannen en uitvoeren van diepduiken</li>
            <li>Efficiënt luchtgebruik op grotere diepte</li>
            <li>Geavanceerde drijfvermogen-technieken</li>
            <li>Tijdsbeheer en duikprocedures</li>
            <li>Introductie tot decompressieduiken</li>
            <li>Navigatie en communicatie op diepte</li>
          </ul>
        </Card>

        {/* Vereisten */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Minimaal 10 gelogde duiken (aanbevolen)</li>
            <li>Goede fysieke conditie</li>
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
              <p className="text-gray-700">4 duiken (2-4 meter dieper dan eerdere duiken)</p>
            </div>
          </div>
        </Card>

        {/* Prijs */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief alle training, lesmateriaal en 4 trainingsduiken</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Klaar om dieper te gaan?</h2>
          <p className="text-gray-700 mb-4">Ga met ons mee voor een onvergetelijke diepduikervaring. Onze ervaren instructeurs begeleiden je veilig naar grotere dieptes.</p>
          <Button size="lg" onClick={() => setShowBookNow(true)}>Boek nu</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
      {BookNowModalComponent}
    </main>
  );
}
