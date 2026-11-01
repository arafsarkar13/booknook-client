"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import Loader from "./Loader";
import SectionTitle from "./SectionTitle";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];
const MAX_IMAGE_MB = 5;

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Check the chosen picture and show a small preview
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

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Read the form values before any waiting happens
    const form = new FormData(event.currentTarget);

    if (!imageFile) {
      toast.error("Please choose a cover image for the book.");
      return;
    }

    setSubmitting(true);
    try {
      const imageUrl = await uploadToImgbb(imageFile);

      await apiFetch("/books", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          totalCopies: form.get("totalCopies"),
          image: imageUrl,
        }),
      });

      toast.success("Book added successfully!");
      router.push("/books");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isPending || !user) {
    return <Loader label="Getting things ready..." />;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pb-10">
      <SectionTitle
        title="Add a Book"
        subtitle="Share a book with the community. Other readers will be able to borrow it."
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass space-y-5 p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Book Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              maxLength={120}
              placeholder="For example, The Silent Garden"
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="author" className="mb-1 block text-sm font-medium">
              Author Name
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              maxLength={80}
              placeholder="Who wrote it?"
              className="input w-full"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="select w-full"
            >
              <option value="" disabled>
                Choose a category
              </option>
              {CATEGORIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="totalCopies"
              className="mb-1 block text-sm font-medium"
            >
              Total Copies
            </label>
            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              required
              min={1}
              max={100}
              defaultValue={1}
              className="input w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block text-sm font-medium">
            Book Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input w-full"
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Selected cover preview"
              className="mt-4 h-48 w-36 rounded-xl object-cover ring-1 ring-primary/40"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            maxLength={500}
            placeholder="What is this book about?"
            className="textarea w-full"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="userName"
              className="mb-1 block text-sm font-medium"
            >
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={user.name}
              readOnly
              className="input w-full opacity-70"
            />
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="mb-1 block text-sm font-medium"
            >
              Your Email
            </label>
            <input
              id="userEmail"
              type="email"
              value={user.email}
              readOnly
              className="input w-full opacity-70"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3"
        >
          {submitting && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {submitting ? "Adding book..." : "Add Book"}
        </button>
      </motion.form>
    </section>
  );
}
