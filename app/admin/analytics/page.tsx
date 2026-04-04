"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Loader2, TrendingUp, Sparkles, Activity } from "lucide-react";

const COLORS = ["#0f766e", "#14b8a6", "#0ea5e9", "#f59e0b", "#ef4444"];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const heatmap = data.trends.map((item: any, index: number) => ({ day: item.date.slice(5), intensity: item.count * (index + 1) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Appointments Trend</h3>
              <p className="text-sm text-slate-500">7-day rolling view</p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#0f766e" fill="#0f766e22" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Department Distribution</h3>
              <p className="text-sm text-slate-500">Doctor count by specialty</p>
            </div>
            <Sparkles className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.distribution} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105}>
                  {data.distribution.map((_: any, index: number) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Peak Hours Heatmap</h3>
              <p className="text-sm text-slate-500">Appointments density by day</p>
            </div>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          <div className="grid grid-cols-7 gap-3">
            {heatmap.map((item: any) => (
              <div key={item.day} className="rounded-2xl border border-slate-200 p-4 text-center">
                <div className="mx-auto mb-3 h-16 w-16 rounded-2xl" style={{ backgroundColor: `rgba(15, 118, 110, ${Math.min(0.12 + item.intensity / 100, 0.9)})` }} />
                <p className="text-sm font-semibold text-slate-800">{item.day}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Doctor Performance Ranking</h3>
          <div className="space-y-4">
            {data.recentAppointments.slice(0, 5).map((item: any, index: number) => (
              <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Dr. {item.doctor}</p>
                    <p className="text-sm text-slate-500">{item.patient}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
