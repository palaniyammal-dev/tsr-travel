"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  District,
  TouristDestination,
  RoutePlanResponse,
  fetchDistricts,
  fetchDestinations,
  fetchDistrictDetail,
} from "@/lib/districtApi";
import DistrictSelector from "@/components/DistrictExplorer/DistrictSelector";
import DestinationCard from "@/components/DistrictExplorer/DestinationCard";
import DestinationDetailModal from "@/components/DistrictExplorer/DestinationDetailModal";
import SmartRoutePlanner from "@/components/DistrictExplorer/SmartRoutePlanner";
import DistrictAIAssistant from "@/components/DistrictExplorer/DistrictAIAssistant";
import BookingForm from "@/components/BookingForm";
import {
  Map,
  Route,
  Bot,
  Sparkles,
  PhoneCall,
  Car,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle,
} from "lucide-react";

// Dynamically import Leaflet Map to avoid SSR issues
const InteractiveDistrictMap = dynamic(
  () => import("@/components/DistrictExplorer/InteractiveDistrictMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] lg:h-[580px] rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse flex flex-col items-center justify-center gap-3">
        <Compass className="w-8 h-8 text-primary animate-spin" />
        <span className="text-xs font-semibold text-foreground-theme/60">
          Loading Interactive Tamil Nadu Map...
        </span>
      </div>
    ),
  }
);

