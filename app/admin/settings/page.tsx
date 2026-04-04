"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, Building2, Mail, Phone, MapPin, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    clinicName: "",
    contactEmail: "",
    phone: "",
    address: "",
    logo: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (res.ok) {
          setForm({
            clinicName: data.clinicName || "",
            contactEmail: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            logo: data.logo || "",
          });
          setLogoPreview(data.logo || null);
        }
      } catch {
        toast.error("Unable to load settings.");
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!form.clinicName.trim() || !form.contactEmail.trim()) {
      toast.error("Please fill the required clinic details.");
      return;
    }
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicName: form.clinicName,
          email: form.contactEmail,
          phone: form.phone,
          address: form.address,
          logo: logoPreview || form.logo || "/placeholder-logo.png",
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Settings saved successfully.");
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Clinic Details</h2>
        <p className="mt-1 text-sm text-slate-500">Update the information shown across the platform.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { key: "clinicName", label: "Clinic Name", icon: Building2 },
            { key: "contactEmail", label: "Contact Email", icon: Mail },
            { key: "phone", label: "Phone", icon: Phone },
            { key: "address", label: "Address", icon: MapPin },
          ].map((field) => {
            const Icon = field.icon;
            return (
              <label key={field.key} className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{field.label}</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Icon className="h-4 w-4 text-slate-400" />
                  <input
                    value={(form as any)[field.key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-transparent text-sm font-medium outline-none"
                  />
                </div>
              </label>
            );
          })}
        </div>
        <button onClick={handleSave} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Logo Upload</h2>
        <p className="mt-1 text-sm text-slate-500">Use a square logo for clean branding in header areas.</p>
        <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50">
          <div className="text-center">
            {logoPreview ? (
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Image src={logoPreview} alt="Logo preview" width={96} height={96} className="h-full w-full object-cover" />
              </div>
            ) : (
              <Upload className="mx-auto mb-3 h-10 w-10 text-slate-400" />
            )}
            <p className="font-semibold text-slate-800">Drag and drop your logo here</p>
            <p className="text-sm text-slate-500">PNG, SVG, JPG supported</p>
            <button
              type="button"
              onClick={() => setLogoPreview("/placeholder-logo.png")}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2 className="h-4 w-4" /> Preview demo logo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
