"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Loader2 } from "lucide-react";

export default function DoctorLoginPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/doctors?limit=100")
      .then((r) => r.json())
      .then((data) => setDoctors(Array.isArray(data.doctors) ? data.doctors : []))
      .catch(() => setDoctors([]));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/doctor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, accessCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to authenticate");
      router.push("/doctor/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Doctor Portal</h1>
          <p className="mt-2 text-sm text-slate-500">Access your appointments and patients.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-slate-700">Select Doctor</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
            >
              <option value="">Choose your profile</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Access Code</label>
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
              placeholder="Doctor portal code"
            />
          </div>

          {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
