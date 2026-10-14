"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="back-to-top"
      onClick={scrollUp}
      aria-label="Back to top"
      className="clickable fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(59,130,246,0.9))",
        boxShadow: "0 0 20px rgba(139,92,246,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <ArrowUp size={20} className="text-white" />
    </button>
  );
}
