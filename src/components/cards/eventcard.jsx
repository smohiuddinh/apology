import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Share2, Clock, Users, Layers, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const [isSaved, setIsSaved] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    setIsSaved(savedEvents.some((e) => e.id === event.id));
  }, [event.id]);

  const handleSaveEvent = (e) => {
    e.stopPropagation();
    if (!user || !token) return alert("Please login first to save this event.");
    if (isSaved) return;
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    savedEvents.push(event);
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    setIsSaved(true);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 600);
  };

  const handleShare = (platform) => {
    const eventURL = `${window.location.origin}/event/${event.id}`;
    const text = encodeURIComponent(`${event.name} - ${event.description || ""}\n${eventURL}`);
    if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventURL)}`, "_blank");
    else if (platform === "whatsapp") window.open(`https://wa.me/?text=${text}`, "_blank");
    else if (platform === "email") window.open(`mailto:?subject=${encodeURIComponent(event.name)}&body=${text}`, "_blank");
    setShareModalOpen(false);
  };

  const handleViewDetails = () => {
    navigate(`/event/${event.id}`, { state: { eventId: event.id } });
  };

  const formatDate = (d) => {
    if (!d) return "Date TBA";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTime = (t) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  // Sector → color mapping
  const sectorColors = {
    Technology: "bg-blue-50 text-blue-700",
    Health: "bg-green-50 text-green-700",
    Arts: "bg-purple-50 text-purple-700",
    Education: "bg-amber-50 text-amber-700",
    Fashion: "bg-rose-50 text-rose-700",
    default: "bg-slate-100 text-slate-600",
  };
  const sectorClass = sectorColors[event.sector] || sectorColors.default;

  const typeColors = {
    conference: "bg-blue-600",
    workshop: "bg-violet-500",
    fair: "bg-amber-500",
    sports: "bg-green-500",
    show: "bg-rose-500",
    default: "bg-slate-500",
  };
  const typeColor = typeColors[event.type?.toLowerCase()] || typeColors.default;

  return (
    <>
      <div
        onClick={handleViewDetails}
        className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-black/[0.07] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
      >
        {/* Top color bar by type */}
        <div className={`h-1.5 w-full ${typeColor}`} />

        <div className="p-5 flex flex-col flex-1 gap-3.5">

          {/* Header row: name + action btns */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
              {event.name || event.title}
            </h2>
            <div className="flex gap-1.5 shrink-0 mt-0.5">
              <button
                onClick={handleSaveEvent}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
                  ${isSaved
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
                  } ${justSaved ? "scale-125" : "scale-100"}`}
              >
                <Heart size={13} fill={isSaved ? "white" : "none"} strokeWidth={isSaved ? 0 : 2} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShareModalOpen(true); }}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all duration-200"
              >
                <Share2 size={13} />
              </button>
            </div>
          </div>

          {/* Sector & Type badges */}
          <div className="flex flex-wrap gap-2">
            {event.sector && (
              <span className={`text-[10.5px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${sectorClass}`}>
                {event.sector}
              </span>
            )}
            {event.type && (
              <span className="text-[10.5px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">
                {event.type}
              </span>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-[12.5px] text-gray-400 leading-relaxed line-clamp-2">
              {event.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-col gap-2 text-[12px] text-gray-500">
            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-blue-500 shrink-0" />
              <span>{formatDate(event.date || event.start_datetime)}</span>
            </div>

            {/* Time */}
            {(event.startTime || event.endTime) && (
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-violet-500 shrink-0" />
                <span>
                  {formatTime(event.startTime)}
                  {event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
                </span>
              </div>
            )}

            {/* Location */}
            {(event.location || event.venue) && (
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-rose-500 shrink-0" />
                <span className="truncate">{event.location || event.venue}</span>
              </div>
            )}

            {/* Total Seats */}
            {event.totalSeats && (
              <div className="flex items-center gap-2">
                <Users size={12} className="text-emerald-500 shrink-0" />
                <span>{event.totalSeats} seats available</span>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && (
              <div className="flex items-start gap-2">
                <Layers size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{event.speakers}</span>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <button
              onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
              className="w-full text-[12.5px] font-semibold bg-slate-900 hover:bg-blue-600 text-white py-2.5 rounded-xl transition-colors duration-200"
            >
              View Details →
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-md flex items-center justify-center z-[9999] p-5 animate-[fadeIn_0.18s_ease]"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-7 w-full max-w-xs relative shadow-[0_24px_64px_rgba(0,0,0,0.18)] animate-[slideUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors"
            >
              <X size={13} />
            </button>
            <p className="text-[17px] font-bold text-gray-900 mb-1">Share Event</p>
            <p className="text-[12px] text-gray-400 mb-5">Tell your friends about this event</p>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleShare("facebook")} className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 hover:translate-x-1 transition-transform text-[13.5px] font-medium">
                <div className="w-8 h-8 rounded-lg bg-[#1877f2] text-white flex items-center justify-center font-black text-sm">f</div>
                Share on Facebook
              </button>
              <button onClick={() => handleShare("whatsapp")} className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 hover:translate-x-1 transition-transform text-[13.5px] font-medium">
                <div className="w-8 h-8 rounded-lg bg-[#25d366] text-white flex items-center justify-center text-sm">💬</div>
                Share on WhatsApp
              </button>
              <button onClick={() => handleShare("email")} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 hover:translate-x-1 transition-transform text-[13.5px] font-medium">
                <div className="w-8 h-8 rounded-lg bg-gray-700 text-white flex items-center justify-center text-sm">✉</div>
                Share via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}