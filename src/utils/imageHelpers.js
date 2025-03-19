import { API_URL } from '../config';

/**
 * Formats image URLs to ensure they're correctly prefixed with the API URL if they're relative paths
 * @param {string} imageUrl - The image URL to format
 * @returns {string} - The formatted image URL
 */
export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) {
    console.warn('Empty image URL provided');
    // Return a base64 encoded transparent 1x1 pixel as fallback
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }
  
  // Debug the incoming image URL
  console.debug('Formatting image URL:', imageUrl);
  
  // If it's already an absolute URL, return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's an imported image (webpack module), return the image path directly
  if (typeof imageUrl === 'object' && imageUrl.default) {
    return imageUrl.default;
  }
  
  if (typeof imageUrl === 'object' && imageUrl.src) {
    return imageUrl.src;
  }
  
  // If imageUrl is an object with toString method (like a webpack/vite module), convert it
  if (typeof imageUrl === 'object' && imageUrl.toString) {
    return imageUrl.toString();
  }
  
  // Ensure the string starts with a slash for consistent path joining
  const normalizedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  // Create the full URL while ensuring no double slashes
  const fullUrl = `${API_URL}${normalizedPath}`;
  
  console.debug('Formatted URL:', fullUrl);
  return fullUrl;
}; 