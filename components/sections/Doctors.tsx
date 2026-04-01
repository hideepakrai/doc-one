"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, MapPin, ArrowRight, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Doctors() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(language === "hi" ? "सभी" : "All");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingData, setBookingData] = useState({ patientName: "", date: "", time: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.date || !bookingData.time) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        patientName: bookingData.patientName,
        doctorId: selectedDoctor._id || selectedDoctor.id, // handle both cases
        date: bookingData.date,
        time: bookingData.time
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking failed");

      setSuccessMsg(language === "hi" ? "नियुक्ति सफलतापूर्वक बुक की गई!" : "Appointment successfully booked!");
      setTimeout(() => {
        setSelectedDoctor(null);
        setBookingData({ patientName: "", date: "", time: "" });
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert(language === "hi" ? "बुकिंग विफल रही" : "Booking failed");
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
        const data = await res.json();

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
          experienceLocalized: language === "hi" ? `${doc.experience.replace(' years', '')}+ वर्ष` : doc.experience,
        }));

        setDoctors(localizedDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
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
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                        className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === "hi" ? "तारीख" : "Date"}</label>
                      <input 
                        required
                        type="date" 
                        value={bookingData.date} 
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === "hi" ? "समय" : "Time"}</label>
                      <input 
                        required
                        type="time" 
                        value={bookingData.time} 
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 mt-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (language === "hi" ? "पक्का करें" : "Confirm Booking")}
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
