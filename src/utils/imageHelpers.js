import { API_URL } from '../config';

/**
 * Formats image URLs to ensure they're correctly prefixed with the API URL if they're relative paths
 * @param {string} imageUrl - The image URL to format
 * @returns {string} - The formatted image URL
 */
export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If it's already an absolute URL, return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path, prepend the API URL
  return `${API_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}; 