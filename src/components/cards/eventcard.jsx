import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Share2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const [isSaved, setIsSaved] = useState(false);
  const [views, setViews] = useState(event.views || 0);
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
    const text = encodeURIComponent(`${event.title} - ${event.description || "Check out this amazing event!"}\n${eventURL}`);
    if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventURL)}`, "_blank");
    else if (platform === "whatsapp") window.open(`https://wa.me/?text=${text}`, "_blank");
    else if (platform === "email") window.open(`mailto:?subject=${encodeURIComponent(event.title)}&body=${text}`, "_blank");
    setShareModalOpen(false);
  };

  const handleViewDetails = () => {
    setViews((prev) => prev + 1);
    navigate(`/event/${event.id}`, { state: { eventId: event.id } });
  };

  const isPaid = event?.type?.toLowerCase() === "paid" || event?.price > 0;
  const formatViews = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v;
  const formatDate = (dt) => {
    if (!dt) return "Date TBA";
    return new Date(dt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <style>{`
        .ec-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          width: 100%;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .ec-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .ec-img-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: #f3f4f6;
        }
        .ec-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ec-card:hover .ec-img { transform: scale(1.04); }
        .ec-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%);
          pointer-events: none;
        }
        .ec-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
        }
        .ec-badge-paid { background: #fef3c7; color: #92400e; }
        .ec-badge-free { background: #d1fae5; color: #065f46; }
        .ec-btns {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ec-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .ec-btn:hover { transform: scale(1.12); }
        .ec-btn-save { background: rgba(255,255,255,0.9); color: #374151; }
        .ec-btn-save.saved { background: #ef4444; color: white; }
        .ec-btn-save.pop { animation: ecPop 0.4s ease; }
        @keyframes ecPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        .ec-btn-share { background: rgba(255,255,255,0.9); color: #374151; }
        .ec-btn-share:hover { background: rgba(37,99,235,0.9); color: white; }

        .ec-body { padding: 16px; }
        .ec-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .ec-card:hover .ec-title { color: #2563eb; }
        .ec-desc {
          font-size: 12.5px;
          color: #9ca3af;
          line-height: 1.55;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ec-meta { display: flex; flex-direction: column; gap: 7px; }
        .ec-meta-row {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: #6b7280;
        }
        .ec-meta-row svg { flex-shrink: 0; }
        .ec-meta-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ec-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }
        .ec-views { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: #d1d5db; }
        .ec-cta {
          font-size: 12px;
          font-weight: 600;
          background: #111827;
          color: white;
          border: none;
          padding: 7px 16px;
          border-radius: 100px;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ec-cta:hover { background: #2563eb; transform: translateY(-1px); }

        /* Share Modal */
        .ec-modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: ecFadeIn 0.18s ease;
        }
        @keyframes ecFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .ec-modal {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px 24px;
          width: 100%;
          max-width: 300px;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          animation: ecSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes ecSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ec-modal-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: none;
          background: #f3f4f6;
          color: #9ca3af;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }
        .ec-modal-close:hover { background: #fee2e2; color: #ef4444; }
        .ec-modal-title { font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 4px; }
        .ec-modal-sub { font-size: 12px; color: #9ca3af; margin: 0 0 20px; }
        .ec-share-list { display: flex; flex-direction: column; gap: 8px; }
        .ec-share-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 500;
          transition: transform 0.15s ease, filter 0.15s ease;
          text-align: left;
        }
        .ec-share-btn:hover { transform: translateX(4px); filter: brightness(0.95); }
        .ec-share-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          color: white;
          font-weight: 800;
        }
        .ec-fb { background: #eff6ff; color: #1d4ed8; }
        .ec-fb .ec-share-icon { background: #1877f2; }
        .ec-wa { background: #f0fdf4; color: #166534; }
        .ec-wa .ec-share-icon { background: #25d366; }
        .ec-em { background: #f9fafb; color: #374151; }
        .ec-em .ec-share-icon { background: #374151; }
      `}</style>

      <div className="ec-card" onClick={handleViewDetails}>
        <div className="ec-img-wrap">
          <img
            src={event.banner || event.image || "https://picsum.photos/id/1015/600/400"}
            alt={event.title}
            className="ec-img"
          />
          <div className="ec-img-overlay" />
          <div className={`ec-badge ${isPaid ? "ec-badge-paid" : "ec-badge-free"}`}>
            {isPaid ? "💰 Paid" : "🎟 Free"}
          </div>
          <div className="ec-btns">
            <button
              onClick={handleSaveEvent}
              className={`ec-btn ec-btn-save ${isSaved ? "saved" : ""} ${justSaved ? "pop" : ""}`}
            >
              <Heart size={14} fill={isSaved ? "white" : "none"} strokeWidth={isSaved ? 0 : 2} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShareModalOpen(true); }}
              className="ec-btn ec-btn-share"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        <div className="ec-body">
          <h2 className="ec-title">{event.title}</h2>
          <p className="ec-desc">{event.description || "No description available."}</p>
          <div className="ec-meta">
            <div className="ec-meta-row">
              <Calendar size={12} color="#3b82f6" />
              <span>{formatDate(event.start_datetime || event.date)}</span>
            </div>
            <div className="ec-meta-row">
              <MapPin size={12} color="#ef4444" />
              <span>{event.venue || event.location || "Location not specified"}</span>
            </div>
          </div>
          <div className="ec-footer">
            <div className="ec-views">
              <Eye size={12} />
              <span>{formatViews(views)} views</span>
            </div>
            <button className="ec-cta" onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
              View Details →
            </button>
          </div>
        </div>
      </div>

      {shareModalOpen && (
        <div className="ec-modal-bg" onClick={() => setShareModalOpen(false)}>
          <div className="ec-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ec-modal-close" onClick={() => setShareModalOpen(false)}>
              <X size={13} />
            </button>
            <p className="ec-modal-title">Share Event</p>
            <p className="ec-modal-sub">Tell your friends about this event</p>
            <div className="ec-share-list">
              <button className="ec-share-btn ec-fb" onClick={() => handleShare("facebook")}>
                <div className="ec-share-icon">f</div>
                Share on Facebook
              </button>
              <button className="ec-share-btn ec-wa" onClick={() => handleShare("whatsapp")}>
                <div className="ec-share-icon">💬</div>
                Share on WhatsApp
              </button>
              <button className="ec-share-btn ec-em" onClick={() => handleShare("email")}>
                <div className="ec-share-icon">✉</div>
                Share via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}