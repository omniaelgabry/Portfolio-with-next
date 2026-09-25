"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Briefcase, Camera, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={containerRef} className="pt-32 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          
          {/* Left Text */}
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              LET&apos;S BUILD <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 glow-text">
                SOMETHING EXTRAORDINARY
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Have a project in mind, or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Camera size={24} />, href: "https://www.instagram.com/omnia_elgabry102?igsh=MTJpdjFyaHB0MmdkeA==&igsi=MTJpdjFyaHB0MmdkeA==" },
                { icon: <Briefcase size={24} />, href: "https://www.linkedin.com/in/omnia-elgabry-410970425?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                { icon: <Phone size={24} />, href: "https://wa.me/201159479692" },
                { icon: <Mail size={24} />, href: "mailto:monygabry09@gmail.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-violet-600 hover:border-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 clickable"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <form ref={formRef} className="glass-purple p-8 rounded-3xl border border-violet-500/20 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input 
                type="text" 
                id="name"
                placeholder=" "
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                required
              />
              <label 
                htmlFor="name" 
                className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400"
              >
                Your Name
              </label>
            </div>
            <div className="relative">
              <input 
                type="email" 
                id="email"
                placeholder=" "
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                required
              />
              <label 
                htmlFor="email" 
                className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400"
              >
                Your Email
              </label>
            </div>
            <div className="relative">
              <textarea 
                id="message"
                placeholder=" "
                rows={4}
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors resize-none"
                required
              ></textarea>
              <label 
                htmlFor="message" 
                className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400"
              >
                Your Message
              </label>
            </div>
            
            <button className="w-full py-4 mt-2 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-all glow-box clickable">
              Send Message
            </button>
          </form>

        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Designed & built with Omnia Elgabry.
          </p>
        </div>
      </div>
    </footer>
  );
}
