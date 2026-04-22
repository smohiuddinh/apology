import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/1.jpg";
import EventCard from "./cards/eventcard";
import Navbar from "./Navbar";
import { ICCD_EVENTS } from "../data/events";

const mockRecommendedEvents = [
  { id: 6, name: "Photography Masterclass", description: "Learn professional photography techniques from experts.", date: "2026-04-25", startTime: "11:00:00", endTime: "14:00:00", location: "Karachi Arts Council", type: "workshop", sector: "Arts", totalSeats: 50, speakers: "Ali Raza" },
  { id: 7, name: "Fitness Bootcamp Challenge", description: "Transform your body with 30 days of intense training.", date: "2026-05-20", startTime: "06:30:00", endTime: "08:00:00", location: "Sea View Park", type: "sports", sector: "Health", totalSeats: 100, speakers: "Coach Hamza" },
  { id: 8, name: "Literature & Book Fair", description: "A paradise for book lovers with author meet & greets.", date: "2026-06-05", startTime: "10:00:00", endTime: "18:00:00", location: "Frere Hall", type: "fair", sector: "Education", totalSeats: 300, speakers: "Various Authors" },
  { id: 9, name: "Fashion Week Karachi 2026", description: "Showcasing the latest trends in Pakistani fashion.", date: "2026-07-12", startTime: "17:00:00", endTime: "21:00:00", location: "Pearl Continental Hotel", type: "show", sector: "Fashion", totalSeats: 400, speakers: "Top Designers" },
];

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleScroll = () =>
    document.getElementById("recent-events")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    setRecentEvents(ICCD_EVENTS);
    setRecommendedEvents(user?.id ? mockRecommendedEvents : []);
  }, [user?.id]);

  return (
    <div className="bg-[#f4f5f7] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.04] hover:scale-100 transition-transform duration-[10000ms] brightness-[0.38] saturate-[1.15]"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(37,99,235,0.22) 0%, transparent 60%), radial-gradient(ellipse at 100% 0%, rgba(239,68,68,0.12) 0%, transparent 55%)" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-32 md:py-40">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-1.5 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/80 mb-6">
              <Sparkles size={11} /> Karachi's #1 Event Platform
            </div>
          </motion.div>

          <motion.h1
            className="text-[clamp(40px,7vw,84px)] font-extrabold text-white leading-[1.06] tracking-tight mb-5 max-w-2xl"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            Find Latest{" "}
            <span className="block bg-gradient-to-r from-blue-300 to-red-300 bg-clip-text text-transparent">
              Events
            </span>
          </motion.h1>

          <motion.p
            className="text-[clamp(14px,1.8vw,17px)] text-white/55 max-w-sm leading-relaxed mb-11"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
          >
            Discover amazing events happening around you.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
          >
            <button
              onClick={handleScroll}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_8px_32px_rgba(244,63,94,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Ticket →
            </button>
            <button className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-white/85 text-sm font-medium px-7 py-3.5 rounded-full hover:bg-white/[0.18] hover:-translate-y-0.5 transition-all duration-200">
              Browse All Events
            </button>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-[clamp(28px,5vw,56px)] mt-16 pt-10 border-t border-white/10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[["500+", "Events"], ["50k+", "Attendees"], ["200+", "Organizers"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-[clamp(26px,3.5vw,36px)] font-extrabold text-white tracking-tight leading-none mb-1">{val}</div>
                <div className="text-[11px] font-semibold tracking-widest uppercase text-white/40">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          onClick={handleScroll}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-45 hover:opacity-80 cursor-pointer animate-bounce"
        >
          <div className="w-px h-9 bg-gradient-to-b from-white/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section id="recent-events" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2.5">
                <TrendingUp size={11} /> Trending Now
              </div>
              <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold text-slate-900 tracking-tight leading-tight">
                Upcoming Events
              </h2>
            </div>
            <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
              See all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {recentEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED ── */}
      <section className="py-16 md:py-20 bg-[#f4f5f7]">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2.5">
                <Sparkles size={11} /> Just For You
              </div>
              <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold text-slate-900 tracking-tight leading-tight">
                Recommended For You
              </h2>
            </div>
            {recommendedEvents.length > 0 && (
              <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                View all →
              </button>
            )}
          </div>

          {recommendedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recommendedEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-base font-bold text-slate-800 mb-2">
                {user ? "No Recommendations Yet" : "Login to See Recommendations"}
              </p>
              <p className="text-sm text-slate-400 max-w-[240px] leading-relaxed mb-5">
                {user
                  ? "Attend more events and we'll personalise this for you."
                  : "Sign in to get events picked just for your interests."}
              </p>
              {!user && (
                <button className="text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full transition-colors">
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}