import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = login(credentials.username, credentials.password);
    setIsLoading(false);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-500 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/20 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30"
      >
        <div className="text-center mb-6 sm:mb-8">
          <FaLock className="mx-auto text-5xl sm:text-6xl text-white mb-3 sm:mb-4 opacity-90" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-sm text-white/80">Enter your credentials to access the practice console</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white mb-1.5">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white mb-1.5">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
              placeholder="Enter password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-teal-600 px-4 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Signing in...' : 'Sign In to Console'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;