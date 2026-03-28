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
      description: "Gentle stretch to relieve neck tension",
      video: "https://www.youtube.com/watch?v=2NOsE-VPpkE"
    },
    {
      title: "Lower Back Mobility",
      level: "Intermediate",
      description: "Exercises to improve lower back flexibility",
      video: "https://www.youtube.com/watch?v=4BOTvaRaDjI"
    },
    {
      title: "Shoulder Rotation",
      level: "Beginner",
      description: "Rotational movements for shoulder mobility",
      video: "https://www.youtube.com/watch?v=6jHsraw2NIk"
    },
    {
      title: "Hamstring Stretch",
      level: "Beginner",
      description: "Stretch to lengthen hamstring muscles",
      video: "https://www.youtube.com/watch?v=v9j4q4zWvH0"
    },
    {
      title: "Core Strengthening",
      level: "Intermediate",
      description: "Build core stability and strength",
      video: "https://www.youtube.com/watch?v=1919eTCoESo"
    },
    {
      title: "Balance Training",
      level: "Advanced",
      description: "Improve balance and proprioception",
      video: "https://www.youtube.com/watch?v=2k3F6aY7R2k"
    }
  ];

  const filteredExercises = filter === 'All' ? exercises : exercises.filter(ex => ex.level === filter);

  return (
    <section id="exercises" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Exercise Library</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover exercises tailored to your recovery needs</p>
        </motion.div>
        <div className="flex justify-center mb-8">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 mx-2 rounded-full font-medium transition-colors ${
                filter === level ? 'bg-teal-500 text-white' : 'bg-white dark:bg-gray-700 text-teal-500 border border-teal-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={`https://img.youtube.com/vi/${getVideoId(exercise.video)}/0.jpg`} 
                  alt={exercise.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedVideo(exercise)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full w-20 h-20 shadow-2xl border-4 border-white"
                >
                  <FaPlay size={28} />
                </motion.button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">{exercise.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exercise.level}</p>
                <p className="text-gray-700 dark:text-gray-300">{exercise.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-2xl w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400">{selectedVideo.title}</h3>
                <button onClick={() => setSelectedVideo(null)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.video)}`}
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