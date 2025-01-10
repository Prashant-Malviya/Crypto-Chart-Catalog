import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SettingsProvider } from "./contexts/SettingsContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/AboutUs";
import Contact from "./pages/ContactUs";

function App() {
  return (
    <SettingsProvider>
      <div className="bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="relative top-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
