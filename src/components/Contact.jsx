import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Get in touch for personalized recovery solutions</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-teal-500 mr-4" size={24} />
                <div>
                  <p className="font-semibold">Address</p>
Physio Pulse Clinic, Home service, India
                </div>

              </div>
              <div className="flex items-center">
                <FaPhone className="text-teal-500 mr-4" size={24} />
                <div>
                  <p className="font-semibold">Phone</p>
9392473392
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-teal-500 mr-4" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
shaheedshaik236@gmail.com
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Clinic Timings</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <motion.a
                href="https://wa.me/919392473392?text=Hello%20I%20would%20like%20to%20book%20a%20physiotherapy%20session"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="whatsapp-btn"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                href="tel:+919392473392"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="call-btn"
              >
                <FaPhone className="mr-2" />
                Call Now
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center"
          >
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FaMapMarkerAlt size={48} className="mx-auto mb-4" />
              <p>Google Maps Placeholder</p>
              <p>Interactive map would be embedded here</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;