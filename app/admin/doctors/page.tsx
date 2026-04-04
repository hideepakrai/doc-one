"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight, 
  Filter, XCircle, Star
} from "lucide-react";
import { toast } from "sonner";
import SafeImage from "@/components/ui/SafeImage";
import DoctorForm from "@/components/admin/ui/DoctorForm";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import LoadingOverlay from "@/components/admin/ui/LoadingOverlay";
import { cn } from "@/lib/utils";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination State
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        search: search,
        specialization: selectedSpec,
        sortBy: sortBy,
      });
      
      const res = await fetch(`/api/doctors?${params.toString()}`);
      const data = await res.json();
      
      if (data && data.doctors) {
          setDoctors(data.doctors);
          setTotalPages(data.totalPages || 1);
      } else {
          setDoctors([]);
          setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      toast.error("Failed to fetch clinical database");
    } finally {
      setIsLoading(false);
    }
  }, [page, search, selectedSpec, sortBy]);

  const fetchSpecs = async () => {
    const res = await fetch("/api/specializations");
    const data = await res.json();
    setSpecializations(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchSpecs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchDoctors(), 300);
    return () => clearTimeout(timer);
  }, [fetchDoctors]);

  const handleToggleFeatured = async (doctor: any) => {
    try {
        const res = await fetch(`/api/doctors/${doctor.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFeatured: !doctor.isFeatured })
        });
        if (res.ok) {
            toast.success(`${doctor.name} ${doctor.isFeatured ? 'removed from' : 'added to'} featured`);
            fetchDoctors();
        }
    } catch (err) {
        toast.error("Status update failed");
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
        const url = editingDoctor ? `/api/doctors/${editingDoctor.id}` : "/api/doctors";
        const method = editingDoctor ? "PUT" : "POST";
        
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                experience: Number(formData.experience)
            })
        });

        if (!res.ok) throw new Error("Operation failed");

        toast.success(editingDoctor ? "Profile successfully updated" : "Specialist onboarded");
        setIsFormOpen(false);
        fetchDoctors();
    } catch (err) {
        toast.error("Registration failed. Please check inputs.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!isDeleting) return;
    setIsSubmitting(true);
    try {
        const res = await fetch(`/api/doctors/${isDeleting}`, { method: "DELETE" });
        if (res.ok) {
            toast.success("Specialist removed from system");
            setIsDeleting(null);
            fetchDoctors();
        }
    } catch (err) {
        toast.error("Deletion failed");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {isLoading && doctors.length === 0 && <LoadingOverlay />}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div className="max-w-2xl">
           <h1 className="text-4xl font-serif font-medium tracking-tight text-primary-dark">Physician Registry</h1>
           <p className="text-muted-foreground font-medium mt-2">Oversee specialists profiles, department allocation, and clinical status.</p>
        </div>
        <button
          onClick={() => { setEditingDoctor(null); setIsFormOpen(true); }}
          className="h-16 px-8 bg-primary text-white font-bold rounded-2xl flex items-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
        >
          <Plus className="w-5 h-5" strokeWidth={3} /> Onboard New Specialist
        </button>
      </div>

      {/* Advanced Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-card p-6 rounded-[2.5rem] border border-border/50 shadow-sm">
         <div className="md:col-span-6 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
               type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
               placeholder="Identify specialist by name..."
               className="h-16 w-full pl-15 pr-6 bg-muted/40 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/5 font-bold transition-all"
            />
         </div>
         <div className="md:col-span-3">
            <div className="relative">
               <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <select 
                  value={selectedSpec} onChange={(e) => { setSelectedSpec(e.target.value); setPage(1); }}
                  className="h-16 w-full pl-14 pr-6 bg-muted/40 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/40 font-bold transition-all appearance-none cursor-pointer"
               >
                  <option value="All">All Departments</option>
                  {specializations.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
               </select>
            </div>
         </div>
         <div className="md:col-span-3">
            <div className="relative">
               <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <select 
                  value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="h-16 w-full pl-14 pr-6 bg-muted/40 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/40 font-bold transition-all appearance-none cursor-pointer"
               >
                  <option value="createdAt">Sort: Recent</option>
                  <option value="rating">Sort: Best Rated</option>
                  <option value="experience">Sort: Experience</option>
                  <option value="name">Sort: Name A-Z</option>
               </select>
            </div>
         </div>
      </div>

      <div className="bg-card rounded-[3rem] border border-border/50 overflow-hidden shadow-sm">
         <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse min-w-[1000px]">
               <thead>
                  <tr className="bg-muted/30 border-b border-border/40">
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Physician Overview</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Department</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-center">Status</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-center">Featured</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {doctors.length === 0 ? (
                     <tr>
                        <td colSpan={5} className="py-32 text-center">
                           <div className="flex flex-col items-center gap-5">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                                 <HeartPulse className="w-10 h-10" />
                              </div>
                              <div>
                                 <p className="text-2xl font-semibold text-primary-dark">No data available yet. Start by adding doctors.</p>
                                 <p className="text-sm font-medium text-muted-foreground">Use the onboard button to create the first physician profile.</p>
                              </div>
                           </div>
                        </td>
                     </tr>
                  ) : doctors.map((doc: any) => (
                     <tr key={doc.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-6">
                              <div className="relative w-16 h-16 rounded-[1.25rem] overflow-hidden border-2 border-border shadow-sm group-hover:border-primary/20 transition-all flex-shrink-0">
                                 <SafeImage src={doc.image} alt={doc.name} fill className="object-cover" />
                              </div>
                              <div>
                                 <p className="font-bold text-lg text-primary-dark leading-tight">{doc.name}</p>
                                 <div className="flex items-center gap-4 mt-1.5 font-bold text-[11px] text-muted-foreground/60">
                                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {doc.rating}</span>
                                    <span>•</span>
                                    <span>{doc.experience} Years EXP</span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <span className="inline-flex h-10 items-center px-4 rounded-xl bg-primary/5 text-primary text-xs font-black uppercase tracking-wider border border-primary/10">
                              {doc.specialty}
                           </span>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex justify-center">
                              <span className={cn("inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest", 
                                doc.available ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                              )}>
                                 <span className={cn("w-1.5 h-1.5 rounded-full mr-2", doc.available ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
                                 {doc.available ? "Available" : "Busy"}
                              </span>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex justify-center">
                              <button 
                                onClick={() => handleToggleFeatured(doc)}
                                className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", 
                                  doc.isFeatured ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-muted/40 text-muted-foreground/30 hover:text-muted-foreground"
                                )}
                              >
                                 <Star className={cn("w-5.5 h-5.5", doc.isFeatured ? "fill-current" : "")} />
                              </button>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex items-center justify-end gap-3">
                              <button 
                                 onClick={() => { setEditingDoctor(doc); setIsFormOpen(true); }}
                                 className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                              >
                                 <SlidersHorizontal className="w-5 h-5" />
                              </button>
                              <button 
                                 onClick={() => setIsDeleting(doc.id)}
                                 className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                              >
                                 <XCircle className="w-5 h-5" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-10 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-8 bg-muted/10">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60">Registry Page</p>
                 <span className="w-10 h-10 flex items-center justify-center bg-white border border-border/50 rounded-xl font-bold font-serif text-primary-dark shadow-sm">{page}</span>
               </div>
               <p className="text-xs font-bold text-muted-foreground/40 italic">Registry scale: {totalPages} pages recorded</p>
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                  disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="h-14 px-8 border border-border rounded-2xl disabled:opacity-20 flex items-center gap-2 hover:bg-white hover:text-primary transition-all font-bold text-sm shadow-sm"
               >
                  <ChevronLeft className="w-5 h-5" /> Previous Session
               </button>
               <button 
                  disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}
                  className="h-14 px-8 border border-border rounded-2xl disabled:opacity-20 flex items-center gap-2 hover:bg-white hover:text-primary transition-all font-bold text-sm shadow-sm"
               >
                  Next Registry <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         </div>
      </div>

      <DoctorForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialData={editingDoctor}
        specializations={specializations}
        isLoading={isSubmitting}
      />

      <ConfirmModal 
        isOpen={!!isDeleting}
        onClose={() => setIsDeleting(null)}
        onConfirm={confirmDelete}
        title="Sanitize Registry Record?"
        description="Permanently delete this physician's profile from the clinic database. Non-reversible."
        confirmText="Confirm Deletion"
        isLoading={isSubmitting}
      />
    </div>
  );
}
