"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import BookCard from "./BookCard";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

const CATEGORIES = ["All", "Fiction", "Science", "History", "Kids", "Others"];

export default function AllBooks() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // The chosen category lives in the address (for example /books?category=Kids),so links from the home page and page reloads keep working
  const urlCategory = searchParams.get("category");
  const category = CATEGORIES.includes(urlCategory) ? urlCategory : "All";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiFetch("/books")
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function selectCategory(name) {
    router.replace(name === "All" ? "/books" : `/books?category=${name}`, {
      scroll: false,
    });
  }

  // Apply the category and the search words together
  const visibleBooks = useMemo(() => {
    const words = search.trim().toLowerCase();
    return books.filter((book) => {
      const inCategory = category === "All" || book.category === category;
      const matchesSearch =
        !words || `${book.title} ${book.author}`.toLowerCase().includes(words);
      return inCategory && matchesSearch;
    });
  }, [books, category, search]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <SectionTitle
        title="All Books"
        subtitle="Every book on the shelf, ready to be borrowed."
      />

      {/* Search and category buttons */}
      <div className="mb-10 space-y-5">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or author"
          aria-label="Search books"
          className="input mx-auto block w-full max-w-md"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => selectCategory(name)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                category === name
                  ? "bg-primary text-primary-content"
                  : "border border-base-content/20 hover:border-primary hover:text-primary"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader label="Loading books..." />
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
      ) : visibleBooks.length === 0 ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-lg font-semibold">No books match your search.</p>
          <p className="mt-2 text-sm opacity-70">
            Try different words, or choose another category.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm opacity-70">
            Showing {visibleBooks.length}{" "}
            {visibleBooks.length === 1 ? "book" : "books"}
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBooks.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
