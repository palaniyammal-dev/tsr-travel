"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, Calendar, Compass, Image as ImageIcon, MessageSquare, 
  Mail, LogOut, Search, Filter, Download, Printer, CheckCircle, 
  XCircle, Clock, Trash2, Edit2, ShieldCheck, Car, HelpCircle, RefreshCw, PlusCircle
} from "lucide-react";
import axios from "axios";

type Booking = {
  id: number;
  booking_id: string;
  customer_name: string;
  phone_number: string;
  pickup_location: string;
  destination: string;
  trip_date: string;
  vehicle_name: string;
  passengers: number;
  trip_type: string;
  special_notes?: string;
  status: string;
  created_at: string;
};

type Vehicle = {
  id: number;
  name: string;
  capacity: string;
  features: string;
  image_url: string;
  is_available: boolean;
};

type TourPackage = {
  id: number;
  destination: string;
  duration: string;
  distance: string;
  price: number;
  image_url: string;
  is_active: boolean;
};

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
};

type ContactQuery = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);

  // Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactQuery[]>([]);

  // Filter & Search States
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState("all");

  // Form inputs for creating package/gallery/vehicle (Local simple popups)
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [newPackagePrice, setNewPackagePrice] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setAdminName(localStorage.getItem("admin_name") || "Admin");
    fetchData();
  }, [router]);

  const getHeaders = () => {
    const token = localStorage.getItem("admin_token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    setIsUsingMock(false);
    try {
      // 1. Fetch Bookings
      const bookingsRes = await axios.get("http://localhost:8000/api/bookings/", getHeaders());
      setBookings(bookingsRes.data);

      // 2. Fetch Vehicles
      const vehiclesRes = await axios.get("http://localhost:8000/api/vehicles/", getHeaders());
      setVehicles(vehiclesRes.data);

      // 3. Fetch Packages
      const packagesRes = await axios.get("http://localhost:8000/api/packages/?active_only=false", getHeaders());
      setPackages(packagesRes.data);

      // 4. Fetch Testimonials
      const testimonialsRes = await axios.get("http://localhost:8000/api/testimonials/?approved_only=false", getHeaders());
      setTestimonials(testimonialsRes.data);

      // 5. Fetch Contact messages
      const contactsRes = await axios.get("http://localhost:8000/api/contacts/", getHeaders());
      setContacts(contactsRes.data);

    } catch (error) {
      console.warn("Backend connection failed. Loading mock dashboard data for preview.", error);
      setIsUsingMock(true);
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadMockData = () => {
    // Premium Mock Data Fallback
    setBookings([
      { id: 1, booking_id: "TSR-984310", customer_name: "Karthik Raja", phone_number: "9876543210", pickup_location: "Kattur, Trichy", destination: "Ooty", trip_date: "2026-08-15T00:00:00", vehicle_name: "Mahindra Mini Bus", passengers: 22, trip_type: "Family Trip", special_notes: "Requesting frequent restroom stops for elders", status: "confirmed", created_at: "2026-08-04T12:00:00" },
      { id: 2, booking_id: "TSR-220419", customer_name: "Anjali Devi", phone_number: "9944883311", pickup_location: "Srirangam, Trichy", destination: "Velankanni", trip_date: "2026-08-10T00:00:00", vehicle_name: "Maruti Omni Van", passengers: 7, trip_type: "Temple Tour", special_notes: "Airport pickup at Trichy airport before heading to Velankanni", status: "pending", created_at: "2026-08-05T09:30:00" },
      { id: 3, booking_id: "TSR-104928", customer_name: "Manoj Kumar", phone_number: "9786012345", pickup_location: "Kallanai, Trichy", destination: "Madurai", trip_date: "2026-08-08T00:00:00", vehicle_name: "Maruti Omni Van", passengers: 6, trip_type: "One Day Trip", status: "completed", created_at: "2026-08-01T08:00:00" }
    ]);
    setVehicles([
      { id: 1, name: "Mahindra Mini Bus", capacity: "20+ seats", features: "AC, GPS, Sound system", image_url: "/images/vehicles/mini_bus.jpeg", is_available: true },
      { id: 2, name: "Maruti Omni Van", capacity: "7-8 seats", features: "Comfortable, Roof Carrier", image_url: "/images/vehicles/omni.jpeg", is_available: true }
    ]);
    setPackages([
      { id: 1, destination: "Ooty", duration: "3 Days / 2 Nights", distance: "260 km", price: 12500, image_url: "/images/packages/ooty.jpg", is_active: true },
      { id: 2, destination: "Kodaikanal", duration: "3 Days / 2 Nights", distance: "200 km", price: 11000, image_url: "/images/packages/ooty.jpg", is_active: true },
      { id: 3, destination: "Velankanni", duration: "1 Day Trip", distance: "150 km", price: 5000, image_url: "/images/packages/temple.jpg", is_active: true }
    ]);
    setTestimonials([
      { id: 1, name: "Senthil Kumar", rating: 5, comment: "Excellent Mini Bus trip organized around Tanjore.", is_approved: true },
      { id: 2, name: "Priya D.", rating: 5, comment: "Punctual airport pickup drop in Omni.", is_approved: true }
    ]);
    setContacts([
      { id: 1, name: "Rajesh S.", email: "rajesh@gmail.com", phone: "9845012938", message: "Inquiry about corporate package for 40 people to Yercaud", is_read: false, created_at: "2026-08-04T18:00:00" }
    ]);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  // Status Handlers
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    if (isUsingMock) {
      setBookings(prev => prev.map(b => b.booking_id === bookingId ? { ...b, status: newStatus } : b));
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/bookings/${bookingId}`, { status: newStatus }, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    if (isUsingMock) {
      setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  const handleToggleVehicleAvailability = async (id: number, currentStatus: boolean) => {
    if (isUsingMock) {
      setVehicles(prev => prev.map(v => v.id === id ? { ...v, is_available: !currentStatus } : v));
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/vehicles/${id}`, { is_available: !currentStatus }, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to toggle fleet status.");
    }
  };

  const handleUpdatePackagePrice = async (id: number) => {
    if (isUsingMock) {
      setPackages(prev => prev.map(p => p.id === id ? { ...p, price: newPackagePrice } : p));
      setEditingPackage(null);
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/packages/${id}`, { price: newPackagePrice }, getHeaders());
      setEditingPackage(null);
      fetchData();
    } catch (err) {
      alert("Failed to update price.");
    }
  };

  const handleTogglePackageStatus = async (id: number, currentStatus: boolean) => {
    if (isUsingMock) {
      setPackages(prev => prev.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/packages/${id}`, { is_active: !currentStatus }, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to toggle package.");
    }
  };

  const handleApproveTestimonial = async (id: number, currentStatus: boolean) => {
    if (isUsingMock) {
      setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_approved: !currentStatus } : t));
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/testimonials/${id}`, { is_approved: !currentStatus }, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to toggle testimonial approval.");
    }
  };

  const handleMarkContactAsRead = async (id: number) => {
    if (isUsingMock) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, is_read: true } : c));
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/contacts/${id}`, { is_read: true }, getHeaders());
      fetchData();
    } catch (err) {
      alert("Failed to update message status.");
    }
  };

  // EXPORTS
  const exportExcelCSV = () => {
    // Generate simple CSV download
    const headers = ["Booking ID", "Name", "Phone", "Pickup", "Destination", "Date", "Vehicle", "Passengers", "Trip Type", "Notes", "Status"];
    const rows = filteredBookings.map(b => [
      b.booking_id,
      b.customer_name,
      b.phone_number,
      b.pickup_location,
      b.destination,
      new Date(b.trip_date).toLocaleDateString(),
      b.vehicle_name,
      b.passengers,
      b.trip_type,
      b.special_notes || "",
      b.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tsr_bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPrintPDF = () => {
    window.print();
  };

  // Filters
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customer_name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phone_number.includes(bookingSearch) ||
      b.booking_id.toLowerCase().includes(bookingSearch.toLowerCase());
      
    const matchesStatus = bookingFilter === "all" || b.status === bookingFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const completedCount = bookings.filter(b => b.status === "completed").length;
  const estimatedRevenue = bookings
    .filter(b => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => {
      // rough revenue calculation based on vehicle and destinations
      const baseFee = b.vehicle_name === "Mahindra Mini Bus" ? 8000 : 3500;
      return sum + baseFee;
    }, 0);

  return (
    <div className="min-h-screen bg-cream dark:bg-[#08120d] text-foreground-theme pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary dark:text-secondary flex items-center gap-2">
              <LayoutDashboard /> Command Panel
            </h1>
            <p className="text-xs text-foreground-theme/60 mt-1">
              Admin: <strong className="text-foreground-theme">{adminName}</strong> · Location: Kattur, Trichy
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {isUsingMock && (
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xxs font-bold rounded-full flex items-center gap-1">
                <RefreshCw size={10} className="animate-spin" /> Demo Mode fallback
              </span>
            )}
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl border border-primary/20 hover:bg-black/5 dark:hover:bg-white/5 text-foreground-theme transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wider rounded-xl transition cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-primary/10 dark:border-secondary/10 gap-2 mb-8">
          {[
            { id: "bookings", label: "Manage Bookings", icon: <Calendar size={16} /> },
            { id: "fleet", label: "Fleet availability", icon: <Car size={16} /> },
            { id: "packages", label: "Manage Packages", icon: <Compass size={16} /> },
            { id: "reviews", label: "Testimonials Review", icon: <MessageSquare size={16} /> },
            { id: "messages", label: "Contact Messages", icon: <Mail size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-display font-semibold text-sm border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? "border-primary text-primary dark:border-secondary dark:text-secondary"
                  : "border-transparent text-foreground-theme/60 hover:text-foreground-theme"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN BODY CONTENTS */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin dark:border-secondary dark:border-t-transparent" />
            <p className="text-xs text-foreground-theme/75">Fetching administrative records...</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { label: "Total Queries", val: totalBookingsCount, bg: "bg-primary/5 border-primary/20" },
                    { label: "Pending", val: pendingCount, bg: "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400" },
                    { label: "Confirmed", val: confirmedCount, bg: "bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400" },
                    { label: "Completed", val: completedCount, bg: "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400" },
                    { label: "Est. Booked Revenue", val: `₹${estimatedRevenue.toLocaleString("en-IN")}`, bg: "bg-purple-500/5 border-purple-500/20 text-purple-600 dark:text-purple-400" }
                  ].map((stat, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${stat.bg} flex flex-col justify-between`}>
                      <span className="text-xxs font-bold uppercase tracking-wider opacity-70">{stat.label}</span>
                      <span className="font-display font-extrabold text-2xl mt-2 block">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* Filter and Export Toolbar */}
                <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-3 flex-grow max-w-xl">
                    {/* Search */}
                    <div className="relative flex-grow">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-theme/40" size={16} />
                      <input
                        type="text"
                        placeholder="Search by ID, name, or phone..."
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-primary/10 bg-background/50 outline-none focus:border-primary"
                      />
                    </div>
                    {/* Status filter */}
                    <div className="relative shrink-0">
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="px-4 py-2 text-xs rounded-xl border border-primary/10 bg-background/50 outline-none focus:border-primary pr-8"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportExcelCSV}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-secondary dark:bg-secondary/10 dark:hover:bg-secondary/20 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                    <button
                      onClick={exportPrintPDF}
                      className="flex items-center gap-1.5 px-4 py-2 border border-primary/20 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      <Printer size={14} /> Print Report
                    </button>
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="glass-card rounded-3xl overflow-hidden border border-primary/10 shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-primary/5 dark:bg-secondary/5 text-xxs font-bold uppercase tracking-wider text-foreground-theme/80 border-b border-primary/10">
                          <th className="p-4">Booking ID</th>
                          <th className="p-4">Customer Details</th>
                          <th className="p-4">Trip Details</th>
                          <th className="p-4">Vehicle & Count</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/5 text-xs">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-foreground-theme/50">
                              No bookings found matching filters.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5 transition">
                              {/* Booking ID */}
                              <td className="p-4 font-mono font-bold text-primary dark:text-secondary">
                                {b.booking_id}
                                <span className="block text-xxs text-foreground-theme/40 font-sans font-normal mt-0.5">
                                  {new Date(b.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              
                              {/* Customer Details */}
                              <td className="p-4">
                                <span className="font-bold block text-sm">{b.customer_name}</span>
                                <a href={`tel:${b.phone_number}`} className="text-xxs text-foreground-theme/70 hover:underline block mt-0.5">
                                  {b.phone_number}
                                </a>
                              </td>

                              {/* Trip Details */}
                              <td className="p-4">
                                <span className="font-medium text-xxs bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary px-2 py-0.5 rounded">
                                  {b.trip_type}
                                </span>
                                <p className="mt-1 font-semibold text-xxs">
                                  {b.pickup_location} → {b.destination}
                                </p>
                                <span className="text-xxs text-foreground-theme/60 block mt-0.5">
                                  Date: {new Date(b.trip_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                </span>
                                {b.special_notes && (
                                  <p className="mt-1.5 p-2 bg-black/5 dark:bg-white/5 rounded text-xxs italic max-w-xs text-foreground-theme/80">
                                    Notes: {b.special_notes}
                                  </p>
                                )}
                              </td>

                              {/* Vehicle */}
                              <td className="p-4">
                                <span className="font-semibold block">{b.vehicle_name}</span>
                                <span className="text-xxs text-foreground-theme/50 block mt-0.5">
                                  {b.passengers} passengers
                                </span>
                              </td>

                              {/* Status select dropdown */}
                              <td className="p-4">
                                <select
                                  value={b.status}
                                  onChange={(e) => handleUpdateBookingStatus(b.booking_id, e.target.value)}
                                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold outline-none border transition ${
                                    b.status === "confirmed" ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" :
                                    b.status === "completed" ? "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400" :
                                    b.status === "cancelled" ? "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400" :
                                    "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* Delete button */}
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleDeleteBooking(b.booking_id)}
                                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                                  title="Delete Booking"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* FLEET MANAGEMENT TAB */}
            {activeTab === "fleet" && (
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Fleet Status</h3>
                  <p className="text-xs text-foreground-theme/60">Toggle booking availability status for Mahindra Mini Bus and Maruti Omni Van.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                  {vehicles.map(v => (
                    <div key={v.id} className="glass-card rounded-2xl overflow-hidden p-5 flex gap-4 items-center">
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={v.image_url} alt={v.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow space-y-2">
                        <div>
                          <h4 className="font-display font-bold text-lg">{v.name}</h4>
                          <p className="text-xxs text-foreground-theme/50">{v.capacity}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleVehicleAvailability(v.id, v.is_available)}
                            className={`px-4 py-1.5 rounded-full text-xxs font-bold cursor-pointer transition ${
                              v.is_available
                                ? "bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
                                : "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {v.is_available ? "● Available" : "○ Offline"}
                          </button>
                          <span className="text-xxs text-foreground-theme/60">
                            Click to toggle status
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TOUR PACKAGES MANAGEMENT TAB */}
            {activeTab === "packages" && (
              <div className="space-y-6">
                <div className="text-left flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Tour Packages Prices</h3>
                    <p className="text-xs text-foreground-theme/60">Manage starting prices and active toggle states for your packages.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map(p => (
                    <div key={p.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold text-base">Trichy → {p.destination}</h4>
                          <span className="text-xxs text-foreground-theme/50">{p.duration} · {p.distance}</span>
                        </div>
                        <span className={`text-xxs px-2 py-0.5 rounded font-semibold ${
                          p.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        }`}>
                          {p.is_active ? "Active" : "Disabled"}
                        </span>
                      </div>

                      {/* Pricing block */}
                      <div className="flex items-center justify-between pt-3 border-t border-primary/5">
                        {editingPackage?.id === p.id ? (
                          <div className="flex items-center gap-2 flex-grow">
                            <input
                              type="number"
                              value={newPackagePrice}
                              onChange={(e) => setNewPackagePrice(Number(e.target.value))}
                              className="w-24 px-2.5 py-1.5 text-xs rounded border border-primary outline-none"
                            />
                            <button
                              onClick={() => handleUpdatePackagePrice(p.id)}
                              className="px-3 py-1.5 bg-primary text-white dark:bg-secondary dark:text-black text-xxs font-bold rounded cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingPackage(null)}
                              className="px-2 py-1.5 text-xxs hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="text-xxs text-foreground-theme/50 block">Price</span>
                              <span className="font-display font-extrabold text-base text-primary dark:text-secondary">
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingPackage(p);
                                  setNewPackagePrice(p.price);
                                }}
                                className="p-2 text-foreground-theme hover:bg-primary/5 rounded-lg border border-primary/10 transition cursor-pointer"
                                title="Edit Price"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                onClick={() => handleTogglePackageStatus(p.id, p.is_active)}
                                className={`px-2.5 py-1.5 rounded text-xxs font-semibold cursor-pointer ${
                                  p.is_active ? "bg-red-500/10 text-red-600 hover:bg-red-500/20" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                                }`}
                              >
                                {p.is_active ? "Disable" : "Enable"}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Approve Testimonials</h3>
                  <p className="text-xs text-foreground-theme/60">Approve or hide testimonials displayed in the reviews carousel.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map(t => (
                    <div key={t.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-bold text-sm">{t.name}</h4>
                          <span className={`text-xxs px-2 py-0.5 rounded font-semibold ${
                            t.is_approved ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {t.is_approved ? "Visible on site" : "Hidden"}
                          </span>
                        </div>
                        <p className="text-xs italic text-foreground-theme/80">"{t.comment}"</p>
                      </div>
                      <div className="flex justify-end pt-2 border-t border-primary/5">
                        <button
                          onClick={() => handleApproveTestimonial(t.id, t.is_approved)}
                          className={`px-3 py-1.5 text-xxs font-bold rounded-lg cursor-pointer transition ${
                            t.is_approved
                              ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                              : "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          }`}
                        >
                          {t.is_approved ? "Hide Review" : "Approve & Show"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT MESSAGES TAB */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Customer Inquiries</h3>
                  <p className="text-xs text-foreground-theme/60">Review general questions submitted by customers on the Contact page.</p>
                </div>

                <div className="space-y-4 max-w-4xl">
                  {contacts.length === 0 ? (
                    <div className="glass-card rounded-2xl p-6 text-center text-foreground-theme/50">
                      No messages found.
                    </div>
                  ) : (
                    contacts.map(c => (
                      <div key={c.id} className={`glass-card rounded-2xl p-5 border-l-4 transition ${
                        c.is_read ? "border-primary/20" : "border-primary dark:border-secondary shadow-md"
                      }`}>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <div>
                            <h4 className="font-display font-bold text-base flex items-center gap-2">
                              {c.name}
                              {!c.is_read && (
                                <span className="px-2 py-0.5 bg-primary text-white dark:bg-secondary dark:text-black font-bold text-xxs rounded-full">
                                  New
                                </span>
                              )}
                            </h4>
                            <span className="text-xxs text-foreground-theme/60 block mt-0.5">
                              Phone: <strong className="text-foreground-theme">{c.phone}</strong> {c.email ? `· Email: ${c.email}` : ""}
                            </span>
                          </div>
                          <span className="text-xxs text-foreground-theme/40 font-mono">
                            {new Date(c.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-theme/90 leading-relaxed bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                          {c.message}
                        </p>
                        {!c.is_read && (
                          <div className="flex justify-end mt-3">
                            <button
                              onClick={() => handleMarkContactAsRead(c.id)}
                              className="px-3 py-1.5 bg-primary text-white dark:bg-secondary dark:text-black text-xxs font-bold rounded-lg cursor-pointer"
                            >
                              Mark as Read
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
