import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHome, FaClinicMedical } from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const Contact = () => {
  const { settings } = usePractice();

  const phoneNum = settings.phone || '9392473392';
  const whatsappNum = settings.whatsapp || settings.phone || '9392473392';
  const emailAddr = settings.email || 'shaheedshaik236@gmail.com';
  const cleanPhone = phoneNum.replace(/[^0-9]/g, '');
  const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wireframe Heading "Contact us" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 mb-3">
            <span>Direct Clinical Touchpoints</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contact Us & Clinic Location
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Reach out directly for consultations, home visit availability, or emergency pain relief.
          </p>
        </motion.div>

        {/* 2-Column Contact & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards & Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
              Get in Touch
            </h3>

            {/* Service Mode Callout */}
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 flex items-start space-x-3">
              <span className="p-2 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 rounded-xl shadow-sm text-base">
                {settings.serviceMode === 'clinic' ? <FaClinicMedical /> : <FaHome />}
              </span>
              <div>
                <p className="text-sm font-bold text-teal-900 dark:text-teal-200">
                  {settings.serviceMode === 'home_visits' ? 'Home Visits Available' : settings.serviceMode === 'clinic' ? 'In-Clinic Consultations' : 'Home Visits & Clinic Care'}
                </p>
                <p className="text-xs text-teal-700 dark:text-teal-300 mt-0.5">
                  {settings.serviceArea || 'Serving patients across the local area with full clinical care'}
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-teal-50 dark:bg-gray-700 rounded-xl text-teal-600 dark:text-teal-400">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address / Base</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                    {settings.clinicAddress || 'Physio Pulse Clinic, Home service, India'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-teal-50 dark:bg-gray-700 rounded-xl text-teal-600 dark:text-teal-400">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone / WhatsApp</p>
                  <a href={`tel:${cleanPhone}`} className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline mt-0.5 block">
                    +91 {phoneNum}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-teal-50 dark:bg-gray-700 rounded-xl text-teal-600 dark:text-teal-400">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direct Email</p>
                  <a href={`mailto:${emailAddr}`} className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline mt-0.5 block">
                    {emailAddr}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-teal-50 dark:bg-gray-700 rounded-xl text-teal-600 dark:text-teal-400">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Practice Timings</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                    {settings.timings || 'Monday - Saturday: 8:00 AM - 8:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/91${cleanWhatsapp}?text=Hello%20Dr.%20Shaik,%20I%20would%20like%20to%20inquire%20about%20treatment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition"
              >
                <FaWhatsapp size={18} />
                <span>WhatsApp Doctor</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 transition"
              >
                <FaPhone size={14} />
                <span>Call Directly</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Wireframe "Map" Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6 overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Location & Coverage Area</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Interactive Google Map view</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-700">
                Live Coverage
              </span>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700 bg-gray-100">
              <iframe
                title="Clinic Location Map"
                src={settings.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.471553580572!2d78.4746!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjguNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 px-2">
              Need directions or doorstep home visit confirmation? Contact us via WhatsApp or phone.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
