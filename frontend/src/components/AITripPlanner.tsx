"use client";

import { useState } from "react";
import { 
  Sparkles, Calendar, Users, Briefcase, IndianRupee, MapPin, 
  ChevronRight, ChevronLeft, CheckCircle, Car, ArrowRight, HeartHandshake, Info 
} from "lucide-react";
import axios from "axios";

type PlannedTrip = {
  destination: string;
  days: number;
  passengers: number;
  recommended_vehicle: string;
  vehicle_reason: string;
  budget_breakdown: {
    vehicle_rental: string;
    accommodation_est: string;
    food_est: string;
    sightseeing_and_entry: string;
    total_estimated_budget: string;
  };
  itinerary: { day: number; morning: string; afternoon: string; evening: string }[];
  hotels: { name: string; rating: string; price: string; facilities: string }[];
  packing_list: string[];
  travel_tips: string[];
};

export default function AITripPlanner() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlannedTrip | null>(null);

  // Form States
  const [destination, setDestination] = useState("Ooty");
  const [days, setDays] = useState(3);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState("standard"); // budget, standard, luxury

  const destinationsList = [
    "Ooty", "Kodaikanal", "Yercaud", "Rameswaram", "Madurai", 
    "Kanyakumari", "Velankanni", "Thanjavur", "Chidambaram", 
    "Hogenakkal", "Courtallam", "Yelagiri"
  ];

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmitPlanner = async () => {
    setLoading(true);
    setResult(null);

    const payload = {
      destination,
      days,
      adults,
      children,
      budget
    };

    try {
      const response = await axios.post("http://localhost:8000/api/ai/plan-trip", payload);
      setResult(response.data);
      setStep(5); // Show results page
    } catch (error) {
      console.error("AI Planner API error. Loading local generated fallback.", error);
      
      // Fallback generator locally
      const total = adults + children;
      const vehicle = total <= 8 ? "Maruti Omni Van" : "Mahindra Mini Bus";
      const totalRent = total <= 8 ? 3500 * days : 8000 * days;
      const hotelFee = days > 1 ? (budget === "budget" ? 1800 : (budget === "standard" ? 3000 : 6000)) * (days - 1) : 0;
      
      setResult({
        destination,
        days,
        passengers: total,
        recommended_vehicle: vehicle,
        vehicle_reason: `Based on your group size of ${total} people, we recommend our ${vehicle}. It offers plenty of luggage capacity and a safe journey starting from Trichy.`,
        budget_breakdown: {
          vehicle_rental: `₹${totalRent}`,
          accommodation_est: `₹${hotelFee}`,
          food_est: `₹${500 * total * days}`,
          sightseeing_and_entry: `₹${200 * total * days}`,
          total_estimated_budget: `₹${totalRent + hotelFee + 700 * total * days}`
        },
        itinerary: [
          { day: 1, morning: "Depart early from Trichy. Enjoy scenic highway views.", afternoon: "Check into accommodations, take a hot lunch and visit local markets.", evening: "Stroll around destination viewpoints; enjoy early dinner." },
          { day: days, morning: "Visit famous local temples and natural scenic parks.", afternoon: "Complete souvenir shopping.", evening: "Safe return drive back to Trichy via our professional driver." }
        ],
        hotels: [
          { name: `TSR Travel Partner Stay (${destination})`, rating: "4.2★", price: `₹${hotelFee > 0 ? Math.round(hotelFee / (days - 1)) : 2000}/night`, facilities: "WiFi, Parking, AC" }
        ],
        packing_list: ["Comfortable footwear", "ID cards", "Phone chargers", "Medicines"],
        travel_tips: ["Start early around 5 AM to beat highway traffic.", "Check weather updates before boarding."]
      });
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const resetPlanner = () => {
    setResult(null);
    setStep(1);
  };

  const triggerScrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto border border-primary/10">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-6 border-b border-primary/5 pb-4 justify-center md:justify-start">
        <div className="p-2.5 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary rounded-xl">
          <Sparkles className="size-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-display font-extrabold text-xl">AI Travel Planner</h3>
          <p className="text-xxs text-foreground-theme/60 mt-0.5">Let AI build your custom Tamil Nadu itinerary & recommended budget</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin dark:border-secondary dark:border-t-transparent" />
          <p className="text-xs text-foreground-theme/75 font-semibold animate-pulse">AI is mapping routes, hotels, and vehicle estimates...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* STEP 1: Destination */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <label className="text-sm font-bold text-foreground-theme/80 block">
                Where would you like to travel?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {destinationsList.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDestination(d)}
                    className={`py-3 px-4 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      destination === d
                        ? "border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/5 text-primary dark:text-secondary"
                        : "border-primary/10 hover:bg-black/5 dark:hover:bg-white/5 text-foreground-theme/80"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full btn-primary-gradient font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  Next step <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Duration */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <label className="text-sm font-bold text-foreground-theme/80 block">
                How many days is your trip?
              </label>
              <div className="flex items-center gap-4 py-6 max-w-sm">
                <button
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="p-3 border border-primary/20 rounded-xl hover:bg-black/5 text-lg font-bold text-foreground-theme shrink-0"
                >
                  -
                </button>
                <div className="flex-grow text-center">
                  <span className="font-display font-extrabold text-3xl text-primary dark:text-secondary">
                    {days}
                  </span>
                  <span className="text-xs text-foreground-theme/60 block mt-1">Days duration</span>
                </div>
                <button
                  onClick={() => setDays(Math.min(10, days + 1))}
                  className="p-3 border border-primary/20 rounded-xl hover:bg-black/5 text-lg font-bold text-foreground-theme shrink-0"
                >
                  +
                </button>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-full border border-primary/20 text-foreground-theme font-semibold text-xs tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full btn-primary-gradient font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  Next step <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Passengers */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <label className="text-sm font-bold text-foreground-theme/80 block">
                How many people are traveling?
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground-theme/85">Adults (Age 12+)</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="px-3 py-1.5 border border-primary/20 rounded-lg hover:bg-black/5 font-bold"
                    >
                      -
                    </button>
                    <span className="font-display font-bold text-lg w-8 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(25, adults + 1))}
                      className="px-3 py-1.5 border border-primary/20 rounded-lg hover:bg-black/5 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground-theme/85">Children (Age 2-11)</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="px-3 py-1.5 border border-primary/20 rounded-lg hover:bg-black/5 font-bold"
                    >
                      -
                    </button>
                    <span className="font-display font-bold text-lg w-8 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(15, children + 1))}
                      className="px-3 py-1.5 border border-primary/20 rounded-lg hover:bg-black/5 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic vehicle hint overlay */}
              <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl flex items-center gap-3.5 max-w-md text-xs text-foreground-theme/80 border border-primary/10">
                <Car size={20} className="text-primary dark:text-secondary shrink-0" />
                <p>
                  Estimated Group: <strong>{adults + children} Passengers</strong>.<br />
                  AI suggests: <strong>{adults + children <= 8 ? "Maruti Omni Van (7-8 Seats)" : "Mahindra Mini Bus (20+ Seats)"}</strong>.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-full border border-primary/20 text-foreground-theme font-semibold text-xs tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full btn-primary-gradient font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  Next step <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Budget Tier */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <label className="text-sm font-bold text-foreground-theme/80 block">
                Select your luxury/budget preference:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                {[
                  { value: "budget", label: "Budget Tier", desc: "Economy stay lodges, traditional local dining." },
                  { value: "standard", label: "Standard Tier", desc: "Cozy 3★ resorts, popular family dinings." },
                  { value: "luxury", label: "Luxury Tier", desc: "Premium 4/5★ resorts, premium experiences." }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => setBudget(tier.value)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer h-28 ${
                      budget === tier.value
                        ? "border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/5"
                        : "border-primary/10 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="font-display font-bold text-sm text-foreground-theme">{tier.label}</span>
                    <span className="text-xxs text-foreground-theme/60 leading-normal mt-2">{tier.desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-full border border-primary/20 text-foreground-theme font-semibold text-xs tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  onClick={handleSubmitPlanner}
                  className="px-8 py-3 rounded-full btn-primary-gradient font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Generate AI Trip Plan <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Results Display */}
          {step === 5 && result && (
            <div className="space-y-6 animate-fade-in text-left">
              
              {/* Top info summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10">
                  <span className="text-xxs text-foreground-theme/50 block font-bold uppercase tracking-wider">Destination</span>
                  <span className="font-display font-extrabold text-lg text-primary dark:text-secondary">{result.destination}</span>
                  <span className="text-xxs text-foreground-theme/70 block mt-0.5">{result.days} Days / {result.passengers} People</span>
                </div>
                <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10 col-span-2">
                  <span className="text-xxs text-foreground-theme/50 block font-bold uppercase tracking-wider">Recommended Fleet vehicle</span>
                  <span className="font-display font-extrabold text-base text-primary dark:text-secondary flex items-center gap-1.5 mt-0.5">
                    <Car size={16} /> {result.recommended_vehicle}
                  </span>
                  <p className="text-xxs text-foreground-theme/75 mt-1 leading-relaxed">{result.vehicle_reason}</p>
                </div>
              </div>

              <div className="h-px bg-primary/10" />

              {/* Itinerary and budget grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Itinerary */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-display font-bold text-sm text-primary dark:text-secondary border-b border-primary/5 pb-2">
                    Custom Daily Itinerary
                  </h4>
                  <div className="space-y-4 relative border-l border-primary/15 pl-4 ml-1">
                    {result.itinerary.map((day) => (
                      <div key={day.day} className="relative text-xs space-y-1">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary dark:bg-secondary rounded-full" />
                        <span className="font-bold text-xxs uppercase tracking-wider opacity-60">Day {day.day}</span>
                        <p className="leading-relaxed"><strong>Morning:</strong> {day.morning}</p>
                        <p className="leading-relaxed"><strong>Afternoon:</strong> {day.afternoon}</p>
                        <p className="leading-relaxed"><strong>Evening:</strong> {day.evening}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="md:col-span-5 space-y-4">
                  <h4 className="font-display font-bold text-sm text-primary dark:text-secondary border-b border-primary/5 pb-2">
                    Estimated Budget Breakdown
                  </h4>
                  <div className="space-y-2 text-xs bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                    <div className="flex justify-between border-b border-primary/5 pb-1.5">
                      <span>Vehicle Rental:</span>
                      <span className="font-semibold">{result.budget_breakdown.vehicle_rental}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/5 pb-1.5">
                      <span>Stay Accommodations:</span>
                      <span className="font-semibold">{result.budget_breakdown.accommodation_est}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/5 pb-1.5">
                      <span>Food Expenses:</span>
                      <span className="font-semibold">{result.budget_breakdown.food_est}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/5 pb-1.5">
                      <span>Sightseeing Entries:</span>
                      <span className="font-semibold">{result.budget_breakdown.sightseeing_and_entry}</span>
                    </div>
                    <div className="flex justify-between pt-1.5 font-bold text-sm text-primary dark:text-secondary">
                      <span>Total Estimated Cost:</span>
                      <span>{result.budget_breakdown.total_estimated_budget}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-xl flex items-start gap-2 text-xxs text-foreground-theme/80">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    <span>Calculations are indicative based on season indexes. Drivers allowances are included.</span>
                  </div>
                </div>

              </div>

              <div className="h-px bg-primary/10" />

              {/* Hotels, Packing and tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Packing list */}
                <div className="space-y-2.5">
                  <h5 className="font-bold text-xs uppercase tracking-wider opacity-60">Custom Packing Checklist</h5>
                  <ul className="grid grid-cols-2 gap-1.5 text-xxs text-foreground-theme/80">
                    {result.packing_list.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle size={10} className="text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hotels */}
                <div className="space-y-2.5">
                  <h5 className="font-bold text-xs uppercase tracking-wider opacity-60">Suggested Accommodations</h5>
                  {result.hotels.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xxs border border-primary/5 p-2.5 rounded-xl bg-background/50">
                      <div>
                        <strong className="block">{h.name}</strong>
                        <span className="text-foreground-theme/50">{h.facilities}</span>
                      </div>
                      <span className="font-semibold text-primary dark:text-secondary shrink-0">{h.price}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* CTA Booking buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-primary/5 justify-end">
                <button
                  onClick={resetPlanner}
                  className="px-5 py-2.5 rounded-xl border border-primary/20 text-foreground-theme text-xs font-semibold cursor-pointer text-center"
                >
                  Plan Another Trip
                </button>
                <button
                  onClick={triggerScrollToBooking}
                  className="px-8 py-3 rounded-xl btn-primary-gradient font-bold text-xs tracking-wider cursor-pointer shadow-md text-center"
                >
                  Book This Trip Now
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
