"use client";

import { useState } from "react";

export default function BookThumb({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-base-200">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-primary/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Cover of ${title}`}
      className="h-20 w-14 rounded-lg object-cover"
      onError={() => setFailed(true)}
    />
  );
}
