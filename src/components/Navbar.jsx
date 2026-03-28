import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaHeartbeat } from 'react-icons/fa';

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

  return (
    <nav className="fixed top-0 w-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <FaHeartbeat className="text-teal-500 text-xl animate-pulse" />
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-bold text-xl">Physio Pulse</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#programs" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Programs</a>
              <a href="#exercises" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Exercises</a>
              <a href="#success" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Success Stories</a>
              <a href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                Book Appointment
              </motion.button>
              <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 p-2">
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 p-2">
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#programs" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Programs</a>
            <a href="#exercises" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Exercises</a>
            <a href="#success" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Success Stories</a>
            <a href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Admin</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow w-full mt-4"
            >
              Book Appointment
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;