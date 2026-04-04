"use client";

import { LucideIcon } from "lucide-react";

type Item = {
  title: string;
  time: string;
  icon: LucideIcon;
  tone?: "teal" | "blue" | "emerald" | "amber" | "rose" | "violet";
};

const toneMap = {
  teal: "bg-teal-50 text-teal-600",
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
};

export default function ActivityFeed({ items }: { items: Item[] }) {
  return (
    <aside className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Live Activity</h3>
          <p className="text-sm text-slate-500">Recent clinical actions</p>
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
      </div>

      <div className="max-h-[360px] space-y-4 overflow-y-auto pr-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={`${item.title}-${index}`} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneMap[item.tone || "teal"]}`}>
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
