import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserMd, 
  FaCamera, 
  FaClinicMedical, 
  FaHome, 
  FaCalendarCheck, 
  FaStar, 
  FaTrash, 
  FaCheck, 
  FaWhatsapp, 
  FaSave,
  FaSync,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaShareAlt,
  FaLink
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { 
  getSettings, 
  updateSettings, 
  uploadProfilePhoto, 
  getBookings, 
  deleteBooking, 
  updateBookingStatus,
  getSuccessStories, 
  createSuccessStory, 
  deleteSuccessStory 
} from '../services/api';
import { usePractice } from '../context/PracticeContext';

const AdminDashboard = () => {
  const { refreshPracticeData } = usePractice();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'service' | 'bookings' | 'stories'

  // Profile & Settings State
  const [profileData, setProfileData] = useState({
    name: 'Dr. Shaik Mohamed Shaheed',
    credentials: 'B.P.T, CDNT.',
    title: 'Consultant Physiotherapist & Certified Dry Needling Therapist',
    bio: 'Modern physiotherapy and advanced rehabilitation tailored for active, pain-free recovery.',
    image: '/doctor-photo.png',
  });

  const [settingsData, setSettingsData] = useState({
    serviceMode: 'both', // 'home_visits' | 'clinic' | 'both'
    serviceArea: 'Home visits across the city & surrounding areas',
    clinicAddress: 'Physio Pulse Clinic, Home service, India',
    phone: '9392473392',
    whatsapp: '9392473392',
    instagram: 'physioonreels',
    instagramUrl: 'https://instagram.com/physioonreels',
    facebook: 'Physio Pulse Clinic',
    facebookUrl: 'https://facebook.com',
    youtube: 'physioonreels',
    youtubeUrl: 'https://youtube.com/@physioonreels?si=S2lBoYVgr6a5Ng2R',
    email: 'shaheedshaik236@gmail.com',
    timings: 'Monday - Saturday: 8:00 AM - 8:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.471553580572!2d78.4746!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjguNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin'
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Stories State
  const [stories, setStories] = useState([]);
  const [storyForm, setStoryForm] = useState({ title: '', description: '', image: null });
  const [isSavingStory, setIsSavingStory] = useState(false);

  // Load initial settings, bookings, stories
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const data = await getSettings();
      if (data?.profile) setProfileData(prev => ({ ...prev, ...data.profile }));
      if (data?.settings) setSettingsData(prev => ({ ...prev, ...data.settings }));
    } catch (e) {
      console.warn('Settings load notice:', e.message);
    }
    loadBookings();
    loadStories();
  };

  const loadBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (e) {
      console.warn('Bookings fetch notice:', e.message);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const loadStories = async () => {
    try {
      const data = await getSuccessStories();
      setStories(data || []);
    } catch (e) {
      console.warn('Stories load notice:', e.message);
    }
  };

  // Profile Picture File Selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Save Doctor Profile & Upload Photo
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      let currentImage = profileData.image;

      // Upload new photo if selected
      if (photoFile) {
        const uploadRes = await uploadProfilePhoto(photoFile);
        if (uploadRes?.image) {
          currentImage = uploadRes.image;
        }
      }

      await updateSettings({
        profile: { ...profileData, image: currentImage },
        settings: settingsData
      });

      setProfileData(prev => ({ ...prev, image: currentImage }));
      setPhotoFile(null);
      await refreshPracticeData();
      toast.success('Doctor profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Save Practice & Service Mode Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await updateSettings({
        profile: profileData,
        settings: settingsData
      });
      await refreshPracticeData();
      toast.success('Practice settings and social links updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Bookings Handlers
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
      toast.success('Booking record deleted.');
    } catch (err) {
      toast.error('Failed to delete booking.');
    }
  };

  const handleToggleBookingStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'new' : 'completed';
    try {
      await updateBookingStatus(id, newStatus);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      toast.success(`Marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  // Stories Handlers
  const handleCreateStory = async (e) => {
    e.preventDefault();
    setIsSavingStory(true);
    try {
      await createSuccessStory(storyForm);
      toast.success('Success story published!');
      setStoryForm({ title: '', description: '', image: null });
      loadStories();
    } catch (err) {
      toast.error('Failed to add story.');
    } finally {
      setIsSavingStory(false);
    }
  };

  const handleDeleteStory = async (id) => {
    if (!window.confirm('Delete this story?')) return;
    try {
      await deleteSuccessStory(id);
      setStories(prev => prev.filter(s => s.id !== id));
      toast.success('Story deleted.');
    } catch (err) {
      toast.error('Failed to delete story.');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Nav Tabs */}
      <div className="bg-white dark:bg-gray-800/90 p-1.5 sm:p-2 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
          }`}
        >
          <FaUserMd size={15} />
          <span>Doctor Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('service')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'service'
              ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
          }`}
        >
          <FaHome size={15} />
          <span>Service & Social</span>
        </button>

        <button
          onClick={() => { setActiveTab('bookings'); loadBookings(); }}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition relative cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
          }`}
        >
          <FaCalendarCheck size={15} />
          <span>Bookings</span>
          {bookings.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 font-bold">
              {bookings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('stories')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'stories'
              ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
          }`}
        >
          <FaStar size={15} />
          <span>Stories</span>
        </button>
      </div>

      {/* TAB 1: DOCTOR PROFILE & PHOTO */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="border-b border-gray-100 dark:border-gray-700 pb-5 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Doctor Profile & Display Photo
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload your photo and edit credentials displayed in the Hero section of the live website.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* Photo Uploader */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md border-2 border-teal-500/40 flex items-center justify-center p-1">
                <img
                  src={
                    photoPreview ||
                    (profileData.image
                      ? (profileData.image.startsWith('http') || profileData.image.startsWith('data:')
                          ? profileData.image
                          : (profileData.image.startsWith('/uploads')
                              ? (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? `http://localhost:5000${profileData.image}` : profileData.image)
                              : profileData.image))
                      : '/doctor-photo.png')
                  }
                  alt="Doctor"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    if (e.target.src !== window.location.origin + '/doctor-photo.png') {
                      e.target.src = '/doctor-photo.png';
                    }
                  }}
                />
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  Update Doctor Picture
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                  Recommended size: 600x800px (JPG, PNG, WebP). It will automatically show in the hero frame on the home page.
                </p>
                <label className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-xs cursor-pointer shadow-sm transition">
                  <FaCamera size={14} />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Doctor Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Credentials / Qualifications (as drawn in wireframe)
                </label>
                <input
                  type="text"
                  value={profileData.credentials}
                  onChange={(e) => setProfileData({ ...profileData, credentials: e.target.value })}
                  placeholder="e.g. B.P.T, CDNT."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title / Subtitle
                </label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Practice Philosophy / Bio
                </label>
                <textarea
                  rows="3"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition flex items-center space-x-2"
              >
                <FaSave size={16} />
                <span>{isSavingSettings ? 'Saving Changes...' : 'Save Profile & Photo'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* TAB 2: SERVICE MODE, CONTACT & SOCIAL MEDIA SETTINGS */}
      {activeTab === 'service' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-700 space-y-10"
        >
          <div className="border-b border-gray-100 dark:border-gray-700 pb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Practice Service Mode & Social Media Access
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Configure clinic practice availability, patient contact coordinates, and social media handles (Instagram, Facebook, YouTube, WhatsApp).
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-10">
            
            {/* Section A: Service Mode Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <FaClinicMedical className="text-teal-500" />
                <span>1. Active Practice Service Mode</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div
                  onClick={() => setSettingsData({ ...settingsData, serviceMode: 'home_visits' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center ${
                    settingsData.serviceMode === 'home_visits'
                      ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-900/30 ring-2 ring-teal-500/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaHome className="text-3xl text-teal-500 mb-2" />
                  <span className="font-bold text-gray-900 dark:text-white">Home Visits Only</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Treating patients at their doorstep</span>
                </div>

                <div
                  onClick={() => setSettingsData({ ...settingsData, serviceMode: 'clinic' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center ${
                    settingsData.serviceMode === 'clinic'
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-900/30 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaClinicMedical className="text-3xl text-blue-500 mb-2" />
                  <span className="font-bold text-gray-900 dark:text-white">In-Clinic Consultations</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Patients visit clinic premises</span>
                </div>

                <div
                  onClick={() => setSettingsData({ ...settingsData, serviceMode: 'both' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center ${
                    settingsData.serviceMode === 'both'
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-900/30 ring-2 ring-emerald-500/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex space-x-1 text-3xl mb-2">
                    <FaHome className="text-teal-500" />
                    <FaClinicMedical className="text-blue-500" />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">Both Available</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Home visits & clinic appointments</span>
                </div>

              </div>
            </div>

            {/* Section B: Clinic & Patient Direct Contact */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <FaHome className="text-teal-500" />
                <span>2. Clinic Address & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Home Visit Coverage Areas
                  </label>
                  <input
                    type="text"
                    value={settingsData.serviceArea || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, serviceArea: e.target.value })}
                    placeholder="e.g. Home visits across city & surrounding areas"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Clinic Physical Address
                  </label>
                  <input
                    type="text"
                    value={settingsData.clinicAddress || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, clinicAddress: e.target.value })}
                    placeholder="e.g. Physio Pulse Clinic, India"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Direct Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsData.phone || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                    placeholder="e.g. 9392473392"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1.5">
                    <FaWhatsapp className="text-emerald-500" />
                    <span>WhatsApp Consultation Number</span>
                  </label>
                  <input
                    type="text"
                    value={settingsData.whatsapp || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, whatsapp: e.target.value })}
                    placeholder="e.g. 9392473392 (without spaces or country code)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Notification Email (for booking alerts)
                  </label>
                  <input
                    type="email"
                    value={settingsData.email || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                    placeholder="e.g. shaheedshaik236@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Practice Timings / Working Hours
                  </label>
                  <input
                    type="text"
                    value={settingsData.timings || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, timings: e.target.value })}
                    placeholder="e.g. Monday - Saturday: 8:00 AM - 8:00 PM"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Google Maps Embed URL (for the website Map section)
                  </label>
                  <input
                    type="text"
                    value={settingsData.mapUrl || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, mapUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Social Media Configuration (Admin Access) */}
            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <FaShareAlt className="text-pink-500" />
                  <span>3. Social Media Accounts & Handles</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Change these IDs and URLs anytime. They automatically update the live links across the website footer and contact channels.
                </p>
              </div>

              {/* Instagram Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20 border border-pink-200/70 dark:border-pink-800/50 space-y-4">
                <div className="flex items-center space-x-3 text-pink-600 dark:text-pink-400 font-bold text-sm">
                  <FaInstagram size={20} />
                  <span>Instagram Profile & Handle</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Instagram Username / ID
                    </label>
                    <input
                      type="text"
                      value={settingsData.instagram || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, instagram: e.target.value })}
                      placeholder="e.g. physioonreels"
                      className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-pink-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center space-x-1">
                      <FaLink size={11} />
                      <span>Instagram Direct URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsData.instagramUrl || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/physioonreels"
                      className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-pink-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/50 to-sky-50/50 dark:from-blue-950/20 dark:to-sky-950/20 border border-blue-200/70 dark:border-blue-800/50 space-y-4">
                <div className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <FaFacebook size={20} />
                  <span>Facebook Page & Profile</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Facebook Page Name / Handle
                    </label>
                    <input
                      type="text"
                      value={settingsData.facebook || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, facebook: e.target.value })}
                      placeholder="e.g. Physio Pulse Clinic"
                      className="w-full px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center space-x-1">
                      <FaLink size={11} />
                      <span>Facebook Page URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsData.facebookUrl || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/physiopulse"
                      className="w-full px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200/70 dark:border-red-800/50 space-y-4">
                <div className="flex items-center space-x-3 text-red-600 dark:text-red-400 font-bold text-sm">
                  <FaYoutube size={20} />
                  <span>YouTube Channel & Videos</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      YouTube Channel Name / Handle
                    </label>
                    <input
                      type="text"
                      value={settingsData.youtube || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, youtube: e.target.value })}
                      placeholder="e.g. physioonreels"
                      className="w-full px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center space-x-1">
                      <FaLink size={11} />
                      <span>YouTube Channel URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsData.youtubeUrl || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, youtubeUrl: e.target.value })}
                      placeholder="https://youtube.com/@physioonreels"
                      className="w-full px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800/80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition flex items-center space-x-2"
              >
                <FaSave size={16} />
                <span>{isSavingSettings ? 'Saving Settings...' : 'Save Practice & Social Settings'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* TAB 3: APPOINTMENTS LOG */}
      {activeTab === 'bookings' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-700 space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Patient Appointment Requests
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                All patient inquiries submitted via the website booking form.
              </p>
            </div>
            <button
              onClick={loadBookings}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-semibold transition"
            >
              <FaSync className={isLoadingBookings ? 'animate-spin' : ''} />
              <span>Refresh Log</span>
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FaCalendarCheck size={48} className="mx-auto mb-3 opacity-40 text-teal-500" />
              <p className="text-base font-semibold">No booking requests recorded yet.</p>
              <p className="text-xs text-gray-500 mt-1">New requests from the website form will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full min-w-[560px] text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Age/Gender</th>
                    <th className="py-3 px-3">Condition / Area</th>
                    <th className="py-3 px-3">Symptoms Note</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="py-4 px-3 font-semibold text-gray-900 dark:text-white">
                        {b.name}
                        {b.phone && (
                          <div className="text-xs text-teal-600 dark:text-teal-400 font-normal">
                            {b.phone}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-3 text-gray-600 dark:text-gray-300">
                        {b.age} yrs / {b.gender}
                      </td>
                      <td className="py-4 px-3">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                          {b.condition}
                        </span>
                        {b.subCondition && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {b.subCondition}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {b.description || 'N/A'}
                      </td>
                      <td className="py-4 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          b.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}>
                          {b.status === 'completed' ? 'Contacted' : 'New'}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-right space-x-2">
                        {b.phone && (
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                            title="Chat on WhatsApp"
                          >
                            <FaWhatsapp size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => handleToggleBookingStatus(b.id, b.status)}
                          className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Toggle Status"
                        >
                          <FaCheck size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="inline-flex p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Record"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* TAB 4: SUCCESS STORIES */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Story Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Patient Success Story</h2>
            <form onSubmit={handleCreateStory} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Knee Mobility Restored in 3 Weeks"
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  rows="4"
                  placeholder="Details about patient recovery and treatments applied..."
                  value={storyForm.description}
                  onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Story Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setStoryForm({ ...storyForm, image: e.target.files[0] })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSavingStory}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
              >
                {isSavingStory ? 'Publishing...' : 'Publish Success Story'}
              </button>
            </form>
          </motion.div>

          {/* Existing Stories List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Published Stories ({stories.length})</h2>
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
              {stories.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No stories published yet.</p>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{story.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{story.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
