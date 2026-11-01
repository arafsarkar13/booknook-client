"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import BookCard from "./BookCard";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The server already sorts newest first and limits to 6
  useEffect(() => {
    apiFetch("/books?limit=6")
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionTitle
        title="New Arrivals"
        subtitle="Fresh additions to the shelf, shared by readers just like you."
      />

      {loading ? (
        <Loader label="Loading new arrivals..." />
      ) : error ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-error">{error}</p>
          <p className="mt-2 text-sm opacity-70">
            Please refresh the page and try again.
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-lg font-semibold">The shelf is empty for now.</p>
          <p className="mt-2 text-sm opacity-70">
            Be the first reader to add a book.
          </p>
          <Link
            href="/add-book"
            className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-sm"
          >
            Add a Book
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="btn-gold inline-block rounded-full px-10 py-3"
            >
              See All Books
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
