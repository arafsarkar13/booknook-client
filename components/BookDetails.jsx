"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";

export default function BookDetails() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const dialogRef = useRef(null);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  // Load the book when the page opens
  useEffect(() => {
    let cancelled = false;

    apiFetch(`/books/${id}`, { auth: true })
      .then((data) => {
        if (!cancelled) {
          setBook(data);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // If the visitor leaves the page, ignore the late answer
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Reload the book after borrowing so the copy count is fresh
  async function refreshBook() {
    try {
      setBook(await apiFetch(`/books/${id}`, { auth: true }));
    } catch {
      // If the refresh fails, we simply keep showing the old details
    }
  }

  // The tab title shows the book name once it is loaded
  useEffect(() => {
    if (book) document.title = `BookNook | ${book.title}`;
  }, [book]);

  async function confirmBorrow() {
    setBorrowing(true);
    try {
      const result = await apiFetch("/borrows", {
        method: "POST",
        auth: true,
        body: JSON.stringify({ bookId: id }),
      });
      // Close the pop-up first, because it would cover the toast message
      dialogRef.current?.close();
      toast.success(result.message);
    } catch (err) {
      dialogRef.current?.close();
      toast.error(err.message);
    } finally {
      setBorrowing(false);
      refreshBook();
    }
  }
  if (loading) {
    return <Loader label="Loading book details..." />;
  }

  if (error || !book) {
    return (
      <section className="mx-auto max-w-lg px-4 pb-10">
        <div className="glass p-8 text-center">
          <h1 className="text-2xl font-bold text-primary">
            We could not open this book
          </h1>
          <p className="mt-3 text-error">{error || "Book not found."}</p>
          <Link
            href="/books"
            className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-sm"
          >
            Back to All Books
          </Link>
        </div>
      </section>
    );
  }

  const available = book.availableCopies > 0;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <Link
        href="/books"
        className="mb-6 inline-block text-sm text-primary hover:underline"
      >
        ← Back to All Books
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass grid gap-8 p-6 md:grid-cols-[320px_1fr] md:p-10"
      >
        {/* Cover image */}
        <div className="h-96 w-full overflow-hidden rounded-2xl bg-base-300/50 md:h-[28rem]">
          {imageFailed || !book.image ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-base-200">
              <svg
                viewBox="0 0 24 24"
                className="h-24 w-24 text-primary/70"
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
              className="h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        {/* Information */}
        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-content">
            {book.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{book.title}</h1>
          <p className="mt-2 text-lg opacity-80">by {book.author}</p>

          <p className="mt-6 leading-relaxed opacity-85">{book.description}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-primary">Added by:</dt>
              <dd>
                {book.addedBy.name} ({book.addedBy.email})
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-primary">Availability:</dt>
              <dd>
                {book.availableCopies} of {book.totalCopies}{" "}
                {book.totalCopies === 1 ? "copy" : "copies"} available
              </dd>
            </div>
          </dl>

          <div className="mt-auto pt-8">
            <button
              type="button"
              disabled={!available || !user}
              onClick={() => dialogRef.current?.showModal()}
              className={`rounded-full px-10 py-3 ${
                available
                  ? "btn-gold"
                  : "cursor-not-allowed border border-base-content/20 text-base-content/50"
              }`}
            >
              {available ? "Borrow This Book" : "Not Available"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Borrow pop-up */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box border border-base-content/15 bg-base-200">
          <h2 className="text-2xl font-bold text-primary">Borrow this book</h2>
          <p className="mt-2 text-sm opacity-75">
            You are borrowing{" "}
            <span className="font-semibold">{book.title}</span>. Please return
            it within 7 days.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="borrowName"
                className="mb-1 block text-sm font-medium"
              >
                Your Name
              </label>
              <input
                id="borrowName"
                type="text"
                value={user?.name ?? ""}
                readOnly
                className="input w-full opacity-70"
              />
            </div>
            <div>
              <label
                htmlFor="borrowEmail"
                className="mb-1 block text-sm font-medium"
              >
                Your Email
              </label>
              <input
                id="borrowEmail"
                type="email"
                value={user?.email ?? ""}
                readOnly
                className="input w-full opacity-70"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full border border-base-content/25 px-6 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmBorrow}
              disabled={borrowing}
              className="btn-gold flex items-center gap-2 rounded-full px-6 py-2 text-sm"
            >
              {borrowing && (
                <span className="loading loading-spinner loading-xs" />
              )}
              {borrowing ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </div>
        </div>
        {/* Clicking the dark area outside also closes the pop-up */}
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </section>
  );
}
