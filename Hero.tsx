"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Simple staggered animation for headline parts
      const chars = headlineRef.current?.querySelectorAll('.char') || [];
      
      tl.fromTo(chars, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out", delay: 0.2, clearProps: "transform" }
      )
      .fromTo(badgesRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  const headlineText = "CRAFTING DIGITAL EXPERIENCES";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10 max-w-5xl">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
        >
          {headlineText.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[2vw] overflow-hidden">
              {word.split("").map((char, j) => (
                <span key={j} className="char inline-block transition-transform duration-300 hover:-translate-y-3 hover:scale-125 hover:text-violet-400 hover:rotate-3 cursor-default">{char}</span>
              ))}
            </span>
          ))}
        </h1>

        <div ref={badgesRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {["Frontend Developer", "Backend Developer", "UI/UX & Graphic Designer"].map((role) => (
            <div key={role} className="px-6 py-2 rounded-full glass border border-white/10 text-sm md:text-base font-medium text-gray-300">
              {role}
            </div>
          ))}
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6">
          <a href="#projects" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-violet-600 text-white font-bold tracking-wide hover:bg-violet-500 transition-all glow-box clickable">
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
