"use client";

import React, { useState, useMemo } from "react";
import { District } from "@/lib/districtApi";
import { Search, MapPin, Sparkles, Filter, X } from "lucide-react";

interface DistrictSelectorProps {
  districts: District[];
  selectedDistrict: District | null;
  onSelectDistrict: (district: District) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedZone: string;
  onSelectZone: (zone: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: "en" | "ta";
  onToggleLanguage: () => void;
}

const CATEGORIES = [
  { id: "all", labelEn: "All Highlights", labelTa: "அனைத்தும்", icon: "✨" },
  { id: "Temples", labelEn: "Temples", labelTa: "கோயில்கள்", icon: "🛕" },
  { id: "Heritage", labelEn: "Heritage", labelTa: "வரலாற்று தலங்கள்", icon: "🏛️" },
  { id: "Hill Stations", labelEn: "Hill Stations", labelTa: "மலை வாசஸ்தலங்கள்", icon: "⛰️" },
  { id: "Waterfalls", labelEn: "Waterfalls", labelTa: "நீர்வீழ்ச்சிகள்", icon: "🌊" },
  { id: "Dams", labelEn: "Dams & Anicuts", labelTa: "அணைகள்", icon: "💧" },
  { id: "Beaches", labelEn: "Beaches", labelTa: "கடற்கரைகள்", icon: "🏖️" },
  { id: "Picnic Spots", labelEn: "Picnic Spots", labelTa: "சுற்றுலா பூங்காக்கள்", icon: "🌳" },
];

const ZONES = [
  { id: "all", labelEn: "All Tamil Nadu (38)", labelTa: "தமிழ்நாடு முழுவதும்" },
  { id: "Central", labelEn: "Central TN (Trichy Hub)", labelTa: "மத்திய மண்டலம்" },
  { id: "South", labelEn: "South TN (Madurai / Kanyakumari)", labelTa: "தென் மண்டலம்" },
  { id: "West", labelEn: "Kongu / Nilgiris (Ooty)", labelTa: "மேற்கு / கொங்கு" },
  { id: "North", labelEn: "North TN (Chennai)", labelTa: "வட மண்டலம்" },
  { id: "East", labelEn: "Delta / Coastal", labelTa: "கிழக்கு / டெல்டா" },
];

export default function DistrictSelector({
  districts,
  selectedDistrict,
  onSelectDistrict,
  selectedCategory,
  onSelectCategory,
  selectedZone,
  onSelectZone,
  searchQuery,
  onSearchChange,
  language,
  onToggleLanguage,
}: DistrictSelectorProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filtered districts for dropdown / search
  const filteredDistricts = useMemo(() => {
    return districts.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.tamil_name && d.tamil_name.includes(searchQuery)) ||
        d.popular_for?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesZone = selectedZone === "all" || d.zone === selectedZone;

      return matchesSearch && matchesZone;
    });
  }, [districts, searchQuery, selectedZone]);

  return (
    <div className="w-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-primary/20 dark:border-secondary/20 rounded-3xl p-5 shadow-xl transition-all">
      {/* Top Header Row: Title, Language Switch, District Count Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary">
              <Sparkles className="w-3.5 h-3.5" />
              {language === "ta" ? "38 மாவட்டங்கள் ஆய்வு" : "38 Official Districts Covered"}
            </span>
            <span className="text-xs text-foreground-theme/60 hidden sm:inline">
              {language === "ta" ? "திருச்சி TSR தலைமையகம்" : "HQ: Trichy Kattur Hub"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-primary dark:text-secondary mt-1">
            {language === "ta"
              ? "தமிழ்நாடு மாவட்ட சுற்றுலா & வழித்தட வரைபடம்"
              : "Smart District Explorer & Interactive Route Guide"}
          </h2>
        </div>

        {/* Language Switch Button */}
        <button
          onClick={onToggleLanguage}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-primary/30 dark:border-secondary/30 bg-primary/5 hover:bg-primary/15 dark:bg-secondary/10 dark:hover:bg-secondary/20 text-primary dark:text-secondary transition-all"
          title={language === "en" ? "தமிழில் பார்க்க" : "Switch to English"}
        >
          <span className="font-bold">🌐 {language === "en" ? "தமிழ்" : "English"}</span>
          <span className="text-[11px] opacity-75">
            ({language === "en" ? "Change to Tamil" : "ஆங்கிலத்திற்கு மாற்று"})
          </span>
        </button>
      </div>

      {/* District Selector & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
        {/* District Dropdown Selector */}
        <div className="relative md:col-span-5">
          <label className="block text-xs font-semibold text-foreground-theme/70 mb-1">
            {language === "ta" ? "மாவட்டத்தைத் தேர்வு செய்க:" : "Select District:"}
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-cream/70 dark:bg-zinc-900/90 border border-primary/30 dark:border-secondary/30 text-left font-medium text-foreground-theme shadow-inner hover:border-primary transition"
          >
            <div className="flex items-center gap-2.5 truncate">
              <MapPin className="w-4 h-4 text-primary dark:text-secondary flex-shrink-0" />
              <span className="truncate">
                {selectedDistrict ? (
                  <>
                    <strong className="text-primary dark:text-secondary">{selectedDistrict.name}</strong>
                    {selectedDistrict.tamil_name && (
                      <span className="text-xs text-foreground-theme/70 ml-2">({selectedDistrict.tamil_name})</span>
                    )}
                  </>
                ) : (
                  (language === "ta" ? "ஒரு மாவட்டத்தைத் தேர்ந்தெடுக்கவும்..." : "Choose a district...")
                )}
              </span>
            </div>
            <span className="text-xs text-foreground-theme/50 ml-2">▼</span>
          </button>

          {/* District Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute z-50 left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-primary/25 dark:border-secondary/30 shadow-2xl p-2 space-y-1">
              <div className="sticky top-0 bg-white dark:bg-zinc-900 p-2 border-b border-zinc-200 dark:border-zinc-800">
                <input
                  type="text"
                  placeholder={language === "ta" ? "மாவட்டத்தின் பெயர் தேடுக..." : "Type to filter districts..."}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none outline-none text-foreground-theme"
                  autoFocus
                />
              </div>

              {filteredDistricts.length === 0 ? (
                <div className="p-4 text-center text-xs text-foreground-theme/60">
                  {language === "ta" ? "மாவட்டங்கள் எதுவும் கிடைக்கவில்லை" : "No matching districts found"}
                </div>
              ) : (
                filteredDistricts.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      onSelectDistrict(d);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition ${
                      selectedDistrict?.id === d.id
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-primary/10 dark:hover:bg-zinc-800 text-foreground-theme"
                    }`}
                  >
                    <div>
                      <div className="font-medium">
                        {d.name} {d.tamil_name ? `• ${d.tamil_name}` : ""}
                      </div>
                      <div className="text-[11px] opacity-75 truncate max-w-[240px]">
                        {d.popular_for || d.zone + " Zone"}
                      </div>
                    </div>
                    {d.destinations_count && d.destinations_count > 0 ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/30 text-amber-900 dark:text-amber-200 font-bold ml-2">
                        {d.destinations_count} {language === "ta" ? "தளங்கள்" : "spots"}
                      </span>
                    ) : null}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Global Attraction Keyword Search */}
        <div className="relative md:col-span-4">
          <label className="block text-xs font-semibold text-foreground-theme/70 mb-1">
            {language === "ta" ? "சுற்றுலா தளம் / முக்கிய இடம் தேடுக:" : "Search Spot or Keyword:"}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-theme/50" />
            <input
              type="text"
              placeholder={
                language === "ta"
                  ? "எ.கா. மலைக்கோட்டை, பெரிய கோயில், பைகாரா..."
                  : "e.g. Rockfort, Brihadisvara, Ooty Lake, Pykara..."
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-3 rounded-2xl bg-cream/70 dark:bg-zinc-900/90 border border-primary/30 dark:border-secondary/30 text-xs sm:text-sm text-foreground-theme outline-none focus:border-primary shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-theme/50 hover:text-foreground-theme"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Regional Zone Pills Dropdown */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-foreground-theme/70 mb-1">
            {language === "ta" ? "மண்டல வடிகட்டி:" : "Tamil Nadu Zone:"}
          </label>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-theme/50 pointer-events-none" />
            <select
              value={selectedZone}
              onChange={(e) => onSelectZone(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-2xl bg-cream/70 dark:bg-zinc-900/90 border border-primary/30 dark:border-secondary/30 text-xs sm:text-sm text-foreground-theme outline-none focus:border-primary shadow-inner cursor-pointer"
            >
              {ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {language === "ta" ? z.labelTa : z.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div>
        <div className="text-[11px] font-semibold text-foreground-theme/60 mb-2 uppercase tracking-wider">
          {language === "ta" ? "வகைப்பாடு தேர்வு" : "Category Filter"}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((c) => {
            const active = selectedCategory.toLowerCase() === c.id.toLowerCase();
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectCategory(c.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]"
                    : "bg-cream/90 dark:bg-zinc-800 text-foreground-theme/80 hover:bg-primary/10 border border-primary/15"
                }`}
              >
                <span>{c.icon}</span>
                <span>{language === "ta" ? c.labelTa : c.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
