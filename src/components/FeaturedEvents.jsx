import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TextField, MenuItem, Button } from "@mui/material";
import debounce from "lodash.debounce";
import banner from "../assets/3.jpg";
import EventCard from './cards/eventcard';

export default function FeaturedEvents({ initialLimit = 9 }) {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = initialLimit;

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    date: "",
    location: "",
    sortBy: "",
  });

  // ==================== MOCK DATA ====================
  const mockEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2026",
      date: "2026-05-15",
      location: "Karachi Expo Center",
      category: "Technology",
      rating: 4.8,
      views: 12400,
      createdAt: "2026-03-01T10:00:00Z",
      image: "https://picsum.photos/id/1015/600/400",
      description: "Join industry leaders for the biggest tech conference in Pakistan.",
    },
    {
      id: 2,
      title: "Music Fest - Karachi Nights",
      date: "2026-04-28",
      location: "Bagh Ibn-e-Qasim",
      category: "Music",
      rating: 4.6,
      views: 8900,
      createdAt: "2026-02-20T08:30:00Z",
      image: "https://picsum.photos/id/870/600/400",
      description: "Live performances by top Pakistani artists.",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2026-06-10",
      location: "IBA Karachi",
      category: "Business",
      rating: 4.9,
      views: 5600,
      createdAt: "2026-04-05T12:00:00Z",
      image: "https://picsum.photos/id/106/600/400",
      description: "Showcase your startup and win exciting prizes.",
    },
    {
      id: 4,
      title: "Food & Culture Festival",
      date: "2026-05-01",
      location: "Port Grand Karachi",
      category: "Food",
      rating: 4.7,
      views: 15200,
      createdAt: "2026-01-15T09:00:00Z",
      image: "https://picsum.photos/id/1080/600/400",
      description: "Experience the best street food and cultural performances.",
    },
    {
      id: 5,
      title: "Photography Workshop",
      date: "2026-04-25",
      location: "Karachi Arts Council",
      category: "Art",
      rating: 4.5,
      views: 3200,
      createdAt: "2026-03-20T11:00:00Z",
      image: "https://picsum.photos/id/201/600/400",
      description: "Learn professional photography from experts.",
    },
    {
      id: 6,
      title: "Fitness Bootcamp Challenge",
      date: "2026-05-20",
      location: "Sea View Park",
      category: "Health",
      rating: 4.4,
      views: 4100,
      createdAt: "2026-04-10T07:30:00Z",
      image: "https://picsum.photos/id/133/600/400",
      description: "Transform your body with intense training sessions.",
    },
    {
      id: 7,
      title: "Literature & Book Fair",
      date: "2026-06-05",
      location: "Frere Hall",
      category: "Literature",
      rating: 4.8,
      views: 2800,
      createdAt: "2026-03-25T14:00:00Z",
      image: "https://picsum.photos/id/367/600/400",
      description: "A paradise for book lovers and writers.",
    },
    {
      id: 8,
      title: "E-Sports Championship",
      date: "2026-05-30",
      location: "NED University",
      category: "Gaming",
      rating: 4.9,
      views: 18700,
      createdAt: "2026-04-01T16:00:00Z",
      image: "https://picsum.photos/id/180/600/400",
      description: "Biggest gaming tournament of the year.",
    },
    {
      id: 9,
      title: "Fashion Week Karachi",
      date: "2026-07-12",
      location: "Pearl Continental Hotel",
      category: "Fashion",
      rating: 4.7,
      views: 9500,
      createdAt: "2026-02-10T10:30:00Z",
      image: "https://picsum.photos/id/1027/600/400",
      description: "Showcasing the latest trends in Pakistani fashion.",
    },
  ];

  const mockCategories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Music" },
    { id: 3, name: "Business" },
    { id: 4, name: "Food" },
    { id: 5, name: "Art" },
    { id: 6, name: "Health" },
    { id: 7, name: "Literature" },
    { id: 8, name: "Gaming" },
    { id: 9, name: "Fashion" },
  ];
  // ===================================================

  // Filter and sort events (client-side)
  const filterAndSortEvents = (activeFilters, currentPage = 1) => {
    setLoading(true);

    let filteredEvents = [...mockEvents];

    // Keyword filter
    if (activeFilters.keyword) {
      const keyword = activeFilters.keyword.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword) ||
          event.location.toLowerCase().includes(keyword)
      );
    }

    // Category filter
    if (activeFilters.category) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === activeFilters.category
      );
    }

    // Date filter
    if (activeFilters.date) {
      filteredEvents = filteredEvents.filter(
        (event) => event.date === activeFilters.date
      );
    }

    // Location filter
    if (activeFilters.location) {
      const location = activeFilters.location.toLowerCase();
      filteredEvents = filteredEvents.filter((event) =>
        event.location.toLowerCase().includes(location)
      );
    }

    // Sorting
    if (activeFilters.sortBy === "popular") {
      filteredEvents.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeFilters.sortBy === "recent") {
      filteredEvents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeFilters.sortBy === "trending") {
      filteredEvents.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * limit;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);
    const calculatedTotalPages = Math.ceil(filteredEvents.length / limit) || 1;

    setEvents(paginatedEvents);
    setPage(currentPage);
    setTotalPages(calculatedTotalPages);

    setLoading(false);
  };

  const debouncedFilter = useCallback(
    debounce((newFilters, newPage) => filterAndSortEvents(newFilters, newPage), 400),
    []
  );

  // Trigger filtering when filters change
  useEffect(() => {
    setPage(1);
    debouncedFilter(filters, 1);
  }, [filters, debouncedFilter]);

  // Handle page change
  useEffect(() => {
    filterAndSortEvents(filters, page);
  }, [page]);

  // Load categories once
  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full bg-gray-50 font-sansation">
      {/* Hero Banner */}
      <section
        className="relative w-full h-70 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 mt-3">
            Featured Events
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Discover upcoming events near you.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="w-full bg-white shadow-lg py-6 px-4 md:px-10 mt-10 rounded-xl max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <TextField
            label="Keyword"
            variant="outlined"
            fullWidth
            value={filters.keyword}
            onChange={(e) => handleInputChange("keyword", e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            value={filters.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            value={filters.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            size="small"
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Sort By"
            variant="outlined"
            fullWidth
            value={filters.sortBy}
            onChange={(e) => handleInputChange("sortBy", e.target.value)}
            size="small"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
            <MenuItem value="trending">Trending</MenuItem>
            <MenuItem value="recent">Recently Added</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500"
          >
            Loading events...
          </motion.p>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <EventCard event={event} />
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500"
          >
            No events found.
          </motion.p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <Button
            variant="outlined"
            size="small"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 500, px: 2, minWidth: "80px" }}
          >
            ← Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "contained" : "outlined"}
              size="small"
              onClick={() => setPage(i + 1)}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                minWidth: "40px",
                backgroundColor: page === i + 1 ? "#3B82F6" : "transparent",
                color: page === i + 1 ? "#fff" : "#374151",
                borderColor: page === i + 1 ? "#3B82F6" : "#cbd5e1",
                "&:hover": { backgroundColor: page === i + 1 ? "#2563EB" : "#f1f5f9" },
              }}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outlined"
            size="small"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 500, px: 2, minWidth: "80px" }}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}