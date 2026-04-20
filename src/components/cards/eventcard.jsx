import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Share2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const [isSaved, setIsSaved] = useState(false);
  const [views, setViews] = useState(event.views || 0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user (for demo purposes)
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  // Simulate checking if event is saved (using localStorage)
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    const isAlreadySaved = savedEvents.some((e) => e.id === event.id);
    setIsSaved(isAlreadySaved);
  }, [event.id]);

  const handleSaveEvent = (e) => {
    e.stopPropagation();

    if (!user || !token) {
      return alert("Please login first to save this event.");
    }

    if (isSaved) {
      return alert("This event is already saved.");
    }

    // Simulate saving to localStorage
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    savedEvents.push(event);
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

    setIsSaved(true);
    alert("Event saved successfully! ❤️");
  };

  const handleShare = (platform) => {
    const eventURL = `${window.location.origin}/event/${event.id}`;
    const text = encodeURIComponent(
      `${event.title} - ${event.description || "Check out this amazing event!"}\n${eventURL}`
    );

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventURL)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${text}`, "_blank");
    } else if (platform === "email") {
      window.open(`mailto:?subject=${encodeURIComponent(event.title)}&body=${text}`, "_blank");
    }

    setShareModalOpen(false);
  };

  const handleViewDetails = () => {
    // Simulate view increment (just increase locally)
    setViews((prev) => prev + 1);

    // Navigate to event detail page
    navigate(`/event/${event.id}`, { state: { eventId: event.id } });
  };

  const isPaid = event?.type?.toLowerCase() === "paid" || event?.price > 0;

  return (
    <>
      <div
        onClick={handleViewDetails}
        className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer max-w-sm w-full"
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={event.banner || event.image || "https://picsum.photos/id/1015/600/400"}
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold shadow text-gray-800">
            {isPaid ? "💰 Paid" : "🎟️ Free"}
          </div>

          {/* Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleSaveEvent}
              className={`p-2 rounded-full shadow-md transition ${
                isSaved ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:bg-red-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShareModalOpen(true);
              }}
              className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-100 shadow-md transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {event.title}
          </h2>

          <div className="text-sm text-gray-600 line-clamp-2">
            {event.description || "No description available."}
          </div>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>
              {event.start_datetime 
                ? new Date(event.start_datetime).toLocaleDateString() 
                : event.date 
                  ? new Date(event.date).toLocaleDateString() 
                  : "Date not available"}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="truncate">
              {event.venue || event.location || "Location not specified"}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Eye className="w-4 h-4 text-gray-600" />
            <span>{views} views</span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-72 shadow-xl text-center relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Share Event</h3>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleShare("facebook")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("email")}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}