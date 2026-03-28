import React from 'react';
import { motion } from 'framer-motion';

const Programs = () => {
  const programs = [
    {
      title: 'Desk Worker Recovery',
      description: 'Targeted exercises to relieve neck, back, and shoulder pain from prolonged sitting.',
      duration: '4 weeks',
      benefits: ['Reduced pain', 'Improved posture', 'Increased energy']
    },
    {
      title: 'Sports Injury Rehab',
      description: 'Accelerated recovery programs for athletes with ligament, tendon, or muscle injuries.',
      duration: '6-8 weeks',
      benefits: ['Faster healing', 'Strength restoration', 'Performance enhancement']
    },
    {
      title: 'Posture Correction',
      description: 'Comprehensive program to realign your spine and improve overall body mechanics.',
      duration: '8 weeks',
      benefits: ['Better alignment', 'Pain reduction', 'Long-term health']
    },
    {
      title: 'Senior Mobility',
      description: 'Gentle exercises designed to maintain mobility and independence for older adults.',
      duration: '12 weeks',
      benefits: ['Enhanced mobility', 'Fall prevention', 'Quality of life improvement']
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Recovery Programs</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Tailored physiotherapy programs for your specific needs</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">{program.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{program.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Duration:</strong> {program.duration}</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400">
                {program.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;