import { useEffect, useRef, useState } from "react";

function weekdayNameToNumber(name) {
  if (!name) return null;
  const map = {
    sunday: 0, sun: 0,
    monday: 1, mon: 1,
    tuesday: 2, tue: 2, tues: 2,
    wednesday: 3, wed: 3,
    thursday: 4, thu: 4, thur: 4, thurs: 4,
    friday: 5, fri: 5,
    saturday: 6, sat: 6,
  };
  return map[name.toLowerCase()] ?? null;
}

function getDateForWeekday(targetWeekday, startHour) {
  // Returns the next date (could be today) whose weekday == targetWeekday,
  // but if today is the target and time already passed for startHour, it returns next week's day.
  const now = new Date();
  const todayWeekday = now.getDay(); // 0..6
  let daysUntil = (targetWeekday - todayWeekday + 7) % 7;

  const candidate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntil,
    startHour,
    0,
    0,
    0
  );

  // If candidate is in the past (i.e., today and hour passed), move to next week
  if (candidate <= now) {
    // If candidate is still equal to now but within the same second, we still accept it.
    // Move to next week only if candidate < now
    if (candidate < now) {
      candidate.setDate(candidate.getDate() + 7);
    }
  }

  return candidate;
}

export function useCountdown({ startHour, durationInSeconds, day }) {
  const [remaining, setRemaining] = useState(durationInSeconds);
  const intervalRef = useRef(null);

  // compute startDate based on `day`
  const computeStartTime = () => {
    const now = new Date();

    // 1) If day is a Date or date-string, try to use it
    if (day instanceof Date && !isNaN(day.getTime())) {
      // normalize to startHour
      const d = new Date(day);
      d.setHours(startHour, 0, 0, 0);
      return d;
    }
    const maybeDate = new Date(day);
    if (typeof day === "string" && !isNaN(maybeDate.getTime())) {
      const d = new Date(maybeDate);
      d.setHours(startHour, 0, 0, 0);
      return d;
    }

    // 2) special keywords
    if (typeof day === "string") {
      const lower = day.trim().toLowerCase();
      if (lower === "today") {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0, 0);
      }
      if (lower === "tomorrow") {
        const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, 0, 0, 0);
        return t;
      }
    }

    // 3) weekday name or numeric weekday
    if (typeof day === "number" && day >= 0 && day <= 6) {
      return getDateForWeekday(day, startHour);
    }

    if (typeof day === "string") {
      const weekdayNum = weekdayNameToNumber(day.trim().toLowerCase());
      if (weekdayNum !== null) {
        return getDateForWeekday(weekdayNum, startHour);
      }
    }

    // 4) default: use today at startHour
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0, 0);
  };

  useEffect(() => {
    // clear previous interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // compute start & end
    const startTime = computeStartTime();
    const endTime = new Date(startTime.getTime() + durationInSeconds * 1000);

    const tick = () => {
      const now = new Date();
      const diffSec = Math.ceil((endTime - now) / 1000); // seconds until end
      const newRemaining = Math.max(diffSec, 0);
      setRemaining(newRemaining);

      if (newRemaining === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Do initial tick immediately
    tick();

    // then start interval
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startHour, durationInSeconds, // re-run when these change
      // We include a stable serialization of `day` so hook reruns when `day` changes.
      typeof day === "object" ? (day ? day.toString() : "") : String(day)
  ]);

  return { remaining };
}
