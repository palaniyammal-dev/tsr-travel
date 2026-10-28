"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, AlertCircle, Calendar, User, Phone, MapPin, Users, FileText, Compass, Send, X } from "lucide-react";
import axios from "axios";

export type BookingFormData = {
  customer_name: string;
  phone_number: string;
  pickup_location: string;
  destination: string;
  trip_date: string;
  vehicle_name: string;
  passengers: number;
  trip_type: string;
  special_notes?: string;
};

interface BookingFormProps {
  initialValues?: Partial<BookingFormData>;
  onClose?: () => void;
}

export default function BookingForm({ initialValues, onClose }: BookingFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string; bookingId?: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      vehicle_name: initialValues?.vehicle_name || "Mahindra Mini Bus",
      trip_type: initialValues?.trip_type || "Family Trip",
      passengers: initialValues?.passengers || 20,
      pickup_location: initialValues?.pickup_location || "",
      destination: initialValues?.destination || "",
      special_notes: initialValues?.special_notes || "",
    }
  });

  useEffect(() => {
    if (initialValues) {
      if (initialValues.customer_name) setValue("customer_name", initialValues.customer_name);
      if (initialValues.phone_number) setValue("phone_number", initialValues.phone_number);
      if (initialValues.pickup_location) setValue("pickup_location", initialValues.pickup_location);
      if (initialValues.destination) setValue("destination", initialValues.destination);
      if (initialValues.vehicle_name) setValue("vehicle_name", initialValues.vehicle_name);
      if (initialValues.passengers) setValue("passengers", initialValues.passengers);
      if (initialValues.trip_type) setValue("trip_type", initialValues.trip_type);
      if (initialValues.trip_date) setValue("trip_date", initialValues.trip_date);
      if (initialValues.special_notes) setValue("special_notes", initialValues.special_notes);
    }
  }, [initialValues, setValue]);

  const selectedVehicle = watch("vehicle_name");

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Format message for WhatsApp
    const formattedDate = new Date(data.trip_date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const whatsappMessage = `*TSR TRAVEL - NEW TRIP INQUIRY*
----------------------------------------
*Customer Name:* ${data.customer_name}
*Phone:* ${data.phone_number}
*Vehicle Chosen:* ${data.vehicle_name}
*Trip Date:* ${formattedDate}
*Passengers:* ${data.passengers}
*Trip Type:* ${data.trip_type}
*Pickup Point:* ${data.pickup_location}
*Destination:* ${data.destination}
${data.special_notes ? `*Special Notes:* ${data.special_notes}` : ""}
----------------------------------------
_Request generated via Website Booking System._`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917904872119?text=${encodedText}`;

    try {
      // 1. Submit to FastAPI backend
      const response = await axios.post("http://localhost:8000/api/bookings/", data, {
        headers: { "Content-Type": "application/json" }
      });
      
      const responseData = response.data;
      
      setSubmitStatus({
        type: "success",
        message: "Your booking has been registered! Redirecting you to WhatsApp to confirm details...",
        bookingId: responseData.booking_id
      });
      
      // Reset form
      reset();
      
      // 2. Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 2000);
      
    } catch (error) {
      console.warn("Backend down or network error. Falling back directly to WhatsApp.", error);
      
      // Fallback: Proceed directly to WhatsApp so user booking is never lost
      setSubmitStatus({
        type: "success",
        message: "Connecting you directly to WhatsApp for booking confirmation..."
      });
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full filter blur-3xl" />

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-300 text-foreground-theme transition z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <h3 className="font-display font-bold text-2xl text-primary dark:text-secondary mb-2 text-center md:text-left">
        Quick Trip Booking
      </h3>
      <p className="text-sm text-foreground-theme/70 mb-6 text-center md:text-left">
        Fill out the details below. Upon submission, we will register your trip and connect you on WhatsApp with Owner Ravitharan.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <User size={12} className="text-primary dark:text-secondary" /> Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("customer_name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.customer_name && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.customer_name.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <Phone size={12} className="text-primary dark:text-secondary" /> Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              {...register("phone_number", { 
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\s-]{10,15}$/,
                  message: "Please enter a valid phone number"
                }
              })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Pickup and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <MapPin size={12} className="text-primary dark:text-secondary" /> Pickup Location
            </label>
            <input
              type="text"
              placeholder="e.g. Kattur, Trichy"
              {...register("pickup_location", { required: "Pickup point is required" })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.pickup_location && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.pickup_location.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <MapPin size={12} className="text-primary dark:text-secondary" /> Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Ooty / Madurai / Airport"
              {...register("destination", { required: "Destination is required" })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.destination && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.destination.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Trip Date & Trip Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <Calendar size={12} className="text-primary dark:text-secondary" /> Trip Date
            </label>
            <input
              type="date"
              {...register("trip_date", { required: "Date is required" })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.trip_date && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.trip_date.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <Compass size={12} className="text-primary dark:text-secondary" /> Trip Type
            </label>
            <select
              {...register("trip_type", { required: "Trip Type is required" })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            >
              <option value="Family Trip">Family Trip</option>
              <option value="Friends Trip">Friends Trip</option>
              <option value="Couple Trip">Couple Trip</option>
              <option value="Temple Tour">Temple Tour & Pilgrimage</option>
              <option value="Corporate Tour">Corporate Tour</option>
              <option value="Wedding Transport">Wedding Transportation</option>
              <option value="Airport Pickup/Drop">Airport Pickup & Drop</option>
              <option value="Railway Pickup">Railway Station Pickup</option>
              <option value="School/College Tour">School & College Tour</option>
              <option value="One Day Trip">One Day Trip</option>
              <option value="Customized Package">Customized Tour Package</option>
            </select>
          </div>
        </div>

        {/* Row 4: Vehicle and Passenger Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80">
              Select Vehicle (APPROVED ONLY)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${
                  selectedVehicle === "Mahindra Mini Bus"
                    ? "border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/5 font-semibold text-primary dark:text-secondary"
                    : "border-primary/20 hover:bg-black/5 dark:hover:bg-white/5 text-foreground-theme/70"
                }`}
                onClick={() => {
                  setValue("vehicle_name", "Mahindra Mini Bus");
                  setValue("passengers", 20);
                }}
              >
                <span className="text-sm">Mini Bus</span>
                <span className="text-xxs opacity-70">20+ seats</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${
                  selectedVehicle === "Maruti Omni Van"
                    ? "border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/5 font-semibold text-primary dark:text-secondary"
                    : "border-primary/20 hover:bg-black/5 dark:hover:bg-white/5 text-foreground-theme/70"
                }`}
                onClick={() => {
                  setValue("vehicle_name", "Maruti Omni Van");
                  setValue("passengers", 8);
                }}
              >
                <span className="text-sm">Omni Van</span>
                <span className="text-xxs opacity-70">7–8 seats</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
              <Users size={12} className="text-primary dark:text-secondary" /> Number of Passengers
            </label>
            <input
              type="number"
              min={1}
              max={selectedVehicle === "Mahindra Mini Bus" ? 30 : 8}
              placeholder={selectedVehicle === "Mahindra Mini Bus" ? "20" : "8"}
              {...register("passengers", { 
                required: "Required", 
                valueAsNumber: true,
                min: { value: 1, message: "Minimum 1 passenger" }
              })}
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            {errors.passengers && (
              <span className="text-red-500 text-xxs flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={10} /> {errors.passengers.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 5: Notes */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground-theme/80 flex items-center gap-1">
            <FileText size={12} className="text-primary dark:text-secondary" /> Special Notes / Requests
          </label>
          <textarea
            rows={3}
            placeholder="Add any specific route requests, stops, pickup details, or custom packages info here..."
            {...register("special_notes")}
            className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground-theme focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl btn-primary-gradient font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Booking...
            </>
          ) : (
            <>
              <Send size={16} />
              Book Now & Confirm via WhatsApp
            </>
          )}
        </button>

        {/* Status display */}
        {submitStatus && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 mt-4 text-sm animate-fade-in ${
              submitStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400"
            }`}
          >
            {submitStatus.type === "success" ? <CheckCircle2 className="shrink-0 mt-0.5" size={18} /> : <AlertCircle className="shrink-0 mt-0.5" size={18} />}
            <div>
              <p className="font-semibold">
                {submitStatus.type === "success" ? "Success!" : "Notice"}
              </p>
              <p className="text-xs opacity-90">{submitStatus.message}</p>
              {submitStatus.bookingId && (
                <p className="text-xxs font-mono mt-1 opacity-75">
                  Booking ID: {submitStatus.bookingId}
                </p>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
