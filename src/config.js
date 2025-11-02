// frontend/src/config.js
// Create this file to centralize API configuration

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  VOICE_RECOGNIZE: `${API_BASE_URL}/api/voice-recognize`,
  ANALYZE_SYMPTOMS: `${API_BASE_URL}/api/analyze-symptoms`,
  DIAGNOSE_IMAGE: `${API_BASE_URL}/api/diagnose-image`,
  EXTRACT_PRESCRIPTION: `${API_BASE_URL}/api/extract-prescription`,
  CHAT: `${API_BASE_URL}/api/chat`,
  HISTORY: `${API_BASE_URL}/api/history`,
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};