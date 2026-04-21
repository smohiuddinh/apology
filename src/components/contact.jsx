import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import contactImage from "../assets/3.jpg";
import Navbar from './Navbar';

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required").min(3, "Name is too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required").min(5, "Too short"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Simulate API call delay
      setIsSubmitting(true); // Note: isSubmitting is from formState, but we can simulate

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake network delay

      console.log("Contact Form Submitted (Mock):", data);

      // Simulate successful submission
      setServerMessage("✅ Thank you! Your message has been received. We'll get back to you soon.");
      setIsSuccess(true);
      
      reset(); // Clear the form

    } catch (error) {
      console.error("Error sending message:", error);
      setServerMessage("⚠️ Something went wrong. Please try again later.");
      setIsSuccess(false);
    } finally {
      // Reset submitting state after delay
      setTimeout(() => {
        // We don't have real isSubmitting control here, but form handles it
      }, 100);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
                <Navbar />
      
      {/* Header / Banner Section */}
      <div
        className="relative bg-cover bg-center py-24 text-center"
        style={{ backgroundImage: `url(${contactImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Contact Happenings
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left Side - Contact Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Get In Touch</h2>
          <p className="text-gray-600">
            Have questions or need help? Reach out to us using the information below or
            send us a message through the form.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">Address</h4>
              <p className="text-gray-500">Karachi, Pakistan</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-500">+92 317 4810274</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-500">happeningmatz@gmail.com</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Send Us a Message</h2>
          <p className="text-gray-500 mb-8">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject"
                {...register("subject")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <textarea
                rows="5"
                placeholder="Your Message"
                {...register("message")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition disabled:opacity-50"
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </motion.button>

            {serverMessage && (
              <p
                className={`text-center mt-4 font-medium ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {serverMessage}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}