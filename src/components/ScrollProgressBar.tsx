"use client";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { useEffect, useRef } from "react";





export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          scaleX: 0,
          background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 10px rgba(139,92,246,0.8)",
        }}
      />
    </div>
  );
}
