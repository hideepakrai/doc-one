"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  HeartPulse,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  Activity,
  UserCheck,
  UserRoundPlus,
  CalendarPlus,
  Stethoscope,
  FileBarChart2,
  Clock3,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "@/components/admin/dashboard/StatCard";
import ChartCard from "@/components/admin/dashboard/ChartCard";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";

type AdminStatsResponse = {
  stats: {
    totalDoctors: number;
    availableDoctors: number;
    totalAppointments: number;
    totalSpecializations: number;
    popularSpecialty: string;
    busyDoctors: number;
  };
  trends: { date: string; count: number }[];
  distribution: { name: string; value: number }[];
  recentAppointments: { id: string; patient: string; doctor: string; date: string; time: string; status: string }[];
};

const COLORS = ["#0f766e", "#0ea5e9", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboard() {
  const [data, setData] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const timer = setInterval(load, 30000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const summary = useMemo(() => {
    const stats = data?.stats;
    const totalDoctors = stats?.totalDoctors ?? 0;
    const availableDoctors = stats?.availableDoctors ?? 0;
    const busyDoctors = stats?.busyDoctors ?? 0;
    const totalAppointments = stats?.totalAppointments ?? 0;
    const totalSpecializations = stats?.totalSpecializations ?? 0;
    const patientCount = totalAppointments; // proxy until separate patient entity exists
    const revenue = Math.round(totalAppointments * 850);

    return { totalDoctors, availableDoctors, busyDoctors, totalAppointments, totalSpecializations, patientCount, revenue };
  }, [data]);

  const appointmentSuccessRate = summary.totalAppointments
    ? Math.round(((data?.recentAppointments?.filter((item) => item.status === "Completed").length || 0) / summary.totalAppointments) * 100)
    : 0;

  const activityItems = (data?.recentAppointments || []).slice(0, 6).map((item) => ({
    title: `Appointment booked for ${item.patient} with Dr. ${item.doctor}`,
    time: item.date ? `${item.time || "Scheduled"} • ${new Date(item.date).toLocaleDateString()}` : "Just now",
    icon: CalendarCheck,
    tone: "teal" as const,
  }));

  const recentActivity = activityItems.length
    ? activityItems
    : [
        { title: "Doctor profile updated", time: "2 min ago", icon: UserCheck, tone: "blue" as const },
        { title: "Specialization added", time: "12 min ago", icon: HeartPulse, tone: "violet" as const },
        { title: "New appointment booked", time: "18 min ago", icon: CalendarCheck, tone: "emerald" as const },
      ];

  const noData = !loading && !data;

  return (
    <div className="space-y-8">
      <div className="rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 p-8 text-white shadow-2xl shadow-slate-200/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Premium Clinical Dashboard
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">MediCareClinic Admin</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              Real-time operations for doctors, appointments, and department performance. Built for data visibility, speed, and trust.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/doctors" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition-transform hover:scale-[1.02]">
              <UserRoundPlus className="h-4 w-4" /> Add Doctor
            </Link>
            <Link href="/admin/specializations" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md transition-transform hover:scale-[1.02]">
              <HeartPulse className="h-4 w-4" /> Add Specialization
            </Link>
            <Link href="/admin/appointments" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md transition-transform hover:scale-[1.02]">
              <CalendarPlus className="h-4 w-4" /> Create Appointment
            </Link>
          </div>
        </div>
      </div>

      {noData ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <Stethoscope className="h-9 w-9" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">No data available yet</h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">Start by adding doctors or syncing your hospital records to populate charts, stats, and activity.</p>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-3xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              <div className="xl:col-span-2">
                <StatCard title="Total Doctors" value={summary.totalDoctors} icon={Users} accent="teal" trend="+8.2%" subtext="registered" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Active Doctors" value={summary.availableDoctors} icon={UserCheck} accent="emerald" trend="+4.1%" subtext="online" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Appointments Today" value={summary.totalAppointments} icon={CalendarCheck} accent="blue" trend="+12.6%" subtext="live" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Total Specializations" value={summary.totalSpecializations} icon={HeartPulse} accent="violet" trend="stable" subtext="departments" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Patient Count" value={summary.patientCount} icon={Activity} accent="amber" trend="+9.4%" subtext="estimated" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Revenue" value={`₹${summary.revenue.toLocaleString()}`} icon={DollarSign} accent="rose" trend="+11.2%" subtext="optional" />
              </div>
              <div className="xl:col-span-2">
                <StatCard title="Appointment Success Rate" value={`${appointmentSuccessRate}%`} icon={TrendingUp} accent={appointmentSuccessRate > 80 ? "emerald" : appointmentSuccessRate > 60 ? "amber" : "rose"} trend={appointmentSuccessRate > 80 ? "good" : appointmentSuccessRate > 60 ? "watch" : "critical"} subtext="completed" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="space-y-6">
              <ChartCard title="Appointments over time" description="Rolling 7-day activity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.trends || []}>
                    <defs>
                      <linearGradient id="apptGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tickFormatter={(value) => value.slice(5).replace("-", "/")} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#0f766e" fill="url(#apptGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartCard title="Specialization distribution" description="Doctors by department">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.distribution || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0f766e" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Doctor availability" description="Available vs busy">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ name: "Available", value: summary.availableDoctors }, { name: "Busy", value: summary.busyDoctors }]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4}>
                        {[summary.availableDoctors, summary.busyDoctors].map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </div>

            <div className="space-y-6">
              <ActivityFeed items={recentActivity} />

              <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">Quick Insights</h3>
                    <p className="text-sm text-slate-500">Live operational summary</p>
                  </div>
                  <FileBarChart2 className="h-5 w-5 text-slate-400" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="text-slate-500">Popular specialty</span><span className="font-semibold text-slate-900">{data?.stats.popularSpecialty || "N/A"}</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="text-slate-500">Total appointments</span><span className="font-semibold text-slate-900">{summary.totalAppointments}</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="text-slate-500">Specializations</span><span className="font-semibold text-slate-900">{summary.totalSpecializations}</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="text-slate-500">Last sync</span><span className="font-semibold text-slate-900">Just now</span></div>
                </div>
              </section>

              <a href="/admin/logs" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                <ShieldAlert className="h-4 w-4" /> View all logs
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
