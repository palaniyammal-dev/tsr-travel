"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function OrganizationLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("tsr@gmail.com");
  const [password, setPassword] = useState("tsrtraveladmin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("tsr_org_token", "demo_org_token_9791465995");
        localStorage.setItem("tsr_user_role", "organization");
        router.push("/organization/dashboard");
      } else {
        setError("Please enter your organization email/username and password.");
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider">
            <Building2 size={14} /> Organization Portal
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground-theme">
            Organization Login
          </h1>
          <p className="text-xs text-foreground-theme/60">
            Enterprise Fleet & Admin Management Command Center
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
                Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-foreground-theme/40" size={18} />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tsr@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/10 dark:border-secondary/10 bg-background/50 text-foreground-theme text-xs outline-none focus:border-primary dark:focus:border-secondary transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground-theme/80 block mb-2">
                Password
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-foreground-theme/70">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-primary/20 text-primary focus:ring-primary"
                />
                Remember Me
              </label>
              <a href="tel:+919791465995" className="text-primary dark:text-secondary font-semibold hover:underline">
                Contact Support
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl btn-primary-gradient font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  Login to Dashboard <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10 space-y-1.5 text-xxs text-foreground-theme/75">
            <span className="font-bold block text-primary dark:text-secondary text-xs flex items-center gap-1">
              <ShieldCheck size={14} /> Owner Credentials (Pre-filled):
            </span>
            <p><strong>Owner:</strong> Ravitharan | Kattur, Trichy</p>
            <p><strong>Email:</strong> tsr@gmail.com</p>
            <p><strong>Phone:</strong> +91 97914 65995</p>
          </div>
        </div>

        {/* Alternate Portals */}
        <div className="flex justify-center items-center gap-4 text-xs font-semibold text-foreground-theme/60">
          <Link href="/driver/login" className="hover:text-primary dark:hover:text-secondary transition">
            Driver Login →
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
