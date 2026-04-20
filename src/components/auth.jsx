import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loginImage from "../assets/2.jpg";

// ✅ Validation Schemas
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

const registerSchema = yup.object().shape({
  fullname: yup.string().min(3, "At least 3 characters").required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role === "admin") {
        navigate("/Admin-Panel");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(mode === "login" ? loginSchema : registerSchema),
  });

  const handleAuthSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect based on role
    if (userData.role === "admin") {
      navigate("/Admin-Panel");
    } else {
      navigate("/");
    }
    reset();
  };

  const handleRegister = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock successful registration
      const newUser = {
        id: Date.now(),
        fullname: data.fullname,
        email: data.email,
        role: "user",           // Default role is user
        token: "mock-jwt-token-" + Date.now(),
      };

      handleAuthSuccess(newUser);
      alert("✅ Account created successfully!");

    } catch (err) {
      setErrorMsg("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock users for demo login
      const mockUsers = [
        {
          id: 1,
          fullname: "Mohiuddin Ahmed",
          email: "mohiuddin@gmail.com",
          password: "123456",
          role: "user",
        },
        {
          id: 2,
          fullname: "Admin User",
          email: "admin@happenings.com",
          password: "admin123",
          role: "admin",
        },
      ];

      const foundUser = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          fullname: foundUser.fullname,
          email: foundUser.email,
          role: foundUser.role,
          token: "mock-jwt-token-" + Date.now(),
        };
        handleAuthSuccess(userData);
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (err) {
      setErrorMsg("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (mode === "login") {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      setLoading(true);

      // Simulate Google login delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const googleUser = {
        id: Date.now(),
        fullname: decoded.name || "Google User",
        email: decoded.email,
        role: "user",
        token: "mock-google-token-" + Date.now(),
        picture: decoded.picture,
      };

      handleAuthSuccess(googleUser);
      alert("✅ Signed in with Google successfully!");

    } catch (err) {
      setErrorMsg("Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Left Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back 👋" : "Create Your Account 🚀"}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            {mode === "login"
              ? "Login to explore events and happenings"
              : "Join us to create and discover events"}
          </p>

          {errorMsg && (
            <p className="text-red-500 text-center mb-4 font-medium">{errorMsg}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {mode === "register" && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition"
                />
                {errors.fullname && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullname.message}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow-lg transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </motion.button>
          </form>

          {/* Google Login */}
          <div className="mt-6 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setErrorMsg("Google login failed")}
            />
          </div>

          {/* Toggle between Login & Register */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setErrorMsg("");
                    reset();
                  }}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    reset();
                  }}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Right Side Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 relative overflow-hidden"
      >
        <img
          src={loginImage}
          alt="Login Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-20 flex flex-col justify-center items-center text-center px-10">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Discover <span className="text-yellow-300">Exciting</span> Events Around You 🌍
          </h2>
          <p className="mt-6 text-white/90 max-w-md text-lg drop-shadow-md">
            Join Happenings today and never miss another event — connect, create, and celebrate moments that matter!
          </p>
        </div>
      </motion.div>
    </div>
  );
}