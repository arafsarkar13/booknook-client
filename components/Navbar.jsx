"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Logo from "./Logo";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

// Shown only when the user is logged in
const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Real login state from BetterAuth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  // The active page gets a gold pill
  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-primary text-primary-content"
        : "hover:bg-base-content/10"
    }`;

  // Close the avatar dropdown after choosing an item
  function closeDropdown() {
    document.activeElement?.blur();
  }

  async function handleLogout() {
    closeDropdown();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You have been logged out.");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? (
            // Still checking the session: show a placeholder
            <div className="h-10 w-28 animate-pulse rounded-full bg-base-content/10" />
          ) : user ? (
            // Logged in: photo with dropdown
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="h-10 w-10 rounded-full ring-2 ring-primary">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-secondary font-semibold">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-10 mt-3 w-56 rounded-2xl border border-base-content/15 bg-base-200 p-3 shadow-2xl"
              >
                <li className="menu-title text-base-content">{user.name}</li>
                <li>
                  <Link href="/profile" onClick={closeDropdown}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Logged out: Login and Register
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-base-content/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-gold rounded-full px-5 py-2 text-sm"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-full p-2 hover:bg-base-content/10 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-6xl p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block ${linkClass(link.href)}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {!isPending && !user && (
              <div className="mt-3 flex gap-2 sm:hidden">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-base-content/20 py-2 text-center text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="btn-gold flex-1 rounded-full py-2 text-center text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
