"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, HeartPulse } from "lucide-react";
import { toast } from "sonner";
import TableSkeleton from "@/components/ui/TableSkeleton";

export default function AdminSpecializations() {
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "HeartPulse" });
  
  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/specializations");
      const data = await res.json();
      setSpecializations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch specializations");
      setSpecializations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", icon: "HeartPulse" });
    setIsFormOpen(true);
  };

  const handleEdit = (spec: any) => {
    setEditingId(spec._id);
    setFormData({
      name: spec.name,
      description: spec.description || "",
      icon: spec.icon || "HeartPulse"
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/specializations/${editingId}` : "/api/specializations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Operation failed");
      }

      toast.success(editingId ? "Specialization updated!" : "Specialization added!");
      setIsFormOpen(false);
      fetchSpecializations();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will only work if no doctors are linked to this specialization.")) return;
    try {
      const res = await fetch(`/api/specializations/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      
      toast.success("Deleted successfully!");
      fetchSpecializations();
    } catch (error: any) {
      toast.error(error.message || "Error deleting specialization");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Specializations</h1>
          <p className="text-muted-foreground mt-1 underline decoration-primary/30 underline-offset-4">Manage clinical categories and departments.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-5 h-5" /> Add Specialization
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Specialization" : "New Specialization"}</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Name</label>
                <input 
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background resize-none" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Short description..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold ml-1">Icon Name (Lucide)</label>
                <input 
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" 
                  value={formData.icon}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  placeholder="HeartPulse, Brain, etc."
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20">
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton columns={4} rows={6} />
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Specialization</th>
                  <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic">Description</th>
                  <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-center">Team Size</th>
                  <th className="px-6 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider italic text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {specializations.map((spec: any) => (
                  <tr key={spec._id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <HeartPulse className="w-5 h-5" />
                            </div>
                            <span className="font-bold">{spec.name}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">{spec.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-600/20">
                        {spec.doctorCount || 0} Doctors
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(spec)} 
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(spec._id)} 
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {specializations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                      No specializations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
