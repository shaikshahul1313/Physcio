import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';

const ExerciseLibrary = () => {
  const [filter, setFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const exercises = [
    {
      title: "Neck Stretch",
      level: "Beginner",
      description: "Gentle stretch to relieve neck tension and stiffness from screen time.",
      video: "https://www.youtube.com/watch?v=2NOsE-VPpkE"
    },
    {
      title: "Lower Back Mobility",
      level: "Intermediate",
      description: "Exercises to improve lumbar flexibility and reduce posture strain.",
      video: "https://www.youtube.com/watch?v=4BOTvaRaDjI"
    },
    {
      title: "Shoulder Rotation",
      level: "Beginner",
      description: "Rotational movements for rotator cuff and shoulder mobility.",
      video: "https://www.youtube.com/watch?v=6jHsraw2NIk"
    },
    {
      title: "Hamstring Stretch",
      level: "Beginner",
      description: "Safe stretching techniques to lengthen tight hamstring muscles.",
      video: "https://www.youtube.com/watch?v=v9j4q4zWvH0"
    },
    {
      title: "Core Strengthening",
      level: "Intermediate",
      description: "Build deep core stability and pelvic alignment for long-term health.",
      video: "https://www.youtube.com/watch?v=1919eTCoESo"
    },
    {
      title: "Balance Training",
      level: "Advanced",
      description: "Proprioceptive exercises to enhance joint stability and prevent falls.",
      video: "https://www.youtube.com/watch?v=2k3F6aY7R2k"
    }
  ];

  const filteredExercises = filter === 'All' ? exercises : exercises.filter(ex => ex.level === filter);

  return (
    <section id="exercises" className="py-16 sm:py-20 bg-gray-50/70 dark:bg-gray-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 mb-3">
            <span>Video Rehabilitation Routines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Exercise & Mobility Library
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Discover guided exercises tailored to your recovery needs and injury prevention.
          </p>
        </motion.div>

        {/* Filter Chips - Fully Responsive & Non-Overflowing */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 px-2">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === level
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-teal-400'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-900">
                <img 
                  src={`https://img.youtube.com/vi/${getVideoId(exercise.video)}/0.jpg`} 
                  alt={exercise.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-90"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVideo(exercise)}
                  aria-label={`Play video for ${exercise.title}`}
                  className="absolute inset-0 m-auto flex items-center justify-center bg-black/55 hover:bg-black/75 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-2xl border-2 sm:border-3 border-white transition cursor-pointer"
                >
                  <FaPlay size={20} className="ml-1 text-teal-400" />
                </motion.button>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {exercise.level}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {exercise.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {exercise.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal (Mobile Responsive) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-2xl w-full mx-auto shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-600 dark:text-gray-300 flex items-center justify-center transition cursor-pointer"
                  aria-label="Close video"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.video)}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExerciseLibrary;