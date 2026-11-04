"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// How long each picture stays before sliding to the next one (in milliseconds)
const SLIDE_DELAY = 5000 * 5;
const slides = [
  {
    image: "/hero/hero-1.jpg",
    title: "Your Next Great Read Is One Click Away",
    text: "Explore a growing shelf of fiction, science, history and stories for kids, all shared by readers like you.",
  },
  {
    image: "/hero/hero-2.jpg",
    title: "Share a Book, Spread a Story",
    text: "Add the books you love so other readers can borrow them, and watch your own little library grow.",
  },
  {
    image: "/hero/hero-3.jpg",
    title: "Borrow Today, Return in a Week",
    text: "Every borrowed book comes with a seven day window. Pick one up, enjoy it, and bring it back when you are done.",
  },
];

// Text appears one piece at a time when its slide is showing
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  return (
    <section aria-label="Welcome to BookNook">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        speed={700}
        grabCursor
        autoplay={{
          delay: SLIDE_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        // Clicking the picture goes to the next slide, but not the button or the dots
        onClick={(swiper, event) => {
          if (event.target.closest?.("a, .swiper-pagination")) return;
          swiper.slideNext();
        }}
        // White dots, because the hero is always a photo
        style={{
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div
              className="relative flex min-h-[540px] items-center md:min-h-[620px]"
              // If a photo is missing, this warm gradient shows instead
              style={{
                backgroundImage: "linear-gradient(135deg, #3a2616, #1a110a)",
              }}
            >
              {/* The photo */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Lighter overlay: dark behind the text on the left, clear on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/5" />

              <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={active === index ? "show" : "hidden"}
                  className="max-w-xl text-white"
                >
                  <motion.p
                    variants={item}
                    className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent"
                  >
                    Welcome to BookNook
                  </motion.p>
                  <motion.h2
                    variants={item}
                    className="text-4xl font-bold leading-tight md:text-6xl"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    variants={item}
                    className="mt-5 text-base leading-relaxed text-white/85 md:text-lg"
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
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
