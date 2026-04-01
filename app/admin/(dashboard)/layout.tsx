import Link from "next/link";
import { LayoutDashboard, Users, HeartPulse, CalendarCheck } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
            <HeartPulse className="w-6 h-6" />
            Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/specializations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <HeartPulse className="w-5 h-5" />
            Specializations
          </Link>
          <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Users className="w-5 h-5" />
            Doctors
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <CalendarCheck className="w-5 h-5" />
            Appointments
          </Link>
          <div className="mt-auto border-t border-border pt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header (optional) */}
        <header className="md:hidden bg-card border-b border-border p-4 flex items-center justify-between">
          <h1 className="font-serif font-bold text-lg">Admin Panel</h1>
          {/* Mobile menu button could go here */}
        </header>

        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
