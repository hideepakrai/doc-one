"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CalendarCheck, Star, MapPin, Clock3, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

export default function DoctorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/doctors/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load doctor");
        setDoctor(data);
      } catch (error: any) {
        toast.error(error.message || "Unable to load doctor profile");
        router.push("/doctors");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id, router]);

  if (loading) {
    return <div className="mx-auto max-w-6xl p-8">Loading...</div>;
  }

  if (!doctor) return null;

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl">
          <div className="relative h-[520px]">
            <Image src={doctor.image || "/placeholder-user.jpg"} alt={doctor.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className={`mb-3 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${doctor.available ? "bg-emerald-500" : "bg-amber-500"}`}>
                {doctor.available ? "Available" : "Busy"}
              </span>
              <h1 className="text-3xl font-semibold">{doctor.name}</h1>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/75">{doctor.specialty}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Rating</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-semibold"><Star className="h-5 w-5 fill-amber-400 text-amber-400" /> {doctor.rating} / 5</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Experience</p>
                <p className="mt-2 text-lg font-semibold">{doctor.experience}+ years</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Hospital</p>
                <p className="mt-2 text-lg font-semibold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {doctor.location}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Next Slot</p>
                <p className="mt-2 text-lg font-semibold flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" /> {doctor.nextSlot}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-slate-600">Verified specialist with live booking availability.</span>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20">
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
