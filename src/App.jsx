import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventManagement from "./components/apology";
import FeaturedEvents from "./components/home";
import Home from "./components/home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<EventManagement />} />
        <Route path="/featured" element={<FeaturedEvents />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;