import { clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const countryCodes = [
  { type: '+234', label: 'Nigeria (+234)' }
]

export const currencies = [
  { type: 'NGN', label: 'NGN'}
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

export function formatNumberWithCommas(value) {
  if (value === null || value === undefined || isNaN(value)) return "";

  return Number(value).toLocaleString();
}

export function timeToAMPM_FromHour({ hour }) {
  const date = new Date();
  date.setHours(hour, 0, 0, 0); // hour:00:00
  const hours = date.getHours();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours.toString().padStart(2, '0')}:00 ${suffix}`;
}

export function timeToAMPM_FromHour_Duration({ startHour, durationInSeconds }) {
  const date = new Date();
  date.setHours(startHour, 0, 0, 0);
  const endDate = new Date(date.getTime() + durationInSeconds * 1000);
  const hours = endDate.getHours();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours.toString().padStart(2, '0')}:00 ${suffix}`;
}

export const isoToDateTime = ({ isoString }) => {
  return DateTime.fromISO(isoString)
    .toFormat("ccc LLL dd. hh:mma"); 
};

export function formatNumberAddCommas({ num }) {
  const abs = Math.abs(num);
  
  // For numbers below 1,000: just add commas
  if (abs < 1000) {
    return num
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // Define suffixes for 10^3, 10^6, 10^9, ...
  const suffixes = ["", "k", "M", "B", "T"];
  const tier = Math.floor(Math.log10(abs) / 3);  // 1 for thousands, 2 for millions, etc.
  const suffix = suffixes[tier] || "";          // fallback to "" if beyond our list

  const scale = Math.pow(1000, tier);
  let scaled = abs / scale;

  // If it's a whole number after scaling, drop decimals, otherwise keep one decimal place
  const formatted =
    scaled % 1 === 0
      ? scaled.toString()
      : scaled.toFixed(1).replace(/\.0$/, "");

  // Reapply sign if negative
  return (num < 0 ? "-" : "") + formatted + suffix;
}

export function getTomorrowISO() {
  return DateTime.now().plus({ days: 1 }).toISO();
}

export function formatDate1({ dateISO }){
  //Mon July 21
  return DateTime.fromISO(dateISO).toFormat('ccc dd LLLL');
}

export function getWeekdayName({ dateISO }) {
  return DateTime.fromISO(dateISO).toFormat('cccc').toLowerCase();
}

export function isBefore({ date1_ISO, date2_ISO, unit = 'day' }) {
  const d1 = DateTime.fromISO(date1_ISO);
  const d2 = DateTime.fromISO(date2_ISO);

  return unit
    ? d1.startOf(unit).toMillis() < d2.startOf(unit).toMillis()
    : d1.toMillis() < d2.toMillis();
}

export function isAfter({ date1_ISO, date2_ISO, unit = 'day' }) {
  const d1 = DateTime.fromISO(date1_ISO);
  const d2 = DateTime.fromISO(date2_ISO);

  return unit
    ? d1.startOf(unit).toMillis() > d2.startOf(unit).toMillis()
    : d1.toMillis() > d2.toMillis();
}

export function isSame({ date1_ISO, date2_ISO, unit = 'day' }) {
   if (!date1_ISO || typeof date1_ISO !== 'string') return null;
   if (!date2_ISO || typeof date2_ISO !== 'string') return null;

  const d1 = DateTime.fromISO(date1_ISO);
  const d2 = DateTime.fromISO(date2_ISO);

  return unit
    ? d1.startOf(unit).toMillis() === d2.startOf(unit).toMillis()
    : d1.toMillis() === d2.toMillis();
}

export function timeToAMPM({ hour, minutes }) {
  const period = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  const minuteStr = minutes.toString().padStart(2, '0');

  return `${hour12}:${minuteStr} ${period}`;
}

export function timeToString({ seconds }) {
  if (typeof seconds !== 'number' || seconds < 0) return '0 mins';

  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} mins`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours}:${minutes.toString().padStart(2, '0')} hr`;
}

export function isoToAMPM({ isoString }) {
  const dt = DateTime.fromISO(isoString);
  if (!dt.isValid) return '';
  return dt.toFormat('hh:mm a'); // hh = 2-digit hour, a = AM/PM
}

export const MENTAL_HEALTH_TEST_TYPES = [
    "EPDS"
]

export const sortByTimeStamp = ({ arr, key }) => {
  return [...arr].sort((a, b) => new Date(b[key]) - new Date(a[key]));
}