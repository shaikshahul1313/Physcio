import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaHandshake, FaShieldAlt, FaClinicMedical } from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const TreatmentSection = () => {
  const { settings } = usePractice();

  const getServiceBadgeInfo = () => {
    if (settings.serviceMode === 'home_visits') {
      return {
        icon: <FaHome className="text-4xl text-teal-400" />,
        title: 'Home Visits Only',
        subtitle: 'Treatment at your doorstep'
      };
    }
    if (settings.serviceMode === 'clinic') {
      return {
        icon: <FaClinicMedical className="text-4xl text-blue-400" />,
        title: 'In-Clinic Consultations',
        subtitle: 'Modern clinic facility'
      };
    }
    return {
      icon: <div className="flex space-x-1"><FaHome className="text-4xl text-teal-400" /><FaClinicMedical className="text-4xl text-blue-400" /></div>,
      title: 'Home Visits & Clinic Care',
      subtitle: 'Flexible care wherever you are'
    };
  };

  const badgeInfo = getServiceBadgeInfo();

  return (
    <motion.section 
      className="relative py-20 min-h-[500px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=2070&auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
        >
          Our Treatment in Action
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-200 drop-shadow-md leading-relaxed"
        >
          Expert Physiotherapy Care by Dr. Shaik Mohamed Shaheed
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15"
          >
            {badgeInfo.icon}
            <span className="font-bold text-lg mt-3">{badgeInfo.title}</span>
            <span className="text-xs text-gray-300 mt-1">{badgeInfo.subtitle}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15"
          >
            <FaHandshake className="text-4xl text-blue-400" />
            <span className="font-bold text-lg mt-3">Personalized Care</span>
            <span className="text-xs text-gray-300 mt-1">1-on-1 assessment and treatment</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15"
          >
            <FaShieldAlt className="text-4xl text-emerald-400" />
            <span className="font-bold text-lg mt-3">Proven Results</span>
            <span className="text-xs text-gray-300 mt-1">Evidence-based clinical recovery</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TreatmentSection;
