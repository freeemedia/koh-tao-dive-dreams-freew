import React from 'react';

export default function Wreck() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Wreck Diving Koh Tao</h1>
      <p className="mb-8 text-lg text-gray-700">
        Discover the thrill of wreck diving around Koh Tao! Explore famous wrecks, marine life, and underwater history.
      </p>
      <div className="flex justify-center mt-8">
        <img src="https://www.divinginasia.com/images/wreck.jpeg" alt="Wreck Dive Koh Tao" className="rounded shadow max-w-full h-auto" />
      </div>
    </div>
  );
}
