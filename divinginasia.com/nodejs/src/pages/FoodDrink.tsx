import React from 'react';

const FoodDrink = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/food-drink-hero.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Food & Drink on Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Discover delicious Thai cuisine, fresh seafood, and sunset beach bars.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Culinary Highlights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Wide range of Thai and international restaurants</li>
        <li>Fresh seafood available at many beachside spots</li>
        <li>Street food stalls for quick and affordable meals</li>
        <li>Vegetarian and vegan options widely available</li>
        <li>Beach bars and cafes for sunset drinks</li>
      </ul>
      <p className="mb-4">Try local specialties like Pad Thai, Som Tam, and fresh grilled fish. Koh Tao's dining scene ranges from casual beachside shacks to upscale dining experiences.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">More Activities</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Find Lodging</a>
      </div>
      <p className="text-sm text-gray-500">Tip: Tap water isn't drinkable—buy bottled or refill at water stations.</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Must-Try Foods</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Pad Thai - stir-fried rice noodles with shrimp or chicken</li>
        <li>Som Tam - spicy green papaya salad</li>
        <li>Fresh grilled fish with lime and chili</li>
        <li>Mango sticky rice for dessert</li>
      </ul>
    </section>
  </main>
);

export default FoodDrink;
