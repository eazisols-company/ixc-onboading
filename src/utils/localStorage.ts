/**
 * Safe localStorage utility with error handling
 * Handles quota exceeded, private browsing, and SSR scenarios
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const localStorageUtil = {
  /**
   * Safely get an item from localStorage
   */
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      if (isDevelopment) {
        console.error(`Error reading from localStorage (${key}):`, error);
      }
      return null;
    }
  },

  /**
   * Safely set an item in localStorage
   */
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (isDevelopment) {
        console.error(`Error writing to localStorage (${key}):`, error);
      }
      return false;
    }
  },

  /**
   * Safely remove an item from localStorage
   */
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      if (isDevelopment) {
        console.error(`Error removing from localStorage (${key}):`, error);
      }
      return false;
    }
  },

  /**
   * Safely parse JSON from localStorage
   */
  getJSON: <T>(key: string): T | null => {
    const item = localStorageUtil.getItem(key);
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      if (isDevelopment) {
        console.error(`Error parsing JSON from localStorage (${key}):`, error);
      }
      return null;
    }
  },

  /**
   * Safely stringify and save JSON to localStorage
   */
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      const serialized = JSON.stringify(value);
      return localStorageUtil.setItem(key, serialized);
    } catch (error) {
      if (isDevelopment) {
        console.error(`Error stringifying JSON for localStorage (${key}):`, error);
      }
      return false;
    }
  },

  /**
   * Remove multiple items by keys
   */
  removeItems: (keys: string[]): void => {
    keys.forEach(key => localStorageUtil.removeItem(key));
  },
};

