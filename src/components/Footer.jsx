import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Happenings</h3>
          <p className="text-sm text-gray-300">
            Happenings is your ultimate platform to explore and attend events worldwide. Stay updated and never miss out!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-orange-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-500 transition">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <p className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="w-4 h-4 text-orange-500" /> 123 Event Street, City, Country
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <Phone className="w-4 h-4 text-orange-500" /> +1 234 567 890
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-orange-500" /> contact@happenings.com
          </p>
        </div>

        {/* Newsletter + Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 text-gray-300">
            Subscribe to get the latest event updates and news.
          </p>
          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-1 py-2 rounded-l-lg bg-white/90 text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-2  bg-orange-500 text-white rounded-r-lg font-medium hover:shadow-lg transition"
            >
              Subscribe
            </motion.button>
          </form>

          <div className="flex space-x-4 mt-2">
            {[ 
              { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
              { icon: <FaTwitter />, color: "hover:bg-sky-400" },
              { icon: <FaInstagram />, color: "hover:bg-pink-500" },
              { icon: <FaLinkedinIn />, color: "hover:bg-blue-700" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-gray-200 ${item.color} hover:text-white transition`}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Strip */}
      <div className="border-t border-white/20 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Happenings</span>. All rights reserved.
      </div>
    </footer>
  );
}
