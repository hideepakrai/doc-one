"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { useLanguage } from "@/lib/LanguageContext";

interface BookingModalProps {
    doctor: any;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { patientName: string; date: string; time: string }) => Promise<void>;
    bookedSlots: string[];
    isLoadingSlots: boolean;
    isSubmitting: boolean;
    successMsg: string;
}

export default function BookingModal({
    doctor, isOpen, onClose, onSubmit, bookedSlots, isLoadingSlots, isSubmitting, successMsg
}: BookingModalProps) {
    const { t, language } = useLanguage();
    const [bookingData, setBookingData] = (require("react") as typeof import("react")).useState({ patientName: "", date: "", time: "" });

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM"
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(bookingData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        className="relative w-full max-w-lg bg-card rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden border-2 border-primary/20">
                                        <SafeImage src={doctor?.image} alt={doctor?.name} width={64} height={64} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">{doctor?.name}</h3>
                                        <p className="text-primary font-bold text-sm tracking-widest uppercase">{doctor?.specialty}</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-muted/60 hover:bg-muted rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {successMsg ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                    <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" strokeWidth={2.5} />
                                    </div>
                                    <h4 className="text-3xl font-serif mb-4 text-foreground">{language === "hi" ? "सफलता!" : "Success!"}</h4>
                                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">{successMsg}</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2.5 ml-1">{language === "hi" ? "रोगी का नाम" : "Patient Name"}</label>
                                            <input
                                                required type="text" value={bookingData.patientName}
                                                onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                                                className="w-full h-14 px-5 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2.5 ml-1">{language === "hi" ? "तारीख" : "Date"}</label>
                                            <input
                                                required type="date" min={new Date().toISOString().split("T")[0]}
                                                value={bookingData.date} onChange={(e) => setBookingData({ ...bookingData, date: e.target.value, time: "" })}
                                                className="w-full h-14 px-5 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all"
                                            />
                                        </div>
                                    </div>

                                    {bookingData.date && (
                                        <div>
                                            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3.5 ml-1">{language === "hi" ? "उपलब्ध स्लॉट" : "Available Time Slots"}</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {timeSlots.map((slot) => (
                                                    <button
                                                        key={slot} type="button" disabled={bookedSlots.includes(slot)}
                                                        onClick={() => setBookingData({ ...bookingData, time: slot })}
                                                        className={`h-11 text-[11px] font-black rounded-xl border transition-all ${
                                                            bookingData.time === slot
                                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                                                                : bookedSlots.includes(slot)
                                                                    ? "bg-muted/40 text-muted-foreground border-transparent cursor-not-allowed opacity-30"
                                                                    : "bg-white border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                                        }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit" disabled={isSubmitting || !bookingData.time}
                                        className="w-full h-16 mt-6 rounded-2xl bg-primary-dark text-white font-bold shadow-2xl shadow-primary-dark/20 flex items-center justify-center hover:bg-primary/95 transition-all disabled:opacity-50 disabled:shadow-none uppercase tracking-[0.2em]"
                                    >
                                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (language === "hi" ? "अभी बुक करें" : "Confirm Appointment")}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
