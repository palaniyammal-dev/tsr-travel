"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Building2, Users, Bus, Calendar, IndianRupee, LogOut, CheckCircle2, 
  Search, Filter, Plus, ShieldCheck, UserCheck, Car, Settings, Phone, MapPin 
} from "lucide-react";

export default function OrganizationDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "vehicles" | "drivers" | "users">("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Stat metrics
  const stats = [
    { label: "Total Bookings", value: "248", icon: Calendar, change: "+12% this month" },
    { label: "Active Bookings", value: "14", icon: CheckCircle2, change: "On-road active" },
    { label: "Available Vehicles", value: "2", icon: Bus, change: "Mini Bus & Omni Van" },
    { label: "Total Drivers", value: "6", icon: UserCheck, change: "Verified local drivers" },
    { label: "Total Revenue", value: "₹4,85,000", icon: IndianRupee, change: "Overall collected" },
  ];

  // Bookings Mock Data
  const [bookingsList, setBookingsList] = useState([
    { id: "TSR-9081", customer: "Senthil Kumar", phone: "+91 98424 11223", route: "Trichy → Ooty", date: "2026-09-28", vehicle: "Mahindra Mini Bus", passengers: 16, status: "Confirmed", amount: "₹12,500" },
    { id: "TSR-9082", customer: "Anitha Rajan", phone: "+91 97890 33445", route: "Trichy → Kodaikanal", date: "2026-09-29", vehicle: "Maruti Omni Van", passengers: 6, status: "Active", amount: "₹11,000" },
    { id: "TSR-9083", customer: "Ramanathan M", phone: "+91 99400 55667", route: "Trichy → Rameswaram", date: "2026-10-01", vehicle: "Mahindra Mini Bus", passengers: 18, status: "Completed", amount: "₹9,500" },
    { id: "TSR-9084", customer: "Priya Dharshini", phone: "+91 94431 77889", route: "Trichy → Madurai", date: "2026-10-02", vehicle: "Maruti Omni Van", passengers: 5, status: "Pending", amount: "₹4,500" }
  ]);

  // Vehicles Mock Data
  const vehiclesList = [
    { name: "Mahindra Mini Bus", seats: "20+ Seats", type: "Heavy Commercial Luxury Bus", status: "Available", rate: "₹8,000/day", image: "/images/vehicles/mini_bus.jpeg" },
    { name: "Maruti Omni Van", seats: "7-8 Seats", type: "Compact Family & Airport Van", status: "In Trip", rate: "₹3,500/day", image: "/images/vehicles/omni.jpeg" }
  ];

  // Drivers Mock Data
  const driversList = [
    { id: "DRV-101", name: "Murugan K", phone: "+91 98430 11992", vehicleAssigned: "Mahindra Mini Bus", experience: "12 Years", status: "On-Duty" },
    { id: "DRV-102", name: "Karthik R", phone: "+91 97891 44552", vehicleAssigned: "Maruti Omni Van", experience: "8 Years", status: "On-Duty" },
    { id: "DRV-103", name: "Srinivasan T", phone: "+91 94422 88331", vehicleAssigned: "Standby Fleet", experience: "15 Years", status: "Off-Duty" }
  ];

  // Users Mock Data
  const usersList = [
    { name: "Ravitharan (Owner)", email: "tsr@gmail.com", role: "Super Admin", location: "Kattur, Trichy", status: "Active" },
    { name: "Staff Operations", email: "staff@tsrtravels.in", role: "Staff Manager", location: "Trichy HQ", status: "Active" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("tsr_org_token");
    localStorage.removeItem("tsr_user_role");
    router.push("/organization/login");
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#08120d] pb-20">
      
      {/* Top Navbar Header */}
      <header className="glass-nav border-b border-primary/10 sticky top-0 z-30 px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="font-display font-extrabold text-2xl tracking-wider text-primary dark:text-secondary">
              TSR<span className="text-secondary dark:text-accent font-semibold ml-1">TRAVEL</span>
            </span>
          </Link>
          <span className="text-xs bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary font-bold px-3 py-1 rounded-full border border-primary/20">
            Organization Command Center
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <span className="font-bold text-xs block text-foreground-theme">Ravitharan (Owner)</span>
            <span className="text-xxs text-foreground-theme/60">Kattur, Trichy | +91 97914 65995</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white dark:text-red-400 text-xs font-bold transition cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl border border-primary/10 space-y-2">
              <div className="flex justify-between items-center text-primary dark:text-secondary">
                <s.icon size={20} />
                <span className="text-xxs font-semibold bg-primary/5 px-2 py-0.5 rounded text-foreground-theme/70">{s.change}</span>
              </div>
              <div>
                <span className="text-xxs font-bold text-foreground-theme/50 block uppercase tracking-wider">{s.label}</span>
                <span className="font-display font-extrabold text-2xl text-foreground-theme">{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-3">
          {[
            { id: "overview", label: "Dashboard Overview" },
            { id: "bookings", label: "Manage Bookings" },
            { id: "vehicles", label: "Manage Vehicles" },
            { id: "drivers", label: "Manage Drivers" },
            { id: "users", label: "Manage Users" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-white dark:bg-secondary dark:text-black shadow-md"
                  : "glass-card text-foreground-theme/70 hover:text-primary dark:hover:text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & RECENT BOOKINGS */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h2 className="font-display font-bold text-xl text-foreground-theme">Recent Reservations</h2>
              <button onClick={() => setActiveTab("bookings")} className="text-xs font-bold text-primary dark:text-secondary hover:underline">
                View All Bookings →
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-primary/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-primary/10 dark:bg-secondary/10 text-foreground-theme uppercase font-bold tracking-wider text-xxs">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Route</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 text-foreground-theme/80">
                    {bookingsList.map((b) => (
                      <tr key={b.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                        <td className="p-4 font-mono font-bold text-primary dark:text-secondary">{b.id}</td>
                        <td className="p-4">
                          <strong className="block text-foreground-theme">{b.customer}</strong>
                          <span className="text-xxs text-foreground-theme/60">{b.phone}</span>
                        </td>
                        <td className="p-4 font-semibold">{b.route}</td>
                        <td className="p-4">{b.vehicle}</td>
                        <td className="p-4">{b.date}</td>
                        <td className="p-4 font-bold">{b.amount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xxs font-bold ${
                            b.status === "Confirmed" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                            b.status === "Active" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                            b.status === "Completed" ? "bg-gray-500/10 text-gray-600 dark:text-gray-400" :
                            "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-display font-bold text-xl text-foreground-theme">Manage All Bookings</h2>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 text-foreground-theme/40" size={16} />
                <input
                  type="text"
                  placeholder="Search customer or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-primary/10 bg-background/50 outline-none"
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-primary/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-primary/10 dark:bg-secondary/10 uppercase font-bold text-xxs">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Route</th>
                      <th className="p-4">Passengers</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {bookingsList
                      .filter(b => b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((b) => (
                        <tr key={b.id}>
                          <td className="p-4 font-mono font-bold text-primary dark:text-secondary">{b.id}</td>
                          <td className="p-4">
                            <strong>{b.customer}</strong>
                            <span className="block text-xxs text-foreground-theme/60">{b.phone}</span>
                          </td>
                          <td className="p-4 font-semibold">{b.route}</td>
                          <td className="p-4">{b.passengers} Passengers</td>
                          <td className="p-4">{b.vehicle}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-xxs font-bold bg-green-500/10 text-green-600">
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <a
                              href={`https://wa.me/919791465995?text=Hello%20${encodeURIComponent(b.customer)}%2C%20regarding%20your%20TSR%20Travels%20booking%20${b.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xxs font-bold inline-block"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE VEHICLES */}
        {activeTab === "vehicles" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground-theme">Manage Vehicles (Strict Fleet)</h2>
                <p className="text-xs text-foreground-theme/60">Strict 2-vehicle rule configured for TSR TRAVEL</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehiclesList.map((v, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden p-5 flex gap-5 items-center border border-primary/10">
                  <img src={v.image} alt={v.name} className="w-32 h-24 object-cover rounded-xl shrink-0" />
                  <div className="space-y-1.5 flex-grow">
                    <span className="text-xxs font-bold text-primary dark:text-secondary uppercase">{v.seats}</span>
                    <h3 className="font-display font-bold text-base text-foreground-theme">{v.name}</h3>
                    <p className="text-xxs text-foreground-theme/60">{v.type}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-xs text-primary dark:text-secondary">{v.rate}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xxs font-bold bg-green-500/10 text-green-600">{v.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE DRIVERS */}
        {activeTab === "drivers" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-xl text-foreground-theme">Manage Drivers</h2>
              <Link href="/driver/login" className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90">
                Driver Portal Login →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {driversList.map((d) => (
                <div key={d.id} className="glass-card p-5 rounded-2xl border border-primary/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xxs font-mono font-bold text-primary dark:text-secondary">{d.id}</span>
                      <h4 className="font-display font-bold text-base text-foreground-theme">{d.name}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xxs font-bold ${d.status === "On-Duty" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-500"}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="text-xs text-foreground-theme/70 space-y-1">
                    <p><strong>Phone:</strong> {d.phone}</p>
                    <p><strong>Assigned:</strong> {d.vehicleAssigned}</p>
                    <p><strong>Experience:</strong> {d.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MANAGE USERS */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-xl text-foreground-theme">Organization Users & Admins</h2>

            <div className="glass-card rounded-2xl overflow-hidden border border-primary/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-primary/10 dark:bg-secondary/10 uppercase font-bold text-xxs">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {usersList.map((u, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold">{u.name}</td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4 font-semibold text-primary dark:text-secondary">{u.role}</td>
                      <td className="p-4">{u.location}</td>
                      <td className="p-4"><span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-xxs font-bold">{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
