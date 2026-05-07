import React from 'react';
import banksImage from '../../images/banks.jpg';

const BanksKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${banksImage}')` }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Banks & ATMs on Nusa Lembongan</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Cash is king on Lembongan — plan ahead before arriving.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Banking Services</h2>
      <p className="mb-4">Nusa Lembongan has limited ATM options, so we strongly recommend bringing cash from Denpasar, Sanur or Kuta before taking the boat. There are a small number of ATMs near Jungutbatu and Lembongan village, but they can run out quickly during peak season.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>A few ATMs in Jungutbatu and Lembongan Village (BNI, BRI, Mandiri)</li>
        <li>Currency exchange available at some hotels and money changers</li>
        <li>Most restaurants and dive shops accept cash (IDR)</li>
        <li>Some larger hotels accept credit cards with a surcharge</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/FoodDrink" className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">Dining Guide</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Book Lodging</a>
      </div>
      <p className="text-sm text-gray-500">Tip: ATMs can run out of cash on busy weekends, so plan ahead.</p>
    </section>

    {/* Tips Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Money-Saving Tips</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Withdraw enough cash in Denpasar/Sanur before the boat to Lembongan</li>
        <li>Indonesian Rupiah (IDR) is the local currency</li>
        <li>Notify your bank before traveling to avoid card blocks</li>
        <li>Credit cards may incur foreign transaction fees</li>
      </ul>
    </section>
  </main>
);

export default BanksKohTao;
