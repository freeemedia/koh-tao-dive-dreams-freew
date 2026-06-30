import React from 'react';

const VisasKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/visa.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Visa voor Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Alles wat je moet weten over Thaise visumregels.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Visuminformatie</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>De meeste nationaliteiten krijgen bij aankomst een 30-dagen visumvrijstelling</li>
        <li>Visumverlenging is mogelijk bij immigratiekantoor Koh Samui</li>
        <li>Overschrijding van je visum kan boetes opleveren (500 THB per dag)</li>
        <li>Controleer actuele voorwaarden op officiële websites van de Thaise overheid</li>
      </ul>
      <p className="mb-4">Draag tijdens het reizen in Thailand altijd je paspoort en visum bij je. Maak kopieën en bewaar die apart als back-up.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Reisinformatie</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Boek je verblijf</a>
      </div>
    </section>

    {/* Important Notes Section */}
    <section className="bg-yellow-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-yellow-600">
      <h3 className="text-xl font-semibold mb-2 text-yellow-700">Belangrijke punten</h3>
      <ul className="list-disc pl-6 mb-2 text-yellow-900">
        <li>Je paspoort moet nog minimaal 6 maanden geldig zijn</li>
        <li>Bewaar kopieën van je paspoort- en visumpagina’s</li>
        <li>Visumvrije toegang is altijd ter beoordeling van immigratie</li>
        <li>Controleer de specifieke eisen voor jouw nationaliteit</li>
      </ul>
    </section>
  </main>
);

export default VisasKohTao;
