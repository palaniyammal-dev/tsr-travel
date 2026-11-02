"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const theme = localStorage.getItem("theme");
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "District Explorer", href: "/district-explorer", isPage: true, badge: "New" },
    { name: "About", href: "#about" },
    { name: "Our Vehicles", href: "#vehicles" },
    { name: "Packages", href: "#packages" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick("#home")}>
            <span className="font-display font-extrabold text-2xl tracking-wider text-primary dark:text-secondary flex items-center">
              TSR<span className="text-secondary dark:text-accent font-semibold ml-1">TRAVEL</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-7 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-foreground-theme font-medium hover:text-primary dark:hover:text-secondary transition-colors duration-200 text-sm cursor-pointer inline-flex items-center"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-black uppercase rounded-full bg-secondary text-zinc-950">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggler */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground-theme transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-primary" />}
            </button>

            {/* Quick Call */}
            <a
              href="tel:+919791465995"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/20 hover:border-primary text-primary dark:text-secondary dark:border-secondary/20 dark:hover:border-secondary font-semibold text-xs tracking-wide transition-all cursor-pointer"
            >
              <PhoneCall size={14} />
              +91 97914 65995
            </a>

            {/* CTA Book Now */}
            <button
              onClick={() => handleLinkClick("#booking")}
              className="px-5 py-2.5 rounded-full btn-primary-gradient font-bold text-xs tracking-wide cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Dark Mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground-theme transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-primary" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground-theme hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-nav border-t border-black/5 dark:border-white/5 shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-stretch">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="py-3 px-4 text-left font-semibold text-foreground-theme hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-secondary text-zinc-950">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+919791465995"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-primary/20 text-primary dark:text-secondary dark:border-secondary/20 font-bold text-sm tracking-wide text-center"
                >
                  <PhoneCall size={16} />
                  Call Now
                </a>
                <button
                  onClick={() => handleLinkClick("#booking")}
                  className="py-3 rounded-xl btn-primary-gradient font-bold text-sm tracking-wide shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
