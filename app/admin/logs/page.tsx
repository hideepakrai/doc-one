"use client";

import { CalendarCheck, HeartPulse, Users, AlertCircle, Clock3 } from "lucide-react";

const logs = [
  { icon: CalendarCheck, title: "Appointment booked", time: "2 min ago", tone: "text-emerald-600 bg-emerald-50" },
  { icon: Users, title: "Doctor added", time: "14 min ago", tone: "text-blue-600 bg-blue-50" },
  { icon: HeartPulse, title: "Specialization updated", time: "38 min ago", tone: "text-violet-600 bg-violet-50" },
  { icon: AlertCircle, title: "Availability changed", time: "1 hour ago", tone: "text-amber-600 bg-amber-50" },
];

export default function AdminLogsPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">System Activity Logs</h2>
          <p className="text-sm text-slate-500">Audit trail of the latest hospital system actions.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          <Clock3 className="h-4 w-4" /> Live
        </div>
      </div>

      <div className="max-h-[520px] space-y-4 overflow-y-auto pr-1">
        {logs.map((log) => {
          const Icon = log.icon;
          return (
            <div key={log.title} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${log.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{log.title}</p>
                <p className="text-sm text-slate-500">{log.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
