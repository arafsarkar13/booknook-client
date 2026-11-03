"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  // Stays empty until the browser has loaded, so the server and browser agree
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0); // show the time right away
    const timer = setInterval(tick, 1000); // then update every second
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  // Empty space of the same size while loading, so nothing jumps
  if (!now) return <div className="h-5 w-64" aria-hidden="true" />;

  const date = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
      role="timer"
      aria-label="Current date and time"
    >
      {/* Small pulsing dot to show the clock is live */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <span>{date}</span>
      <span className="text-primary">·</span>
      <span className="tabular-nums">{time}</span>
    </div>
  );
}
