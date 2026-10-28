"use client";

import React, { useEffect, useRef, useState } from "react";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export default function RedCarCursor() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [mobileRipples, setMobileRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Animation state refs for 60fps loop
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const speedRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Trail particles canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const particleIdCounter = useRef(0);

  useEffect(() => {
    // Detect environment and accessibility preferences
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(hasTouch || isCoarse);
    };

    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Detect clickable target hover
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest("button, a, input, select, textarea, [role='button'], .glass-card, .clickable");
        setIsHovering(isClickable);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop using lerp physics
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      // Position lerp
      const lerpFactor = 0.18; // smooth response
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, lerpFactor);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, lerpFactor);

      // Velocity & speed
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      speedRef.current = speed;

      // Rotation calculation
      if (speed > 0.2 && !reducedMotion) {
        let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Handle angle wrap-around (-180 to 180) smoothly
        let diff = newAngle - targetAngleRef.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        
        targetAngleRef.current += diff;
        angleRef.current = lerp(angleRef.current, targetAngleRef.current, 0.2);
      }

      // Update DOM element transform directly for maximum performance
      if (cursorRef.current) {
        const scale = isHovering ? 1.25 : 1.0;
        const stretch = Math.min(speed * 0.005, 0.2);
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) rotate(${angleRef.current}deg) scale(${scale + stretch}, ${scale - stretch * 0.5})`;
      }

      // Spawn motion trail particles behind the car
      if (speed > 1.2 && canvasRef.current && !reducedMotion) {
        const rad = (angleRef.current * Math.PI) / 180;
        // Offset particle spawn point to rear bumper
        const rearX = currentPos.current.x - Math.cos(rad) * 16;
        const rearY = currentPos.current.y - Math.sin(rad) * 16;

        particlesRef.current.push({
          id: particleIdCounter.current++,
          x: rearX + (Math.random() - 0.5) * 4,
          y: rearY + (Math.random() - 0.5) * 4,
          size: Math.random() * 4 + 2,
          alpha: 0.6,
          vx: (Math.random() - 0.5) * 0.8 - Math.cos(rad) * 0.5,
          vy: (Math.random() - 0.5) * 0.8 - Math.sin(rad) * 0.5
        });
      }

      // Render motion trail canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;
            p.size += 0.1;

            if (p.alpha <= 0) {
              particlesRef.current.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            // Dynamic red dust / exhaust trail
            ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(220, 38, 38, 0.4)";
            ctx.fill();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile, reducedMotion, isHovering]);

  // Handle mobile touch tap ripple effect
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const newRipple = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY
      };

      setMobileRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setMobileRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, [isMobile]);

  // Canvas resize tracking
  useEffect(() => {
    if (isMobile) return;
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        {mobileRipples.map((ripple) => (
          <div
            key={ripple.id}
            style={{ left: ripple.x, top: ripple.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
          >
            {/* Small red car icon pulse on mobile touch */}
            <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/60 flex items-center justify-center shadow-lg shadow-red-500/30">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="14" width="24" height="12" rx="4" fill="#dc2626" />
                <path d="M12 14 L16 8 L24 8 L28 14 Z" fill="#991b1b" />
                <circle cx="12" cy="26" r="3" fill="#18181b" />
                <circle cx="28" cy="26" r="3" fill="#18181b" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Motion Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] w-full h-full"
      />

      {/* Smooth Animated RED CAR Cursor Container */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-5 -mt-2.5 will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0px) rotate(0deg)"
        }}
      >
        {/* Headlight Beam Effect */}
        <div 
          className="absolute top-1/2 left-full -translate-y-1/2 w-12 h-8 pointer-events-none opacity-75"
          style={{
            background: "radial-gradient(ellipse at left, rgba(254, 240, 138, 0.45) 0%, rgba(254, 240, 138, 0.1) 50%, transparent 80%)",
            transform: "translateY(-50%)"
          }}
        />

        {/* Detailed Premium Realistic RED Sports Car SVG */}
        <div className="relative drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]">
          <svg
            width="40"
            height="22"
            viewBox="0 0 44 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-5.5 transform"
          >
            <defs>
              {/* Glossy Metallic Red Gradients */}
              <linearGradient id="redBody" x1="0" y1="0" x2="44" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="45%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>

              <linearGradient id="roofRed" x1="12" y1="4" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Tires */}
            <rect x="8" y="1" width="7" height="3.5" rx="1.5" fill="#18181b" />
            <rect x="29" y="1" width="7" height="3.5" rx="1.5" fill="#18181b" />
            <rect x="8" y="19.5" width="7" height="3.5" rx="1.5" fill="#18181b" />
            <rect x="29" y="19.5" width="7" height="3.5" rx="1.5" fill="#18181b" />

            {/* Alloy Rim Accents */}
            <rect x="10" y="2" width="3" height="1.5" rx="0.5" fill="#a1a1aa" />
            <rect x="31" y="2" width="3" height="1.5" rx="0.5" fill="#a1a1aa" />
            <rect x="10" y="20.5" width="3" height="1.5" rx="0.5" fill="#a1a1aa" />
            <rect x="31" y="20.5" width="3" height="1.5" rx="0.5" fill="#a1a1aa" />

            {/* Main Aerodynamic Red Body */}
            <path
              d="M 3 12 C 3 7, 7 4, 14 3.5 L 34 4 C 40 4.5, 43 8, 43 12 C 43 16, 40 19.5, 34 20 L 14 20.5 C 7 20, 3 17, 3 12 Z"
              fill="url(#redBody)"
              stroke="#7f1d1d"
              strokeWidth="0.8"
            />

            {/* Front Bumper & Hood Accent Lines */}
            <path d="M 36 6 Q 42 12 36 18" stroke="#fca5a5" strokeWidth="0.6" fill="none" opacity="0.7" />
            <path d="M 28 6.5 L 37 9.5 C 40 12, 40 12, 37 14.5 L 28 17.5" fill="#b91c1c" opacity="0.4" />

            {/* Cabin & Roof Shield */}
            <path
              d="M 14 6 C 18 5.5, 26 5.5, 30 6.5 C 32 8.5, 32 15.5, 30 17.5 C 26 18.5, 18 18.5, 14 18 C 12 15, 12 9, 14 6 Z"
              fill="url(#roofRed)"
            />

            {/* Tinted Front Windshield */}
            <path d="M 25 7 C 28 7, 30 8.5, 30 12 C 30 15.5, 28 17, 25 17 Z" fill="url(#glassGradient)" stroke="#475569" strokeWidth="0.5" />

            {/* Side Windows */}
            <path d="M 16 6.5 L 24 7.2 L 24 9 L 16 8.5 Z" fill="#0f172a" opacity="0.9" />
            <path d="M 16 17.5 L 24 16.8 L 24 15 L 16 15.5 Z" fill="#0f172a" opacity="0.9" />

            {/* Headlights (Bright Yellow-White) */}
            <ellipse cx="41.5" cy="6.5" rx="1.5" ry="1.2" fill="#fef08a" />
            <ellipse cx="41.5" cy="17.5" rx="1.5" ry="1.2" fill="#fef08a" />

            {/* Taillights (Red LED Glow) */}
            <rect x="3" y="6" width="1.5" height="3" rx="0.5" fill="#f87171" />
            <rect x="3" y="15" width="1.5" height="3" rx="0.5" fill="#f87171" />

            {/* Rear Spoiler Wings */}
            <path d="M 4 5.5 L 2 4.5 L 2 19.5 L 4 18.5 Z" fill="#7f1d1d" />

            {/* TSR Metallic Highlights */}
            <line x1="12" y1="12" x2="36" y2="12" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2" />
          </svg>
        </div>
      </div>
    </>
  );
}
