import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

// A server file can set the tab title, so the form lives in its own component
export const metadata = { title: "BookNook | Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
