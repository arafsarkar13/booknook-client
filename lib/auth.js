import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";

const globalForMongo = globalThis;
const client =
  globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  hooks: {
    // Runs before sign-up, so the rule works even if someone skips the form
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const password = ctx.body?.password || "";

      if (password.length < 6) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must be at least 6 characters long.",
        });
      }
      if (!/[A-Z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must contain an uppercase letter.",
        });
      }
      if (!/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must contain a lowercase letter.",
        });
      }
    }),
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    // Lets logged-in users get a signed token for our Express server
    jwt({
      jwt: {
        // Only put what the server needs inside the token
        definePayload: ({ user }) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      },
    }),
    // Keep nextCookies last: it lets login work inside Next.js server code
    nextCookies(),
  ],
});
