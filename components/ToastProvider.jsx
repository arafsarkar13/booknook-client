"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(35, 23, 16, 0.94)",
          color: "#f3f1ea",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
        },
      }}
    />
  );
}
