"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface VehicleCard3DProps {
  name: string;
  capacity: string;
  image: string;
  suitable: string[];
  features: string[];
  onBookNow: (vehicleName: string) => void;
}

export default function VehicleCard3D({
  name,
  capacity,
  image,
  suitable,
  features,
  onBookNow
}: VehicleCard3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-12deg to +12deg)
    const rX = ((mouseY - height / 2) / (height / 2)) * -12;
    const rY = ((mouseX - width / 2) / (width / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);

    // Light position percentage for dynamic reflection sheen overlay
    setLightPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset back to 0
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between relative transform-gpu transition-shadow duration-500 border ${
          isHovered
            ? "shadow-[0_25px_50px_-12px_rgba(11,110,79,0.3)] dark:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.25)] border-primary/40 dark:border-secondary/40"
            : "shadow-xl border-primary/10 border-foreground-theme/10"
        }`}
      >
        {/* Dynamic Light Sheen Glare Reflection Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`
          }}
        />

        {/* Image Showcase */}
        <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-slate-900/5">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover object-center transition-transform duration-700 ease-out ${
              isHovered ? "scale-108" : "scale-100"
            }`}
          />
          {/* Subtle gradient vignette overlay at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-10" />

          {/* Passenger Capacity Badge */}
          <div className="absolute top-4 right-4 z-10 bg-primary text-white dark:bg-secondary dark:text-[#08120d] px-4 py-1.5 rounded-full text-xs font-bold font-display shadow-lg transform transition-transform duration-300 hover:scale-105">
            {capacity}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between relative z-10">
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-primary dark:text-secondary tracking-tight">
              {name}
            </h3>

            {/* Suitable Badges */}
            <div>
              <h4 className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest mb-2">Suitable For</h4>
              <div className="flex flex-wrap gap-2">
                {suitable.map((s, i) => (
                  <span
                    key={i}
                    className="text-xxs font-semibold bg-primary/10 dark:bg-secondary/10 text-foreground-theme px-2.5 py-1 rounded-md transition-all duration-300 hover:bg-primary/20 dark:hover:bg-secondary/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest mb-2">Key Features</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-foreground-theme/85">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={() => onBookNow(name)}
              className="w-full py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-[#08120d] font-extrabold text-xs tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            >
              Book {name} Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
