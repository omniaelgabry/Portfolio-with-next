"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "TO BUILD WHAT OTHERS CAN'T, YOU MUST LEARN WHAT OTHERS WON'T.",
  "CRAFTING DIGITAL EXPERIENCES.",
  "DESIGNING THE FUTURE OF THE WEB.",
  "TURNING IDEAS INTO REALITY."
];

export default function HeroFlipQuote() {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="relative cursor-pointer select-none mb-12 w-full min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center group"
      onClick={() => setIndex((prev) => (prev + 1) % quotes.length)}
      style={{ perspective: "1500px" }}
      title="Click to flip"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ rotateX: -90, y: 50, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 90, y: -50, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "center center -50px" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.2] text-white group-hover:text-violet-300 transition-colors duration-300 uppercase">
            {quotes[index]}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
