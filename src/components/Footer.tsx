import { Link } from 'react-router-dom'

export default function Footer() {
  const contactEmail = import.meta.env.VITE_ADMIN_EMAILS || 'admin@lembonganwatersports.com'

  return (
    <footer className="bg-[#023e8a] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-extrabold mb-2">🤿 Lembongan Watersports</h3>
          <p className="text-sm text-blue-200">Nusa Lembongan, Bali, Indonesia</p>
          <p className="text-sm text-blue-200 mt-1">lembonganwatersports.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-[#00b4d8]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/fun-diving" className="hover:text-white">Fun Diving</Link></li>
            <li><Link to="/packages" className="hover:text-white">Packages</Link></li>
            <li><Link to="/book" className="hover:text-white">Book Now</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-[#00b4d8]">Contact</h4>
          <p className="text-sm text-blue-200">📧 {contactEmail}</p>
          <p className="text-sm text-blue-200 mt-1">📱 WhatsApp us to book</p>
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 pt-4 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Lembongan Watersports. All rights reserved.
      </div>
    </footer>
  )
}
