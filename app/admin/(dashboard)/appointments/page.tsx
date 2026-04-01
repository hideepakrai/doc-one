"use client";

import { useState, useEffect } from "react";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "Booked" | "Completed" | "Cancelled") => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Appointments</h1>
        <p className="text-muted-foreground mt-1">View and manage patient appointments.</p>
      </div>

      {isLoading ? (
        <div className="animate-pulse flex gap-4"><div className="w-full h-12 bg-muted rounded"></div></div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Patient</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Doctor</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Date & Time</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.map((appt: any) => (
                <tr key={appt._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{appt.patientName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{appt.doctorId?.name || "Unknown Doctor"}</td>
                  <td className="px-6 py-4 text-sm">
                    {appt.date} <span className="text-muted-foreground">at</span> {appt.time}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appt.status === "Completed" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : 
                      appt.status === "Cancelled" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    {appt.status === "Booked" && (
                      <>
                        <button onClick={() => updateStatus(appt._id, "Completed")} title="Mark Completed" className="text-emerald-500 hover:text-emerald-700 transition">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateStatus(appt._id, "Cancelled")} title="Cancel" className="text-amber-500 hover:text-amber-700 transition">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDelete(appt._id)} title="Delete" className="text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
