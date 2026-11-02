"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

function StatCard({ label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-base-content/15 bg-base-content/5 p-6 text-center"
    >
      <p className="font-serif text-4xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm opacity-75">{label}</p>
    </motion.div>
  );
}

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  // Books added and books currently borrowed
  useEffect(() => {
    if (!user?.email) return;

    Promise.all([
      apiFetch(`/books?addedBy=${encodeURIComponent(user.email)}`),
      apiFetch("/borrows", { auth: true }),
    ])
      .then(([books, borrows]) =>
        setStats({ added: books.length, borrowed: borrows.length }),
      )
      .catch(() => setStats({ added: "–", borrowed: "–" }));
  }, [user?.email]);

  if (isPending || !user) {
    return <Loader label="Loading your profile..." />;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="mx-auto max-w-3xl px-4 pb-10">
      <SectionTitle
        title="My Profile"
        subtitle="Your account and your library activity."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass p-8 md:p-10"
      >
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-primary/70">
            {user.image && !imageFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-secondary font-serif text-4xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="mt-1 opacity-80">{user.email}</p>
            {memberSince && (
              <p className="mt-2 text-sm text-primary">
                Member since {memberSince}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Books added"
            value={stats ? stats.added : "…"}
            delay={0.2}
          />
          <StatCard
            label="Books borrowed now"
            value={stats ? stats.borrowed : "…"}
            delay={0.3}
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/add-book"
            className="btn-gold rounded-full px-6 py-2.5 text-sm"
          >
            Add a Book
          </Link>
          <Link
            href="/my-books"
            className="rounded-full border border-base-content/25 px-6 py-2.5 text-sm transition hover:border-primary hover:text-primary"
          >
            My Books
          </Link>
          <Link
            href="/my-borrows"
            className="rounded-full border border-base-content/25 px-6 py-2.5 text-sm transition hover:border-primary hover:text-primary"
          >
            My Borrows
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
