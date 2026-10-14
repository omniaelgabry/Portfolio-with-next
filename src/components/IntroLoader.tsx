"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function IntroLoader() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const shapeRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const lettersRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef  = useRef<HTMLParagraphElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const NAME    = "OMNIA";
  const TAGLINE = "MULTI-DISCIPLINARY ENGINEER";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setIsLoaded(true) });

      /* 1. Shape spawns: tiny → grows with rotation */
      tl.fromTo(shapeRef.current,
        { scale: 0, rotation: -45, opacity: 0, borderRadius: "50%" },
        { scale: 1, rotation: 0,   opacity: 1, borderRadius: "18px",
          duration: 0.9, ease: "back.out(1.4)" }
      )

      /* 2. Glow pulse */
      .fromTo(glowRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1.4, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )

      /* 3. Shape morphs to wide frame */
      .to(shapeRef.current, {
        width: "360px", height: "120px",
        borderRadius: "12px",
        duration: 0.65, ease: "power3.inOut",
      }, "+=0.15")

      /* 4. Glow follows morph */
      .to(glowRef.current, {
        width: "440px", height: "190px",
        borderRadius: "50%",
        opacity: 0.7,
        duration: 0.65, ease: "power3.inOut",
      }, "<")

      /* 5. Name letters stagger in */
      .fromTo(lettersRef.current,
        { y: 40, opacity: 0, rotateX: -90 },
        { y: 0,  opacity: 1, rotateX: 0,
          duration: 0.5, stagger: 0.08,
          ease: "back.out(2)" },
        "-=0.2"
      )

      /* 6. Tagline slides up */
      .fromTo(taglineRef.current,
        { y: 14, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )

      /* 7. Hold */
      .to({}, { duration: 0.7 })

      /* 8. Everything scales up & fades */
      .to([shapeRef.current, glowRef.current, nameRef.current, taglineRef.current], {
        scale: 1.08, opacity: 0,
        duration: 0.45, ease: "power2.in",
        stagger: 0.04,
      })

      /* 9. Overlay fades out */
      .to(overlayRef.current, {
        opacity: 0, duration: 0.5, ease: "power2.inOut",
      }, "-=0.15");
    });

    return () => ctx.revert();
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#07070d" }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-700/10 rounded-full blur-[140px]" />
      </div>

      {/* Morphing glow blob */}
      <div
        ref={glowRef}
        className="absolute"
        style={{
          width: "180px", height: "180px",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.55) 0%, rgba(59,130,246,0.25) 55%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(20px)",
          opacity: 0,
        }}
      />

      {/* Morphing geometric shape */}
      <div
        ref={shapeRef}
        className="absolute"
        style={{
          width: "90px", height: "90px",
          border: "2px solid rgba(139,92,246,0.85)",
          boxShadow: "0 0 30px rgba(139,92,246,0.6), inset 0 0 30px rgba(139,92,246,0.12)",
          background: "rgba(139,92,246,0.07)",
          opacity: 0,
        }}
      />

      {/* Name + tagline */}
      <div className="relative z-10 flex flex-col items-center gap-3 pointer-events-none">
        <div
          ref={nameRef}
          className="flex"
          style={{ perspective: "600px" }}
        >
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              ref={el => { lettersRef.current[i] = el; }}
              className="text-6xl md:text-7xl font-black tracking-[0.22em]"
              style={{
                color: "#ffffff",
                textShadow: "0 0 30px rgba(139,92,246,0.8), 0 0 60px rgba(139,92,246,0.4)",
                display: "inline-block",
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        <p
          ref={taglineRef}
          className="text-xs md:text-sm font-semibold tracking-[0.35em] uppercase"
          style={{ color: "rgba(167,139,250,0.85)", opacity: 0 }}
        >
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}
