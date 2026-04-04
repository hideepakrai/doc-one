"use client";

import { useEffect, useState } from "react";
import { Users, FileClock, UserRoundSearch } from "lucide-react";
import LoadingOverlay from "@/components/admin/ui/LoadingOverlay";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();
        setPatients(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = patients.filter((p) => `${p.name} ${p.doctor}`.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <LoadingOverlay />;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Patient Management</h2>
            <p className="mt-1 text-sm text-slate-500">Name, phone, email, history, and assigned doctor in one place.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            <Users className="h-4 w-4" /> Live Registry
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <UserRoundSearch className="h-4 w-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or assigned doctor..." className="w-full bg-transparent outline-none" />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Assigned Doctor</th>
              <th className="px-6 py-4">Appointments</th>
              <th className="px-6 py-4">Last Visit</th>
              <th className="px-6 py-4">History</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-24 text-center text-slate-500">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                    <FileClock className="h-8 w-8 text-slate-300" />
                  </div>
                  No patients added yet.
                </td>
              </tr>
            ) : (
              paginated.map((p) => (
                <tr key={p.name} className="hover:bg-slate-50/80">
                  <td className="px-6 py-5 font-semibold text-slate-900">{p.name}</td>
                  <td className="px-6 py-5 text-slate-600">{p.doctor || "Unassigned"}</td>
                  <td className="px-6 py-5">{p.totalAppointments}</td>
                  <td className="px-6 py-5 text-slate-600">{p.lastAppointment}</td>
                  <td className="px-6 py-5 text-slate-600">{Array.isArray(p.history) ? p.history.join(", ") : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Page {page} of {Math.max(1, Math.ceil(filtered.length / pageSize))}</p>
        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold">Previous</button>
          <button onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(filtered.length / pageSize)), p + 1))} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold">Next</button>
        </div>
      </div>
    </div>
  );
}
