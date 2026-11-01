import { betterAuth } from "better-auth";
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

  plugins: [nextCookies()],
});
