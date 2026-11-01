import { Suspense } from "react";
import BookDetails from "@/components/BookDetails";
import Loader from "@/components/Loader";

export const metadata = { title: "BookNook | Book Details" };

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<Loader label="Loading book details..." />}>
      <BookDetails />
    </Suspense>
  );
}
