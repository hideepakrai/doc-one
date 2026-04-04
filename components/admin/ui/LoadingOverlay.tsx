"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card p-12 rounded-[3.5rem] shadow-2xl border border-border/50 flex flex-col items-center gap-6"
            >
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" strokeWidth={2.5} />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full" />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-serif font-bold text-primary-dark mb-1 tracking-tight">Syncing Clinical Data</h3>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40 animate-pulse">Please wait...</p>
                </div>
            </motion.div>
        </div>
    );
}
