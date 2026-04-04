"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageUpload from "./ImageUpload";

interface DoctorFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    specializations: any[];
    isLoading?: boolean;
}

export default function DoctorForm({
    isOpen, onClose, onSubmit, initialData, specializations, isLoading = false
}: DoctorFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        experience: "",
        rating: 5.0,
        reviews: 0,
        location: "Delhi, India",
        availabilityStatus: "Available",
        nextAvailable: "Today, 5:00 PM",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
        isFeatured: false,
        workingDays: "Mon-Sat",
        timeSlots: "09:00 AM - 05:00 PM",
        breakTime: "01:00 PM - 02:00 PM",
        blockedSlots: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                specialization: initialData.specializationId || initialData.specialization || ""
            });
        } else {
            setFormData({
                name: "",
                specialization: "",
                experience: "",
                rating: 5.0,
                reviews: 0,
                location: "Delhi, India",
                availabilityStatus: "Available",
                nextAvailable: "Today, 5:00 PM",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
                isFeatured: false,
                workingDays: "Mon-Sat",
                timeSlots: "09:00 AM - 05:00 PM",
                breakTime: "01:00 PM - 02:00 PM",
                blockedSlots: ""
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageChange = (url: string) => {
        setFormData(prev => ({ ...prev, image: url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
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
                        className={cn("relative w-full bg-card rounded-[3rem] shadow-2xl overflow-hidden border border-border/50 transition-all", 
                            "max-w-4xl max-h-[90vh] flex flex-col"
                        )}
                    >
                        <div className="p-10 border-b border-border/50 sticky top-0 bg-card z-10 flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-serif font-bold text-primary-dark tracking-tight">
                                    {initialData ? "Refine Specialist Profile" : "Onboard New Specialist"}
                                </h3>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">MediCare Multi-Speciality Clinic Registry</p>
                            </div>
                            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-muted/60 hover:bg-muted rounded-full transition-all">
                                <X className="w-6 h-6 text-primary-dark" />
                            </button>
                        </div>

                        <form id="doctor-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-10">
                            {/* Visual Toggle: Featured Specialist */}
                            <div 
                                onClick={() => setFormData(p => ({ ...p, isFeatured: !p.isFeatured }))}
                                className={cn("p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between group", 
                                    formData.isFeatured ? "bg-primary/5 border-primary shadow-xl shadow-primary/10" : "bg-muted/20 border-transparent hover:border-muted-foreground/20"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all", 
                                        formData.isFeatured ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-muted-foreground shadow-sm"
                                    )}>
                                        <Star className={cn("w-7 h-7", formData.isFeatured ? "fill-current" : "")} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-primary-dark">Featured Specialist</p>
                                        <p className="text-sm font-medium text-muted-foreground opacity-60">Highlight this doctor on the clinic's landing page.</p>
                                    </div>
                                </div>
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", 
                                    formData.isFeatured ? "bg-primary text-white scale-110" : "bg-white border border-border scale-100"
                                )}>
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                            </div>

                            <ImageUpload 
                                label="Specialist Profile Photo" 
                                value={formData.image} 
                                onChange={handleImageChange} 
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Specialist Name</label>
                                    <input 
                                        name="name" required value={formData.name} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="Full legal name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Specialization</label>
                                    <select 
                                        name="specialization" required value={formData.specialization} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Search or Select Dept.</option>
                                        {specializations.map(s => <option key={s._id} value={s._id}>{s.name} Specialist</option>)}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Clinical Experience (Years)</label>
                                    <input 
                                        name="experience" type="number" required value={formData.experience} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="Min. 5 years preferred"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Clinic Hospital Location</label>
                                    <input 
                                        name="location" required value={formData.location} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="e.g. Apollo Hospital, Delhi"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Immediate Availability</label>
                                    <select 
                                        name="availabilityStatus" required value={formData.availabilityStatus} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground appearance-none cursor-pointer"
                                    >
                                        <option value="Available">Available for OP</option>
                                        <option value="Busy">Currently in OT / Busy</option>
                                        <option value="On Leave">On Leave</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Next Available Slot</label>
                                    <input 
                                        name="nextAvailable" required value={formData.nextAvailable} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="e.g. Today, 5:30 PM"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Working Days</label>
                                    <input
                                        name="workingDays" value={formData.workingDays} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="Mon-Sat"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Working Hours</label>
                                    <input
                                        name="timeSlots" value={formData.timeSlots} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="09:00 AM - 05:00 PM"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Break Time</label>
                                    <input
                                        name="breakTime" value={formData.breakTime} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="01:00 PM - 02:00 PM"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">Blocked Slots</label>
                                    <input
                                        name="blockedSlots" value={formData.blockedSlots} onChange={handleChange}
                                        className="h-16 w-full px-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all text-foreground"
                                        placeholder="Comma-separated slots like 10:30 AM, 03:00 PM"
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="p-10 border-t border-border/50 sticky bottom-0 bg-card z-10 flex gap-4">
                             <button type="button" onClick={onClose} className="h-18 px-10 border border-border rounded-2xl font-bold hover:bg-muted transition-all">Discard Changes</button>
                             <button 
                                type="submit"
                                form="doctor-form"
                                disabled={isLoading}
                                className="h-18 px-12 flex-1 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em]"
                             >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (initialData ? "Update Specialist" : "Authorise & Onboard")}
                             </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
