"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/siteInfo";

export default function CtaBanner() {
  return (
    <section className="px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/25 bg-gradient-to-br from-primary via-primary/90 to-accent/80 px-6 py-14 text-center text-primary-content shadow-2xl"
      >
        {/* Soft glass blobs for depth */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-black/10 blur-2xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl">
            Find Your Next Great Read, Or Share One Of Your Own!
          </h2>
          <p className="mt-5 text-base md:text-lg">
            Questions? Write to{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-bold underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/books"
              className="rounded-full bg-base-100 px-8 py-3 text-sm font-semibold text-base-content transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Browse Books
            </Link>
            <Link
              href="/add-book"
              className="rounded-full border-2 border-primary-content/70 px-8 py-3 text-sm font-semibold transition hover:bg-primary-content hover:text-primary"
            >
              Add a Book
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
