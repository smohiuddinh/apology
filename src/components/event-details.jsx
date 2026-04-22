import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Calendar, MapPin, Tag, User, Ticket, Star, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ICCD_EVENTS } from "../data/events";

// ─── Ticket Modal (Modern Glass UI) ─────────────────────────────
function TicketModal({ isOpen, onClose, onSubmit, event }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", people: 1 });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/30 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Get Ticket 🎟️</h2>
              <p className="text-xs text-gray-500">{event?.title}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 pb-6 space-y-3">
            {["name", "email", "phone"].map((f) => (
              <input
                key={f}
                placeholder={f.toUpperCase()}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
            ))}

            {/* People */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
              <button onClick={() => setForm({ ...form, people: Math.max(1, form.people - 1) })}>-</button>
              <span className="font-bold">{form.people}</span>
              <button onClick={() => setForm({ ...form, people: Math.min(10, form.people + 1) })}>+</button>
            </div>

            <button
              onClick={() => {
                onSubmit(form);
                onClose();
              }}
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] transition"
            >
              Confirm Ticket
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function EventDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getEvent = (id) => ICCD_EVENTS.find((e) => String(e.id) === String(id));

  useEffect(() => {
    const found = getEvent(id);

    setEvent(
      found || {
        title: "Event Not Found",
        description: "This event does not exist.",
        venue: "Karachi",
        start_datetime: new Date().toISOString(),
        banner: "https://picsum.photos/1200/600",
        sector: "General",
      }
    );

    setReviews([
      { id: 1, user: "Ali", rating: 5, comment: "Amazing event 🔥" },
      { id: 2, user: "Sara", rating: 4, comment: "Loved it!" },
    ]);
  }, [id]);

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-800">

      {/* HERO */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={event.banner}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30" />

        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <p className="text-emerald-300 text-sm uppercase tracking-widest">
            {event.sector || "Event"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {event.title}
          </h1>
          <p className="text-white/70 mt-2">{event.description}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10 space-y-8">

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Calendar, text: new Date(event.start_datetime).toLocaleString() },
            { icon: MapPin, text: event.venue },
            { icon: Tag, text: event.sector },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-md rounded-2xl p-5 flex items-center gap-3 hover:scale-[1.02] transition"
            >
              <item.icon className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition"
        >
          🎟️ Get Ticket
        </button>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-2">About Event</h2>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>
        </div>

        {/* REVIEWS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Reviews</h2>

          {/* input */}
          <div className="bg-white p-5 rounded-2xl border">
            <div className="flex gap-2 mb-3">
              {[1,2,3,4,5].map((s) => (
                <Star
                  key={s}
                  onClick={() => setRating(s)}
                  className={`cursor-pointer ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <textarea
              className="w-full p-3 rounded-xl bg-gray-50 border"
              placeholder="Write review..."
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={() => {
                setReviews([{ id: Date.now(), user: "You", rating, comment }, ...reviews]);
                setRating(0);
                setComment("");
              }}
              className="mt-3 px-5 py-2 rounded-xl bg-black text-white"
            >
              Post Review
            </button>
          </div>

          {/* list */}
          <div className="mt-5 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-xl border hover:shadow-sm transition">
                <div className="flex justify-between">
                  <span className="font-semibold">{r.user}</span>
                  <span>{"⭐".repeat(r.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <TicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        event={event}
        onSubmit={(data) => {
          alert(`Ticket booked for ${data.name}`);
        }}
      />
    </div>
  );
}