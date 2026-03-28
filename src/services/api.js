import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Booking API
export const submitBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Success Stories API
export const getSuccessStories = async () => {
  const response = await api.get('/success-stories');
  return response.data;
};

export const createSuccessStory = async (storyData) => {
  try {
    console.log("Sending data:", storyData.title, storyData.description, storyData.image ? storyData.image.name : 'no image');
    const formData = new FormData();
    formData.append('title', storyData.title);
    formData.append('description', storyData.description);
    if (storyData.image) {
      formData.append('image', storyData.image);
    }

    const response = await api.post('/success-stories', formData);
    return response.data;
  } catch (error) {
    console.error('API createSuccessStory error:', error.response?.data || error.message);
    throw error;
  }
};


export const deleteSuccessStory = async (id) => {
  const response = await api.delete(`/success-stories/${id}`);
  return response.data;
};

export default api;
