import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      <motion.button
        title="Chat with us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => window.open('https://wa.me/919392473392?text=Hello%20I%20would%20like%20to%20book%20a%20physiotherapy%20session', '_blank')}
      >
        <FaWhatsapp size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => window.open('tel:+919392473392', '_blank')}
      >
        <FaPhone size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
      >
        <FaCalendarAlt size={24} />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;