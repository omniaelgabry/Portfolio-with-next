"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  
  const step1Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const step2Ref = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const circleProgressRef = useRef<SVGCircleElement>(null);
  const percentTextRef = useRef<HTMLDivElement>(null);
  
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
        }
      });

      // --- STEP 1: Name Reveal ---
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.inOut"
      })
      .to(topTextRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
      .to(bottomTextRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6")
      .to({}, { duration: 0.8 }) // Pause to read
      .to(step1Ref.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });

      // --- STEP 2: Radar Dial ---
      tl.to(step2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)"
      });

      const totalDuration = 3.5; // Smooth sweeping time
      let progressObj = { val: 0 };
      const circleCircumference = 2 * Math.PI * 120; // r=120
      
      tl.to(progressObj, {
        val: 100,
        duration: totalDuration,
        ease: "none",
        onUpdate: () => {
          const val = progressObj.val;
          // Animate needle from -90deg (top) to 270deg (top full circle)
          const rotation = -90 + (val / 100) * 360;
          if (needleRef.current) {
            gsap.set(needleRef.current, { rotation });
          }
          
          // Animate circular progress ring
          if (circleProgressRef.current) {
            const offset = circleCircumference - (val / 100) * circleCircumference;
            gsap.set(circleProgressRef.current, { strokeDashoffset: offset });
          }
          
          // Update center percentage text
          if (percentTextRef.current) {
            percentTextRef.current.innerText = Math.round(val) + "%";
          }

          // Highlight quadrant labels based on needle rotation
          let activeIndex = -1;
          if (rotation >= -90 && rotation < 0) activeIndex = 0; // Top-Right
          else if (rotation >= 0 && rotation < 90) activeIndex = 1; // Bottom-Right
          else if (rotation >= 90 && rotation < 180) activeIndex = 2; // Bottom-Left
          else if (rotation >= 180 && rotation <= 270) activeIndex = 3; // Top-Left

          labelsRef.current.forEach((label, i) => {
            if (!label) return;
            if (i === activeIndex) {
              gsap.to(label, { opacity: 1, textShadow: "0 0 15px rgba(139, 92, 246, 0.8)", scale: 1.1, color: "#fff", duration: 0.2 });
            } else {
              gsap.to(label, { opacity: 0.3, textShadow: "none", scale: 1, color: "#cbd5e1", duration: 0.2 });
            }
          });
        }
      });

      tl.to({}, { duration: 0.4 }) // Wait at 100%
      .to(step2Ref.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.inOut"
      });

      // --- STEP 3: Split-Curtain Exit ---
      tl.to(leftCurtainRef.current, {
        xPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "exit")
      .to(rightCurtainRef.current, {
        xPercent: 100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "exit");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isLoaded) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Split Curtains Background */}
      <div 
        ref={leftCurtainRef} 
        className="absolute top-0 left-0 w-1/2 h-full bg-[#581c87] pointer-events-auto border-r border-violet-900 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-0"
      />
      <div 
        ref={rightCurtainRef} 
        className="absolute top-0 right-0 w-1/2 h-full bg-[#581c87] pointer-events-auto border-l border-violet-900 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-0"
      />

      {/* Center Animated Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
        
        {/* Step 1: Text Reveal */}
        <div ref={step1Ref} className="absolute flex flex-col items-center justify-center">
          <div className="overflow-hidden h-12 md:h-16 flex items-end mb-2">
            <div ref={topTextRef} className="translate-y-[120%] text-white text-3xl md:text-5xl font-light tracking-[0.3em]">
              I AM
            </div>
          </div>
          
          <div 
            ref={lineRef}
            className="w-64 md:w-96 h-[2px] bg-white scale-x-0 origin-center shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />

          <div className="overflow-hidden h-16 md:h-20 flex items-start mt-2">
            <div ref={bottomTextRef} className="-translate-y-[120%] text-white text-5xl md:text-7xl font-black tracking-widest">
              OMNIA
            </div>
          </div>
        </div>

        {/* Step 2: Radar Dial */}
        <div 
          ref={step2Ref}
          className="absolute opacity-0 scale-50 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
        >
          {/* Glassmorphic Background Circle */}
          <div className="absolute inset-0 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.3)]" />

          {/* SVG Circular Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 300 300">
            <circle 
              cx="150" cy="150" r="120" 
              className="stroke-white/5" 
              strokeWidth="2" 
              fill="none" 
            />
            <circle 
              ref={circleProgressRef}
              cx="150" cy="150" r="120" 
              className="stroke-violet-400" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              style={{
                strokeDasharray: 2 * Math.PI * 120,
                strokeDashoffset: 2 * Math.PI * 120,
                filter: "drop-shadow(0 0 10px rgba(139,92,246,0.8))"
              }}
            />
            {/* Crosshairs to define quadrants visually */}
            <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="10" y1="150" x2="290" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>

          {/* Radar Sweeping Needle */}
          <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              ref={needleRef} 
              className="absolute left-1/2 w-[120px] h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-white origin-left shadow-[0_0_15px_rgba(139,92,246,0.9)]"
              style={{ transform: 'translateY(-50%) rotate(-90deg)' }} 
            />
          </div>

          {/* Center Percent Text */}
          <div ref={percentTextRef} className="absolute text-5xl md:text-6xl font-black text-white glow-text tabular-nums">
            0%
          </div>

          {/* Quadrant Labels */}
          <div ref={el => { labelsRef.current[0] = el; }} className="absolute -top-6 -right-6 md:top-4 md:right-4 text-xs md:text-sm font-bold opacity-30 text-slate-300">
            FRONTEND
          </div>
          <div ref={el => { labelsRef.current[1] = el; }} className="absolute -bottom-6 -right-6 md:bottom-4 md:right-4 text-xs md:text-sm font-bold opacity-30 text-slate-300">
            BACKEND
          </div>
          <div ref={el => { labelsRef.current[2] = el; }} className="absolute -bottom-6 -left-10 md:bottom-4 md:left-4 text-xs md:text-sm font-bold opacity-30 text-slate-300">
            UI/UX & DESIGN
          </div>
          <div ref={el => { labelsRef.current[3] = el; }} className="absolute -top-6 -left-10 md:top-4 md:left-4 text-xs md:text-sm font-bold opacity-30 text-slate-300">
            CREATIVE DEV
          </div>
          
        </div>
      </div>
    </div>
  );
}
