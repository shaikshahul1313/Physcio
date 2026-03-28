import { useState, useCallback } from 'react';
import api, { submitBooking as submitBookingApi } from './api.js';
import { toast } from 'react-hot-toast'; // optional, for error handling

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (promise, successMessage = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await promise;
      if (successMessage) toast.success(successMessage);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(async (url, config = {}) => {
    return request(api.get(url, config));
  }, [request]);

  const post = useCallback(async (url, data, config = {}) => {
    return request(api.post(url, data, config));
  }, [request]);

  // Specific methods for existing exports
  const submitBooking = useCallback(async (bookingData) => {
    return request(submitBookingApi(bookingData), 'Booking submitted successfully!');
  }, [request]);

  return {
    get,
    post,
    submitBooking,
    loading,
    error,
    setError, // optional manual clear
  };
};

