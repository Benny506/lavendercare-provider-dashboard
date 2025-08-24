import { useEffect, useRef, useState } from "react";

/**
 * useCountdown Hook
 * @param {number} startHour - Hour of the day to start (0–23).
 * @param {number} durationInSeconds - Duration of the countdown in seconds.
 */
export function useCountdown({ startHour, durationInSeconds }) {
  const [remaining, setRemaining] = useState(durationInSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {

    // Calculate the official start time (today at startHour:00:00)
    const getStartTime = () => {
        const now = new Date();
        const startTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            startHour,
            0,
            0,
            0
        );
        return startTime;
    };

    intervalRef.current = setInterval(() => {
        const now = new Date();
        const startTime = getStartTime();
        const elapsed = Math.floor((now - startTime) / 1000);
        const newRemaining = Math.max(durationInSeconds - elapsed, 0);
        setRemaining(newRemaining);  
    
        if(newRemaining === 0){
            console.log("Remaining is 0")
            clearInterval(intervalRef.current)
        }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { remaining };
}
