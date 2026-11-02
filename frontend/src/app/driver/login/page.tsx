"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserCheck, Phone, Lock, ArrowRight, ShieldCheck, Car } from "lucide-react";

export default function DriverLoginPage() {
  const router = useRouter();
  const [driverId, setDriverId] = useState("+91 98430 11992");
  const [password, setPassword] = useState("driver123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (driverId && password) {
        localStorage.setItem("tsr_driver_token", "demo_driver_token_9791465995");
        localStorage.setItem("tsr_user_role", "driver");
        router.push("/driver/dashboard");
      } else {
        setError("Please enter valid driver credentials.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#08120d] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            <span className="font-display font-extrabold text-3xl tracking-wider text-primary dark:text-secondary">
              TSR<span className="text-secondary dark:text-accent font-semibold ml-1">TRAVEL</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <UserCheck size={14} /> Driver Portal
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground-theme">
            Driver Partner Login
          </h1>
          <p className="text-xs text-foreground-theme/60">
            Access assigned trips, passenger routes & duty status
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 rounded-3xl space-y-6 shadow-xl border border-primary/10">
          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-foreground-theme/80 block mb-2">
                Mobile Number / Driver ID
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 text-foreground-theme/40" size={18} />
                <input
                  type="text"
                  required
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  placeholder="+91 98430 11992"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/10 dark:border-secondary/10 bg-background/50 text-foreground-theme text-xs outline-none focus:border-primary dark:focus:border-secondary transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground-theme/80 block mb-2">
                Password / PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-foreground-theme/40" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/10 dark:border-secondary/10 bg-background/50 text-foreground-theme text-xs outline-none focus:border-primary dark:focus:border-secondary transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl btn-primary-gradient font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying Driver Portal...</span>
              ) : (
                <>
                  Enter Driver Console <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10 space-y-1.5 text-xxs text-foreground-theme/75">
            <span className="font-bold block text-primary dark:text-secondary text-xs flex items-center gap-1">
              <ShieldCheck size={14} /> Demo Driver Account:
            </span>
            <p><strong>Driver:</strong> Murugan K (12 Yrs Exp)</p>
            <p><strong>Vehicle:</strong> Mahindra Mini Bus (20+ Seats)</p>
            <p><strong>Phone:</strong> +91 98430 11992</p>
          </div>
        </div>

        {/* Alternate Portals */}
        <div className="flex justify-center items-center gap-4 text-xs font-semibold text-foreground-theme/60">
          <Link href="/organization/login" className="hover:text-primary dark:hover:text-secondary transition">
            Organization Login →
          </Link>
          <span>•</span>
          <Link href="/user/login" className="hover:text-primary dark:hover:text-secondary transition">
            Customer Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
