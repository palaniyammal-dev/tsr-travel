"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ShieldAlert, LogIn, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";

type LoginFormData = {
  username: string; // forms OAuth2 uses username for email
  password:  string;
};

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Format as x-www-form-urlencoded as required by FastAPI OAuth2
    const params = new URLSearchParams();
    params.append("username", data.username);
    params.append("password", data.password);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      
      const responseData = response.data;
      
      // Save details to localStorage
      localStorage.setItem("admin_token", responseData.access_token);
      localStorage.setItem("admin_role", responseData.role);
      localStorage.setItem("admin_name", responseData.full_name || "Admin");
      
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Connection to auth server failed. Please ensure backend is running.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-screen-bg min-h-screen flex items-center justify-center bg-cream dark:bg-[#08120d] px-4 py-12 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="font-display font-extrabold text-3xl tracking-wider text-primary dark:text-secondary flex items-center">
            TSR<span className="text-foreground-theme font-semibold ml-1">TRAVEL</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary font-semibold text-xxs tracking-wider uppercase mt-4">
            <ShieldAlert size={12} /> Secure Admin Panel
          </span>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <h2 className="font-display font-bold text-xl text-foreground-theme text-center mb-6">
            Administrator Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1.5">
                <Mail size={12} className="text-primary dark:text-secondary" /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@tsrtravel.com"
                  {...register("username", { required: "Email is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                />
              </div>
              {errors.username && (
                <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                  <AlertCircle size={10} /> {errors.username.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1.5">
                <Lock size={12} className="text-primary dark:text-secondary" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 pr-10 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-theme/50 hover:text-foreground-theme transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                  <AlertCircle size={10} /> {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl btn-primary-gradient font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={14} />
                  Login to Dashboard
                </>
              )}
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-2.5 text-xs animate-fade-in">
                <AlertCircle className="shrink-0 mt-0.5" size={14} />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-3 text-xs font-bold text-primary dark:text-secondary">
            <a href="/organization/login" className="hover:underline">Organization Login</a>
            <span>•</span>
            <a href="/driver/login" className="hover:underline">Driver Login</a>
            <span>•</span>
            <a href="/user/login" className="hover:underline">Customer Login</a>
          </div>
          <a
            href="/"
            className="text-xs text-foreground-theme/60 hover:text-primary dark:hover:text-secondary transition font-medium block pt-1"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
