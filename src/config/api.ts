// API Configuration
export const API_CONFIG = {
  // Base URL for your API
  // Change this to your actual API endpoint
  BASE_URL: 'https://api-pebble.onrender.com',
  
  // API Key (if required)
  // You can set this via environment variables or hardcode for development
  API_KEY: 'your-api-key-here',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

// Environment-specific configurations
export const getApiConfig = () => {
  const isDevelopment = __DEV__;
  
  return {
    baseUrl: isDevelopment
      ? 'http://localhost:5000' // Local development server
      : API_CONFIG.BASE_URL,
    apiKey: API_CONFIG.API_KEY,
    timeout: API_CONFIG.TIMEOUT,
  };
};
