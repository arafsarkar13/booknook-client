import { Suspense } from "react";
import AllBooks from "@/components/AllBooks";
import Loader from "@/components/Loader";

export const metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return (
    <Suspense fallback={<Loader label="Loading books..." />}>
      <AllBooks />
    </Suspense>
  );
}
