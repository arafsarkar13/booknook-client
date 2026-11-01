"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import BookThumb from "./BookThumb";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];
const MAX_IMAGE_MB = 5;

export default function MyBooks() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const editRef = useRef(null);
  const deleteRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit pop-up state
  const [editing, setEditing] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete pop-up state
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // Only the books added by the logged in user
  const loadBooks = useCallback(async () => {
    const data = await apiFetch(`/books?addedBy=${encodeURIComponent(email)}`);
    setBooks(data);
  }, [email]);

  useEffect(() => {
    if (!email) {
      if (!isPending) setLoading(false);
      return;
    }
    loadBooks()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [email, isPending, loadBooks]);

  /* ---------- Edit ---------- */

  function openEdit(book) {
    setEditing(book);
    setNewImage(null);
    setPreview("");
    editRef.current?.showModal();
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`The image must be smaller than ${MAX_IMAGE_MB} MB.`);
      event.target.value = "";
      return;
    }
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleEditSubmit(event) {
    event.preventDefault();

    // Read the form values before any waiting happens
    const form = new FormData(event.currentTarget);

    setSaving(true);
    try {
      // Keep the old cover unless a new picture was chosen
      const image = newImage ? await uploadToImgbb(newImage) : editing.image;

      await apiFetch(`/books/${editing._id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          totalCopies: form.get("totalCopies"),
          image,
        }),
      });

      toast.success("Book updated successfully!");
      editRef.current?.close();
      await loadBooks();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  /* ---------- Delete ---------- */

  function openDelete(book) {
    setDeleting(book);
    deleteRef.current?.showModal();
  }

  async function confirmDelete() {
    setDeleteBusy(true);
    try {
      const result = await apiFetch(`/books/${deleting._id}`, {
        method: "DELETE",
        auth: true,
      });
      // Remove the row right away, without reloading the page
      setBooks((current) =>
        current.filter((book) => book._id !== deleting._id),
      );
      toast.success(result.message);
    } catch (err) {
      // For example: "This book is currently borrowed, so it cannot be deleted."
      toast.error(err.message);
    } finally {
      setDeleteBusy(false);
      deleteRef.current?.close();
    }
  }

  /* ---------- Page ---------- */

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <SectionTitle
        title="My Books"
        subtitle="The books you have added. Edit their details or remove them from the shelf."
      />

      {isPending || loading ? (
        <Loader label="Loading your books..." />
      ) : error ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-error">{error}</p>
          <p className="mt-2 text-sm opacity-70">
            Please refresh the page and try again.
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="glass mx-auto max-w-lg p-8 text-center">
          <p className="text-lg font-semibold">
            You have not added any books yet.
          </p>
          <p className="mt-2 text-sm opacity-70">
            Share your first book with the community.
          </p>
          <Link
            href="/add-book"
            className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-sm"
          >
            Add a Book
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
                <th>Category</th>
                <th>Copies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <BookThumb src={book.image} title={book.title} />
                  </td>
                  <td className="min-w-40">
                    <Link
                      href={`/books/${book._id}`}
                      className="font-semibold hover:text-primary"
                    >
                      {book.title}
                    </Link>
                    <p className="text-xs opacity-70">by {book.author}</p>
                  </td>
                  <td>{book.category}</td>
                  <td className="whitespace-nowrap">
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(book)}
                        className="btn-gold rounded-full px-5 py-2 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDelete(book)}
                        className="rounded-full border border-error/60 px-5 py-2 text-sm text-error transition hover:bg-error/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Edit pop-up */}
      <dialog ref={editRef} className="modal" onClose={() => setEditing(null)}>
        <div className="modal-box max-w-2xl border border-base-content/15 bg-base-200">
          {editing && (
            <form
              key={editing._id}
              onSubmit={handleEditSubmit}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-primary">Edit book</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="editTitle"
                    className="mb-1 block text-sm font-medium"
                  >
                    Book Title
                  </label>
                  <input
                    id="editTitle"
                    name="title"
                    type="text"
                    required
                    maxLength={120}
                    defaultValue={editing.title}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editAuthor"
                    className="mb-1 block text-sm font-medium"
                  >
                    Author Name
                  </label>
                  <input
                    id="editAuthor"
                    name="author"
                    type="text"
                    required
                    maxLength={80}
                    defaultValue={editing.author}
                    className="input w-full"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="editCategory"
                    className="mb-1 block text-sm font-medium"
                  >
                    Category
                  </label>
                  <select
                    id="editCategory"
                    name="category"
                    required
                    defaultValue={editing.category}
                    className="select w-full"
                  >
                    {CATEGORIES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="editCopies"
                    className="mb-1 block text-sm font-medium"
                  >
                    Total Copies
                  </label>
                  <input
                    id="editCopies"
                    name="totalCopies"
                    type="number"
                    required
                    min={1}
                    max={100}
                    defaultValue={editing.totalCopies}
                    className="input w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="editImage"
                  className="mb-1 block text-sm font-medium"
                >
                  Book Image{" "}
                  <span className="opacity-60">
                    (leave empty to keep the current one)
                  </span>
                </label>
                <input
                  id="editImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input w-full"
                />
                <div className="mt-3">
                  <BookThumb
                    src={preview || editing.image}
                    title={editing.title}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="editDescription"
                  className="mb-1 block text-sm font-medium"
                >
                  Short Description
                </label>
                <textarea
                  id="editDescription"
                  name="description"
                  required
                  rows={4}
                  maxLength={500}
                  defaultValue={editing.description}
                  className="textarea w-full"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => editRef.current?.close()}
                  className="rounded-full border border-base-content/25 px-6 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold flex items-center gap-2 rounded-full px-6 py-2 text-sm"
                >
                  {saving && (
                    <span className="loading loading-spinner loading-xs" />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>

      {/* Delete confirmation pop-up */}
      <dialog
        ref={deleteRef}
        className="modal"
        onClose={() => setDeleting(null)}
      >
        <div className="modal-box border border-base-content/15 bg-base-200">
          <h2 className="text-2xl font-bold text-error">Delete this book?</h2>
          <p className="mt-3 text-sm opacity-80">
            You are about to delete{" "}
            <span className="font-semibold">{deleting?.title}</span>. This
            cannot be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => deleteRef.current?.close()}
              className="rounded-full border border-base-content/25 px-6 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleteBusy}
              className="flex items-center gap-2 rounded-full bg-error px-6 py-2 text-sm font-semibold text-white"
            >
              {deleteBusy && (
                <span className="loading loading-spinner loading-xs" />
              )}
              {deleteBusy ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </section>
  );
}
