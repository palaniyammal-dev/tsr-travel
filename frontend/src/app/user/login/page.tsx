"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Phone, Lock, ArrowRight, ShieldCheck, Ticket } from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+91 98424 11223");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (phone && password) {
        localStorage.setItem("tsr_customer_token", "demo_customer_token_9791465995");
        localStorage.setItem("tsr_user_role", "customer");
        router.push("/user/dashboard");
      } else {
        setError("Please enter valid credentials.");
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
            <Ticket size={14} /> Customer Portal
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground-theme">
            Customer / Traveler Login
          </h1>
          <p className="text-xs text-foreground-theme/60">
            View active bookings, download PDF tickets & track your driver
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
                Mobile Number / Email
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 text-foreground-theme/40" size={18} />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98424 11223"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/10 dark:border-secondary/10 bg-background/50 text-foreground-theme text-xs outline-none focus:border-primary dark:focus:border-secondary transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground-theme/80 block mb-2">
                Password / OTP
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
                <span>Accessing Portal...</span>
              ) : (
                <>
                  View My Bookings <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10 space-y-1.5 text-xxs text-foreground-theme/75">
            <span className="font-bold block text-primary dark:text-secondary text-xs flex items-center gap-1">
              <ShieldCheck size={14} /> Demo Customer Account:
            </span>
            <p><strong>Customer:</strong> Senthil Kumar</p>
            <p><strong>Active Trip:</strong> Trichy → Ooty (Mahindra Mini Bus)</p>
            <p><strong>Phone:</strong> +91 98424 11223</p>
          </div>
        </div>

        {/* Alternate Portals */}
        <div className="flex justify-center items-center gap-4 text-xs font-semibold text-foreground-theme/60">
          <Link href="/organization/login" className="hover:text-primary dark:hover:text-secondary transition">
            Organization Login →
          </Link>
          <span>•</span>
          <Link href="/driver/login" className="hover:text-primary dark:hover:text-secondary transition">
            Driver Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
