"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BookCard({ book, index = 0 }) {
  // If the image link is broken, show a book icon instead
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
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
              className="h-20 w-20 text-primary/70"
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-base-content/10 px-3 py-1 text-xs font-medium">
          {book.category}
        </span>
        <h3
          title={book.title}
          className="mt-3 line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug"
        >
          {book.title}
        </h3>
        <p className="mt-1 text-sm opacity-75">by {book.author}</p>

        <div className="mt-auto pt-5">
          <Link
            href={`/books/${book._id}`}
            className="btn-gold block w-full rounded-full py-2.5 text-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
