"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  UserCheck, Phone, Bus, MapPin, Navigation, Clock, CheckCircle, 
  AlertCircle, LogOut, IndianRupee, ShieldCheck, Car, CheckCircle2 
} from "lucide-react";

export default function DriverDashboardPage() {
  const router = useRouter();
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [tripStage, setTripStage] = useState<"assigned" | "en_route" | "arrived" | "completed">("assigned");

  const driverProfile = {
    name: "Murugan K",
    id: "DRV-101",
    phone: "+91 98430 11992",
    experience: "12 Years Experience",
    rating: "4.9 ★",
    assignedVehicle: "Mahindra Mini Bus",
    vehicleNumber: "TN-45-AZ-9950",
    seating: "20+ Seats Push-Back AC"
  };

  const activeTrip = {
    bookingId: "TSR-9081",
    customer: "Senthil Kumar",
    customerPhone: "+91 98424 11223",
    pickup: "Kattur, Trichy (Main Boarding Point)",
    destination: "Ooty (Udhagamandalam Hill Station)",
    date: "2026-09-28",
    time: "05:30 AM",
    passengers: 16,
    tripType: "Family Pilgrimage & Hill Retreat",
    allowance: "₹1,800 / day"
  };

  const handleLogout = () => {
    localStorage.removeItem("tsr_driver_token");
    localStorage.removeItem("tsr_user_role");
    router.push("/driver/login");
  };

  const handleAdvanceStage = () => {
    if (tripStage === "assigned") setTripStage("en_route");
    else if (tripStage === "en_route") setTripStage("arrived");
    else if (tripStage === "arrived") setTripStage("completed");
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#08120d] pb-20">
      
      {/* Top Header */}
      <header className="glass-nav border-b border-primary/10 sticky top-0 z-30 px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="font-display font-extrabold text-2xl tracking-wider text-primary dark:text-secondary">
              TSR<span className="text-secondary dark:text-accent font-semibold ml-1">TRAVEL</span>
            </span>
          </Link>
          <span className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold px-3 py-1 rounded-full border border-blue-500/20">
            Driver Partner Console
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white dark:text-red-400 text-xs font-bold transition cursor-pointer"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Driver Profile & Duty Status Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-secondary/10 flex items-center justify-center text-primary dark:text-secondary font-display font-extrabold text-2xl">
              MK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl text-foreground-theme">{driverProfile.name}</h1>
                <span className="text-xxs font-bold bg-primary/10 text-primary dark:text-secondary px-2 py-0.5 rounded">{driverProfile.id}</span>
              </div>
              <p className="text-xs text-foreground-theme/60 mt-0.5">
                {driverProfile.experience} | Rating: <strong className="text-amber-500">{driverProfile.rating}</strong>
              </p>
              <p className="text-xxs text-foreground-theme/50 mt-1">Owner Contact: Ravitharan (+91 97914 65995)</p>
            </div>
          </div>

          {/* Duty Status Toggle */}
          <div className="flex items-center gap-3 bg-background/50 p-2 rounded-2xl border border-primary/10 w-full md:w-auto justify-between">
            <span className="text-xs font-bold text-foreground-theme/80 px-2">Duty Status:</span>
            <button
              onClick={() => setIsOnDuty(!isOnDuty)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer flex items-center gap-2 ${
                isOnDuty
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-400 text-white"
              }`}
            >
              <CheckCircle size={16} />
              {isOnDuty ? "ON-DUTY (READY)" : "OFF-DUTY"}
            </button>
          </div>
        </div>

        {/* Assigned Fleet Vehicle Card */}
        <div className="glass-card p-6 rounded-3xl border border-primary/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div className="relative h-28 rounded-2xl overflow-hidden">
            <img src="/images/vehicles/mini_bus.jpeg" alt={driverProfile.assignedVehicle} className="object-cover w-full h-full" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <span className="text-xxs font-bold text-primary dark:text-secondary uppercase tracking-widest">Assigned Vehicle</span>
            <h3 className="font-display font-bold text-lg text-foreground-theme">{driverProfile.assignedVehicle}</h3>
            <p className="text-xs text-foreground-theme/70 font-mono">Reg: <strong>{driverProfile.vehicleNumber}</strong> | Capacity: <strong>{driverProfile.seating}</strong></p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-xxs font-bold mt-2">
              <ShieldCheck size={12} /> Vehicle Inspected & Fit for Long Trips
            </div>
          </div>
        </div>

        {/* Active Assigned Trip Console */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-primary/10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-primary/10 pb-4">
            <div>
              <span className="text-xxs font-bold text-primary dark:text-secondary uppercase tracking-widest">Active Assigned Trip</span>
              <h2 className="font-display font-extrabold text-2xl text-foreground-theme">Booking #{activeTrip.bookingId}</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold w-fit">
              Departure: {activeTrip.date} at {activeTrip.time}
            </span>
          </div>

          {/* Route Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/40 p-5 rounded-2xl border border-primary/5">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-green-500 mt-1 shrink-0" size={18} />
                <div>
                  <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Pickup Location</span>
                  <span className="font-bold text-xs text-foreground-theme">{activeTrip.pickup}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-1 shrink-0" size={18} />
                <div>
                  <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Destination</span>
                  <span className="font-bold text-xs text-foreground-theme">{activeTrip.destination}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l border-primary/10 pt-3 md:pt-0 md:pl-6">
              <div>
                <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Customer</span>
                <span className="font-bold text-sm text-foreground-theme">{activeTrip.customer} ({activeTrip.passengers} Passengers)</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${activeTrip.customerPhone}`}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
                >
                  <Phone size={14} /> Call Customer
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeTrip.destination)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700"
                >
                  <Navigation size={14} /> Open GPS Navigation
                </a>
              </div>
            </div>
          </div>

          {/* Trip Status Workflow Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-foreground-theme/80 block">Update Live Trip Progress:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setTripStage("en_route")}
                className={`p-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  tripStage === "en_route" || tripStage === "arrived" || tripStage === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-black/5 dark:bg-white/5 border border-primary/10 text-foreground-theme"
                }`}
              >
                <CheckCircle2 size={16} /> 1. Start Journey
              </button>

              <button
                onClick={() => setTripStage("arrived")}
                className={`p-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  tripStage === "arrived" || tripStage === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-black/5 dark:bg-white/5 border border-primary/10 text-foreground-theme"
                }`}
              >
                <CheckCircle2 size={16} /> 2. Arrived at Destination
              </button>

              <button
                onClick={() => setTripStage("completed")}
                className={`p-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  tripStage === "completed"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-black/5 dark:bg-white/5 border border-primary/10 text-foreground-theme"
                }`}
              >
                <CheckCircle2 size={16} /> 3. Trip Completed
              </button>
            </div>
          </div>

          {tripStage === "completed" && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 rounded-2xl text-xs font-bold text-center">
              🎉 Trip marked as completed! Driver daily allowance of {activeTrip.allowance} added to payout record.
            </div>
          )}
        </div>

        {/* Driver Earnings Summary */}
        <div className="glass-card p-6 rounded-3xl border border-primary/10 space-y-4">
          <h3 className="font-display font-bold text-lg text-foreground-theme flex items-center gap-2">
            <IndianRupee size={18} className="text-primary dark:text-secondary" /> Driver Earnings & Allowances
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-background/50 rounded-2xl border border-primary/5">
              <span className="text-xxs font-bold text-foreground-theme/50 block">This Month Trips</span>
              <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">18 Trips</span>
            </div>
            <div className="p-4 bg-background/50 rounded-2xl border border-primary/5">
              <span className="text-xxs font-bold text-foreground-theme/50 block">Daily Allowance</span>
              <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">₹1,800/day</span>
            </div>
            <div className="p-4 bg-background/50 rounded-2xl border border-primary/5">
              <span className="text-xxs font-bold text-foreground-theme/50 block">Overnight Stay Bonus</span>
              <span className="font-display font-extrabold text-xl text-primary dark:text-secondary">₹500/night</span>
            </div>
            <div className="p-4 bg-background/50 rounded-2xl border border-primary/5">
              <span className="text-xxs font-bold text-foreground-theme/50 block">Total Payout Settled</span>
              <span className="font-display font-extrabold text-xl text-green-600 dark:text-green-400">₹32,400</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
