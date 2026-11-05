"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BookCard({ book, index = 0 }) {
  // If the image link is broken, we show a book icon instead
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass group flex h-full flex-col overflow-hidden"
    >
      {/* Every cover has the same shape */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-base-300/50">
        {imageFailed || !book.image ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-base-200">
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 text-primary/70 sm:h-20 sm:w-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            </svg>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      {/* Smaller padding and text on phones, normal size from tablet up */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <span className="w-fit rounded-full bg-base-content/10 px-2.5 py-0.5 text-[11px] font-medium sm:px-3 sm:py-1 sm:text-xs">
          {book.category}
        </span>
        <h3
          title={book.title}
          className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug sm:mt-3 sm:min-h-[3.5rem] sm:text-xl"
        >
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs opacity-75 sm:text-sm">
          by {book.author}
        </p>

        <div className="mt-auto pt-3 sm:pt-5">
          <Link
            href={`/books/${book._id}`}
            className="btn-gold block w-full rounded-full py-2 text-center text-xs sm:py-2.5 sm:text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
