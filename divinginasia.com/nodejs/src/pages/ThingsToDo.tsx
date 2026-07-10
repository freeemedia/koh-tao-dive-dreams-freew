import React from 'react';

const ThingsToDo = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/things-to-do.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Things To Do on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Explore adventure, relaxation, and island culture—there’s more to Koh Tao than just diving!</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Top Activities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Take a snorkeling tour to hidden bays</li>
        <li>Try a Thai cooking class</li>
        <li>Rent a kayak or paddleboard</li>
        <li>Explore the island’s hiking trails</li>
        <li>Relax with a beachside massage</li>
        <li>Join a yoga or fitness class</li>
        <li>Enjoy sunset at a rooftop bar</li>
        <li>Visit local art galleries and markets</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Go Fun Diving</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Explore Beaches</a>
        <a href="/ViewpointsKohTao" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Island Viewpoints</a>
      </div>
      <p className="text-sm text-gray-500">Koh Tao is more than just diving—there’s plenty to discover on land and sea!</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Need More Ideas?</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Take a day trip to Koh Nang Yuan for snorkeling and iconic views</li>
        <li>Try rock climbing or bouldering for a land-based adventure</li>
        <li>Sample street food at the night market in Sairee</li>
      </ul>
      <p className="mt-2">For more inspiration, check out <a href="#contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> Things To Do guide</a>.</p>
    </section>
  </main>
);

export default ThingsToDo;
