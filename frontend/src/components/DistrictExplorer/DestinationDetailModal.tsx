"use client";

import React from "react";
import { TouristDestination } from "@/lib/districtApi";
import { X, MapPin, Clock, Calendar, Ticket, Compass, Car, PhoneCall, ExternalLink, Plus, Check } from "lucide-react";

interface DestinationDetailModalProps {
  destination: TouristDestination | null;
  onClose: () => void;
  isInRoute: boolean;
  onToggleRoute: (dest: TouristDestination) => void;
  onBookRide: (dest: TouristDestination) => void;
  language: "en" | "ta";
}

export default function DestinationDetailModal({
  destination,
  onClose,
  isInRoute,
  onToggleRoute,
  onBookRide,
  language,
}: DestinationDetailModalProps) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-primary/20 dark:border-secondary/25 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-60 sm:h-72 w-full">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-primary text-white shadow-md">
              {destination.category}
            </span>
            {destination.is_priority_stop && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-secondary text-zinc-950 shadow-md">
                ★ {language === "ta" ? "முக்கிய தளம்" : "Top Destination"}
              </span>
            )}
          </div>

          {/* Title on image */}
          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
              {destination.name}
            </h2>
            {destination.tamil_name && (
              <p className="text-base font-semibold text-secondary mt-0.5">
                {destination.tamil_name}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{destination.address || destination.district_name || "Tamil Nadu"}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-foreground-theme">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-secondary mb-2">
              {language === "ta" ? "தல விபரம் & முக்கியத்துவம்" : "About & Historical Significance"}
            </h3>
            <p className="text-sm leading-relaxed text-foreground-theme/85">
              {language === "ta" && destination.tamil_description
                ? destination.tamil_description
                : destination.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-cream/70 dark:bg-zinc-800/80 border border-primary/10">
              <div className="flex items-center gap-1.5 text-xs text-foreground-theme/60 mb-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{language === "ta" ? "நேரம்" : "Timings"}</span>
              </div>
              <div className="text-xs font-semibold truncate">{destination.visiting_hours || "Sunrise - Sunset"}</div>
            </div>

            <div className="p-3 rounded-2xl bg-cream/70 dark:bg-zinc-800/80 border border-primary/10">
              <div className="flex items-center gap-1.5 text-xs text-foreground-theme/60 mb-1">
                <Ticket className="w-3.5 h-3.5 text-primary" />
                <span>{language === "ta" ? "கட்டணம்" : "Entry Fee"}</span>
              </div>
              <div className="text-xs font-semibold truncate">{destination.entry_fee || "Free"}</div>
            </div>

            <div className="p-3 rounded-2xl bg-cream/70 dark:bg-zinc-800/80 border border-primary/10">
              <div className="flex items-center gap-1.5 text-xs text-foreground-theme/60 mb-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{language === "ta" ? "சிறந்த காலம்" : "Best Season"}</span>
              </div>
              <div className="text-xs font-semibold truncate">{destination.best_time_to_visit || "Oct - Mar"}</div>
            </div>

            <div className="p-3 rounded-2xl bg-cream/70 dark:bg-zinc-800/80 border border-primary/10">
              <div className="flex items-center gap-1.5 text-xs text-foreground-theme/60 mb-1">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>{language === "ta" ? "பயண நேரம்" : "Duration"}</span>
              </div>
              <div className="text-xs font-semibold truncate">{destination.ideal_duration || "2 Hours"}</div>
            </div>
          </div>

          {/* Additional details: Dress code & Nearby */}
          {(destination.dress_code || destination.nearby_attractions) && (
            <div className="p-4 rounded-2xl bg-primary/5 dark:bg-zinc-800 border border-primary/15 space-y-2 text-xs">
              {destination.dress_code && (
                <div>
                  <strong className="text-primary dark:text-secondary">
                    {language === "ta" ? "ஆடை கட்டுப்பாடு: " : "Dress Code: "}
                  </strong>
                  <span>{destination.dress_code}</span>
                </div>
              )}
              {destination.nearby_attractions && (
                <div>
                  <strong className="text-primary dark:text-secondary">
                    {language === "ta" ? "அருகிலுள்ள இடங்கள்: " : "Nearby Attractions: "}
                  </strong>
                  <span>{destination.nearby_attractions}</span>
                </div>
              )}
            </div>
          )}

          {/* TSR Vehicle Ride Recommendation Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/15 border border-primary/20 dark:border-secondary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary dark:text-secondary" />
                <h4 className="text-sm font-bold text-primary dark:text-secondary">
                  {language === "ta" ? "TSR வாகனப் பயணம்" : "TSR Verified Fleet Available"}
                </h4>
              </div>
              <p className="text-xs text-foreground-theme/75 mt-1">
                {language === "ta"
                  ? "மாருதி ஆம்னி வேன் (7-8 இருக்கைகள்) அல்லது மகிந்திரா மினி பஸ் (20+ இருக்கைகள்) மூலம் திருச்சியிலிருந்து பாதுகாப்பான பயணம்."
                  : "Maruti Omni Van (7-8 seats) or Mahindra Mini Bus (20+ seats) chauffeured from Trichy Kattur Hub."}
              </p>
            </div>
            <a
              href="tel:+917904872119"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-hover transition whitespace-nowrap shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>7904872119</span>
            </a>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {/* Add to Route Circuit */}
            <button
              type="button"
              onClick={() => onToggleRoute(destination)}
              className={`w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                isInRoute
                  ? "bg-secondary text-zinc-950 hover:bg-secondary/90 shadow-md"
                  : "bg-primary/10 text-primary dark:text-secondary hover:bg-primary/20 border border-primary/30"
              }`}
            >
              {isInRoute ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === "ta" ? "வழித்தடத்திலிருந்து நீக்கு" : "Remove from Route"}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{language === "ta" ? "பயண வழித்தடத்தில் சேர்" : "Add to Multi-Stop Route"}</span>
                </>
              )}
            </button>

            {/* Direct Booking CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookRide(destination);
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 transition shadow-lg shadow-primary/20"
            >
              <Car className="w-4 h-4" />
              <span>{language === "ta" ? "வாகனம் முன்பதிவு செய்" : "Book Vehicle for This Spot"}</span>
            </button>

            {/* Google Maps link */}
            <a
              href={destination.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground-theme transition"
              title="Google Maps Navigation"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
