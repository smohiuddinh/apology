import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/1.jpg";
import EventCard from "./cards/eventcard";
import Navbar from "./Navbar";
import { ICCD_EVENTS } from "../data/events";



const mockRecommendedEvents = [
  { id: 6, title: "Photography Masterclass", description: "Learn professional photography techniques from experts.", start_datetime: "2026-04-25T11:00:00", venue: "Karachi Arts Council", banner: "https://picsum.photos/id/201/600/400", type: "paid", views: 3200 },
  { id: 7, title: "Fitness Bootcamp Challenge", description: "Transform your body with 30 days of intense training.", start_datetime: "2026-05-20T06:30:00", venue: "Sea View Park", banner: "https://picsum.photos/id/133/600/400", type: "paid", views: 4100 },
  { id: 8, title: "Literature & Book Fair", description: "A paradise for book lovers with author meet & greets.", start_datetime: "2026-06-05T10:00:00", venue: "Frere Hall", banner: "https://picsum.photos/id/367/600/400", type: "free", views: 2800 },
  { id: 9, title: "Fashion Week Karachi 2026", description: "Showcasing the latest trends in Pakistani fashion.", start_datetime: "2026-07-12T17:00:00", venue: "Pearl Continental Hotel", banner: "https://picsum.photos/id/1027/600/400", type: "paid", views: 9500 },
];

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const recentRef = useRef(null);
  const recommendedRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleScroll = () => document.getElementById("recent-events")?.scrollIntoView({ behavior: "smooth" });

  const scrollContainer = (ref, direction) => {
    ref.current?.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  };

  useEffect(() => {
    setRecentEvents(ICCD_EVENTS);
    setRecommendedEvents(user?.id ? mockRecommendedEvents : []);
  }, [user?.id]);

  return (
    <>
      <style>{`
        .home-wrap { background: #f4f5f7; min-height: 100vh; overflow-x: hidden; }

        /* ── HERO ── */
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.38) saturate(1.15);
          transform: scale(1.04);
          transition: transform 10s ease;
        }
        .hero:hover .hero-bg { transform: scale(1); }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 0% 100%, rgba(37,99,235,0.22) 0%, transparent 60%),
            radial-gradient(ellipse at 100% 0%, rgba(239,68,68,0.12) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(100px, 14vw, 160px) clamp(24px, 7vw, 96px) clamp(80px, 10vw, 120px);
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(40px, 7vw, 84px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.06;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
          max-width: 700px;
        }
        .hero-title-line2 {
          display: block;
          background: linear-gradient(90deg, #93c5fd 0%, #fca5a5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(14px, 1.8vw, 17px);
          color: rgba(255,255,255,0.55);
          max-width: 420px;
          line-height: 1.75;
          font-weight: 400;
          margin-bottom: 44px;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f43f5e;
          color: white;
          font-size: 14px;
          font-weight: 700;
          padding: 15px 32px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 20px rgba(244,63,94,0.4);
          transition: all 0.22s ease;
        }
        .hero-btn-primary:hover {
          background: #e11d48;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(244,63,94,0.5);
        }
        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 500;
          padding: 15px 28px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-1px);
        }
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(28px, 5vw, 56px);
          margin-top: clamp(48px, 8vw, 80px);
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .hero-stat-val {
          font-size: clamp(26px, 3.5vw, 36px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 5px;
        }
        .hero-stat-lbl {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.45;
          transition: opacity 0.2s;
          animation: scrollBounce 2.2s ease-in-out infinite;
        }
        .hero-scroll:hover { opacity: 0.8; }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
        }
        .hero-scroll-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }

        /* ── SECTIONS ── */
        .section { padding: clamp(56px, 7vw, 88px) 0; }
        .section-white { background: #ffffff; }
        .section-gray  { background: #f4f5f7; }
        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 64px);
        }
        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #2563eb;
          background: #eff6ff;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .section-title {
          font-size: clamp(22px, 3.5vw, 34px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .section-see-all {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 0;
          white-space: nowrap;
          transition: gap 0.2s;
        }
        .section-see-all:hover { gap: 8px; }

        /* ── CAROUSEL ── */
        .carousel-outer { position: relative; }
        .carousel-track {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 6px 2px 16px;
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-track > * {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: clamp(240px, 72vw, 290px);
        }
        @media (min-width: 640px) { .carousel-track > * { width: 280px; } }
        @media (min-width: 1024px) { .carousel-track > * { width: 295px; } }

        .carousel-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 24px;
        }
        .c-nav-btn {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1.5px solid #e2e8f0;
          background: white;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .c-nav-btn:hover {
          background: #0f172a;
          color: white;
          border-color: #0f172a;
          transform: scale(1.08);
        }

        /* ── EMPTY STATE ── */
        .empty-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 20px;
          width: 100%;
          text-align: center;
        }
        .empty-emoji {
          font-size: 40px;
          margin-bottom: 16px;
          line-height: 1;
        }
        .empty-t {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        .empty-d {
          font-size: 13px;
          color: #94a3b8;
          max-width: 240px;
          line-height: 1.65;
          margin-bottom: 20px;
        }
        .empty-cta {
          font-size: 13px;
          font-weight: 700;
          background: #0f172a;
          color: white;
          border: none;
          padding: 11px 22px;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .empty-cta:hover { background: #2563eb; }

        @media (max-width: 480px) {
          .hero-stats { gap: 24px; }
          .section-head { flex-direction: column; align-items: flex-start; }
          .carousel-footer { justify-content: flex-start; }
        }
      `}</style>

      <div className="home-wrap">
        <Navbar />

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${heroBackground})` }} />
          <div className="hero-vignette" />

          <div className="hero-content">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="hero-tag">
                <Sparkles size={11} />
                Karachi's #1 Event Platform
              </div>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Find Latest
              <span className="hero-title-line2">Events</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              Discover amazing events happening around you.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <button className="hero-btn-primary" onClick={handleScroll}>
                Get Ticket →
              </button>
              <button className="hero-btn-ghost">
                Browse All Events
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[["500+", "Events"], ["50k+", "Attendees"], ["200+", "Organizers"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="hero-stat-val">{val}</div>
                  <div className="hero-stat-lbl">{lbl}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hero-scroll" onClick={handleScroll}>
            <div className="hero-scroll-line" />
            <div className="hero-scroll-dot" />
          </div>
        </section>

        {/* ── UPCOMING EVENTS ── */}
        <section id="recent-events" className="section section-white">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-pill"><TrendingUp size={11} /> Trending Now</div>
                <h2 className="section-title">Upcoming Events</h2>
              </div>
              <button className="section-see-all">See all →</button>
            </div>

            <div className="carousel-outer">
              <div className="carousel-track" ref={recentRef}>
                {recentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="carousel-footer">
                <button className="c-nav-btn" onClick={() => scrollContainer(recentRef, "left")}>
                  <ArrowLeft size={16} />
                </button>
                <button className="c-nav-btn" onClick={() => scrollContainer(recentRef, "right")}>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── RECOMMENDED ── */}
        <section className="section section-gray">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-pill"><Sparkles size={11} /> Just For You</div>
                <h2 className="section-title">Recommended For You</h2>
              </div>
              {recommendedEvents.length > 0 && (
                <button className="section-see-all">View all →</button>
              )}
            </div>

            {recommendedEvents.length > 0 ? (
              <div className="carousel-outer">
                <div className="carousel-track" ref={recommendedRef}>
                  {recommendedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                <div className="carousel-footer">
                  <button className="c-nav-btn" onClick={() => scrollContainer(recommendedRef, "left")}>
                    <ArrowLeft size={16} />
                  </button>
                  <button className="c-nav-btn" onClick={() => scrollContainer(recommendedRef, "right")}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-wrap">
                <div className="empty-emoji">✨</div>
                <p className="empty-t">{user ? "No Recommendations Yet" : "Login to See Recommendations"}</p>
                <p className="empty-d">
                  {user
                    ? "Attend more events and we'll personalise this for you."
                    : "Sign in to get events picked just for your interests."}
                </p>
                {!user && <button className="empty-cta">Sign In</button>}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}