"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, HeartPulse, Search, Info } from "lucide-react";
import { toast } from "sonner";
import LoadingOverlay from "@/components/admin/ui/LoadingOverlay";
import SpecializationForm from "@/components/admin/ui/SpecializationForm";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import { cn } from "@/lib/utils";

export default function AdminSpecializations() {
  const [specs, setSpecs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchSpecs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/specializations");
      const data = await res.json();
      setSpecs(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch department database");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSpecs(); }, []);

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const url = editingSpec ? `/api/specializations/${editingSpec._id}` : "/api/specializations";
      const method = editingSpec ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Operation failed");
      }

      toast.success(editingSpec ? "Department updated" : "Department added to clinical registry");
      setIsFormOpen(false);
      fetchSpecs();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!isDeleting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/specializations/${isDeleting}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      
      toast.success("Department removed from registry");
      setIsDeleting(null);
      fetchSpecs();
    } catch (error: any) {
      toast.error(error.message || "Error deleting department");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {isLoading && specs.length === 0 && <LoadingOverlay />}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div className="max-w-2xl">
           <h1 className="text-4xl font-serif font-medium tracking-tight text-primary-dark">Department Repository</h1>
           <p className="text-muted-foreground font-medium mt-2">Manage medical specialities, service descriptions, and clinical team metrics.</p>
        </div>
        <button
          onClick={() => { setEditingSpec(null); setIsFormOpen(true); }}
          className="h-16 px-8 bg-primary text-white font-bold rounded-2xl flex items-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
        >
          <Plus className="w-5 h-5" strokeWidth={3} /> Register New Department
        </button>
      </div>

      <div className="bg-card rounded-[3rem] border border-border/50 overflow-hidden shadow-sm">
         <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr className="bg-muted/30 border-b border-border/40">
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 w-[300px]">Clinical Department</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Description</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-center">Team Strength</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {specs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-32 text-center">
                        <div className="flex flex-col items-center gap-5">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                            <HeartPulse className="w-10 h-10" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-primary-dark">No data available yet. Start by adding doctors.</p>
                            <p className="text-sm font-medium text-muted-foreground">Create departments so physicians can be assigned to specialties.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : specs.map((spec) => (
                    <tr key={spec._id} className="hover:bg-muted/10 transition-colors group">
                       <td className="px-10 py-6">
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-[1rem] bg-primary/10 text-primary flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                 <HeartPulse className="w-6 h-6" />
                              </div>
                              <span className="font-bold text-lg text-primary-dark tracking-tight">{spec.name}</span>
                           </div>
                       </td>
                       <td className="px-10 py-6">
                          <p className="text-sm font-medium text-muted-foreground opacity-60 leading-relaxed max-w-sm line-clamp-2 hover:line-clamp-none transition-all">
                             {spec.description || "No clinical description provided."}
                          </p>
                       </td>
                       <td className="px-10 py-6 text-center">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                             {spec.doctorCount || 0} Physicians
                          </span>
                       </td>
                       <td className="px-10 py-6">
                           <div className="flex items-center justify-end gap-3">
                              <button 
                                 onClick={() => { setEditingSpec(spec); setIsFormOpen(true); }}
                                 className="w-11 h-11 flex items-center justify-center bg-muted/60 text-primary-dark rounded-xl hover:bg-primary hover:text-white transition-all transition-all"
                              >
                                 <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                 onClick={() => setIsDeleting(spec._id)}
                                 className="w-11 h-11 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <SpecializationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialData={editingSpec}
        isLoading={isSubmitting}
      />

      <ConfirmModal 
        isOpen={!!isDeleting}
        onClose={() => setIsDeleting(null)}
        onConfirm={confirmDelete}
        title="Sanitize Registry Row?"
        description="Permanently excise this department from clinical records. Warning: This action will fail if active physicians are linked to this speciality."
        confirmText="Confirm Removal"
        isLoading={isSubmitting}
      />
    </div>
  );
}
