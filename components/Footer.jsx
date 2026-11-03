import Link from "next/link";
import Logo from "./Logo";
import LiveClock from "./LiveClock";
import NewsletterForm from "./NewsletterForm";
import ScrollToTop from "./ScrollToTop";
import { SITE } from "@/lib/siteInfo";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const socials = [
  {
    name: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "GitHub",
    href: "https://github.com/arafsarkar13",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

// Heading with the short accent line underneath
function FooterTitle({ children }) {
  return (
    <div className="mb-6">
      <p
        role="heading"
        aria-level={3}
        className="text-lg font-bold uppercase tracking-wide"
      >
        {children}
      </p>
      <span className="mt-2 block h-0.5 w-8 bg-primary" />
    </div>
  );
}

// Small line icon for the contact list
function ContactIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="px-4 pb-6 pt-16">
        <div className="glass mx-auto max-w-6xl px-6 pt-12 md:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr]">
            {/* Brand */}
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-75">
                A small online library where you can add a book, borrow a book,
                and return it when you are done.
              </p>
              <div className="mt-6 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-base-content/20 transition hover:-translate-y-1 hover:border-primary hover:text-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <FooterTitle>Book Categories</FooterTitle>
              <ul className="space-y-3 text-sm opacity-80">
                {categories.map((name) => (
                  <li key={name}>
                    <Link
                      href={`/books?category=${name}`}
                      className="transition hover:text-primary"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <FooterTitle>Contact Info</FooterTitle>
              <ul className="space-y-4 text-sm opacity-80">
                <li className="flex gap-3">
                  <ContactIcon>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </ContactIcon>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="transition hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <ContactIcon>
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </ContactIcon>
                  <span>{SITE.location}</span>
                </li>
                <li className="flex gap-3">
                  <ContactIcon>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </ContactIcon>
                  <span>{SITE.hours}</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <FooterTitle>Newsletter</FooterTitle>
              <p className="mb-4 text-sm leading-relaxed opacity-80">
                Subscribe to hear about new books on the shelf.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-base-content/15 py-6 text-center text-sm opacity-70 md:flex-row md:text-left">
            <p>© 2026 BookNook. All Rights Reserved.</p>
            <LiveClock />
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
