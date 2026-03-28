import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const TreatmentSection = () => {
  return (
    <motion.section 
      className="relative py-20 min-h-[500px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=2070&auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg"
        >
          Our Treatment in Action
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto drop-shadow-md leading-relaxed"
        >
          Expert Physiotherapy Care Delivered at Your Doorstep
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center space-y-2 p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
          >
            <FaHome className="text-4xl text-teal-400" />
            <span className="font-semibold text-lg">Home Visits</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center space-y-2 p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
          >
            <FaHandshake className="text-4xl text-blue-400" />
            <span className="font-semibold text-lg">Personalized Care</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center space-y-2 p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
          >
            <FaShieldAlt className="text-4xl text-green-400" />
            <span className="font-semibold text-lg">Proven Results</span>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg font-medium drop-shadow-md"
        >
          Professional physiotherapy treatment in action - book your session today!
        </motion.p>
      </div>
    </motion.section>
  );
};

export default TreatmentSection;

