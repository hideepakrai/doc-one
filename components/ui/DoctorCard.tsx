"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock3 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { useLanguage } from "@/lib/LanguageContext";

interface DoctorCardProps {
  doctor: any;
  index: number;
  onBookNow: (doctor: any) => void;
  onViewProfile?: (doctor: any) => void;
}

export default function DoctorCard({ doctor, index, onBookNow, onViewProfile }: DoctorCardProps) {
  const { t, language } = useLanguage();
  const fallbackImage = "/placeholder-user.jpg";
  const doctorImage = doctor?.image || fallbackImage;
  const availabilityLabel = doctor?.available
    ? language === "hi"
      ? "उपलब्ध"
      : "Available"
    : language === "hi"
      ? "व्यस्त"
      : "Busy";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 14 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group h-full"
    >
      <div className="h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
        <div className="relative h-72 overflow-hidden">
          <SafeImage
            src={doctorImage}
            alt={doctor?.name || "Doctor"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            fallback={fallbackImage}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/28 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute left-5 top-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] shadow-lg backdrop-blur-md ${
                doctor?.available
                  ? "bg-emerald-500/95 text-white shadow-emerald-500/25"
                  : "bg-amber-500/95 text-white shadow-amber-500/25"
              }`}
            >
              <span className={`h-2 w-2 rounded-full bg-white ${doctor?.available ? "animate-pulse" : ""}`} />
              {availabilityLabel}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-2xl font-bold leading-tight tracking-tight">
                  {doctor?.name || "Dr. Unknown"}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                  {doctor?.specialty || "Specialist"}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/15 bg-white/12 px-3 py-2 text-right backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-[11px] font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{doctor?.rating ?? "4.8"}</span>
                </div>
                <p className="text-[10px] font-medium text-white/70">{doctor?.reviews ?? 0} reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-primary">{doctor?.rating ?? "4.8"}</span>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              {doctor?.reviews ?? 0} reviews • {doctor?.experience ?? 0} years
            </div>
          </div>

          <div className="mb-7 flex-1 space-y-4">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8">
                <MapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Location</p>
                <span className="text-sm font-semibold text-slate-800">{doctor?.location || "India"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                <Clock3 className="h-5 w-5 text-emerald-600" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{t("doctors.nextAvailable")}</span>
                <span className="text-sm font-bold text-slate-900">{doctor?.nextSlot || "Today, 5:00 PM"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onViewProfile?.(doctor)}
              className="h-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
            >
              {t("doctors.viewProfile")}
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBookNow(doctor)}
              className="h-12 rounded-2xl bg-gradient-to-r from-primary to-teal-600 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25"
            >
              {t("doctors.bookNow")}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
