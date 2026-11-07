import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { submitBooking } from '../services/api';
import { usePractice } from '../context/PracticeContext';

const conditionOptions = {
  Orthopedics: [
    'Shoulder',
    'Elbow',
    'Wrist',
    'Knee',
    'Ankle',
    'Cervical / Neck Pain',
    'Lower Back / Lumbar'
  ],
  Neurology: [
    'Stroke & Hemiplegia',
    'Post-Stroke Rehabilitation',
    'Neuropathy & Numbness',
    'Bell’s Palsy / Facial Rehab',
    'Balance & Gait Disorder'
  ],
  Cardiology: [
    'Cardiac Rehabilitation',
    'Post-Cardiac Surgery Recovery',
    'Chest Physiotherapy & Breathing',
    'Hypertension Conditioning',
    'Aerobic Endurance Training'
  ],
  Sports: [
    'ACL & Ligament Tear',
    'Muscle Strain & Sprain',
    'Tennis / Golfer’s Elbow',
    'Runner’s Knee (Patellofemoral)',
    'Post-Match Recovery & Mobility'
  ]
};

const Booking = () => {
  const { settings, selectedCondition, setSelectedCondition } = usePractice();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    condition: 'Orthopedics',
    subCondition: 'Shoulder',
    description: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync when user clicked a specialization card
  useEffect(() => {
    if (selectedCondition?.condition && conditionOptions[selectedCondition.condition]) {
      setFormData((prev) => ({
        ...prev,
        condition: selectedCondition.condition,
        subCondition: selectedCondition.subCondition || conditionOptions[selectedCondition.condition][0]
      }));
    }
  }, [selectedCondition]);

  const handleConditionChange = (conditionKey) => {
    setFormData((prev) => ({
      ...prev,
      condition: conditionKey,
      subCondition: conditionOptions[conditionKey][0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter the patient name.');
      return;
    }
    if (!formData.age || formData.age <= 0) {
      toast.error('Please enter a valid age.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save booking to local backend & dispatch email to shaheedshaik236@gmail.com
      await submitBooking({
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        condition: formData.condition,
        subCondition: formData.subCondition,
        description: formData.description,
        phone: formData.phone || settings.phone || '9392473392',
        email: formData.email || settings.email || 'shaheedshaik236@gmail.com',
        date: formData.date,
        serviceMode: settings.serviceMode === 'home_visits' ? 'Home Visit' : settings.serviceMode === 'clinic' ? 'In-Clinic' : 'Home Visit / Clinic'
      });

      // 2. Format clinical referral message for WhatsApp
      const adminPhone = (settings.phone || '9392473392').replace(/[^0-9]/g, '');
      const waMessage = `*New Appointment Request - Dr. Shaik Mohamed Shaheed*

*Patient Name:* ${formData.name}
*Age / Gender:* ${formData.age} years / ${formData.gender}
*Specialization:* ${formData.condition}
*Specific Area/Condition:* ${formData.subCondition}
*Preferred Date:* ${formData.date}
*Symptoms / History:* ${formData.description || 'None provided'}
*Phone:* ${formData.phone || 'Provided via WhatsApp'}

_Submitted via Physio Pulse Website_`;

      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/91${adminPhone}?text=${encodedMessage}`;

      // 3. Open WhatsApp for instant doctor communication
      window.open(whatsappUrl, '_blank');

      toast.success('Appointment details saved! Opening WhatsApp for instant confirmation...');
      setSubmitted(true);
    } catch (error) {
      console.error('Booking submission error:', error);
      // Fallback: Still open WhatsApp even if local server email fails
      const adminPhone = (settings.phone || '9392473392').replace(/[^0-9]/g, '');
      const waMessage = `*Appointment Request:* ${formData.name} (${formData.age}y/${formData.gender}) - ${formData.condition} (${formData.subCondition}). ${formData.description}`;
      window.open(`https://wa.me/91${adminPhone}?text=${encodeURIComponent(waMessage)}`, '_blank');
      toast.success('Connecting directly to WhatsApp...');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      condition: 'Orthopedics',
      subCondition: 'Shoulder',
      description: '',
      phone: '',
      email: '',
      date: new Date().toISOString().split('T')[0],
    });
    setSubmitted(false);
  };

  return (
    <section id="booking" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wireframe Heading "Book an appointment" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3">
            <span>Fast Consultation Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Book an Appointment
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Fill out your details below. You will receive immediate WhatsApp & Email confirmation with Dr. Shaik Mohamed Shaheed.
          </p>
        </motion.div>

        {/* Main Booking Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-teal-50/50 via-white to-blue-50/40 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-10"
        >
          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FaCheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Booking Request Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto text-sm sm:text-base">
                Your appointment request has been recorded and WhatsApp opened to chat directly with Dr. Shaik Mohamed Shaheed.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Age (As drawn in Wireframe) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-8">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 32"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  />
                </div>
              </div>

              {/* Row 2: Gender & Contact Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition ${
                          formData.gender === g
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-teal-500'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  />
                </div>
              </div>

              {/* Condition Section (Interactive Cascading Selector from Wireframe) */}
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Select Primary Medical Condition <span className="text-red-500">*</span>
                </label>
                
                {/* Primary Category Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.keys(conditionOptions).map((catKey) => {
                    const isSelected = formData.condition === catKey;
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => handleConditionChange(catKey)}
                        className={`p-3 rounded-xl border text-sm font-bold transition flex items-center justify-center text-center ${
                          isSelected
                            ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white border-transparent shadow-md'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-teal-400'
                        }`}
                      >
                        {catKey}
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Condition / Body Region Selector (Shoulder, Elbow, Knee, Stroke, etc.) */}
                <div className="p-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-2xl border border-gray-200/80 dark:border-gray-600">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">
                    Specific Area / Concern for <span className="text-teal-600 dark:text-teal-400">{formData.condition}</span>:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {conditionOptions[formData.condition]?.map((sub) => {
                      const isSubSelected = formData.subCondition === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setFormData({ ...formData, subCondition: sub })}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                            isSubSelected
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-teal-400'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: Description (Wireframe Textarea) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Description of Symptoms & Pain History
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe where the pain is located, how long you have had it, and any previous treatments..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                ></textarea>
              </div>

              {/* Submit Button (Wireframe: [ Request in 💬/@ ]) */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-[length:200%_auto] hover:bg-right shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaWhatsapp className="text-xl text-green-400" />
                      <span>Request in WhatsApp & Send Email</span>
                      <FaEnvelope className="text-sm opacity-80" />
                    </>
                  )}
                </motion.button>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2.5">
                  Notification sent to <span className="font-semibold text-gray-700 dark:text-gray-300">shaheedshaik236@gmail.com</span> & WhatsApp instant chat.
                </p>
              </div>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default Booking;
