import { motion } from "framer-motion";
import bannerImage from "../assets/3.jpg";
import { useState } from "react";
import CreateEventForm from './forms/CreateEventForm';

export default function About() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);


  return (
    <div className="w-full bg-gray-50 font-sansation ">

      {/* Hero Section with Image */}
      <section
        className="relative w-full h-70 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 mt-3">
            About Happenings
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Discover our story, vision, and how we connect people through unforgettable events.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
        <p className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Happenings is an innovative platform designed to make event creation and management seamless. 
          Whether it’s a private party, corporate gathering, or a large-scale festival, our tools help you 
          plan, manage, and share your events effortlessly.
        </p>
      </section>

      {/* Our Values / Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-blue-50 shadow-lg rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Simplicity</h3>
              <p className="text-gray-600 text-sm">
                We focus on making event creation intuitive and hassle-free for everyone.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-blue-50 shadow-lg rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Our platform adapts to modern trends to give you the best experience possible.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-blue-50 shadow-lg rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600 text-sm">
                Events are about people — we connect them together seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-4xl font-bold text-orange-500">500+</h3>
              <p className="mt-2 text-sm">Events Hosted</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-4xl font-bold text-orange-500">10k+</h3>
              <p className="mt-2 text-sm">Active Users</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-4xl font-bold text-orange-500">50+</h3>
              <p className="mt-2 text-sm">Cities Covered</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Start Your Event Today</h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Join thousands of users who trust Happenings to manage and discover amazing events.
        </p>
        <button 
        onClick={() => setShowCreateEvent(true)}
        className="mt-8 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition">
          Create an Event
        </button>
      </section>
        <CreateEventForm isOpen={showCreateEvent} onClose={() => setShowCreateEvent(false)} />
    </div>
    
  );
}
