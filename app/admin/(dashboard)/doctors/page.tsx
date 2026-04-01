"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    specialization: "", 
    experience: "", 
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    location: "Apollo Hospital, Delhi",
    availabilityStatus: "Available"
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docRes, specRes] = await Promise.all([
        fetch("/api/doctors"),
        fetch("/api/specializations")
      ]);
      const docData = await docRes.json();
      const specData = await specRes.json();
      setDoctors(docData);
      setSpecializations(specData);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        experience: Number(formData.experience)
      };

      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add doctor");

      toast.success("Doctor added successfully!");
      setIsFormOpen(false);
      setFormData({ 
        name: "", 
        specialization: "", 
        experience: "",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
        location: "Apollo Hospital, Delhi",
        availabilityStatus: "Available"
      });
      fetchData(); // refresh data
    } catch (error) {
      toast.error("Error adding doctor");
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
      fetchData();
    } catch (error) {
      toast.error("Error deleting doctor");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif">Doctors</h1>
          <p className="text-muted-foreground mt-1">Manage doctor profiles and availability.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-primary/90 transition"
        >
          <Plus className="w-5 h-5" /> Add New Doctor
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleAdd} className="bg-card border border-border p-6 rounded-2xl max-w-2xl space-y-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <h3 className="font-semibold text-lg mb-2">New Doctor Details</h3>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Full Name</label>
            <input 
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Dr. John Doe"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Specialization</label>
            <select
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              value={formData.specialization}
              onChange={e => setFormData({...formData, specialization: e.target.value})}
            >
              <option value="" disabled>Select a Specialization</option>
              {specializations.map((spec: any) => (
                <option key={spec._id} value={spec._id}>{spec.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Years of Experience</label>
            <input 
              required
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.experience}
              onChange={e => setFormData({...formData, experience: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Status</label>
            <select
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              value={formData.availabilityStatus}
              onChange={e => setFormData({...formData, availabilityStatus: e.target.value})}
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-1">
            <label className="block text-sm font-medium">Image URL</label>
            <input 
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background" 
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">Save Doctor</button>
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
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Doctor</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Specialty</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Experience</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {doctors.map((doc: any) => (
                <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                      <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                    </div>
                    <span className="font-medium">{doc.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors">{doc.specialty}</td>
                  <td className="px-6 py-4 text-sm">{doc.experience}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.available ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {doc.available ? "Available" : "Busy"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No doctors found.
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
