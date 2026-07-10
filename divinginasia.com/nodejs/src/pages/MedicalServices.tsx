import React from 'react';

const MedicalServices = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/medical.png')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Medical Services on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Health care and emergency services available 24/7.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Healthcare & Emergency</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Several clinics and pharmacies in Mae Haad and Sairee</li>
        <li>Basic medical care and first aid available</li>
        <li>Emergency services: call <strong>1669</strong></li>
        <li>Nearest hospital is on Koh Samui (boat transfer required for serious cases)</li>
        <li>Recompression chamber for dive emergencies</li>
      </ul>
      <p className="mb-4">Travel insurance is strongly recommended. Bring any prescription medications you need, as availability may be limited.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Travel Info</a>
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Wellness Activities</a>
      </div>
    </section>

    {/* Important Info Section */}
    <section className="bg-red-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-red-600">
      <h3 className="text-xl font-semibold mb-2 text-red-700">Important Information</h3>
      <ul className="list-disc pl-6 mb-2 text-red-900">
        <li>Get travel health insurance before arriving</li>
        <li>Malaria prevention recommended—consult a doctor</li>
        <li>Sun exposure is intense—use high SPF sunscreen</li>
        <li>Dehydration is common—drink plenty of water</li>
      </ul>
    </section>
  </main>
);

export default MedicalServices;
