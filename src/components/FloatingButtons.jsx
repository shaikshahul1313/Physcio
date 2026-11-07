import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#booking';
    }
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center space-y-2.5 sm:space-y-3">
      {/* WhatsApp Quick Action */}
      <motion.button
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-all cursor-pointer"
        onClick={() => window.open('https://wa.me/919392473392?text=Hello%20Dr.%20Shaik,%20I%20would%20like%20to%20consult%20regarding%20physiotherapy.', '_blank')}
      >
        <FaWhatsapp size={24} />
      </motion.button>

      {/* Direct Call Button */}
      <motion.button
        title="Call Clinic"
        aria-label="Call Clinic"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all cursor-pointer"
        onClick={() => window.open('tel:+919392473392', '_blank')}
      >
        <FaPhone size={20} />
      </motion.button>

      {/* Fast Appointment Scroll */}
      <motion.button
        title="Book Appointment"
        aria-label="Book Appointment"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center transition-all cursor-pointer"
        onClick={scrollToBooking}
      >
        <FaCalendarAlt size={20} />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;