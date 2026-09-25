"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div ref={imageRef} className="relative group perspective-1000">
            <div className="absolute inset-0 bg-violet-600/20 blur-[80px] rounded-full group-hover:bg-violet-500/30 transition-all duration-500" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-purple aspect-[4/5] transform transition-transform duration-700 group-hover:scale-[1.02]">
              <Image 
                src="https://ynn787qihi.ufs.sh/f/Qj6TSP5Fj9mqnIp3pl7bwUGEWuKTDMolfsIS4qC26ByLF91t"
                alt="Profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Text Side */}
          <div ref={textRef} className="flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-widest text-violet-400 uppercase mb-4">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">Bridging Design & Engineering.</h3>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              A versatile Multi-Disciplinary Software Engineer & Digital Designer bridging the gap between elegant aesthetic design and powerful backend architecture. Specializing in crafting immersive frontend experiences, high-performance web applications, and intuitive UI/UX design. Driven by creativity, problem-solving, and building digital products that leave a lasting impact.
            </p>

            <div className="flex flex-wrap gap-4">
              {["Full-Stack Web Development", "UI/UX Design", "Visual Identity & Branding"].map((skill) => (
                <div key={skill} className="px-6 py-3 rounded-full glass border border-violet-500/20 text-sm font-medium text-violet-100 hover:bg-violet-500/10 transition-colors clickable">
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
