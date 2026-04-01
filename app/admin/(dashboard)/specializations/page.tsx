"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminSpecializations() {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "HeartPulse" });
  
  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const res = await fetch("/api/specializations");
      const data = await res.json();
      setSpecializations(data);
    } catch (error) {
      toast.error("Failed to fetch specializations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/specializations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add specialization");

      toast.success("Specialization added successfully!");
      setIsFormOpen(false);
      setFormData({ name: "", description: "", icon: "HeartPulse" });
      fetchSpecializations(); // refresh data
    } catch (error) {
      toast.error("Error adding specialization");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this specialization?")) return;
    try {
      const res = await fetch(`/api/specializations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Deleted successfully!");
      fetchSpecializations();
    } catch (error) {
      toast.error("Error deleting specialization");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif">Specializations</h1>
          <p className="text-muted-foreground mt-1">Manage all clinical specializations.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-primary/90 transition"
        >
          <Plus className="w-5 h-5" /> Add New
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleAdd} className="bg-card border border-border p-6 rounded-2xl max-w-xl space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Cardiology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Short description of this specialization..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon Name (Lucide React)</label>
            <input 
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.icon}
              onChange={e => setFormData({...formData, icon: e.target.value})}
              placeholder="e.g. HeartPulse, Brain"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">Save Specialization</button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="animate-pulse flex gap-4"><div className="w-full h-12 bg-muted rounded"></div></div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Name</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Description</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Doctors Count</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {specializations.map((spec: any) => (
                <tr key={spec._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{spec.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-sm truncate">{spec.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {spec.doctorCount} Doctors
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button onClick={() => handleDelete(spec._id)} className="text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {specializations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No specializations found. Click 'Add New' to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
