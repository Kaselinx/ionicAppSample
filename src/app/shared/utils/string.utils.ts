// 🔤 String Utilities - Common string manipulation functions
// These utilities provide consistent string operations across the application

/**
 * Capitalize first letter of a string
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param str - String to convert
 * @returns String in title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Convert camelCase to kebab-case
 * @param str - CamelCase string
 * @returns kebab-case string
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 * @param str - kebab-case string
 * @returns camelCase string
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Truncate string with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove extra whitespace and trim
 * @param str - String to clean
 * @returns Cleaned string
 */
export function cleanWhitespace(str: string): string {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Generate random string
 * @param length - Length of random string
 * @param charset - Character set to use (default: alphanumeric)
 * @returns Random string
 */
export function generateRandomString(
  length: number, 
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Extract initials from name
 * @param name - Full name string
 * @param maxInitials - Maximum number of initials (default: 2)
 * @returns Initials string
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  
  return initials;
}

/**
 * Slugify string for URLs
 * @param str - String to slugify
 * @returns URL-friendly slug
 */
export function slugify(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Escape HTML characters
 * @param str - String to escape
 * @returns HTML-escaped string
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

/**
 * Check if string contains only letters
 * @param str - String to check
 * @returns True if string contains only letters
 */
export function isAlpha(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Check if string contains only numbers
 * @param str - String to check
 * @returns True if string contains only numbers
 */
export function isNumeric(str: string): boolean {
  return /^[0-9]+$/.test(str);
}

/**
 * Check if string contains only alphanumeric characters
 * @param str - String to check
 * @returns True if string is alphanumeric
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Count words in a string
 * @param str - String to count words in
 * @returns Number of words
 */
export function wordCount(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Reverse a string
 * @param str - String to reverse
 * @returns Reversed string
 */
export function reverse(str: string): string {
  if (!str) return '';
  return str.split('').reverse().join('');
}

/**
 * Check if string is palindrome
 * @param str - String to check
 * @returns True if string is palindrome
 */
export function isPalindrome(str: string): boolean {
  if (!str) return false;
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

/**
 * Format file size in bytes to human readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
