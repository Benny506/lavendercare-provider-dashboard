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


export const formatTimeToHHMMSS = ({ secs }) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

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

  let hours = endDate.getHours();
  const minutes = endDate.getMinutes();

  const suffix = hours >= 12 ? "PM" : "AM";

  // convert to 12-hour format

  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
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

export function formatDate1({ dateISO }) {
  try {
    if (!dateISO || typeof dateISO !== "string") {
      return ""; // or "Invalid date"
    }

    const date = DateTime.fromISO(dateISO);

    if (!date.isValid) {
      return ""; // or "Invalid date"
    }

    return date.toFormat("ccc dd LLLL");
  } catch (error) {
    console.error("formatDate1 error:", error);
    return ""; // fallback if something unexpected happens
  }
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

export function isoToTimeAgo({ isoString }) {
  if (!isoString || typeof isoString !== 'string') return '';

  const date = DateTime.fromISO(isoString, { zone: 'utc' });
  if (!date.isValid) return '';

  const now = DateTime.now().setZone('utc');
  const diff = now.diff(date, [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds'
  ]).toObject();

  // Determine the largest unit to display
  if (diff.years >= 1) {
    return `${Math.floor(diff.years)} year${diff.years >= 2 ? 's' : ''} ago`;
  }
  if (diff.months >= 1) {
    return `${Math.floor(diff.months)} month${diff.months >= 2 ? 's' : ''} ago`;
  }
  if (diff.weeks >= 1) {
    return `${Math.floor(diff.weeks)} week${diff.weeks >= 2 ? 's' : ''} ago`;
  }
  if (diff.days >= 1) {
    return `${Math.floor(diff.days)} day${diff.days >= 2 ? 's' : ''} ago`;
  }
  if (diff.hours >= 1) {
    return `${Math.floor(diff.hours)} hour${diff.hours >= 2 ? 's' : ''} ago`;
  }
  if (diff.minutes >= 1) {
    return `${Math.floor(diff.minutes)} minute${diff.minutes >= 2 ? 's' : ''} ago`;
  }
  return `${Math.floor(diff.seconds)} second${diff.seconds >= 2 ? 's' : ''} ago`;
}

export const MENTAL_HEALTH_TEST_TYPES = [
    "EPDS"
]

export const sortByTimeStamp = ({ arr, key, ascending = false }) => {
  if (!Array.isArray(arr) || !key) return [];

  return [...arr].sort((a, b) => {
    const dateA = DateTime.fromISO(a[key]);
    const dateB = DateTime.fromISO(b[key]);

    // Handle invalid dates gracefully
    if (!dateA.isValid && !dateB.isValid) return 0;
    if (!dateA.isValid) return 1;
    if (!dateB.isValid) return -1;

    return ascending
      ? dateA.toMillis() - dateB.toMillis()
      : dateB.toMillis() - dateA.toMillis();
  });
};

export const sortByDate = ({ arr, key, ascending = false }) => {
  if (!Array.isArray(arr) || !key) return [];

  return [...arr].sort((a, b) => {
    const dateA = DateTime.fromISO(a[key]);
    const dateB = DateTime.fromISO(b[key]);

    if (!dateA.isValid && !dateB.isValid) return 0;
    if (!dateA.isValid) return 1; // invalid date goes last
    if (!dateB.isValid) return -1;

    return ascending
      ? dateA.toMillis() - dateB.toMillis()
      : dateB.toMillis() - dateA.toMillis();
  });
};

export const sortByHour = ({ arr, key, ascending = false }) => {
  if (!Array.isArray(arr)) return [];

  return [...arr].sort((a, b) => {
    const hourA = key ? parseInt(a[key], 10) : parseInt(a, 10);
    const hourB = key ? parseInt(b[key], 10) : parseInt(b, 10);

    if (isNaN(hourA) && isNaN(hourB)) return 0;
    if (isNaN(hourA)) return 1;
    if (isNaN(hourB)) return -1;

    // Use Luxon to normalize hours
    const millisA = DateTime.now().set({ hour: hourA, minute: 0 }).toMillis();
    const millisB = DateTime.now().set({ hour: hourB, minute: 0 }).toMillis();

    return ascending ? millisA - millisB : millisB - millisA;
  });
}; 


export function getPastDate(daysAgo) {
  return DateTime.now().minus({ days: daysAgo }).toISO();
}


export function isDateBetween({ startDate, endDate, checkDate }) {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);
  const check = DateTime.fromISO(checkDate);

  // Compare in milliseconds for precision
  const startMs = start.toMillis();
  const endMs = end.toMillis();
  const checkMs = check.toMillis();

  return checkMs >= startMs && checkMs <= endMs;
}

export function isDateInRange({ dateToCheck, range }) {
  if (!dateToCheck || typeof dateToCheck !== "string") {
    return false; // Prevent invalid input crash
  }

  const checkDate = DateTime.fromISO(dateToCheck).startOf("day");
  if (!checkDate.isValid) return false;

  const today = DateTime.now().startOf("day");
  let startDate, endDate;

  if (range === "this_week") {
    startDate = today.startOf("week");
    endDate = today; // or .endOf("week") if you want whole week
  } 
  else if (range === "last_week") {
    startDate = today.startOf("week").minus({ weeks: 1 });
    endDate = startDate.endOf("week");
  } 
  else if (range === "next_week") {
    startDate = today.startOf("week").plus({ weeks: 1 });
    endDate = startDate.endOf("week");
  } 
  else if (range === "this_month") {
    startDate = today.startOf("month");
    endDate = today.endOf('month');
  } 
  else if (range === "last_month") {
    startDate = today.startOf("month").minus({ months: 1 });
    endDate = startDate.endOf("month");
  } 
  else if (range === "next_month") {
    startDate = today.startOf("month").plus({ months: 1 });
    endDate = startDate.endOf("month");
  } 
  else if (/^last_\d+_days$/.test(range)) {
    const days = parseInt(range.match(/\d+/)[0], 10);
    startDate = today.minus({ days });
    endDate = today;
  } 
  else {
    throw new Error("Invalid range type");
  }

  return checkDate >= startDate && checkDate <= endDate;
}

export const weekFilters = [
  { title: 'All', keyword: null },

  //Weeks
  { title: 'This week', keyword: "this_week" },
  { title: 'Last week', keyword: "last_week" },
  { title: 'Next week', keyword: "next_week" },

  //Months
  { title: 'This month', keyword: 'this_month' },
  { title: 'Next month', keyword: 'next_month' },
  { title: 'Last month', keyword: "last_month" },
]

export function removeDuplicatesFromStringArr({ arr }) {
  return [...new Set(arr)];
}

export function getMaxByKey({ arr, key }) {
  if (!arr.length) return null;

  return arr.reduce((maxObj, current) => {
    return current[key] > maxObj[key] ? current : maxObj;
  });
}