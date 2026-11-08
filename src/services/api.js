import axios from 'axios';

// Default practice profile & settings
export const defaultProfile = {
  name: "Dr. Shaik Mohamed Shaheed",
  credentials: "B.P.T, CDNT.",
  title: "Consultant Physiotherapist & Certified Dry Needling Therapist",
  bio: "Modern physiotherapy and advanced rehabilitation tailored for active, pain-free recovery.",
  image: "/doctor-photo.png",
};

export const defaultSettings = {
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

const defaultBookings = [
  {
    id: "1",
    name: "Rajesh Kumar",
    age: "38",
    gender: "Male",
    condition: "Lower Back Pain",
    subCondition: "Lumbar Disc Herniation",
    description: "Sharp lower back stiffness radiating to right glute after workout.",
    phone: "9876543210",
    status: "new",
    date: "2026-11-08",
    createdAt: "2026-11-08T09:00:00.000Z"
  },
  {
    id: "2",
    name: "Ananya Sharma",
    age: "29",
    gender: "Female",
    condition: "Neck Stiffness & Cervical",
    subCondition: "Tech Neck / Trapezius Spasm",
    description: "Severe upper trap tightness from 10 hours daily laptop work. Needs dry needling consultation.",
    phone: "9849012345",
    status: "completed",
    date: "2026-11-07",
    createdAt: "2026-11-07T11:30:00.000Z"
  }
];

const defaultStories = [
  {
    id: "1",
    title: "Overcoming 2 Years of Chronic Sciatica",
    description: "Patient experienced constant leg pain from an L4-L5 herniation. With 6 sessions of targeted spinal decompression and Dry Needling by Dr. Shaik, pain was reduced by 90% without surgery.",
    image: null
  },
  {
    id: "2",
    title: "Post-ACL Reconstruction Return to Running",
    description: "Comprehensive 8-week progressive rehabilitation focused on isometric quad activation and dynamic balance, restoring full athletic mobility.",
    image: null
  }
];

// Helper: Convert File to base64 DataURL
const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : (import.meta.env.VITE_API_BASE_URL || '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Settings & Profile API
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    if (response.data && response.data.settings) {
      localStorage.setItem('physio_settings', JSON.stringify(response.data.settings));
      if (response.data.profile) {
        localStorage.setItem('physio_profile', JSON.stringify(response.data.profile));
      }
      return response.data;
    }
  } catch (err) {
    // API not reachable; fall back to localStorage
  }

  const savedSettings = localStorage.getItem('physio_settings');
  const savedProfile = localStorage.getItem('physio_profile');

  return {
    success: true,
    profile: savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile,
    settings: savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings
  };
};

export const updateSettings = async (settingsData) => {
  const newProfile = settingsData.profile ? { ...defaultProfile, ...settingsData.profile } : defaultProfile;
  const newSettings = settingsData.settings ? { ...defaultSettings, ...settingsData.settings } : defaultSettings;

  // Persist locally
  localStorage.setItem('physio_profile', JSON.stringify(newProfile));
  localStorage.setItem('physio_settings', JSON.stringify(newSettings));

  // Sync to API in background if available
  api.post('/settings', { profile: newProfile, settings: newSettings }).catch(() => {});

  return {
    success: true,
    profile: newProfile,
    settings: newSettings
  };
};

export const uploadProfilePhoto = async (file) => {
  try {
    const dataUrl = await fileToDataUrl(file);

    // Save locally
    const currentProfile = localStorage.getItem('physio_profile')
      ? JSON.parse(localStorage.getItem('physio_profile'))
      : defaultProfile;

    const updatedProfile = { ...currentProfile, image: dataUrl };
    localStorage.setItem('physio_profile', JSON.stringify(updatedProfile));

    // Also attempt server upload if running
    const formData = new FormData();
    formData.append('image', file);
    api.post('/profile-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).catch(() => {});

    return { success: true, image: dataUrl };
  } catch (err) {
    console.error('Photo upload error:', err);
    throw err;
  }
};

// Booking API
export const submitBooking = async (bookingData) => {
  const newBooking = {
    id: Date.now().toString(),
    ...bookingData,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    const saved = localStorage.getItem('physio_bookings');
    const bookings = saved ? JSON.parse(saved) : [...defaultBookings];
    bookings.unshift(newBooking);
    localStorage.setItem('physio_bookings', JSON.stringify(bookings));
  } catch (e) {
    console.warn('Booking localStorage error:', e);
  }

  // Attempt API post
  api.post('/bookings', bookingData).catch(() => {});

  return { success: true, booking: newBooking };
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    if (response.data && Array.isArray(response.data)) {
      localStorage.setItem('physio_bookings', JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    // API not reachable
  }

  const saved = localStorage.getItem('physio_bookings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return defaultBookings;
};

export const deleteBooking = async (id) => {
  try {
    const saved = localStorage.getItem('physio_bookings');
    if (saved) {
      const bookings = JSON.parse(saved).filter(b => b.id !== id);
      localStorage.setItem('physio_bookings', JSON.stringify(bookings));
    }
  } catch (e) {}

  api.delete(`/bookings/${id}`).catch(() => {});
  return { success: true };
};

export const updateBookingStatus = async (id, status) => {
  try {
    const saved = localStorage.getItem('physio_bookings');
    if (saved) {
      const bookings = JSON.parse(saved).map(b => b.id === id ? { ...b, status } : b);
      localStorage.setItem('physio_bookings', JSON.stringify(bookings));
    }
  } catch (e) {}

  api.patch(`/bookings/${id}`, { status }).catch(() => {});
  return { success: true };
};

// Success Stories API
export const getSuccessStories = async () => {
  try {
    const response = await api.get('/success-stories');
    if (response.data && Array.isArray(response.data)) {
      localStorage.setItem('physio_stories', JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    // API not reachable
  }

  const saved = localStorage.getItem('physio_stories');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return defaultStories;
};

export const createSuccessStory = async (storyData) => {
  let imgUrl = null;
  if (storyData.image instanceof File) {
    try {
      imgUrl = await fileToDataUrl(storyData.image);
    } catch (e) {}
  } else if (typeof storyData.image === 'string') {
    imgUrl = storyData.image;
  }

  const newStory = {
    id: Date.now().toString(),
    title: storyData.title,
    description: storyData.description,
    image: imgUrl,
    createdAt: new Date().toISOString()
  };

  try {
    const saved = localStorage.getItem('physio_stories');
    const stories = saved ? JSON.parse(saved) : [...defaultStories];
    stories.unshift(newStory);
    localStorage.setItem('physio_stories', JSON.stringify(stories));
  } catch (e) {}

  // Attempt API post
  const formData = new FormData();
  formData.append('title', storyData.title);
  formData.append('description', storyData.description);
  if (storyData.image) {
    formData.append('image', storyData.image);
  }
  api.post('/success-stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).catch(() => {});

  return { success: true, story: newStory };
};

export const deleteSuccessStory = async (id) => {
  try {
    const saved = localStorage.getItem('physio_stories');
    if (saved) {
      const stories = JSON.parse(saved).filter(s => s.id !== id);
      localStorage.setItem('physio_stories', JSON.stringify(stories));
    }
  } catch (e) {}

  api.delete(`/success-stories/${id}`).catch(() => {});
  return { success: true };
};

export default api;
