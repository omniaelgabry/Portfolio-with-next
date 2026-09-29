"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  <span key="1">TO BUILD WHAT OTHERS <span className="text-violet-600">CAN&apos;T</span>, YOU MUST LEARN WHAT OTHERS <span className="text-violet-600">WON&apos;T.</span></span>,
  <span key="2">CRAFTING <span className="text-blue-500">DIGITAL</span> EXPERIENCES.</span>,
  <span key="3">DESIGNING THE <span className="text-violet-600">FUTURE</span> OF THE WEB.</span>,
  <span key="4">TURNING IDEAS INTO <span className="text-blue-500">REALITY.</span></span>
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.2] text-foreground transition-colors duration-300 uppercase text-center">
            {quotes[index]}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
