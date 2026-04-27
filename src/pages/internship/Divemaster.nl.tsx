import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';
import { CurrencySelector, useCurrency } from '@/hooks/useCurrency';

const PACKAGE_PRICES = [
  { label: 'Niet-duiker (alle cursussen)', amount: 89500 },
  { label: 'Al Open Water Diver', amount: 81500 },
  { label: 'Al Advanced Open Water', amount: 73500 },
  { label: 'Al Rescue Diver', amount: 59500 },
];

export default function DivemasterInternship() {
  const navigate = useNavigate();
  const { currency, convertCurrency, exchangeRates } = useCurrency();

  const formatThb = (amount: number) => `฿${amount.toLocaleString('nl-NL')}`;
  const ratePerThb = currency !== 'THB' && exchangeRates.THB && exchangeRates[currency]
    ? (exchangeRates[currency] / exchangeRates.THB).toFixed(3)
    : null;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <CurrencySelector />

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Divemaster Internship</h1>
          <p className="text-xl text-gray-600">
            All-inclusive programma voor professionele ontwikkeling • Koh Tao, Thailand
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">All-inclusive Koh Tao PADI Divemaster Internship</h2>
          <p className="text-gray-700 mb-4">
            Ons Divemaster Internship-programma geeft je de kans om je eerste professionele duikcertificering te behalen, terwijl je samenwerkt met een van de meest ervaren teams voor professionele ontwikkeling in de duikwereld.
          </p>
          <p className="text-gray-700 mb-4">
            Ons professionele team heeft dit Divemaster Internship in de afgelopen 20 jaar verfijnd en heeft duizenden PADI Divemaster-kandidaten en PADI-instructeurs opgeleid.
          </p>
          <p className="text-gray-700">
            Veel van onze kandidaten zijn succesvol doorgegroeid naar senior functies binnen de duikindustrie.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Leer PADI Divemaster te worden</h2>
          <p className="text-gray-700 mb-4">
            Ons Divemaster Internship is een all-inclusive en persoonlijk afgestemd programma dat gericht is op het opleiden van hoogwaardige PADI Divemasters.
          </p>
          <p className="text-gray-700 mb-4">
            Je leert wat nodig is om een succesvolle Divemaster te worden in de moderne en competitieve duikindustrie.
          </p>
          <p className="text-gray-700">
            Je scherpt je professionele voorbeeldvaardigheden aan, leert hoe je onderwatervaardigheden demonstreert aan cursisten en verbetert je rescue- en organisatievaardigheden.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat nodig is om PADI Divemaster te worden</h2>
          <p className="text-gray-700 mb-4">
            Als voorbeeldige duikleider wordt van een PADI Divemaster verwacht dat je vooropgaat in houding, professionaliteit en duikvaardigheden.
          </p>
          <p className="text-gray-700 font-semibold mb-4">Belangrijke karaktereigenschappen:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Een positieve instelling</li>
            <li>Sterke communicatieve vaardigheden</li>
            <li>Uitstekende klantgerichte vaardigheden</li>
            <li>Goed kunnen samenwerken in teamverband</li>
            <li>Voorbeeldgedrag en sterke duikvaardigheden (in en uit het water)</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Courses Included</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PADI Open Water Diver-cursus</li>
            <li>PADI Advanced Open Water Diver-cursus</li>
            <li>EFR-cursus (Primary & Secondary Care)</li>
            <li>PADI Rescue Diver-cursus</li>
            <li>PADI Divemaster-cursus</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Inbegrepen PADI-materialen en uitrusting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-3">Digitale materialen</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>PADI e-learning voor alle cursussen</li>
                <li>Divemaster Digital Crewpak</li>
                <li>Encyclopedia of Recreational Diving</li>
                <li>Digital Divemaster Slates</li>
                <li>Digital e-RDPml (Dive Planner)</li>
                <li>ReActivate e-Learning</li>
                <li>PADI Log Book</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Fysieke uitrusting</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Blank slate & pencil</li>
                <li>Compass</li>
                <li>Delayed Surface Marker Buoy (DSMB)</li>
                <li>Finger spool with stainless steel</li>
                <li>Whistle</li>
                <li>Dive Professionals T-shirt</li>
                <li>Cutting Tool</li>
                <li>Rescue breathing mask</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            All scuba equipment rental included. PADI Membership, diving medical, and insurance covered.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Divemaster Internship Extras</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Buoyancy Lab Fluid Mechanics-workshop</h3>
              <p className="text-gray-700 text-sm">
                Niveau 1-3 inbegrepen om je drijfvermogen uitzonderlijk te maken. Leer geavanceerde voortbeweging, perfecte trim, back finning en technieken voor duikleiderschap.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reef Ecology & Conservation Training (REACT)</h3>
              <p className="text-gray-700 text-sm">
                Leer hoe mariene ecosystemen werken en neem deel aan natuurbeschermingsactiviteiten, zoals presentaties over rifecologie, koraalmonitoring, strandopruimingen en Dive Against Debris-duiken.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">CV-workshop</h3>
              <p className="text-gray-700 text-sm">
                Krijg begeleiding bij het presenteren van je duik-cv aan potentiële werkgevers in de duikindustrie.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Internship Package Prijs</h2>
          <div className="space-y-3">
            {PACKAGE_PRICES.map((pkg, index) => (
              <div
                key={pkg.label}
                className={`flex justify-between items-start ${index < PACKAGE_PRICES.length - 1 ? 'pb-3 border-b' : ''}`}
              >
                <span className="text-gray-700">{pkg.label}</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{formatThb(pkg.amount)}</div>
                  {currency !== 'THB' ? (
                    <div className="text-sm text-gray-600">{convertCurrency(pkg.amount, 'THB')}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {currency !== 'THB' ? (
            <p className="mt-4 text-sm text-gray-600">
              Geschatte koers: 1 THB = {ratePerThb} {currency}. De uiteindelijke koers van je bank of kaart kan afwijken.
            </p>
          ) : null}
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Programmadetails</h2>
          <p className="text-gray-700 mb-4">
            Wij vinden dat alle duikprofessionals vaardigheden op een realistische manier moeten demonstreren. Daarom begeleiden we je in elke fase van het internship om het Divemaster skill circuit in neutraal drijfvermogen af te ronden.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Duur</h3>
              <p className="text-gray-700">4-8 weken afhankelijk van startniveau en tempo</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Minimumvereiste</h3>
              <p className="text-gray-700">60+ gelogde duiken (alle training inbegrepen)</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Leefkosten op Koh Tao</h2>
          <p className="text-gray-700 mb-4">
            Het internship-pakket dekt alle training, PADI-materialen, certificeringskosten en uitrusting. Extra kosten zijn onder andere accommodatie, eten, telefoon, activiteiten en algemene leefkosten.
          </p>
          <div className="bg-muted p-4 rounded">
            <p className="text-gray-700 font-semibold">Geschat maandbudget:</p>
            <p className="text-gray-700 text-lg">
              {formatThb(25000)} per maand (comfortabel leven)
              {currency !== 'THB' ? ` · ${convertCurrency(25000, 'THB')}` : ''}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Dit dekt eten, accommodatie, scooterhuur en sociale activiteiten.
            </p>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Waarom kiezen voor ons Divemaster Internship?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>20+ jaar ervaring in professionele duikopleidingen</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Hoge opleidingsstandaarden en bewezen succes op de arbeidsmarkt</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Flexibele planning om het mooie Koh Tao te verkennen</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Uitgebreid curriculum inclusief natuurbeschermingstraining</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Alle materialen, uitrusting en certificeringskosten inbegrepen</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Internationale community en netwerkmogelijkheden</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Klaar om PADI Divemaster te worden?</h2>
          <p className="text-gray-700 mb-4">Start je professionele duikcarrière met ons uitgebreide divemaster internship-programma.</p>
          <Button size="lg" onClick={() => window.open('https://booking.divinginasia.com/booking?course=divemaster-internship&type=course', '_blank', 'noopener')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
