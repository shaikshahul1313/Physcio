import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      problem: 'Chronic back pain',
      recoveryTime: '6 weeks',
      review: 'Recovery Lab transformed my life. The personalized program helped me get back to my active lifestyle.',
      painReduction: '8/10 -> 2/10',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      problem: 'Knee injury from running',
      recoveryTime: '4 weeks',
      review: 'Professional care and modern approach. I was back running stronger than before.',
      painReduction: '9/10 -> 1/10',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      problem: 'Neck and shoulder tension',
      recoveryTime: '3 weeks',
      review: 'The exercises were easy to follow and the results were amazing. Highly recommend.',
      painReduction: '7/10 -> 1/10',
      rating: 5,
    },
  ];

  return (
    <section id="success" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Real results from our recovery programs.</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center">
                {Array.from({ length: testimonial.rating }).map((_, ratingIndex) => (
                  <FaStar key={ratingIndex} className="text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-700 dark:text-gray-300">"{testimonial.review}"</p>
              <div className="mb-4">
                <p className="font-semibold text-teal-600 dark:text-teal-400">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.problem}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recovery time: {testimonial.recoveryTime}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pain reduction: {testimonial.painReduction}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
