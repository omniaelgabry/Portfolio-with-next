"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, PenTool } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Frontend Web Development",
    desc: "Responsive, fast, and animated web interfaces",
    icon: <Code2 size={32} className="text-violet-400" />
  },
  {
    num: "02",
    title: "Backend & Cloud Integration",
    desc: "Databases, server logic, and API architecture",
    icon: <Server size={32} className="text-blue-400" />
  },
  {
    num: "03",
    title: "UI/UX & Graphic Design",
    desc: "Brand identities, prototypes, and visual assets",
    icon: <PenTool size={32} className="text-pink-400" />
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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

  return (
    <section id="services" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-violet-400 uppercase mb-4">What I Do</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">My Services</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.num}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative p-8 rounded-3xl glass border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden clickable h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:text-violet-500/10 transition-colors duration-500 pointer-events-none">
                {service.num}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-500">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors mt-auto">
                  {service.desc}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:from-violet-600/10 group-hover:to-blue-600/10 transition-all duration-500 rounded-3xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
