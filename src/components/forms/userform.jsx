import { useState } from "react";

export default function TicketModal({ isOpen, onClose, onSubmit, event }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "", people: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold mb-1">
          Get Free Ticket - {event?.title}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Register to get your free entry pass
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* 👇 NEW FIELD */}
          <input
            name="people"
            type="number"
            min="1"
            max="10"
            placeholder="Number of People"
            value={form.people}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Get Ticket
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}