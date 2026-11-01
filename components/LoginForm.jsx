"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

// Only allow redirects to pages inside our own site (stops fake links)
function safeRedirect(url) {
  return url && url.startsWith("/") && !url.startsWith("//") ? url : "/";
}

export default function LoginForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [loading, setLoading] = useState(false);

  const registerHref = callbackUrl
    ? `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/register";

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
      return;
    }

    toast.success("Welcome back to BookNook!");
    router.push(safeRedirect(callbackUrl));
    router.refresh();
  }

  function handleForgotPassword() {
    toast("Password reset is not available yet.", { icon: "🔒" });
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
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm opacity-75">
          Log in to add, borrow and return books.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Your password"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3"
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-xs opacity-70">OR</div>
        <GoogleButton callbackUrl={callbackUrl} />

        <p className="mt-6 text-center text-sm opacity-80">
          New to BookNook?{" "}
          <Link
            href={registerHref}
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
