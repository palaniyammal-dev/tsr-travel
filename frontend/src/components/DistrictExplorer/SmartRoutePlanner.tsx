"use client";

import React, { useState } from "react";
import { TouristDestination, RoutePlanResponse, calculateRoutePlan } from "@/lib/districtApi";
import { Navigation, Route, Users, Clock, Gauge, Car, ArrowRight, Trash2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface SmartRoutePlannerProps {
  routeStops: TouristDestination[];
  onRemoveStop: (id: number) => void;
  onClearRoute: () => void;
  onRouteCalculated: (result: RoutePlanResponse) => void;
  onProceedToBooking: (bookingData: {
    pickup: string;
    destination: string;
    vehicle_name: string;
    passengers: number;
    special_notes?: string;
  }) => void;
  language: "en" | "ta";
}

export default function SmartRoutePlanner({
  routeStops,
  onRemoveStop,
  onClearRoute,
  onRouteCalculated,
  onProceedToBooking,
  language,
}: SmartRoutePlannerProps) {
  const [passengers, setPassengers] = useState<number>(6);
  const [startLocation, setStartLocation] = useState<string>("TSR Hub, Kattur, Trichy");
  const [loading, setLoading] = useState<boolean>(false);
  const [calculatedPlan, setCalculatedPlan] = useState<RoutePlanResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic vehicle class recommendation based on passenger count
  const recommendedVehicle = passengers <= 8 ? "Maruti Omni Van" : "Mahindra Mini Bus";
  const vehicleCapacity = passengers <= 8 ? "7–8 Seats" : "20+ Seats";
  const vehicleImage = passengers <= 8 ? "/images/vehicles/omni.jpeg" : "/images/vehicles/mini_bus.jpeg";

  const handleCalculateRoute = async () => {
    if (routeStops.length === 0) {
      setErrorMsg(
        language === "ta"
          ? "தயவுசெய்து குறைந்தது ஒரு சுற்றுலா தலத்தைத் தேர்ந்தெடுக்கவும்."
          : "Please add at least one tourist destination to plan your route."
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await calculateRoutePlan({
        start_location: startLocation,
        start_lat: 10.7905,
        start_lng: 78.7047,
        destination_ids: routeStops.map((s) => s.id),
        passenger_count: passengers,
      });

      if (result) {
        setCalculatedPlan(result);
        onRouteCalculated(result);
      } else {
        setErrorMsg(
          language === "ta"
            ? "வழித்தடத்தை கணக்கிட முடியவில்லை. இணைய இணைப்பை சரிபார்க்கவும்."
            : "Could not calculate highway route. Please verify server connection."
        );
      }
    } catch (err) {
      setErrorMsg("Routing calculation error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingCTA = () => {
    const stopsList = routeStops.map((s) => s.name).join(" -> ");
    const distText = calculatedPlan ? ` (${calculatedPlan.total_distance_km} km highway circuit)` : "";

    onProceedToBooking({
      pickup: startLocation,
      destination: `Tamil Nadu Circuit: ${stopsList}${distText}`,
      vehicle_name: recommendedVehicle,
      passengers: passengers,
      special_notes: `Planned Multi-Stop Circuit with TSR travelling. Stops: ${stopsList}`,
    });
  };

  return (
    <div className="w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-primary/20 dark:border-secondary/25 rounded-3xl p-5 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-primary/10 dark:border-secondary/15">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary dark:text-secondary">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-primary dark:text-secondary">
              {language === "ta" ? "ஸ்மார்ட் வழித்தட திட்டமிடுநர்" : "Smart Multi-Stop Route Planner"}
            </h3>
            <p className="text-xs text-foreground-theme/60">
              {language === "ta"
                ? "பல நிறுத்தங்களை இணைத்து சிறந்த நெடுஞ்சாலைப் பயணத்தை உருவாக்குங்கள்"
                : "Optimizes stop sequence, calculates highway KM, and assigns vehicle"}
            </p>
          </div>
        </div>

        {routeStops.length > 0 && (
          <button
            type="button"
            onClick={onClearRoute}
            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "அனைத்தையும் நீக்கு" : "Clear All"}</span>
          </button>
        )}
      </div>

      {/* Starting Point & Passenger Count inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-foreground-theme/70 mb-1">
            {language === "ta" ? "தொடக்க இடம் (மையம்):" : "Starting Point (Hub):"}
          </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-cream/70 dark:bg-zinc-800 border border-primary/20 dark:border-secondary/30 outline-none focus:border-primary font-medium"
            placeholder="TSR Kattur Hub, Trichy"
          />
        </div>

        <div>
          <label className="block font-semibold text-foreground-theme/70 mb-1 flex items-center justify-between">
            <span>{language === "ta" ? "பயணிகள் எண்ணிக்கை:" : "Passenger Count:"}</span>
            <span className="font-bold text-primary dark:text-secondary">
              {passengers} {language === "ta" ? "நபர்கள்" : "Passengers"}
            </span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="25"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Selected Route Stops List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-foreground-theme/70">
          <span>
            {language === "ta" ? "தேர்ந்தெடுக்கப்பட்ட நிறுத்தங்கள்:" : "Planned Stops in Circuit:"}
          </span>
          <span className="text-primary dark:text-secondary font-bold">
            {routeStops.length} {language === "ta" ? "இடங்கள்" : "Stops"}
          </span>
        </div>

        {routeStops.length === 0 ? (
          <div className="p-6 rounded-2xl border-2 border-dashed border-primary/20 dark:border-zinc-800 text-center text-xs text-foreground-theme/60 space-y-2">
            <Navigation className="w-6 h-6 mx-auto text-primary/40 animate-pulse" />
            <p>
              {language === "ta"
                ? "சுற்றுலா அட்டையிலிருந்து '+ வழித்தடத்தில் சேர்' பொத்தானை அழுத்தி இடங்களை இணைக்கவும்."
                : "Click '+ Add to Route' on any tourist destination card above to add stops."}
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {routeStops.map((stop, index) => (
              <div
                key={stop.id}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-cream/70 dark:bg-zinc-800/80 border border-primary/15 text-xs transition hover:border-primary"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-foreground-theme">{stop.name}</span>
                    {stop.tamil_name && (
                      <span className="text-[11px] text-foreground-theme/60 ml-1.5">
                        ({stop.tamil_name})
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveStop(stop.id)}
                  className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition flex-shrink-0 ml-2"
                  title="Remove Stop"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Calculate Route CTA */}
      <button
        type="button"
        disabled={loading || routeStops.length === 0}
        onClick={handleCalculateRoute}
        className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary-hover disabled:opacity-50 text-white flex items-center justify-center gap-2 transition shadow-lg shadow-primary/20"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{language === "ta" ? "கணக்கிடப்படுகிறது..." : "Calculating Optimal Highway Circuit..."}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "ta"
                ? "நெடுஞ்சாலை வழித்தடத்தை கணக்கிடுக"
                : "Calculate Optimized Highway Route & Vehicle"}
            </span>
          </>
        )}
      </button>

      {/* Calculated Route Details & Vehicle Recommendation Card */}
      {calculatedPlan && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cream via-white to-primary/5 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border border-secondary/40 shadow-xl space-y-4 animate-fade-in">
          {/* Metrics summary */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-zinc-800 border border-primary/20">
              <div className="flex items-center justify-center gap-1 text-xs text-foreground-theme/60 mb-0.5">
                <Gauge className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                <span>{language === "ta" ? "மொத்த தூரம்" : "Highway Distance"}</span>
              </div>
              <div className="text-lg font-bold text-primary dark:text-secondary">
                {calculatedPlan.total_distance_km} KM
              </div>
            </div>

            <div className="p-3 rounded-xl bg-primary/10 dark:bg-zinc-800 border border-primary/20">
              <div className="flex items-center justify-center gap-1 text-xs text-foreground-theme/60 mb-0.5">
                <Clock className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                <span>{language === "ta" ? "பயண நேரம்" : "Driving Time"}</span>
              </div>
              <div className="text-lg font-bold text-primary dark:text-secondary">
                {calculatedPlan.estimated_duration_hours} {language === "ta" ? "மணிநேரம்" : "Hours"}
              </div>
            </div>
          </div>

          {/* Vehicle Match Card */}
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-primary/20 shadow-inner">
            <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-200">
              <img
                src={vehicleImage}
                alt={recommendedVehicle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary/30 text-amber-900 dark:text-amber-200">
                  {language === "ta" ? "பரிந்துரைக்கப்பட்ட வாகனம்" : "Recommended Vehicle"}
                </span>
              </div>
              <div className="font-display font-bold text-sm text-foreground-theme truncate">
                {recommendedVehicle}
              </div>
              <div className="text-xs text-foreground-theme/70">
                {vehicleCapacity} • {passengers} {language === "ta" ? "பயணிகள்" : "Passengers"}
              </div>
            </div>
          </div>

          {/* Proceed to Booking CTA */}
          <button
            type="button"
            onClick={handleBookingCTA}
            className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-secondary hover:bg-secondary/90 text-zinc-950 flex items-center justify-center gap-2 transition shadow-lg shadow-secondary/20"
          >
            <Car className="w-4 h-4" />
            <span>
              {language === "ta"
                ? `இந்த வழித்தடத்திற்கு ${recommendedVehicle} முன்பதிவு செய்க`
                : `Book ${recommendedVehicle} for This Circuit`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
