import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const catalogTxt = "CATALOG";

  return (
    <nav className="bg-gray-900 text-white fixed min-w-full w-full z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <motion.div
                style={{ display: "inline-block" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {catalogTxt.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
