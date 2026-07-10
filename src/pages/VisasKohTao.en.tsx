import React from 'react';

const VisasKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/visa.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Visa for Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Everything you need to know about Thai visa rules.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Visa Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Most nationalities receive a 30-day visa exemption on arrival</li>
        <li>Visa extensions are possible at the Koh Samui immigration office</li>
        <li>Overstaying your visa may result in fines (500 THB per day)</li>
        <li>Check current requirements on official Thai government websites</li>
      </ul>
      <p className="mb-4">Always carry your passport and visa while traveling in Thailand. Keep copies stored separately as backup.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Travel Information</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Book Your Stay</a>
      </div>
    </section>

    {/* Important Notes Section */}
    <section className="bg-yellow-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-yellow-600">
      <h3 className="text-xl font-semibold mb-2 text-yellow-700">Important Notes</h3>
      <ul className="list-disc pl-6 mb-2 text-yellow-900">
        <li>Your passport must be valid for at least 6 more months</li>
        <li>Keep copies of your passport and visa pages</li>
        <li>Visa-free entry is always subject to immigration approval</li>
        <li>Check specific requirements for your nationality</li>
      </ul>
    </section>
  </main>
);

export default VisasKohTao;
