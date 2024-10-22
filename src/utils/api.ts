import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

const handleApiError = (error: any) => {
  console.error('API Error:', error.message);
  if (error.response) {
    console.error('Response status:', error.response.status);
  } else if (error.request) {
    console.error('No response received');
  } else {
    console.error('Error setting up request:', error.message);
  }
  return null; // Return null instead of throwing an error
};

export const apiService = {
  getThreatActors: async () => {
    try {
      const response = await api.get('/threat-actors');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createThreatActor: async (name: string, type: string) => {
    try {
      const response = await api.post('/threat-actors', { name, type });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCTASTasks: async () => {
    try {
      const response = await api.get('/ctas-tasks');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createCTASTask: async (taskData: any) => {
    try {
      const response = await api.post('/ctas-tasks', taskData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateCTASTaskStatus: async (taskId: string, newStatus: string) => {
    try {
      const response = await api.patch(`/ctas-tasks/${taskId}`, { status: newStatus });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};