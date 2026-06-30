import React from "react";

const accommodations = [
  {
    name: "Koh Tao Resort",
    location: "Koh Tao",
    image: "/images/sample-hotel.jpg", // Replace with your image path or Contentful asset URL
    link: "https://www.agoda.com/",
  },
  {
    name: "Coral View Hotel",
    location: "Koh Tao",
    image: "/images/sample-hotel.jpg",
    link: "https://www.agoda.com/",
  },
  // Add more accommodation objects here
];

export default function AgodaHotelsPage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Recommended Accommodation</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {accommodations.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
            <div className="text-gray-600 mb-4">{hotel.location}</div>
            <a
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
