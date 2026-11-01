"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

// Returns an error message, or "" when the password is fine
function checkPassword(password) {
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter.";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Keep the "go back to this page after login" info when moving between auth pages
  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/login";

  async function handleSubmit(event) {
    event.preventDefault();

    // Read the form values before any waiting happens
    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const photo = form.get("photo").trim();
    const password = form.get("password");

    // Stop here if the password breaks the rules
    const message = checkPassword(password);
    setPasswordError(message);
    if (message) return;

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo || undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    // Registering signs the user in behind the scenes, so sign out first.
    // The assignment wants the user to land on the Login page next.
    await authClient.signOut();
    toast.success("Account created! Please log in.");
    router.push(loginHref);
  }

  return (
    <section className="flex items-center justify-center px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass w-full max-w-md p-8"
      >
        <h1 className="text-center text-3xl font-bold text-primary">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm opacity-75">
          Join BookNook to add, borrow and return books.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="photo" className="mb-1 block text-sm font-medium">
              Photo URL <span className="opacity-60">(optional)</span>
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              placeholder="https://example.com/my-photo.jpg"
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="At least 6 characters"
              className="input w-full"
            />
            {passwordError ? (
              <p className="mt-2 text-sm text-error">{passwordError}</p>
            ) : (
              <p className="mt-2 text-xs opacity-60">
                Use an uppercase letter, a lowercase letter and 6+ characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3"
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="divider my-6 text-xs opacity-70">OR</div>
        <GoogleButton callbackUrl={callbackUrl} />

        <p className="mt-6 text-center text-sm opacity-80">
          Already have an account?{" "}
          <Link
            href={loginHref}
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
