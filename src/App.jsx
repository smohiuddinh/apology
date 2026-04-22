import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventManagement from "./components/apology";
import FeaturedEvents from "./components/home";
import Home from "./components/home";
import AuthPage from "./components/auth";
import About from './components/About';
import Contact from "./components/contact";
import EventDetails from './components/event-details';
import AllEvents from "./components/FeaturedEvents";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<EventManagement />} />
        <Route path="/featured-events" element={<AllEvents />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />

        <Route path="/about" element={<About />} />
        <Route
          path="/event/:id"
          element={
              <EventDetails />
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
