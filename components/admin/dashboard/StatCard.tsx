"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  icon: LucideIcon;
  accent?: "teal" | "blue" | "emerald" | "violet" | "amber" | "rose";
};

const accentMap = {
  teal: "from-teal-500/15 to-cyan-500/10 text-teal-600 border-teal-100",
  blue: "from-blue-500/15 to-sky-500/10 text-blue-600 border-blue-100",
  emerald: "from-emerald-500/15 to-green-500/10 text-emerald-600 border-emerald-100",
  violet: "from-violet-500/15 to-fuchsia-500/10 text-violet-600 border-violet-100",
  amber: "from-amber-500/15 to-orange-500/10 text-amber-600 border-amber-100",
  rose: "from-rose-500/15 to-pink-500/10 text-rose-600 border-rose-100",
};

export default function StatCard({ title, value, subtext, trend, icon: Icon, accent = "teal" }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/70" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">{title}</p>
          <div className="mt-3 flex items-end gap-2">
            <h3 className="text-4xl font-semibold tracking-tight text-slate-900">{value}</h3>
            {subtext ? <span className="pb-1 text-xs font-bold text-slate-400">{subtext}</span> : null}
          </div>
        </div>
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br", accentMap[accent])}>
          <Icon className="h-7 w-7" strokeWidth={2.4} />
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700">
          {trend || "Stable"}
        </span>
        <span className="text-[11px] font-semibold text-slate-400">vs last week</span>
      </div>
    </motion.div>
  );
}
