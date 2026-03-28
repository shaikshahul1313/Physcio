import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  message: '',
};

const Booking = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, phone, service, date, time } = formData;

    // Validation
    if (!name || !email || !phone || !service || !date || !time) {
      toast.error('Please fill all required fields.');
      return;
    }

    setIsLoading(true);

    // Format WhatsApp message
    const message = `Hello, I want to book a session.

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}
Message: ${formData.message || 'N/A'}`;

    const phoneNumber = '919392473392'; // Admin number without +
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    toast.success('Opening WhatsApp with your booking details...');

    // Reset form and show success
    setFormData(initialFormData);
    setSubmitted(true);
    
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }
    
    resetTimerRef.current = window.setTimeout(() => {
      setSubmitted(false);
    }, 5000);

    setIsLoading(false);
  };

  return (
    <section id="booking" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Book Your Session</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Take the first step towards pain-free living via WhatsApp.</p>
        </motion.div>
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="rounded-lg bg-gradient-to-br from-teal-50 to-blue-50 p-8 shadow-lg dark:from-gray-700 dark:to-gray-600"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Service Type *</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select a service</option>
                  <option value="initial-consultation">Initial Consultation</option>
                  <option value="follow-up">Follow-up Session</option>
                  <option value="recovery-program">Recovery Program</option>
                  <option value="sports-rehab">Sports Rehabilitation</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Date *</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <div>
                <label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Time *</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Message (Optional)
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-vertical transition-all dark:bg-gray-700 dark:border-gray-600" 
                  placeholder="Tell us more about your condition, pain areas, or preferences..."
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                type="submit" 
                disabled={isLoading}
                className="group relative rounded-full bg-gradient-to-r from-teal-500 to-green-500 px-10 py-4 font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:from-teal-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-3 mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Redirecting to WhatsApp...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a15.96 15.96 0 01-.09-.979 12.638 12.638 0 01-2.707-7.74A9 9 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    Book via WhatsApp
                  </>
                )}
              </motion.button>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                We'll receive your details instantly on WhatsApp 📱
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }} 
            className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center shadow-2xl dark:from-green-900/30 dark:to-emerald-900/30"
          >
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Z" />
              </svg>
            </div>
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Success!</div>
            <h3 className="mb-4 text-3xl font-bold text-green-800 dark:text-green-200">Booking Sent to WhatsApp</h3>
            <p className="text-lg text-green-700 dark:text-green-300 mb-6">Your appointment details have been sent. Check WhatsApp chat if not opened automatically.</p>
            <p className="text-sm text-green-600 mb-6">Admin will confirm shortly on +91 93924 73392</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Booking;
