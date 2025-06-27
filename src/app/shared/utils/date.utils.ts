// 📅 Date Utilities - Common date formatting and manipulation functions
// These utilities provide consistent date handling across the application

/**
 * Format date string to readable format
 * @param dateString - ISO date string (e.g., "2023-01-01")
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Invalid date string:', dateString);
    return 'Invalid Date';
  }
}

/**
 * Format date to short format
 * @param dateString - ISO date string
 * @returns Short date format (e.g., "01/01/2023")
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  } catch (error) {
    return 'Unknown time';
  }
}

/**
 * Check if date is today
 * @param dateString - ISO date string
 * @returns True if date is today
 */
export function isToday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  } catch (error) {
    return false;
  }
}

/**
 * Check if date is within last N days
 * @param dateString - ISO date string
 * @param days - Number of days to check
 * @returns True if date is within the specified days
 */
export function isWithinDays(dateString: string, days: number): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= days;
  } catch (error) {
    return false;
  }
}

/**
 * Get current ISO date string
 * @returns Current date in ISO format
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

/**
 * Convert date to ISO string for API calls
 * @param date - Date object or date string
 * @returns ISO date string
 */
export function toISOString(date: Date | string): string {
  try {
    if (typeof date === 'string') {
      return new Date(date).toISOString();
    }
    return date.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}
