import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one database connection while developing (avoids too many connections)
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
