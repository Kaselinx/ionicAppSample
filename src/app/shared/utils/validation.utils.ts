// ✅ Validation Utilities - Common validation functions
// These utilities provide consistent validation across forms and components

/**
 * Email validation using regex
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password strength validation
 * @param password - Password string to validate
 * @returns Validation result with strength level and requirements
 */
export interface PasswordValidation {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export function validatePassword(password: string): PasswordValidation {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;
  
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (metRequirements >= 4) strength = 'strong';
  else if (metRequirements >= 3) strength = 'medium';

  return {
    isValid: metRequirements >= 3 && requirements.minLength,
    strength,
    requirements
  };
}

/**
 * Username validation
 * @param username - Username string to validate
 * @returns True if username is valid
 */
export function isValidUsername(username: string): boolean {
  // Username: 3-20 characters, alphanumeric and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Phone number validation (basic)
 * @param phone - Phone number string to validate
 * @returns True if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // Basic phone validation: 10-15 digits with optional formatting
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

/**
 * URL validation
 * @param url - URL string to validate
 * @returns True if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Required field validation
 * @param value - Value to check
 * @returns True if value is not empty/null/undefined
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Minimum length validation
 * @param value - String to validate
 * @param minLength - Minimum required length
 * @returns True if string meets minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value && value.length >= minLength;
}

/**
 * Maximum length validation
 * @param value - String to validate
 * @param maxLength - Maximum allowed length
 * @returns True if string is within maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return !value || value.length <= maxLength;
}

/**
 * Numeric validation
 * @param value - Value to check
 * @returns True if value is a valid number
 */
export function isNumeric(value: any): boolean {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Integer validation
 * @param value - Value to check
 * @returns True if value is a valid integer
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(Number(value));
}

/**
 * Range validation for numbers
 * @param value - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if number is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Date validation
 * @param dateString - Date string to validate
 * @returns True if date is valid
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Future date validation
 * @param dateString - Date string to validate
 * @returns True if date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  } catch {
    return false;
  }
}

// 📋 Common validation error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  INVALID_USERNAME: 'Username must be 3-20 characters, letters, numbers, and underscore only',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  INVALID_NUMBER: 'Please enter a valid number',
  INVALID_INTEGER: 'Please enter a whole number',
  OUT_OF_RANGE: (min: number, max: number) => `Value must be between ${min} and ${max}`,
  INVALID_DATE: 'Please enter a valid date',
  FUTURE_DATE_REQUIRED: 'Date must be in the future'
} as const;
