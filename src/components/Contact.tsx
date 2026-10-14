"use client";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { useEffect, useRef, useState } from "react";


import { Mail, Camera, Phone, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";



// ─── EmailJS config ───────────────────────────────────────
// Create a free account on https://emailjs.com then replace
// the three placeholder strings below with your credentials.
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef      = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer id="contact" ref={containerRef} className="pt-32 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">

          {/* Left */}
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 glow-text">
                SOMETHING EXTRAORDINARY
              </span>
            </h2>
            <p className="text-lg mb-10 max-w-md" style={{ color: "var(--fg-muted)" }}>
              Have a project in mind, or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Camera size={24} />, href: "https://www.instagram.com/omnia_elgabry102?igsh=MTJpdjFyaHB0MmdkeA==&igsi=MTJpdjFyaHB0MmdkeA==" },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  href: "https://www.linkedin.com/in/omnia-elgabry-410970425?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                },
                { icon: <Phone size={24} />, href: "https://wa.me/201159479692" },
                { icon: <Mail size={24} />, href: "mailto:monygabry09@gmail.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-violet-600 hover:text-white hover:bg-violet-600 hover:border-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 clickable"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-purple p-8 rounded-3xl border border-violet-500/20 flex flex-col gap-6"
          >
            <div className="relative">
              <input type="text" id="name" name="from_name" placeholder=" "
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                required />
              <label htmlFor="name" className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input type="email" id="email" name="from_email" placeholder=" "
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                required />
              <label htmlFor="email" className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea id="message" name="message" placeholder=" " rows={4}
                className="block px-4 pb-2.5 pt-6 w-full text-white bg-black/20 rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors resize-none"
                required />
              <label htmlFor="message" className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-violet-400">
                Your Message
              </label>
            </div>

            {status === "success" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
                <CheckCircle size={18} />
                Message sent! I&apos;ll get back to you soon 🎉
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                <AlertCircle size={18} />
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 mt-2 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-all glow-box clickable flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? <><Loader size={18} className="animate-spin" /> Sending…</>
                : <><Send size={18} /> Send Message</>
              }
            </button>
          </form>
        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-sm" style={{ color: "var(--fg-faint)" }}>
            © {new Date().getFullYear()} Omnia Elgabry — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
