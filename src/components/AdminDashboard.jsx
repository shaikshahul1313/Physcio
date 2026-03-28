import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createSuccessStory, getSuccessStories, deleteSuccessStory } from '../services/api';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [loadingStories, setLoadingStories] = useState(true);

  React.useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await getSuccessStories();
      setStories(data);
    } catch (error) {
      toast.error('Failed to fetch stories');
    } finally {
      setLoadingStories(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSuccessStory(formData);
      toast.success('Story added successfully!');
      setFormData({ title: '', description: '', image: null });
      fetchStories();
    } catch (error) {
      toast.error('Failed to add story');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!confirm('Delete this story?')) return;
    try {
      await deleteSuccessStory(id);
      toast.success('Story deleted!');
      fetchStories();
    } catch (error) {
      toast.error('Failed to delete story');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Add Story Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Success Story</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Story'}
          </motion.button>
        </form>
      </motion.div>

      {/* Stories List */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl overflow-y-auto max-h-[600px]"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Success Stories ({stories.length})</h2>
        {loadingStories ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : stories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">No success stories yet. Add one above!</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <div key={story.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
{story.image && (
                  <img src={story.image ? `http://localhost:5000${story.image}` : ''} alt={story.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
