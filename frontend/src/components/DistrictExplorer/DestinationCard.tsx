"use client";

import React from "react";
import { TouristDestination } from "@/lib/districtApi";
import { MapPin, Clock, Calendar, ExternalLink, Plus, Check, Eye, Car } from "lucide-react";

interface DestinationCardProps {
  destination: TouristDestination;
  isSelected: boolean;
  isInRoute: boolean;
  onSelect: (dest: TouristDestination) => void;
  onToggleRoute: (dest: TouristDestination) => void;
  onBookRide: (dest: TouristDestination) => void;
  onOpenDetails: (dest: TouristDestination) => void;
  language: "en" | "ta";
}

export default function DestinationCard({
  destination,
  isSelected,
  isInRoute,
  onSelect,
  onToggleRoute,
  onBookRide,
  onOpenDetails,
  language,
}: DestinationCardProps) {
  return (
    <div
      onClick={() => onSelect(destination)}
      className={`group relative flex flex-col justify-between rounded-3xl overflow-hidden backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-secondary shadow-xl shadow-secondary/15 ring-2 ring-secondary/30 bg-white/95 dark:bg-zinc-900/95"
          : "border-primary/15 dark:border-secondary/15 hover:border-primary/50 bg-white/80 dark:bg-zinc-900/80 hover:shadow-xl"
      }`}
    >
      {/* Thumbnail with Category & Action Badges */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <img
          src={destination.image_url}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary/90 text-white shadow-md">
            {destination.category}
          </span>
          {destination.is_priority_stop && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-secondary text-zinc-950 shadow-md">
              ★ {language === "ta" ? "முக்கிய தளம்" : "Top Spot"}
            </span>
          )}
        </div>

        {/* In-Route Checkpoint Marker */}
        {isInRoute && (
          <div className="absolute top-3 right-3 bg-secondary text-zinc-950 font-bold px-2.5 py-1 rounded-full text-xs shadow-lg flex items-center gap-1 animate-pulse">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{language === "ta" ? "பயணப் பட்டியலில் உள்ளது" : "In Route"}</span>
          </div>
        )}

        {/* Place Title on image overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-lg text-white leading-tight drop-shadow-md">
            {destination.name}
          </h3>
          {destination.tamil_name && (
            <p className="text-xs font-semibold text-secondary drop-shadow-sm mt-0.5">
              {destination.tamil_name}
            </p>
          )}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-2">
          {/* District Name & Ideal Duration */}
          <div className="flex items-center justify-between text-xs text-foreground-theme/70 font-medium">
            <span className="inline-flex items-center gap-1 text-primary dark:text-secondary">
              <MapPin className="w-3.5 h-3.5" />
              {destination.district_name || "Tamil Nadu"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-foreground-theme/50" />
              {destination.ideal_duration || "1.5 - 2 Hours"}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-foreground-theme/80 line-clamp-2 leading-relaxed">
            {language === "ta" && destination.tamil_description
              ? destination.tamil_description
              : destination.description}
          </p>

          {/* Best Time & Visiting Hours */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-foreground-theme/60">
            <span className="inline-flex items-center gap-1 bg-cream/70 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
              <Calendar className="w-3 h-3 text-secondary" />
              {destination.best_time_to_visit || "Year-round"}
            </span>
            {destination.visiting_hours && (
              <span className="bg-cream/70 dark:bg-zinc-800 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                {destination.visiting_hours}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 border-t border-primary/10 dark:border-secondary/15 flex items-center gap-2">
          {/* Toggle In Route Planner */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleRoute(destination);
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
              isInRoute
                ? "bg-secondary text-zinc-950 hover:bg-secondary/90"
                : "bg-primary/10 hover:bg-primary/20 text-primary dark:text-secondary border border-primary/20"
            }`}
          >
            {isInRoute ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{language === "ta" ? "நீக்கு" : "Added"}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{language === "ta" ? "வழித்தடத்தில் சேர்" : "Add to Route"}</span>
              </>
            )}
          </button>

          {/* Details Modal Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(destination);
            }}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground-theme transition"
            title={language === "ta" ? "முழு விபரம்" : "Full Details"}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Direct Ride Booking */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookRide(destination);
            }}
            className="p-2 rounded-xl bg-primary hover:bg-primary-hover text-white transition shadow-sm"
            title={language === "ta" ? "வாகனம் முன்பதிவு செய்" : "Book TSR Vehicle"}
          >
            <Car className="w-4 h-4" />
          </button>

          {/* Google Maps External Directions */}
          <a
            href={destination.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground-theme transition"
            title={language === "ta" ? "கூகுள் வரைபடம்" : "Open in Google Maps"}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