export default function DistrictExplorerPage() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [destinations, setDestinations] = useState<TouristDestination[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<TouristDestination | null>(null);
  const [detailModalDest, setDetailModalDest] = useState<TouristDestination | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [language, setLanguage] = useState<"en" | "ta">("en");

  // Route Planning State
  const [routeStops, setRouteStops] = useState<TouristDestination[]>([]);
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]);

  // Active Tab: "map" | "route" | "ai"
  const [activeTab, setActiveTab] = useState<"map" | "route" | "ai">("map");

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>({
    vehicle_name: "Mahindra Mini Bus",
    trip_type: "Family Trip",
    passengers: 20,
  });

  // Load initial districts and destinations
  useEffect(() => {
    async function loadData() {
      const allDistricts = await fetchDistricts();
      setDistricts(allDistricts);

      // Default to Tiruchirappalli (TSR Central Hub)
      const trichy = allDistricts.find((d) => d.name === "Tiruchirappalli") || allDistricts[0];
      if (trichy) {
        setSelectedDistrict(trichy);
      }

      const allDests = await fetchDestinations();
      setDestinations(allDests);
    }

    loadData();
  }, []);

  // When a district is selected, filter or fetch its destinations
  const handleSelectDistrict = async (district: District) => {
    setSelectedDistrict(district);
    const detail = await fetchDistrictDetail(district.id);
    if (detail && detail.destinations && detail.destinations.length > 0) {
      // Merge/update
      setSelectedDestination(detail.destinations[0] || null);
    }
  };

  // Filtered destinations list
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // District match (if a district is selected, filter by it unless searching globally)
      const matchesDistrict =
        searchQuery.trim().length > 0 || !selectedDistrict
          ? true
          : dest.district_id === selectedDistrict.id ||
            dest.district_name?.toLowerCase() === selectedDistrict.name.toLowerCase();

      // Category match
      const matchesCategory =
        selectedCategory === "all" ||
        dest.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        dest.name.toLowerCase().includes(query) ||
        (dest.tamil_name && dest.tamil_name.includes(query)) ||
        dest.category.toLowerCase().includes(query) ||
        (dest.district_name && dest.district_name.toLowerCase().includes(query));

      return matchesDistrict && matchesCategory && matchesSearch;
    });
  }, [destinations, selectedDistrict, selectedCategory, searchQuery]);

  // Route Stop Toggle
  const handleToggleRouteStop = (dest: TouristDestination) => {
    setRouteStops((prev) => {
      const exists = prev.some((s) => s.id === dest.id);
      if (exists) {
        return prev.filter((s) => s.id !== dest.id);
      } else {
        return [...prev, dest];
      }
    });
  };

  const handleRemoveRouteStop = (id: number) => {
    setRouteStops((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearRoute = () => {
    setRouteStops([]);
    setRoutePolyline([]);
  };

  const handleRouteCalculated = (result: RoutePlanResponse) => {
    if (result && result.route_polyline) {
      setRoutePolyline(result.route_polyline);
    }
  };

  // Open booking modal with prefilled data
  const handleProceedToBooking = (bookingData: {
    pickup: string;
    destination: string;
    vehicle_name: string;
    passengers: number;
    special_notes?: string;
  }) => {
    setBookingPrefill({
      pickup_location: bookingData.pickup,
      destination: bookingData.destination,
      vehicle_name: bookingData.vehicle_name,
      passengers: bookingData.passengers,
      trip_type: "Family Trip",
      special_notes: bookingData.special_notes,
    });
    setBookingModalOpen(true);
  };

  const handleBookSingleDestination = (dest: TouristDestination) => {
    handleProceedToBooking({
      pickup: "TSR Hub, Kattur, Trichy",
      destination: `${dest.name} (${dest.district_name || "Tamil Nadu"})`,
      vehicle_name: "Maruti Omni Van",
      passengers: 6,
      special_notes: `Direct trip booking for ${dest.name}.`,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
      {/* Hero Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-[#0f5132] to-emerald-900 text-white p-6 sm:p-10 shadow-2xl border border-secondary/20">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/15 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-zinc-950 shadow-md">
                  ★ {language === "ta" ? "தமிழ்நாடு ஸ்மார்ட் சுற்றுலா தளம்" : "Tamil Nadu Smart Tourism Platform"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
                  📍 {language === "ta" ? "திருச்சி காட்டூர் தலைமையகம்" : "HQ: Kattur, Trichy"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-white drop-shadow-md">
                {language === "ta" ? (
                  <>
                    <span className="text-secondary">38 மாவட்டங்கள்</span> ஊடுருவல் & நேரடி வரைபட சுற்றுலா
                  </>
                ) : (
                  <>
                    Explore Tamil Nadu: <span className="text-secondary">38 Districts</span>, Interactive Maps & AI Travel
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                {language === "ta"
                  ? "புகழ்பெற்ற கோயில்கள், வரலாற்று தலங்கள், நீர்வீழ்ச்சிகள், அணைகள், கடற்கரைகள் மற்றும் மலை வாசஸ்தலங்களை வரைபடத்தில் பார்வையிட்டு, மாருதி ஆம்னி வேன் (7-8 இருக்கைகள்) மற்றும் மகிந்திரா மினி பஸ் (20+ இருக்கைகள்) மூலம் பாதுகாப்பான பயணத்தை திட்டமிடுங்கள்."
                  : "Discover authentic temples, waterfalls, dams, beaches, and hill stations across all 38 districts with GPS-verified coordinates, smart highway multi-stop route optimization, and bilingual AI itineraries."}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/90">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  {language === "ta" ? "அரசு அங்கீகாரம் & அனுபவ ஓட்டுநர்கள்" : "Verified Fleet & Expert Chauffeurs"}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  <Car className="w-4 h-4 text-secondary" />
                  {language === "ta" ? "மாருதி ஆம்னி & மகிந்திரா மினி பஸ்" : "Omni Van (7-8) • Mini Bus (20+)"}
                </span>
                <a
                  href="tel:+919791465995"
                  className="flex items-center gap-1.5 bg-secondary text-zinc-950 font-bold px-3 py-1.5 rounded-xl hover:bg-secondary/90 transition shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  +91 97914 65995
                </a>
              </div>
            </div>

            {/* Quick Action Pill on right */}
            <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                className="flex-1 lg:flex-none px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <span>🌐</span>
                <span>{language === "en" ? "தமிழில் காண்க" : "View in English"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className="flex-1 lg:flex-none px-5 py-3 rounded-2xl bg-secondary hover:bg-secondary/90 text-zinc-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-secondary/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "ta" ? "AI பயண வழிகாட்டி" : "Ask AI Assistant"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-primary/15 pb-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === "map"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white/60 dark:bg-zinc-800 text-foreground-theme hover:bg-primary/10 border border-primary/15"
            }`}
          >
            <Map className="w-4 h-4" />
            <span>{language === "ta" ? "ஊடாடும் வரைபடம் & தளங்கள்" : "Interactive Map & Highlights"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("route")}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition relative ${
              activeTab === "route"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white/60 dark:bg-zinc-800 text-foreground-theme hover:bg-primary/10 border border-primary/15"
            }`}
          >
            <Route className="w-4 h-4" />
            <span>{language === "ta" ? "வழித்தட திட்டமிடுநர்" : "Smart Multi-Stop Route Planner"}</span>
            {routeStops.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-secondary text-zinc-950 text-[11px] font-black flex items-center justify-center">
                {routeStops.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === "ai"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white/60 dark:bg-zinc-800 text-foreground-theme hover:bg-primary/10 border border-primary/15"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{language === "ta" ? "AI பயண உதவியாளர்" : "Bilingual AI Travel Assistant"}</span>
          </button>
        </div>

        {/* Tab 1: Interactive Map & District Highlights */}
        {activeTab === "map" && (
          <div className="space-y-6">
            {/* Search & Selector Component */}
            <DistrictSelector
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={handleSelectDistrict}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              language={language}
              onToggleLanguage={() => setLanguage(language === "en" ? "ta" : "en")}
            />

            {/* Interactive Leaflet Map */}
            <InteractiveDistrictMap
              destinations={filteredDestinations}
              selectedDistrict={selectedDistrict}
              selectedDestination={selectedDestination}
              onSelectDestination={(d) => {
                setSelectedDestination(d);
                setDetailModalDest(d);
              }}
              routePolyline={routePolyline}
              routeStops={routeStops}
              onAddToRoute={handleToggleRouteStop}
              onOpenDetails={(d) => setDetailModalDest(d)}
              language={language}
            />

            {/* Selected District Info Bar */}
            {selectedDistrict && (
              <div className="p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-primary/15 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-secondary">
                      {selectedDistrict.zone} Zone • {selectedDistrict.headquarters} HQ
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary dark:text-secondary mt-0.5">
                    {selectedDistrict.name} {selectedDistrict.tamil_name ? `• ${selectedDistrict.tamil_name}` : ""}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-theme/80 mt-1 max-w-3xl leading-relaxed">
                    {language === "ta" && selectedDistrict.tamil_description
                      ? selectedDistrict.tamil_description
                      : selectedDistrict.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("route")}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary/10 hover:bg-primary/20 text-primary dark:text-secondary border border-primary/20 transition flex items-center gap-1.5"
                  >
                    <Route className="w-3.5 h-3.5" />
                    <span>{language === "ta" ? "வழித்தட திட்டம் பார்" : "Plan Road Circuit"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("ai")}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary/90 text-zinc-950 transition flex items-center gap-1.5 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === "ta" ? "AI அட்டவணை" : "Get AI Itinerary"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Destination Cards Section Header */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">
                  {language === "ta" ? "சுற்றுலா தளங்கள்" : "Tourist Destinations"}
                </h3>
                <p className="text-xs text-foreground-theme/60">
                  {language === "ta"
                    ? `காட்டப்படும் தளங்கள்: ${filteredDestinations.length}`
                    : `Showing ${filteredDestinations.length} verified destinations for exploration`}
                </p>
              </div>

              {routeStops.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("route")}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-secondary text-zinc-950 shadow-md flex items-center gap-1.5 animate-pulse"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>
                    {routeStops.length} {language === "ta" ? "நிறுத்தங்கள் தயாராக உள்ளன" : "Stops in Circuit"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Destination Cards Grid */}
            {filteredDestinations.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white/70 dark:bg-zinc-900 border border-dashed border-primary/20 text-center space-y-4">
                <Compass className="w-10 h-10 mx-auto text-primary/40 animate-pulse" />
                <h4 className="font-bold text-base text-foreground-theme">
                  {language === "ta"
                    ? `${selectedDistrict?.name || "தேர்ந்தெடுக்கப்பட்ட"} மாவட்டத்திற்கான சுற்றுலா தளங்கள்`
                    : `Destinations for ${selectedDistrict?.name || "this district"}`}
                </h4>
                <p className="text-xs text-foreground-theme/70 max-w-lg mx-auto leading-relaxed">
                  {language === "ta"
                    ? "இந்த மாவட்டத்திற்கான தனிப்பயன் பயண திட்டத்தை AI வழிகாட்டி மூலம் உடனடியாக உருவாக்கலாம், அல்லது அனைத்து தமிழ்நாடு இடங்களையும் பார்வையிடலாம்."
                    : "You can generate an instant customized 1-day or 2-day itinerary for this district using our bilingual AI Assistant, or reset filters to browse all state highlights."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ai")}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary/90 text-zinc-950 transition flex items-center gap-1.5 shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {language === "ta"
                        ? `${selectedDistrict?.name || ""} AI பயண திட்டம் பெறுக`
                        : `Generate AI Plan for ${selectedDistrict?.name || "District"}`}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                      setSelectedDistrict(null);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition"
                  >
                    {language === "ta" ? "அனைத்து மாவட்டங்களையும் காண்க" : "Browse All Tamil Nadu Spots"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    isSelected={selectedDestination?.id === dest.id}
                    isInRoute={routeStops.some((s) => s.id === dest.id)}
                    onSelect={(d) => {
                      setSelectedDestination(d);
                    }}
                    onToggleRoute={handleToggleRouteStop}
                    onBookRide={handleBookSingleDestination}
                    onOpenDetails={(d) => setDetailModalDest(d)}
                    language={language}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Smart Route Planner View */}
        {activeTab === "route" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Preview on Left */}
            <div className="lg:col-span-7 space-y-4">
              <InteractiveDistrictMap
                destinations={routeStops.length > 0 ? routeStops : filteredDestinations}
                selectedDistrict={selectedDistrict}
                selectedDestination={selectedDestination}
                onSelectDestination={(d) => setSelectedDestination(d)}
                routePolyline={routePolyline}
                routeStops={routeStops}
                onAddToRoute={handleToggleRouteStop}
                onOpenDetails={(d) => setDetailModalDest(d)}
                language={language}
              />
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900 border border-primary/15 text-xs text-foreground-theme/70 flex items-center justify-between">
                <span>
                  💡{" "}
                  {language === "ta"
                    ? "வரைபடத்தில் உள்ள பச்சை நிற பாதை உங்கள் கணக்கிடப்பட்ட நெடுஞ்சாலைப் பயணத்தைக் குறிக்கிறது."
                    : "The green highlighted line on the map traces your OSRM optimized highway route."}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("map")}
                  className="text-primary dark:text-secondary font-bold hover:underline ml-2"
                >
                  + {language === "ta" ? "கூடுதல் தளங்களை சேர்" : "Add More Spots"}
                </button>
              </div>
            </div>

            {/* Route Planner Panel on Right */}
            <div className="lg:col-span-5">
              <SmartRoutePlanner
                routeStops={routeStops}
                onRemoveStop={handleRemoveRouteStop}
                onClearRoute={handleClearRoute}
                onRouteCalculated={handleRouteCalculated}
                onProceedToBooking={handleProceedToBooking}
                language={language}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Bilingual AI Travel Assistant View */}
        {activeTab === "ai" && (
          <div className="max-w-4xl mx-auto">
            <DistrictAIAssistant
              districts={districts}
              selectedDistrict={selectedDistrict}
              onProceedToBooking={handleProceedToBooking}
              language={language}
            />
          </div>
        )}

        {/* Destination Detail Modal */}
        <DestinationDetailModal
          destination={detailModalDest}
          onClose={() => setDetailModalDest(null)}
          isInRoute={routeStops.some((s) => s.id === detailModalDest?.id)}
          onToggleRoute={handleToggleRouteStop}
          onBookRide={handleBookSingleDestination}
          language={language}
        />

        {/* Seamless Booking Form Modal Overlay */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
              <BookingForm
                initialValues={bookingPrefill}
                onClose={() => setBookingModalOpen(false)}
              />
            </div>
          </div>
        )}
    </div>
  );
}
