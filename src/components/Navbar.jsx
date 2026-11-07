import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/85 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/#home" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <FaHeartbeat className="text-xl animate-pulse" />
              </div>
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg sm:text-xl tracking-tight">
                Physio Pulse
              </span>
            </a>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
            <a
              href="/#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/#programs"
              onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Programs
            </a>
            <a
              href="/#exercises"
              onClick={(e) => { e.preventDefault(); scrollToSection('exercises'); }}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Exercises
            </a>
            <a
              href="/#success"
              onClick={(e) => { e.preventDefault(); scrollToSection('success'); }}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Success Stories
            </a>
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center leading-none"
            >
              Book Appointment
            </motion.button>
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={19} className="text-amber-400" /> : <FaMoon size={18} />}
            </button>
          </div>

          {/* Mobile Actions: Dark Mode & Hamburger Toggle */}
          <div className="md:hidden flex items-center space-x-1">
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={18} className="text-amber-400" /> : <FaMoon size={17} />}
            </button>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Fluid, Full Width, Highly Touch-Friendly) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              <a
                href="/#home"
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-gray-800/70 block px-4 py-3 rounded-xl text-base font-semibold transition"
              >
                Home
              </a>
              <a
                href="/#programs"
                onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-gray-800/70 block px-4 py-3 rounded-xl text-base font-semibold transition"
              >
                Programs
              </a>
              <a
                href="/#exercises"
                onClick={(e) => { e.preventDefault(); scrollToSection('exercises'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-gray-800/70 block px-4 py-3 rounded-xl text-base font-semibold transition"
              >
                Exercises
              </a>
              <a
                href="/#success"
                onClick={(e) => { e.preventDefault(); scrollToSection('success'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-gray-800/70 block px-4 py-3 rounded-xl text-base font-semibold transition"
              >
                Success Stories
              </a>
              <a
                href="/#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-gray-800/70 block px-4 py-3 rounded-xl text-base font-semibold transition"
              >
                Contact
              </a>
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('booking')}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 active:scale-98 text-white px-5 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FaCalendarCheck size={18} />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;