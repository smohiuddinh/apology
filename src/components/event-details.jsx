import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Tag, User, Ticket, Star, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Ticket Modal ─────────────────────────────────────────────────────────────
function TicketModal({ isOpen, onClose, onSubmit, event }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", people: 1 });

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "", people: 1 });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(15, 10, 40, 0.55)", backdropFilter: "blur(6px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #34d399, #10b981, #6ee7b7)" }} />

          {/* Header */}
          <div className="px-7 pt-7 pb-4">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">Get Free Ticket</h2>
                <p className="text-xs text-gray-400 truncate max-w-[220px]">{event?.title}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Fill in your details to claim your free pass instantly.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-7 pb-7 space-y-3">
            {[
              { name: "name", placeholder: "Full Name", type: "text" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "phone", placeholder: "Phone Number", type: "tel" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
              />
            ))}

            {/* People selector */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Number of People</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, people: Math.max(1, f.people - 1) }))}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold text-lg"
                >
                  −
                </button>
                <span className="text-xl font-bold text-gray-800 w-8 text-center">{form.people}</span>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, people: Math.min(10, f.people + 1) }))}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold text-lg"
                >
                  +
                </button>
                <span className="text-sm text-gray-400 ml-1">max 10</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #34d399, #10b981)" }}
              >
                🎟️ Confirm Ticket
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Event Details ────────────────────────────────────────────────────────────
export default function EventDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [views, setViews] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const success = searchParams.get("success");

  const getMockEvent = (eventId) => {
    const storedEvents = JSON.parse(localStorage.getItem("mockEvents") || "[]");
    const mockEvents = [
      {
        id: "1",
        title: "Tech Innovation Summit 2026",
        description: "Join industry leaders for the biggest tech conference in Pakistan.",
        organizer: "Happenings Team",
        start_datetime: "2026-05-15T10:00:00",
        venue: "Karachi Expo Center",
        category: "Technology",
        banner: "https://picsum.photos/id/1015/1200/600",
        views: 12400,
      },
      {
        id: "2",
        title: "Music Fest - Karachi Nights",
        description: "Live performances by top Pakistani artists under the stars.",
        organizer: "Karachi Entertainment",
        start_datetime: "2026-04-28T18:00:00",
        venue: "Bagh Ibn-e-Qasim",
        category: "Music",
        banner: "https://picsum.photos/id/870/1200/600",
        views: 8900,
      },
      {
        id: "3",
        title: "Startup Pitch Competition",
        description: "Showcase your startup idea and win exciting prizes.",
        organizer: "IBA Incubation Center",
        start_datetime: "2026-06-10T14:00:00",
        venue: "IBA Karachi",
        category: "Business",
        banner: "https://picsum.photos/id/106/1200/600",
        views: 5600,
      },
    ];
    const allEvents = [...mockEvents, ...storedEvents];
    return allEvents.find((e) => String(e.id) === String(eventId)) || null;
  };

  const mockReviews = [
    { id: 101, userName: "Ali Khan", rating: 5, comment: "Amazing event! Learned so much about new technologies.", created_at: "2026-04-10T14:30:00" },
    { id: 102, userName: "Sara Ahmed", rating: 4, comment: "Great organization and very informative sessions.", created_at: "2026-04-12T09:15:00" },
  ];

  useEffect(() => {
    if (success === "true") {
      alert("✅ Ticket generated successfully!");
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("success");
      navigate(`/event/${id}`, { replace: true });
    }
  }, [success, id, navigate, searchParams]);

  useEffect(() => {
    const foundEvent = getMockEvent(id);
    setEvent(
      foundEvent || {
        id,
        title: "Event Not Found",
        description: "The event you're looking for doesn't exist or has been removed.",
        organizer: "Happenings",
        start_datetime: new Date().toISOString(),
        venue: "Karachi",
        category: "General",
        banner: "https://picsum.photos/id/1015/1200/600",
      }
    );
    setViews(foundEvent?.views || 1240);
  }, [id]);

  useEffect(() => {
    setReviews(mockReviews);
    setAvgRating(4.5);
  }, [id]);

  const handleSubmitReview = () => {
    if (!rating) return alert("Please select a rating.");
    if (!comment.trim()) return alert("Please write a comment.");
    const newReview = {
      id: Date.now(),
      userName: "Anonymous User",
      rating,
      comment: comment.trim(),
      created_at: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    setAvgRating(((avgRating * reviews.length) + rating) / (reviews.length + 1));
    setRating(0);
    setComment("");
    alert("✅ Review submitted! Thank you.");
  };

  const handleTicketSubmit = (formData) => {
    console.log("Ticket form data:", formData);
    alert(`🎟️ Ticket confirmed for ${formData.name}! (${formData.people} ${formData.people > 1 ? "people" : "person"})`);
    // setTimeout(() => navigate("/my-tickets"), 800);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 text-gray-800"
    >
      {/* Hero Banner */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={event.banner || "https://picsum.photos/id/1015/1200/600"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Free badge */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500 text-white shadow-lg">
            🎟️ Free Entry
          </span>
        </div>

        {/* Views */}
        <div className="absolute top-6 right-6">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white bg-black/30 backdrop-blur-sm border border-white/20">
            <Eye className="w-4 h-4" /> {views.toLocaleString()} views
          </span>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2"
          >
            {event.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            {event.title}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-white/70 text-sm"
          >
            <User className="w-4 h-4 text-emerald-400" />
            Organized by <span className="text-white font-medium ml-1">{event.organizer}</span>
          </motion.span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 -mt-6 relative z-10 pb-20 space-y-8">

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: <Calendar className="w-5 h-5 text-violet-500" />, label: "Date & Time", value: new Date(event.start_datetime).toLocaleString() },
            { icon: <MapPin className="w-5 h-5 text-rose-500" />, label: "Venue", value: event.venue },
            { icon: <Tag className="w-5 h-5 text-amber-500" />, label: "Category", value: event.category },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About This Event</h2>
          <p className="text-gray-500 leading-relaxed">{event.description}</p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group px-12 py-4 rounded-2xl font-semibold text-lg text-white shadow-lg hover:shadow-emerald-200 hover:scale-105 transition-all duration-200 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #34d399, #059669)" }}
          >
            <Ticket className="w-6 h-6" />
            Get Your Free Ticket
          </button>
        </motion.div>

        {/* Google Map */}
        {event.venue && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">📍 Location</h3>
            </div>
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.venue)}&output=embed`}
              className="w-full h-72 md:h-96"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {/* Reviews */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            {reviews.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-sm font-medium">
                ⭐ {avgRating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Write Review */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Write a Review</p>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 cursor-pointer transition-all ${
                    star <= rating ? "text-amber-400 fill-amber-400 scale-110" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none transition"
              rows="3"
            />
            <button
              disabled={submitting || !rating || !comment.trim()}
              onClick={handleSubmitReview}
              className="mt-4 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                        {rev.userName[0]}
                      </div>
                      <p className="font-semibold text-gray-800">{rev.userName}</p>
                    </div>
                    <span className="text-amber-400 text-sm">{"⭐".repeat(rev.rating)}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed ml-12">{rev.comment}</p>
                  <p className="text-gray-300 text-xs mt-2 ml-12">
                    {new Date(rev.created_at).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 italic text-center py-10">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleTicketSubmit}
        event={event}
      />
    </motion.div>
  );
}