"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power4.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable');

      if (isClickable) {
        gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(139, 92, 246, 0)", border: "1px solid #8b5cf6", duration: 0.3 });
        gsap.to(follower, { scale: 0.5, opacity: 0, duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: "#8b5cf6", border: "none", duration: 0.3 });
        gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500 bg-violet-500/20 pointer-events-none z-[9998] hidden md:block"
      />
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
}
