"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
    isCompact?: boolean;
}

export default function LogoutButton({ isCompact = false }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isCompact) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        title="Secure Logout"
        className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={cn(
        "flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm group",
        loading && "opacity-50"
      )}
    >
      <LogOut className="w-5.5 h-5.5 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
      <span className="tracking-tight">{loading ? "Sanitizing Session..." : "Secure Logout"}</span>
    </button>
  );
}
