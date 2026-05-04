import React from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-[#0b1e3d] text-white mt-12">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-bold text-cyan-400 mb-3">Diving In Asia</div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Koh Tao's premier dive school. PADI courses, fun diving, and unforgettable underwater adventures.
          </p>
          <a href="/#contact" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
            Book Now
          </a>
        </div>

        {/* Diving */}
        <div>
          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">Diving</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/courses/open-water" className="hover:text-white transition">Open Water</Link></li>
            <li><Link to="/courses/advanced" className="hover:text-white transition">Advanced</Link></li>
            <li><Link to="/courses/rescue" className="hover:text-white transition">Rescue Diver</Link></li>
            <li><Link to="/fun-diving" className="hover:text-white transition">Fun Diving</Link></li>
            <li><Link to="/koh-tao-dive-sites" className="hover:text-white transition">Dive Sites</Link></li>
            <li><Link to="/marine-life" className="hover:text-white transition">Marine Life</Link></li>
          </ul>
        </div>

        {/* Koh Tao */}
        <div>
          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">Koh Tao</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/koh-tao-info" className="hover:text-white transition">About Koh Tao</Link></li>
            <li><Link to="/accommodation" className="hover:text-white transition">Accommodation</Link></li>
            <li><Link to="/beaches-koh-tao" className="hover:text-white transition">Beaches</Link></li>
            <li><Link to="/food-drink" className="hover:text-white transition">Food & Drink</Link></li>
            <li><Link to="/things-to-do" className="hover:text-white transition">Things To Do</Link></li>
            <li><Link to="/how-to-get-here" className="hover:text-white transition">How To Get Here</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">Info</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/weather-koh-tao" className="hover:text-white transition">Weather</Link></li>
            <li><Link to="/visas-koh-tao" className="hover:text-white transition">Visas</Link></li>
            <li><Link to="/medical-services" className="hover:text-white transition">Medical</Link></li>
            <li><Link to="/accommodation-booking" className="hover:text-white transition">Booking.com</Link></li>
            <li><Link to="/trip-booking" className="hover:text-white transition">Trip.com</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a3a5c] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <div>© {new Date().getFullYear()} Diving In Asia — All rights reserved</div>
        <div>
          Powered by{' '}
          <a href="https://www.onemedia.asia" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition font-medium">
            www.onemedia.asia
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
