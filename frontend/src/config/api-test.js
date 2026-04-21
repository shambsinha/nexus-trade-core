// Test API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'NOT_SET';
export const MODE = import.meta.env.MODE || 'NOT_SET';

console.log('API Configuration Test:');
console.log('VITE_API_BASE_URL:', API_BASE_URL);
console.log('MODE:', MODE);

export default API_BASE_URL;
