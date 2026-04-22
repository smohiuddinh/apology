import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, Calendar, MapPin,
  Eye, Heart, X, ChevronDown, ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ICCD_EVENTS } from "../data/events";



const CATEGORIES = ["All","Technology","Music","Business","Food","Gaming","Arts","Sports","Education","Fashion","Entertainment"];
const SORT_OPTIONS = [
  { label: "Newest First",       value: "newest"     },
  { label: "Most Popular",       value: "popular"    },
  { label: "Price: Low to High", value: "price_asc"  },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function AllEvents() {
  const [search,          setSearch         ] = useState("");
  const [activeCategory,  setActiveCategory ] = useState("All");
  const [typeFilter,      setTypeFilter     ] = useState("all");
  const [sortBy,          setSortBy         ] = useState("newest");
  const [sortOpen,        setSortOpen       ] = useState(false);
  const [savedIds,        setSavedIds       ] = useState(() => {
    const s = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    return new Set(s.map((e) => e.id));
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSave = (e, event) => {
    e.stopPropagation();
    if (!user?.token) return alert("Please login first to save this event.");
    if (savedIds.has(event.id)) return;
    const saved = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    saved.push(event);
    localStorage.setItem("savedEvents", JSON.stringify(saved));
    setSavedIds((prev) => new Set([...prev, event.id]));
  };

  const formatDate  = (dt) => new Date(dt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatViews = (v)  => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v;

  const filtered = useMemo(() => {
    let list = [...ICCD_EVENTS];
    if (search.trim())         list = list.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== "All") list = list.filter((e) => e.category === activeCategory);
    if (typeFilter !== "all")  list = list.filter((e) => e.type === typeFilter);
    if      (sortBy === "newest")     list.sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));
    else if (sortBy === "popular")    list.sort((a, b) => b.views - a.views);
    else if (sortBy === "price_asc")  list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [search, activeCategory, typeFilter, sortBy]);

  const currentSort   = SORT_OPTIONS.find((o) => o.value === sortBy);
  const totalFree     = ICCD_EVENTS.filter((e) => e.type === "free").length;
  const totalPaid     = ICCD_EVENTS.filter((e) => e.type === "paid").length;
  const totalCats     = new Set(ICCD_EVENTS.map((e) => e.category)).size;
  const hasFilters    = search || activeCategory !== "All" || typeFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* ─── HEADER ─── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#47AAB3" }}
      >
        {/* subtle inner overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 90% 40%, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(0,0,0,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {/* Org badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-4">
            <span
              className="w-2 h-2 rounded-full bg-white"
              style={{ boxShadow: "0 0 0 3px rgba(255,255,255,0.3)", animation: "pulse 2s infinite" }}
            />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Hosted by ICCD</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3">
            All Events
          </h1>
          <p className="text-white/60 text-sm sm:text-base mb-10 max-w-md">
            Explore every event organised by ICCD — discover, save & attend.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 pb-8">
            {[
              [ICCD_EVENTS.length, "Total Events"],
              [totalFree,          "Free Events" ],
              [totalPaid,          "Paid Events" ],
              [totalCats,          "Categories"  ],
            ].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none mb-1">{val}</div>
                <div className="text-white/40 text-xs font-semibold tracking-widest uppercase">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── STICKY TOOLBAR ─── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-3 flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#47AAB3] focus:ring-2 focus:ring-[#47AAB3]/10 placeholder-gray-400 transition"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-2">
            {[
              { key: "all",  label: "All"       },
              { key: "free", label: "🎟 Free"   },
              { key: "paid", label: "💰 Paid"   },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTypeFilter(key)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  typeFilter === key
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 hover:border-gray-400 transition whitespace-nowrap"
            >
              <SlidersHorizontal size={13} />
              <span className="hidden sm:inline">{currentSort.label}</span>
              <ChevronDown
                size={12}
                style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
            {sortOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden min-w-[180px] z-50"
                style={{ animation: "dropIn 0.15s ease" }}>
                <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition ${
                      sortBy === o.value
                        ? "bg-[#47AAB3]/10 text-[#47AAB3] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category pills row */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-3">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "text-white border-[#47AAB3]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                }`}
                style={activeCategory === cat ? { background: "#47AAB3" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RESULTS ─── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8">

        {/* Meta row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> of {ICCD_EVENTS.length} events
            {activeCategory !== "All" && <> in <span className="text-gray-900 font-bold">{activeCategory}</span></>}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setTypeFilter("all"); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.length > 0 ? (
              filtered.map((event, i) => {
                const isPaid  = event.type === "paid";
                const isSaved = savedIds.has(event.id);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.28, delay: i * 0.035 }}
                    onClick={() => navigate(`/event/${event.id}`, { state: { eventId: event.id } })}
                    className="bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm cursor-pointer group"
                    style={{ transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.11)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = ""; }}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                      {/* Category top-left */}
                      <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-gray-700 tracking-wide uppercase">
                        {event.category}
                      </div>

                      {/* Save button top-right */}
                      <button
                        onClick={(e) => handleSave(e, event)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:scale-110 ${
                          isSaved
                            ? "bg-red-500 text-white"
                            : "bg-white/90 backdrop-blur-sm text-gray-600"
                        }`}
                      >
                        <Heart size={13} fill={isSaved ? "white" : "none"} strokeWidth={isSaved ? 0 : 2} />
                      </button>

                      {/* Free/Paid badge bottom-left */}
                      <div className={`absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase ${
                        isPaid ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {isPaid ? "💰 Paid" : "🎟 Free"}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug line-clamp-2 group-hover:text-[#47AAB3] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar size={11} color="#47AAB3" className="flex-shrink-0" />
                          <span className="truncate">{formatDate(event.start_datetime)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={11} color="#ef4444" className="flex-shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-[11px] text-gray-300">
                          <Eye size={11} />
                          <span>{formatViews(event.views)} views</span>
                        </div>
                        <span className={`text-sm font-extrabold ${isPaid ? "text-gray-900" : "text-emerald-600"}`}>
                         {event.type === "paid"
  ? `PKR ${(event.price ?? 0).toLocaleString()}`
  : "Free"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-lg font-bold text-gray-800 mb-2">No events found</p>
                <p className="text-sm text-gray-400 max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}