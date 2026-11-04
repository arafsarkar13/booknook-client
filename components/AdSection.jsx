"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { SITE } from "@/lib/siteInfo";

const offers = [
  {
    title: "Highlight your book",
    text: "Put a book you wrote or love in front of every visitor on the Home page.",
  },
  {
    title: "Show your ad",
    text: "Reserve a banner spot for a bookshop, a school or a reading event.",
  },
];

export default function AdSection() {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("BookNook advertising enquiry")}`;

  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionTitle
        title="Advertise With BookNook"
        subtitle="Reach readers who are already looking for their next book."
      />

      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* What we offer and how to contact */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass flex flex-col p-8"
        >
          <ul className="space-y-6">
            {offers.map((offer) => (
              <li key={offer.title} className="flex gap-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-bold">{offer.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed opacity-75">
                    {offer.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href={mailto}
              className="btn-gold inline-block rounded-full px-8 py-3 text-sm"
            >
              Contact Us to Advertise
            </a>
            <p className="mt-3 text-xs opacity-60">
              Write to {SITE.email}. Spots are arranged by email.
            </p>
          </div>
        </motion.div>

        {/* Two example ad slots */}
        <div className="grid gap-6 sm:grid-cols-2">
          {["Ad space", "Featured book spot"].map((label, index) => (
            <motion.a
              key={label}
              href={mailto}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass flex min-h-56 flex-col items-center justify-center border-dashed p-6 text-center transition-colors hover:border-primary"
            >
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Sponsored
              </span>
              <p className="mt-4 font-serif text-2xl font-bold">{label}</p>
              <p className="mt-2 text-sm opacity-70">Your ad could be here</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
