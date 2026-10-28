"use client";

import React, { useState } from "react";
import { District, DistrictAIAssistantResponse, generateDistrictItinerary } from "@/lib/districtApi";
import { Sparkles, Bot, Calendar, Users, Car, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck, Clock } from "lucide-react";

interface DistrictAIAssistantProps {
  districts: District[];
  selectedDistrict: District | null;
  onProceedToBooking: (bookingData: {
    pickup: string;
    destination: string;
    vehicle_name: string;
    passengers: number;
    special_notes?: string;
  }) => void;
  language: "en" | "ta";
}

export default function DistrictAIAssistant({
  districts,
  selectedDistrict,
  onProceedToBooking,
  language,
}: DistrictAIAssistantProps) {
  const [districtName, setDistrictName] = useState<string>(
    selectedDistrict?.name || "Tiruchirappalli"
  );
  const [tripDuration, setTripDuration] = useState<"1_day" | "2_days">("1_day");
  const [passengerCount, setPassengerCount] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<DistrictAIAssistantResponse | null>(null);

  // Sync when selectedDistrict prop changes
  React.useEffect(() => {
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.name);
    }
  }, [selectedDistrict]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateDistrictItinerary({
        district_name: districtName,
        language: language,
        trip_duration: tripDuration,
        passenger_count: passengerCount,
        starting_location: "TSR Hub, Kattur, Trichy",
      });
      if (res) {
        setAiResult(res);
      }
    } catch (err) {
      console.error("AI Assistant error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookItinerary = () => {
    if (!aiResult) return;
    const prefill = aiResult.booking_prefill;
    onProceedToBooking({
      pickup: prefill.pickup || "TSR Hub, Kattur, Trichy",
      destination: prefill.drop || `${districtName} Tour Circuit`,
      vehicle_name: aiResult.recommended_vehicle,
      passengers: prefill.passengers || passengerCount,
      special_notes: `AI Itinerary: ${aiResult.itinerary_title} (${tripDuration})`,
    });
  };

  return (
    <div className="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-primary/20 dark:border-secondary/25 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Assistant Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/10 dark:border-secondary/15">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lg shadow-primary/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-secondary/30 text-amber-900 dark:text-amber-200">
                {language === "ta" ? "செயற்கை நுண்ணறிவு வழிகாட்டி" : "Bilingual AI Engine"}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-primary dark:text-secondary mt-0.5">
              {language === "ta"
                ? "TSR மாவட்ட பயண திட்டமிடுநர்"
                : "Tamil Nadu Smart AI Travel Assistant"}
            </h3>
            <p className="text-xs text-foreground-theme/70">
              {language === "ta"
                ? "உங்களின் விருப்பத்திற்கேற்ப நாள்வாரியான பயண திட்டம் மற்றும் வாகன பரிந்துரை"
                : "Get tailored day-by-day itineraries, cultural tips, and instant vehicle quotes"}
            </p>
          </div>
        </div>
      </div>

      {/* Input Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* District Choice */}
        <div>
          <label className="block font-semibold text-foreground-theme/70 mb-1.5">
            {language === "ta" ? "இலக்கு மாவட்டம்:" : "Destination District:"}
          </label>
          <select
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-cream/70 dark:bg-zinc-800 border border-primary/20 dark:border-secondary/30 text-foreground-theme outline-none focus:border-primary font-medium"
          >
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} {d.tamil_name ? `(${d.tamil_name})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Choice */}
        <div>
          <label className="block font-semibold text-foreground-theme/70 mb-1.5">
            {language === "ta" ? "பயண நாட்கள்:" : "Trip Duration:"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTripDuration("1_day")}
              className={`py-2 px-2.5 rounded-xl font-bold transition text-xs ${
                tripDuration === "1_day"
                  ? "bg-primary text-white shadow-md"
                  : "bg-cream/70 dark:bg-zinc-800 text-foreground-theme border border-primary/15"
              }`}
            >
              {language === "ta" ? "1 நாள் பயணம்" : "1-Day Circuit"}
            </button>
            <button
              type="button"
              onClick={() => setTripDuration("2_days")}
              className={`py-2 px-2.5 rounded-xl font-bold transition text-xs ${
                tripDuration === "2_days"
                  ? "bg-primary text-white shadow-md"
                  : "bg-cream/70 dark:bg-zinc-800 text-foreground-theme border border-primary/15"
              }`}
            >
              {language === "ta" ? "2 நாட்கள் பயணம்" : "2-Days Weekend"}
            </button>
          </div>
        </div>

        {/* Passenger Count */}
        <div>
          <label className="block font-semibold text-foreground-theme/70 mb-1.5 flex items-center justify-between">
            <span>{language === "ta" ? "பயணிகள்:" : "Group Size:"}</span>
            <span className="font-bold text-primary dark:text-secondary">
              {passengerCount} {language === "ta" ? "நபர்கள்" : "Pax"}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer mt-2"
          />
        </div>
      </div>

      {/* Generate CTA Button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGenerate}
        className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 transition shadow-xl shadow-primary/25 disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>
              {language === "ta"
                ? "பயண திட்டம் தயாரிக்கப்படுகிறது..."
                : "Crafting Verified Travel Circuit..."}
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "ta"
                ? `${districtName} மாவட்டத்திற்கான AI திட்டத்தை பெறுக`
                : `Generate Custom AI Plan for ${districtName}`}
            </span>
          </>
        )}
      </button>

      {/* AI Generated Itinerary Presentation */}
      {aiResult && (
        <div className="space-y-6 pt-2 animate-fade-in">
          {/* Title Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-primary/20">
            <h4 className="font-display font-bold text-lg text-primary dark:text-secondary">
              {aiResult.itinerary_title}
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-theme/70 mt-2">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {tripDuration === "1_day"
                  ? (language === "ta" ? "1 நாள் சுற்றுப்பயணம்" : "1-Day Complete Tour")
                  : (language === "ta" ? "2 நாட்கள் வார இறுதி உலா" : "2-Days Weekend Tour")}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-primary" />
                {passengerCount} {language === "ta" ? "பயணிகள்" : "Passengers"}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {language === "ta" ? "சரிபார்க்கப்பட்ட தளம்" : "Verified Tourism Route"}
              </span>
            </div>
          </div>

          {/* Vehicle Match Box */}
          <div className="p-4 rounded-2xl bg-cream/80 dark:bg-zinc-800/80 border border-secondary/40 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={passengerCount <= 8 ? "/images/vehicles/omni.jpeg" : "/images/vehicles/mini_bus.jpeg"}
              alt={aiResult.recommended_vehicle}
              className="w-24 h-20 rounded-xl object-cover border border-primary/20 flex-shrink-0"
            />
            <div className="flex-1 text-xs space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary/30 text-amber-950 dark:text-amber-200">
                  {language === "ta" ? "தேர்ந்தெடுக்கப்பட்ட வாகனம்" : "Matched Fleet"}
                </span>
                <span className="font-display font-bold text-sm text-foreground-theme">
                  {aiResult.recommended_vehicle} ({aiResult.vehicle_capacity})
                </span>
              </div>
              <p className="text-foreground-theme/80 leading-relaxed">
                {aiResult.vehicle_rationale}
              </p>
            </div>
          </div>

          {/* Schedule Timeline */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-sm text-primary dark:text-secondary uppercase tracking-wider">
              {language === "ta" ? "நாள்வாரியான அட்டவணை" : "Day-by-Day Schedule"}
            </h5>
            <div className="space-y-3">
              {aiResult.schedule.map((day, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-primary/15 shadow-sm space-y-2 text-xs"
                >
                  <div className="font-bold text-sm text-primary dark:text-secondary border-b border-primary/10 pb-1.5 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{day.day}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="font-bold text-amber-800 dark:text-amber-300 mb-1">
                        🌅 {language === "ta" ? "காலை" : "Morning"}
                      </div>
                      <p className="text-foreground-theme/85">{day.morning}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                        ☀️ {language === "ta" ? "மதியம்" : "Afternoon"}
                      </div>
                      <p className="text-foreground-theme/85">{day.afternoon}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <div className="font-bold text-indigo-800 dark:text-indigo-300 mb-1">
                        🌆 {language === "ta" ? "மாலை" : "Evening"}
                      </div>
                      <p className="text-foreground-theme/85">{day.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Tips */}
          {aiResult.practical_tips && aiResult.practical_tips.length > 0 && (
            <div className="p-4 rounded-2xl bg-primary/5 dark:bg-zinc-800/60 border border-primary/15 space-y-2">
              <div className="font-bold text-xs text-primary dark:text-secondary uppercase tracking-wider">
                💡 {language === "ta" ? "பயணக் குறிப்புகள்" : "Practical Local Tips"}
              </div>
              <ul className="space-y-1.5 text-xs text-foreground-theme/80 list-disc list-inside">
                {aiResult.practical_tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Book this Itinerary CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleBookItinerary}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-secondary hover:bg-secondary/90 text-zinc-950 flex items-center justify-center gap-2 transition shadow-xl shadow-secondary/25"
            >
              <Car className="w-4 h-4" />
              <span>
                {language === "ta"
                  ? `இந்த பயண திட்டத்தை முன்பதிவு செய்க (${aiResult.recommended_vehicle})`
                  : `Book This Itinerary with ${aiResult.recommended_vehicle}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+917904872119"
              className="w-full sm:w-auto py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 transition whitespace-nowrap shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+91 79048 72119</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
