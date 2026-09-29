"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Baggy Girls",
    desc: "Specialized fashion store for cross-body handbags with cart & WhatsApp ordering integration.",
    link: "https://baggy-girls.vercel.app",
    tags: ["E-commerce", "Next.js", "Tailwind CSS"]
  },
  {
    num: "02",
    title: "FEKRA.STORE",
    desc: "E-commerce platform for notebooks & stickers with modern UI.",
    link: "https://fekra-store.vercel.app/",
    tags: ["E-commerce", "React", "UI/UX"]
  },
  {
    num: "03",
    title: "Sou Store",
    desc: "Apparel and fashion boutique e-commerce storefront.",
    link: "https://omniaelgabry.github.io/sou.store/",
    tags: ["Frontend", "HTML/CSS", "JavaScript"]
  },
  {
    num: "04",
    title: "O&I Cafe",
    desc: "Elegant cafe website with warm aesthetic layout, menu displays, and animations.",
    link: "https://omniaelgabry.github.io/O-I-Cafe/",
    tags: ["Design", "Animations", "UI/UX"]
  },
  {
    num: "05",
    title: "Mood Space",
    desc: "Interactive daily mood tracking and time organization web app.",
    link: "https://omniaelgabry.github.io/MoodSpace/",
    tags: ["Web App", "JavaScript", "LocalStorage"]
  },
  {
    num: "06",
    title: "Wasfa Sehriya",
    desc: "Recipe companion and meal planning web app with LocalStorage.",
    link: "https://omniaelgabry.github.io/wasfaa/",
    tags: ["Web App", "JavaScript"]
  },
  {
    num: "07",
    title: "Al-Rafiq Al-Yawmi",
    desc: "Daily routine and task management application with local persistence.",
    link: "https://omniaelgabry.github.io/-/",
    tags: ["Productivity", "Web App"]
  },
  {
    num: "08",
    title: "Digital Wedding Invitation",
    desc: "Interactive wedding celebration page with audio and custom animations.",
    link: "https://wedding-jet-beta.vercel.app",
    tags: ["Interactive", "Animations", "React"]
  },
  {
    num: "09",
    title: "Tic-Tac-Toe Game",
    desc: "Interactive classic X-O game featuring responsive logic and score tracking.",
    link: "https://omniaelgabry.github.io/game-X-O/",
    tags: ["Game", "Logic", "JavaScript"]
  },
  {
    num: "10",
    title: "Rose Velora",
    desc: "Elegant e-commerce storefront for beauty products with a modern UI.",
    link: "https://rose-velora.vercel.app",
    tags: ["E-commerce", "Next.js", "Tailwind CSS"]
  },
  {
    num: "11",
    title: "Lona",
    desc: "Modern web application featuring clean aesthetics and smooth user interactions.",
    link: "https://lona-hrb3.vercel.app/",
    tags: ["Web App", "React", "UI/UX"]
  },
  {
    num: "12",
    title: "Connect Four",
    desc: "Interactive Connect Four game with player turn tracking and win detection.",
    link: "https://connect-four-frontend-rosy.vercel.app",
    tags: ["Game", "React", "Logic"]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.children || [];
      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
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
    <section id="projects" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-sm font-bold tracking-widest text-violet-400 uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">Selected Projects</h3>
        </div>

        <div ref={listRef} className="flex flex-col gap-6">
          {projects.map((project) => (
            <a 
              key={project.num}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative p-6 md:p-8 rounded-3xl glass border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden clickable"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:from-violet-600/10 group-hover:to-blue-600/5 transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
                <div className="flex items-center gap-6">
                  <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-violet-500/20 transition-colors duration-500">
                    {project.num}
                  </span>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      {project.title}
                      <ExternalLink size={20} className="text-violet-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h4>
                    <p className="text-gray-400 max-w-xl group-hover:text-gray-300 transition-colors">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-white/5 text-sm font-medium text-gray-300 group-hover:bg-violet-500/20 group-hover:text-violet-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
