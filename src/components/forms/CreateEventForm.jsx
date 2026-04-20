import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { countryData } from "../../data/citiesData";

// ---------------- Validation schema ----------------
const schema = yup.object().shape({
  organizer: yup.string().required("Organizer is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().min(10, "Description must be at least 10 characters"),
  category: yup.string().required("Please select a category"),
  country: yup.string().required("Please select a country"),
  city: yup.string().required("Please select a city"),
  venue: yup.string().required("Venue is required"),
  start_datetime: yup.date().required("Start date is required"),
  end_datetime: yup
    .date()
    .required("End date cannot be before start date")
    .min(yup.ref("start_datetime"), "End date cannot be before start date"),
  banner: yup.mixed().required("Event banner is required"),
  type: yup.string().required("Please select Free or Paid"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when("type", {
      is: "Paid",
      then: (schema) => schema.required("Price is required").min(1, "Minimum price is $1"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default function CreateEventForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const selectedCountry = watch("country");
  const selectedType = watch("type");

  // ==================== MOCK DATA ====================
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
    { id: 10, name: "Sports" },
  ];

  const mockTags = [
    { id: 1, name: "Workshop" },
    { id: 2, name: "Conference" },
    { id: 3, name: "Festival" },
    { id: 4, name: "Networking" },
    { id: 5, name: "Competition" },
    { id: 6, name: "Concert" },
    { id: 7, name: "Seminar" },
    { id: 8, name: "Exhibition" },
  ];
  // ===================================================

  // Load mock categories and tags
  useEffect(() => {
    setCategories(mockCategories);
    setTags(mockTags);
  }, []);

  // Handle cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const country = countryData.data.find((c) => c.country === selectedCountry);
      setCities(country ? country.cities : []);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const bannerBase64 =
        data.banner && data.banner[0] ? await fileToBase64(data.banner[0]) : null;

      const payload = {
        id: Date.now(), // Generate fake ID
        organizer: data.organizer,
        title: data.title,
        description: data.description,
        category: data.category,
        country: data.country,
        city: data.city,
        venue: data.venue,
        start_datetime: data.start_datetime,
        end_datetime: data.end_datetime,
        tags: data.tags || [],
        banner: bannerBase64,
        type: data.type,
        price: data.type === "Paid" ? Number(data.price) : 0,
        createdAt: new Date().toISOString(),
        views: 0,
        rating: 0,
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Save to localStorage so it appears in other components
      const existingEvents = JSON.parse(localStorage.getItem("mockEvents") || "[]");
      existingEvents.unshift(payload); // Add to beginning
      localStorage.setItem("mockEvents", JSON.stringify(existingEvents));

      alert("✅ Event Created Successfully! Waiting For Admin Approval.");
      console.log("Event Created (Mock):", payload);

      reset();
      onClose();
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              Create New Event
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Organizer */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer</label>
                <input
                  {...register("organizer")}
                  type="text"
                  placeholder="Organizer name"
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                />
                <p className="text-red-500 text-xs">{errors.organizer?.message}</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Event title"
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                />
                <p className="text-red-500 text-xs">{errors.title?.message}</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description")}
                  rows="3"
                  placeholder="Short description of your event..."
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                />
                <p className="text-red-500 text-xs">{errors.description?.message}</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={cat.id || `cat-${index}`} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs">{errors.category?.message}</p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <label
                      key={tag.id || `tag-${index}`}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer text-sm hover:bg-gray-200"
                    >
                      <input type="checkbox" value={tag.name} {...register("tags")} />
                      <span>{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Country & City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                <select
                  {...register("country")}
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                >
                  <option value="">Select Country</option>
                  {countryData.data.map((c, index) => (
                    <option key={index} value={c.country}>
                      {c.country}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs">{errors.country?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <select
                  {...register("city")}
                  disabled={!selectedCountry}
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm disabled:bg-gray-100"
                >
                  <option value="">Select City</option>
                  {cities.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs">{errors.city?.message}</p>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Complete Venue Address
                </label>
                <input
                  {...register("venue")}
                  type="text"
                  placeholder="Event venue (e.g. Karachi Expo Center)"
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                />
                <p className="text-red-500 text-xs">{errors.venue?.message}</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    {...register("start_datetime")}
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.start_datetime?.message}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    End Date & Time
                  </label>
                  <input
                    {...register("end_datetime")}
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                  />
                  <p className="text-red-500 text-xs">{errors.end_datetime?.message}</p>
                </div>
              </div>

              {/* Upload Banner */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Event Banner (Image)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  {...register("banner")} 
                  className="w-full text-sm border rounded-lg p-2" 
                />
                <p className="text-red-500 text-xs">{errors.banner?.message}</p>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Event Type
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" value="Free" {...register("type")} />
                    <span>Free</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" value="Paid" {...register("type")} />
                    <span>Paid</span>
                  </label>
                </div>
                <p className="text-red-500 text-xs">{errors.type?.message}</p>
              </div>

              {/* Price (only if Paid) */}
              {selectedType === "Paid" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Ticket Price (USD)
                  </label>
                  <input
                    type="number"
                    {...register("price")}
                    className="w-full px-3 py-2 rounded-lg border focus:ring focus:ring-gray-400 text-sm"
                    min={1}
                    placeholder="Enter ticket price"
                  />
                  <p className="text-red-500 text-xs">{errors.price?.message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 text-base mt-2"
              >
                {loading ? "Creating Event..." : "Create & Submit Event"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}