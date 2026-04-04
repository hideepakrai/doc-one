"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Search,
  MoveRight,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import LoadingOverlay from "@/components/admin/ui/LoadingOverlay";
import { cn } from "@/lib/utils";

type Appointment = {
  _id: string;
  patientName: string;
  doctorId?: { _id?: string; name?: string; specialization?: any };
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

const SLOT_LIST = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getWeekDates(anchor: string) {
  const base = new Date(anchor);
  const day = base.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(base);
  monday.setDate(base.getDate() + mondayOffset);
  return Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    return toISODate(d);
  });
}

function getMonthGrid(anchor: string) {
  const base = new Date(anchor);
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }).map((_, idx) => {
    const d = new Date(start);
    d.setDate(start.getDate() + idx);
    return toISODate(d);
  });
}

function statusClass(status: Appointment["status"]) {
  if (status === "Completed") return "bg-emerald-50 text-emerald-700";
  if (status === "Confirmed") return "bg-blue-50 text-blue-700";
  if (status === "Cancelled") return "bg-rose-50 text-rose-700";
  return "bg-amber-50 text-amber-700";
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()));
  const [selectedSlot, setSelectedSlot] = useState<string>("09:00 AM");
  const [page, setPage] = useState(1);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const pageSize = 8;

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/appointments?limit=400", { cache: "no-store" });
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.appointments || []);
      setAppointments(list);
    } catch {
      toast.error("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedDate, search, statusFilter, viewMode]);

  const updateAppointment = async (id: string, payload: Partial<Pick<Appointment, "date" | "time" | "status">>) => {
    const previous = appointments;
    setAppointments((curr) =>
      curr.map((appt) => (appt._id === id ? { ...appt, ...payload } : appt))
    );
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setAppointments((curr) => curr.map((appt) => (appt._id === id ? updated : appt)));
      toast.success("Appointment updated");
    } catch (error: any) {
      setAppointments(previous);
      toast.error(error?.message || "Appointment update failed");
    }
  };

  const handleDrop = async (day: string, time: string) => {
    const id = draggingId;
    setDraggingId(null);
    if (!id) return;
    await updateAppointment(id, { date: day, time });
  };

  const weekDays = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
  const monthDays = useMemo(() => getMonthGrid(selectedDate), [selectedDate]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const searchValue = `${a.patientName} ${a.doctorId?.name || ""}`.toLowerCase();
      return (
        (statusFilter === "All" || a.status === statusFilter) &&
        searchValue.includes(search.toLowerCase())
      );
    });
  }, [appointments, statusFilter, search]);

  const selectedAppointments = useMemo(() => {
    return filteredAppointments.filter((a) => a.date === selectedDate);
  }, [filteredAppointments, selectedDate]);

  const paginated = selectedAppointments.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(selectedAppointments.length / pageSize));

  const slotAppointments = useMemo(
    () => filteredAppointments.filter((a) => a.date === selectedDate && a.time === selectedSlot),
    [filteredAppointments, selectedDate, selectedSlot]
  );

  if (isLoading && appointments.length === 0) return <LoadingOverlay />;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-serif font-medium tracking-tight text-primary-dark">
              Appointment Control Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Weekly and monthly scheduling with live slot control, drag and drop rescheduling, and hospital-grade validation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em]",
                  statusFilter === s ? "bg-primary text-white shadow-md" : "bg-slate-100 text-slate-500"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Selected Day", value: selectedDate, icon: CalendarCheck },
          { label: "Appointments", value: selectedAppointments.length, icon: Clock3 },
          { label: "Active Slots", value: SLOT_LIST.length, icon: CalendarRange },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{card.value}</h3>
                </div>
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("week")}
            className={cn("rounded-2xl px-4 py-2 text-sm font-bold", viewMode === "week" ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}
          >
            Week View
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={cn("rounded-2xl px-4 py-2 text-sm font-bold", viewMode === "month" ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}
          >
            Month View
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient or doctor..."
              className="h-12 min-w-[280px] rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none focus:border-primary/40"
            />
          </div>
          <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-600">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Calendar</h2>
              <p className="text-sm text-slate-500">Click a date or slot to inspect appointments. Drag a card to reschedule.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const d = new Date(selectedDate);
                  d.setDate(d.getDate() - 1);
                  setSelectedDate(toISODate(d));
                }}
                className="rounded-xl border border-slate-200 p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  const d = new Date(selectedDate);
                  d.setDate(d.getDate() + 1);
                  setSelectedDate(toISODate(d));
                }}
                className="rounded-xl border border-slate-200 p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {viewMode === "week" ? (
            <div className="grid grid-cols-[90px_repeat(7,minmax(0,1fr))] gap-2 overflow-x-auto">
              <div />
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-left text-xs font-black uppercase tracking-[0.16em]",
                    selectedDate === day ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-slate-50 text-slate-400"
                  )}
                >
                  {new Date(day).toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
                </button>
              ))}

              {SLOT_LIST.map((slot) => (
                <Fragment key={slot}>
                  <div className="flex min-h-20 items-center justify-end pr-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                    {slot}
                  </div>
                  {weekDays.map((day) => {
                    const dayAppointments = filteredAppointments.filter((a) => a.date === day && a.time === slot);
                    const isSelected = selectedDate === day && selectedSlot === slot;
                    return (
                      <button
                        key={`${day}-${slot}`}
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedSlot(slot);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleDrop(day, slot);
                        }}
                        className={cn(
                          "group min-h-20 rounded-2xl border border-dashed p-2 text-left transition-all hover:border-primary/40 hover:bg-primary/5",
                          isSelected ? "border-primary bg-primary/5" : "border-slate-200 bg-white"
                        )}
                      >
                        {dayAppointments.length === 0 ? (
                          <span className="text-[11px] text-slate-300">Drop here</span>
                        ) : (
                          <div className="space-y-2">
                            {dayAppointments.slice(0, 2).map((appt) => (
                              <div
                                key={appt._id}
                                draggable
                                onDragStart={() => setDraggingId(appt._id)}
                                title={`${appt.patientName} · ${appt.time}`}
                                className={cn(
                                  "rounded-xl border border-white/70 px-2 py-2 shadow-sm transition-transform group-hover:-translate-y-0.5",
                                  statusClass(appt.status)
                                )}
                              >
                                <div className="flex items-start gap-2">
                                  <GripVertical className="mt-0.5 h-3.5 w-3.5 opacity-50" />
                                  <div className="min-w-0">
                                    <p className="truncate text-[11px] font-black">{appt.patientName}</p>
                                    <p className="text-[10px] font-semibold opacity-80">{appt.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-3">
              {monthDays.map((day) => {
                const dayAppointments = filteredAppointments.filter((a) => a.date === day);
                const inMonth = new Date(day).getMonth() === new Date(selectedDate).getMonth();
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "min-h-28 rounded-2xl border p-3 text-left transition-all hover:shadow-md",
                      selectedDate === day ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50",
                      !inMonth && "opacity-40"
                    )}
                  >
                    <div className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{new Date(day).getDate()}</div>
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 2).map((appt) => (
                        <div key={appt._id} className="rounded-xl bg-primary/10 px-2 py-1 text-[11px] font-bold text-primary">
                          {appt.time} • {appt.patientName}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Appointments on {selectedDate}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Click an appointment, change status, or drag it into another slot.
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Selected Slot</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{selectedDate}</p>
                <p className="text-sm text-slate-500">{selectedSlot}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                {slotAppointments.length} appointment{slotAppointments.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {paginated.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
                No appointments found.
              </div>
            ) : (
              paginated.map((appt) => (
                <div key={appt._id} className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{appt.patientName}</p>
                      <p className="text-sm text-slate-500">Dr. {appt.doctorId?.name || "Unassigned"}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full px-3 py-1 text-xs font-bold", statusClass(appt.status))}>
                          {appt.status}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                          {appt.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 opacity-100 transition-all">
                      <button
                        onClick={() => updateAppointment(appt._id, { status: "Confirmed" })}
                        className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateAppointment(appt._id, { status: "Completed" })}
                        className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateAppointment(appt._id, { status: "Cancelled" })}
                        className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700"
                      >
                        Cancel
                      </button>
                    </div>
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
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            <MoveRight className="mb-2 h-5 w-5 text-primary" />
            Drag any appointment card onto another time slot to reschedule. The backend validates doctor availability, double booking, breaks, and blocked slots.
          </div>
        </section>
      </div>
    </div>
  );
}
