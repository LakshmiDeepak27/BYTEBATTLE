// src/lib/security.ts
// Security utilities and validation

// Request size limits
export const SECURITY_LIMITS = {
  MAX_REQUEST_SIZE: 10 * 1024 * 1024, // 10MB max request size
  MAX_FILE_SIZE: 3 * 1024 * 1024, // 3MB max file size
  MAX_FIELD_LENGTH: 1000, // Max length for text fields
  MAX_EMAIL_LENGTH: 254, // RFC 5321 limit
  MAX_PHONE_LENGTH: 20, // Reasonable phone number limit
  MAX_NOTES_LENGTH: 2000, // Max notes length
  MAX_NAME_LENGTH: 100, // Max name length
  MAX_USN_LENGTH: 20, // Max USN length
} as const;

// Allowed file types
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png'
] as const;

// Allowed languages
export const ALLOWED_LANGUAGES = [
  'C',
  'C++',
  'Python',
  'Java'
] as const;

// Allowed branches
export const ALLOWED_BRANCHES = [
  'CSE AI',
  'CSE AIML',
  'CSE',
  'ISE',
  'ECE',
  'OTHER', // logical flag for custom branch values
  'other' // some clients may send lowercase 'other'
] as const;

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, SECURITY_LIMITS.MAX_FIELD_LENGTH);
}

// Email validation
export function isValidEmail(email: string): boolean {
  if (!email || email.length > SECURITY_LIMITS.MAX_EMAIL_LENGTH) {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// USN validation
export function isValidUSN(usn: string): boolean {
  if (!usn || usn.length < 5 || usn.length > SECURITY_LIMITS.MAX_USN_LENGTH) {
    return false;
  }
  
  // Basic USN format check (alphanumeric with possible hyphens)
  const usnRegex = /^[0-9A-Za-z-]+$/;
  return usnRegex.test(usn);
}

// Phone validation
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.length > SECURITY_LIMITS.MAX_PHONE_LENGTH) {
    return false;
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a reasonable phone number length
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

// File type validation
export function isValidFileType(mimeType: string): boolean {
  return (ALLOWED_FILE_TYPES as readonly string[]).includes(mimeType);
}

// File size validation
export function isValidFileSize(size: number): boolean {
  return size > 0 && size <= SECURITY_LIMITS.MAX_FILE_SIZE;
}

// Language validation
export function isValidLanguage(language: string): boolean {
  return (ALLOWED_LANGUAGES as readonly string[]).includes(language);
}

// Branch validation
export function isValidBranch(branch: string): boolean {
  // Accept either a known branch from the allowlist or a custom non-empty value when flagged as OTHER upstream
  const allowed = (ALLOWED_BRANCHES as readonly string[]).includes(branch);
  if (allowed) return true;
  // If it's not in the list, allow a custom value with reasonable length (2-50)
  // and letters/digits/spaces and common separators like & . ( ) -
  const trimmed = (branch || '').trim();
  if (trimmed.length < 2 || trimmed.length > 50) return false;
  return /^[A-Za-z0-9&().\-\s]+$/.test(trimmed);
}

// Request size validation
export function isValidRequestSize(size: number): boolean {
  return size > 0 && size <= SECURITY_LIMITS.MAX_REQUEST_SIZE;
}

// Comprehensive input validation
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateRegistrationInput(data: {
  name?: string;
  usn?: string;
  email?: string;
  phone?: string;
  language?: string;
  branch?: string;
  notes?: string;
}): ValidationResult {
  const errors: string[] = [];
  
  // Required fields
  if (!data.name?.trim()) {
    errors.push("Name is required");
  } else if (data.name.length > SECURITY_LIMITS.MAX_NAME_LENGTH) {
    errors.push(`Name must be less than ${SECURITY_LIMITS.MAX_NAME_LENGTH} characters`);
  }
  
  if (!data.usn?.trim()) {
    errors.push("USN is required");
  } else if (!isValidUSN(data.usn)) {
    errors.push("Invalid USN format");
  }
  
  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(data.email)) {
    errors.push("Invalid email format");
  }
  
  if (!data.phone?.trim()) {
    errors.push("Phone number is required");
  } else if (!isValidPhone(data.phone)) {
    errors.push("Invalid phone number format");
  }
  
  if (!data.language) {
    errors.push("Programming language is required");
  } else if (!isValidLanguage(data.language)) {
    errors.push("Invalid programming language");
  }
  
  if (!data.branch) {
    errors.push("Branch is required");
  } else if (!isValidBranch(data.branch)) {
    errors.push("Invalid branch");
  }
  
  // Optional fields
  if (data.notes && data.notes.length > SECURITY_LIMITS.MAX_NOTES_LENGTH) {
    errors.push(`Notes must be less than ${SECURITY_LIMITS.MAX_NOTES_LENGTH} characters`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Security headers
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;
