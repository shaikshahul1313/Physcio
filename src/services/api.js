import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Settings & Profile API
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateSettings = async (settingsData) => {
  const response = await api.post('/settings', settingsData);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/profile-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Booking API
export const submitBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/bookings/${id}`, { status });
  return response.data;
};

// Success Stories API
export const getSuccessStories = async () => {
  const response = await api.get('/success-stories');
  return response.data;
};

export const createSuccessStory = async (storyData) => {
  const formData = new FormData();
  formData.append('title', storyData.title);
  formData.append('description', storyData.description);
  if (storyData.image) {
    formData.append('image', storyData.image);
  }

  const response = await api.post('/success-stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteSuccessStory = async (id) => {
  const response = await api.delete(`/success-stories/${id}`);
  return response.data;
};

export default api;
