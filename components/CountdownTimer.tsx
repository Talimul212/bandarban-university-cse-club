"use client";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = differenceInSeconds(target, now);

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (3600 * 24)),
        hours: Math.floor((diff % (3600 * 24)) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="bg-green-600 text-white md:p-3 rounded-lg min-w-17.5"
        >
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs uppercase text-gray-200">{unit}</div>
        </div>
      ))}
    </div>
  );
}
