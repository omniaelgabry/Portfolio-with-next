"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PageScrollEffect({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const sections = containerRef.current ? (Array.from(containerRef.current.children) as HTMLElement[]) : [];
      
      sections.forEach((section, i) => {
        // Basic sticky stacking setup
        section.classList.add("sticky", "top-0", "h-screen", "w-full", "overflow-hidden", "origin-top", "bg-background");
        
        // Dynamic background colors or borders could go here to separate them visually
        section.style.zIndex = `${i + 1}`; 
        
        // Add a shadow to the top of sections (except first) to emphasize the layering "notebook" effect
        if (i > 0) {
          section.style.boxShadow = "0 -20px 50px rgba(0,0,0,0.5)";
        }

        // We want the current section to scale down and fade out as the NEXT section scrolls up over it
        if (i < sections.length - 1) {
          const nextSection = sections[i + 1];
          
          gsap.to(section, {
            scale: 0.9,
            opacity: 0.3,
            scrollTrigger: {
              trigger: nextSection,
              start: "top bottom", // When the next section's top hits the bottom of the viewport
              end: "top top",      // When the next section's top hits the top of the viewport
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 pb-[50vh]">
      {children}
    </div>
  );
}
