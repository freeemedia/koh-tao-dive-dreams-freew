import React from 'react';

const HowToGetHere = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/sailrock.webp')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">How To Get to Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Multiple routes to reach this island paradise.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Getting There</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>By Ferry:</strong> The only way to reach Koh Tao is by boat. Ferries depart from Chumphon, Surat Thani, Koh Samui, and Koh Phangan. Lomprayah, Songserm, and Seatran are the main operators.</li>
        <li><strong>By Train:</strong> Take a train from Bangkok to Chumphon, then transfer to the ferry.</li>
        <li><strong>By Bus:</strong> Buses from Bangkok and other cities connect to ferry piers in Chumphon and Surat Thani.</li>
        <li><strong>By Plane:</strong> Fly to Koh Samui, Chumphon, or Surat Thani airports, then take a ferry to Koh Tao.</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Book Lodging</a>
        <a href="/VisasKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Visa Info</a>
      </div>
      <p className="text-sm text-gray-500">Tip: Book ferry tickets in advance during high season. Most ferries arrive at Mae Haad Pier on Koh Tao.</p>
    </section>

    {/* Ferry Options Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Ferry Options</h3>
      <ul className="list-disc pl-6 mb-2">
        <li><strong>Speedboat:</strong> 1-1.5 hours, more expensive but faster</li>
        <li><strong>Night ferry:</strong> Cheaper option, arrive refreshed in the morning</li>
        <li><strong>Day ferry:</strong> Standard option with scenic views</li>
        <li>Check operator websites for schedules and discounts</li>
      </ul>
    </section>
  </main>
);

export default HowToGetHere;
