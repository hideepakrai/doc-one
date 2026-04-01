"use client";

import { useEffect, useState } from "react";
import { Users, HeartPulse, CalendarCheck } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ doctors: 0, specializations: 0, appointments: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [docsRes, specRes, apptRes] = await Promise.all([
          fetch("/api/doctors"),
          fetch("/api/specializations"),
          fetch("/api/appointments"),
        ]);
        
        const docs = await docsRes.json();
        const specs = await specRes.json();
        const appts = await apptRes.json();
        
        setStats({
          doctors: docs.length || 0,
          specializations: specs.length || 0,
          appointments: appts.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Specializations</p>
            <h3 className="text-3xl font-bold mt-1">{stats.specializations}</h3>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Doctors</p>
            <h3 className="text-3xl font-bold mt-1">{stats.doctors}</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <CalendarCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
            <h3 className="text-3xl font-bold mt-1">{stats.appointments}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
