export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="glass max-w-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-primary">BookNook</h1>
        <p className="mt-4 opacity-80">
          Add a book, borrow a book, return a book.
        </p>
        <button className="btn-gold mt-8 rounded-full px-8 py-3">
          Browse Books
        </button>
      </section>
    </main>
  );
}
