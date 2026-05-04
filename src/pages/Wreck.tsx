import React from 'react';

export default function Wreck() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Wreck Diving near Nusa Lembongan</h1>
      <p className="mb-8 text-lg text-gray-700">
        While Nusa Lembongan is best known for Mola Mola and manta rays, wreck diving enthusiasts will find the famous USAT Liberty Shipwreck just a short day trip away in Tulamben, Bali — one of the most accessible and photographed wrecks in the world.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <strong>USAT Liberty Wreck (Tulamben):</strong> A 120m WWII cargo ship resting at 5–30m depth, covered in coral and teeming with marine life. Just 2 hours from Lembongan by car and ferry.
      </div>
      <div className="flex justify-center mt-8">
        <img src="https://www.divinginasia.com/images/wreck.jpeg" alt="USAT Liberty Wreck Tulamben" className="rounded shadow max-w-full h-auto" />
      </div>
    </div>
  );
}
