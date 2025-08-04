import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const countryCodes = [
  { type: '+234', label: 'Nigeria (+234)' }
]

export function maskEmail({ email }) {
  if (!email || typeof email !== 'string') return '';

  const lowerEmail = email.toLowerCase();
  const [username, domain] = lowerEmail.split('@');

  if (!username || !domain) return email;

  const visiblePart = username.slice(0, 3);
  const randomMaskLength = 8;
  const maskedPart = '*'.repeat(randomMaskLength);

  return `${visiblePart}${maskedPart}@${domain}`;
}

export function generateNumericCode(length = 6) {
  const charset = '0123456789';
  let code = '';

  // Use crypto for stronger randomness if available
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      code += charset[values[i] % charset.length];
    }
  } else {
    // Fallback to Math.random
    for (let i = 0; i < length; i++) {
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }

  return code;
}

export function formatTimeToMMSS({ seconds }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(secs).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}