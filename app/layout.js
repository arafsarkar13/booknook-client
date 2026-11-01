import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="booknook-dark"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
