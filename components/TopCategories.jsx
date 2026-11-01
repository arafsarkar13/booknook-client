"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const categories = [
  {
    name: "Fiction",
    text: "Stories that carry you away",
    icon: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    name: "Science",
    text: "Curious minds, big ideas",
    icon: (
      <>
        <path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5l-5.1-10.1a2 2 0 0 1-.2-.9V2" />
        <path d="M8.5 2h7M7 16h10" />
      </>
    ),
  },
  {
    name: "History",
    text: "The past, told well",
    icon: (
      <>
        <path d="M12 2 20 7H4z" />
        <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      </>
    ),
  },
  {
    name: "Kids",
    text: "Tales for little readers",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </>
    ),
  },
  {
    name: "Others",
    text: "Everything else worth reading",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionTitle
        title="Top Categories"
        subtitle="Pick a shelf and start exploring."
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="h-full"
          >
            <Link
              href={`/books?category=${category.name}`}
              className="glass flex h-full flex-col items-center p-6 text-center transition-colors hover:border-primary"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {category.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold">{category.name}</h3>
              <p className="mt-1 text-xs opacity-70">{category.text}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
