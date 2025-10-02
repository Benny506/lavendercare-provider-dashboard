import { useEffect, useRef, useState } from "react";

/**
 * useCountdown Hook
 *
 * Modes:
 *  - If `endDate` is passed: counts down until that exact date/time.
 *  - If `startHour` and `durationInSeconds` are passed: counts down from startHour for durationInSeconds.
 *  - If `startTime` and `durationInSeconds` are passed: counts down until startTime + durationInSeconds.
 *  - If nothing is passed: returns null and does not run.
 *
 * @param {number} [startHour] - Hour of the day to start (0–23).
 * @param {number} [durationInSeconds] - Duration of the countdown in seconds.
 * @param {string} [endDate] - ISO string of the target end date/time.
 * @param {string} [startTime] - ISO string of the start date/time.
 */
export function useCountdown({
  startHour,
  durationInSeconds,
  endDate,
  startTime,
}) {
  const [remaining, setRemaining] = useState(null);
  const [status, setStatus] = useState("running");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (
      !endDate &&
      (startHour == null || durationInSeconds == null) &&
      (startTime == null || durationInSeconds == null)
    ) {
      return;
    }

    const getStartTimeFromHour = () => {
      const now = new Date();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        0,
        0,
        0
      );
    };

    intervalRef.current = setInterval(() => {
      const now = new Date();
      let newRemaining = 0;

      if (endDate) {
        // Mode 1: Countdown until exact endDate
        const target = new Date(endDate);
        const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
        newRemaining = Math.max(diff, 0);
        setStatus(diff > 0 ? "running" : "ended");
      } else if (startTime) {
        // Mode 2: Countdown until (startTime + duration)
        const start = new Date(startTime);

        if (now < start) {
          // Not started yet
          newRemaining = 0;
          setStatus("not_started");
        } else {
          const target = new Date(start.getTime() + durationInSeconds * 1000);
          const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
          newRemaining = Math.max(diff, 0);
          setStatus(diff > 0 ? "running" : "ended");
        }
      } else {
        // Mode 3: Countdown until (startHour + duration)
        const start = getStartTimeFromHour();
        const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000);

        if (now < start) {
          newRemaining = 0;
          setStatus("not_started");
        } else {
          newRemaining = Math.max(durationInSeconds - elapsed, 0);
          setStatus(newRemaining > 0 ? "running" : "ended");
        }
      }

      setRemaining(newRemaining);

      if (newRemaining === 0 && status === "ended" && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startHour, durationInSeconds, endDate, startTime]);

  // --- Formatter: convert seconds into yrs, months, days, hrs, mins, secs
  const formatTime = (seconds) => {
    if (seconds == null) return null;

    if (status === "not_started") return "Not started yet";
    if (status === "ended") return "Ended";

    let s = seconds;

    const years = Math.floor(s / (365 * 24 * 60 * 60));
    s -= years * 365 * 24 * 60 * 60;

    const months = Math.floor(s / (30 * 24 * 60 * 60));
    s -= months * 30 * 24 * 60 * 60;

    const days = Math.floor(s / (24 * 60 * 60));
    s -= days * 24 * 60 * 60;

    const hours = Math.floor(s / (60 * 60));
    s -= hours * 60 * 60;

    const mins = Math.floor(s / 60);
    s -= mins * 60;

    const secs = s;

    const parts = [];
    if (years) parts.push(`${years}yr${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months}month${months > 1 ? "s" : ""}`);
    if (days) parts.push(`${days}day${days > 1 ? "s" : ""}`);
    if (hours) parts.push(`${hours}hour${hours > 1 ? "s" : ""}`);
    if (mins) parts.push(`${mins}min${mins > 1 ? "s" : ""}`);
    if (secs || parts.length === 0)
      parts.push(`${secs}sec${secs > 1 ? "s" : ""}`);

    return parts.join(" ");
  };

  return { remaining, formatted: formatTime(remaining), status };
}
