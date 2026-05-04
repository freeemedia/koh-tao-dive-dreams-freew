import React from 'react';

const BanksKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1647825194145-2d94e259c745.avif')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Banks & ATMs on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Easy access to banking services and currency exchange.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Banking Services</h2>
      <p className="mb-4">You'll find ATMs and currency exchange booths in all main villages. Major Thai banks have branches in Mae Haad, and most international cards are accepted. Note that withdrawal fees may apply.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Bangkok Bank and Krungthai Bank branches in Mae Haad</li>
        <li>ATMs in Sairee, Chalok, and Mae Haad</li>
        <li>Currency exchange at banks and kiosks</li>
        <li>Bring some cash for small shops and taxis</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/FoodDrink" className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">Dining Guide</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Book Lodging</a>
      </div>
      <p className="text-sm text-gray-500">Tip: ATMs can run out of cash on busy weekends, so plan ahead.</p>
    </section>

    {/* Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Money-Saving Tips</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Withdraw larger amounts when possible to avoid repeated ATM fees</li>
        <li>Thai Baht (THB) is the local currency</li>
        <li>Notify your bank before traveling to avoid card blocks</li>
        <li>Credit cards may incur foreign transaction fees</li>
      </ul>
    </section>
  </main>
);

export default BanksKohTao;
