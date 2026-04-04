"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Clock3, UserRound, CheckCircle2, XCircle, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import LoadingOverlay from "@/components/admin/ui/LoadingOverlay";

export default function DoctorDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const load = async () => {
    try {
      const res = await fetch("/api/doctor/dashboard");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load dashboard");
      setData(json);
    } catch (error: any) {
      toast.error(error.message || "Unable to load doctor dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/doctor/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Marked ${status}`);
      load();
    } catch {
      toast.error("Could not update appointment");
    }
  };

  const toggleAvailability = async (status: string) => {
    try {
      const res = await fetch("/api/doctor/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availabilityStatus: status }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Availability set to ${status}`);
      load();
    } catch {
      toast.error("Could not update availability");
    }
  };

  const appointments = useMemo(() => [...(data?.todayAppointments || []), ...(data?.upcomingAppointments || [])], [data]);
  const totalPages = Math.max(1, Math.ceil(appointments.length / pageSize));
  const paginatedAppointments = appointments.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <LoadingOverlay />;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Doctor Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Your appointments, patients, and availability at a glance.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Available", "Busy", "On Leave"].map((status) => (
              <button
                key={status}
                onClick={() => toggleAvailability(status)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Today", value: data?.todayAppointments?.length || 0, icon: CalendarCheck },
          { label: "Upcoming", value: data?.upcomingAppointments?.length || 0, icon: Clock3 },
          { label: "Patients", value: data?.patients?.length || 0, icon: UserRound },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</h3>
                </div>
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Appointments</h2>
          <div className="mt-4 space-y-3">
            {paginatedAppointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
                No appointments found.
              </div>
            ) : (
              paginatedAppointments.map((appt: any) => (
                <div key={appt._id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{appt.patientName}</p>
                    <p className="text-sm text-slate-500">
                      {appt.date} • {appt.time}
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        appt.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : appt.status === "Confirmed"
                            ? "bg-blue-50 text-blue-700"
                            : appt.status === "Cancelled"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => updateStatus(appt._id, "Confirmed")} className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">Confirm</button>
                    <button onClick={() => updateStatus(appt._id, "Completed")} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">Complete</button>
                    <button onClick={() => updateStatus(appt._id, "Cancelled")} className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700">Cancel</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40">Prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40">Next</button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Patients</h2>
          <div className="mt-4 space-y-3">
            {(data?.patients || []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
                No patient history yet.
              </div>
            ) : (
              data.patients.map((patient: any) => (
                <div key={patient.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{patient.name}</p>
                  <p className="text-sm text-slate-500">Last visit: {patient.lastVisit}</p>
                  <p className="text-sm text-slate-500">Status: {patient.status}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            <Stethoscope className="mb-2 h-5 w-5 text-primary" />
            Only appointments linked to the logged-in doctor are shown here.
          </div>
        </section>
      </div>
    </div>
  );
}
