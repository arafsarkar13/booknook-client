# BookNook

**Add a book, borrow a book, return a book.**

BookNook is a small online library where readers share books, borrow them for seven days and return them when they are done.

**Live site:** https://booknookborrowbook.vercel.app

**Server repository:** https://github.com/arafsarkar13/booknook-server

## Features

- **Glass-style design** in navy and gold with smooth Framer Motion animations and a dark and light theme toggle.
- **Home page** with a Swiper.js slider, the six newest books loaded from the database, a "How Borrowing Works" section and a "Top Categories" section.
- **Secure authentication** with BetterAuth and the MongoDB adapter: email and password sign up with password rules, plus Google login.
- **Private routes** that send visitors to Login and bring them back to the same page afterwards. Logged-in users stay signed in when they reload.
- **Add, edit and delete books.** Cover images are uploaded to imgbb, and a confirmation pop-up protects every delete.
- **Borrow system** with a seven day return date, live copy counts, a "Not Available" state and protection against borrowing the same book twice.
- **Search and category filters** on the All Books page, and a profile page with live statistics.
- **JWT-protected API.** The Express server verifies tokens issued by BetterAuth.

## Tech stack

Next.js (App Router), React, Tailwind CSS, DaisyUI, Framer Motion, Swiper.js, react-hot-toast, BetterAuth, MongoDB, imgbb.

## Run it on your computer

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```
MONGODB_URI=your MongoDB connection string
BETTER_AUTH_SECRET=a long random string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your Google client ID
GOOGLE_CLIENT_SECRET=your Google client secret
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your imgbb API key
```

The website also needs the BookNook server running. See the server repository for instructions.
