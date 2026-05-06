import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EmergencyO2Provider() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Emergency Oxygen Provider Specialty</h1>
          <p className="text-xl text-gray-600">
            Leer noodzuurstof toe te dienen bij duikverwondingen en medische noodgevallen.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/o2-cylinder.png"
            alt="Noodzuurstofuitrusting"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            De PADI Emergency Oxygen Provider Specialty-cursus leert je hoe je veilig en effectief noodzuurstof toedient aan gewonde duikers en anderen. Je leert over zuurstoftoedieningssystemen, indicaties voor zuurstofgebruik en correcte toedieningstechnieken voor verschillende duikgerelateerde en medische noodgevallen.
          </p>
          <p className="text-gray-700">
            Deze cursus is waardevol voor duikprofessionals en iedereen die voorbereid wil zijn om noodzuurstof toe te dienen in duiksituaties.
          </p>
        </Card>

        {/* Wat je leert */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Zuurstof begrijpen en de medische toepassingen</li>
            <li>Soorten zuurstoftoedieningssystemen</li>
            <li>Indicaties en contra-indicaties voor zuurstoftoediening</li>
            <li>Correcte toedieningstechnieken</li>
            <li>Onderhoud van uitrusting en veiligheid</li>
            <li>Integratie met CPR en eerste hulp</li>
            <li>Documentatie en juridische aandachtspunten</li>
          </ul>
        </Card>

        {/* Vereisten */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimale brevettering: PADI Open Water Diver</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Actuele CPR-certificering aanbevolen</li>
            <li>Basiskennis van eerste hulp</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duur & training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cursusduur</h3>
              <p className="text-gray-700">1 dag</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-gray-700">Klassikale en praktische sessies</p>
            </div>
          </div>
        </Card>

        {/* Prijs */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm">Inclusief training en lesmateriaal</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Wees voorbereid op noodgevallen</h2>
          <p className="text-gray-700 mb-4">Leer levensreddende vaardigheden voor zuurstoftoediening. Schrijf je in voor onze Emergency Oxygen Provider-cursus.</p>
          <Button size="lg" onClick={() => window.open('/bookingform.html', '_blank')}>Boek nu</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}