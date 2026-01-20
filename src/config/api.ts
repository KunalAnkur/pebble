import { Platform } from 'react-native';

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
  
  // On Android emulator, use 10.0.2.2 instead of localhost to access host machine
  // On iOS simulator, localhost works fine
  // For physical devices, use your machine's local IP address
  const getLocalUrl = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5000'; // Android emulator uses 10.0.2.2 to access host
    }
    return 'http://localhost:5000'; // iOS simulator or physical device
  };
  
  return {
    baseUrl: isDevelopment
      ? getLocalUrl() // Local development server
      : API_CONFIG.BASE_URL,
    apiKey: API_CONFIG.API_KEY,
    timeout: API_CONFIG.TIMEOUT,
  };
};
