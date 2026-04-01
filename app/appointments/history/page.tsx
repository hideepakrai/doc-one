"use client";

import { useState } from "react";
import { Search, Calendar, Clock, User, ClipboardList, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function AppointmentHistory() {
  const [searchName, setSearchName] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      // In a real app, we'd probably search by phone or email. 
      // For this demo, we search by name via a special public endpoint or filtering the admin one if allowed.
      // Since our admin endpoint is protected, we'll create a public history endpoint.
      const res = await fetch(`/api/appointments/public-history?name=${encodeURIComponent(searchName)}`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      toast.error("Could not find any appointments.");
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-blue-500/10 text-blue-600 ring-blue-600/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-600 ring-emerald-600/20";
      case "Cancelled": return "bg-red-500/10 text-red-600 ring-red-600/20";
      default: return "bg-amber-500/10 text-amber-600 ring-amber-600/20"; // Pending
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Appointment History</h1>
          <p className="text-muted-foreground text-lg">Check medications, status, and upcoming visits.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-12 group">
          <input 
            type="text" 
            placeholder="Enter your full name to find appointments..." 
            className="w-full h-16 pl-14 pr-32 rounded-2xl border-2 border-border bg-card shadow-lg outline-none focus:border-primary/50 transition-all text-lg font-medium"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <button 
            type="submit" 
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
          </button>
        </form>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-card rounded-2xl border border-border animate-pulse" />
            ))
          ) : appointments.length > 0 ? (
            <AnimatePresence>
              {appointments.map((appt, idx) => (
                <motion.div 
                  key={appt._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${getStatusStyle(appt.status)}`}>
                        {appt.status}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                        <User className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">{appt.doctorId?.name}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{appt.doctorId?.specialization?.name || "Specialist"}</p>
                    </div>
                    <div className="md:ml-auto space-y-2 text-right">
                        <div className="flex items-center justify-end gap-2 text-sm font-semibold">
                            <Calendar className="w-4 h-4 text-primary" />
                            {appt.date}
                        </div>
                        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground font-medium">
                            <Clock className="w-4 h-4" />
                            {appt.time}
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : hasSearched && (
            <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium italic mb-2">No appointments found for "{searchName}"</p>
                <p className="text-xs text-muted-foreground/60">Make sure you entered the name exactly as used during booking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
