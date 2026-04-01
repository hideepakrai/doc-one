"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, MapPin, ArrowRight, X, Loader2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { toast } from "sonner";

export default function Doctors() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(language === "hi" ? "सभी" : "All");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingData, setBookingData] = useState({ patientName: "", date: "", time: "" });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const fetchBookedSlots = async (doctorId: string, date: string) => {
    if (!doctorId || !date) return;
    setIsLoadingSlots(true);
    try {
      const res = await fetch(`/api/doctors/${doctorId}/booked-slots?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSlots(data);
      }
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDoctor && bookingData.date) {
      fetchBookedSlots(selectedDoctor._id || selectedDoctor.id, bookingData.date);
    }
  }, [selectedDoctor, bookingData.date]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.date || !bookingData.time) {
        toast.error("Please fill all fields");
        return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        patientName: bookingData.patientName,
        doctorId: selectedDoctor._id || selectedDoctor.id,
        date: bookingData.date,
        time: bookingData.time
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Booking failed");

      setSuccessMsg(language === "hi" ? "नियुक्ति सफलतापूर्वक बुक की गई!" : "Appointment successfully booked!");
      setTimeout(() => {
        setSelectedDoctor(null);
        setBookingData({ patientName: "", date: "", time: "" });
        setSuccessMsg("");
        setBookedSlots([]);
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || (language === "hi" ? "बुकिंग विफल रही" : "Booking failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync activeFilter with language change
  useEffect(() => {
    setActiveFilter(language === "hi" ? "सभी" : "All");
  }, [language]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setIsLoading(true);
        // We fetch all to handle client-side i18n filtering seamlessly
        const res = await fetch("/api/doctors");
        const resData = await res.json();
        
        // Correct data extraction from the paginated response object
        const data = Array.isArray(resData?.doctors) ? resData.doctors : [];

        // Map DB English names to localized names for the UI
        const specializationMap: Record<string, string> = {
          "Cardiology": t("doctors.filters")[1],
          "Neurology": t("doctors.filters")[2],
          "Pediatrics": t("doctors.filters")[3],
          "Orthopedics": t("doctors.filters")[4],
          "Ophthalmology": language === "hi" ? "नेत्र विज्ञान" : "Ophthalmology",
          "General Medicine": language === "hi" ? "सामान्य चिकित्सा" : "General Medicine",
          "Dermatology": language === "hi" ? "त्वचा विज्ञान" : "Dermatology",
          "Surgery": language === "hi" ? "सर्जरी" : "Surgery",
        };

        const localizedDoctors = data.map((doc: any) => ({
          ...doc,
          specialty: specializationMap[doc.specialty] || doc.specialty,
          // DB might return "Available" but UI expects translation
          availableLocalized: doc.available 
            ? (language === "hi" ? "उपलब्ध" : "Available") 
            : (language === "hi" ? "व्यस्त" : "Busy"),
          experienceLocalized: language === "hi" ? `${(doc.experience || '0').toString().replace(' years', '')}+ वर्ष` : doc.experience,
        }));

        setDoctors(localizedDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDoctors();
  }, [language, t]); // Refetch/Remap when language changes

  const filters = [
    language === "hi" ? "सभी" : "All",
    t("doctors.filters")[1],
    t("doctors.filters")[2],
    t("doctors.filters")[3],
    t("doctors.filters")[4],
    language === "hi" ? "नेत्र विज्ञान" : "Ophthalmology",
    language === "hi" ? "सामान्य चिकित्सा" : "General Medicine"
  ];

  const filteredDoctors =
    activeFilter === "All" || activeFilter === "सभी"
      ? doctors
      : doctors.filter((d: any) => d.specialty === activeFilter);

  return (
    <section id="doctors" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("doctors.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-4 text-balance">
              {t("doctors.headline")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              {t("doctors.subheadline")}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter: string) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Doctors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-card/60 animate-pulse rounded-2xl border border-border" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor: any, index: number) => (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <SafeImage
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fallback="/placeholder-user.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                      {/* Availability Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                            doctor.available
                              ? "bg-emerald-500/90 text-white"
                              : "bg-amber-500/90 text-white"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              doctor.available ? "bg-white animate-pulse" : "bg-white"
                            }`}
                          />
                          {doctor.availableLocalized}
                        </span>
                      </div>

                      {/* Quick Info */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                        <p className="text-white/80">{doctor.specialty}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-semibold">{doctor.rating}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          ({doctor.reviews} {language === "hi" ? "समीक्षाएं" : "reviews"})
                        </span>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-muted-foreground text-sm">
                          {doctor.experienceLocalized}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>

                      {/* Next Available */}
                      <div className="flex items-center gap-2 text-sm mb-5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{language === "hi" ? "अगला:" : "Next:"}</span>
                        <span className="font-medium text-primary">{doctor.nextSlot}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          href={`#doctor-${doctor.id}`}
                          className="flex-1 flex items-center justify-center h-11 rounded-xl border-2 border-border text-sm font-medium hover:bg-muted transition-colors"
                        >
                          {t("doctors.viewProfile")}
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setSuccessMsg("");
                          }}
                          className="flex-1 flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          {t("doctors.bookNow")}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="#all-doctors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t("doctors.viewAll")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedDoctor(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{t("doctors.bookNow")}</h3>
                    <p className="text-muted-foreground text-sm">{selectedDoctor.name} ({selectedDoctor.specialty})</p>
                  </div>
                  <button onClick={() => setSelectedDoctor(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {successMsg ? (
                  <div className="py-8 text-center text-emerald-600">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 fill-current text-emerald-600" />
                    </div>
                    <p className="font-medium text-lg">{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === "hi" ? "रोगी का नाम" : "Patient Name"}</label>
                      <input 
                        required
                        type="text" 
                        value={bookingData.patientName} 
                        onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                        className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === "hi" ? "तारीख" : "Date"}</label>
                      <input 
                        required
                        type="date" 
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingData.date} 
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value, time: ""})}
                        className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      />
                    </div>
                    
                    {bookingData.date && (
                        <div>
                            <label className="block text-sm font-medium mb-2">{language === "hi" ? "उपलब्ध समय" : "Available Time Slots"}</label>
                            {isLoadingSlots ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {language === "hi" ? "समय स्लॉट लोड हो रहा है..." : "Loading slots..."}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((slot) => {
                                        const isBooked = bookedSlots.includes(slot);
                                        return (
                                            <button
                                                key={slot}
                                                type="button"
                                                disabled={isBooked}
                                                onClick={() => setBookingData({...bookingData, time: slot})}
                                                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                                                    bookingData.time === slot
                                                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                                                        : isBooked
                                                            ? "bg-muted text-muted-foreground border-transparent cursor-not-allowed opacity-50"
                                                            : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting || !bookingData.time}
                      className="w-full py-3.5 mt-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-50 disabled:shadow-none"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (language === "hi" ? "बुकिंग की पुष्टि करें" : "Confirm Booking")}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
