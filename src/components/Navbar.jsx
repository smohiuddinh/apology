import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "../assets/logowhite.png"; 
import logoBlack from "../assets/logoblack.png"; 
import CreateEventForm from './forms/CreateEventForm';
import LanguageSelector from './selector/LanguageSelector';

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
  { name: "Events", path: "/featured-events" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/contact" },

  ];

  // ==================== MOCK NOTIFICATIONS ====================
  const mockNotifications = [
    {
      id: 101,
      title: "Your event 'Tech Summit' has been approved!",
      message: "Congratulations! Your event is now live.",
    },
    {
      id: 102,
      title: "New ticket sold for Music Fest",
      message: "Someone just purchased a ticket for your event.",
    },
    {
      id: 103,
      title: "Reminder: Photography Workshop tomorrow",
      message: "Don't forget your event starts at 11:00 AM.",
    },
  ];
  // ========================================================

  // Load mock notifications when user is logged in
  useEffect(() => {
    if (user?.id) {
      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, [user?.id]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    
    // Simulate marking notifications as seen (just close the badge effect)
    if (!notificationsOpen && notifications.length > 0) {
      // In real app this would call API, here we just keep the count for demo
      console.log("Notifications marked as seen (simulated)");
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md border-b border-gray-200" : "bg-transparent"
      }`}
    >
      {/* Decorative orange line */}
      {!scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-2 flex justify-center pointer-events-none">
          <div className="bg-orange-300 h-2/114 rounded-full w-[90%] md:w-[10%] lg:w-[80%]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1">
        {/* Logo with hover scale */}
        <motion.div
          onClick={() => navigate("/")}
          className="cursor-pointer"
          whileHover={!scrolled ? { scale: 1.1 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={scrolled ? logoBlack : logoWhite}
            alt="logo"
            className="w-16 h-16 object-contain transition-all duration-300"
          />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className={`relative group ${
                scrolled ? "text-gray-700" : "text-white"
              } hover:text-orange-500 transition-colors`}
            >
              {l.name}
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all group-hover:w-full`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSelector />

          {/* Notifications */}
          {user && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenNotifications();
                }}
                className={`relative transition-colors ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 w-64 bg-white rounded-lg shadow-lg border mt-2 z-50"
                >
                  <div className="p-3 font-semibold border-b">Notifications</div>
                  {notifications.length ? (
                    notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => {
                          navigate(`/event/${notif.id}`);
                          setNotificationsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        {notif.title}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">No new notifications</div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* User Dropdown */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 font-semibold transition-colors ${
                  scrolled ? "text-gray-800 hover:text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                Hi, {user.fullname || user.name || "User"} <ChevronDown size={18} />
              </button>

              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 w-44 bg-white shadow-xl border rounded-lg mt-2 z-50"
                  >
                    <Link 
                      to="/my-tickets" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      My Tickets
                    </Link>
                    <Link 
                      to="/saved-events" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      Saved Events
                    </Link>
                    <button
                      onClick={() => {
                        setShowCreateEvent(true);
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Create Event
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-8 py-2 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 duration-200 transition-all ${
                scrolled 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 ${scrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="flex flex-col p-6 space-y-5 text-lg font-medium">
            {navLinks.map((l) => (
              <Link 
                key={l.name} 
                to={l.path} 
                onClick={() => setMobileOpen(false)}
              >
                {l.name}
              </Link>
            ))}

            <LanguageSelector />

            {user ? (
              <>
                <button 
                  onClick={() => { navigate("/my-tickets"); setMobileOpen(false); }} 
                  className="text-left"
                >
                  My Tickets
                </button>
                <button 
                  onClick={() => { navigate("/saved-events"); setMobileOpen(false); }} 
                  className="text-left"
                >
                  Saved Events
                </button>
                <button 
                  onClick={() => { setShowCreateEvent(true); setMobileOpen(false); }} 
                  className="px-4 py-2 rounded-full bg-blue-600 text-white text-center"
                >
                  Create Event
                </button>
                <button 
                  onClick={() => { onLogout(); setMobileOpen(false); }} 
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => { navigate("/login"); setMobileOpen(false); }} 
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-center"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      <CreateEventForm isOpen={showCreateEvent} onClose={() => setShowCreateEvent(false)} />
    </header>
  );
}