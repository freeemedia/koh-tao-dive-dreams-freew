import React from 'react';


const Accommodation = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/acc-head.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Accommodation on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Find your perfect stay, from luxury resorts to budget hostels and everything in between.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Where to Stay</h2>
      <p className="mb-4">Koh Tao offers a diverse range of accommodation options to suit every style and budget. Whether you’re looking for a beachfront villa, a cozy bungalow, or a social hostel, you’ll find plenty of choices across the island’s main areas.</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Luxury Resorts:</strong> Enjoy ocean views, infinity pools, and spa treatments at top-end properties.</li>
        <li><strong>Beach Bungalows:</strong> Step straight onto the sand from your room—perfect for a tropical vibe.</li>
        <li><strong>Hostels & Guesthouses:</strong> Great for backpackers and solo travelers, with social spaces and affordable rates.</li>
        <li><strong>Family-Run Hotels:</strong> Experience local hospitality and comfort in the heart of the island’s villages.</li>
        <li><strong>Eco-Friendly Lodges:</strong> Stay green with sustainable options nestled in nature.</li>
      </ul>
      <p className="mb-4">Popular areas to stay include <strong>Sairee Beach</strong> (lively, lots of restaurants and nightlife), <strong>Mae Haad</strong> (convenient for ferries), and <strong>Chalok Baan Kao</strong> (quiet, relaxed atmosphere).</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/accommodation-booking" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Booking.com</a>
        <a href="/trip-booking" className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Trip.com</a>
        <a href="/#contact" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Book Diving + Stay</a>
      </div>
      <p className="text-sm text-gray-500">Tip: Book early for the best selection, especially during December–April and July–August.</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Need Inspiration?</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Traveling with friends? Try a beachfront bungalow for a social vibe.</li>
        <li>On a budget? Hostels and guesthouses in Mae Haad and Sairee offer great value.</li>
        <li>Looking for romance? Book a hillside villa with sunset views.</li>
      </ul>
      <p className="mt-2">For more tips, contact our team at <a href="mailto:contact@divinginasia.com" className="text-blue-600 underline hover:text-blue-800">contact@divinginasia.com</a>.</p>
    </section>
  </main>
);

export default Accommodation;
