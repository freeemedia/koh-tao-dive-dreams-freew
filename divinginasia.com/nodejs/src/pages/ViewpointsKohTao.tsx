import React from 'react';

const ViewpointsKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/viewpoints-hero.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Viewpoints on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Stunning panoramic vistas and unforgettable photo opportunities.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Island Viewpoints</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>John-Suwan Viewpoint:</strong> Panoramic views of Chalok Baan Kao and Shark Bay.</li>
        <li><strong>Fraggle Rock:</strong> Overlooks Sairee Beach and the west coast.</li>
        <li><strong>Love Koh Tao Viewpoint:</strong> Great for sunrise and photos.</li>
        <li><strong>Mango Viewpoint:</strong> Sweeping views of the island's north.</li>
      </ul>
      <p className="mb-4">Most viewpoints require a short hike. Bring water, sun protection, and a camera for magical moments!</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Hiking & Activities</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Explore Beaches</a>
      </div>
    </section>

    {/* Hiking Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Hiking Tips</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Start early for sunrise viewings and cooler temperatures</li>
        <li>Wear sturdy shoes and bring plenty of water</li>
        <li>Trails can be steep and slippery after rain</li>
        <li>Best light for photography: early morning and sunset</li>
      </ul>
    </section>
  </main>
);

export default ViewpointsKohTao;
