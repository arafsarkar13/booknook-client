import Link from "next/link";

export const metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-10">
      <div className="glass p-10 text-center">
        <p className="font-serif text-8xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">
          This page is not on our shelf
        </h1>
        <p className="mt-3 text-sm leading-relaxed opacity-75">
          The page you are looking for may have been moved, or the address may
          have a typo. Let us take you back to a place we know well.
        </p>
        <Link
          href="/"
          className="btn-gold mt-8 inline-block rounded-full px-10 py-3"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
