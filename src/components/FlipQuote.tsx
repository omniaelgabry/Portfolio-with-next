"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Bridging Design & Engineering.",
  "Turning Ideas Into Reality.",
  "Crafting Pixel-Perfect UIs.",
  "Building Intuitive Solutions.",
];

export default function FlipQuote() {
  const [index, setIndex] = useState(0);

  return (
    <div 
      className="relative cursor-pointer select-none mb-8 w-full h-[80px] sm:h-[60px] flex items-center group" 
      onClick={() => setIndex((prev) => (prev + 1) % quotes.length)}
      style={{ perspective: "1200px" }}
      title="Click to change quote"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ rotateX: -90, y: 20, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 90, y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center center -20px" }}
          className="absolute inset-0 flex items-center"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-violet-200 transition-colors duration-300">
            {quotes[index]}
          </h3>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
