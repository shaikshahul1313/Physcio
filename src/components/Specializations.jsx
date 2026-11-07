import React from 'react';
import { motion } from 'framer-motion';
import { FaBone, FaBrain, FaHeartbeat, FaRunning, FaArrowRight } from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const specializationsData = [
  {
    id: 'Orthopedics',
    title: 'Orthopedics',
    subtitle: 'Joints, Spine & Musculoskeletal Pain',
    description: 'Expert targeted therapy for chronic joint stiffness, acute sprains, and post-fracture mobility.',
    icon: <FaBone className="text-3xl text-teal-500" />,
    badgeColor: 'bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    highlightItems: ['Shoulder', 'Elbow', 'Wrist', 'Knee', 'Ankle'],
  },
  {
    id: 'Neurology',
    title: 'Neurology',
    subtitle: 'Stroke & Neurological Rehabilitation',
    description: 'Comprehensive neuro-rehab focused on motor relearning, balance restoration, and independent daily living.',
    icon: <FaBrain className="text-3xl text-blue-500" />,
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    highlightItems: ['Stroke Recovery', 'Hemiplegia', 'Neuropathy', 'Bell’s Palsy'],
  },
  {
    id: 'Cardiology',
    title: 'Cardiology',
    subtitle: 'Cardiopulmonary Conditioning',
    description: 'Monitored cardiovascular rehabilitation, aerobic capacity restoration, and chest mobility exercises.',
    icon: <FaHeartbeat className="text-3xl text-rose-500" />,
    badgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    highlightItems: ['Cardiac Rehab', 'Post-Surgery Mobility', 'Chest Therapy', 'Endurance'],
  },
  {
    id: 'Sports',
    title: 'Sports Physiotherapy',
    subtitle: 'Athletic Recovery & Injury Prevention',
    description: 'Evidence-based conditioning for athletes to safely return to peak performance and prevent reinjury.',
    icon: <FaRunning className="text-3xl text-amber-500" />,
    badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    highlightItems: ['ACL & Ligaments', 'Muscle Tears', 'Runner’s Knee', 'Tennis Elbow'],
  },
];

const Specializations = () => {
  const { selectConditionForBooking } = usePractice();

  return (
    <section id="specializations" className="py-20 bg-gray-50/70 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching wireframe "Specializat" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 mb-3">
            <span>Specialized Clinical Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Clinical Specializations
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Targeted rehabilitation tailored to specific bodily conditions, backed by advanced manual techniques and dry needling.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializationsData.map((spec, index) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Title */}
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-700/60 flex items-center justify-center mb-5 border border-gray-100 dark:border-gray-600">
                  {spec.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {spec.title}
                </h3>
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mt-1 mb-3">
                  {spec.subtitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {spec.description}
                </p>

                {/* Specific Conditions Chips (Directly from Wireframe) */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {spec.highlightItems.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Pre-selects condition and scrolls to booking */}
              <button
                onClick={() => selectConditionForBooking(spec.id)}
                className="w-full mt-2 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 transition-colors duration-200"
              >
                <span>Book for {spec.id}</span>
                <FaArrowRight className="text-xs" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Specializations;
