"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, Phone, Ticket, MapPin, Calendar, Download, RefreshCw, 
  LogOut, ShieldCheck, Bus, CheckCircle2, Clock, MessageSquare, ArrowRight 
} from "lucide-react";

export default function UserDashboardPage() {
  const router = useRouter();
  const [rescheduleModal, setRescheduleModal] = useState(false);

  const customerProfile = {
    name: "Senthil Kumar",
    phone: "+91 98424 11223",
    email: "senthil@gmail.com",
    city: "Trichy, Tamil Nadu"
  };

  const activeBooking = {
    bookingId: "TSR-9081",
    route: "Trichy → Ooty (Udhagamandalam)",
    pickup: "Kattur, Trichy",
    destination: "Ooty Botanical Garden",
    date: "2026-09-28",
    time: "05:30 AM Departure",
    vehicle: "Mahindra Mini Bus (20+ Seats)",
    passengers: 16,
    status: "Confirmed",
    paymentStatus: "Paid (₹12,500)",
    driver: {
      name: "Murugan K",
      phone: "+91 98430 11992",
      vehicleNo: "TN-45-AZ-9950"
    }
  };

  const pastBookings = [
    { id: "TSR-8840", route: "Trichy → Rameswaram", date: "2026-06-12", vehicle: "Maruti Omni Van", status: "Completed", price: "₹9,500" },
    { id: "TSR-8512", route: "Trichy → Madurai", date: "2026-04-05", vehicle: "Maruti Omni Van", status: "Completed", price: "₹4,500" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("tsr_customer_token");
    localStorage.removeItem("tsr_user_role");
    router.push("/user/login");
  };

  const handleDownloadTicket = () => {
    alert(`Downloading Official PDF Booking Receipt for ${activeBooking.bookingId}...`);
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
          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-3 py-1 rounded-full border border-green-500/20">
            Customer Dashboard
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
        
        {/* Customer Profile Banner */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xxs font-bold text-primary dark:text-secondary uppercase tracking-widest">Welcome Back</span>
            <h1 className="font-display font-extrabold text-2xl text-foreground-theme">{customerProfile.name}</h1>
            <p className="text-xs text-foreground-theme/60">
              {customerProfile.phone} | {customerProfile.email} | {customerProfile.city}
            </p>
          </div>

          <Link
            href="/#booking"
            className="px-6 py-3 rounded-2xl btn-primary-gradient font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            Book New Tour <ArrowRight size={16} />
          </Link>
        </div>

        {/* Active Upcoming Trip Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-primary/10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-primary/10 pb-4">
            <div>
              <span className="text-xxs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} /> Confirmed Upcoming Trip
              </span>
              <h2 className="font-display font-extrabold text-2xl text-foreground-theme">{activeBooking.route}</h2>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm text-primary dark:text-secondary block">#{activeBooking.bookingId}</span>
              <span className="text-xxs text-green-600 font-bold">{activeBooking.paymentStatus}</span>
            </div>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/40 p-5 rounded-2xl border border-primary/5">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary dark:text-secondary mt-1 shrink-0" size={18} />
                <div>
                  <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Pickup Location & Date</span>
                  <span className="font-bold text-xs text-foreground-theme">{activeBooking.pickup}</span>
                  <span className="text-xxs text-foreground-theme/70 block mt-0.5">{activeBooking.date} ({activeBooking.time})</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bus className="text-primary dark:text-secondary mt-1 shrink-0" size={18} />
                <div>
                  <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Vehicle Reserved</span>
                  <span className="font-bold text-xs text-foreground-theme">{activeBooking.vehicle}</span>
                  <span className="text-xxs text-foreground-theme/70 block mt-0.5">{activeBooking.passengers} Passengers Traveling</span>
                </div>
              </div>
            </div>

            {/* Assigned Driver Card */}
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-primary/10 pt-3 md:pt-0 md:pl-6">
              <span className="text-xxs font-bold text-foreground-theme/50 uppercase block">Your Assigned Driver</span>
              <div className="p-3 bg-primary/5 dark:bg-secondary/5 rounded-xl space-y-1">
                <h4 className="font-display font-bold text-sm text-foreground-theme">{activeBooking.driver.name}</h4>
                <p className="text-xxs text-foreground-theme/60">Vehicle Reg: {activeBooking.driver.vehicleNo}</p>
                <a
                  href={`tel:${activeBooking.driver.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white rounded-lg text-xxs font-bold mt-2"
                >
                  <Phone size={12} /> Call Driver ({activeBooking.driver.phone})
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 pt-2 justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={handleDownloadTicket}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Download size={14} /> Download PDF Ticket
              </button>
              <a
                href="https://wa.me/919791465995?text=Hello%20Ravitharan%2C%20I%20have%20a%20question%20regarding%20my%20booking%20TSR-9081."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <MessageSquare size={14} /> Owner WhatsApp
              </a>
            </div>

            <button
              onClick={() => setRescheduleModal(true)}
              className="px-4 py-2.5 border border-primary/20 text-foreground-theme hover:bg-black/5 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw size={14} /> Reschedule / Change Dates
            </button>
          </div>
        </div>

        {/* Reschedule Modal */}
        {rescheduleModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="glass-card p-6 rounded-3xl max-w-md w-full space-y-4 border border-primary/20">
              <h3 className="font-display font-bold text-lg text-foreground-theme">Reschedule Booking #{activeBooking.bookingId}</h3>
              <p className="text-xs text-foreground-theme/70 leading-relaxed">
                TSR TRAVEL offers free date rescheduling up to 24 hours prior to trip departure! Contact Owner Ravitharan directly on WhatsApp or call +91 97914 65995 to update your travel dates.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setRescheduleModal(false)}
                  className="px-4 py-2 text-xs font-semibold border rounded-xl"
                >
                  Close
                </button>
                <a
                  href="https://wa.me/919791465995?text=Hello%20Ravitharan%2C%20I%20would%20like%20to%20reschedule%20booking%20TSR-9081."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold bg-green-500 text-white rounded-xl"
                >
                  Contact Ravitharan
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Past Booking History */}
        <div className="glass-card p-6 rounded-3xl border border-primary/10 space-y-4">
          <h3 className="font-display font-bold text-lg text-foreground-theme">Past Booking History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-primary/10 dark:bg-secondary/10 uppercase font-bold text-xxs">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">Travel Date</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {pastBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3 font-mono font-bold text-primary dark:text-secondary">{b.id}</td>
                    <td className="p-3 font-semibold">{b.route}</td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">{b.vehicle}</td>
                    <td className="p-3 font-bold">{b.price}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-gray-500/10 text-gray-600 rounded text-xxs font-bold">{b.status}</span></td>
                    <td className="p-3">
                      <button onClick={handleDownloadTicket} className="text-primary dark:text-secondary hover:underline font-bold flex items-center gap-1">
                        <Download size={12} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
