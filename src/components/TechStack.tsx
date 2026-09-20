"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "languages",
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "C", "C++", "HTML5", "CSS3"]
  },
  {
    id: "frameworks",
    name: "Frameworks & Backend",
    skills: ["React", "Next.js", "Tailwind CSS", "GSAP", "Node.js", "Firebase"]
  },
  {
    id: "tools",
    name: "Design & Tools",
    skills: ["Adobe Photoshop", "Canva", "Hugging Face", "GitHub", "Vercel", "VS Code"]
  }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)", overwrite: true }
      );
    }
  }, [activeTab]);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-violet-400 uppercase mb-4">Tech Stack</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">Skills & Tools</h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 clickable ${
                activeTab === cat.id
                  ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "glass text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="glass-purple p-8 md:p-12 rounded-3xl border border-violet-500/20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/5 blur-[80px] pointer-events-none" />
          
          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {categories.find(c => c.id === activeTab)?.skills.map((skill) => (
              <div 
                key={skill}
                className="group flex items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/50 transition-all duration-300 hover:bg-violet-900/20"
              >
                <span className="text-gray-300 font-medium group-hover:text-white group-hover:glow-text transition-all duration-300 text-center">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
