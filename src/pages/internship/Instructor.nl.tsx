import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function InstructorInternship() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Instructor Internship</h1>
          <p className="text-xl text-gray-600">
            Geavanceerd programma voor professionele ontwikkeling • Koh Tao, Thailand
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">All-inclusive PADI Dive Instructor Internship</h2>
          <p className="text-gray-700 mb-4">
            Zet de stap naar een carrière als PADI-duikinstructeur met ons uitgebreide internship-programma. Ontworpen voor ervaren duikers die klaar zijn om anderen les te geven en duikoperaties professioneel te leiden.
          </p>
          <p className="text-gray-700 mb-4">
            Ons Instructor Internship bouwt voort op je Divemaster-basis met geavanceerde didactiek, cursistbegeleiding en zakelijke vaardigheden.
          </p>
          <p className="text-gray-700">
            Afgestudeerden zijn klaar om wereldwijd te werken en zijn zeer gewild bij duikcentra, resorts en liveaboards.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Word een PADI-duikinstructeur</h2>
          <p className="text-gray-700 mb-4">
            Ons Instructor Internship is een uitgebreid en gepersonaliseerd programma, ontworpen om hooggekwalificeerde en zelfverzekerde PADI-duikinstructeurs op te leiden.
          </p>
          <p className="text-gray-700 mb-4">
            Je beheerst lesmethodes, ontwikkelt effectieve communicatie met cursisten, verfijnt demonstratievaardigheden en krijgt inzicht in bedrijfsvoering binnen de duikindustrie.
          </p>
          <p className="text-gray-700">
            Als instructeur inspireer je duikers, bouw je vertrouwen op in onderwatervaardigheden en word je ambassadeur voor oceaanbescherming.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">De vorming van een professionele duikinstructeur</h2>
          <p className="text-gray-700 mb-4">
            Een PADI-duikinstructeur moet uitzonderlijke vaardigheden hebben, in en uit het water. Je ontwikkelt:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Expertvaardigheden in onderwaterdemonstraties</li>
            <li>Uitstekende onderwijs- en communicatievaardigheden</li>
            <li>Sterk leiderschap en zakelijk inzicht</li>
            <li>Diepgaande kennis van duikfysica en -fysiologie</li>
            <li>Onwrikbare focus op veiligheid en professionaliteit</li>
            <li>Passie voor mariene educatie en natuurbescherming</li>
            <li>Sterke probleemoplossende en besluitvormende vaardigheden</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Courses Included</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PADI Divemaster-cursus (indien nog niet gecertificeerd)</li>
            <li>PADI Assistant Instructor-cursus</li>
            <li>PADI Open Water Instructor-cursus</li>
            <li>PADI Specialty Instructor-cursussen (geselecteerde specialties)</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Inbegrepen PADI-materialen en uitrusting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-3">Instructeursmaterialen</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>PADI Instructor Manual</li>
                <li>Instructor Digital KIT</li>
                <li>Lesplandocumenten</li>
                <li>Cursistenontwikkelingsdossiers</li>
                <li>Presentatieslides voor lessen</li>
                <li>Digitale referentiebibliotheek</li>
                <li>Instructeurspublicaties</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Professionele uitrusting</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Kompas van instructeurskwaliteit</li>
                <li>Professionele DSMB & spoel</li>
                <li>Onderwaterlei & potloden</li>
                <li>Fluitje & signaalmiddelen</li>
                <li>Instructeur T-shirt & uitrusting</li>
                <li>Set snijgereedschap</li>
                <li>Rescue-beademingsmasker (gevorderd)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Huur van alle scuba-uitrusting inbegrepen. PADI-lidmaatschap, instructeurscertificering, duikkeuring en verzekering zijn gedekt.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Specialisaties binnen het Instructor Internship</h2>
          <p className="text-gray-700 mb-4">
            Kies een specialisatie in sterke vakgebieden:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-3 bg-blue-50">
              <h3 className="font-semibold mb-2">Specialisatie technisch duiken</h3>
              <p className="text-sm text-gray-700">Instructie in deep, wreck, sidemount en solo diving</p>
            </div>
            <div className="border rounded p-3 bg-green-50">
              <h3 className="font-semibold mb-2">Specialisatie natuurbescherming</h3>
              <p className="text-sm text-gray-700">Focus op milieueducatie en bescherming van de zee</p>
            </div>
            <div className="border rounded p-3 bg-blue-50">
              <h3 className="font-semibold mb-2">Specialisatie jeugd</h3>
              <p className="text-sm text-gray-700">Lesgeven aan junioren en toekomstige duikers opleiden</p>
            </div>
            <div className="border rounded p-3 bg-green-50">
              <h3 className="font-semibold mb-2">Specialisatie business</h3>
              <p className="text-sm text-gray-700">Management van duikoperaties en ondernemerschap</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Instructor Internship Extras</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Geavanceerde drijfvermogen-workshop</h3>
              <p className="text-gray-700 text-sm">
                Niveau 1-4 inbegrepen om je demonstratie van alle drijfvermogentechnieken voor lesdoeleinden te perfectioneren.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">REACT Conservation Program</h3>
              <p className="text-gray-700 text-sm">
                Geavanceerde training in rifecologie met certificering om conservation specialty-cursussen te geven.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Workshop didactiek</h3>
              <p className="text-gray-700 text-sm">
                Ontwikkel effectieve communicatie, betrokkenheid van cursisten en sterke presentatievaardigheden in de klas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Beheer van duikoperaties</h3>
              <p className="text-gray-700 text-sm">
                Leer de zakelijke kant: onderhoud van uitrusting, personeelsbeheer, veiligheidsprotocollen en naleving van regelgeving.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Professionele ontwikkeling</h3>
              <p className="text-gray-700 text-sm">
                CV-opbouw, sollicitatievoorbereiding en wereldwijd professioneel netwerken.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Internship Package Prijs</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Geen divemaster (alle cursussen)</span>
              <span className="text-2xl font-bold text-blue-600">฿129,500</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Al PADI Divemaster</span>
              <span className="text-2xl font-bold text-blue-600">฿79,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Al Assistant Instructor</span>
              <span className="text-2xl font-bold text-blue-600">฿59,500</span>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Programmadetails</h2>
          <p className="text-gray-700 mb-4">
            We hanteren de hoogste instructeursstandaarden, zodat je klaar bent om wereldwijd bij elke duikoperatie les te geven.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Duur</h3>
              <p className="text-gray-700">6-12 weken afhankelijk van startniveau en specialisatie</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Minimumvereiste</h3>
              <p className="text-gray-700">100+ gelogde duiken (training inbegrepen)</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Carrièremogelijkheden</h2>
          <p className="text-gray-700 mb-4">
            PADI-duikinstructeurs zijn wereldwijd erg gewild:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">• Duikcentra & resorts:</span> Cursussen en recreatieve duiken leiden</li>
            <li><span className="font-semibold">• Liveaboards:</span> Technische en specialty-training geven</li>
            <li><span className="font-semibold">• Toerismesector:</span> Internationale gasten begeleiden en onderwijzen</li>
            <li><span className="font-semibold">• Onderzoeksinstellingen:</span> Mariene wetenschappelijke expedities ondersteunen</li>
            <li><span className="font-semibold">• Natuurbeschermingsorganisaties:</span> Educatieve initiatieven leiden</li>
            <li><span className="font-semibold">• Zelfstandig ondernemerschap:</span> Je eigen duikoperatie starten</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Waarom kiezen voor ons Instructor Internship?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Bewezen staat van dienst in het opleiden van instructeurs van wereldklasse</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Expertbegeleiding door Master Instructors en Course Directors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Gespecialiseerde begeleiding met focus op persoonlijke ontwikkeling</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Flexibele programma's met specialisatieopties</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Wereldwijde ondersteuning bij werk en netwerken</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Prachtige eilandlocatie met duiklocaties van wereldklasse</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Klaar om PADI-duikinstructeur te worden?</h2>
          <p className="text-gray-700 mb-4">Verander je passie voor duiken in een wereldwijde carrière als gecertificeerd PADI-duikinstructeur.</p>
          <Button size="lg" onClick={() => window.open('https://booking.divinginasia.com/booking?course=instructor-internship&type=course', '_blank', 'noopener')}>Boek nu</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
