"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "sonner";
import {
  LayoutDashboard,
  Users,
  HeartPulse,
  CalendarCheck,
  ChartSpline,
  UsersRound,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Shield,
  Bell,
  CircleUserRound,
  Clock3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routeMap: Record<string, { title: string; subtitle: string; breadcrumb: string[] }> = {
  "/admin": {
    title: "Clinical Intelligence Dashboard",
    subtitle: "Real-time insights into hospital performance and patient flow.",
    breadcrumb: ["Admin", "Dashboard"],
  },
  "/admin/doctors": {
    title: "Physician Registry Management",
    subtitle: "Manage physicians, availability, featured profiles, and onboarding.",
    breadcrumb: ["Admin", "Doctors"],
  },
  "/admin/specializations": {
    title: "Clinical Departments",
    subtitle: "Organize departments, service coverage, and specialty capacity.",
    breadcrumb: ["Admin", "Specializations"],
  },
  "/admin/appointments": {
    title: "Appointment Control Center",
    subtitle: "Control bookings, approval flow, and session status in one place.",
    breadcrumb: ["Admin", "Appointments"],
  },
  "/admin/analytics": {
    title: "Analytics Center",
    subtitle: "Understand traffic, capacity, and performance at a glance.",
    breadcrumb: ["Admin", "Analytics"],
  },
  "/admin/settings": {
    title: "Clinic Settings",
    subtitle: "Manage hospital identity, contact details, and brand assets.",
    breadcrumb: ["Admin", "Settings"],
  },
  "/admin/patients": {
    title: "Patient Management",
    subtitle: "View patient history, assigned doctors, and appointment records.",
    breadcrumb: ["Admin", "Patients"],
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const meta = useMemo(() => {
    const matched = Object.entries(routeMap).find(([route]) => pathname === route || pathname.startsWith(`${route}/`));
    return matched?.[1] || routeMap["/admin"];
  }, [pathname]);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Doctors", href: "/admin/doctors", icon: Users },
    { name: "Specializations", href: "/admin/specializations", icon: HeartPulse },
    { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
    { name: "Patients", href: "/admin/patients", icon: UsersRound },
    { name: "Analytics", href: "/admin/analytics", icon: ChartSpline },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="flex min-h-screen">
        <aside className={cn("sticky top-0 hidden h-screen flex-col border-r border-slate-200/70 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:flex", collapsed ? "w-24" : "w-80")}>
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
            <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <Shield className="h-6 w-6" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">MediCareClinic</p>
                  <p className="text-lg font-semibold tracking-tight text-slate-900">Admin ERP</p>
                </div>
              )}
            </Link>
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200",
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/15"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-5 w-5", active ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                    {!collapsed && <span className="text-sm font-semibold">{item.name}</span>}
                  </div>
                  {!collapsed && active && <ChevronRight className="h-4 w-4 text-white/70" />}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                  {meta.breadcrumb.map((part, idx) => (
                    <span key={part} className="flex items-center gap-2">
                      {idx > 0 && <ChevronRight className="h-3 w-3" />}
                      {part}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">{meta.title}</h1>
                <p className="mt-1 text-sm text-slate-500">{meta.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:flex">
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Current Time</p>
                    <p className="text-sm font-semibold text-slate-900" suppressHydrationWarning>
                      {now ? now.toLocaleString() : "Loading time..."}
                    </p>
                  </div>
                </div>
                <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
                <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm md:flex">
                  <CircleUserRound className="h-9 w-9 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Admin Profile</p>
                    <p className="text-sm font-semibold text-slate-900">Chief Admin</p>
                  </div>
                </div>
                <button
                  onClick={() => setCollapsed((v) => !v)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 lg:hidden"
                  aria-label="Toggle menu"
                >
                  <PanelLeftOpen className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1600px]">{children}</div>
          </div>
        </main>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
