"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Three simple line icons, one per slide
const icons = {
  read: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  share: (
    <>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <path d="M9 10h6" />
      <path d="M12 7v6" />
    </>
  ),
  time: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

const slides = [
  {
    title: "Your Next Great Read Is One Click Away",
    text: "Explore a growing shelf of fiction, science, history and stories for kids, all shared by readers like you.",
    icon: "read",
    background: "from-[#6b3a14]/70 via-transparent to-transparent",
  },
  {
    title: "Share a Book, Spread a Story",
    text: "Add the books you love so other readers can borrow them, and watch your own little library grow.",
    icon: "share",
    background: "from-[#7a4a12]/60 via-transparent to-transparent",
  },
  {
    title: "Borrow Today, Return in a Week",
    text: "Every borrowed book comes with a seven day window. Pick one up, enjoy it, and bring it back when you are done.",
    icon: "time",
    background: "from-[#4a2a1a]/70 via-transparent to-transparent",
  },
];

// Text appears one piece at a time when a slide becomes active
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSlider() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={800}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        className="glass overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
              <div
                className={`flex min-h-[460px] items-center bg-gradient-to-br ${slide.background} px-8 py-16 md:min-h-[520px] md:px-16`}
              >
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={isActive ? "show" : "hidden"}
                  className="max-w-xl"
                >
                  <motion.p
                    variants={item}
                    className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
                  >
                    Welcome to BookNook
                  </motion.p>
                  <motion.h2
                    variants={item}
                    className="text-4xl font-bold leading-tight md:text-5xl"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    variants={item}
                    className="mt-5 text-base leading-relaxed opacity-80 md:text-lg"
                  >
                    {slide.text}
                  </motion.p>
                  <motion.div variants={item} className="mt-8">
                    <Link
                      href="/books"
                      className="btn-gold inline-block rounded-full px-8 py-3"
                    >
                      Browse Books
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Floating icon, shown from tablet size up */}
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="ml-auto hidden h-56 w-56 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 md:flex"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-28 w-28 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icons[slide.icon]}
                  </svg>
                </motion.div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
