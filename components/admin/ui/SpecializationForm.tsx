"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, HeartPulse, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecializationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading?: boolean;
}

export default function SpecializationForm({
    isOpen, onClose, onSubmit, initialData, isLoading = false
}: SpecializationFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "HeartPulse"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description || "",
                icon: initialData.icon || "HeartPulse",
                features: initialData.features ? initialData.features.join(", ") : ""
            });
        } else {
            setFormData({ name: "", description: "", icon: "HeartPulse", features: "" });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            features: formData.features.split(",").map(f => f.trim()).filter(f => f !== "")
        };
        await onSubmit(dataToSubmit);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-lg bg-card rounded-[3rem] shadow-2xl overflow-hidden border border-border/50"
                    >
                        <div className="p-10 border-b border-border/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-primary-dark tracking-tight">
                                    {initialData ? "Edit Department" : "New Department"}
                                </h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">Clinical Specialization</p>
                            </div>
                            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-muted/60 hover:bg-muted rounded-full transition-all">
                                <X className="w-6 h-6 text-primary-dark" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[60vh]">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Department Name</label>
                                <input 
                                    required value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                    placeholder="e.g. Cardiology"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Clinical Description</label>
                                <textarea 
                                    required rows={3} value={formData.description} 
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full p-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground resize-none"
                                    placeholder="Brief overview of clinical services..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Key Features (Comma Separated)</label>
                                <input 
                                    value={formData.features} 
                                    onChange={e => setFormData({...formData, features: e.target.value})}
                                    className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                    placeholder="e.g. ECG, Echo, Stress Test"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Icon Reference (Lucide)</label>
                                <input 
                                    required value={formData.icon} 
                                    onChange={e => setFormData({...formData, icon: e.target.value})}
                                    className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                    placeholder="e.g. Brain, HeartPulse, Activity"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={onClose} className="h-16 px-8 border border-border rounded-2xl font-bold hover:bg-muted transition-all">Cancel</button>
                                <button 
                                    type="submit" disabled={isLoading}
                                    className="h-16 flex-1 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (initialData ? "Update Department" : "Create Department")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
