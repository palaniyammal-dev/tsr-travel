"use client";

import { useState, useEffect } from "react";
import { MessageSquare, PhoneCall, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-primary/20"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Call Button for Quick Dialing */}
      <a
        href="tel:+919791465995"
        className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 md:hidden flex items-center justify-center cursor-pointer border border-blue-500/20"
        aria-label="Call TSR Travel"
      >
        <PhoneCall size={20} />
      </a>

      {/* Floating WhatsApp Booking */}
      <a
        href="https://wa.me/919791465995?text=Hello%20TSR%20TRAVEL%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20trip."
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer border border-green-400/20"
        aria-label="Book on WhatsApp"
      >
        <MessageSquare size={20} className="fill-current" />
      </a>
    </div>
  );
}
