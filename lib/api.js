import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// path: for example "/books". Set auth: true for routes that need a logged-in user.
export async function apiFetch(path, { auth = false, ...options } = {}) {
  const headers = { ...options.headers };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      throw new Error("Please log in again.");
    }
    headers.Authorization = `Bearer ${data.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Something went wrong. Please try again.");
  }
  return body;
}
