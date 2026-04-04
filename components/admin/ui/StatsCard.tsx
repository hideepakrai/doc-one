"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subValue?: string;
    trend?: string;
    icon: LucideIcon;
    color: "blue" | "emerald" | "amber" | "violet" | "rose";
}

const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function StatsCard({ title, value, subValue, trend, icon: Icon, color }: StatsCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-card border border-border/50 rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden group"
        >
            <div className={cn("inline-flex w-16 h-16 rounded-[1.25rem] items-center justify-center mb-8 border transition-colors group-hover:scale-110", colorMap[color])}>
                <Icon className="w-8 h-8" strokeWidth={2.5} />
            </div>
            
            <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-serif font-bold text-primary-dark tracking-tighter">{value}</h3>
                    {subValue && <span className="text-xs font-bold text-muted-foreground/40">{subValue}</span>}
                </div>
            </div>

            {trend && (
                <div className="mt-6 flex items-center gap-1.5">
                    <span className="text-[10px] font-black py-1 px-3 bg-emerald-50 text-emerald-600 rounded-full">{trend}</span>
                </div>
            )}
            
            {/* Background Accent */}
            <div className={cn("absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity", 
              color === 'blue' ? 'bg-blue-500' : 
              color === 'emerald' ? 'bg-emerald-500' : 
              color === 'amber' ? 'bg-amber-500' : 
              color === 'violet' ? 'bg-violet-500' : 'bg-rose-500'
            )} />
        </motion.div>
    );
}
