import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaAward, FaCalendarCheck, FaWhatsapp, FaMapMarkerAlt, FaHome, FaClinicMedical } from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const Hero = () => {
  const { profile, settings } = usePractice();

  const getServiceBadge = () => {
    switch (settings.serviceMode) {
      case 'home_visits':
        return {
          icon: <FaHome className="text-teal-500" />,
          label: 'Home Visits Only',
          sub: 'Physiotherapy delivered directly to your doorstep',
          bg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700'
        };
      case 'clinic':
        return {
          icon: <FaClinicMedical className="text-blue-500" />,
          label: 'In-Clinic Consultations',
          sub: 'Visit our fully equipped modern clinic',
          bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
        };
      case 'both':
      default:
        return {
          icon: <span className="flex items-center space-x-1"><FaHome className="text-teal-500" /><span className="text-xs">+</span><FaClinicMedical className="text-blue-500" /></span>,
          label: 'Home Visits & Clinic Care',
          sub: 'Flexible consultations: at home or in clinic',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
        };
    }
  };

  const serviceBadge = getServiceBadge();
  const imageUrl = profile?.image
    ? (profile.image.startsWith('http') || profile.image.startsWith('data:')
        ? profile.image
        : (profile.image.startsWith('/uploads')
            ? (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? `http://localhost:5000${profile.image}` : profile.image)
            : profile.image))
    : '/doctor-photo.png';

  return (
    <section id="home" className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Doctor Profile Card / Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative group max-w-full">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-400 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500"></div>

              {/* Main Profile Picture Card */}
              <div className="relative w-60 h-76 sm:w-72 sm:h-92 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-3 shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={imageUrl}
                  alt={profile.name}
                  className="w-full h-full object-contain object-bottom drop-shadow-md rounded-2xl"
                  onError={(e) => {
                    if (e.target.src !== window.location.origin + '/doctor-photo.png') {
                      e.target.src = '/doctor-photo.png';
                    } else {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />

                {/* Verified Credential Tag on Avatar */}
                <div className="absolute bottom-4 sm:bottom-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-teal-200 dark:border-teal-700/50 flex items-center space-x-2">
                  <FaAward className="text-teal-500 text-xs sm:text-sm" />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Certified Practitioner
                  </span>
                </div>
              </div>

              {/* Base Accent */}
              <div className="w-40 sm:w-48 h-3 sm:h-4 mx-auto bg-teal-500/20 dark:bg-teal-400/10 rounded-[100%] blur-sm mt-3"></div>
            </div>

            {/* Dynamic Service Availability Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-4 sm:mt-6 px-4 py-2.5 rounded-2xl border text-center shadow-sm flex items-center space-x-3 max-w-sm ${serviceBadge.bg}`}
            >
              <span className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm sm:text-base flex-shrink-0">
                {serviceBadge.icon}
              </span>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold leading-tight">{serviceBadge.label}</p>
                <p className="text-[11px] sm:text-xs opacity-85 leading-tight mt-0.5">{serviceBadge.sub}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Name, Credentials & Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6"
          >
            {/* Qualification Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                B.P.T (Bachelor of Physiotherapy)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                CDNT (Certified Dry Needling Therapist)
              </span>
            </div>

            {/* Doctor's Name */}
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {profile.name}
              </h1>
              <p className="text-base sm:text-xl font-medium text-teal-600 dark:text-teal-400 mt-1.5 sm:mt-2">
                {profile.title}
              </p>
            </div>

            {/* Doctor's Mission / Bio */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile.bio || "Specialized clinical rehabilitation providing evidence-based orthopedic, neurological, cardiac, and sports physical therapy tailored for fast, pain-free recovery."}
            </p>

            {/* Key Clinical Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/60 text-left">
                <p className="text-teal-600 dark:text-teal-400 font-bold text-base sm:text-lg">1-on-1</p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">Personalized Therapy</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/60 text-left">
                <p className="text-blue-600 dark:text-blue-400 font-bold text-base sm:text-lg">Fast Relief</p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">Targeted Needling & Rehab</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/60 text-left col-span-2 sm:col-span-1">
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">Direct Care</p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">Doorstep or In-Clinic</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg shadow-teal-500/25 hover:shadow-xl transition"
              >
                <FaCalendarCheck className="mr-2" />
                Book an Appointment
              </motion.a>

              <motion.a
                href={`https://wa.me/91${settings.phone || '9392473392'}?text=Hello%20Dr.%20Shaik,%20I%20would%20like%20to%20consult%20regarding%20physiotherapy.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-teal-500 shadow-sm transition"
              >
                <FaWhatsapp className="text-green-500 text-lg mr-2" />
                Direct WhatsApp
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;