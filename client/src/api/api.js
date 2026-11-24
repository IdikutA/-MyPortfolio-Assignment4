
import config from '../config';

// Reusable function for backend API requests - Shataer Abulizi
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(
    `${config.apiUrl}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export default apiRequest;
