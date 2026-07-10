import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function WreckDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Wreck Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Word een echte oceaanverkenner en duik in de geschiedenis door gezonken scheepswrakken te verkennen met gespecialiseerde training en certificering.
          </p>
        </div>

        {/* Hero Background Image */}
        <div className="mb-8 h-80 rounded-lg shadow-lg overflow-hidden bg-[url('/images/htms-sattakut.jpg')] bg-cover bg-center bg-no-repeat">
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
          <p className="text-gray-700 mb-4">
            Leer veilig op een scheepswrak duiken en word gecertificeerd PADI Wreck Diver. Deze cursus leert je hoe je gezonken wrakken verkent met goede planning, organisatie, procedures en technieken voor veilig en spannend wrakduiken.
          </p>
          <p className="text-gray-700 mb-4">
            Je krijgt training op de HTMS Sattakut, een echt wrak bij Koh Tao dat perfect is om wrakduikvaardigheden te leren. Tijdens je training bouw je stap voor stap vertrouwen en bekwaamheid op tot een competente wrakspecialist.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Veelvoorkomende problemen en gevaren bij wrakduiken</li>
            <li>Planning, organisatie, procedures en technieken voor leuk en veilig wrakduiken</li>
            <li>Duikplanning en uitrustingsoverwegingen voor diepere duiken</li>
            <li>Speciale training voor wrakpenetratie en instaprisico's</li>
            <li>Bewegen door een wrak en werken met een penetratielijn</li>
            <li>Noodprocedures bij verlies van zicht, lampstoring of luchtvoorziening</li>
            <li>Nuttige knopen en reel-uitzettechnieken</li>
            <li>Beperkingen bij wrakpenetratie en benodigde gespecialiseerde uitrusting</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Adventure Diver zijn of een gelijkwaardige certificering van een andere organisatie hebben</li>
            <li>Recente duikervaring (we raden een Scuba Review aan als je 12+ maanden niet hebt gedoken)</li>
            <li>Minimumleeftijd: 15 jaar</li>
            <li>Medisch geschikt om te duiken</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Cursusdetails</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-1">Duur</h3>
              <p>1.5 - 2 dagen</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Trainingsduiken</h3>
              <p>4 wrakduiken op de HTMS Sattakut</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Inbegrepen in de cursus</h3>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>PADI Wreck Diver-handleiding</li>
                <li>Alle trainingsduiken</li>
                <li>PADI-certificeringskaart</li>
                <li>Huur van alle scuba-uitrusting</li>
                <li>GRATIS gebruik van duikcomputer</li>
                <li>Logboek</li>
                <li>Maximaal 4 studenten per instructeur</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">De 4 trainingsduiken</h2>
          <div className="space-y-4 text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Duik #1: Wrakverkenning</h3>
              <p>Ervaar de spanning van wrakduiken. Leer een wrakduik dieper dan 18 meter veilig plannen en uitvoeren. Zwem langs de buitenkant terwijl je risico's herkent en vermijdt.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Duik #2: Wrak in kaart brengen</h3>
              <p>Maak een schetskaart van het wrak met kenmerken en details. Bereken de geschatte grootte en verken mogelijke ingangen en uitgangen als voorbereiding op penetratie.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Duik #3: Oefenen met lijn uitzetten</h3>
              <p>Oefen met het uitzetten en terughalen van een penetratielijn. Zwem langs de uitgezette lijn terwijl je contact behoudt, zonder slib op te woelen en met correct gebruik van je duiklamp.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-1">Duik #4: Wrakpenetratie</h3>
              <p>Je laatste duik! Plan en voer een wrakpenetratie uit waarbij je het wrak in- en uitgaat. Focus op bewegen zonder overmatig slib op te woelen terwijl je contact met de lijn houdt.</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Prijs</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿8,000</div>
          <p className="text-gray-600 text-sm mb-4">Inclusief alle training, lesmateriaal, uitrustingshuur en certificering</p>
          <p className="text-sm text-gray-600">*Korting van 1.500 baht als je de Wreck Adventure-duik al hebt afgerond als onderdeel van Advanced Open Water</p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-lg font-bold mb-3">Combineren met andere cursussen</h2>
          <p className="text-gray-700 mb-4">Je kunt de PADI Wreck Diver-cursus combineren met de PADI Enriched Air Nitrox Specialty-cursus om twee certificeringen binnen dezelfde periode te behalen!</p>
          <p className="text-sm text-gray-600">Voeg ฿5,900 toe om te combineren met Enriched Air Nitrox</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Klaar om wrakken te verkennen?</h2>
          <p className="text-gray-700 mb-4">Ontdek de geschiedenis en mysteries van onderwaterwrakken met onze ervaren instructeurs op Koh Tao.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=wreck-diver&item=PADI%20Wreck%20Diver%20Specialty&type=course&price=8000&currency=THB')}>Boek nu je wrakkencursus</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
