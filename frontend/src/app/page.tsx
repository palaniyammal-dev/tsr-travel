"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, Compass, ShieldCheck, MapPin, 
  Clock, Heart, Star, Phone, Mail, Award, CheckCircle2, ChevronRight, X, ZoomIn,
  Map, Sparkles, Navigation
} from "lucide-react";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import AITripPlanner from "@/components/AITripPlanner";
import VehicleCard3D from "@/components/VehicleCard3D";

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);

  const heroBackgrounds = [
    { src: "/images/landmarks/rockfort.jpg", title: "Rockfort Temple, Trichy", desc: "Start your divine journey from the heart of Trichy." },
    { src: "/images/landmarks/srirangam.jpg", title: "Srirangam Temple, Trichy", desc: "Experience the architectural marvel of Tamil Nadu's spiritual capital." },
    { src: "/images/landmarks/kallanai.jpg", title: "Kallanai Dam, Trichy", desc: "Witness the heritage of ancient engineering marvels." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "5000+", label: "Happy Customers", icon: <Users size={20} className="text-secondary" /> },
    { value: "10+", label: "Years Experience", icon: <Award size={20} className="text-secondary" /> },
    { value: "2", label: "Premium Vehicles", icon: <Compass size={20} className="text-secondary" /> },
    { value: "24×7", label: "Customer Support", icon: <Clock size={20} className="text-secondary" /> }
  ];

  const whyChooseUs = [
    { title: "Professional Drivers", desc: "Expert, licensed, and polite drivers with extensive route knowledge across Tamil Nadu." },
    { title: "Affordable Pricing", desc: "Transparent rates, no hidden charges, and competitive prices tailored to your budget." },
    { title: "GPS Tracking", desc: "Equipped with live location monitoring to ensure absolute passenger safety and reliability." },
    { title: "24×7 Support", desc: "Dedicated support team available anytime to assist with booking alterations or on-road updates." },
    { title: "Clean Vehicles", desc: "Strict sanitization protocols; perfectly maintained engines and pristine, comfortable cabins." },
    { title: "On-Time Pickup", desc: "Punctuality is our core virtue. We arrive before time, ensuring you never miss a connection." },
    { title: "Family Friendly", desc: "Specially managed trips accommodating kids and elders with customizable halts." },
    { title: "Trusted Service", desc: "Leading travel agency in Trichy endorsed by thousands of local residents and corporates." }
  ];

  const services = [
    { title: "Family Trip", icon: "👨‍👩‍👧‍👦" },
    { title: "Friends Trip", icon: "🎒" },
    { title: "Temple Tour", icon: "🛕" },
    { title: "Corporate Tour", icon: "👔" },
    { title: "Wedding Trip", icon: "💍" },
    { title: "Airport Pickup", icon: "✈️" },
    { title: "Railway Pickup", icon: "🚂" },
    { title: "Weekend Tour", icon: "🌅" },
    { title: "Hill Station Tour", icon: "⛰️" },
    { title: "Beach Tour", icon: "🏖️" },
    { title: "Customized Tour", icon: "🗺️" }
  ];

  const vehicles = [
    {
      name: "Mahindra Mini Bus",
      capacity: "20+ Seats",
      image: "/images/vehicles/mini_bus.jpeg",
      suitable: ["Family Tours", "School Trips", "Corporate Tours", "Temple Tours"],
      features: ["AC & Non-AC choices", "Pushback luxury seats", "LED TV & Music system", "Ample luggage space"],
      defaultPassengers: 20
    },
    {
      name: "Maruti Omni Van",
      capacity: "7–8 Seats",
      image: "/images/vehicles/omni.jpeg",
      suitable: ["Small Families", "Airport Transit", "Friends Outings", "Local Temple Visits"],
      features: ["Highly cost-effective", "Compact city navigation", "Roof luggage carrier", "Comfortable city rides"],
      defaultPassengers: 8
    }
  ];

  const packages = [
    { destination: "Ooty", duration: "3 Days / 2 Nights", distance: "260 km", price: 12500, image: "/images/packages/ooty.jpg", type: "hill" },
    { destination: "Kodaikanal", duration: "3 Days / 2 Nights", distance: "200 km", price: 11000, image: "/images/packages/ooty.jpg", type: "hill" },
    { destination: "Yercaud", duration: "2 Days / 1 Night", distance: "140 km", price: 7500, image: "/images/packages/ooty.jpg", type: "hill" },
    { destination: "Rameswaram", duration: "2 Days / 1 Night", distance: "230 km", price: 9500, image: "/images/packages/temple.jpg", type: "temple" },
    { destination: "Madurai", duration: "1 Day Trip", distance: "130 km", price: 4500, image: "/images/packages/temple.jpg", type: "temple" },
    { destination: "Kanyakumari", duration: "3 Days / 2 Nights", distance: "380 km", price: 16500, image: "/images/packages/beach.jpg", type: "beach" },
    { destination: "Velankanni", duration: "1 Day Trip", distance: "150 km", price: 5000, image: "/images/packages/temple.jpg", type: "temple" },
    { destination: "Thanjavur", duration: "1 Day Trip", distance: "60 km", price: 2500, image: "/images/packages/temple.jpg", type: "temple" },
    { destination: "Chidambaram", duration: "1 Day Trip", distance: "130 km", price: 4500, image: "/images/packages/temple.jpg", type: "temple" },
    { destination: "Hogenakkal", duration: "1 Day Trip", distance: "220 km", price: 6500, image: "/images/packages/beach.jpg", type: "beach" },
    { destination: "Courtallam", duration: "2 Days / 1 Night", distance: "290 km", price: 10500, image: "/images/packages/beach.jpg", type: "beach" },
    { destination: "Yelagiri", duration: "2 Days / 1 Night", distance: "270 km", price: 9800, image: "/images/packages/ooty.jpg", type: "hill" }
  ];

  const galleryItems = [
    { src: "/images/vehicles/mini_bus.jpeg", category: "Our Vehicles", caption: "Premium Mahindra Mini Bus (20+ Seats) for large group travels" },
    { src: "/images/vehicles/omni.jpeg", category: "Our Vehicles", caption: "Spacious Maruti Omni Van (7-8 Seats) for small family trips" },
    { src: "/images/landmarks/srirangam.jpg", category: "Temple Trips", caption: "Pilgrimage trip organized to Srirangam Ranganathaswamy Temple" },
    { src: "/images/landmarks/rockfort.jpg", category: "Temple Trips", caption: "Trichy Rockfort temple visit with family tour packages" },
    { src: "/images/packages/ooty.jpg", category: "Hill Stations", caption: "Sightseeing tour organized in Ooty tea gardens" },
    { src: "/images/packages/beach.jpg", category: "Tour Photos", caption: "Tourists enjoying sunset view in Kanyakumari coastal trip" }
  ];

  const testimonials = [
    { name: "Senthil Kumar", role: "Local Merchant, Trichy", comment: "We rented the Mahindra Mini Bus for a 3-day pilgrimage tour of Navagraha temples. The bus was extremely comfortable, the AC worked flawlessly, and Ravitharan provided a highly experienced driver who guided us patiently. Superb service!", rating: 5 },
    { name: "Divya Dharshini", role: "IT Professional, Trichy", comment: "Booked the Maruti Omni for airport pickup. The driver was punctual, vehicle was clean, and fare was exactly as quoted. Highly reliable option for airport drops.", rating: 5 },
    { name: "Raja Ram", role: "College Professor, Trichy", comment: "Excellent service from TSR Travels. Took a family vacation trip to Ooty. Easy booking workflow, instant WhatsApp replies from the owner, and transparent billing.", rating: 5 }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = (vehicle: string) => {
    scrollToSection("booking");
    // We can auto-set the select option using form values, handled by clicking selector
  };

  const handleDirectWhatsAppBook = (vehicle: string) => {
    const text = `Hello TSR TRAVEL, I would like to book the *${vehicle}* for a trip starting from Trichy. Please share pricing and details.`;
    window.open(`https://wa.me/917904872119?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="relative">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax background slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroBackgrounds[heroIndex].src}
              alt={heroBackgrounds[heroIndex].title}
              fill
              priority
              className="object-cover object-center filter brightness-[0.4]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-display font-semibold text-xs tracking-widest uppercase mb-4"
          >
            Trichy's Trusted Travel Partner
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-6"
          >
            Explore Tamil Nadu with <span className="text-secondary">TSR TRAVEL</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl font-medium tracking-wide text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Safe • Comfortable • Affordable • Trusted Travel Services<br />
            From <span className="text-white font-semibold underline decoration-secondary">Trichy to all over Tamil Nadu</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("booking")}
              className="px-8 py-4 rounded-full btn-primary-gradient font-bold text-sm tracking-wider cursor-pointer shadow-lg"
            >
              Book Now
            </button>
            <a
              href="https://wa.me/917904872119?text=Hello%20TSR%20TRAVEL%2C%20I%20would%20like%20to%20book%20a%20tour%20from%20Trichy."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full btn-secondary-gradient flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              WhatsApp Booking
            </a>
            <a
              href="tel:+917904872119"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm tracking-wider transition cursor-pointer"
            >
              Call Now
            </a>
          </motion.div>
        </div>

        {/* Parallax bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream dark:from-[#08120d] to-transparent z-10" />
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center space-y-2 py-4 border-r last:border-0 border-primary/10 dark:border-secondary/10 last:border-r-0">
              <div className="p-3 bg-primary/5 dark:bg-secondary/5 rounded-full mb-1">
                {stat.icon}
              </div>
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-primary dark:text-secondary">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-foreground-theme/80 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden glass-card p-4">
            <Image
              src="/images/landmarks/srirangam.jpg"
              alt="Srirangam Temple Background"
              fill
              className="object-cover rounded-2xl filter brightness-95 dark:brightness-75"
            />
            {/* Badge overlay */}
            <div className="absolute bottom-8 left-8 right-8 glass-card p-5 rounded-2xl">
              <p className="font-semibold text-primary dark:text-secondary text-sm mb-0.5">Authorized Owner</p>
              <h4 className="font-display font-bold text-xl text-foreground-theme">Ravitharan</h4>
              <p className="text-xs text-foreground-theme/70">Kattur, Tiruchirappalli, Tamil Nadu</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
              About TSR TRAVEL
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
              Your Safety & Comfort Is Our Priority
            </h2>
            <blockquote className="border-l-4 border-primary dark:border-secondary pl-4 italic text-foreground-theme/95 text-base leading-relaxed">
              "TSR TRAVEL has been providing safe, reliable, and affordable travel services from Trichy to all over Tamil Nadu. We are committed to making every journey comfortable for families, friends, pilgrims, and tourists."
            </blockquote>
            <p className="text-foreground-theme/85 text-sm leading-relaxed">
              Operating from Kattur, Trichy, we take pride in organizing tailored tours for groups of all sizes. Whether it's a family wedding, a pilgrimage to ancient temples, a school trip, or an airport drop, our service remains consistent: pristine vehicles, punctual arrivals, and friendly drivers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl">
                <h4 className="font-display font-bold text-sm text-primary dark:text-secondary mb-1">Our Mission</h4>
                <p className="text-xxs text-foreground-theme/85">To deliver safe, reliable, and hygienic group tours with flat, fair pricing and friendly local staff.</p>
              </div>
              <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl">
                <h4 className="font-display font-bold text-sm text-primary dark:text-secondary mb-1">Our Vision</h4>
                <p className="text-xxs text-foreground-theme/85">To become Trichy's undisputed first choice for travel rentals and tour packages across Tamil Nadu.</p>
              </div>
              <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl">
                <h4 className="font-display font-bold text-sm text-primary dark:text-secondary mb-1">Core Values</h4>
                <p className="text-xxs text-foreground-theme/85">Punctuality, absolute cleanliness, driver integrity, passenger safety, and complete budget transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 bg-primary/5 dark:bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
              Why Travel With Us
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
              Designed For Worry-Free Journeys
            </h2>
            <p className="text-sm text-foreground-theme/70">
              We focus on the micro-details of passenger travel to offer a highly personalized, premium rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 bg-primary/10 dark:bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-primary dark:text-secondary">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="font-display font-bold text-lg text-foreground-theme mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-foreground-theme/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
            Our Services
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
            Tailored For Every Travel Need
          </h2>
          <p className="text-sm text-foreground-theme/70">
            From local transits to multi-day hill station tours, we customize every trip to your specific itinerary.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="glass-card p-6 rounded-2xl text-center hover:shadow-md hover:border-primary/40 dark:hover:border-secondary/40 transition-all duration-300 group cursor-pointer"
              onClick={() => scrollToSection("booking")}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="font-display font-bold text-sm text-foreground-theme">
                {service.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VEHICLES SECTION */}
      <section id="vehicles" className="py-20 bg-primary/5 dark:bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
              Our Fleet
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
              Select Your Perfect Ride
            </h2>
            <p className="text-sm text-foreground-theme/70">
              Strictly utilizing our two approved vehicles. Original colors and branding preserved exactly. No alternates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {vehicles.map((v, idx) => (
              <VehicleCard3D
                key={idx}
                name={v.name}
                capacity={v.capacity}
                image={v.image}
                suitable={v.suitable}
                features={v.features}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. TOUR PACKAGES */}
      <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
            Tour Packages
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
            Popular Tamil Nadu Tours
          </h2>
          <p className="text-sm text-foreground-theme/70">
            Handcrafted itineraries starting from Trichy to Tamil Nadu's top destinations. Best pricing guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((p, idx) => (
            <Link 
              href={`/packages/${p.destination.toLowerCase()}`}
              key={idx} 
              className="glass-card rounded-2xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-lg border border-primary/10 group hover:-translate-y-1 transition-all duration-300 block cursor-pointer"
            >
              <div className="relative h-[180px] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={`Trip to ${p.destination}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xxs font-medium tracking-wide">
                  {p.duration}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xxs font-bold text-primary dark:text-secondary uppercase tracking-widest block">
                    Trichy → {p.destination}
                  </span>
                  <div className="flex items-center justify-between text-xs text-foreground-theme/70">
                    <span>Est. Distance:</span>
                    <span className="font-semibold text-foreground-theme">{p.distance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                  <div>
                    <span className="text-xxs text-foreground-theme/60 block">Starting from</span>
                    <span className="font-display font-extrabold text-lg text-primary dark:text-secondary">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="p-2 bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white dark:bg-secondary/5 dark:group-hover:bg-secondary dark:text-secondary dark:group-hover:text-[#08120d] rounded-lg transition duration-300">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SMART DISTRICT EXPLORER SHOWCASE SECTION */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-[#0f5132] to-[#08120d] text-white p-8 sm:p-12 shadow-2xl border border-secondary/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full filter blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-zinc-950 shadow-md flex items-center gap-1.5">
                    <Sparkles size={14} /> NEW FEATURE
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
                    38 Districts • Interactive Maps
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Tamil Nadu Smart District Explorer
                </h2>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Discover verified temples, waterfalls, hill stations, beaches, dams, and picnic spots across all 38 districts of Tamil Nadu. Explore with interactive Leaflet GPS maps, calculate multi-stop highway road trips, get AI-powered Tamil/English travel schedules, and book our verified Maruti Omni Van or Mahindra Mini Bus.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="font-bold text-secondary text-sm">38 Districts</div>
                    <div className="text-white/80 text-[11px]">Comprehensive state coverage</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="font-bold text-secondary text-sm">Interactive GPS Map</div>
                    <div className="text-white/80 text-[11px]">Pinpoint coordinates & directions</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 col-span-2 sm:col-span-1">
                    <div className="font-bold text-secondary text-sm">AI Assistant</div>
                    <div className="text-white/80 text-[11px]">Tamil & English itineraries</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/district-explorer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-secondary hover:bg-secondary/90 text-zinc-950 font-bold text-sm tracking-wide shadow-xl shadow-secondary/25 transition transform hover:-translate-y-0.5"
                  >
                    <Map size={18} />
                    <span>Launch District Explorer</span>
                    <ChevronRight size={18} />
                  </Link>

                  <a
                    href="tel:+917904872119"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-semibold text-sm backdrop-blur-md transition"
                  >
                    <Phone size={16} />
                    <span>Trichy Hub: +91 79048 72119</span>
                  </a>
                </div>
              </div>

              {/* Visual preview card on right */}
              <div className="lg:col-span-5">
                <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Navigation size={14} /> LIVE ROAD ROUTING
                    </span>
                    <span className="text-white/70">Trichy Kattur HQ</span>
                  </div>

                  <div className="h-44 rounded-2xl overflow-hidden relative border border-white/15 bg-zinc-900">
                    <img
                      src="/images/landmarks/rockfort.jpg"
                      alt="Rockfort Trichy"
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-secondary text-zinc-950">
                        Trichy Central Hub
                      </span>
                      <h4 className="font-display font-bold text-base text-white mt-1">
                        Rockfort → Srirangam → Kallanai Dam
                      </h4>
                      <p className="text-[11px] text-white/80">
                        31.5 KM Highway Circuit • Recommended: Maruti Omni Van (7–8 Seats)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/district-explorer"
                      className="p-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-center font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Map size={14} /> Explore Districts
                    </Link>
                    <Link
                      href="/district-explorer"
                      className="p-3 rounded-xl bg-secondary text-zinc-950 text-center font-bold transition flex items-center justify-center gap-1.5 hover:bg-secondary/90"
                    >
                      <Sparkles size={14} /> Tamil AI Guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI TRIP PLANNER SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
            Interactive AI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
            AI-Powered Trip Generator
          </h2>
          <p className="text-sm text-foreground-theme/70">
            Tell us who is traveling, select your budget, and let the virtual travel agent build a custom day-by-day roadmap and suggest the ideal fleet vehicle.
          </p>
        </div>
        <AITripPlanner />
      </section>

      {/* 8. BOOKING SECTION */}
      <section id="booking" className="py-20 bg-primary/5 dark:bg-secondary/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
                Secure Booking
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
                Plan Your Journey In Seconds
              </h2>
              <p className="text-sm text-foreground-theme/80 leading-relaxed">
                Enter your details to generate your digital booking entry. Your record will be stored in our secure database, and you will be immediately routed to WhatsApp to coordinate final route checkpoints, drivers, and timing details directly with Ravitharan.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary rounded-lg mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground-theme">Instant WhatsApp Sync</h4>
                    <p className="text-xxs text-foreground-theme/75">Prefilled message templates to keep negotiations simple and straightforward.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary rounded-lg mt-0.5">
                    <Star size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground-theme">Flexible Cancellations</h4>
                    <p className="text-xxs text-foreground-theme/75">Cancel or postpone your schedule up to 24 hours prior to travel without charge.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>

      {/* 9. GALLERY SECTION */}
      <section id="gallery" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
            Photo Gallery
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
            Moments From Our Journeys
          </h2>
          <p className="text-sm text-foreground-theme/70">
            Real photos from our tours, landmarks, and our approved vehicle fleet. Click to zoom.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid glass-card rounded-2xl overflow-hidden group cursor-pointer relative shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => setLightboxImage({ src: item.src, caption: item.caption })}
            >
              <Image
                src={item.src}
                alt={item.caption}
                width={500}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-102 transition duration-300 filter brightness-95 dark:brightness-85"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xxs text-secondary font-bold uppercase tracking-wider mb-1">{item.category}</span>
                <p className="text-white text-xs leading-normal font-medium">{item.caption}</p>
                <ZoomIn size={16} className="text-white absolute top-4 right-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-20 bg-primary/5 dark:bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
              Reviews
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
              Loved By Tourists & Families
            </h2>
            <p className="text-sm text-foreground-theme/70">
              Read Google-style feedback left by our recent corporate and family passengers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl relative flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground-theme/80 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-primary/5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-secondary/10 flex items-center justify-center font-display font-bold text-sm text-primary dark:text-secondary">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground-theme">{item.name}</h4>
                    <span className="text-xxs text-foreground-theme/50">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CONTACT & LOCATION */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary dark:text-secondary font-semibold text-xs tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground-theme tracking-tight">
              Contact TSR TRAVEL
            </h2>
            <p className="text-sm text-foreground-theme/75 leading-relaxed">
              We operate 24 hours a day, 7 days a week. Feel free to contact Owner Ravitharan directly via WhatsApp or phone.
            </p>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 dark:bg-secondary/5 rounded-xl text-primary dark:text-secondary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground-theme">Location</h4>
                  <p className="text-xs text-foreground-theme/70 mt-0.5">
                    Kattur, Tiruchirappalli (Trichy), Tamil Nadu, India.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 dark:bg-secondary/5 rounded-xl text-primary dark:text-secondary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground-theme">Phone & WhatsApp</h4>
                  <a href="tel:+917904872119" className="text-xs hover:text-primary dark:hover:text-secondary block mt-0.5 transition">
                    +91 79048 72119
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 dark:bg-secondary/5 rounded-xl text-primary dark:text-secondary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground-theme">Email Address</h4>
                  <a href="mailto:tsr@gmail.com" className="text-xs hover:text-primary dark:hover:text-secondary block mt-0.5 transition">
                    tsr@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-3xl overflow-hidden glass-card p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d15679.527376722883!2d78.7183063852033!3d10.743603417757962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf4dcd3bc5239%3A0xc39f99e4ad964f4b!2sKattur%2C%20Tiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "1.25rem" }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location of Kattur, Trichy"
            />
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full cursor-pointer">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[75vh] aspect-video w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                fill
                className="object-contain"
              />
            </motion.div>
            <p className="text-white text-sm font-medium mt-4 text-center max-w-xl">
              {lightboxImage.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
