"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

// 26 Nov 2026
function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// A small tag that shows how much time is left
function DueTag({ returnDate }) {
  const daysLeft = Math.ceil(
    (new Date(returnDate) - new Date()) / (24 * 60 * 60 * 1000),
  );

  if (daysLeft < 0) {
    return (
      <span className="rounded-full bg-error/20 px-3 py-1 text-xs font-semibold text-error">
        Overdue
      </span>
    );
  }
  if (daysLeft <= 1) {
    return (
      <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning">
        Due today
      </span>
    );
  }
  return (
    <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
      {daysLeft} days left
    </span>
  );
}

// Small cover picture with a fallback icon if the link is broken
function Cover({ src, title }) {
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

export default function MyBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    apiFetch("/borrows", { auth: true })
      .then(setBorrows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleReturn(borrow) {
    setReturningId(borrow._id);
    try {
      const result = await apiFetch(`/borrows/${borrow._id}`, {
        method: "DELETE",
        auth: true,
      });
      // Remove the row right away, without reloading the page
      setBorrows((current) =>
        current.filter((item) => item._id !== borrow._id),
      );
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturningId("");
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <SectionTitle
        title="My Borrows"
        subtitle="The books you have borrowed. Please return each one by its return date."
      />

      {loading ? (
        <Loader label="Loading your borrowed books..." />
      ) : error ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-error">{error}</p>
          <p className="mt-2 text-sm opacity-70">
            Please refresh the page and try again.
          </p>
        </div>
      ) : borrows.length === 0 ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-lg font-semibold">
            You have not borrowed any books yet.
          </p>
          <p className="mt-2 text-sm opacity-70">
            Find something good on the shelf.
          </p>
          <Link
            href="/books"
            className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-sm"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass overflow-x-auto"
        >
          <table className="table">
            <thead>
              <tr className="text-primary">
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td>
                    <Cover src={borrow.bookImage} title={borrow.bookTitle} />
                  </td>
                  <td className="min-w-40">
                    <Link
                      href={`/books/${borrow.bookId}`}
                      className="font-semibold hover:text-primary"
                    >
                      {borrow.bookTitle}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDate(borrow.borrowDate)}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex flex-col items-start gap-1">
                      <span>{formatDate(borrow.returnDate)}</span>
                      <DueTag returnDate={borrow.returnDate} />
                    </div>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => handleReturn(borrow)}
                      disabled={returningId === borrow._id}
                      className="btn-gold inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm"
                    >
                      {returningId === borrow._id && (
                        <span className="loading loading-spinner loading-xs" />
                      )}
                      {returningId === borrow._id
                        ? "Returning..."
                        : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </section>
  );
}
