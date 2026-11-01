"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const steps = [
  {
    title: "Find a Book",
    text: "Browse the shelf by title or category and open any book to read its details.",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Borrow It",
    text: "Log in, press Borrow This Book and confirm. The book is yours for seven days.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    title: "Return It",
    text: "Finished reading? Return it from My Borrows so the next reader can enjoy it.",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionTitle
        title="How Borrowing Works"
        subtitle="Three simple steps from the shelf to your hands and back again."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="glass relative h-full p-8 text-center"
          >
            <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-primary/20">
              {index + 1}
            </span>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {step.icon}
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-75">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
