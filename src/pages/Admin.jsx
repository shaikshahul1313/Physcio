import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { FaHeartbeat, FaMoon, FaSun, FaSignOutAlt, FaExternalLinkAlt, FaShieldAlt } from 'react-icons/fa';

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-colors">
      {/* Dedicated Admin Navbar (Fluid on Mobile) */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Portal Tag */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 flex-shrink-0">
                  <FaHeartbeat className="text-base sm:text-lg animate-pulse" />
                </div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Physio Pulse
                </span>
              </Link>
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
                <FaShieldAlt size={11} />
                <span>Admin Console</span>
              </div>
            </div>

            {/* Right Side Navigation Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* Back to Live Site Link */}
              <Link
                to="/"
                className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800 hover:bg-gray-200/80 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition"
                title="View Live Website"
              >
                <span className="hidden sm:inline">View Website</span>
                <span className="sm:hidden text-xs">Site</span>
                <FaExternalLinkAlt size={10} className="text-gray-500 dark:text-gray-400" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition cursor-pointer"
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun size={16} className="text-amber-400" /> : <FaMoon size={15} />}
              </button>

              {/* Active User Badge (Hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700/70 text-xs font-medium text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
                <span className="truncate max-w-[120px]">Shaikshaheed143</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition cursor-pointer"
              >
                <FaSignOutAlt size={12} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Practice Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage doctor profile, clinic/home settings, appointment requests, and patient stories.
          </p>
        </div>

        <AdminDashboard />
      </main>
    </div>
  );
};

export default Admin;