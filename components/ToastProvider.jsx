"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(15, 26, 58, 0.92)",
          color: "#f3f1ea",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
        },
      }}
    />
  );
}
