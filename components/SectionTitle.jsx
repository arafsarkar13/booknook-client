"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 opacity-75">{subtitle}</p>}
      <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-primary/60" />
    </motion.div>
  );
}
