"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Nothing is saved yet, so we say so honestly
    toast("Thanks for your interest! Newsletter sign-up is coming soon.", {
      icon: "📬",
    });
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email"
        aria-label="Your email for the newsletter"
        className="input w-full min-w-0 flex-1"
      />
      <button
        type="submit"
        className="btn-gold shrink-0 rounded-lg px-4 text-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
