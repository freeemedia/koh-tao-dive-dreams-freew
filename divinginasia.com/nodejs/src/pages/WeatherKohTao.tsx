import React from 'react';

const WeatherKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/weather.png')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Weather on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Plan your visit: understand Koh Tao's tropical climate.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Climate & Seasons</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Dry season: February to October, hot and sunny</li>
        <li>Rainy season: November to January, short heavy showers</li>
        <li>Average temperature: 28–32°C (82–90°F)</li>
        <li>Sea temperature: 27–30°C (81–86°F)</li>
      </ul>
      <p className="mb-4">Most activities are available year-round, but check the forecast before planning boat trips. The dry season offers the best diving conditions with calm seas and excellent visibility.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Plan Activities</a>
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Go Diving</a>
      </div>
    </section>

    {/* Packing Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">What to Pack</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>High SPF sunscreen (reef-safe)</li>
        <li>Light, breathable clothing</li>
        <li>Rain jacket or poncho (for rainy season)</li>
        <li>Waterproof bag for electronics</li>
        <li>Hat and sunglasses</li>
        <li>Quick-dry clothing for water activities</li>
      </ul>
    </section>
  </main>
);

export default WeatherKohTao;
