import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSuccessStories } from '../services/api';
import { toast } from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await getSuccessStories();
      setStories(data);
    } catch (error) {
      toast.error('Failed to load success stories');
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-xl text-gray-600 dark:text-gray-300">Real results from our clients, managed by admin</p>
        </motion.div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : stories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <FaImage className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No success stories yet. Check back soon!</p>
            <p className="text-sm text-gray-400 mt-2">Admin can add stories from /admin</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {story.image && (
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={`http://localhost:5000${story.image}`} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{story.description}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Added: {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;
