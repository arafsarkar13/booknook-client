import { Suspense } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "BookNook | Home",
  description: "Add a book, borrow a book, return a book.",
};

// Runs before the page is drawn, so there is no flash of the wrong theme
const themeScript = `
  try {
    var saved = localStorage.getItem("booknook-theme");
    if (saved === "booknook-light" || saved === "booknook-dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (error) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="booknook-dark"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Placeholder bar shown for a split second while the navbar loads */}
        <Suspense
          fallback={
            <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
              <div className="glass mx-auto h-[68px] max-w-6xl" />
            </div>
          }
        >
          <Navbar />
        </Suspense>
        <main className="flex-1 pt-28">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
