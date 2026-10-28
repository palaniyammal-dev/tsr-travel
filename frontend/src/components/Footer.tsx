"use client";

import { Compass, Mail, MapPin, PhoneCall, MessageSquare } from "lucide-react";

export default function Footer() {
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#05291e] text-white border-t border-[#0b6e4f]/30">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            <span className="font-display font-extrabold text-3xl tracking-wider text-secondary flex items-center">
              TSR<span className="text-white font-semibold ml-1">TRAVEL</span>
            </span>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trichy's premium travel partner providing top-tier, comfortable, and affordable travel solutions all across Tamil Nadu. Safe rides, professional drivers, and pristine vehicles.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-secondary font-display font-bold text-lg mb-5 border-b border-primary/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About Us", href: "#about" },
                { name: "Our Vehicles", href: "#vehicles" },
                { name: "Tour Packages", href: "#packages" },
                { name: "Services", href: "#services" },
                { name: "Gallery", href: "#gallery" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-secondary text-sm font-medium transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div>
            <h4 className="text-secondary font-display font-bold text-lg mb-5 border-b border-primary/20 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li>• Family & Friends Trips</li>
              <li>• Temple Tours & Pilgrimages</li>
              <li>• Corporate Tours</li>
              <li>• Wedding Transportation</li>
              <li>• School & College Trips</li>
              <li>• Airport / Railway Station Transit</li>
            </ul>
          </div>

          {/* Column 4: Location Info */}
          <div>
            <h4 className="text-secondary font-display font-bold text-lg mb-5 border-b border-primary/20 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Owner:</strong> Ravitharan<br />
                  Kattur, Tiruchirappalli (Trichy),<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall size={16} className="text-secondary shrink-0" />
                <a href="tel:+917904872119" className="hover:text-secondary transition-colors">
                  +91 79048 72119
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary shrink-0" />
                <a href="mailto:tsr@gmail.com" className="hover:text-secondary transition-colors">
                  tsr@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#0b6e4f]/20 bg-[#031d15] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} TSR TRAVEL. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Maintained for <strong className="text-secondary font-semibold">TSR Travels Trichy</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}
