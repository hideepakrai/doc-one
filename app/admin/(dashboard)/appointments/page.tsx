"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, CheckCircle, XCircle, Calendar, Filter, ChevronLeft, ChevronRight, Clock, User, UserRound } from "lucide-react";
import { toast } from "sonner";
import TableSkeleton from "@/components/ui/TableSkeleton";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination State
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        date: selectedDate,
        status: selectedStatus === "All" ? "" : selectedStatus,
      });
      
      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      setAppointments(data.appointments);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedDate, selectedStatus]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Appointment marked as ${status}`);
      fetchAppointments();
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Deleted successfully!");
      fetchAppointments();
    } catch (error) {
      toast.error("Error deleting appointment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-blue-500/10 text-blue-600 ring-blue-600/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-600 ring-emerald-600/20";
      case "Cancelled": return "bg-red-500/10 text-red-600 ring-red-600/20";
      default: return "bg-amber-500/10 text-amber-600 ring-amber-600/20"; // Pending
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground mt-1 underline decoration-primary/30 underline-offset-4">Manage patient visits and schedule flow.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="date" 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            className="px-4 py-2 border border-border rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton columns={5} rows={10} />
      ) : (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Patient</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Doctor</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Schedule</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.map((appt: any) => (
                    <tr key={appt._id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <UserRound className="w-4 h-4" />
                            </div>
                            <span className="font-bold">{appt.patientName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-muted-foreground hover:text-foreground transition-colors">
                                {appt.doctorId?.name || "Unknown"}
                            </span>
                          </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                {appt.date}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                {appt.time}
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${getStatusColor(appt.status)}`}>
                            {appt.status}
                            </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {appt.status === "Pending" && (
                            <button 
                                onClick={() => updateStatus(appt._id, "Confirmed")} 
                                title="Confirm" 
                                className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {(appt.status === "Pending" || appt.status === "Confirmed") && (
                            <button 
                                onClick={() => updateStatus(appt._id, "Completed")} 
                                title="Complete" 
                                className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                            >
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </button>
                          )}
                          {(appt.status === "Pending" || appt.status === "Confirmed") && (
                            <button 
                                onClick={() => updateStatus(appt._id, "Cancelled")} 
                                title="Cancel" 
                                className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(appt._id)} 
                            title="Delete" 
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <p className="text-muted-foreground font-medium italic">No appointments found matching your criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-muted-foreground italic">
              Page <span className="font-bold text-foreground">{page}</span> of {totalPages}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 border border-border rounded-xl disabled:opacity-30 hover:bg-muted transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                 disabled={page === totalPages || totalPages === 0}
                 onClick={() => setPage(p => p + 1)}
                 className="p-2 border border-border rounded-xl disabled:opacity-30 hover:bg-muted transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
