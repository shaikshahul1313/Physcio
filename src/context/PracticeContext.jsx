import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSettings, updateSettings as apiUpdateSettings, uploadProfilePhoto as apiUploadPhoto } from '../services/api';

const defaultProfile = {
  name: "Dr. Shaik Mohamed Shaheed",
  credentials: "B.P.T, CDNT.",
  title: "Consultant Physiotherapist & Certified Dry Needling Therapist",
  bio: "Modern physiotherapy and advanced rehabilitation tailored for active, pain-free recovery.",
  image: "/doctor-photo.png",
};

const defaultSettings = {
  serviceMode: "both", // "home_visits" | "clinic" | "both"
  serviceArea: "Home visits across the city & surrounding areas",
  clinicAddress: "Physio Pulse Clinic, Home service, India",
  phone: "9392473392",
  whatsapp: "9392473392",
  email: "shaheedshaik236@gmail.com",
  timings: "Monday - Saturday: 8:00 AM - 8:00 PM",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.471553580572!2d78.4746!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjguNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  instagram: "physioonreels",
  instagramUrl: "https://instagram.com/physioonreels",
  facebook: "Physio Pulse Clinic",
  facebookUrl: "https://facebook.com",
  youtube: "physioonreels",
  youtubeUrl: "https://youtube.com/@physioonreels?si=S2lBoYVgr6a5Ng2R"
};

const PracticeContext = createContext();

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within PracticeProvider');
  }
  return context;
};

export const PracticeProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [settings, setSettings] = useState(defaultSettings);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPracticeData = useCallback(async () => {
    try {
      const data = await getSettings();
      if (data && data.profile) {
        setProfile((prev) => ({ ...prev, ...data.profile }));
      }
      if (data && data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.warn('Practice data fetch error (using fallback defaults):', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPracticeData();
  }, [fetchPracticeData]);

  const saveSettings = async (newSettings, newProfile) => {
    try {
      const res = await apiUpdateSettings({ settings: newSettings, profile: newProfile });
      if (res.profile) setProfile(res.profile);
      if (res.settings) setSettings(res.settings);
      return res;
    } catch (error) {
      console.error('Error saving practice settings:', error);
      throw error;
    }
  };

  const uploadPhoto = async (file) => {
    try {
      const res = await apiUploadPhoto(file);
      if (res.image) {
        setProfile((prev) => ({ ...prev, image: res.image }));
      }
      return res;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const selectConditionForBooking = (condition, subCondition = null) => {
    setSelectedCondition({ condition, subCondition });
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const value = {
    profile,
    settings,
    isLoading,
    saveSettings,
    uploadPhoto,
    refreshPracticeData: fetchPracticeData,
    selectedCondition,
    setSelectedCondition,
    selectConditionForBooking
  };

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  );
};
