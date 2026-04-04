"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { toast } from "sonner";
import DoctorCard from "@/components/ui/DoctorCard";
import BookingModal from "@/components/ui/BookingModal";

export default function Doctors({ initialFilter, onlyFeatured = false }: { initialFilter?: string; onlyFeatured?: boolean }) {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [activeFilter, setActiveFilter] = useState(initialFilter || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDoctors = useCallback(async (isAppending = false) => {
    try {
      if (!isAppending) setIsLoading(true);

      const params = new URLSearchParams();
      if (activeFilter !== "All") params.append("specialization", activeFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (onlyFeatured) params.append("isFeatured", "true");
      params.append("page", (isAppending ? page + 1 : 1).toString());
      params.append("limit", onlyFeatured ? "6" : "8");

      const res = await fetch(`/api/doctors?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");

      const sorted = [...(data.doctors || [])].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return parseInt(b.experience) - parseInt(a.experience);
        return 0;
      });

      if (isAppending) {
        setDoctors((prev) => [...prev, ...sorted]);
        setPage((prev) => prev + 1);
      } else {
        setDoctors(sorted);
        setPage(1);
      }
      setTotalDoctors(data.total || 0);
    } catch (error) {
      console.error("Fetch doctors error:", error);
      toast.error(language === "hi" ? "डॉक्टरों को लोड करने में विफल" : "Failed to load doctors");
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, searchQuery, sortBy, language, page, onlyFeatured]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchDoctors(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter, sortBy]);

  const handleBookingSubmit = async (data: { patientName: string; date: string; time: string }) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, doctorId: selectedDoctor.id }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setSuccessMsg(language === "hi" ? "नियुक्ति सफलतापूर्वक बुक की गई!" : "Appointment successfully booked!");
      setTimeout(() => {
        setSelectedDoctor(null);
        setSuccessMsg("");
      }, 2000);
    } catch {
      toast.error(language === "hi" ? "बुकिंग विफल रही" : "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filters = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics"];
  const localizedFilters = t("doctors.filters") as string[];

  return (
    <section id="doctors" className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[600px]">
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              {t("doctors.badge")}
            </span>
            <h2 className="mb-5 text-5xl font-serif font-medium leading-[1.02] tracking-tight text-primary-dark sm:text-6xl">
              {t("doctors.headline")}
            </h2>
            <p className="max-w-[600px] text-base font-medium text-muted-foreground sm:text-lg">
              {t("doctors.subheadline")}
            </p>
          </div>

          {!onlyFeatured && (
            <div className="flex flex-col items-end gap-4">
              <div className="flex flex-wrap justify-end gap-2.5">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setPage(1);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all ${
                      activeFilter === filter
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="group relative min-w-[280px]">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="text"
                    placeholder={t("header.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/5"
                  />
                </div>

                <div className="relative">
                  <SlidersHorizontal className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                    className="h-14 cursor-pointer appearance-none rounded-2xl border border-border bg-card pl-11 pr-10 text-sm font-bold"
                  >
                    <option value="rating">{language === "hi" ? "रेटिंग" : "Rating"}</option>
                    <option value="experience">{language === "hi" ? "अनुभव" : "Experience"}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>

        {!onlyFeatured && (
          <div className="mb-8 flex flex-wrap gap-2.5">
            {localizedFilters.map((filter, idx) => {
              const internalFilter = idx === 0 ? "All" : (t("doctors.filters", "en")[idx] || filter);
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(internalFilter);
                    setPage(1);
                  }}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    activeFilter === internalFilter
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        )}

        {isLoading && doctors.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 items-start sm:grid-cols-2 xl:grid-cols-4 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-2xl border border-border/50 bg-card/60" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 items-start sm:grid-cols-2 xl:grid-cols-4 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {doctors.map((doctor, index) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  index={index}
                  onBookNow={() => {
                    setSelectedDoctor(doctor);
                    setSuccessMsg("");
                  }}
                  onViewProfile={(doc) => router.push(`/doctors/${doc.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && !onlyFeatured && totalDoctors > doctors.length && (
          <div className="mt-12 text-center md:mt-16">
            <button
              onClick={() => fetchDoctors(true)}
              className="inline-flex items-center gap-3 rounded-2xl bg-primary-dark px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-primary-dark/20"
            >
              {language === "hi" ? "और लोड करें" : "View All Doctors"}
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <BookingModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onSubmit={handleBookingSubmit}
        bookedSlots={bookedSlots}
        isLoadingSlots={isLoadingSlots}
        isSubmitting={isSubmitting}
        successMsg={successMsg}
      />
    </section>
  );
}
