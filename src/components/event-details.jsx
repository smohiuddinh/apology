import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Tag, User, Ticket, Star, Eye, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

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
  const [totalSales, setTotalSales] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const success = searchParams.get("success");

  // Mock Events Data (merged with previously created events from localStorage)
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
        type: "paid",
        price: 49,
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
        type: "free",
        price: 0,
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
        type: "free",
        price: 0,
        views: 5600,
      },
      // Add more if needed...
    ];

    // Merge stored events with mock data
    const allEvents = [...mockEvents, ...storedEvents];
    return allEvents.find((e) => String(e.id) === String(eventId)) || null;
  };

  // Mock Reviews
  const mockReviews = [
    {
      id: 101,
      userName: "Ali Khan",
      rating: 5,
      comment: "Amazing event! Learned so much about new technologies.",
      created_at: "2026-04-10T14:30:00",
    },
    {
      id: 102,
      userName: "Sara Ahmed",
      rating: 4,
      comment: "Great organization and very informative sessions.",
      created_at: "2026-04-12T09:15:00",
    },
  ];

  // Handle success message from ticket purchase
  useEffect(() => {
    if (success === "true") {
      alert("✅ Ticket purchased successfully!");
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("success");
      navigate(`/event/${id}`, { replace: true });
    }
  }, [success, id, navigate, searchParams]);

  // Load Event Data
  useEffect(() => {
    const foundEvent = getMockEvent(id);
    if (foundEvent) {
      setEvent(foundEvent);
      setViews(foundEvent.views || 1240); // Default views if not present
      setTotalSales(Math.floor(Math.random() * 150) + 20); // Random sales for demo
    } else {
      // Fallback if event not found
      setEvent({
        id,
        title: "Event Not Found",
        description: "The event you're looking for doesn't exist or has been removed.",
        organizer: "Happenings",
        start_datetime: new Date().toISOString(),
        venue: "Karachi",
        category: "General",
        banner: "https://picsum.photos/id/1015/1200/600",
        type: "free",
      });
    }
  }, [id]);

  // Load Mock Reviews
  useEffect(() => {
    setReviews(mockReviews);
    setAvgRating(4.5);
  }, [id]);

  // Submit Review (Mock)
  const handleSubmitReview = async () => {
    if (!user) return alert("Please login first.");
    if (!rating) return alert("Please select a rating.");
    if (!comment.trim()) return alert("Please write a comment.");

    const newReview = {
      id: Date.now(),
      userName: user.fullname || "Anonymous User",
      rating,
      comment: comment.trim(),
      created_at: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setAvgRating(((avgRating * reviews.length) + rating) / (reviews.length + 1));

    setRating(0);
    setComment("");
    alert("✅ Review submitted successfully! Thank you.");
  };

  // Generate Free Ticket (Mock)
  const handleGenerateTicket = () => {
    if (!user) return alert("Please login first.");
    if (!event) return;

    alert(`🎟️ Free ticket generated successfully for "${event.title}"!`);
    
    // Simulate ticket count increase
    setTotalSales((prev) => prev + 1);

    // Navigate to My Tickets
    setTimeout(() => {
      navigate("/my-tickets");
    }, 800);
  };

  // Buy Paid Ticket (Mock)
  const handleBuyTicket = () => {
    if (!user) return alert("Please login first.");
    if (!event) return;

    alert(`🎟️ Redirecting to payment for "${event.title}"...`);
    
    // Simulate successful payment
    setTimeout(() => {
      alert("✅ Payment Successful! Ticket added to your account.");
      setTotalSales((prev) => prev + 1);
      navigate("/my-tickets");
    }, 1200);
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading event details...
      </div>
    );
  }

  const isPaid = event.type?.toLowerCase() === "paid" || event.price > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10"
    >
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative">
          <img
            src={event.banner || "https://picsum.photos/id/1015/1200/600"}
            alt={event.title}
            className="w-full h-96 md:h-[28rem] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold">{event.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm md:text-base flex-wrap">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span>{event.organizer}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span>{views}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span>{totalSales} Tickets Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="flex flex-wrap gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>{new Date(event.start_datetime).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-pink-500" />
              <span>{event.category}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>

          <div>
            <span className="font-semibold">Event Type:</span>{" "}
            <span className={`font-semibold ${isPaid ? "text-red-500" : "text-green-500"}`}>
              {isPaid ? `💰 Paid - $${event.price}` : "🎟️ Free Event"}
            </span>
          </div>

          {/* Ticket Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {isPaid ? (
              <button
                onClick={handleBuyTicket}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition flex items-center justify-center gap-3 text-lg"
              >
                <Ticket className="w-6 h-6" /> Buy Ticket - ${event.price}
              </button>
            ) : (
              <button
                onClick={handleGenerateTicket}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition flex items-center justify-center gap-3 text-lg"
              >
                <Ticket className="w-6 h-6" /> Get Free Ticket
              </button>
            )}
          </div>

          {/* Google Map Embed */}
          {event.venue && (
            <div className="mt-10">
              <h3 className="font-semibold text-lg mb-3">📍 Location</h3>
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(event.venue)}&output=embed`}
                className="w-full h-80 md:h-96 rounded-2xl border shadow"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Reviews & Ratings{" "}
              {reviews.length > 0 && <span className="text-yellow-500">({avgRating.toFixed(1)} ⭐)</span>}
            </h2>

            {/* Submit Review */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm mb-8">
              <p className="font-medium mb-3">Rate this event</p>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition-all ${
                      star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-300 outline-none"
                rows="3"
              />
              <button
                disabled={submitting || !rating || !comment.trim()}
                onClick={handleSubmitReview}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-blue-700 transition"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-5">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl shadow-sm border">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold">{rev.userName}</p>
                      <span className="text-yellow-500">{"⭐".repeat(rev.rating)}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{rev.comment}</p>
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}