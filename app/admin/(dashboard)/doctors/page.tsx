"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit, Search, Filter, ChevronLeft, ChevronRight, X, Users } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import TableSkeleton from "@/components/ui/TableSkeleton";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination State
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    specialization: "", 
    experience: "", 
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    location: "Apollo Hospital, Delhi",
    availabilityStatus: "Available"
  });
  
  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        search: search,
        specialization: selectedSpec,
      });
      
      const res = await fetch(`/api/doctors?${params.toString()}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
          setDoctors(data);
          setTotalPages(1);
      } else if (data && typeof data === 'object' && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
          setTotalPages(data.totalPages || 1);
      } else {
          setDoctors([]);
          setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      toast.error("Failed to fetch doctors");
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, selectedSpec]);

  const fetchSpecializations = async () => {
    try {
      const res = await fetch("/api/specializations");
      const data = await res.json();
      setSpecializations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch specializations:", error);
      setSpecializations([]);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ 
      name: "", 
      specialization: "", 
      experience: "",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
      location: "Apollo Hospital, Delhi",
      availabilityStatus: "Available"
    });
    setIsFormOpen(true);
  };

  const handleEdit = (doc: any) => {
    // Find the specialization ID
    const spec = specializations.find((s: any) => s.name === doc.specialty) as any;
    
    setEditingId(doc.id);
    setFormData({
      name: doc.name,
      specialization: spec?._id || "",
      experience: doc.experience.split(" ")[0],
      image: doc.image,
      location: doc.location,
      availabilityStatus: doc.available ? "Available" : "Busy"
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        experience: Number(formData.experience)
      };

      const url = editingId ? `/api/doctors/${editingId}` : "/api/doctors";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Operation failed");

      toast.success(editingId ? "Doctor updated!" : "Doctor added!");
      setIsFormOpen(false);
      fetchDoctors();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Deleted successfully!");
      fetchDoctors();
    } catch (error) {
      toast.error("Error deleting doctor");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctors Management</h1>
          <p className="text-muted-foreground mt-1 underline decoration-primary/30 underline-offset-4">Manage profiles, specialties, and schedules.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Doctor
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            className="px-4 py-2 border border-border rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={selectedSpec}
            onChange={(e) => { setSelectedSpec(e.target.value); setPage(1); }}
          >
            <option value="All">All Specialties</option>
            {specializations.map((spec: any) => (
              <option key={spec._id} value={spec.name}>{spec.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Modal (Simple Overlay) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-2xl w-full max-w-xl space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Doctor" : "New Doctor Details"}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Full Name</label>
                <input 
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Dr. John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Specialization</label>
                <select
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background"
                  value={formData.specialization}
                  onChange={e => setFormData({...formData, specialization: e.target.value})}
                >
                  <option value="" disabled>Select a Specialization</option>
                  {specializations.map((spec: any) => (
                    <option key={spec._id} value={spec._id}>{spec.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Experience (Years)</label>
                <input 
                  required
                  type="number"
                  min="0"
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.experience}
                  onChange={e => setFormData({...formData, experience: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Availability</label>
                <select
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background"
                  value={formData.availabilityStatus}
                  onChange={e => setFormData({...formData, availabilityStatus: e.target.value})}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>
              <div className="col-span-full space-y-1.5">
                <label className="text-sm font-semibold ml-1">Location / Clinic</label>
                <input 
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="col-span-full space-y-1.5">
                <label className="text-sm font-semibold ml-1">Profile Image URL</label>
                <input 
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20">
                {editingId ? "Update Doctor" : "Create Doctor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton columns={5} rows={8} />
      ) : (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Doctor Details</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-center">Specialty</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-center">Experience</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {doctors.map((doc: any) => (
                    <tr key={doc.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-border shadow-sm group-hover:border-primary/20 transition-all">
                            <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-base leading-tight">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{doc.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium px-3 py-1 bg-muted rounded-full text-muted-foreground group-hover:text-foreground transition-all">
                          {doc.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">{doc.experience}</td>
                      <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                            doc.available 
                                ? "bg-emerald-500/10 text-emerald-600 ring-emerald-600/20" 
                                : "bg-amber-500/10 text-amber-600 ring-amber-600/20"
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${doc.available ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                            {doc.available ? "Available" : "Busy"}
                            </span>
                          </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(doc)}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(doc.id)} 
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {doctors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Users className="w-8 h-8 opacity-20" />
                            <p className="font-medium">No doctors found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-muted-foreground italic">
              Page <span className="font-bold text-foreground">{page}</span> of {totalPages}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 border border-border rounded-xl disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                 disabled={page === totalPages || totalPages === 0}
                 onClick={() => setPage(p => p + 1)}
                className="p-2 border border-border rounded-xl disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
