import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/1.jpg";
import recommendationSVG from "../assets/recommendation.svg";
import EventCard from './cards/eventcard';
import Navbar from './Navbar';

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);

  const recentRef = useRef(null);
  const recommendedRef = useRef(null);
  const navigate = useNavigate();

  // Mock User (for demo - you can change this)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleScroll = () => {
    const section = document.getElementById("recent-events");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  // ==================== MOCK DATA ====================
  const mockRecentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2026",
      description: "Join industry leaders for the biggest tech conference in Pakistan.",
      start_datetime: "2026-05-15T10:00:00",
      venue: "Karachi Expo Center",
      location: "Karachi Expo Center",
      banner: "https://picsum.photos/id/1015/600/400",
      image: "https://picsum.photos/id/1015/600/400",
      type: "paid",
      views: 12400,
    },
    {
      id: 2,
      title: "Music Fest - Karachi Nights",
      description: "Live performances by top Pakistani artists under the stars.",
      start_datetime: "2026-04-28T18:00:00",
      venue: "Bagh Ibn-e-Qasim",
      location: "Bagh Ibn-e-Qasim",
      banner: "https://picsum.photos/id/870/600/400",
      type: "free",
      views: 8900,
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Showcase your startup idea and win exciting prizes.",
      start_datetime: "2026-06-10T14:00:00",
      venue: "IBA Karachi",
      location: "IBA Karachi",
      banner: "https://picsum.photos/id/106/600/400",
      type: "free",
      views: 5600,
    },
    {
      id: 4,
      title: "Food & Culture Festival",
      description: "Experience the best street food and cultural performances.",
      start_datetime: "2026-05-01T16:00:00",
      venue: "Port Grand Karachi",
      location: "Port Grand Karachi",
      banner: "https://picsum.photos/id/1080/600/400",
      type: "free",
      views: 15200,
    },
    {
      id: 5,
      title: "E-Sports Championship 2026",
      description: "Biggest gaming tournament of the year with huge prizes.",
      start_datetime: "2026-05-30T09:00:00",
      venue: "NED University",
      location: "NED University",
      banner: "https://picsum.photos/id/180/600/400",
      type: "paid",
      views: 18700,
    },
  ];

  const mockRecommendedEvents = [
    {
      id: 6,
      title: "Photography Masterclass",
      description: "Learn professional photography techniques from experts.",
      start_datetime: "2026-04-25T11:00:00",
      venue: "Karachi Arts Council",
      location: "Karachi Arts Council",
      banner: "https://picsum.photos/id/201/600/400",
      type: "paid",
      views: 3200,
    },
    {
      id: 7,
      title: "Fitness Bootcamp Challenge",
      description: "Transform your body with 30 days of intense training.",
      start_datetime: "2026-05-20T06:30:00",
      venue: "Sea View Park",
      location: "Sea View Park",
      banner: "https://picsum.photos/id/133/600/400",
      type: "paid",
      views: 4100,
    },
    {
      id: 8,
      title: "Literature & Book Fair",
      description: "A paradise for book lovers with author meet & greets.",
      start_datetime: "2026-06-05T10:00:00",
      venue: "Frere Hall",
      location: "Frere Hall",
      banner: "https://picsum.photos/id/367/600/400",
      type: "free",
      views: 2800,
    },
    {
      id: 9,
      title: "Fashion Week Karachi 2026",
      description: "Showcasing the latest trends in Pakistani fashion.",
      start_datetime: "2026-07-12T17:00:00",
      venue: "Pearl Continental Hotel",
      location: "Pearl Continental Hotel",
      banner: "https://picsum.photos/id/1027/600/400",
      type: "paid",
      views: 9500,
    },
  ];
  // ===================================================

  // Load mock data on component mount
  useEffect(() => {
    setRecentEvents(mockRecentEvents);
    
    // Show recommended events only if user is logged in (simulated)
    if (user?.id) {
      setRecommendedEvents(mockRecommendedEvents);
    } else {
      setRecommendedEvents([]);
    }
  }, [user?.id]);

  return (
    <>
      {/* Hero Section */}
      <Navbar/>
      <section
        className="relative w-full h-[105vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-24 ">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg text-white tracking-widest uppercase mb-2 mt-20"
          >
            ICCD  
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-3xl"
          >
            Find Latest Events & Meetups Hosted By ICCD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl"
          >
            Join the biggest event of the year to explore design, innovation & future trends.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <button
              className="bg-gradient-to-r from-rose-500 to-orange-500 px-10 py-3 rounded-full text-white text-lg font-semibold shadow-lg hover:opacity-90 duration-200"
              onClick={handleScroll}
            >
              Get Ticket
            </button>
          </motion.div>
        </div>
      </section>

      {/* Recent Events */}
      <section id="recent-events" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-10">
          <h2 className="text-4xl font-bold">
            Upcoming <span className="text-rose-500">Events</span>
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          {/* <button
            onClick={() => scrollContainer(recentRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow z-10"
          >
            <ArrowLeft size={20} />
          </button> */}
          <div ref={recentRef} className="flex overflow-x-auto gap-6 scrollbar-hide px-10">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div key={event.id} className="flex-shrink-0 w-72">
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">No events found.</p>
            )}
          </div>
          {/* <button
            onClick={() => scrollContainer(recentRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow z-10"
          >
            <ArrowRight size={20} />
          </button> */}
        </div>
      </section>

      {/* Recommended Events */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `url(${recommendationSVG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center mb-10 relative z-10">
          <h2 className="text-4xl font-bold text-black">
            Recommended <span className="text-orange-500">For You</span>
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          {/* <button
            onClick={() => scrollContainer(recommendedRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow z-10"
          >
            <ArrowLeft size={20} />
          </button> */}
          <div ref={recommendedRef} className="flex overflow-x-auto gap-6 scrollbar-hide px-10">
            {recommendedEvents.length > 0 ? (
              recommendedEvents.map((event) => (
                <div key={event.id} className="flex-shrink-0 w-72">
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                {user ? "No recommendations yet." : "Login to see personalized recommendations"}
              </p>
            )}
          </div>
          {/* <button
            onClick={() => scrollContainer(recommendedRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow z-10"
          >
            <ArrowRight size={20} />
          </button> */}
        </div>
      </section>
    </>
  );
}