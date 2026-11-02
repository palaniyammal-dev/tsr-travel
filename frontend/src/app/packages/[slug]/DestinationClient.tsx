"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, Clock, Star, Phone, ShieldCheck, Check, X, 
  ChevronRight, Calendar, Heart, Share2, ZoomIn, ChevronLeft, Info, HelpCircle, HeartHandshake
} from "lucide-react";
import { DestinationDetails } from "@/lib/destinations";
import BookingForm from "@/components/BookingForm";
import axios from "axios";

export default function DestinationClient({ data }: { data: DestinationDetails }) {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx + 1) % data.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx - 1 + data.images.length) % data.images.length);
    }
  };

  const similarDestinations = [
    { name: "Ooty", slug: "ooty", price: 12500, img: "/images/packages/ooty.jpg" },
    { name: "Kodaikanal", slug: "kodaikanal", price: 11000, img: "/images/packages/ooty.jpg" },
    { name: "Rameswaram", slug: "rameswaram", price: 9500, img: "/images/packages/temple.jpg" }
  ].filter(d => d.slug !== data.slug);

  return (
    <div className="bg-cream dark:bg-[#08120d] min-h-screen pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end justify-start overflow-hidden">
        <Image
          src={data.images[0]}
          alt={data.name}
          fill
          priority
          className="object-cover object-center filter brightness-[0.4]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <span className="text-secondary font-display font-semibold tracking-wider text-xs uppercase bg-primary/20 backdrop-blur-sm border border-secondary/20 px-3.5 py-1 rounded-full">
              Dynamic Destination Details
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-none">
              {data.name}
            </h1>
            <p className="text-gray-300 font-medium text-sm sm:text-base max-w-2xl leading-relaxed">
              {data.tagline}
            </p>
          </div>

          {/* Share / Favorite buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition cursor-pointer"
            >
              <Heart className={`size-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button 
              onClick={handleShare}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <Share2 className="size-5" />
              {copied ? "Copied!" : "Share Package"}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream dark:from-[#08120d] to-transparent" />
      </section>

      {/* 2. OVERVIEW METRICS TAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
        <div className="glass-card rounded-3xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 py-2 border-r border-primary/10 last:border-0 dark:border-secondary/10">
            <span className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest block">Est. Distance</span>
            <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">{data.distance}</span>
          </div>
          <div className="space-y-1 py-2 border-r border-primary/10 last:border-0 dark:border-secondary/10">
            <span className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest block">Driving Time</span>
            <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">{data.travelTime}</span>
          </div>
          <div className="space-y-1 py-2 border-r border-primary/10 last:border-0 dark:border-secondary/10">
            <span className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest block">Trip Weather</span>
            <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">{data.weather.temp}</span>
            <span className="text-xxs text-foreground-theme/60 block">{data.weather.condition}</span>
          </div>
          <div className="space-y-1 py-2">
            <span className="text-xxs font-bold text-foreground-theme/50 uppercase tracking-widest block">Package Price</span>
            <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">₹{data.price.toLocaleString("en-IN")}</span>
            <span className="text-xxs text-foreground-theme/60 block">{data.duration}</span>
          </div>
        </div>
      </section>

      {/* 3. DETAILS CONTENT BODY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Side: Destination details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Overview & History */}
          <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-2xl text-primary dark:text-secondary">Overview</h2>
              <p className="text-sm text-foreground-theme/80 leading-relaxed">{data.description}</p>
            </div>
            <div className="h-px bg-primary/10" />
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-2xl text-primary dark:text-secondary">Historical Significance</h2>
              <p className="text-sm text-foreground-theme/80 leading-relaxed">{data.history}</p>
            </div>
          </div>

          {/* Day-Wise Itinerary */}
          <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="font-display font-extrabold text-2xl text-primary dark:text-secondary">Day-Wise Itinerary</h2>
            <div className="space-y-6 relative border-l border-primary/20 dark:border-secondary/20 pl-6 ml-2">
              {data.itinerary.map((day) => (
                <div key={day.day} className="relative space-y-1.5">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 bg-primary dark:bg-secondary rounded-full border-4 border-white dark:border-[#08120d]" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-primary dark:text-secondary">
                    Day {day.day} - {data.duration}
                  </span>
                  <h4 className="font-display font-bold text-lg text-foreground-theme">{day.title}</h4>
                  <p className="text-xs text-foreground-theme/80 leading-relaxed">{day.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-display font-bold text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                <Check size={18} className="stroke-[3]" /> What's Included
              </h3>
              <ul className="space-y-2 text-xs text-foreground-theme/85">
                {data.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-display font-bold text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                <X size={18} className="stroke-[3]" /> What's Excluded
              </h3>
              <ul className="space-y-2 text-xs text-foreground-theme/85">
                {data.excluded.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tourist Attractions & Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-display font-bold text-lg text-primary dark:text-secondary">Key Tourist Spots</h3>
              <ul className="grid grid-cols-2 gap-2 text-xs text-foreground-theme/80">
                {data.attractions.map((attr, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary dark:bg-secondary rounded-full" />
                    {attr}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-display font-bold text-lg text-primary dark:text-secondary">Famous Local Foods</h3>
              <ul className="grid grid-cols-1 gap-2 text-xs text-foreground-theme/80">
                {data.foods.map((food, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary dark:bg-secondary rounded-full" />
                    {food}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hoteles & Restaurants Lists */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Recommended Hotels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.hotels.map((h, i) => (
                <div key={i} className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-display font-bold text-sm text-foreground-theme truncate">{h.name}</h4>
                      <span className="text-xxs font-bold text-amber-500 shrink-0">{h.rating}</span>
                    </div>
                    <p className="text-xxs text-foreground-theme/50">{h.facilities}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-primary/5">
                    <span className="font-bold text-xs text-primary dark:text-secondary">{h.price}</span>
                    <a 
                      href="https://wa.me/919791465995?text=Hello%20TSR%20TRAVEL%2C%20I%20would%20like%20to%20book%20a%20hotel%20near%20Ooty."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-xxs bg-primary/5 hover:bg-primary hover:text-white text-primary dark:text-secondary rounded font-bold transition"
                    >
                      Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Map, Weather, and Quick booking anchor */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Weather card */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-display font-bold text-lg text-primary dark:text-secondary flex items-center gap-2">
              <Info size={16} /> Destination Climate
            </h3>
            <div className="space-y-3 text-xs text-foreground-theme/80">
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span>Best Time:</span>
                <span className="font-semibold text-foreground-theme">{data.weather.bestTime}</span>
              </div>
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span>Avg Temp:</span>
                <span className="font-semibold text-foreground-theme">{data.weather.temp}</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span className="font-semibold text-foreground-theme">{data.weather.humidity}</span>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="glass-card p-3 rounded-3xl h-[280px]">
            <iframe 
              src={data.mapEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "1rem" }} 
              allowFullScreen={true}
              loading="lazy" 
              title={`Google map of ${data.name}`}
            />
          </div>

          {/* Emergency contacts card */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-display font-bold text-lg text-red-600 dark:text-red-400">Emergency Contacts</h3>
            <ul className="space-y-2 text-xxs text-foreground-theme/80 font-mono">
              {data.emergencyContacts.map((contact, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  {contact}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Quick Scroll button */}
          <a
            href="#booking-form-section"
            className="w-full py-4.5 rounded-2xl btn-primary-gradient font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg text-center"
          >
            Start Booking Form Now
          </a>

        </div>
      </section>

      {/* 4. PHOTO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-primary/5">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground-theme">
            {data.name} Photo Gallery
          </h2>
          <p className="text-xs text-foreground-theme/60">
            Real high-quality snapshots from {data.name} hills, temples and sightseeing gardens. (15 images).
          </p>
        </div>

        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {data.images.map((img, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid rounded-2xl overflow-hidden glass-card cursor-pointer group relative hover:shadow-lg transition-all duration-300"
              onClick={() => setActiveImageIdx(idx)}
            >
              <img 
                src={img} 
                alt={`${data.name} slide ${idx}`} 
                className="w-full h-auto object-cover filter brightness-95 group-hover:scale-102 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-white" size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOOKING FORM INJECTED */}
      <section id="booking-form-section" className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">Reserve Package</span>
          <h2 className="font-display font-extrabold text-3xl text-foreground-theme mt-1">Book This Route</h2>
        </div>
        <BookingForm />
      </section>

      {/* 6. SIMILAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-primary/5">
        <h3 className="font-display font-bold text-lg text-foreground-theme mb-6">Similar Tour Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {similarDestinations.map((d, i) => (
            <Link 
              key={i} 
              href={`/packages/${d.slug}`} 
              className="glass-card rounded-2xl p-4 flex gap-4 items-center hover:border-primary/30 hover:shadow-md transition group"
            >
              <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={d.img} alt={d.name} className="object-cover w-full h-full" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-sm text-foreground-theme group-hover:text-primary transition">{d.name} Package</h4>
                <p className="text-xxs text-primary dark:text-secondary font-semibold mt-0.5">Starting ₹{d.price.toLocaleString("en-IN")}</p>
              </div>
              <ChevronRight size={16} className="text-foreground-theme/40 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL WITH NAVIGATION */}
      {activeImageIdx !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setActiveImageIdx(null)}
        >
          <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full cursor-pointer">
            <X size={28} />
          </button>
          
          <button 
            onClick={handlePrevImage}
            className="absolute left-4 md:left-8 text-white p-3 hover:bg-white/10 rounded-full cursor-pointer transition z-10"
          >
            <ChevronLeft size={32} />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[70vh] aspect-video w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={data.images[activeImageIdx]} 
              alt={`${data.name} zoom ${activeImageIdx}`} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <button 
            onClick={handleNextImage}
            className="absolute right-4 md:right-8 text-white p-3 hover:bg-white/10 rounded-full cursor-pointer transition z-10"
          >
            <ChevronRight size={32} />
          </button>

          <p className="text-white text-xs font-semibold mt-4">
            Image {activeImageIdx + 1} of {data.images.length}
          </p>
        </div>
      )}

    </div>
  );
}
