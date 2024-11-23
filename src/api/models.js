import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchModels(filters, searchQuery) {
  try {
    const response = await axios.get(`${API_URL}/models`, {
      params: {
        ...filters,
        q: searchQuery
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch models');
  }
}

export async function fetchModelById(id) {
  try {
    const response = await axios.get(`${API_URL}/models/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch model details');
  }
}

export async function submitReview(modelId, review) {
  try {
    const response = await axios.post(`${API_URL}/models/${modelId}/reviews`, review);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit review');
  }
}